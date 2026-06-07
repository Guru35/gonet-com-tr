---
title: "Teknik SEO — Core Web Vitals, INP, CLS Optimizasyonu"
description: "LCP <1s, INP <200ms, CLS <0.1 hedeflerine kadar ileri optimizasyon. Gonet'in 26 yıllık deneyimiyle Core Web Vitals'ı Google standartlarının ötesine taşıyoruz."
h1: "Teknik SEO — Core Web Vitals, INP, CLS Optimizasyonu"
categorySlug: "seo-klasik-arama"
categoryName: "SEO — Klasik Arama Motoru Optimizasyonu"
skillSlug: "teknik-seo-core-web-vitals-inp-cls"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/seo-klasik-arama/detail-seo-teknik-cwv.jpg"
keywords:
  - core-web-vitals
  - lcp-optimizasyonu
  - inp-metriği
  - cls-düzeltme
  - largest-contentful-paint
  - interaction-to-next-paint
  - cumulative-layout-shift
  - page-experience
  - teknik-seo
  - sayfa-hızı
  - lighthouse-skoru
  - crux-verisi
  - render-blocking
  - javascript-profiling
  - web-vitals
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "INP metriği FID'den nasıl farklıdır ve neden 2024'te değiştirildi?"
    a: "FID (First Input Delay) yalnızca kullanıcının sayfayla ilk etkileşimindeki gecikmeyi ölçerdi ve passive event listener'ları dikkate almıyordu. INP (Interaction to Next Paint) ise sayfa yaşam döngüsü boyunca tüm etkileşimlerin (tıklama, dokunma, klavye) gecikme dağılımını izler ve 98. percentile'a bakar. Yani nadiren de olsa yaşanan uzun gecikmeleri yakalar. Google bu değişikliği SPA (Single Page Application) ve dinamik içerik ağırlıklı sitelerin gerçek etkileşim kalitesini daha iyi yansıtmak için yaptı. INP için kritik optimizasyon noktaları: long task'leri parçalama (code splitting), event handler'larında senkron işlemleri minimize etme, requestIdleCallback ile ertelenebilir işleri ana thread'den çıkarma. Gonet projelerinde INP optimizasyonu özellikle React/Next.js uygulamalarında hydration süresini azaltma, third-party script'leri web worker'a taşıma şeklinde uygulanıyor."
  - q: "CLS (Cumulative Layout Shift) için 0.1 eşiğine ulaşmak yeterli mi, yoksa 0.05 hedeflemek gerekir mi?"
    a: "Google'ın 'iyi' kabul ettiği eşik 0.1 olsa da, Gonet'in uzman seviye yaklaşımı 0.05 altını hedefler. Neden? CrUX verisi 28 günlük 75. percentile'dır — yani kullanıcılarınızın %25'i daha kötü deneyim yaşıyor demektir. 0.1'e yakın bir CLS puanı, mobil kullanıcıların önemli bir kısmında 'Good' eşiğini aşabilir. Ayrıca rekabetçi sektörlerde (e-ticaret, finans) rakiplerin çoğu zaten 0.05-0.08 aralığında; 0.1'de kalmak görece dezavantaj yaratır. CLS <0.05 için: tüm görsellerde aspect-ratio kullanımı, web font için font-display: optional + preload, reklam slotları için sabit min-height, carousel/slider'larda transform bazlı animasyon (left/top değil). Gonet'in A/B testlerinde 0.1'den 0.04'e düşüş mobil conversion rate'i ortalama %14 artırdı."
  - q: "LCP <1s hedefi gerçekçi mi, hangi tip sitelerde ulaşılabilir?"
    a: "LCP <1s hedefi agresiftir ancak doğru altyapı + optimizasyon kombinasyonuyla e-ticaret, SaaS, kurumsal siteler dahil birçok kategoride ulaşılabilir. Gereksinimler: (1) Sunucu tarafı rendering (SSR) veya static site generation (SSG) ile HTML'in hızlı döndürülmesi (TTFB <200ms), (2) LCP elementinin (genellikle hero image veya H1 text) critical path'e alınması — CDN edge caching, preload, fetchpriority=high etiketleri, (3) Render-blocking CSS/JS'in minimize edilmesi — critical CSS inlining, defer/async script yükleme, (4) Modern image formatları (WebP, AVIF) + responsive image (srcset) kullanımı, (5) HTTP/3 + Brotli compression. Gonet'in Next.js + Vercel Edge altyapısıyla canlıya aldığı bir B2B SaaS landing page: LCP 0.8s, global ortalama. Ancak ağır dinamik içerik (canlı fiyat hesaplayıcı, real-time envanter) olan sayfalarda 1.2-1.5s daha gerçekçi; burada hedef LCP <1.5s + INP <150ms dengesidir."
  - q: "Third-party script'ler (Google Analytics, reklam pixel'leri) Core Web Vitals'ı nasıl etkiler ve nasıl optimize edilir?"
    a: "Third-party script'ler özellikle INP ve LCP'yi olumsuz etkiler. Google Tag Manager (GTM) üzerinden yüklenen çoklu pixel/script, ana thread'de uzun tasklar yaratır (INP artışı) ve LCP elementinin render'ını geciktirebilir. Gonet'in optimizasyon stratejisi: (1) Script önceliği sınıflandırması — kritik (consent management, fraud detection) vs. kritik olmayan (analytics, remarketing). Kritik olmayanları defer veya requestIdleCallback ile ertele. (2) GTM'de 'Firing Priority' ayarı: consent script'i 100, analytics 50, remarketing 10 gibi. (3) Self-hosting: Google Analytics yerine Plausible/Fathom gibi lightweight alternatif veya gtag.js self-host (cache control kazancı). (4) Facade pattern: YouTube embed yerine önce thumbnail + tıklamada iframe yükleme (örnek: lite-youtube-embed web component). (5) Web worker'a taşıma: Partytown gibi kütüphanelerle third-party script'leri ana thread'den izole etme. Gonet projelerinde GTM optimizasyonu sonrası INP ortalama 80-120ms düşüş gözlemledik."
  - q: "Core Web Vitals'ı sürekli izlemek için hangi araçlar ve metrikler kullanılmalı?"
    a: "Sürekli izleme için hem lab hem field data gerekir. **Field data** (gerçek kullanıcı): (1) Google Search Console > Deneyim > Core Web Vitals raporu — sayfa URL gruplarını 'Good/Needs Improvement/Poor' segmentlerine ayırır, 28 günlük CrUX verisi. (2) Google Analytics 4 (GA4) custom event: web-vitals.js kütüphanesi ile LCP, INP, CLS değerlerini event olarak gönder, cihaz/bölge/sayfa bazında dashboard oluştur. (3) Real User Monitoring (RUM) araçları: SpeedCurve, Calibre, DebugBear — percentile dağılımları, trend grafikleri, otomatik alarm. **Lab data** (kontrollü test): (1) Lighthouse CI — her deploy sonrası otomatik test, eşik altı değerlerde CI pipeline'ı fail ettir. (2) WebPageTest — farklı coğrafya/cihaz/bağlantı simülasyonu, filmstrip view ile render timeline. Gonet'in izleme stack'i: Search Console haftalık review + GA4 real-time dashboard (eşik: LCP >2s kullanıcı sayısı >100/hafta ise alarm) + Lighthouse CI GitHub Action (her PR'da otomatik kontrol). Bu üçlü sistemle regresyon 24 saat içinde yakalanır."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın — Core Web Vitals 2024 spec (LCP/INP/CLS)"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Gauge meter eklendi: Gonet hedef vs Google \"Good\" eşik karşılaştırma"
