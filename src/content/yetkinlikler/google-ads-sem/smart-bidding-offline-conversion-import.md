---
title: "Smart Bidding & Offline Conversion Import – Kazanç Odaklı Otomasyon"
description: "tCPA, tROAS ve Max Conversions stratejileriyle kampanya maliyetini düşürün. Offline verileri Google Ads'e aktarın, gerçek ROAS'ı ölçün. 26 yıllık deneyim."
h1: "Smart Bidding & Offline Conversion Import – Kazanç Odaklı Otomasyon"
categorySlug: "google-ads-sem"
categoryName: "Google Ads & SEM"
skillSlug: "smart-bidding-offline-conversion-import"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/google-ads-sem/detail-ads-smartbid.jpg"
keywords:
  - smart-bidding
  - tcpa
  - troas
  - maximize-conversions
  - offline-conversion-import
  - google-ads-otomasyon
  - akilli-teklif-verme
  - hedef-cpa
  - hedef-roas
  - gclid
  - enhanced-conversions
  - makine-ogrenmesi-reklam
  - performance-max
  - b2b-lead-generation
  - google-ads-api
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Smart Bidding stratejisine geçiş için minimum kaç dönüşüm gerekir?"
    a: "Google, tCPA ve tROAS için kampanya bazında son 30 günde en az 30 dönüşüm (tROAS için 50 tercih edilir) önerir. Bu eşik altında algoritma yeteri kadar sinyal toplayamaz, öğrenme dönemi uzar veya hiç bitmez. Gonet, düşük hacimli hesaplarda portföy teklif stratejisi (portfolio bidding) kullanarak birden fazla kampanyayı tek strateji altında toplar; böylece toplam dönüşüm eşiği aşılır ve makine öğrenmesi hızlanır. Alternatif olarak ilk aşamada Maximize Conversions (hedef CPA belirlemeden) başlatılır, veri birikince tCPA'ya geçilir."
  - q: "Offline conversion import için hangi veri alanları zorunludur?"
    a: "Temel gereksinimler: (1) **GCLID** – tıklamanın benzersiz kimliği; Google Ads'ten URL parametresi olarak gelir, form gizli alanında (hidden field) ya da CRM'de saklanmalı. (2) **Conversion name** – Google Ads'te tanımlı dönüşüm eyleminin adı (ör. 'satış', 'anlaşma-kapandı'). (3) **Conversion time** – dönüşümün gerçekleştiği tarih-saat (ISO 8601 formatı). (4) **Conversion value** (isteğe bağlı ama tROAS için kritik) – işlem tutarı. Ek olarak **conversion currency** para birimi belirtilir. Enhanced conversions kullanılıyorsa hash'lenmiş e-posta veya telefon numarası da gönderilir. Gonet, GTM server-side container ya da Google Ads API ile bu alanları otomatik toplar."
  - q: "tCPA ve tROAS stratejilerinden hangisini ne zaman seçmeliyim?"
    a: "**tCPA** (target cost-per-acquisition), dönüşüm değeri sabit ya da önemsiz olduğunda kullanılır – örneğin her lead eşit değerdedir (danışmanlık başvurusu, demo talebi). Hedef: belirli CPA'da maksimum dönüşüm. **tROAS** (target return on ad spend), dönüşüm değeri değişkendir – e-ticaret sepet tutarı, B2B anlaşma büyüklüğü, sigorta prim tutarı farklıdır. Hedef: her 1 TL harcama için X TL gelir. Gonet, geçmiş veride dönüşüm değeri standart sapmasını analiz eder; sapma %50'nin üzerindeyse tROAS önerilir. Ayrıca hesap başına yeterli dönüşüm hacmi (tROAS için 50+/ay) yoksa tCPA ile başlanıp veri birikince tROAS'a geçilir."
  - q: "Offline veri aktarımında gecikme (latency) performansı nasıl etkiler?"
    a: "Google Ads, dönüşümü tıklamadan itibaren 90 gün içinde kabul eder (ayarlanabilir conversion window). Ancak Smart Bidding algoritması, **güncel veriyi** daha ağırlıklı işler. Satış bilgisi 30 gün gecikmeli aktarılırsa sistem o tıklamanın değerini geç öğrenir, benzer fırsatları kaçırmış olabilir. Gonet, offline import'u **günlük otomatik** yapar (API üzerinden her gece CRM'den çeker). Kritik sektörlerde (finans, otomotiv) gerçek zamanlıya yakın (near real-time) entegrasyon – webhook ile anlaşma kapanır kapanmaz Google Ads'e bildirim – kurulur. Gecikme azaldıkça ROAS iyileşmesi hızlanır; portföy analizlerimizde 7 günlük gecikme → 1 günlük geçişte ortalama %12 ROAS artışı görüyoruz."
  - q: "Smart Bidding'e geçince kampanya kontrolü tamamen Google'a mı bırakılır?"
    a: "Hayır. Smart Bidding **taktiksel** teklif kararlarını otomatikleştirir (hangi arama sorgusunda, hangi kullanıcıya, hangi saatte ne kadar teklif verileceği), ancak **stratejik** kontrol kampanya yöneticisindedir. Gonet şu parametreleri belirler: (1) Hedef CPA/ROAS seviyesi – agresif mi muhafazakâr mı büyüme. (2) Kampanya yapısı – hangi anahtar kelimeler aynı ad group'ta, hangi kitleler exclude. (3) Bütçe dağılımı – hangi kampanyaya ne kadar pay. (4) Ad copy ve uzantılar – kreatif mesaj. (5) Landing page kalitesi – dönüşüm hunisi. (6) Seasonal adjustment – özel dönemlerde geçici hedef değişikliği. (7) Audience sinyalleri – hangi kitlelere odaklanılacağı ipucu. Algoritma bu kılavuzlar çerçevesinde optimize eder; istenmeyen sonuç varsa (ör. düşük kalite lead artışı) strateji ve sinyal seti hızla revize edilir."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## Smart Bidding & offline conversion import nedir?

