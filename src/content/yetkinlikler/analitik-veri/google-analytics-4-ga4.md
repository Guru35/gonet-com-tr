---
title: "Google Analytics 4 (GA4) — Event-Based Ölçümleme ile Veri Temelli Büyüme"
description: "GA4 event-based modeli, custom dimensions, audience builder ve attribution raporları ile kullanıcı yolculuğunu anlayın. 26 yıllık deneyimle Gonet uzmanlığı."
h1: "Google Analytics 4 (GA4) — Event-Based Ölçümleme ile Veri Temelli Büyüme"
categorySlug: "analitik-veri"
categoryName: "Analitik & Veri"
skillSlug: "google-analytics-4-ga4"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/analitik-veri/detail-analitik-ga4.jpg"
keywords:
  - google-analytics-4
  - ga4
  - event-based-analytics
  - custom-dimensions
  - audience-builder
  - attribution-modeling
  - bigquery-export
  - predictive-metrics
  - enhanced-measurement
  - cross-platform-tracking
  - consent-mode
  - e-commerce-tracking
  - data-driven-attribution
  - ga4-implementation
  - google-tag-manager
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "GA4'te Universal Analytics'teki 'bounce rate' (hemen çıkma oranı) nerede, neden farklı?"
    a: "GA4'te bounce rate kaldırıldı, yerine 'engaged sessions' (etkileşimli oturumlar) metriği geldi. Engaged session: 10 saniyeden uzun VEYA 2+ sayfa görüntüleme VEYA 1+ conversion event içeren oturumdur. Engagement rate = engaged sessions / total sessions. Eski bounce rate tersine çalışırdı (etkileşimsiz oturumlar / toplam). GA4'ün mantığı: kullanıcı 9 saniye kalıp çıktıysa 'bounce' değil, belki aradığını buldu. Daha pozitif, içerik değeri odaklı metrik. Explorations > Blank > Metrics'ten 'Bounce rate' eklenebilir (hesaplama: 1 - engagement rate), ama Google önceliği engagement'a vermiştir."
  - q: "GA4'te e-commerce tracking için hangi event'ler zorunlu, nasıl kurulur?"
    a: "E-commerce için recommended events (önerilen olaylar): view_item_list (kategori/liste görüntüleme), view_item (ürün detay), add_to_cart, remove_from_cart, begin_checkout, add_payment_info, purchase. Zorunlu değil ama purchase + add_to_cart minimum. Her event, 'items' array parametresi taşır: item_id, item_name, price, quantity, item_brand, item_category. GTM'de dataLayer.push ile e-commerce objesi gönderilir, GA4 event tag bu objeyi okur. Google Merchant Center entegrasyonu için item_id, Merchant Center product ID ile eşleşmeli. Enhanced e-commerce (UA'daki) yapı GA4'te daha basit ama item-scoped parameters daha zengin. Gonet, Shopify/Magento/WooCommerce platformlarında hazır dataLayer entegrasyonu sağlar."
  - q: "GA4'te custom dimension (özel boyut) nasıl oluşturulur, event-scoped ile user-scoped farkı nedir?"
    a: "GA4'te custom dimension, Admin > Property > Custom definitions > Create custom dimension yolundan oluşturulur. Önce GTM'de event gönderilirken parameter eklenir (örn: user_type: 'premium'), sonra GA4'te bu parameter dimension'a register edilir. Event-scoped: her event için farklı olabilir (örn: product_category her view_item'da değişir). User-scoped: kullanıcı seviyesinde sabit (örn: membership_level, first_campaign_source). Dimension scope seçimi analiz şeklinizi etkiler. User-scoped ile 'premium kullanıcıların conversion rate'i nedir?' sorusuna yanıt, event-scoped ile 'hangi kategori en çok sepete ekleniyor?' analizi. GA4 property başına 50 custom event-scoped, 25 user-scoped dimension sınırı var (UA'da 20 toplam vardı). Gonet dimension planlamasını iş hedefleriyle eşleştirir, kota israfı önler."
  - q: "GA4 attribution modelleri hangileri, data-driven attribution nasıl çalışır?"
    a: "GA4 attribution modelleri: Data-driven (veri odaklı), Last click (son tıklama), First click (ilk tıklama), Linear (doğrusal), Position-based (pozisyon tabanlı), Time decay (zaman azalması). Data-driven attribution (DDA), makine öğrenmesi ile her touchpoint'in conversion'a katkısını hesaplar; yeterli veri varsa (genelde 400+ conversion/ay) diğer modellerden daha doğrudur. DDA, counterfactual analysis (karşıt durum analizi) kullanır: 'bu touchpoint olmasaydı conversion olasılığı ne kadar düşerdi?' sorusuna yanıt verir. Advertising > Attribution > Model comparison raporu, aynı conversion'ları farklı modellerde karşılaştırır. Örneğin Last click'te Paid Search %60 credit alırken DDA'da %40 alıyor, Display %10'dan %25'e çıkıyorsa Display assist rolü güçlüdür. Gonet, attribution raporlarını budget allocation kararlarına bağlar, kanal ROI hesaplamalarını attribution insight'ıyla revize eder."
  - q: "GA4 verisi BigQuery'e nasıl export edilir, hangi analizler SQL ile yapılır?"
    a: "GA4 > Admin > Property > BigQuery linking > Link ile Google Cloud projesine bağlanır. Daily export (günlük) veya streaming (canlı) seçilir; Free tier daily export ücretsizdir. Export edilen tablo STRUCT ve ARRAY veri tiplerinde nested JSON'dır: her satır bir event, event_params ve user_properties array'ler. SQL ile yapılan analizler: (1) Item-level product performansı (items array'i UNNEST ile açılır), (2) User cohort analizi (ilk satın alma tarihine göre gruplama, retention), (3) Custom funnel (event sequence WHERE koşulları), (4) Cross-session attribution (user_pseudo_id + event_timestamp ile journey reconstruction), (5) Anomaly detection (günlük conversion sapmaları). BigQuery'den Looker Studio/Tableau'ya connect, GA4 UI'ın 14 aylık sınırını aşan historical analiz. Gonet, BigQuery SQL template'leri sağlar, veri mühendisliği olmadan self-service analytics."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın"
  - date: "2026-06-07"
    type: "enhancement"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Kreatif viz eklendi (process, pullquote)"
  - date: "2026-06-08"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## Google Analytics 4 (GA4) nedir?