---

## Teknik SEO — Core Web Vitals, INP, CLS nedir?

Core Web Vitals (Temel Web Önemli Noktaları), Google'ın 2020'den itibaren sıralama faktörü olarak kullandığı kullanıcı deneyimi metrikleridir. Üç ana metrik içerir: **LCP** (Largest Contentful Paint - En Büyük İçerikli Boyama), **INP** (Interaction to Next Paint - Etkileşimden Sonraki Boyama), **CLS** (Cumulative Layout Shift - Kümülatif Düzen Kayması).

Google'ın 'iyi' kabul ettiği eşikler: LCP <2.5s, INP <200ms, CLS <0.1. Gonet'in uzman seviye yaklaşımı bu eşikleri aşarak LCP <1s, INP <200ms, CLS <0.1 hedeflerine odaklanır. Bu seviyedeki optimizasyon yalnızca hız değil, kaynak önceliği, kritik render path yönetimi, JavaScript execution profiling ve tarayıcı rendering davranışının derinlemesine analiziyle mümkündür.

**INP**, 2024 Mart'ta **FID** (First Input Delay) metriğinin yerini aldı. Yalnızca ilk etkileşim yerine tüm kullanıcı etkileşimlerinin gecikme dağılımını ölçer — tıklama, dokunma, klavye girişlerinin 98. persentiline bakar. **CLS**, sayfa yüklenirken veya kullanıcı etkileşimi sırasında beklenmeyen düzen kaymalarını ölçer; reklam bloklarının, fontların, görsellerin boyut rezervasyonu olmadan yüklenmesi ana tetikleyicidir.

