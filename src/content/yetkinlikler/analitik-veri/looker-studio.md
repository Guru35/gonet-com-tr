---
title: "Looker Studio: Veri Görselleştirme ve Dashboard Yönetimi"
description: "Google Looker Studio ile blended data, calculated fields ve stakeholder dashboard'ları. 26 yıllık deneyimle veri hikayelerini görselleştiriyoruz."
h1: "Looker Studio: Veri Görselleştirme ve Dashboard Yönetimi"
categorySlug: "analitik-veri"
categoryName: "Analitik & Veri"
skillSlug: "looker-studio"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/analitik-veri/detail-analitik-looker.jpg"
keywords:
  - looker-studio
  - google-data-studio
  - veri-gorsellestirme
  - dashboard-tasarimi
  - blended-data
  - calculated-fields
  - bigquery-entegrasyonu
  - stakeholder-dashboard
  - ga4-raporlama
  - google-ads-rapor
  - veri-analitigi
  - interaktif-rapor
  - kpi-dashboard
  - performans-raporlama
  - veri-odakli-karar
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Looker Studio'da blended data ile normal data source arasındaki fark nedir, ne zaman blended kullanmalıyım?"
    a: "Normal data source tek bir veri kaynağını (örneğin yalnızca GA4) Looker Studio'ya bağlar. Blended data, iki veya daha fazla kaynağı ortak bir dimension (boyut, örneğin tarih veya kampanya adı) üzerinden birleştirir, farklı kaynaklardan metrikleri aynı tabloda gösterir. GA4'ten oturum sayısı ile Google Ads'ten maliyet verisini aynı satırda görmek blended data gerektirir. Ancak blended data, büyük veri setlerinde yavaş kalabilir; bu durumda BigQuery'de veriyi birleştirip, Looker Studio'ya tek kaynak olarak vermek daha performanslıdır. Gonet'te genelde 5+ kaynaklı projelerde BigQuery yolunu, 2-3 kaynaklı hızlı dashboard'larda blended data yöntemini tercih ediyoruz."
  - q: "Calculated field ile custom metric arasındaki fark nedir, hangisini ne zaman kullanmalıyım?"
    a: "Calculated field, Looker Studio içinde formül ile türettiğiniz yeni metriktir (örneğin 'Revenue / Sessions' ile AOV hesaplamak). Custom metric ise veri kaynağında (GA4, BigQuery) tanımladığınız, Looker Studio'ya hazır gelen metriktir. Basit matematiksel işlemler (toplama, bölme, CASE WHEN) için calculated field yeterli ve esnektir. Karmaşık SQL logic, window function (pencere fonksiyonu) veya büyük veri seti üzerinde hesaplama gerektiren metrikler için BigQuery'de custom metric oluşturup Looker Studio'ya çekmek performanslıdır. Gonet'te 'Revenue per Qualified Lead' gibi basit oranları calculated field ile, '90-Day Rolling LTV by Cohort' gibi karmaşık metrikleri BigQuery'de SQL ile üretip Looker Studio'ya taşıyoruz."
  - q: "Looker Studio dashboard'ları neden yavaş yükleniyor, performansı nasıl artırabilirim?"
    a: "Yavaşlığın üç ana sebebi: (1) Büyük veri seti (milyonlarca satır) doğrudan GA4'ten çekiliyorsa, (2) Fazla sayıda blended data kaynağı veya calculated field varsa, (3) Dashboard'da çok sayıda grafik ve filter control bulunuyorsa. Çözüm: Veriyi BigQuery'ye alıp, aggregate (toplulaştırılmış) tablolar oluşturun (günlük/haftalık toplamlar). Looker Studio'yu bu tablolara bağlayın, böylece her sorgu milyonlarca satır yerine binlerce satır tarar. Blended data yerine BigQuery'de JOIN ile veri birleştirin. Calculated field'ları mümkünse BigQuery'de SQL ile yapın, Looker Studio'da sadece gösterin. Filter sayısını optimize edin, kullanılmayan grafikleri kaldırın. Gonet'te bir e-ticaret dashboard'unu BigQuery geçişi ile 45 saniye yüklenmeden 3 saniyeye indirdik."
  - q: "Looker Studio'da stakeholder'a özgü dashboard nasıl tasarlanır, tek dashboard'da farklı roller için görünüm nasıl ayrıştırılır?"
    a: "İki yöntem: (1) Sayfalar (pages) ile ayrıştırma: Tek dashboard'u 3-4 sayfaya bölün. İlk sayfa Executive Summary (CEO/CFO için toplam ROI, büyüme), ikinci sayfa Marketing Deep Dive (CMO için kanal detayları), üçüncü sayfa Technical Performance (dijital ekip için bounce rate, load time). Her stakeholder kendi sayfasını bookmark eder. (2) Filter-based view: Aynı sayfada 'Department' filter'ı ekleyin, her departman kendi filter değerini seçtiğinde dashboard otomatik ilgili metrikleri gösterir. Gonet'te birinci yöntemi tercih ediyoruz çünkü her sayfa farklı görselleştirme tipi (executive için card widget, teknik ekip için tablo) gerektirir. Ayrıca dashboard paylaşımını role göre kısıtlayabilirsiniz (View/Edit permission), hassas finansal veriyi yalnızca CFO'nun görmesini sağlarsınız."
  - q: "Looker Studio ile BigQuery entegrasyonunun avantajı nedir, doğrudan GA4 bağlantısından farkı ne?"
    a: "GA4'ü doğrudan Looker Studio'ya bağladığınızda, GA4'ün raporlama API'si üzerinden sınırlı veri çekersiniz (sampling sorunları, bazı dimension kombinasyonları kısıtlı). BigQuery'ye GA4 raw data (ham veri) export'u aktif olduğunda, tüm hit-level veriyi SQL ile sorgulayabilir, istediğiniz dimension'ı türetebilir, custom aggregation yapabilirsiniz. Örneğin 'İlk oturumda 3+ sayfa gören, sonraki 7 gün içinde dönüşen kullanıcı sayısı' metriği GA4 UI'da zor, BigQuery SQL'de basittir. Ayrıca BigQuery'de CRM, ERP, sosyal medya verilerini JOIN edip zenginleştirebilir, Looker Studio'ya tek kaynak olarak sunabilirsiniz. Gonet'te orta-büyük ölçekli müşterilerde (aylık 1M+ oturum) BigQuery entegrasyonunu zorunlu görüyoruz; hem performans hem esneklik açısından kritik."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## Looker Studio nedir?

