#!/usr/bin/env node
/**
 * Güncellemeler üreteci — git geçmişinden /guncellemeler sayfasının verisini üretir.
 *
 * Neden git: kayıtlar zaten her deploy'da yazılıyor. Elle tutulan changelog iki ay
 * içinde ölür; bu kendini besler.
 *
 * Kural: ziyaretçinin umursamayacağı commit'ler (chore, docs, ci, test) atlanır.
 * Kalanlar tipine göre sınıflanır ve değişen dosyalardan ilgili sayfaya link çıkarılır.
 *
 * Kullanım: node scripts/guncellemeler-uret.mjs
 * Çıktı:    src/data/guncellemeler.json
 */

import { execSync } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const CIKTI = 'src/data/guncellemeler.json';
const AYRAC = ''; // commit alanları arası (metinde geçmez)
const SATIR_AYRAC = '';

// Commit tipi → ziyaretçiye görünen kategori. Listede olmayan tipler atlanır.
const TIP_HARITA = {
  feat: 'yeni',
  fix: 'duzeltme',
  perf: 'iyilestirme',
  refactor: 'iyilestirme',
  style: 'iyilestirme',
};

/** "feat(blog): açıklama" → {tip, kapsam, baslik} · eşleşmezse null (atlanır) */
function commitAyristir(konu) {
  const m = konu.match(/^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/);
  if (!m) return null;
  const [, tipHam, kapsam, aciklama] = m;
  const tip = TIP_HARITA[tipHam.toLowerCase()];
  if (!tip) return null; // chore/docs/ci/test → ziyaretçiyi ilgilendirmez
  const baslik = aciklama.charAt(0).toLocaleUpperCase('tr-TR') + aciklama.slice(1);
  return { tip, kapsam: kapsam || null, baslik };
}

/** Dosya yolunu sayfa URL'ine çevirir; tur=0 sayfa, tur=1 blog yazısı. Eşleşmezse null. */
function dosyadanLink(f, tur) {
  if (tur === 0) {
    if (/^src\/pages\/[^/]+\.astro$/.test(f) && !f.includes('[') && !/index\.astro$/.test(f)) {
      return `/${path.basename(f, '.astro')}`;
    }
    if (/^src\/pages\/[^/]+\/index\.astro$/.test(f)) return `/${f.split('/')[2]}`;
    return null;
  }
  if (/^src\/content\/blog\/.+\.md$/.test(f)) return `/blog/${path.basename(f, '.md')}`;
  return null;
}

/**
 * Değişen dosyalardan sayfa linki çıkar. Bulamazsa null.
 * Öncelik sırası: (1) yeni açılan sayfa, (2) yeni blog yazısı, (3) düzenlenen sayfa,
 * (4) düzenlenen blog yazısı. Gerekçe: tek commit hem sayfa hem yazı içerdiğinde
 * güncellemenin asıl konusu yeni sayfadır — yazılar zaten blog listesinde görünür.
 */
function linkCikar(eklenen, degisen) {
  for (const liste of [eklenen, degisen]) {
    for (const tur of [0, 1]) {
      for (const f of liste) {
        const link = dosyadanLink(f, tur);
        if (link) return link;
      }
    }
  }
  return null;
}

function main() {
  const bicim = ['%h', '%ad', '%s'].join(AYRAC) + SATIR_AYRAC;
  const ham = execSync(`git log --date=short --pretty=format:"${bicim}" --no-merges`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });

  const kayitlar = [];

  for (const satir of ham.split(SATIR_AYRAC)) {
    const temiz = satir.trim();
    if (!temiz) continue;
    const [hash, tarih, konu] = temiz.split(AYRAC);
    if (!hash || !konu) continue;

    const ayristirilmis = commitAyristir(konu);
    if (!ayristirilmis) continue;

    // Bu commit'te eklenen/değişen dosyalar → link
    const eklenen = [];
    const degisen = [];
    try {
      const cikti = execSync(`git show --name-status --pretty=format: ${hash}`, { encoding: 'utf8' });
      for (const satir of cikti.split('\n')) {
        const [durum, yol] = satir.trim().split(/\t+/);
        if (!yol) continue;
        (durum === 'A' ? eklenen : degisen).push(yol);
      }
    } catch {
      /* commit okunamadıysa linksiz devam */
    }

    kayitlar.push({ hash, tarih, ...ayristirilmis, link: linkCikar(eklenen, degisen) });
  }

  return kayitlar;
}

let kayitlar = [];
try {
  kayitlar = main();
} catch (hata) {
  console.log(`  ⚠ git geçmişi okunamadı (${hata.message.split('\n')[0]})`);
}

/*
 * Koruma: kayıt üretilemediyse mevcut dosyayı OLDUĞU GİBİ bırak.
 * Sebep: build ortamı repoyu sığ (shallow) klonlarsa git log boş döner; dosyayı
 * ezersek sayfa sessizce boşalır. Commit'li son sürüm her zaman geçerli bir yedektir.
 */
if (kayitlar.length === 0) {
  console.log(`  → Kayıt üretilmedi, ${CIKTI} dokunulmadan bırakıldı.`);
  process.exit(0);
}

const dizin = path.dirname(CIKTI);
if (!existsSync(dizin)) await mkdir(dizin, { recursive: true });
await writeFile(CIKTI, JSON.stringify(kayitlar, null, 2) + '\n');

const sayim = kayitlar.reduce((acc, k) => ({ ...acc, [k.tip]: (acc[k.tip] || 0) + 1 }), {});
console.log(`${CIKTI} yazıldı — ${kayitlar.length} kayıt`);
console.log(`  yeni: ${sayim.yeni || 0} · iyileştirme: ${sayim.iyilestirme || 0} · düzeltme: ${sayim.duzeltme || 0}`);
console.log(`  linkli: ${kayitlar.filter((k) => k.link).length}`);
