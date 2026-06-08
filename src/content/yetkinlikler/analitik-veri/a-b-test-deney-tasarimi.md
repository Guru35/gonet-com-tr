---
title: "A/B Test & Deney Tasarımı: İstatistiksel Geçerlilik ile Karar Alın"
description: "Statistical significance, sample size ve MDE planlaması ile veriye dayalı deney tasarımı. 26 yıllık deneyimle Gonet'in ileri seviye A/B test metodolojisi."
h1: "A/B Test & Deney Tasarımı: İstatistiksel Geçerlilik ile Karar Alın"
categorySlug: "analitik-veri"
categoryName: "Analitik & Veri"
skillSlug: "a-b-test-deney-tasarimi"
skillLevel: "İleri"
detailHero: "/yetenekler-images/analitik-veri/detail-analitik-abtest.jpg"
keywords:
  - a/b-test
  - deney-tasarımı
  - statistical-significance
  - sample-size
  - mde-planning
  - güç-analizi
  - conversion-rate-optimization
  - bayesian-testing
  - frequentist-analiz
  - bonferroni-düzeltmesi
  - multivariate-test
  - split-testing
  - hypothesis-testing
  - istatistiksel-geçerlilik
  - veri-odaklı-karar
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "A/B testinde minimum sample size nasıl hesaplanır ve neden önemlidir?"
    a: "Minimum sample size, testin istatistiksel gücünü (power) sağlamak için gereken örneklem büyüklüğüdür. Hesaplama için dört parametre gerekir: Alpha (tip I hata oranı, genellikle 0.05), Beta (tip II hata oranı, genellikle 0.20 — power = 1-Beta = 0.80), baseline dönüşüm oranı (mevcut performans) ve MDE (tespit etmek istediğin minimum etki). Örneğin %10 baseline conversion, %2 MDE (yani %12'ye çıkış), alpha 0.05, power 0.80 için group başına ~3.850 ziyaretçi gerekir. Yetersiz örneklem false negative (gerçek etkiyi kaçırma) veya false positive (rastlantısal farkı gerçek sanma) riskini artırır — karar alma güvenilirliği çöker."
  - q: "Statistical significance (p<0.05) yeterli mi, Bayesian yöntem ne zaman tercih edilir?"
    a: "Statistical significance (p<0.05) frequentist yaklaşımda nul hipotezi reddetme eşiğidir — 'B'nin A'dan farklı olmama olasılığı %5'ten az' anlamına gelir. Ancak bu, 'B'nin daha iyi olma olasılığını' doğrudan vermez. Bayesian yöntem, prior distribution (önceki bilgi veya inançlar) ile başlar, veri geldikçe posterior distribution güncellenir ve 'B'nin A'dan iyi olma olasılığı %95' gibi yorumlanabilir sonuçlar üretir. Düşük trafikli siteler, karmaşık funnel'lar veya prior bilginin kuvvetli olduğu durumlarda (sektör benchmarkları) Bayesian tercih edilir — daha az örneklemde güvenilir karar alınır. Gonet, B2B lead generation projelerinde sıklıkla Bayesian kullanır."
  - q: "MDE (Minimum Detectable Effect) nasıl belirlenir ve gerçekçi olmayan MDE'nin riski nedir?"
    a: "MDE, testin tespit edebileceği en küçük anlamlı farktır — %10 baseline conversion için MDE %2 demek, %12'ye çıkışı tespit etmeyi hedeflemek demektir. MDE belirleme iş hedefleri + istatistiksel maliyet dengesidir: Küçük MDE (örn. %0.5) çok büyük örneklem gerektirir (aylar süren test), büyük MDE (örn. %5) gerçekleşmesi zor etkidir. Gonet, cost-benefit analizi ile belirler: %1 dönüşüm artışının aylık gelir etkisi 10.000 TL ise, test maliyeti (developer zamanı, trafik opportunityi) 5.000 TL ise, MDE %1 makuldür. Gerçekçi olmayan (çok küçük) MDE, testi asla tamamlayamama; çok büyük MDE, anlamlı iyileştirmeleri kaçırma riskidir."
  - q: "Çoklu test (multivariate veya çok kollu A/B) yürütürken alpha inflation nasıl kontrol edilir?"
    a: "Çoklu karşılaştırma problemi: 3 varyant (A, B, C) test edildiğinde, 3 ikili karşılaştırma yapılır (A-B, A-C, B-C). Her karşılaştırmada alpha 0.05 ise, family-wise error rate (FWER - en az bir false positive bulma olasılığı) 1 - (0.95)³ = %14.3'e çıkar. Bonferroni düzeltmesi: alpha'yı karşılaştırma sayısına böl (0.05/3 = 0.0167 her test için). Daha az konservatif alternatif: Holm-Bonferroni veya Benjamini-Hochberg FDR kontrolü. Multivariate testlerde (5 element × 3 varyasyon = 243 kombinasyon) full factorial yerine fractional factorial design veya sequential testing kullanılır. Gonet, 4+ varyant testlerinde FWER kontrolü yapar ve raporlarda adjusted p-value'ları gösterir."
  - q: "A/B test sonuçları 'kazanan' gösterdi ama canlıya alınınca performans düştü — neden olur ve nasıl önlenir?"
    a: "Üç ana neden: (1) Novelty effect — yeni varyant ilk günlerde dikkat çeker, sonra regresyon yaşar. Önlem: En az 2 tam iş döngüsü test süresi, cohort analizi ile ilk hafta vs son hafta performans karşılaştırması. (2) Sample ratio mismatch (SRM) — test sırasında gruplar arasında trafik dağılımı bozuktu (bot, cache, implementation hatası), sonuç güvenilir değil. Önlem: Real-time SRM monitoring, chi-square test ile günlük kontrol. (3) Simpson's paradox — test genel popülasyonda kazandı ama kritik segmentlerde (mobil, ABD kullanıcılar) kaybetti, canlıda bu segment ağırlığı arttı. Önlem: Segment bazlı analiz, interaction effects kontrolü. Gonet, post-launch monitoring (2 hafta) ile regresyon tespit eder ve gerekirse rollback yapar."
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