<div class="gonet-pullquote">
  <div class="big-number">220+</div>
  <div class="big-label">MARKA PORTFÖYÜ</div>
  <p class="pq-desc">Temmuz 2023 son tarihinden önce GA4 geçişi tamamlandı, veri kaybı olmadan sağlandı.</p>
</div>

Google Analytics 4, Ekim 2020'de duyurulan ve Temmuz 2023'te Universal Analytics'in yerini tamamen alan yeni nesil web ve uygulama analitik platformudur. GA4, oturum tabanlı (session-based) eski modeli terk ederek event-based (olay temelli) bir veri mimarisine geçmiştir. Her kullanıcı etkileşimi — sayfa görüntüleme, tıklama, form gönderimi, video izleme — bağımsız bir event olarak kaydedilir ve bu eventler custom parameters (özel parametreler) ile zenginleştirilir.

GA4'ün temel farkları:

- **Event-based model**: Her etkileşim bir event, pageview artık standart bir event türü.
- **Cross-platform tracking**: Web + iOS + Android tek property altında birleşir.
- **Machine learning entegrasyonu**: Predictive metrics (tahmine dayalı metrikler) — satın alma olasılığı, churn (kayıp) riski.
- **Privacy-first tasarım**: Cookie'siz ölçümleme desteği, IP anonimleştirme varsayılan.
- **BigQuery entegrasyonu**: Ücretsiz tier dahil ham veri export.

Gonet, 2020'den beri GA4 implementasyonu ve danışmanlığı sunmaktadır. 220+ marka portföyünde GA4 geçişlerini Temmuz 2023 son tarihinden önce tamamladık, veri kaybı olmadan sağladık.

## Neden kritik?

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">2023</div>
    <div class="l">UA → GA4<br>migrasyon yılı</div>
  </div>
  <div class="stat">
    <div class="n">14 ay</div>
    <div class="l">GA4 default<br>retention</div>
  </div>
  <div class="stat">
    <div class="n">Event-based</div>
    <div class="l">Model<br>(önce session)</div>
  </div>
  <div class="stat">
    <div class="n">BigQuery</div>
    <div class="l">Ücretsiz<br>raw export</div>
  </div>
</div>

Universal Analytics 1 Temmuz 2023'te veri toplamayı durdurdu. GA4'e geçmeyen markalar tarihi veriyi kaybetti, trend analizleri koptu. Ancak GA4'ün kritiği yalnızca zorunluluktan değil, yeteneklerinden kaynaklanır:

