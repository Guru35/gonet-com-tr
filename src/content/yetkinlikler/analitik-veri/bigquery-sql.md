---
title: "BigQuery + SQL: GA4 Raw Data Analizi ve İleri Veri Modelleme"
description: "Gonet'in BigQuery + SQL yetkinliği: GA4 raw export analizi, custom funnel modelleme, churn prediction, milyonlarca satır veriyi actionable insight'a dönüştürme."
h1: "BigQuery + SQL: GA4 Raw Data Analizi ve İleri Veri Modelleme"
categorySlug: "analitik-veri"
categoryName: "Analitik & Veri"
skillSlug: "bigquery-sql"
skillLevel: "İleri"
detailHero: "/yetenekler-images/analitik-veri/detail-analitik-bigquery.jpg"
keywords:
  - bigquery
  - sql-analizi
  - ga4-raw-export
  - custom-funnel-analizi
  - churn-modelleme
  - cohort-analizi
  - kullanici-duzeyinde-veri
  - scheduled-query
  - bigquery-ml
  - veri-ambari
  - multi-touch-attribution
  - ltv-hesaplama
  - retention-analizi
  - partitioned-tables
  - looker-studio-bigquery
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "BigQuery kullanmak için GA4 Premium (360) gerekli mi?"
    a: "Hayır. Standart GA4 (ücretsiz) de BigQuery export özelliğini sunar. 1 milyon event/gün'e kadar ücretsiz export yapabilirsiniz. BigQuery'nin kendi depolama ve sorgu maliyetleri vardır (ilk 1TB sorgu/ay ücretsiz, depolama ~$20/TB/ay). Gonet müşterilerinin çoğunluğu standart GA4 + BigQuery kombinasyonu kullanır; aylık BigQuery maliyeti genellikle $50-200 arasında kalır. Premium'a gerek yok, fakat büyük e-ticaret siteleri (10M+ event/gün) için BigQuery maliyeti artabilir."
  - q: "SQL bilmiyorum, BigQuery bana ne katar?"
    a: "Gonet BigQuery projesinde hazır SQL script kütüphanesi sunar: funnel analizi, cohort retention, top landing page, campaign performance detayı vb. Bu scriptler Looker Studio veya Google Sheets'e scheduled query olarak bağlanır — her sabah otomatik güncellenir, siz sadece dashboard açarsınız. SQL öğrenmek isteyen ekiplere 1 günlük training veririz; temel sorguları (SELECT, WHERE, GROUP BY, JOIN) 3-4 hafta içinde yazabilir hale gelirsiniz. BigQuery'nin asıl katkısı 'veri analisti olmadan derinlemesine analiz' yapabilmenizdir."
  - q: "GA4 raw data'yı BigQuery'de ne kadar süre saklayabilirim?"
    a: "Süre sınırı yoktur, fakat depolama maliyeti vardır. Partitioned table kullanırsanız (Gonet standart yapısı), eski partitionları silmek kolay. Tipik kullanım: 25-36 ay saklama. Örneğin 2 yıllık veri saklayan bir e-ticaret sitesi (ortalama 500MB/gün raw export), ~365GB = ~$7/ay depolama maliyeti öder. Gonet, projenin başında retention policy belirler: örneğin event-level data 24 ay, aggregated summary table (günlük/haftalık rollup) 5 yıl saklanır. Böylece uzun vadeli trend analizi yaparken maliyeti kontrol edersiniz."
  - q: "BigQuery sorgusu çok yavaş, nasıl optimize edilir?"
    a: "BigQuery sorgu hızı, taranacak veri miktarına bağlıdır. Gonet optimizasyon stratejisi: (1) Partitioned table kullan — tarih bazında partition, WHERE _TABLE_SUFFIX ile yalnızca ilgili günleri tara. (2) SELECT * yerine yalnızca gerekli kolonları seç. (3) Sık kullanılan aggregation'ları materialized view veya scheduled query ile pre-compute et. Örneğin günlük cohort hesabı her seferinde 2 yıllık raw data'dan yapılmaz; scheduled query günlük cohort tablosunu günceller (saniyeler sürer), siz o tabloyu sorgularsınız. Gonet projelerinde ortalama sorgu süresi <5 saniye, büyük cohort analizleri <20 saniye."
  - q: "BigQuery + SQL ile churn modelleme nasıl yapılır?"
    a: "Churn modelleme iki aşamalı: (1) Kullanıcı feature'larını hesapla (son 30 gün session sayısı, ortalama session süresi, satın alma sıklığı, ürün kategori dağılımı vb.) — SQL ile GROUP BY user_pseudo_id. (2) Bu feature'ları BigQuery ML (BQML) veya harici ML aracına (Python, AutoML) aktar. Basit yaklaşım: 'son 60 günde 0 session' olan kullanıcıları 'churned' label et, önceki 90 gün feature'larına göre logistic regression model eğit. Gonet, BQML ile BigQuery içinde model eğitir, prediction scheduled query olarak her hafta çalışır, sonuçları CRM'e (Salesforce, HubSpot) veya Google Ads audience'ına aktarır. Müşteri proaktif 'win-back' kampanyası çalıştırır, churn oranı %15-25 düşer."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Kreatif viz eklendi (compare, process)"
  - date: "2026-06-08"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## BigQuery + SQL nedir?