Looker Studio (eski adıyla Google Data Studio), Google'ın ücretsiz veri görselleştirme ve raporlama platformudur. GA4, Google Ads, Search Console, BigQuery gibi veri kaynaklarını tek dashboard'da birleştirerek interaktif raporlar oluşturur. Gonet'te Looker Studio'yu yalnızca bir grafik aracı olarak değil, stakeholder'ların (paydaşların) veri odaklı karar almasını sağlayan stratejik bir iletişim kanalı olarak konumlandırıyoruz.

Platform, blended data (karışık veri kaynakları) özelliğiyle farklı sistemlerden gelen verileri tek metrikte birleştirir, calculated fields (hesaplanmış alanlar) ile özel KPI'lar türetir, filter (filtre) ve drill-down (detaya inme) özellikleriyle kullanıcıya keşif imkanı sunar. 2000'den beri 220+ marka portföyünde ürettiğimiz yüzlerce dashboard, müşteri CEO'larından dijital ekiplere her seviyede veri okuryazarlığını artırdı.

## Neden kritik?

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">Blended</div>
    <div class="l">Multi-source<br>data join</div>
  </div>
  <div class="stat">
    <div class="n">15+</div>
    <div class="l">Connector<br>türü</div>
  </div>
  <div class="stat">
    <div class="n">Calculated</div>
    <div class="l">Custom<br>fields</div>
  </div>
  <div class="stat">
    <div class="n">Public/Share</div>
    <div class="l">Stakeholder<br>access modu</div>
  </div>
</div>

Veri, ancak anlaşıldığında değer yaratır. Excel tablolarında gizli kalan yüzlerce satır, Looker Studio'da görsel hikayeye dönüştüğünde eylem tetikler. Gonet için kritiklik üç noktada:

**1. Gerçek zamanlı karar desteği:** GA4'ten gelen anlık e-ticaret verileri, Google Ads bütçe performansı, CRM'den gelen lead skoru — hepsi tek dashboard'da, her sabah güncel. Müşterilerimiz artık haftalık sunumları beklemeden, dashboard'a bakarak kampanya ayarlarını optimize ediyor.

**2. Blended data ile bütünsel görüş:** Bir otomotiv müşterimiz için GA4 oturum verilerini, showroom CRM sisteminden gelen test sürüş rezervasyonlarıyla Looker Studio'da birleştirdik. Hangi kanalın yalnızca tıklama değil, fiziksel ziyaret getirdiğini görmek, bütçe dağılımını %32 değiştirdi.

**3. Stakeholder-specific dashboard'lar:** CFO finansal ROI görür (ROAS, CPA, LTV), CMO marka metrikleri (impression share, brand search lift), dijital ekip teknik detayları (bounce rate segmentasyonu, funnel drop-off) görür — aynı veri seti, farklı hikayeler.

Calculated fields olmadan standart raporlar yüzeysel kalır. Örneğin 'Qualified Lead Cost' metriği: GA4'ten gelen form submission sayısını, CRM'den gelen qualified rate ile çarpıp, Ads maliyetine bölerek türetiyoruz. Bu metrik, genel 'Cost per Conversion'dan 4-5 kat daha anlamlı.

## Gonet yaklaşımı

Looker Studio dashboard'larını üç katmanda kuruyoruz:

