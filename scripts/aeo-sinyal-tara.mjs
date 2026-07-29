#!/usr/bin/env node
/**
 * AEO sinyal tarayıcı — günlük çalışır, LLM kullanmaz (sıfır API maliyeti).
 *
 * Ne yapar: AEO/GEO ile ilgili RSS kaynaklarını tarar, başlık+özet üzerinden
 * anahtar kelime skoru verir, daha önce görülmemiş olanları aday kuyruğuna yazar.
 *
 * Ne YAPMAZ: içerik üretmez, yayın yapmaz. Çıktısı insanın (veya ayrı bir
 * taslak workflow'unun) okuyacağı bir aday listesidir. Gölge mod prensibi:
 * otomasyon önerir, yayın kararını insan verir.
 *
 * Kullanım: node scripts/aeo-sinyal-tara.mjs
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const KUYRUK_DIZIN = 'content-queue';
const GORULEN_DOSYA = path.join(KUYRUK_DIZIN, 'gorulen.json');

// Doğrulanmış kaynaklar (2026-07-29 itibarıyla HTTP 200).
// Yeni kaynak eklerken önce curl ile teyit et — ölü feed sessizce boş döner.
const KAYNAKLAR = [
  { ad: 'arXiv cs.IR', url: 'http://export.arxiv.org/rss/cs.IR', tip: 'akademik' },
  { ad: 'Google Search Central', url: 'https://developers.google.com/search/blog/feed.xml', tip: 'birinci-el' },
  { ad: 'Cloudflare Blog', url: 'https://blog.cloudflare.com/rss/', tip: 'birinci-el' },
  { ad: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', tip: 'birinci-el' },
  { ad: 'Search Engine Land', url: 'https://searchengineland.com/feed', tip: 'endustri' },
];

// Skorlama: eşleşen her terim puan ekler. Ağırlıklar konunun bize yakınlığına göre.
const TERIMLER = [
  // Çekirdek AEO/GEO — en yüksek ağırlık
  [/\bAEO\b|answer engine optimi|cevap motoru/i, 10],
  [/\bGEO\b.*optimi|generative engine optimi|üretken motor/i, 10],
  [/llms?\.txt/i, 9],
  // LLM arama ekosistemi
  [/AI Overview|SearchGPT|Perplexity|AI search|yapay zeka arama/i, 7],
  [/citation|atıf|alıntılan/i, 6],
  [/RAG\b|retrieval.augmented/i, 6],
  // Teknik zemin
  [/schema\.org|structured data|yapılandırılmış veri|JSON-LD/i, 5],
  [/crawler|crawl|robots\.txt|GPTBot|CCBot|ClaudeBot/i, 5],
  [/Common Crawl/i, 6],
  // Genel bağlam — düşük ağırlık, tek başına yetmez
  [/\bSEO\b/i, 2],
  [/ChatGPT|Claude|Gemini|Copilot/i, 2],
];

const ESIK = 8; // bu skorun altındaki adaylar kuyruğa girmez

/** RSS/Atom içinden başlık + link + tarih çıkarır (bağımlılıksız, basit parse). */
function ogeleriAyikla(xml) {
  const ogeler = [];
  // RSS <item> ve Atom <entry> ikisini de yakala
  const bloklar = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) || [];

  for (const blok of bloklar) {
    const al = (etiket) => {
      const m = blok.match(new RegExp(`<${etiket}\\b[^>]*>([\\s\\S]*?)<\\/${etiket}>`, 'i'));
      if (!m) return '';
      return m[1]
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
    };

    const baslik = al('title');
    // Atom'da link href attribute'unda, RSS'te element içeriğinde
    let link = al('link');
    if (!link) {
      const m = blok.match(/<link[^>]*href=["']([^"']+)["']/i);
      link = m ? m[1] : '';
    }
    const ozet = al('description') || al('summary') || al('content');
    const tarih = al('pubDate') || al('published') || al('updated');

    if (baslik && link) ogeler.push({ baslik, link, ozet: ozet.slice(0, 400), tarih });
  }
  return ogeler;
}

/** Başlık + özete göre alaka skoru ve eşleşen konular. */
function skorla({ baslik, ozet }) {
  const metin = `${baslik} ${ozet}`;
  let skor = 0;
  const eslesen = [];
  for (const [desen, puan] of TERIMLER) {
    if (desen.test(metin)) {
      skor += puan;
      const m = metin.match(desen);
      if (m) eslesen.push(m[0].trim());
    }
  }
  return { skor, eslesen };
}

