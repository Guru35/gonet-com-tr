// Ekibimiz (/ekibimiz, /en/team) ve İK & AI Kültürü (/ik, /en/ai-culture) kabul testleri.
// Çalıştırma: npm test (önce astro build, sonra bu dosya; çıktı TAP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sayfa, jsonLd, basliklar, metin } from './yardimci.mjs';

const SAYFALAR = [
  { yol: '/ekibimiz', dosya: 'dist/ekibimiz/index.html', lang: 'tr', trYol: '/ekibimiz', enYol: '/en/team' },
  { yol: '/ik', dosya: 'dist/ik/index.html', lang: 'tr', trYol: '/ik', enYol: '/en/ai-culture' },
  { yol: '/en/team', dosya: 'dist/en/team/index.html', lang: 'en', trYol: '/ekibimiz', enYol: '/en/team' },
  { yol: '/en/ai-culture', dosya: 'dist/en/ai-culture/index.html', lang: 'en', trYol: '/ik', enYol: '/en/ai-culture' },
];

const YASAKLI_KASA_ADLARI = [
  'NanoDental',
  'NANODG1',
  'Molly-G1',
  'MOLLYG1',
  'DLD-G1',
  'DLDDRG1',
  'Gonet-Web-G1',
  'GNWEBG1',
  'Panel-G1',
  'PANELG1',
  '/Users/gonet',
];

const YER_TUTUCU_DESENI = /\[[A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜ0-9_-]*\]/;

// İç içe JSON-LD düğümlerini (mainEntity, itemListElement, inDefinedTermSet vb.) özyinelemeli toplar.
function tumDugumleriTopla(veri, havuz = []) {
  if (Array.isArray(veri)) {
    for (const oge of veri) tumDugumleriTopla(oge, havuz);
    return havuz;
  }
  if (veri && typeof veri === 'object') {
    havuz.push(veri);
    for (const deger of Object.values(veri)) {
      if (deger && typeof deger === 'object') {
        tumDugumleriTopla(deger, havuz);
      }
    }
  }
  return havuz;
}

function tipEslesirMi(dugum, arananTip) {
  const tip = dugum?.['@type'];
  return Array.isArray(tip) ? tip.includes(arananTip) : tip === arananTip;
}

