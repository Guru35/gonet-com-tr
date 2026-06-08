---
title: "Conversion Rate Optimization (CRO): Veriyle Destekli Dönüşüm Artırma"
description: "Heatmap, session recording, funnel analysis ve A/B testlerle dijital varlıklarınızı dönüşüm makinelerine dönüştürüyoruz. 26 yıllık deneyimle CRO uzmanlığı."
h1: "Conversion Rate Optimization (CRO): Veriyle Destekli Dönüşüm Artırma"
categorySlug: "tasarim-ux"
categoryName: "Tasarım & UX"
skillSlug: "conversion-rate-optimization-cro"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/tasarim-ux/detail-tasarim-cro.jpg"
keywords:
  - conversion-rate-optimization
  - cro
  - donusum-orani-optimizasyonu
  - heatmap
  - isi-haritasi
  - session-recording
  - oturum-kaydi
  - funnel-analysis
  - huni-analizi
  - ab-test
  - ab-testi
  - multivariate-test
  - google-optimize
  - vwo
  - kullanici-deneyimi-optimizasyonu
  - conversion-funnel
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "CRO için minimum trafik hacmi gereksinimi nedir, düşük trafikli siteler CRO yapabilir mi?"
    a: "A/B test yapabilmek için istatistiksel anlamlılığa ulaşacak hacim gerekir; genellikle aylık 10.000+ unique ziyaretçi ve haftada 100+ conversion hedef minimum seviyedir. Ancak trafik düşükse CRO'nun diğer bileşenleri hâlâ değerlidir: heatmap ve session recording ile UX sorunları tespit edilir, funnel analysis ile tıkanıklıklar görülür, bu bulgularla yapılan değişiklikler A/B test olmadan deploy edilebilir. Test için yeterli trafik oluşana kadar nitel analiz ve expert review odaklı CRO uygulanır. Düşük trafikli sitelerde uzun süreli testler (4-6 hafta) veya daha radikal değişiklikler (küçük varyasyon yerine sayfa redesign) tercih edilir."
  - q: "A/B testi kaç hafta sürmeli, testin erken sonlandırılması neden yanlış sonuç verir?"
    a: "İstatistiksel olarak anlamlı sonuç için minimum 2 hafta ve %95 güven aralığı + yeterli örneklem (genellikle varyasyon başına 350+ conversion) gereklidir. Erken sonlandırma Simpson's Paradox'a yol açar: ilk 3 günde A varyasyonu %20 önde gözükebilir ancak hafta sonları farklı kullanıcı davranışı gösterir ve 2 haftalık veri B'yi kazanan yapar. Ayrıca novelty effect (yenilik etkisi) ilk günlerde yapay artış sağlar, gerçek kullanıcı tercihi ancak 7+ günde stabilize olur. Testin en az bir tam iş döngüsünü (hafta içi + hafta sonu) kapsaması ve seasonality (mevsimsellik) etkilerinden kaçınmak için özel günlerden (Black Friday, bayram) uzak sürdürülmesi kritiktir. %95 confidence ve p<0.05 değerine ulaşılmadan karar verilmez."
  - q: "Heatmap analizi ile session recording arasındaki fark nedir, hangisi ne zaman kullanılır?"
    a: "Heatmap nicel veridir: 10.000 kullanıcının aggregate davranışını gösterir, hangi alanların %70 tıklama aldığı, scroll depth ortalamalarını visualize eder. Session recording ise nitel veridir: individual kullanıcıların gerçek yolculuğunu video gibi izlersiniz, kullanıcı formda nerede takıldı, hangi elementi aramaya çalıştı görürsünüz. Heatmap 'ne' sorusunu yanıtlar (kullanıcılar CTA'ya tıklamıyor), session recording 'neden' sorusunu açıklar (CTA'nın üstündeki banner onları dikkatini dağıtıyor, bazı kullanıcılar CTA'nın reklam olduğunu düşünüp es geçiyor). Optimum yaklaşım: heatmap ile anomali tespit, session recording ile root cause (kök neden) analizi. Örneğin heatmap'te %40'lık bir alanın hiç tıklanmadığını görürseniz, o alanda gezinen 50 kullanıcının session kaydını izleyerek neden görmezden geldiğini anlarsınız."
  - q: "Funnel analysis'te hangi adımda optimizasyon başlanmalı, en fazla dropoff olan mı yoksa en erken adım mı?"
    a: "En yüksek dropoff hacmine sahip adımdan başlanır, çünkü ROI en yüksek olanıdır. Örnek: 5 adımlı checkout funnel'ında 1. adım %20 dropoff (10.000 → 8.000), 2. adım %15 (8.000 → 6.800), 3. adım %40 (6.800 → 4.080), 4. adım %10 (4.080 → 3.672). En yüksek oran 3. adım olsa da, 1. adımın hacmi daha büyük olduğu için (2.000 kayıp vs. 2.720 kayıp) optimize edilmesi daha fazla absolut kazanım getirir. Ancak eğer erken adımdaki dropoff kalifiye kullanıcıları elemiyorsa (bot trafik, yanlış niyetli tıklamalar), sonraki adımlara odaklanılır. Strateji: dropoff rate × volüm formülüyle impact hesapla, en yüksek impactlı adımı önceliklendir. Paralel olarak quick win'ler (kolay düzeltmeler) varsa, erken adımlarda bunlar da hızlıca yapılabilir."
  - q: "CRO çalışması SEO'yu olumsuz etkiler mi, A/B testlerde Google cloaking penaltısı riski var mı?"
    a: "Google, doğru yapılan A/B testlere izin verir ve cloaking olarak görmez. Kritik kurallar: 1) JavaScript ile client-side test yapılıyorsa canonical URL değişmez, URL-based split test yapılıyorsa rel=canonical original'e işaret etmeli. 2) Googlebot'a her zaman orijinal varyasyon gösterilmeli (user-agent sniffing cloaking olur), test araçları genellikle bunu otomatik yapar. 3) Test geçiciyse (2-4 hafta) 302 redirect, kalıcı değişiklikse 301. 4) Radikal içerik değişikliği (ürün açıklaması tamamen farklı) yerine layout/CTA/form değişikliği tercih edilir. Google Search Console'daki 'A/B Testing' dokümanında belirtilen best practice'lere uyulursa SEO riski yoktur. Gonet'te her test öncesi SEO impact assessment yapar, gerekirse test varyasyonunu noindex ederiz."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "Ilk yayin"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Kreatif viz eklendi (process, compare)"
  - date: "2026-06-08"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## Conversion Rate Optimization (CRO) nedir?