## A/B test & deney tasarımı nedir?

A/B test & deney tasarımı, dijital pazarlama ve ürün geliştirmede iki veya daha fazla varyasyonun performansını istatistiksel yöntemlerle karşılaştırarak en etkili olanı belirleme sürecidir. İleri seviye uygulama, yalnızca bir test aracı kurmak değildir — statistical significance (istatistiksel anlamlılık), sample size (örneklem büyüklüğü), MDE (Minimum Detectable Effect - tespit edilebilir minimum etki) planlaması ve deney protokolü tasarımını içerir.

Gonet 2000'den bu yana binlerce kampanya yürütmüş bir ajans olarak, A/B testini spekülasyon değil, matematiksel kesinlik aracı olarak kullanır. Bir testin sonucunun 'iyi görünmesi' yeterli değildir — istatistiksel güç analizi, güven aralıkları ve yanlış pozitif riski kontrolü olmadan alınan kararlar, kaynak israfına yol açar.

## Neden kritik?

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">%95</div>
    <div class="l">Min statistical<br>significance</div>
  </div>
  <div class="stat">
    <div class="n">MDE</div>
    <div class="l">Min detectable<br>effect plan</div>
  </div>
  <div class="stat">
    <div class="n">14-28</div>
    <div class="l">İdeal test<br>süresi (gün)</div>
  </div>
  <div class="stat">
    <div class="n">80/20</div>
    <div class="l">Power vs<br>significance</div>
  </div>
</div>

2024'te dijital kanallar doyum noktasına ulaştı. Organik erişim düşüyor, reklam maliyetleri artıyor, kullanıcı dikkat süresi kısalıyor. Bu ortamda marjinal iyileştirmeler bile büyük fark yaratır — %2'lik dönüşüm artışı, aylık 100.000 ziyaretçili bir sitede 2.000 ek dönüşüm demektir.

