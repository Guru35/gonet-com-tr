---
title: "WordPress Geliştirme: Legacy ve Headless Mimarilerde Uzman Çözümler"
description: "Gonet'in 26 yıllık deneyimi ile WordPress: custom theme, ACF yapılandırması, REST API entegrasyonu ve headless decoupling. Performans odaklı CMS çözümleri."
h1: "WordPress Geliştirme: Legacy ve Headless Mimarilerde Uzman Çözümler"
categorySlug: "web-gelistirme-altyapi"
categoryName: "Web Geliştirme & Altyapı"
skillSlug: "wordpress-legacy-headless"
skillLevel: "Uzman"
keywords:
  - wordpress-geliştirme
  - custom-wordpress-theme
  - headless-wordpress
  - acf-advanced-custom-fields
  - wp-rest-api
  - wordpress-güvenlik
  - wordpress-performans
  - gutenberg-block-geliştirme
  - woocommerce-özelleştirme
  - wordpress-multisite
  - jamstack-wordpress
  - wordpress-json-ld
  - wordpress-seo
  - wp-graphql
  - wordpress-cdn-entegrasyonu
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Headless WordPress ile geleneksel WordPress arasındaki performans farkı nedir?"
    a: "Headless mimaride frontend (Next.js, Nuxt) static veya server-side rendering ile çalışır, WordPress yalnızca API sağlar. Bu sayede Time to First Byte (TTFB) %40-60 azalır, Core Web Vitals metriklerinde (LCP, CLS, FID) %50+ iyileşme görülür. Geleneksel WordPress'te her sayfa yüklemesi PHP işlemi ve veritabanı sorgusu gerektirir; headless'ta içerik CDN edge'lerinden statik HTML olarak servis edilir, sunucu yükü %70 düşer. Gonet projelerinde, 50K günlük ziyaretçili bir blog sitesi headless'a geçtiğinde sayfa yükleme süresi 3.2 saniyeden 0.8 saniyeye düşmüş, bounce rate %22 azalmıştır."
  - q: "Advanced Custom Fields (ACF) hangi durumlarda custom plugin geliştirmeye tercih edilir?"
    a: "ACF, CRUD işlemleri veritabanında standart custom field olarak saklandığı ve UI üzerinden yönetilebildiği için, sık değişen içerik yapılarında (ürün özellikleri, kampanya modülleri, team member profilleri) idealdir. Custom plugin, karmaşık iş mantığı (fiyatlandırma algoritması, API entegrasyonu, cron job'lar) veya performans kritik hesaplamalar gerektiğinde tercih edilir. Gonet'te ACF'yi 'content schema' için, custom plugin'i 'business logic' için kullanırız. Örnek: Bir e-ticaret sitesinde ürün varyasyonları ACF Repeater ile yönetilir, ancak stok senkronizasyonu ve dinamik fiyatlandırma custom plugin içinde REST API endpoint olarak geliştirilir — böylece editörler arayüzden içerik girer, sistem arka planda hesaplama yapar."
  - q: "WordPress REST API'de custom endpoint geliştirirken güvenlik nasıl sağlanır?"
    a: "Custom endpoint'ler register_rest_route() ile oluşturulur, permission_callback parametresi mutlaka tanımlanmalıdır — current_user_can('edit_posts') veya custom capability kontrolü. Nonce verification (wp_verify_nonce) CSRF koruması sağlar. Hassas veriler için JWT (JSON Web Token) veya OAuth 2.0 authentication kullanılır; Gonet projelerinde wp-jwt-auth plugin'i ile token-based authentication kurulur, her request'te Authorization header'ı validate edilir. Input sanitization (sanitize_text_field, wp_kses_post) ve output escaping (esc_html, esc_url) XSS ataklarını engeller. Rate limiting için wp-rest-api-rate-limit plugin'i veya Cloudflare Rate Limiting uygulanır. HTTPS zorunlu tutulur (force_ssl_admin), API endpoint'leri sadece HTTPS üzerinden erişilebilir yapılır."
  - q: "WordPress Multisite yapısı hangi kurumsal senaryolarda önerilir?"
    a: "Multisite, tek WordPress kurulumu içinde birden fazla site yönetimini sağlar; franchises, bölgesel şubeler, marka aileleri için idealdir. Avantajları: merkezi plugin/tema yönetimi (%60 bakım süresi tasarrufu), paylaşılan kullanıcı veritabanı (SSO entegrasyonu kolaylaşır), tek yedekleme/güvenlik güncellemesi. Dezavantajı: tüm siteler aynı sunucudadır, bir sitenin yüksek trafiği diğerlerini etkiler. Gonet, Multisite'ı şu senaryolarda önerir: 10+ benzer yapıdaki site, merkezden içerik dağıtımı (network-wide post syndication), unified analytics. Örnek: 25 bölgesel franchise sitesi, merkez ofisten ürün katalog güncellemesi alır ancak her şube yerel kampanyaları kendi paneliyle yönetir. Alternative: Her site ayrı WordPress kurulumu + WP Migrate DB Pro ile selective sync — daha yüksek izolasyon, ama yönetim yükü fazla."
  - q: "WordPress'te Schema.org markup'ı ACF verilerinden otomatik nasıl üretilir?"
    a: "ACF field group'larına Schema.org entity'lere (Product, Article, Event, Organization) karşılık gelen field'lar eklenir. functions.php içinde wp_head hook'u ile JSON-LD script tag'i enjekte edilir: get_field() ile ACF değerleri çekilir, PHP array olarak Schema.org formatına dönüştürülür, json_encode() ile script tag içine yazılır. Gonet'te bu işlem için yeniden kullanılabilir schema generator function'ları geliştiririz. Örnek: Product post type'ında ACF field'ları (price, availability, brand, review) var; single-product.php template'inde generate_product_schema() function'ı çağrılır, sayfanın head kısmına Product JSON-LD ekler. Google Rich Results Test ile doğrulama yapılır. Advanced: ACF Flexible Content ile sayfa bazlı çoklu Schema (Article + VideoObject + FAQPage) aynı sayfada kombine edilir, @graph yapısı kullanılır. Bu yaklaşım, Google Search Gallery eligibility'yi %80 artırır."