Conversion Rate Optimization (Dönüşüm Oranı Optimizasyonu), web sitesi veya uygulamanızı ziyaret eden kullanıcıların hedeflenen eylemi (satın alma, form doldurma, kayıt olma, indirme) gerçekleştirme oranını sistematik olarak artırma disiplinidir. CRO, trafik artırımına değil mevcut trafiğin değerini maksimize etmeye odaklanır.

Bir CRO programı dört temel bileşenden oluşur: heatmap (ısı haritası) analiziyle kullanıcı davranış kalıplarının görselleştirilmesi, session recording (oturum kaydı) ile gerçek kullanıcı yolculuklarının izlenmesi, funnel analysis (huni analizi) ile dönüşüm sürecindeki tıkanıklıkların tespiti ve A/B test ile değişikliklerin kontrollü ortamda doğrulanması. Bu dört araç birlikte kullanıldığında, spekülasyon yerine veriyle destekli kararlar almanızı sağlar.

Gonet'te CRO, izole bir proje değil sürekli bir iyileştirme döngüsüdür. Her optimizasyon hipotezini nicel veriyle destekler, her değişikliği istatistiksel anlamlılık seviyesinde test eder, her kazanımı dokümante ederiz.

## Neden kritik?

<div class="gonet-compare">
  <div class="col"><div class="lab">Önce</div><div class="bar"><span style="--h: 28px"></span></div><div class="v">%1.5</div><div class="desc">Ortalama e-ticaret dönüşüm oranı</div></div>
  <div class="col is-primary"><div class="lab">Sonra (CRO)</div><div class="bar"><span style="--h: 72px"></span></div><div class="v">%2.5</div><div class="desc">Optimizasyon sonrası dönüşüm, %66 daha fazla müşteri</div></div>
