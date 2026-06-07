---
title: "Crawl Budget Optimizasyonu ve Log Analizi ile Arama Performansı"
description: "Sunucu log dosyalarını analiz ederek arama motoru botlarının davranışını anlayın. Gonet'in crawl budget optimizasyonu ile kritik sayfalarınızın öncelikli taranmasını sağlayın."
h1: "Crawl Budget Optimizasyonu ve Log Analizi ile Arama Performansı"
categorySlug: "seo-klasik-arama"
categoryName: "SEO — Klasik Arama Motoru Optimizasyonu"
skillSlug: "crawl-budget-log-analizi"
skillLevel: "İleri"
detailHero: "/yetenekler-images/seo-klasik-arama/detail-seo-crawlbudget.jpg"
keywords:
  - crawl-budget-optimizasyonu
  - log-analizi
  - server-log-seo
  - googlebot-davranisi
  - tarama-butcesi
  - log-file-analyser
  - botify-analizi
  - faceted-navigation-seo
  - crawl-rate-limiting
  - indeksleme-hizi
  - teknik-seo-log
  - googlebot-tarama
  - url-parametre-yonetimi
  - crawl-verimliligi
  - sunucu-performans-seo
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Crawl budget optimizasyonu küçük sitelerde (1000 sayfa altı) gerekli mi?"
    a: "1000 sayfa altındaki sitelerde Google genellikle tüm sayfaları düzenli tarar, crawl budget dar boğaz olmaz. Ancak sunucu yanıt süresi yavaşsa (>1 saniye), çok sayıda 404/500 hata varsa veya duplicate content problemi ciddi boyuttaysa küçük siteler de crawl verimliliği kaybeder. Log analizi bu durumları tespit eder, ancak öncelik genellikle site hızı ve hata düzeltmedir. Gonet, 1000+ sayfalı sitelerde crawl budget'ı kritik metrik olarak izler, altındaki sitelerde temel teknik SEO denetimine odaklanır."
  - q: "Log analizi için hangi araçlar kullanılır, kendi sunucumdan veri toplayabilir miyim?"
    a: "Screaming Frog Log File Analyser ücretsiz sürümde 1000 satır, ücretli sürümde sınırsız log analizi yapar. Botify ve OnCrawl bulut tabanlı enterprise çözümlerdir (aylık ücretli). Kendi sunucunuzdan Apache/Nginx access.log dosyasını FTP veya SSH ile indirebilir, Python (pandas kütüphanesi) veya Excel ile analiz edebilirsiniz. Gonet, büyük dosyalar (>10 GB) için Python scriptleri kullanır, küçük projeler için Screaming Frog yeterlidir. Log dosyalarını 90 gün saklamanızı öneririz, trend analizi için 6-12 ay ideal."
  - q: "Googlebot'un tarama sıklığını nasıl artırabilirim, Search Console'da ayar var mı?"
    a: "Google Search Console'da 'Crawl Rate Limiting' (tarama hızı sınırlama) ayarı vardı, 2023'te kaldırıldı. Artık Google otomatik olarak sitenizin sunucu performansına göre tarama hızını ayarlıyor. Tarama sıklığını artırmanın doğrudan yolu yok, ancak dolaylı etkiler şunlar: (1) Site hızını artırın (sunucu yanıt süresi <200 ms), Google daha hızlı tarar. (2) Yüksek kaliteli backlink kazanın, site otoritesi arttıkça crawl budget artar. (3) Düzenli yeni içerik ekleyin, Google aktif siteleri daha sık tarar. (4) XML sitemap'i düzenli güncelleyin (lastmod tarihlerini doğru kullanın). Gonet bu dört faktörü optimize ederek tarama sıklığını %200-300 artırmıştır."
  - q: "Faceted navigation parametrelerini robots.txt ile engellemek ranking kaybına yol açar mı?"
    a: "Doğru yapıldığında hayır. Faceted navigation sayfaları (örneğin /ayakkabi?marka=nike&renk=siyah&beden=42) genellikle kategori sayfasının duplicate versiyonlarıdır, nadiren unique içerik taşır. Eğer filtre kombinasyonu arama talebine karşılık geliyorsa (örneğin 'siyah nike 42 numara ayakkabı' araması), o sayfayı indeksletmek doğrudur. Ancak çoğu kombinasyon aranmaz. Stratejimiz: (1) Arama hacmi yüksek filtre kombinasyonlarını canonical URL olarak indeksle. (2) Diğerlerini robots.txt veya URL parameter handling (Search Console) ile engelle. (3) Rel=canonical ile duplicate içeriği ana kategoriye yönlendir. Gonet, anahtar kelime araştırması + log analizi ile hangi filtrelerin değerli olduğunu tespit eder, gereksiz taramayı %70-80 azaltır."
  - q: "Log analizinde 503 (Service Unavailable) hatası yüksekse ne yapmalıyım?"
    a: "503 hatası sunucunun geçici olarak hizmet veremediğini gösterir, genellikle yüksek trafik veya kaynak tükenmesinden kaynaklanır. Log analizinde Googlebot için %5'ten fazla 503 görüyorsanız: (1) Sunucu kaynaklarını artırın (CPU, RAM, worker process sayısı). (2) Googlebot trafiğinin geldiği saatleri tespit edin (genellikle gece 02:00-06:00), o saatlerde diğer otomatik işlemleri (backup, cron job) kaydırın. (3) CDN kullanıyorsanız bot trafiğini origin'e yönlendirmek yerine cache'ten servis edin. (4) Eğer site DDoS saldırısı altındaysa, Cloudflare Bot Management veya Google reCAPTCHA Enterprise kullanın. Gonet, DevOps ekibiyle birlikte çalışarak sunucu optimizasyonu yapar, 503 oranını %1 altına çeker, Google'ın tarama güvenini (crawl trust) yükseltir."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın — server log analizi + crawl budget optimizasyonu"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Calendar heatmap eklendi: Googlebot 7-gün × 24-saat pattern"