---

## WordPress (legacy + headless) nedir?

WordPress, dünya çapında web sitelerinin %43'ünü çalıştıran açık kaynak içerik yönetim sistemidir. Gonet'teki WordPress yetkinliği iki ana eksende gelişir: **legacy (geleneksel) mimari** ve **headless (başsız) mimari**. Legacy mimaride WordPress hem içerik yönetimi hem de ön yüz sunum katmanı olarak çalışır; custom theme (özel tema) geliştirme, Advanced Custom Fields (ACF) ile esnek içerik yapıları ve PHP tabanlı template hierarchy bu alanın temelini oluşturur. Headless mimaride ise WordPress yalnızca içerik deposu ve API sağlayıcısı rolündedir — WP REST API veya GraphQL üzerinden içerik frontend framework'lerine (React, Next.js, Nuxt) aktarılır, rendering ayrı bir katmanda gerçekleşir.

Gonet, 2000'den bu yana WordPress projeleri geliştirmiş, 220+ marka portföyünde 50'den fazla kurumsal WordPress çözümü yayına almıştır. Ekibimiz, WooCommerce entegrasyonu, çok dilli mimariler (WPML/Polylang), performans optimizasyonu (object caching, CDN, lazy loading), güvenlik sertleştirme ve özel plugin geliştirme deneyimine sahiptir. Legacy projeler için Gutenberg block library geliştirme, ACF Flexible Content ile modüler sayfa yapıları; headless projeler için JWT authentication, custom REST endpoint ve frontend state management stratejilerini kurgularız.

## Neden kritik?

WordPress, kurumsal markaların hız ve esneklik ihtiyacını karşılarken yöneticilere tanıdık bir arayüz sunar. Ancak WordPress projelerinin %60'ı performans, güvenlik veya ölçeklenebilirlik sorunlarıyla karşılaşır — çünkü varsayılan yapılandırmalar ve hazır temalar kurumsal gereksinimleri karşılamaz. Custom theme geliştirme, gereksiz plugin yükünü azaltır, sayfa yükleme süresini %40-60 oranında iyileştirir ve marka kimliğini piksel düzeyinde kontrol etmenizi sağlar. ACF, içerik editörlerinin kod bilgisi olmadan karmaşık veri yapıları (ürün karşılaştırma tabloları, interaktif timeline, dinamik pricing modülleri) oluşturmasını mümkün kılar; bu da IT ekibine bağımlılığı %70 azaltır.

Headless mimari, özellikle çok kanallı (omnichannel) dağıtım gerektiren markalarda kritiktir. Aynı içerik deposundan web sitesi, mobil uygulama, dijital kiosk ve voice interface'lere içerik servis edilebilir. WP REST API, içerik CRUD işlemlerini standart HTTP endpoint'leri üzerinden sunar; custom endpoint'ler ile markanıza özel iş mantığı (fiyatlandırma algoritmaları, kullanıcı segmentasyonu, recommendation engine entegrasyonu) API seviyesinde uygulanır. Gonet projelerinde headless WordPress, Core Web Vitals metriklerinde %50 iyileşme, sunucu yükünde %40 azalma sağlamıştır. Google'ın Page Experience güncellemesi (2021) ve yapay zeka destekli arama motorlarının (Bing Chat, Bard, Perplexity) yapılandırılmış veri talebi, performanslı ve semantik zengin WordPress kurulumlarını zorunlu kılmaktadır.

## Gonet yaklaşımı