Ancak çoğu A/B test uygulaması metodolojik hatalar içerir:

- **Yetersiz örneklem**: 100 ziyaretçide 'kazanan' varyant seçilir, sonuç genele uygulanınca performans düşer
- **Erken durdurma**: Testin istatistiksel güce ulaşmadan sonlandırılması, yanlış pozitif riski yaratır
- **Çoklu karşılaştırma problemi**: 10 varyant aynı anda test edilir, Bonferroni düzeltmesi yapılmaz, tip I hata oranı patlar
- **Novelty effect**: Yeni varyantın ilk günlerde yüksek performansı normal kabul edilir, regresyon görmezden gelinir

Gonet'in metodolojisi bu hataları engeller. Her testten önce güç analizi yapılır (power analysis), Alpha (0.05), Beta (0.20), beklenen baseline dönüşüm oranı ve MDE girilerek minimum örneklem hesaplanır. Test süresi trafik hacmine göre belirlenir — genellikle en az 2 tam iş döngüsü (B2B için 4 hafta, e-ticaret için 2 hafta) önerilir.

## Gonet yaklaşımı

<div class="gonet-process"><div class="pt">GONET A/B TEST SÜRECİ</div><div class="steps"><div class="step is-primary"><div class="n">1</div><div class="t">Hipotez & Önceliklendirme</div><div class="d">PIE/ICE skorlama, MDE tanımlama, darboğaz tespiti</div></div><div class="step"><div class="n">2</div><div class="t">Deney Protokolü</div><div class="d">Sample size, randomizasyon, metrik tanımı, segmentasyon</div></div><div class="step"><div class="n">3</div><div class="t">Uygulama & İzleme</div><div class="d">Real-time monitoring, SRM kontrolü, trafik dağılımı</div></div><div class="step"><div class="n">4</div><div class="t">İstatistiksel Analiz</div><div class="d">Frequentist/Bayesian yöntem, p-value, güven aralığı</div></div></div></div>

Gonet'in A/B test sürecinde dört ana aşama vardır:

**1. Hipotez geliştirme ve önceliklendirme**

Google Analytics 4, heatmap, session recording ve kullanıcı araştırması verisiyle darboğazlar belirlenir. PIE framework (Potential, Importance, Ease) veya ICE skorlama (Impact, Confidence, Ease) ile hipotezler önceliklendirilir. Her hipotez için beklenen MDE tanımlanır — 'başlık değişikliği dönüşümü %15 artırır' gibi ölçülebilir iddia.

**2. Deney protokolü tasarımı**

- **Sample size hesaplama**: G*Power, Optimizely Calculator veya Python statsmodels kütüphanesi ile
- **Randomizasyon yöntemi**: Kullanıcı bazlı (user-level), session bazlı veya cookie bazlı — seçim context'e bağlı
- **Metrik tanımı**: Primary metric (ana dönüşüm oranı), secondary metrics (bounce rate, time on page, revenue per user) ve guardrail metrics (sayfa yüklenme süresi, hata oranı)
- **Segmentasyon planı**: Mobil/desktop, yeni/tekrarlayan ziyaretçi, trafik kaynağı kırılımlarında sonuç analizi

**3. Uygulama ve izleme**

Google Optimize (sunset öncesi), VWO, Optimizely veya server-side split (Google Tag Manager + Firebase Remote Config) ile uygulama. Real-time monitoring: sample ratio mismatch (SRM) kontrolü — gruplar arasındaki trafik dağılımı beklenen oranla (50/50, 70/30 vb.) uyumlu mu? SRM, implementasyon hatası veya bot trafiği işaretidir.

**4. İstatistiksel analiz ve karar**

- **Frequentist yöntem**: İki oran Z-testi, p-value < 0.05 kriteri, %95 güven aralığı hesaplama
- **Bayesian yöntem**: Prior distribution tanımlama, posterior olasılık hesaplama, 'B'nin A'dan iyi olma olasılığı %95+' gibi sonuçlar
- **Sequential analysis**: Zaman içinde birikimli veri ile erken durdurma kararı (ancak alpha spending function ile kontrollü)

