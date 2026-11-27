// Üst Mega Menü, Sağ Alt Göz Akordiyon Menüsü (#eye-menu) ve Alt Bilgi (#site-footer) kabul testleri.
// Çalıştırma: npm test (önce astro build, sonra bu dosya; çıktı TAP).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, metin, sayfa } from './yardimci.mjs';

const KONTROL_SAYFALARI = ['/', '/ekibimiz', '/en'];

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

const YASAKLI_IC_YOLLAR = ['/blog/onizleme', '/istatistik', '/istatistik1', '/portal'];

function headerCikar(html) {
  return html.match(/<header[^>]*\bid=["']site-header["'][\s\S]*?<\/header>/i)?.[0] ?? '';
}

function eyeMenuCikar(html) {
  return (
    html.match(/<div[^>]*\bid=["']eye-menu["'][\s\S]*?<\/div>\s*<style/i)?.[0] ??
    html.match(/<div[^>]*\bid=["']eye-menu["'][\s\S]*?<\/div>/i)?.[0] ??
    ''
  );
}

function footerCikar(html) {
  return html.match(/<footer[^>]*\bid=["']site-footer["'][\s\S]*?<\/footer>/i)?.[0] ?? '';
}

function hrefleriCikar(parca) {
  return [...parca.matchAll(/\bhref=["']([^"']+)["']/gi)].map((m) => m[1]);
}

function distYoluVarMi(href) {
  const temiz = href.split('#')[0].split('?')[0].replace(/^\/+/, '');
  if (!temiz) return existsSync(join(DIST, 'index.html'));
  return (
    existsSync(join(DIST, temiz, 'index.html')) ||
    existsSync(join(DIST, `${temiz}.html`)) ||
    existsSync(join(DIST, temiz))
  );
}

test('Üst Mega Menü: 5 ebeveyn, 4 mega panel ve tüm alt grup linkleri dist HTML içinde mevcut', () => {
  const beklenenPaneller = ['hizmetler', 'calismalar', 'labs', 'kurumsal'];
  const beklenenLinkler = [
    '/aeo-geo-denetimi',
    '/aeo-geo-denetimi/ornek-rapor',
    '/yapay-zeka-dijital-ajans',
    '/creative-ai',
    '/ai-sohbet-asistani-gelistirme',
    '/araclar/seo-analiz',
    '/saglik-turizmi-performans-pazarlama',
    '/insaat-dijital-pazarlama',
    '/siyasi-dijital-kampanya',
    '/uzmanlik',
    '/yetenekler',
    '/case-studies',
    '/markalar',
    '/deneyimler',
    '/galeri',
    '/sosyal-medya-galeri',
    '/sergi',
    '/labs',
    '/labs/ybf',
    '/labs/dupia',
    '/labs/sosyalmedya-org-tr',
    '/blog',
    '/haberler',
    '/sss',
    '/guncellemeler',
    '/hakkimizda',
    '/ekibimiz',
    '/ik',
    '/yaratici-manifesto',
    '/kurumsal-kimlik',
    '/kvkk',
    '/iletisim',
    '/teklif-al',
    '/merhaba',
  ];

  for (const yol of ['/', '/ekibimiz']) {
    const html = sayfa(yol);
    assert.ok(html && html.length > 0, `${yol}: derlenmiş HTML bulunamadı`);

    const header = headerCikar(html);
    assert.ok(header.length > 0, `${yol}: #site-header bulunamadı`);
    assert.match(header, /\bid=["']site-logo["']/, `${yol}: #site-logo eksik`);
    assert.match(header, /\bid=["']header-line["']/, `${yol}: #header-line eksik`);
    assert.match(header, /\bid=["']theme-toggle["']/, `${yol}: #theme-toggle eksik`);
    assert.match(header, /\bid=["']mobile-menu-toggle["']/, `${yol}: #mobile-menu-toggle eksik`);
    assert.match(header, /\baria-controls=["']eye-menu["']/, `${yol}: #mobile-menu-toggle aria-controls="eye-menu" eksik`);

    const gorunur = metin(header);
    for (const etiket of ['Hizmetler', 'Çalışmalar', 'Labs & İçerik', 'Kurumsal', 'İletişim']) {
      assert.ok(gorunur.includes(etiket), `${yol}: üst menüde "${etiket}" etiketi eksik`);
    }

    for (const panelId of beklenenPaneller) {
      assert.match(
        header,
        new RegExp(`id=["']mega-panel-${panelId}["']`),
        `${yol}: #mega-panel-${panelId} bulunamadı`,
      );
      assert.match(
        header,
        new RegExp(`aria-controls=["']mega-panel-${panelId}["']`),
        `${yol}: mega-panel-${panelId} için aria-controls eksik`,
      );
    }

    const headerHrefleri = new Set(hrefleriCikar(header));
    for (const href of beklenenLinkler) {
      assert.ok(headerHrefleri.has(href), `${yol}: #site-header içinde ${href} bağlantısı eksik`);
    }
  }
});

test('#eye-menu: tek-açık akordiyon yapısı, 4 ebeveyn grup ve hızlı aksiyonlar mevcut', () => {
  const trSayfalari = [
    { yol: '/', beklenenEnHref: '/en' },
    { yol: '/ekibimiz', beklenenEnHref: '/en/team' },
  ];
  for (const { yol, beklenenEnHref } of trSayfalari) {
    const html = sayfa(yol);
    assert.ok(html, `${yol}: derlenmiş HTML bulunamadı`);

    assert.match(html, /\bid=["']eye-widget["']/, `${yol}: #eye-widget bulunamadı`);
    assert.match(html, /\bid=["']eye-toggle["']/, `${yol}: #eye-toggle bulunamadı`);

    const eyeMenu = eyeMenuCikar(html);
    assert.ok(eyeMenu.length > 0, `${yol}: #eye-menu bulunamadı`);
    assert.match(eyeMenu, /\bid=["']eye-menu-close["']/, `${yol}: #eye-menu-close eksik`);

    const detailsEslesmeleri = [...eyeMenu.matchAll(/<details\b[^>]*name=["']eye-nav-group["'][^>]*>/gi)];
    assert.equal(detailsEslesmeleri.length, 4, `${yol}: #eye-menu içinde 4 adet name="eye-nav-group" akordiyon olmalı`);

    const gorunur = metin(eyeMenu);
    for (const ebeveyn of ['01', 'Hizmetler', '02', 'Çalışmalar', '03', 'Labs & İçerik', '04', 'Kurumsal']) {
      assert.ok(gorunur.includes(ebeveyn), `${yol}: #eye-menu içinde "${ebeveyn}" grubu eksik`);
    }

    const eyeHrefleri = new Set(hrefleriCikar(eyeMenu));
    for (const href of ['/ekibimiz', '/ik', '/araclar/seo-analiz', '/teklif-al', '/iletisim', '/merhaba', beklenenEnHref]) {
      assert.ok(eyeHrefleri.has(href), `${yol}: #eye-menu içinde ${href} bağlantısı eksik`);
    }

    assert.match(eyeMenu, /data-tema-sec=["']light["']/, `${yol}: #eye-menu içinde açık tema butonu eksik`);
    assert.match(eyeMenu, /data-tema-sec=["']dark["']/, `${yol}: #eye-menu içinde koyu tema butonu eksik`);
  }

  // /ekibimiz sayfasında Kurumsal grubu (04) başlangıçta açık olmalı
  const ekibimizEye = eyeMenuCikar(sayfa('/ekibimiz'));
  assert.match(
    ekibimizEye,
    /<details\b[^>]*name=["']eye-nav-group["'][^>]*\bopen\b[^>]*>[\s\S]*?Kurumsal/i,
    '/ekibimiz sayfasında Kurumsal akordiyon grubu open olmalı',
  );
});

test('/en sayfası: İngilizce üst menü, akordiyon, footer ve TR dil geçişleri mevcut', () => {
  const html = sayfa('/en');
  assert.ok(html && html.length > 0, 'dist/en/index.html bulunamadı');

  const header = headerCikar(html);
  const eyeMenu = eyeMenuCikar(html);
  const footer = footerCikar(html);

  assert.ok(header.length > 0, '/en: #site-header bulunamadı');
  assert.ok(eyeMenu.length > 0, '/en: #eye-menu bulunamadı');
  assert.ok(footer.length > 0, '/en: #site-footer bulunamadı');

  const headerMetin = metin(header);
  for (const etiket of ['Services', 'Work', 'Overview & Tools', 'Company', 'Contact']) {
    assert.ok(headerMetin.includes(etiket), `/en: üst menüde "${etiket}" İngilizce etiketi eksik`);
  }
  assert.ok(headerMetin.includes('TR'), '/en: üst menüde TR dil geçişi eksik');

  const headerHrefleri = new Set(hrefleriCikar(header));
  for (const href of [
    '/',
    '/en',
    '/en/aeo-geo-audit',
    '/en/ai-digital-agency',
    '/en/medical-tourism-marketing',
    '/en/case-studies',
    '/en/team',
    '/en/ai-culture',
    '/araclar/seo-analiz',
    '/iletisim',
    '/teklif-al',
  ]) {
    assert.ok(headerHrefleri.has(href), `/en: #site-header içinde ${href} bağlantısı eksik`);
  }

  const eyeMetin = metin(eyeMenu);
  for (const etiket of ['Services', 'Work', 'Overview & Tools', 'Company']) {
    assert.ok(eyeMetin.includes(etiket), `/en: #eye-menu içinde "${etiket}" grubu eksik`);
  }
  const eyeHrefleri = new Set(hrefleriCikar(eyeMenu));
  assert.ok(eyeHrefleri.has('/'), '/en: #eye-menu içinde TR anasayfa (/) geçişi eksik');

  const footerMetin = metin(footer);
  for (const etiket of ['About', 'Explore', 'Contact', 'Social', 'Cookie settings']) {
    assert.ok(footerMetin.includes(etiket), `/en: #site-footer içinde "${etiket}" etiketi eksik`);
  }
  const footerHrefleri = new Set(hrefleriCikar(footer));
  assert.ok(footerHrefleri.has('/'), '/en: #site-footer içinde TR geçiş linki (/) eksik');
});

test('Navigasyon linkleri kırık değil ve gizli kasa adları / taslak yollar HTML içine sızmıyor', () => {
  for (const yol of KONTROL_SAYFALARI) {
    const html = sayfa(yol);
    assert.ok(html, `${yol}: derlenmiş HTML bulunamadı`);

    for (const yasak of YASAKLI_KASA_ADLARI) {
      assert.equal(html.includes(yasak), false, `${yol}: yasaklı kasa adı sızdı -> ${yasak}`);
    }

    const bolumler = [headerCikar(html), eyeMenuCikar(html), footerCikar(html)];
    for (const bolum of bolumler) {
      const hrefler = hrefleriCikar(bolum);
      for (const href of hrefler) {
        if (!href.startsWith('/')) continue;
        for (const gizliYol of YASAKLI_IC_YOLLAR) {
          assert.equal(href === gizliYol || href.startsWith(`${gizliYol}/`), false, `${yol}: taslak/iç yol sızdı -> ${href}`);
        }
        assert.equal(distYoluVarMi(href), true, `${yol}: navigasyonda kırık iç bağlantı -> ${href}`);
      }
    }
  }
});