function hreflangHaritasi(html) {
  const harita = new Map();
  const linkler = html.matchAll(/<link\b[^>]*>/gi);
  for (const [etiket] of linkler) {
    if (!/\brel=["']alternate["']/i.test(etiket)) continue;
    const langEslesme = etiket.match(/\bhreflang=["']([^"']+)["']/i);
    const hrefEslesme = etiket.match(/\bhref=["']([^"']+)["']/i);
    if (langEslesme && hrefEslesme) {
      harita.set(langEslesme[1], hrefEslesme[1]);
    }
  }
  return harita;
}

test('4 sayfa dist/ altında var, boş değil ve tek <h1> içeriyor', () => {
  for (const s of SAYFALAR) {
    const html = sayfa(s.yol);
    assert.ok(html && html.trim().length > 0, `${s.dosya} bulunamadı veya boş`);
    const h1Sayisi = basliklar(html).filter((seviye) => seviye === 1).length;
    assert.equal(h1Sayisi, 1, `${s.yol}: tam 1 adet <h1> olmalı (bulunan: ${h1Sayisi})`);
  }
});

test('karşılıklı hreflang="tr", hreflang="en" ve hreflang="x-default" etiketleri doğru', () => {
  for (const s of SAYFALAR) {
    const html = sayfa(s.yol);
    assert.ok(html, `${s.dosya} bulunamadı`);
    const harita = hreflangHaritasi(html);
    assert.equal(harita.get('tr'), `https://gonet.com.tr${s.trYol}`, `${s.yol}: hreflang="tr" hatalı`);
    assert.equal(harita.get('en'), `https://gonet.com.tr${s.enYol}`, `${s.yol}: hreflang="en" hatalı`);
    assert.equal(harita.get('x-default'), `https://gonet.com.tr${s.trYol}`, `${s.yol}: hreflang="x-default" hatalı`);
  }
});

test('/ekibimiz ve /en/team JSON-LD: ItemList (28), 27 SoftwareApplication, FAQPage ve AI ajanlarında Person yok', () => {
  for (const yol of ['/ekibimiz', '/en/team']) {
    const html = sayfa(yol);
    assert.ok(html, `${yol} bulunamadı`);
    const dugumler = tumDugumleriTopla(jsonLd(html));

    const listeler = dugumler.filter((d) => tipEslesirMi(d, 'ItemList') && d.numberOfItems === 28);
    assert.equal(listeler.length, 1, `${yol}: numberOfItems === 28 olan 1 adet ItemList olmalı`);
    assert.equal(listeler[0].itemListElement?.length, 28, `${yol}: itemListElement uzunluğu 28 olmalı`);

    const yazilimAjanlari = dugumler.filter((d) => tipEslesirMi(d, 'SoftwareApplication'));
    assert.equal(yazilimAjanlari.length, 27, `${yol}: tam 27 adet SoftwareApplication olmalı`);

    const faqler = dugumler.filter((d) => tipEslesirMi(d, 'FAQPage'));
    assert.equal(faqler.length, 1, `${yol}: 1 adet FAQPage olmalı`);
    assert.ok((faqler[0].mainEntity?.length ?? 0) > 0, `${yol}: FAQPage soruları boş`);

    const personlar = dugumler.filter((d) => tipEslesirMi(d, 'Person'));
    assert.equal(personlar.length, 1, `${yol}: yalnız kurucu #founder Person olmalı`);
    assert.equal(personlar[0]['@id'], 'https://gonet.com.tr/#founder', `${yol}: Person düğümü #founder değil`);
    assert.equal(
      dugumler.filter((d) => tipEslesirMi(d, 'Person') && String(d['@id'] || '').includes('#agent-')).length,
      0,
      `${yol}: AI ajanı düğümünde Person tipi olmamalı`,
    );
  }
});

test('/ik ve /en/ai-culture JSON-LD: DefinedTermSet ve FAQPage mevcut', () => {
  for (const yol of ['/ik', '/en/ai-culture']) {
    const html = sayfa(yol);
    assert.ok(html, `${yol} bulunamadı`);
    const dugumler = tumDugumleriTopla(jsonLd(html));

    const termSetler = dugumler.filter((d) => tipEslesirMi(d, 'DefinedTermSet'));
    assert.ok(termSetler.length >= 1, `${yol}: DefinedTermSet bulunamadı`);

    const faqler = dugumler.filter((d) => tipEslesirMi(d, 'FAQPage'));
    assert.equal(faqler.length, 1, `${yol}: 1 adet FAQPage olmalı`);
    assert.ok((faqler[0].mainEntity?.length ?? 0) > 0, `${yol}: FAQPage soruları boş`);
  }
});

test('4 sayfada gizli kasa adları ve [BÜYÜK_HARF] yer tutucu deseni bulunmuyor', () => {
  for (const s of SAYFALAR) {
    const html = sayfa(s.yol);
    assert.ok(html, `${s.dosya} bulunamadı`);
    const gorunur = metin(html);
    const semaMetni = JSON.stringify(jsonLd(html));

    for (const yasak of YASAKLI_KASA_ADLARI) {
      assert.equal(html.includes(yasak), false, `${s.yol}: HTML içinde yasaklı ifade bulundu: ${yasak}`);
    }
    assert.doesNotMatch(gorunur, YER_TUTUCU_DESENI, `${s.yol}: görünür metinde [BÜYÜK_HARF] yer tutucu var`);
    assert.doesNotMatch(semaMetni, YER_TUTUCU_DESENI, `${s.yol}: JSON-LD içinde [BÜYÜK_HARF] yer tutucu var`);
  }
});

test('/ekibimiz ve /ik sayfalarında BaseLayout #eye-menu ve #site-footer bağlantıları mevcut', () => {
  for (const yol of ['/ekibimiz', '/ik']) {
    const html = sayfa(yol);
    assert.ok(html, `${yol} bulunamadı`);

    const eyeMenu = html.match(/<div[^>]*\bid=["']eye-menu["'][\s\S]*?<\/div>\s*<style/i)?.[0]
      ?? html.match(/<div[^>]*\bid=["']eye-menu["'][\s\S]*?<\/ul>/i)?.[0]
      ?? '';
    assert.ok(eyeMenu.length > 0, `${yol}: #eye-menu bulunamadı`);
    assert.match(eyeMenu, /href=["']\/ekibimiz["']/, `${yol}: #eye-menu içinde /ekibimiz yok`);
    assert.match(eyeMenu, /href=["']\/ik["']/, `${yol}: #eye-menu içinde /ik yok`);

    const footer = html.match(/<footer[^>]*\bid=["']site-footer["'][\s\S]*?<\/footer>/i)?.[0] ?? '';
    assert.ok(footer.length > 0, `${yol}: #site-footer bulunamadı`);
    assert.match(footer, /href=["']\/ekibimiz["']/, `${yol}: #site-footer içinde /ekibimiz yok`);
    assert.match(footer, /href=["']\/ik["']/, `${yol}: #site-footer içinde /ik yok`);
  }
});