BigQuery, Google Cloud'un sunduğu sunucusuz (serverless) veri ambarı servisidir. SQL (Structured Query Language) ile büyük veri setlerini hızla sorgulamanıza olanak tanır. Dijital pazarlama bağlamında BigQuery, Google Analytics 4 (GA4) raw data export'larını depolamak ve analiz etmek için kritik bir altyapıdır. GA4 arayüzünün sunmadığı granüler, kullanıcı düzeyinde analizler (custom funnel, cohort, churn modelleme, attribution) BigQuery + SQL ile gerçekleştirilir.

Gonet, 2019'dan bu yana BigQuery altyapısı kullanır. 220+ marka portföyünde günlük milyonlarca event satırını işler, SQL scriptleriyle custom metrikler üretir ve bu verileri Looker Studio, Google Sheets veya müşteri CRM'lerine entegre eder.

## Neden kritik?

<div class="gonet-compare">
  <div class="col"><div class="lab">GA4 Arayüzü</div><div class="bar"><span style="--h: 28px"></span></div><div class="v">Sampling</div><div class="desc">14 ay veri, örnekleme var</div></div>
  <div class="col is-primary"><div class="lab">BigQuery + SQL</div><div class="bar"><span style="--h: 112px"></span></div><div class="v">Tüm Veri</div><div class="desc">25+ ay, %100 granülarite</div></div>
</div>

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">1 TB</div>
    <div class="l">Aylık ücretsiz<br>sorgu</div>
  </div>
  <div class="stat">
    <div class="n">PB+</div>
    <div class="l">Petabyte ölçek<br>analitik</div>
  </div>
  <div class="stat">
    <div class="n">Standart SQL</div>
    <div class="l">Sözdizimi<br>uyumluluğu</div>
  </div>
  <div class="stat">
    <div class="n">Streaming</div>
    <div class="l">Real-time<br>insert</div>
  </div>
</div>

GA4 raporlama arayüzü sampling (örnekleme) uygular, 14 aylık veri saklama sınırı vardır ve karmaşık kullanıcı yolculuklarını (multi-touch attribution, session stitching) doğrudan gösteremez. BigQuery raw export'u bu sınırları kaldırır:

- **Sampling yok**: Tüm hit ve event verisine doğrudan erişim.
- **Sınırsız saklama**: 25+ aylık veri saklar, yıllık trend analizi mümkün.
- **Kullanıcı düzeyinde veri**: `user_pseudo_id` bazında tüm etkileşimleri birleştirme.
- **Custom metrikler**: GA4 arayüzünde olmayan hesaplamaları (örn. ilk satın alma öncesi ortalama session sayısı, ürün görüntüleme → sepete ekleme conversion window) SQL ile tanımlama.
- **Churn ve cohort analizi**: Aylık cohort retention, kullanıcı yaşam döngüsü değeri (LTV), churn riski skorlama.

E-ticaret, SaaS, abonelik modellerinde BigQuery + SQL, veri analistinden bağımsız hareket kabiliyeti sağlar. Gonet müşterileri, kampanya performansını yalnızca 'tıklama' veya 'conversion' ile değil, 'ilk ziyaret → ilk satın alma arası median gün', 'ikinci satın alma olasılığı', 'ortalama sipariş değeri değişim trendi' gibi metriklere dayalı optimize eder.

## Gonet yaklaşımı

