// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
        !page.endsWith('/istatistik1'),
    }),
  ],
});