</div>

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">+%18-22</div>
    <div class="l">CLS dusurme<br>mobil donusum</div>
  </div>
  <div class="stat">
    <div class="n">A/B</div>
    <div class="l">Statistical<br>test base</div>
  </div>
  <div class="stat">
    <div class="n">Heatmap</div>
    <div class="l">Hotjar/<br>Clarity insight</div>
  </div>
  <div class="stat">
    <div class="n">Funnel</div>
    <div class="l">Cok adimli<br>analiz</div>
  </div>
</div>

Türkiye'de ortalama e-ticaret dönüşüm oranı %1-2 bandındadır. Bu oran, 100 ziyaretçiden yalnızca 1-2'sinin müşteri olduğu anlamına gelir. CRO ile bu oranı %3'e çıkarmak, aynı trafik bütçesiyle gelirinizi %50-100 artırır. Yeni müşteri edinme maliyeti (CAC - Customer Acquisition Cost) sürekli yükselirken, mevcut trafiği daha verimli kullanmak en hızlı ROI yoludur.

Heatmap analizi, kullanıcıların sayfanızda nereye tıkladığını, hangi bölgeleri görmezden geldiğini gösterir. Session recording, bir ürün sayfasında 17 saniye geçirip hiçbir etkileşim yapmadan çıkan kullanıcının aslında fiyat bilgisini bulamadığını ortaya koyar. Funnel analysis, ödeme sürecinin üçüncü adımında %40 abandonmentle karşılaşıyorsanız o adıma özel müdahale gerektiğini kanıtlar. A/B test, 'Satın Al' yerine 'Sepete Ekle' buton metninin %12 dönüşüm artışı sağladığını istatistiksel kesinlikle doğrular.

CRO yapmadan dijital pazarlama, delik bir kovaya su doldurmaya benzer. Trafik artırırsınız ama dönüşüm altyapısı zayıfsa bütçenin büyük kısmı boşa gider.

## Gonet yaklaşımı

<div class="gonet-process">
  <div class="pt">CRO DÖNGÜSÜ: TANI → HİPOTEZ → VALİDASYON</div>
  <div class="steps">
    <div class="step is-primary"><div class="n">1</div><div class="t">Tanı</div><div class="d">GA4, Hotjar, Clarity ile heatmap/session/funnel analizi</div></div>
    <div class="step"><div class="n">2</div><div class="t">Hipotez</div><div class="d">ICE framework ile önceliklendirme, etki tahmini</div></div>
    <div class="step"><div class="n">3</div><div class="t">Validasyon</div><div class="d">A/B test, %95 güven, min 2 hafta, deploy/arşiv</div></div>
  </div>
</div>

26 yıldır 220+ markayla çalışan Gonet'in CRO metodolojisi üç katmanlıdır: tanı, hipotez, validasyon.

**Tanı katmanı:** Google Analytics 4 (GA4), Hotjar, Microsoft Clarity ve Crazy Egg gibi araçları entegre kullanarak nicel ve nitel veri toplarız. Heatmap'ler, scroll depth (kaydırma derinliği) haritaları ve click maps (tıklama haritaları) ile kullanıcı davranışını görselleştiririz. Session recording'lerde random örneklem yerine segmentli analiz yaparız: sepete ekleyip ödemeye gitmeyen kullanıcılar, 3+ sayfa görüntüleyip çıkanlar, mobil vs. desktop gibi. Funnel'ları micro-conversion'lara (ürün detay görüntüleme → sepete ekleme → checkout başlatma → ödeme) kadar parçalarız.