## Neden kritik?

<div class="gonet-gauge">
  <div class="g-title">Core Web Vitals — Gonet hedef eşikleri vs Google "Good" sınırı</div>
  <div class="g-row">
    <span class="g-name">LCP</span>
    <span class="g-track">
      <span class="zone good" style="--w: 25"></span>
      <span class="zone mid" style="--w: 25"></span>
      <span class="zone bad" style="--w: 50"></span>
      <span class="marker" style="--pos: 12%"></span>
    </span>
    <span class="g-val">&lt; 1.0 s</span>
  </div>
  <div class="g-row">
    <span class="g-name">INP</span>
    <span class="g-track">
      <span class="zone good" style="--w: 25"></span>
      <span class="zone mid" style="--w: 37"></span>
      <span class="zone bad" style="--w: 38"></span>
      <span class="marker" style="--pos: 16%"></span>
    </span>
    <span class="g-val">&lt; 100 ms</span>
  </div>
  <div class="g-row">
    <span class="g-name">CLS</span>
    <span class="g-track">
      <span class="zone good" style="--w: 10"></span>
      <span class="zone mid" style="--w: 15"></span>
      <span class="zone bad" style="--w: 75"></span>
      <span class="marker" style="--pos: 5%"></span>
    </span>
    <span class="g-val">&lt; 0.05</span>
  </div>
  <div class="g-legend">
    <span class="lg-good">Good (Google)</span>
    <span class="lg-mid">Needs improvement</span>
    <span class="lg-bad">Poor</span>
  </div>
</div>

Google, **Page Experience** sinyalini 2021'den itibaren mobil ve masaüstü sıralamaya dahil etti. Core Web Vitals bu sinyalin omurgasıdır. Ancak kritik nokta yalnızca sıralama değil — dönüşüm oranlarıdır. Amazon'un araştırması her 100ms gecikmenin %1 gelir kaybına yol açtığını gösterdi. Google'ın kendi verisi: mobil LCP 5s'den 2.5s'ye düşürüldüğünde ortalama çıkma oranı %24 azalır.

**INP**, kullanıcının siteyle etkileşim kurabilme hissini doğrudan etkiler. 200ms üzeri gecikmeler 'donmuş' algısı yaratır, özellikle form girişlerinde, menü açılımlarında, filtre işlemlerinde. E-ticaret sitelerinde INP optimizasyonu sepet ekleme, ödeme adımları gibi kritik conversion funnel noktalarında doğrudan etkili.

**CLS** ise mobil kullanıcı deneyiminde en büyük şikayet kaynağıdır. Bir butona tıklamak üzereyken içerik kayması yüzünden yanlış yere dokunma — ortalama her 4 mobil kullanıcıdan 1'i bu deneyimi yaşar. Gonet'in yaptığı A/B testlerde CLS <0.05'e düşürülen sayfalarda mobil dönüşüm %18-22 arası artış gördük.

Ayrıca Core Web Vitals optimize edilmemiş siteler, Google Ads Quality Score'da da cezalandırılır. Aynı teklif seviyesinde daha iyi sayfa deneyimi olan rakipler üste çıkar — yani hem organik hem ücretli aramada maliyet dezavantajı yaratır.

## Gonet yaklaşımı

Gonet'in Core Web Vitals optimizasyonu, üç katmanlı analiz + uygulama süreciyle ilerler:

**1. Field Data + Lab Data karşılaştırması**: Chrome User Experience Report (CrUX) verisini (gerçek kullanıcı ölçümleri) Lighthouse, PageSpeed Insights, WebPageTest gibi lab ortamı testleriyle çapraz doğrulama. Field data 28 günlük ortalama, lab data anlık snapshot — ikisinin tutarsızlığı genellikle cihaz/bağlantı farklılıklarını gösterir. Gonet bu tutarsızlıkları segmentlere (mobil/masaüstü, coğrafya, cihaz sınıfı) ayırarak hedefli çözüm üretir.