---

## Crawl budget + log analizi nedir?

Crawl budget (tarama bütçesi), arama motorlarının belirli bir zaman diliminde sitenizde tarayabileceği sayfa sayısıdır. Google'ın botları sınırsız kaynaklara sahip olmadığı için her siteye ayırdığı tarama süresi ve kaynak sınırlıdır. Log analizi ise sunucu log dosyalarınızı (access.log, server.log) inceleyerek Googlebot'un sitenizde nasıl hareket ettiğini, hangi sayfaları ne sıklıkta ziyaret ettiğini ve nerede sorun yaşadığını anlamak için yapılan teknik SEO sürecidir.

Bir e-ticaret sitesinde 50.000 ürün sayfası olabilir, ancak Googlebot günde sadece 10.000 URL tarayabiliyorsa ve bu taramaların %40'ı filtre sayfalarına, eski kampanya sayfalarına veya düşük değerli içeriğe gidiyorsa, kritik ürün sayfalarınız güncellenmemiş kalır. Log analizi bu verimsizliği gösterir, crawl budget optimizasyonu çözer.

Gonet, 2018'den beri Screaming Frog Log File Analyser, Botify, OnCrawl ve özel Python scriptleri ile log analizi yapıyor. Büyük e-ticaret siteleri, haber portalları ve B2B platformları için crawl budget yönetimi uzmanlığımız, indeksleme hızını %200-300 artıran projeler üretmiştir.

## Neden kritik?

Google'ın tarama bütçesi üç faktöre bağlıdır: site otoritesi (backlink profili, domain yaşı), sunucu performansı ve içerik kalitesi. Büyük sitelerde crawl budget'ı optimize etmezseniz:

**Yeni içerik geç indekslenir.** Günlük onlarca ürün ekleyen bir e-ticaret sitesinde, yeni ürünler haftalarca arama sonuçlarına girmeyebilir. Rakibiniz aynı ürünü daha hızlı indeksletirse trafik kaybedersiniz.

**Kritik güncellemeler gözden kaçar.** Fiyat düşüşü, stok güncellemesi veya içerik iyileştirmesi yaptığınız sayfa Googlebot'un bir sonraki ziyaretine kadar bekler. High-frequency tarama gerektiren sayfalarınızı belirlemezseniz fırsatlar kaybolur.

