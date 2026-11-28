// Ortak yapısal veri (src/lib/schema.ts) kabul testleri — WEBDV-SCHEMAHATA · WEBDV-SCHEMAPARTNER.
// Çalıştırma: npm test  (önce astro build, sonra bu dosya; çıktı TAP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sayfa, jsonLd, metin, basliklar } from './yardimci.mjs';

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

// AEOV2 bulgusu + operatör kararı (2026-11-21): yıl kilometre taşları Event değil, ItemList.
test('deneyimler: Event 0, tek ItemList; her ListItem position + name + description, başlık görünür', () => {
  const { html, dugumler } = yukle('/deneyimler');
  assert.equal((html.match(/"@type":"Event"/g) || []).length, 0, 'Event var');
  const listeler = dugumler.filter((d) => d['@type'] === 'ItemList');
  assert.equal(listeler.length, 1, 'ItemList sayısı 1 değil');
  const ogeler = listeler[0].itemListElement;
  assert.equal(listeler[0].numberOfItems, ogeler.length);
  const gorunur = metin(html);
  ogeler.forEach((o, i) => {
    assert.equal(o['@type'], 'ListItem');
    assert.equal(o.position, i + 1);
    assert.ok(o.name && o.description, `öğe ${i + 1} eksik alan`);
    assert.ok(gorunur.includes(o.name.split(' — ').slice(1).join(' — ')), `öğe ${i + 1} başlığı görünmüyor`);
  });
});

test('GW-AEO-FIX-01: tüm Organization şemalarında name alanı var, /uzmanlik FAQPage taşır, /yaratici-manifesto h1 taşır', () => {
  const orgSayfalari = [
    ...SAYFALAR,
    '/yetenekler',
    '/yetenekler/seo-klasik-arama',
    '/creative-ai',
  ];
  for (const yol of orgSayfalari) {
    const html = sayfa(yol);
    assert.ok(html, `${yol}: HTML yok`);
    const orgDugumleri = jsonLd(html).filter((d) => d['@type'] === 'Organization');
    assert.ok(orgDugumleri.length >= 1, `${yol}: Organization düğümü yok`);
    for (const org of orgDugumleri) {
      assert.ok(typeof org.name === 'string' && org.name.trim().length > 0, `${yol}: Organization.name eksik`);
    }
  }
  const uzmanlikHtml = sayfa('/uzmanlik');
  assert.ok(uzmanlikHtml, '/uzmanlik HTML yok');
  const uzmanlikFaq = jsonLd(uzmanlikHtml).filter((d) => d['@type'] === 'FAQPage');
  assert.equal(uzmanlikFaq.length, 1, '/uzmanlik FAQPage düğümü 1 olmalı');
  assert.ok(uzmanlikHtml.includes('seo.gonet.com.tr'), '/uzmanlik güncel AEO/GEO metni eksik');

  const manifestoHtml = sayfa('/yaratici-manifesto');
  assert.ok(manifestoHtml, '/yaratici-manifesto HTML yok');
  assert.equal(basliklar(manifestoHtml).filter((h) => h === 1).length, 1, '/yaratici-manifesto tek h1 taşımalı');
});