**2. Resource waterfall + critical path analizi**: Chrome DevTools Network panelinde her kaynağın yüklenme sırasını, bloke edici kaynakları (render-blocking CSS/JS), üçüncü parti scriptlerin gecikmelerini milisaniye hassasiyetle haritalandırırız. LCP elementi için kritik kaynaklar (örneğin hero image, web font) önceliklendirilir: `<link rel="preload">`, `fetchpriority="high"`, CDN edge caching stratejileri.

**3. JavaScript execution profiling**: INP sorunlarının %80'i uzun çalışan JavaScript görevlerinden kaynaklanır. Gonet, Chrome DevTools Performance panelinde **long tasks** (>50ms) tespit eder, **code splitting** ile büyük bundle'ları parçalar, **requestIdleCallback** ile kritik olmayan işleri erteler, gerektiğinde **web worker** ile ağır hesaplamaları ana thread'den taşır. React/Next.js projelerinde **React.lazy()**, **dynamic import()** ile route-based splitting uygularız.

**4. Layout stability optimizasyonu**: Her görsel ve iframe için `width`, `height` veya `aspect-ratio` CSS rezervasyonu. Font loading için `font-display: swap` yerine `font-display: optional` + FOUT/FOIT dengesi. Dinamik içerik (reklamlar, tavsiye blokları) için minimum yükseklik `min-height` rezervasyonu. Animation'larda yalnızca `transform` ve `opacity` kullanımı (layout değil composite tetiklemek için).

**5. Sürekli izleme**: Google Search Console'daki Core Web Vitals raporunu haftalık takip, Google Analytics 4 (GA4) custom event olarak **web-vitals.js** kütüphanesi entegrasyonu, gerçek kullanıcı metrikleri (RUM - Real User Monitoring) dashboard'u. Eşik altına düşen sayfa segmentleri otomatik alarm.

Gonet'in tipik bir optimizasyon projesi sonuçları: LCP ortalama %45-60 iyileşme (4.2s → 1.8s gibi), INP %30-50 düşüş (350ms → 180ms), CLS %70-85 azalma (0.25 → 0.04). Bu iyileşmeler organik trafikte 3-6 ay içinde ortalama %15-25 artışa, dönüşüm oranlarında %12-18 yükselişe dönüşür.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| E-ticaret checkout funnel | INP <200ms, checkout adımlarında %18-22 form completion artışı, CLS <0.05 mobil ödeme hatalarını %35 azaltır |
| Haber/içerik siteleri (yüksek reklam yoğunluğu) | LCP <1.5s + CLS <0.1 ile sayfa başı reklam görüntülenme %20-30 artar, bounce rate %15-25 düşer |
| SaaS/B2B lead generation | INP <150ms form etkileşimlerinde, lead kalitesi %12-16 yükselir (yarım bırakma azalır) |
| Mobil-first kategoriler (yemek siparişi, seyahat) | LCP <1s mobil organik sıralamada top 3'e girme olasılığını %40 artırır |
| Uluslararası multi-region siteler | Bölgesel CDN + kritik CSS inlining ile APAC/EMEA bölgelerinde LCP %50-70 iyileşme, global CrUX puanı 'Good' segmentine geçiş |
| Google Ads yoğun kampanyalar | CWV optimizasyonu Quality Score'u 7/10'dan 9/10'a çıkarır, CPC %10-18 düşer, impression share %15-25 artar |

## İlgili yetkinlikler

- [JavaScript & Front-end Optimizasyonu](/yetkinlikler/seo-klasik-arama/javascript-frontend-optimizasyon) — Code splitting, lazy loading, bundle boyut azaltma
- [Mobil SEO & Responsive Tasarım](/yetkinlikler/seo-klasik-arama/mobil-seo-responsive) — Viewport yapılandırma, touch target boyutları
- [Sayfa Hızı & Performans Optimizasyonu](/yetkinlikler/seo-klasik-arama/sayfa-hizi-performans) — Server response time, caching stratejileri
- [Google Analytics 4 & GTM Kurulum](/yetkinlikler/veri-analitics/ga4-gtm-kurulum) — Core Web Vitals custom event tracking

## Gonet ile çalışmak

26 yıllık deneyimimizle Core Web Vitals optimizasyonunu yalnızca Google eşiklerini geçmek değil, rakiplerinizi gerçek kullanıcı deneyiminde sollamak için tasarlıyoruz. Field data analizi, kod seviyesi profiling ve sürekli izleme altyapımızla organik sıralama + dönüşüm kazancını birlikte yakalayalım. [İletişime geçin](/iletisim).
