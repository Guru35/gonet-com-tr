// Ortak yapısal veri (src/lib/schema.ts) kabul testleri — WEBDV-SCHEMAHATA · WEBDV-SCHEMAPARTNER.
// Çalıştırma: npm test  (önce astro build, sonra bu dosya; çıktı TAP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sayfa, jsonLd, metin } from './yardimci.mjs';

const SAYFALAR = ['/', '/hakkimizda', '/uzmanlik', '/iletisim', '/deneyimler'];

function yukle(yol) {
  const html = sayfa(yol);
  assert.ok(html, `dist${yol}/index.html yok`);
  return { html, dugumler: jsonLd(html), ham: JSON.stringify(jsonLd(html)) };
}

test('SCHEMAHATA: potentialAction ve Person.workExample yok, Book ayrı düğüm', () => {
  for (const yol of SAYFALAR) {
    const { dugumler, ham } = yukle(yol);
    assert.equal((ham.match(/"potentialAction"/g) || []).length, 0, `${yol}: potentialAction var`);
    assert.equal((ham.match(/"workExample"/g) || []).length, 0, `${yol}: workExample var`);
    const kitap = dugumler.filter((d) => d['@type'] === 'Book');
    assert.equal(kitap.length, 1, `${yol}: Book düğümü 1 değil`);
    assert.equal(kitap[0].author?.['@id'], 'https://gonet.com.tr/#founder', `${yol}: Book.author kurucu değil`);
  }
});

// HKDAN kararı (2026-11-19): «ilk üç» yalnız kaynaklı biçimle ve yalnız Hakkımızda + Deneyimler'de.
// Ortak şema her sayfada (ana sayfa dahil) basıldığı için bu iddiayı taşıyamaz.
test('SCHEMAPARTNER: şema «ilk üç / ilk 3 Google Partner / Certified Partner» taşımaz', () => {
  for (const yol of SAYFALAR) {
    const { ham } = yukle(yol);
    for (const re of [/ilk (üç|3)\b/i, /Certified Partner/i]) {
      assert.doesNotMatch(ham, re, `${yol}: şemada ${re}`);
    }
  }
});

test('SCHEMAPARTNER: şemadaki Google iş ortaklığı cümlesi sayfada görünür', () => {
  const ifade = "Google'ın ajans programlarında sertifikalı iş ortağı";
  for (const yol of ['/hakkimizda', '/uzmanlik']) {
    const { html, ham } = yukle(yol);
    assert.ok(ham.includes(ifade), `${yol}: şemada iş ortaklığı ifadesi yok`);
    assert.ok(metin(html).includes(ifade), `${yol}: ifade görünür metinde yok`);
  }
});