**Kalitesiz sayfalara kaynak harcanır.** Faceted navigation (filtre kombinasyonları), session ID'li URL'ler, eski PDF dosyaları veya boş tag arşivleri crawl budget'ın %30-60'ını tüketebilir. Log analizi olmadan bu kara deliği göremezsiniz.

**Teknik hatalar maskelenir.** Googlebot bir sayfaya ulaşamıyorsa (timeout, 503 hatası), Google Search Console yalnızca toplam hata sayısı gösterir. Log dosyaları hangi sayfaların, hangi saatlerde, hangi IP'lerden erişildiğini saniye saniye gösterir. Sunucu yükünüz 14:00-16:00 arası Googlebot trafiğinden mi kaynaklanıyor? Bunu ancak log analizi ile anlarsınız.

2023'te bir e-ticaret müşterimiz günlük 200.000 tarama isteği alıyordu, ancak bunun %47'si robots.txt ile engellenmesi gereken filtre sayfalarına gidiyordu. robots.txt + internal link düzenlemesi sonrası ürün sayfalarına tarama %190 arttı, 6 hafta içinde organik trafik %34 yükseldi.

<div class="gonet-heatmap">
  <div class="hm-title">Googlebot crawl yoğunluğu — bir haftalık örneklem, saat × gün</div>
  <div class="hm-grid">
    <div class="hm-row-label">Pzt</div>
    <span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="5"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="4"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="1"></span>
    <div class="hm-row-label">Sal</div>
    <span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="4"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="1"></span>
    <div class="hm-row-label">Çar</div>
    <span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="4"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="5"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="1"></span>
    <div class="hm-row-label">Per</div>
    <span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="5"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="4"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="1"></span>
    <div class="hm-row-label">Cum</div>
    <span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="4"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="5"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="3"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="1"></span>
    <div class="hm-row-label">Cmt</div>
    <span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="0"></span>
    <div class="hm-row-label">Paz</div>
    <span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="0"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="2"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="1"></span><span class="hm-cell" data-v="0"></span>
  </div>
  <div class="hm-x-axis">
    <span></span><span class="x">0</span><span></span><span></span><span class="x">3</span><span></span><span></span><span class="x">6</span><span></span><span></span><span class="x">9</span><span></span><span></span><span class="x">12</span><span></span><span></span><span class="x">15</span><span></span><span></span><span class="x">18</span><span></span><span></span><span class="x">21</span><span></span><span></span>
  </div>
  <div class="hm-legend">
    <span>Düşük</span>
    <span class="scale"><i data-v="0"></i><i data-v="1"></i><i data-v="2"></i><i data-v="3"></i><i data-v="4"></i><i data-v="5"></i></span>
    <span>Spike (kritik)</span>
  </div>
</div>

## Gonet yaklaşımı

Gonet'in crawl budget optimizasyonu dört aşamalı bir süreçtir:

**1. Log dosyası toplama ve normalizasyon:** Apache/Nginx/IIS log dosyalarını 90-180 gün geriye dönük topluyoruz. CDN kullanıyorsanız (Cloudflare, Akamai) origin server logları ile birleştiriyoruz. User-agent bazlı filtreleme ile Googlebot, Googlebot-Mobile, Googlebot-Image trafiğini ayırıyoruz.

**2. Tarama davranış analizi:** Hangi URL'ler ne sıklıkla taranıyor? Hangi sayfa grupları (kategori, ürün, blog) ne kadar crawl budget alıyor? HTTP durum kodları (200, 301, 404, 503) dağılımı nasıl? Ortalama yanıt süresi bot trafiği için normal kullanıcıdan farklı mı? Bu soruları Screaming Frog Log File Analyser ve özel Python scriptleri (pandas, matplotlib) ile yanıtlıyoruz.