<div class="gonet-process">
  <div class="pt">GONET BİGQUERY ALTYAPISI</div>
  <div class="steps">
    <div class="step is-primary"><div class="n">1</div><div class="t">Altyapı Kurulumu</div><div class="d">GA4→BigQuery export, partitioned tables</div></div>
    <div class="step"><div class="n">2</div><div class="t">Script Kütüphanesi</div><div class="d">Funnel, cohort, attribution SQL sorguları</div></div>
    <div class="step"><div class="n">3</div><div class="t">Custom Modelleme</div><div class="d">Churn skoru, lead kalite, product affinity</div></div>
  </div>
</div>

Gonet BigQuery + SQL yetkinliği üç katmanda çalışır:

1. **Altyapı kurulumu**: GA4 → BigQuery daily export entegrasyonu, dataset mimarisi (partitioned tables, event-level deduplication), data retention policy.
2. **Script kütüphanesi**: Tekrar eden analizler için (funnel, cohort, attribution, device cross-session stitching) standartlaştırılmış SQL sorguları.
3. **Custom modelleme**: Müşteri KPI'larına özel skorlamalar (örn. lead kalite skoru, churn probability, product affinity matrix).

Proje örnekleri:

- Bir e-ticaret müşterisi için 18 aylık GA4 raw data üzerinden 'ilk satın alma öncesi kaç kez sepete ekleme yapıldığı' metriği; kampanya strateji değişikliğine yol açtı.
- SaaS müşterisi için aylık cohort retention tablosu: BigQuery'den Looker Studio'ya scheduled query, haftalık otomatik rapor.
- B2B kurumsal site için event sequence analizi: 'contact form' conversion path'lerinde kritik adımları tespit, CRO önceliklendirmesi.

Gonet SQL scriptleri, Google Apps Script ve Cloud Functions ile entegre edilir — örneğin her sabah güncel churn skoru Google Sheets'e yazılır, müşteri ekibi CRM'de proaktif aksiyonlar alır.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| E-ticaret veya SaaS, 100K+ aylık oturum | GA4 arayüzü sampling yapar, BigQuery ile tüm veri analiz edilir; %10+ doğruluk artışı |
| Karmaşık conversion funnel (8+ adım) | Her adımda drop-off detayı, kullanıcı segment bazında davranış analizi; funnel optimizasyon ROI 3-5x |
| Multi-touch attribution gereksinimi | Last-click yerine position-based, time-decay custom model; bütçe dağılımı 15-20% daha verimli |
| Churn prediction ihtiyacı | Kullanıcı yaşam döngüsü skoru; proaktif retention kampanyaları, LTV artışı %12-18 |
| Uzun satın alma döngüsü (3+ ay) | Session stitching, cross-device kullanıcı birleştirme; gerçek conversion path görünümü |
| Düzenli cohort, retention raporlama | Scheduled query → Looker Studio; haftalık dashboard, manuel export yok |

BigQuery + SQL, veri hacmi veya karmaşıklık arttıkça 'nice-to-have'dan 'zorunlu altyapı'ya dönüşür. Gonet müşterilerinin %40'ı ilk yıl GA4 arayüzü kullanır, ikinci yıl BigQuery'ye geçiş yapar.

## İlgili yetkinlikler

- [GA4 Kurulum & Yönetim](/yetkinlikler/analitik-veri/ga4-kurulum-yonetim): BigQuery export için temel event tracking ve custom dimension altyapısı.
- [Looker Studio (Data Studio)](/yetkinlikler/analitik-veri/looker-studio): BigQuery verilerini görselleştirme, scheduled query sonuçlarını dashboard'a aktarma.
- [Google Tag Manager (GTM) İleri](/yetkinlikler/analitik-veri/gtm-ileri): Custom event'leri GA4'e, oradan BigQuery'ye akıtmak için tag yapılandırması.
- [Conversion Rate Optimization (CRO)](/yetkinlikler/urun-yonetimi/conversion-rate-optimization): BigQuery funnel analizi sonuçlarını A/B test hipotezlerine dönüştürme.

## Gonet ile çalışmak

Gonet, 26 yıllık deneyimle BigQuery + SQL altyapınızı kurar, custom query kütüphanenizi oluşturur ve ekibinize SQL training sunar. İlk 3 ayda temel raporlar otomasyona geçer, 6. ayda custom model pipeline'ları devreye alınır. BigQuery projesi başlatmak veya mevcut yapınızı optimize etmek için [iletişime geçin](/iletisim).