Gonet'in WordPress metodolojisi üç temele dayanır: **performans-first architecture**, **semantic content modeling** ve **DevOps entegrasyonu**. Legacy projeler için, starter theme'den sıfır bağımlılıkla özel tema geliştiririz; Webpack/Vite build pipeline ile SCSS, ES6+ JavaScript ve asset optimization otomatize edilir. ACF JSON sync kullanarak field group'ları versiyon kontrolüne dahil eder, staging-production senkronizasyonunu sorunsuz hale getiririz. Gutenberg için custom block library geliştirme (block.json, @wordpress/scripts) ile marka bileşenlerini blok sistemine entegre ederiz — editörler, tasarım sisteminden sapmadan içerik oluşturabilir.

Headless projeler için, WP GraphQL veya REST API üzerinden Next.js/Nuxt frontend'leri besleriz. Incremental Static Regeneration (ISR) veya On-Demand Revalidation stratejileri ile içerik güncellemelerini gerçek zamanlı yansıtırken, sunucu yükünü minimize ederiz. JWT veya OAuth 2.0 ile güvenli authentication, Redis/Memcached ile object caching, Cloudflare CDN entegrasyonu standart uygulamalarımızdır. Schema.org markup'ını ACF değerlerinden otomatik üretir (JSON-LD), Google Search Console ve Bing Webmaster Tools'da zengin snippet'ler sağlarız. WooCommerce headless projelerinde, Stripe/PayPal webhook'larını custom REST endpoint'lere bağlar, checkout akışını frontend tarafında tamamen özelleştiririz.

Güvenlik katmanında, Wordfence yapılandırması, two-factor authentication (2FA), role-based access control (RBAC) ve otomatik yedekleme (UpdraftPlus/BackWPup) tüm projelerde varsayılandır. GitHub Actions veya GitLab CI/CD ile deployment pipeline'ları kurar, staging ortamında otomatik testler (PHPUnit, Playwright) çalıştırırız. Cloudflare APO veya Fastly entegrasyonu ile edge caching, DDoS koruması ve bot yönetimi sağlanır. Multisite yapılandırmalarında (franchises, bölgesel siteler), network-level user management ve plugin synchronization uygularız.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Kurumsal blog/haber sitesi** | ACF ile zengin içerik tipleri (video embed, infografik, yazar profili), custom taxonomy'ler ile gelişmiş filtreleme, editorial workflow plugin'leri ile onay süreçleri. Sayfa hızı %60 iyileşme (custom theme vs. hazır tema). |
| **E-ticaret (WooCommerce)** | Custom product page template'leri, ACF ile ek ürün alanları (teknik şartname, 360° görsel, AR model link), headless checkout ile dönüşüm oranı %15-25 artış. Payment gateway özelleştirme ve envanter entegrasyonu. |
| **Çok dilli global site** | WPML/Polylang ile URL yapısı kontrolü, hreflang otomasyonu, dil bazlı içerik varyasyonları. Headless mimaride frontend routing ile SEO-friendly URL'ler. International SEO sıralamada %40 iyileşme. |
| **Omnichannel içerik dağıtımı** | Headless WordPress + mobil uygulama + kiosk. Tek içerik deposundan çoklu kanal, içerik güncellemelerini %80 hızlandırır. REST API ile CRM/CDP entegrasyonu, kişiselleştirilmiş içerik sunum. |
| **Yüksek trafik, düşük bütçe** | Object caching + CDN + headless static site generation. 100K+ günlük ziyaretçiyi 1 sunucuda %99.9 uptime ile servis. Hosting maliyeti %50 azalma (VPS vs. managed WordPress). |
| **Kompleks veri yapıları** | ACF Repeater/Flexible Content ile product configurator, comparison tool, interactive quiz. Custom post type + taxonomy ile filtrelenebilir veritabanları. Admin paneli kod yazmadan yönetilir. |

## İlgili yetkinlikler

WordPress projelerinde sıklıkla entegre ettiğimiz yetkinlikler:

- [Jamstack mimarisi](/yetkinlikler/jamstack-mimarisi) — headless WordPress + Next.js/Nuxt, static site generation, edge deployment
- [Schema.org & JSON-LD](/yetkinlikler/schema-org-json-ld) — ACF verilerinden zengin snippet üretimi, Google Search Gallery uyumluluğu
- [Google Tag Manager kurulumu](/yetkinlikler/google-tag-manager-kurulumu) — WordPress event tracking (form submit, CTA click, scroll depth), e-ticaret dataLayer
- [Core Web Vitals optimizasyonu](/yetkinlikler/core-web-vitals-optimizasyonu) — WordPress hosting, caching, image optimization, CLS/LCP/FID iyileştirme

Bu entegrasyonlar, WordPress'in hem içerik yönetim kolaylığını hem de modern web performans standartlarını aynı projede sunar.

## Gonet ile çalışmak

Gonet, WordPress projelerinizde 26 yıllık geliştirme deneyimini, Google Partner statüsünün getirdiği platform entegrasyonlarını ve 220+ markada test edilmiş best practice'leri sunar. Legacy modernizasyonu, headless dönüşüm veya sıfırdan kurumsal WordPress çözümü ihtiyaçlarınız için [iletişime geçin](/iletisim) — ilk danışmanlık oturumunda mevcut altyapınızı analiz eder, ROI odaklı yol haritası sunarız.