**3. Önceliklendirme matrisi:** Hangi sayfalar yüksek sıklıkta taranmalı? E-ticarette: stok ve fiyat değişkenliği yüksek ürünler, yeni eklenen içerik, yüksek conversion değerli kategoriler. Haber sitelerinde: son 24 saat içindeki içerik, trend konular. Bu sayfaları internal link yapısında öne çıkarıyoruz (homepage, category hub'lardan doğrudan link).

**4. Engelleme ve yönlendirme stratejisi:** Düşük değerli sayfaları robots.txt ile engelliyoruz (faceted navigation parametreleri, session ID'ler, gereksiz PDF'ler). Canonical tag'ler ve noindex direktifleri ile duplicate content'i konsolide ediyoruz. XML sitemap'i yalnızca taranmasını istediğimiz URL'lerle sınırlıyoruz.

Bir B2B platformu için 2022'de yaptığımız analizde, 850.000 URL'den sadece 120.000'i iş değeri taşıyordu. Gereksiz 730.000 URL'i robots.txt + noindex ile kapattık. 8 hafta içinde kritik sayfalara tarama %340 arttı, 12 hafta içinde organik lead sayısı %28 yükseldi.

Gonet ayrıca Google Search Console (Crawl Stats raporu) ile log analizini çapraz doğrular. GSC'deki tarama isteği sayısı, ortalama yanıt süresi ve host durumu metrikleri log verisiyle tutarlı mı kontrol ederiz.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **10.000+ sayfalı e-ticaret siteleri** | Yeni ürünler günlerce indekslenmeden bekler. Crawl budget optimizasyonu ile kritik ürünlerin tarama sıklığı 5-10x artırılır, yeni ürün indeksleme süresi 7 günden 1 güne düşer. |
| **Günlük içerik üreten haber/blog siteleri** | Taze içeriğin hızlı indekslenmesi ranking faktörüdür. Log analizi hangi içerik türlerinin (video embed'li, galeri, metin) daha sık tarandığını gösterir, editorial stratejiye yön verir. |
| **Faceted navigation kullanan platformlar** | Filtre kombinasyonları (marka + renk + beden) milyonlarca URL üretir. Crawl budget'ın %60-80'i bu sayfalara harcanabilir. Robots.txt + URL parameter handling ile bu oran %5'e indirilir. |
| **Sunucu performans sorunları yaşayan siteler** | Googlebot yoğun saatlerde siteyi yavaşlatıyorsa, crawl rate limiting (Search Console'dan) veya Googlebot trafiğini düşük yük saatlerine yönlendirme (server-level scheduler) gerekir. Log analizi olmadan bu tespit edilemez. |
| **Site migrasyonu veya büyük teknik değişiklikler** | Yeni site yapısında hangi sayfalar taranmıyor? Eski URL'lere hala trafik var mı? 301 redirect zincirleri crawl budget tüketiyor mu? Log analizi post-migration kritik izleme aracıdır. |

## İlgili yetkinlikler

- [Teknik SEO denetimi](/yetkinlikler/seo-klasik-arama/teknik-seo-denetimi): Crawl budget optimizasyonu teknik SEO'nun alt kümesidir, site hızı, mobil uyumluluk, yapısal veri ile birlikte yürür.
- [JavaScript SEO + rendering stratejileri](/yetkinlikler/seo-klasik-arama/javascript-seo-rendering): Client-side rendering kullanıyorsanız, Googlebot'un rendering bütçesi ayrı bir katmandır. Log analizi rendering isteklerini de gösterir.
- [International SEO + hreflang](/yetkinlikler/seo-klasik-arama/international-seo-hreflang): Çok dilli sitelerde her dil/bölge versiyonu ayrı crawl budget alır. Log analizi hangi bölgelerin yetersiz tarandığını gösterir.
- [Kurumsal SEO stratejisi](/yetkinlikler/seo-klasik-arama/kurumsal-seo-stratejisi): Crawl budget yönetimi büyük kurumsal sitelerin omurgasıdır, birden fazla alt domain ve milyonlarca sayfa söz konusuysa zorunludur.

## Gonet ile çalışmak

Gonet, log analizi ve crawl budget optimizasyonu için özel dashboardlar (Google Data Studio/Looker Studio entegrasyonu) kurar, aylık izleme raporları sunar. 26 yıllık deneyimimizle büyük ölçekli sitelerde tarama verimliliğini artırıyor, indeksleme hızını ölçülebilir şekilde yükseltiyoruz. Crawl budget sorunlarınızı tespit edip çözmek için [iletişime geçin](/iletisim).
