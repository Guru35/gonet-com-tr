// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

/**
 * GW-D01: Taslak veya yayın tarihi gelecekte olan blog yazılarının
 * sitemap-*.xml içinde listelenmesini engelleyen çifte zırh.
 */
function gizliBlogYollariOlustur() {
  const gizli = new Set();
  const blogDizin = path.resolve('src/content/blog');
  if (!fs.existsSync(blogDizin)) return gizli;

  const simdi = process.env.GONET_BUILD_NOW ? new Date(process.env.GONET_BUILD_NOW) : new Date();
  const yuru = (dizin, onEk = '') => {
    for (const girdi of fs.readdirSync(dizin, { withFileTypes: true })) {
      const tam = path.join(dizin, girdi.name);
      if (girdi.isDirectory()) {
        yuru(tam, `${onEk}${girdi.name}/`);
        continue;
      }
      if (!girdi.name.endsWith('.md')) continue;
      const icerik = fs.readFileSync(tam, 'utf8');
      const fm = icerik.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fm) continue;
      const blok = fm[1];
      const taslak = /^draft:\s*true\s*$/m.test(blok);
      const durumEs = blok.match(/^yayinDurumu:\s*['"]?([a-z]+)['"]?\s*$/m);
      const durumEngelli = durumEs && durumEs[1] !== 'yayinda';
      const tarihEs = blok.match(/^published:\s*['"]?([^'"\n\r]+)['"]?\s*$/m);
      const gelecekTarih = tarihEs ? new Date(tarihEs[1].trim()).getTime() > simdi.getTime() : false;
      if (taslak || durumEngelli || gelecekTarih) {
        const slug = `${onEk}${girdi.name.replace(/\.md$/, '')}`;
        gizli.add(`/blog/${slug}`);
        gizli.add(`/blog/${slug}/`);
      }
    }
  };
  yuru(blogDizin);
  return gizli;
}

const gizliBlogYollari = gizliBlogYollariOlustur();

// https://astro.build/config
// Eski PHP/WP URL'leri yeni Astro route'larına 301 yönlendirme.
// Astro static build'de bunlar HTML meta refresh + canonical olarak yansır;
// server-side gerçek 301 için nginx/Coolify reverse-proxy katmanında
// `public/_redirects` veya nginx config kullanılır (paralel hazırlandı).
const legacyRedirects = {
  // Örtüşen 7 blog (eski WP → yeni Astro)
  '/seo-nedir': '/blog/seo-nedir',
  '/sem-nedir': '/blog/arama-motoru-pazarlamasi-nedir',
  '/arama-motoru-pazarlamasi-nedir': '/blog/arama-motoru-pazarlamasi-nedir',
  '/dijital-pazarlamada-23-yilda-neler-oldu': '/blog/dijital-pazarlamada-23-yilda-neler-oldu',
  '/saglik-turizmi-sektorunde-dijital-cagin-gereklilikleri': '/blog/saglik-turizmi-sektorunde-dijital-cagin-gereklilikleri',
  '/sosyal-medya-kamu-hizmetleri-ve-dijital-ajanslar-arasindaki-kopru': '/blog/sosyal-medya-kamu-hizmetleri-ve-dijital-ajanslar-arasindaki-kopru',
  '/web-tasarimda-cografi-etkiler': '/blog/web-tasarimda-cografi-etkiler',
  '/21-yuzyilda-reklam-ajanslari': '/blog/21-yuzyilda-reklam-ajanslari',
  // Eski kurumsal PHP/HTML sayfaları → yeni Astro karşılıkları
  '/hakkimizda.html': '/hakkimizda',
  '/iletisim.html': '/iletisim',
  '/markalar.html': '/markalar',
  '/isler.html': '/case-studies',
  '/marka_musteriler.php': '/markalar',
  '/Referanslarimiz-14-4.php': '/markalar',
  '/index.php': '/',
  '/home': '/',
  // Sağlık vakası adsız yeni adrese taşındı (WEBDV-21); eski adres kalıcı yönlendirilir.
  '/case-studies/ege-tup-bebek-google-ads': '/case-studies/saglik-2005-arama-reklami',
};

export default defineConfig({
  site: 'https://gonet.com.tr',
  trailingSlash: 'ignore',
  redirects: legacyRedirects,
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: {
      prefixDefaultLocale: false, // tr root'ta, en /en/ altında
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr-TR', en: 'en-US' },
      },
      // Sitemap'ten çıkar: admin, eski tasarım galeri iterasyonları (/galeri/01-07),
      // duplicate istatistik1. Search engine'lerin (özellikle Bing) bunları
      // crawl edip site kalitesini düşürmesini engelle.
      //
      // 2026-06-09 GSC tarama bulgusu: sosyal-medya-galeri/* detay sayfaları
      // <meta robots=noindex> içeriyor ama sitemap'te vardı (çelişki) →
      // "Crawled - currently not indexed" GSC raporuna düşüyorlardı.
      // /sosyal-medya-galeri/<slug> görsel viewer'lar; noindex + sitemap dışı olmalı.
      // /yaratici-manifesto + /sergi de thin (131w/159w) deneme sayfaları → çıkarıldı.
      filter: (page) =>
        !page.includes('/admin/') &&
        !/\/galeri\/0[1-7]-/.test(page) &&
        !/\/sosyal-medya-galeri\/[0-9]/.test(page) &&
        !page.endsWith('/yaratici-manifesto/') &&
        !page.endsWith('/yaratici-manifesto') &&
        !page.endsWith('/sergi/') &&
        !page.endsWith('/sergi') &&
        !page.endsWith('/istatistik1/') &&
        !page.endsWith('/istatistik1') &&
        // /merhaba — müşteri portalı yapım-aşamasında placeholder (noindex); portal
        // canlıya çıkınca bu satır kaldırılır. (2026-06-12)
        !page.endsWith('/merhaba/') &&
        !page.endsWith('/merhaba') &&
        !page.includes('/blog/onizleme') &&
        !gizliBlogYollari.has(new URL(page).pathname),
      // Site haritası adresi sayfanın canonical'ı ile aynı olsun: canonical çizgisiz (BaseLayout, Astro.url.pathname),
      // harita çizgili üretiyordu → sondaki «/» atılır (ana sayfa «/» kalır). Canonical'a dokunulmaz.
      serialize: (item) => {
        const u = new URL(item.url);
        return u.pathname === '/' ? item : { ...item, url: item.url.replace(/\/$/, '') };
      },
    }),
  ],
});