1. **Kullanıcı odaklı ölçüm**: Session yerine user_id ve Google signals ile cross-device yolculuk.
2. **Conversion modeling**: GDPR/CCPA nedeniyle kayıp veri, makine öğrenmesi ile modellenir.
3. **Esnek event yapısı**: Custom event + 25 custom parameter/event, sınırsız event türü (UA'da 500 event/session sınırı vardı).
4. **Attribution karşılaştırması**: Data-driven, last-click, first-click, linear modelleri aynı raporda.
5. **Audience builder**: Event kombinasyonları + predictive segmentler, doğrudan Google Ads/DV360/SA360'a aktarım.

Markalar GA4'ü yalnızca 'rapor aracı' olarak kullanırsa değerinin %20'sine erişir. Gerçek güç: event taxonomy (olay taksonomisi) tasarımı, custom dimensions stratejisi, BigQuery SQL analizi, GTM entegrasyonu. Gonet bu katmanları 26 yıllık uygulama deneyimiyle kurar.

## Gonet yaklaşımı

<div class="gonet-process">
  <div class="pt">GONET GA4 IMPLEMENTATION SÜRECİ</div>
  <div class="steps">
    <div class="step is-primary"><div class="n">1</div><div class="t">Audit & Planning</div><div class="d">UA analizi, event taxonomy, consent mode stratejisi</div></div>
    <div class="step"><div class="n">2</div><div class="t">Implementation</div><div class="d">GTM config, e-commerce tracking, cross-domain setup</div></div>
    <div class="step"><div class="n">3</div><div class="t">Activation & Optimization</div><div class="d">Custom reports, predictive audiences, BigQuery export</div></div>
  </div>
</div>

Gonet GA4 implementasyonu üç fazda ilerler:

**1. Audit & Planning (Denetim & Planlama)**
- Mevcut UA setup analizi, critical event'lerin GA4 karşılıkları.
- İş hedeflerinden event taxonomy: hangi mikro-conversions ölçülecek?
- Custom dimensions planı: user-scoped (kullanıcı kapsamlı), event-scoped (olay kapsamlı) ayırımı.
- Consent mode (rıza modu) stratejisi, KVKK uyumu.

**2. Implementation (Uygulama)**
- Google Tag Manager (GTM) container yapılandırması: GA4 config tag, custom event triggers.
- Enhanced measurement otomatik events (scroll, outbound, site search, video) aktivasyonu + custom tuning.
- E-commerce tracking: purchase, add_to_cart, view_item eventleri + item-scoped parameters (marka, kategori, varyant).
- Cross-domain tracking, subdomain ayarları, referral exclusions.
- Server-side GTM entegrasyonu (gerektiğinde): first-party cookie, conversion API, veri kalitesi artışı.

**3. Activation & Optimization (Aktivasyon & Optimizasyon)**
- Custom reports + explorations: funnel, path, cohort analizleri.
- Predictive audiences: purchase_probability > 50%, churn_risk > 30% segmentleri.
- Google Ads entegrasyonu: enhanced conversions, customer match listeleri.
- BigQuery export + Looker Studio dashboards: executive summary, channel performance, product analytics.
- Aylık veri kalitesi audit: bot trafiği filtreleme, internal IP exclusion, debug view kontrol.

Gonet ekibi GA4 Individual Qualification (Google Analytics sertifikası) sahibi, her setup Measurement Protocol validation ile test edilir.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Multi-platform marka** (web + iOS + Android app) | GA4 tek property'de tüm platformları birleştirir, user journey kopmaz. UA'da app tracking Firebase'de ayrıydı. |
| **E-commerce** (500+ SKU) | Item-scoped parameters (price, brand, category, variant) ile ürün performansı granüler analiz. BigQuery'de SQL join'le CRM/ERP verisi. |
| **Lead generation** (form, phone, chat conversions) | Custom event'ler (form_submit, chat_start, phone_click) + conversion value. Attribution karşılaştırması hangi kanalın assist ettiğini gösterir. |
| **Subscription/SaaS** | Predictive churn audiences, cohort retention raporları. Event sequences (trial_start → upgrade → cancel) funnel analizi. |
| **Content platformu** (blog, medya) | Engagement metrics (scroll depth, time on page, video completion). Audience segments content tüketim davranışına göre. |
| **Privacy-sensitive sektör** (sağlık, finans) | Consent mode + modeling, IP anonymization. KVKK/GDPR compliance built-in. |

## İlgili yetkinlikler

- [Google Tag Manager (GTM)](/yetkinlikler/analitik-veri/google-tag-manager) — GA4 event'lerinin kaynak katmanı, tüm tracking GTM üzerinden.
- [Conversion Rate Optimization (CRO)](/yetkinlikler/analitik-veri/conversion-rate-optimization) — GA4 funnel/exploration raporları CRO hipotezlerinin veri kaynağı.
- [BigQuery & Veri Ambarı](/yetkinlikler/analitik-veri/bigquery-veri-ambari) — GA4 raw data export, SQL ile custom analiz.
- [Server-Side Tracking](/yetkinlikler/analitik-veri/server-side-tracking) — GA4 measurement protocol, first-party data kalitesi.

## Gonet ile çalışmak

GA4 kurulumu 'bir kez yap unut' değil, sürekli gelişen bir süreçtir. Gonet, setup'tan raporlamaya, optimizasyondan eğitime tam döngü hizmet sunar. 220+ markada kanıtlanmış event taxonomy şablonlarımız, sektörünüze özel hızlı başlangıç sağlar. Veri kalitenizi artırmak, attribution modelinizi netleştirmek, BigQuery analizine geçmek için [iletişime geçin](/iletisim).
