// Test yardımcıları — bağımlılıksız HTML okuma (cheerio yok; depoya paket eklenmez).
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DIST = join(KOK, 'dist');

export function oku(yol) {
  return readFileSync(join(KOK, yol), 'utf8');
}

export function varMi(yol) {
  return existsSync(join(KOK, yol));
}

const VARLIKLAR = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': '\u00a0' };
export function coz(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);|&#39;/g, (m) => VARLIKLAR[m] ?? m);
}

export function metin(html) {
  return coz(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

export function sayfa(yol) {
  // yol: '/sss' → dist/sss/index.html
  const dosya = join(DIST, yol.replace(/^\//, ''), 'index.html');
  return existsSync(dosya) ? readFileSync(dosya, 'utf8') : null;
}

// Sayfadaki tüm application/ld+json bloklarını ayrıştırır (geçersiz JSON → fırlatır).
export function jsonLd(html) {
  const sonuc = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    const ham = JSON.parse(m[1]);
    const liste = Array.isArray(ham) ? ham : ham['@graph'] ? ham['@graph'] : [ham];
    sonuc.push(...liste);
  }
  return sonuc;
}

// /sss içindeki görünür soru-cevap çiftleri: <details> → <summary> sorusu + ilk <p> cevabı.
export function gorunurSss(html) {
  const out = [];
  const parcalar = html.split(/<details\b/).slice(1);
  for (const p of parcalar) {
    const govde = p.split('</details>')[0];
    const ozet = govde.match(/<summary[^>]*>([\s\S]*?)<\/summary>/);
    const cevap = govde.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    if (!ozet || !cevap) continue;
    // özet içinde süsleyici «+» işareti aria-hidden; soru ikinci <span>
    const soru = ozet[1].replace(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/, '');
    const linkler = [...govde.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((a) => ({ href: a[1], etiket: metin(a[2]) }));
    out.push({ soru: metin(soru), cevap: metin(cevap[1]), linkler, govde });
  }
  return out;
}

export function basliklar(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>/g)].map((m) => Number(m[1]));
}