Smart Bidding (Akıllı Teklif Verme), Google Ads'in makine öğrenmesi algoritmalarını kullanarak her açık artırmada (auction) otomatik teklif ayarlayan strateji ailesidir. Temel hedefler: **Target CPA** (tCPA – hedef dönüşüm başına maliyet), **Target ROAS** (tROAS – hedef reklam harcamasının getirisi), **Maximize Conversions** (maks. dönüşüm) ve **Maximize Conversion Value** (maks. dönüşüm değeri). Sistem, kullanıcı sinyallerini (cihaz, konum, saat, tarayıcı, geçmiş davranış vb.) gerçek zamanlı analiz ederek teklifi optimize eder.

**Offline conversion import** (çevrimdışı dönüşüm aktarımı), web sitesi ya da uygulamada gerçekleşmeyen ancak iş sonucunu belirleyen eylemlerin (mağaza satışı, telefon kapanışı, CRM'deki anlaşma, servis randevusu) Google Ads'e geri bildirilmesi işlemidir. GCLID (Google Click Identifier) veya gelişmiş eşleştirme (enhanced conversions) ile tıklama ile çevrimdışı işlem arasında köprü kurulur. Bu veri akışı, Smart Bidding algoritmasına gerçek kazanç sinyali gönderir; böylece sistem sadece form gönderimini değil, ödeme yapan müşteriyi hedefler.

## Neden kritik?

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">tCPA</div>
    <div class="l">Hedef CPA<br>otomasyonu</div>
  </div>
  <div class="stat">
    <div class="n">tROAS</div>
    <div class="l">ROAS bazlı<br>akıllı teklif</div>
  </div>
  <div class="stat">
    <div class="n">±%15</div>
    <div class="l">Sezonel sapma<br>tolerans aralığı</div>
  </div>
  <div class="stat">
    <div class="n">14 gün</div>
    <div class="l">Min. öğrenme<br>aşaması</div>
  </div>
</div>

**1. Gerçek ROAS ölçümü:** E-ticaret dışı sektörlerde (B2B, danışmanlık, finans, otomotiv, sağlık) dönüşüm fiziksel ya da offline gerçekleşir. Offline veri olmadan Google Ads, yalnızca lead formunu optimize eder; bu da düşük kalite potansiyel müşteriye yol açar. Offline import ile sistem, hangi tıklamanın satışa dönüştüğünü öğrenir ve benzer profillere daha agresif teklif verir.

**2. Bütçe verimliliği:** Manuel CPC ya da eski portföy stratejileri (ör. hedef arama sayfası konumu) geniş bağlama dayalı kurallara dayanır. Smart Bidding, 70+ sinyali eş zamanlı işleyerek teklifi mikrosaniyeler içinde ayarlar. Gonet portföylerinde tCPA stratejisi geçişi sonrası ortalama %18-32 maliyet düşüşü gözlemliyoruz – aynı dönüşüm hacminde.

**3. Dinamik pazar koşullarına uyum:** Sezonsal dalgalanma, rekabet yoğunluğu, envanter değişimi Smart Bidding tarafından otomatik algılanır. Kampanya yöneticisi her gün manuel müdahale yerine stratejik seviyede hedef ROAS ya da CPA kılavuzu verir, algoritma taktiksel kararları alır.

**4. Gelişmiş eşleştirme ve gizlilik uyumu:** Enhanced conversions (gelişmiş dönüşümler), hash'lenmiş e-posta/telefon ile offline veriyi eşleştirir; üçüncü taraf çerez bağımlılığını azaltır. KVKK ve GDPR uyumlu, kullanıcı onayına dayalı veri iletimi sağlanır.

## Gonet yaklaşımı

**Aşama 1 – Kampanya denetimi ve veri hijyeni:** Geçmiş kampanyalardaki dönüşüm etiketlerini, Google Tag Manager (GTM) kurulumunu, Analytics 4 (GA4) entegrasyonunu denetleriz. Çift sayım (double-counting), yanlış atfetme, eksik GCLID kaydı gibi yaygın hataları tespit eder, düzeltiriz.

**Aşama 2 – Offline veri akış tasarımı:** Müşterinin CRM (Salesforce, HubSpot, özel yazılım) veya POS sisteminden hangi alanların (işlem ID, tutar, tarih, müşteri e-posta) Google Ads'e aktarılacağını belirleriz. API, manuel CSV, ya da Zapier/Make gibi otomasyon araçlarıyla entegrasyon senaryosu çizeriz. GCLID kalıcılığını (cookie süresi, cross-device takip) test ederiz.

**Aşama 3 – Strateji seçimi ve öğrenme dönemi yönetimi:** Hesap geçmişine göre tCPA, tROAS veya Max Conversions stratejisini seçeriz. İlk 2-4 hafta *öğrenme dönemi* (learning phase); bu sürede algoritma veri toplar, volatilite yüksektir. Bütçeyi sabitleriz, hedef metriği sık değiştirmeyiz. Öğrenme sonrası performans platosu geldiğinde yeni kampanya gruplarını aynı stratejiye alırız.

**Aşama 4 – Sürekli optimizasyon:** Haftalık ROAS/CPA trend raporu, cihaz/konum/saat dilimi breakdown'u sunarız. Audience sinyalleri (ilgi alanı, yeniden pazarlama listeleri) ile algoritma desteklenir. Sezonsal ayarlamalar (seasonal adjustment) özelliğiyle Black Friday, yıl sonu vb. dönemlerde hedefleri geçici değiştiririz. Conversion value rules ile dinamik değer atfı (premium ürün = 2× lead değeri) uygularız.

**Aşama 5 – Şeffaf raporlama:** Müşteriye aylık dashboard: kampanya bazında tıklama → lead → offline satış hunisi, CPL (maliyet/lead), CPA (maliyet/satış), ROAS. Offline import sayısı, eşleşme oranı, ortalama gecikme (tıklama-satış arası gün) detayları paylaşılır.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **B2B lead generation (uzun satış döngüsü)** | Form gönderimi ile anlaşma arası 30-90 gün olabilir. Offline import olmadan Google Ads, düşük kalite lead üretir. tROAS ile gerçek kazanan leadler optimize edilir. |
| **Çok kanallı e-ticaret (marketplace + mağaza)** | Web siparişi + telefon satış + fiziksel mağaza geliri birleştirilir. Offline import ile her kanaldaki ROAS tek platformda görünür, bütçe doğru dağıtılır. |
| **Otomotiv – test sürüşü → satış** | Test sürüşü rezervasyonu dönüşüm olarak işaretlenir, ancak asıl KPI satış. Offline import ile satış gerçekleşen rezervasyonlar yüksek değer alır, Smart Bidding benzer profillere odaklanır. |
| **Finans/sigorta – başvuru → poliçe** | Başvuru onay oranı %15-30 arasında değişir. Offline veri ile onaylanan poliçeler işaretlenir; sistem red oranı düşük segmentlere teklif artırır. |
| **Sağlık – randevu → tedavi** | Online randevu kolay ama iptal/no-show yüksek. Offline import ile gerçekleşen tedaviler işaretlendiğinde, güvenilir hasta profilleri hedeflenir. |

## İlgili yetkinlikler

- [Performance Max Kampanya Yönetimi](/yetkinlikler/google-ads-sem/performance-max-kampanya-yonetimi) – Smart Bidding'in tüm Google envanterinde (Arama, Display, YouTube, Shopping, Discover) otomatik genişlemesi.
- [Google Analytics 4 E-ticaret İzleme](/yetkinlikler/analitik-olcumleme/google-analytics-4-e-ticaret-izleme) – GA4'ten gelir ve ürün verisi Google Ads'e aktarılarak Smart Bidding beslenir.
- [Dönüşüm Oranı Optimizasyonu (CRO)](/yetkinlikler/analitik-olcumleme/donusum-orani-optimizasyonu-cro) – Daha yüksek dönüşüm kalitesi, Smart Bidding öğrenme süresini kısaltır.
- [Remarketing ve Kitle Segmentasyonu](/yetkinlikler/google-ads-sem/remarketing-kitle-segmentasyonu) – Audience sinyalleri Smart Bidding'e ek bağlam sağlar.

## Gonet ile çalışmak

2000'den beri yüzlerce hesapta Smart Bidding geçişi yönettik; offline veri entegrasyonlarını API seviyesinde kurduk. Portföy stratejilerimiz, kampanya öğrenme sürelerini optimize eder, bütçe israfını minimize eder. Gerçek ROAS'ınızı ölçmek ve kazancı maksimize etmek için [iletişime geçin](/iletisim).
