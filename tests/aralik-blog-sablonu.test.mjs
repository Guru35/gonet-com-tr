import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import test from 'node:test';

test('GW-D02 Aralık blog şablonu: 3 maddelik özet, karşılaştırma tablosu ve SSS akordeon + FAQPage JSON-LD üretir', () => {
  const kok = process.cwd();
  const slug = '__gw_d02_aralik_test_yazisi';
  const yaziYol = path.join(kok, 'src', 'content', 'blog', `${slug}.md`);
  const testDist = path.join(kok, 'dist-gwd02-test');

  const ornekIcerik = `---
title: "GW-D02 Aralık Blog Şablonu Doğrulama Yazısı"
description: "Aralık yayın takvimi için 3 maddelik özet, karşılaştırma tablosu ve SSS JSON-LD çıktı doğrulaması."
published: 2026-11-20
category: "Test"
tags: ["aeo", "test"]
draft: false
ozetMaddeleri:
  - "Birinci özet maddesi: Arama motorları doğrudan yanıt bekler."
  - "İkinci özet maddesi: Karşılaştırma tabloları taranabilirliği artırır."
  - "Üçüncü özet maddesi: FAQPage şeması görünür içerikle birebir eşleşmelidir."
karsilastirmaTablosu:
  baslik: "Geleneksel SEO ve AEO Karşılaştırması"
  sutunlar:
    - "Ölçüt"
    - "Geleneksel SEO"
    - "AEO / GEO"
  satirlar:
    -
      - "Hedef"
      - "Mavi bağlantı sıralaması"
      - "Doğrudan yapay zekâ alıntısı"
    -
      - "Yapı"
      - "Uzun düz metin"
      - "3 maddelik özet, tablo ve SSS"
sss:
  - soru: "Aralık şablonu mevcut yazıları etkiler mi?"
    cevap: "Hayır, tüm yeni alanlar isteğe bağlıdır ve geriye dönük uyumludur."
  - soru: "FAQPage şeması otomatik üretiliyor mu?"
    cevap: "Evet, sss alanı dolu olduğunda geçerli JSON-LD çıktısı otomatik eklenir."
---

Bu yazı yalnızca GW-D02 şablon bileşenlerinin derleme çıktısını doğrulamak için geçici olarak oluşturulmuştur.
`;

  fs.writeFileSync(yaziYol, ornekIcerik, 'utf8');
  try {
    execSync(`npx astro build --outDir ${testDist}`, { cwd: kok, stdio: 'pipe' });

    const htmlYol = path.join(testDist, 'blog', slug, 'index.html');
    assert.equal(fs.existsSync(htmlYol), true, 'Örnek Aralık blog HTML çıktısı üretilmeli');

    const html = fs.readFileSync(htmlYol, 'utf8');

    // G1: Yönetici Özeti (3 madde)
    assert.match(html, /Yönetici Özeti — 3 Maddede/);
    assert.ok(html.includes('Birinci özet maddesi: Arama motorları doğrudan yanıt bekler.'));
    assert.ok(html.includes('İkinci özet maddesi: Karşılaştırma tabloları taranabilirliği artırır.'));
    assert.ok(html.includes('Üçüncü özet maddesi: FAQPage şeması görünür içerikle birebir eşleşmelidir.'));

    // G2: Karşılaştırma Tablosu (scope="col" ve overflow-x-auto)
    assert.ok(html.includes('Geleneksel SEO ve AEO Karşılaştırması'));
    assert.ok(html.includes('overflow-x-auto'));
    assert.match(html, /<th\b[^>]*\bscope="col"[^>]*>[\s\S]*?Ölçüt/);
    assert.ok(html.includes('Doğrudan yapay zekâ alıntısı'));

    // G3: Native <details>/<summary> akordeon + geçerli FAQPage JSON-LD
    assert.match(html, /<details\b[^>]*>[\s\S]*?<summary\b[^>]*>[\s\S]*?Aralık şablonu mevcut yazıları etkiler mi\?/);
    assert.match(html, /<details\b[^>]*>[\s\S]*?<summary\b[^>]*>[\s\S]*?FAQPage şeması otomatik üretiliyor mu\?/);

    const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const parsedSchemas = ldMatches.map((m) => JSON.parse(m[1]));
    const faqSchemas = parsedSchemas.filter((s) => s['@type'] === 'FAQPage');

    assert.equal(faqSchemas.length, 1, 'Sayfada tam bir adet FAQPage JSON-LD olmalı');
    assert.equal(faqSchemas[0]['@context'], 'https://schema.org');
    assert.equal(faqSchemas[0].mainEntity.length, 2);
    assert.equal(faqSchemas[0].mainEntity[0]['@type'], 'Question');
    assert.equal(faqSchemas[0].mainEntity[0].name, 'Aralık şablonu mevcut yazıları etkiler mi?');
    assert.equal(
      faqSchemas[0].mainEntity[0].acceptedAnswer.text,
      'Hayır, tüm yeni alanlar isteğe bağlıdır ve geriye dönük uyumludur.',
    );
  } finally {
    if (fs.existsSync(yaziYol)) fs.unlinkSync(yaziYol);
    if (fs.existsSync(testDist)) fs.rmSync(testDist, { recursive: true, force: true });
  }
});