async function kaynagiTara(kaynak) {
  try {
    const yanit = await fetch(kaynak.url, {
      // HTTP başlıkları ASCII olmak zorunda — Türkçe karakter kullanma.
      headers: { 'User-Agent': 'gonet-com-tr AEO signal scanner (+https://gonet.com.tr)' },
      signal: AbortSignal.timeout(20000),
    });
    if (!yanit.ok) {
      console.log(`  ⚠ ${kaynak.ad}: HTTP ${yanit.status} — atlandı`);
      return [];
    }
    const xml = await yanit.text();
    const ogeler = ogeleriAyikla(xml);
    console.log(`  ✓ ${kaynak.ad}: ${ogeler.length} öğe`);
    return ogeler.map((o) => ({ ...o, kaynak: kaynak.ad, kaynakTipi: kaynak.tip }));
  } catch (hata) {
    console.log(`  ⚠ ${kaynak.ad}: ${hata.message} — atlandı`);
    return [];
  }
}

async function main() {
  console.log('AEO sinyal taraması başlıyor…\n');

  if (!existsSync(KUYRUK_DIZIN)) await mkdir(KUYRUK_DIZIN, { recursive: true });

  // Daha önce görülen linkler — aynı haber her gün tekrar kuyruğa girmesin
  let gorulen = [];
  if (existsSync(GORULEN_DOSYA)) {
    try {
      gorulen = JSON.parse(await readFile(GORULEN_DOSYA, 'utf8'));
    } catch {
      console.log('  ⚠ gorulen.json okunamadı, sıfırdan başlanıyor');
    }
  }
  const gorulenSet = new Set(gorulen);

  const tumOgeler = (await Promise.all(KAYNAKLAR.map(kaynagiTara))).flat();
  console.log(`\nToplam ${tumOgeler.length} öğe tarandı.`);

  const adaylar = [];
  for (const oge of tumOgeler) {
    if (gorulenSet.has(oge.link)) continue;
    const { skor, eslesen } = skorla(oge);
    if (skor >= ESIK) adaylar.push({ ...oge, skor, eslesen: [...new Set(eslesen)] });
  }

  adaylar.sort((a, b) => b.skor - a.skor);
  console.log(`Eşiği (${ESIK}) geçen yeni aday: ${adaylar.length}\n`);

  // Görülenler listesini güncelle — sadece taranan her şeyi işaretle (tekrar önleme)
  for (const oge of tumOgeler) gorulenSet.add(oge.link);
  // Listeyi sınırla, sonsuz büyümesin (son 2000 link yeterli)
  const yeniGorulen = [...gorulenSet].slice(-2000);
  await writeFile(GORULEN_DOSYA, JSON.stringify(yeniGorulen, null, 0));

  // Günün raporu — insan okuyacak, markdown
  const bugun = new Date().toISOString().slice(0, 10);
  const raporYolu = path.join(KUYRUK_DIZIN, `${bugun}.md`);

  if (adaylar.length === 0) {
    console.log('Yeni aday yok — rapor yazılmadı.');
    // Boş gün için dosya oluşturma; kuyruk temiz kalsın
    process.exit(0);
  }

  const satirlar = [
    `# AEO sinyal kuyruğu — ${bugun}`,
    '',
    `${adaylar.length} yeni aday (eşik: ${ESIK} puan). Taranan kaynak: ${KAYNAKLAR.length}.`,
    '',
    '> Bu liste otomatik üretildi. İçerik üretilmedi, yayın yapılmadı —',
    '> yalnızca konu adayı. Yazılacak olanı insan seçer.',
    '',
  ];

  for (const a of adaylar.slice(0, 25)) {
    satirlar.push(`## ${a.baslik}`);
    satirlar.push('');
    satirlar.push(`- **Skor:** ${a.skor} · **Kaynak:** ${a.kaynak} (${a.kaynakTipi})`);
    satirlar.push(`- **Eşleşen:** ${a.eslesen.join(', ')}`);
    satirlar.push(`- **Bağlantı:** ${a.link}`);
    if (a.tarih) satirlar.push(`- **Tarih:** ${a.tarih}`);
    if (a.ozet) {
      satirlar.push('');
      satirlar.push(`${a.ozet}`);
    }
    satirlar.push('');
  }

  await writeFile(raporYolu, satirlar.join('\n'));
  console.log(`Rapor yazıldı: ${raporYolu}`);
  for (const a of adaylar.slice(0, 5)) {
    console.log(`  ${String(a.skor).padStart(3)} · ${a.baslik.slice(0, 70)}`);
  }
}

main().catch((hata) => {
  console.error('Tarama hatası:', hata);
  process.exit(1);
});