**Katman 1: Veri mimarisi (Data Architecture)**
Veri kaynaklarını BigQuery üzerinden merkezi hale getiriyoruz. GA4, Google Ads, Facebook Ads, CRM verilerini BigQuery'ye aktarıp, Looker Studio'yu bu merkezi veri ambarına (data warehouse) bağlıyoruz. Böylece blended data işlemleri hızlı kalır, veri tutarlılığı sağlanır. Örneğin bir moda e-ticaret müşterisi için 12 farklı kaynağı (GA4, Ads, Meta, TikTok, email platformu, Shopify backend) BigQuery'de birleştirip, tek Looker Studio dashboard'unda topladık.

**Katman 2: Calculated field kütüphanesi**
Sektöre özel hesaplanmış metrikler geliştiriyoruz. Finans sektörü için 'Qualified Lead Velocity', e-ticaret için 'Repeat Purchase Rate by Channel', SaaS için 'Trial-to-Paid Conversion by Source'. Bu metrikleri CASE WHEN, REGEXP formülleriyle, bazen JavaScript snippet'leriyle oluşturuyoruz. Bir sigorta şirketi müşterimiz için 'Age-Weighted Lead Score' calculated field'ı: yaş segmentine göre lead değerini otomatik ağırlıklandırıyor.

**Katman 3: Stakeholder journey tasarımı**
Dashboard'u hikaye akışıyla kuruyoruz. Üstte executive summary kartları (toplam ROI, MoM büyüme), ortada kanal bazlı detay tabloları, altta zaman serisi grafikleri. Filter'lar sezgisel — tarih, kanal, ürün kategorisi. Her sayfa bir soruya cevap verir: "Bu ay hedefi tuttuk mu?", "Hangi kanal düştü?", "Neden düştü?". Bir inşaat firması CEO'su için aylık dashboard'u 4 sayfaya indirdik: Overview, Lead Quality, Regional Performance, Competitor Benchmark. Her sayfa 30 saniyede okunabilir.

Google Tag Manager (GTM) ile custom event'leri GA4'e gönderip, Looker Studio'da görselleştiriyoruz. Örneğin 'Video %75 Watched' event'i, hangi ürün videosunun conversion'a yakın olduğunu gösteriyor. Bu veri, içerik ekibine video süresini optimize ettirdi.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Çoklu veri kaynağı entegrasyonu** | E-ticaret + showroom + call center verilerini birleştirip, omnichannel müşteri yolculuğunu tek dashboard'da görmek. Örnek: Bir mobilya markası online görüntüleme ile mağaza satışı korelasyonunu Looker Studio'da blended data ile buldu, %18 store visit artışı sağladı. |
| **Executive reporting otomasyonu** | Haftalık PowerPoint sunumları yerine, real-time dashboard ile yönetim kurulu toplantısına canlı veri taşımak. 15 saatlik manuel rapor işini 0'a indiren müşterilerimiz var. |
| **Performans anomali tespiti** | Calculated field ile 'Expected vs Actual' metriği kurup, mevsimsellik etkisini arındırılmış performans düşüşlerini otomatik highlight etmek. Bir turizm ajansı COVID sonrası talep dalgalanmalarını bu yöntemle izledi. |
| **A/B test sonuçlarını stakeholder'a anlatmak** | Test varyantlarını filter ile ayrıştırıp, confidence interval (güven aralığı) grafikleriyle istatistiksel anlamlılığı görsel hale getirmek. Teknik olmayan karar vericiler %95 güven seviyesini çubuk grafik olarak anlıyor. |
| **SaaS metriklerini cohort analizi ile takip** | Kullanıcıyı ilk kayıt tarihine göre gruplandırıp (cohort), aylık retention (elde tutma) oranlarını heat map ile göstermek. Bir SaaS müşterimiz churn (kayıp) sebebini 3. ay onboarding eksikliğine Looker Studio cohort dashboard'unda bağladı. |

## İlgili yetkinlikler

Looker Studio, Gonet'in **Analitik & Veri** yetkinlik setinin görselleştirme ayağıdır. Veri toplama için [Google Analytics 4 (GA4)](/yetkinlikler/google-analytics-4) ve [Google Tag Manager (GTM)](/yetkinlikler/google-tag-manager), veri depolama için [BigQuery](/yetkinlikler/bigquery), dönüşüm optimizasyonu için [Conversion Rate Optimization (CRO)](/yetkinlikler/conversion-rate-optimization) yetkinlikleriyle entegre çalışır. Dashboardlarda gördüğünüz metrikler, GTM ile topladığımız event'lerden, GA4'te işlediğimiz segmentasyonlardan, BigQuery'de birleştirdiğimiz veri setlerinden beslenir.

## Gonet ile çalışmak

26 yıldır veriyi görselleştirip eyleme dönüştürüyoruz. Looker Studio dashboard'larımız, yalnızca grafik koleksiyonu değil, işinizin nabzını tutan canlı raporlardır. Blended data mimarinizi kurmak, calculated field kütüphanenizi oluşturmak veya stakeholder'larınıza özel dashboard tasarlamak için [iletişime geçin](/iletisim). İlk keşif toplantısında mevcut raporlarınızı analiz edip, hızlı kazanım noktalarını birlikte belirleriz.