**Hipotez katmanı:** Veriyi ICE framework (Impact × Confidence × Ease) ile önceliklendiririz. Örneğin heatmap'te %68'lik kullanıcının CTA butonunun 300px aşağısına scroll etmediğini görüyorsak, 'Hero alanına ikinci CTA eklenmesi dönüşümü artırır' hipotezi yüksek impact ve ease, orta confidence alır. Her hipotez dokümante edilir, beklenen etki yüzdesi tahmin edilir.

**Validasyon katmanı:** A/B testleri Google Optimize, VWO veya Optimizely ile yürütürüz. Minimum %95 güven aralığı ve en az 2 hafta süre kuralını uygularız. Multivariate test (MVT) yerine seri A/B tercih ederiz çünkü Türkiye trafik hacimleri MVT için genellikle yetersizdir. Kazanan varyasyon siteye deploy edilir, kaybeden arşivlenir, öğrenilen insight dokümante edilir.

Bir SaaS müşterimiz için yaptığımız CRO çalışmasında, free trial buton rengini değiştirmek yerine trial süresini buton metnine eklemek ('%14 gün ücretsiz dene%') %31 tıklama artışı sağladı. Renk değil bilgi açıklığıydı asıl engel.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Yüksek trafik, düşük dönüşüm** | Mevcut 10.000 aylık ziyaretçi, %1 conversion. CRO ile %2'ye çıkmak ek trafik maliyeti olmadan geliri ikiye katlar. |
| **Yüksek CAC (müşteri edinme maliyeti)** | Google Ads'te tıklama başı ₺8, conversion %1.5. CRO ile %2.5'e çıkarmak CAC'yi %40 düşürür, aynı bütçeyle %66 daha fazla müşteri. |
| **Funnel'da belirgin tıkanıklık** | Checkout'ta %60 sepet terk oranı. Session recording'lerle ödeme formu UX sorunları tespit edilir, iyileştirme %25 completion artışı sağlar. |
| **Mobil vs. desktop performans farkı** | Desktop conversion %3.2, mobil %0.9. Mobil heatmap'lerle thumb zone (başparmak erişim alanı) dışındaki CTA'lar tespit edilir, mobil-spesifik tasarım farkı %180 artış getirir. |
| **Yüksek bounce rate (hemen çıkma oranı)** | Landing page bounce %72. Session recording'le kullanıcıların yükleme süresi, above-the-fold mesaj uyuşmazlığı veya mobil responsive sorunları görülür, müdahale bounce'u %45'e indirir. |
| **A/B test kültürü kurmak** | Pazarlama ekibi sezgisel kararlar alıyor. CRO programı ile veriyle destekli karar kültürü, her çeyrekte en az 8 test, dokümante öğrenme kütüphanesi oluşur. |

## İlgili yetkinlikler

CRO, izole bir disiplin değildir. **[UI/UX tasarım](/yetkinlikler/tasarim-ux/ui-ux-tasarim)** ile entegre çalışır çünkü heatmap ve session recording'lerin ortaya koyduğu UX sorunları tasarım revizyonu gerektirir. **[Google Analytics 4 (GA4) kurulum ve analiz](/yetkinlikler/veri-analitik/google-analytics-4)** olmadan funnel analizi ve segmentasyon yapılamaz. **[Landing page tasarım ve optimizasyon](/yetkinlikler/tasarim-ux/landing-page-tasarim)** CRO'nun doğrudan uygulandığı alandır. **[Google Tag Manager (GTM)](/yetkinlikler/veri-analitik/google-tag-manager)** ile A/B test araçları ve event tracking entegrasyonu sağlanır.

## Gonet ile çalışmak

Gonet'in CRO programı aylık retainer modeliyle çalışır: ilk ay tanı ve ilk hipotez seti, ikinci aydan itibaren paralel test döngüleri. Her çeyrekte detaylı rapor, öğrenilen insight'lar ve önümüzdeki 90 günlük test roadmap'i sunarız. 26 yıllık deneyimimizle sadece araç kullanımı değil, o araçlardan nasıl anlamlı sonuç çıkarılacağını biliyoruz. Dönüşüm oranlarınızı veriyle artırmak için [iletişime geçin](/iletisim).

