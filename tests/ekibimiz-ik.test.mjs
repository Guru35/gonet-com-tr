// Ekibimiz (/ekibimiz, /en/team) ve İK & AI Kültürü (/ik, /en/ai-culture) kabul testleri.
// Çalıştırma: npm test (önce astro build, sonra bu dosya; çıktı TAP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { oku, sayfa, jsonLd, gorunurSss, basliklar, metin } from './yardimci.mjs';

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

test('organizationSchema: 5 departman düğümü ve Edvido sameAs bağlantısı mevcut', () => {
  const html = sayfa('/ekibimiz');
  assert.ok(html, '/ekibimiz bulunamadı');
  const dugumler = jsonLd(html);
  const org = dugumler.find((d) => d['@id'] === 'https://gonet.com.tr/#organization');
  assert.ok(org, 'Organization düğümü bulunamadı');
  assert.equal(Array.isArray(org.department), true, 'Organization.department dizi değil');
  assert.equal(org.department.length, 5, `Organization.department 5 adet olmalı (bulunan: ${org.department?.length})`);
  assert.equal(
    Array.isArray(org.sameAs) && org.sameAs.includes('https://www.edvido.com/tr/ajans/gonet'),
    true,
    'Organization.sameAs içinde Edvido URL bulunamadı',
  );
  assert.equal(
    Array.isArray(org.knowsAbout) &&
      org.knowsAbout.includes('Constitutional AI Agent Governance (Anayasal AI Ajan Yönetişimi)'),
    true,
    'Organization.knowsAbout içinde Constitutional AI Agent Governance eksik',
  );
});

test('/ik ve /en/ai-culture JSON-LD: tekil #termset DefinedTermSet, YBF Varlık Anayasası ve 6 soruluk birebir FAQPage', () => {
  const beklentiler = [
    { yol: '/ik', terim: 'YBF Varlık Anayasası' },
    { yol: '/en/ai-culture', terim: 'YBF Entity Constitution' },
  ];

  for (const { yol, terim } of beklentiler) {
    const html = sayfa(yol);
    assert.ok(html, `${yol} bulunamadı`);
    const dugumler = tumDugumleriTopla(jsonLd(html));

    const termSetler = jsonLd(html).filter((d) => tipEslesirMi(d, 'DefinedTermSet'));
    assert.equal(termSetler.length, 1, `${yol}: kök grafikte tam 1 adet DefinedTermSet olmalı`);
    assert.equal(termSetler[0]['@id'], `https://gonet.com.tr${yol}#termset`, `${yol}: DefinedTermSet @id #termset olmalı`);
    assert.equal(termSetler[0].hasDefinedTerm?.length, 3, `${yol}: DefinedTermSet 3 terim içermeli`);

    const ybfTerimi = dugumler.find((d) => tipEslesirMi(d, 'DefinedTerm') && d.name === terim);
    assert.ok(ybfTerimi, `${yol}: "${terim}" DefinedTerm bulunamadı`);

    const faq = jsonLd(html).find((d) => tipEslesirMi(d, 'FAQPage'));
    assert.ok(faq, `${yol}: FAQPage bulunamadı`);
    const yapisal = faq.mainEntity.map((q) => ({ soru: q.name, cevap: q.acceptedAnswer.text }));
    const gorunur = gorunurSss(html).map(({ soru, cevap }) => ({ soru, cevap }));
    assert.equal(yapisal.length, 6, `${yol}: FAQPage 6 soru içermeli`);
    assert.equal(yapisal.length, gorunur.length, `${yol}: görünür SSS ile JSON-LD soru sayısı eşit değil`);
    for (let i = 0; i < gorunur.length; i++) {
      assert.equal(yapisal[i].soru, gorunur[i].soru, `${yol}: soru #${i + 1} eşleşmiyor`);
      assert.equal(yapisal[i].cevap, gorunur[i].cevap, `${yol}: cevap #${i + 1} eşleşmiyor`);
    }
  }
});

test('/ekibimiz ve /en/team: zenginleştirilmiş SoftwareApplication ve teamPageSchema alanları mevcut', () => {
  for (const yol of ['/ekibimiz', '/en/team']) {
    const html = sayfa(yol);
    assert.ok(html, `${yol} bulunamadı`);
    const rootDugumler = jsonLd(html);
    const aboutPage = rootDugumler.find((d) => tipEslesirMi(d, 'AboutPage'));
    assert.ok(aboutPage, `${yol}: AboutPage bulunamadı`);
    assert.equal(aboutPage.about?.['@id'], 'https://gonet.com.tr/#organization', `${yol}: AboutPage.about eksik`);
    assert.equal(aboutPage.breadcrumb?.['@type'], 'BreadcrumbList', `${yol}: AboutPage.breadcrumb eksik`);
    assert.equal(aboutPage.mainEntity?.['@id'], `https://gonet.com.tr${yol}#roster`, `${yol}: mainEntity.@id #roster değil`);

    const ajanlar = tumDugumleriTopla(rootDugumler).filter((d) => tipEslesirMi(d, 'SoftwareApplication'));
    assert.equal(ajanlar.length, 27);
    for (const ajan of ajanlar) {
      assert.ok(ajan.url, `${yol}: SoftwareApplication.url eksik`);
      assert.ok(ajan.softwareVersion, `${yol}: SoftwareApplication.softwareVersion eksik`);
      assert.ok(ajan.inLanguage, `${yol}: SoftwareApplication.inLanguage eksik`);
      assert.equal(ajan.maintainer?.['@id'], 'https://gonet.com.tr/#organization', `${yol}: SoftwareApplication.maintainer eksik`);
      assert.ok(ajan.disambiguatingDescription, `${yol}: SoftwareApplication.disambiguatingDescription eksik`);
      assert.equal(Array.isArray(ajan.featureList) && ajan.featureList.length >= 3, true, `${yol}: featureList eksik`);
    }
  }
});

test('/en/index.html JSON-LD WebPage inLanguage: "en"', () => {
  const html = sayfa('/en');
  assert.ok(html, 'dist/en/index.html bulunamadı');
  const webPage = jsonLd(html).find((d) => d['@type'] === 'WebPage' && d['@id'] === 'https://gonet.com.tr/en#webpage');
  assert.ok(webPage, '/en WebPage düğümü bulunamadı');
  assert.equal(webPage.inLanguage, 'en', '/en WebPage inLanguage "en" olmalı');
});

test('Reklam Kurulu K-11: llms.txt ve schema.ts içinde "İzmir\'in ilk AI ajansı" geçmiyor', () => {
  const llms = oku('public/llms.txt');
  const schemaKaynak = oku('src/lib/schema.ts');
  assert.equal(/İzmir'in ilk AI ajansı/i.test(llms), false, 'public/llms.txt içinde K-11 ihlali var');
  assert.equal(/İzmir'in ilk AI ajansı/i.test(schemaKaynak), false, 'src/lib/schema.ts içinde K-11 ihlali var');
});