Gonet, özellikle düşük trafikli siteler için Bayesian yaklaşım önerir — prior bilgi (sektör benchmarkları) ile daha az örneklemde güvenilir sonuç alınabilir.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Yüksek hacimli e-ticaret sitesi** | Ürün sayfası layoutu, sepet akışı, CTA rengi gibi küçük değişiklikler aylık yüz binlerce TL gelir farkı yaratır. İstatistiksel titizlik, bu farkı güvenle tespit eder. |
| **Düşük dönüşüm oranlı B2B funnel** | Lead formu 100 ziyaretçide 1 dönüşüm alıyorsa, %50 artış (1.5 dönüşüm) bile büyük kazanç. MDE planlaması ile gerçekçi hedef belirlenir, ulaşılamazsa kaynak israfı önlenir. |
| **Çok kanallı kampanya optimizasyonu** | Google Ads, Meta Ads, e-posta headline testleri aynı anda yürür. Bonferroni düzeltmesi olmadan yanlış pozitif riski %40'a çıkar — Gonet protokolü bunu kontrol eder. |
| **Mobil uygulama onboarding akışı** | Kullanıcı kayıt adımı sayısı (3 vs 5), sosyal login varlığı gibi testler retention'a doğrudan etkir. Sequential analysis ile 2 hafta yerine 10 günde karar alınabilir. |
| **Fiyatlandırma stratejisi testi** | €49 vs €47 vs €52 gibi price point testlerinde psychological pricing etkisi ölçülür. Revenue per user metriği ile sadece dönüşüm değil, toplam gelir optimize edilir. |

## İlgili yetkinlikler

<div class="gonet-pullquote"><div class="big-number">+%22</div><div class="big-label">Conversion Lift</div><p class="pq-desc">E-ticaret müşterisi için 14 günlük test, 18.500 session, C varyantı (p=0.003, Bayesian %99.2).</p></div>

A/B test & deney tasarımı şu yetkinliklerle bütünleşir:

- **[Funnel & dönüşüm analizi](/yetkinlikler/funnel-donusum-analizi)**: Darboğazların tespit edilmesi, test hipotezlerinin kaynağıdır
- **[Kullanıcı davranış analizi](/yetkinlikler/kullanici-davranis-analizi)**: Heatmap, session recording ile test fikirleri oluşturulur
- **[Google Analytics 4 uygulama](/yetkinlikler/google-analytics-4)**: Test sonuçlarının segmentlere göre raporlanması için event tracking yapılandırması
- **[CRO (Conversion Rate Optimization)](/yetkinlikler/cro-optimizasyonu)**: A/B test, CRO döngüsünün uygulama motorudur

Örneğin Gonet, bir e-ticaret müşterisi için GA4 funnel raporunda 'sepete ekle → ödeme' adımında %40 düşüş tespit etti. Kullanıcı davranış analizi ile 'kargo ücreti görünümü' darboğaz olarak belirlendi. 3 varyant tasarlandı: (A) kontrol, (B) kargo ücreti ön bilgilendirme banner, (C) ücretsiz kargo threshold göstergesi. 14 günlük test sonunda (18.500 session, power 0.85), C varyantı %22 conversion lift sağladı (p=0.003). Bayesian analiz, C'nin A'dan iyi olma olasılığını %99.2 gösterdi.

## Gonet ile çalışmak

Gonet, A/B test & deney tasarımını matematiğin gücüyle birleştirir. 26 yıllık deneyimimizde edindiğimiz sektörel baseline verileri, Bayesian prior'lar için kullanırız — testleriniz daha az örneklemde sonuç verir. Protokol dokümantasyonu, peer review süreci ve post-test monitoring ile sonuçlarınızın kalıcı olmasını sağlarız.

İstatistiksel geçerliliği test stratejinizin merkezine almak için [iletişime geçin](/iletisim).
