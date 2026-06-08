---
title: "Server Log Analizi: Bot Davranışı ve AI Crawler Tespiti"
description: "Server log analizi ile bot trafiğini ayırt edin, AI crawler'larını optimize edin. Gonet'in 26 yıllık deneyimiyle sunucu günlüklerinden stratejik veri çıkarın."
h1: "Server Log Analizi: Bot Davranışı ve AI Crawler Tespiti"
categorySlug: "analitik-veri"
categoryName: "Analitik & Veri"
skillSlug: "server-log-analizi"
skillLevel: "İleri"
detailHero: "/yetenekler-images/analitik-veri/detail-analitik-log.jpg"
keywords:
  - server-log-analizi
  - bot-davranış-analizi
  - ai-crawler-tespiti
  - gptbot-yönetimi
  - claudebot-analizi
  - crawl-budget-optimizasyonu
  - googlebot-analizi
  - bot-trafiği-ayrımı
  - sunucu-günlük-analizi
  - access-log-parsing
  - llm-bot-tespiti
  - sahte-googlebot
  - aeo-log-analizi
  - teknik-seo-log
  - apache-nginx-log
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Server log analizi ile Google Analytics arasındaki fark nedir?"
    a: "Google Analytics (GA4) istemci tarafı (client-side) bir araçtır: tarayıcıda JavaScript çalışarak kullanıcı etkileşimlerini ölçer. Botların çoğu JavaScript çalıştırmadığı için GA4'te görünmez. Server log analizi ise sunucuya ulaşan her HTTP isteğini kaydeder — botlar, API çağrıları, başarısız istekler dahil. GA4 kullanıcı deneyimini ölçerken, server loglar sunucu gerçeğini (bot trafiği, tarama davranışı, teknik hatalar) gösterir. İkisi birlikte tam resim sunar: GA4 kullanıcı analitiği, loglar bot ve altyapı analitiği için kullanılır."
  - q: "AI crawler'ları (GPTBot, ClaudeBot) nasıl tespit edip yönetebilirim?"
    a: "AI crawler'lar user-agent string'lerinde kimliklerini belirtir: GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended (Google AI), PerplexityBot gibi. Server loglarınızda bu user-agent'ları filtreleyerek hangi botun hangi sayfaları ne sıklıkta taradığını görürsünüz. Yönetim için üç yöntem vardır: (1) robots.txt'de 'User-agent: GPTBot' satırıyla botu engelleyin veya belirli dizinleri yasaklayın. (2) Nginx/Apache'de HTTP header kontrolü yaparak belirli botlara 403 yanıtı verin. (3) Rate limiting uygulayarak aynı botun dakikadaki istek sayısını sınırlayın. Gonet müşterilerinde bot bazlı içerik stratejisi uygularız: değerli içeriği AI botlara açık tutup düşük değerli sayfaları kapatarak sunucu maliyetini %30-50 düşürdük."
  - q: "Büyük bir sitede günlük GB'larca log verisi birikiyor, bunu nasıl analiz edebilirim?"
    a: "Büyük sitelerde log analizi için otomasyona ve verimli araçlara ihtiyaç vardır. Gonet yaklaşımı: (1) Logları GZIP sıkıştırarak depolayın, depolama maliyetini %80-90 düşürür. (2) Parse işlemi için Python (regex + pandas) veya GoAccess gibi hafif araçlar kullanın. (3) Logları veritabanına (PostgreSQL, ClickHouse gibi columnar DB'ler) aktararak SQL sorguları ile analiz edin. (4) Günlük/haftalık özet raporlar oluşturarak ham veriyi özetleyin (bot kategorileri, en çok taranan URL'ler, hata kodları). (5) Eski logları arşiv depolamaya (S3 Glacier) taşıyarak maliyet düşürün. Büyük e-ticaret müşterilerimizde günlük 50 GB log verisini otomatik pipeline ile işleyip 200 MB özet rapora indirgiyoruz."
  - q: "Server log analizi crawl budget optimizasyonuna nasıl katkı sağlar?"
    a: "Crawl budget (tarama bütçesi), arama motorlarının sitenizde günlük tarayabileceği sayfa sayısıdır. Büyük sitelerde (>10.000 sayfa) Googlebot tüm sayfaları taramaz, önceliklendirme yapar. Server loglar Googlebot'un hangi sayfaları ne sıklıkla taradığını gösterir. Search Console 'Tarama İstatistikleri' ile log verilerini çaprazlayarak şunu tespit edersiniz: (1) Hangi sayfa türleri (ör. eski blog yazıları, filtre URL'leri) gereksiz taranıyor? Bunları robots.txt veya noindex ile engelleyerek bütçeyi önemli sayfalara yönlendirirsiniz. (2) Hangi önemli sayfalar (ör. yeni ürünler) yeterince taranmıyor? Internal linking ve XML sitemap güncellemesiyle öncelik artırırsınız. Bir e-ticaret müşterimizde filtre URL'lerini (renk, beden kombinasyonları) robots.txt'e ekleyerek Googlebot bütçesinin %40'ını ana ürün sayfalarına kaydırdık, yeni ürünlerin indekslenme süresi 12 günden 3 güne düştü."
  - q: "Sahte Googlebot'u (fake Googlebot) nasıl tespit ederim?"
    a: "Bazı spam botlar user-agent'lerini 'Googlebot' olarak gösterir, ancak Google IP'lerinden gelmez. Server loglarında user-agent 'Googlebot' olan isteklerin IP adreslerini kontrol edin. Gerçek Googlebot yalnızca Google'a ait IP aralıklarından gelir. Doğrulama yöntemi: (1) Ters DNS sorgusu (reverse DNS lookup) yapın: IP'nin hostname'i *.googlebot.com veya *.google.com ile bitmelidir. (2) Bu hostname'in IP adresini forward DNS lookup ile kontrol edin, orijinal IP ile eşleşmelidir. (3) Google'ın yayınladığı Googlebot IP aralıklarını (JSON formatında mevcut) kontrol edin. Sahte Googlebot tespit ederseniz, o IP'yi firewall seviyesinde engelleyin. Gonet müşterilerinde aylık onlarca sahte Googlebot tespiti yapıyoruz; bunların %80'i içerik çalan scraper'lar, %20'si SEO casusluk botları. Engelleme sonrası sunucu yükü ortalama %15 düşüyor."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın"
  - date: "2026-06-07"
    type: "enhancement"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Kreatif viz eklendi (process, stat-bars)"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## Server log analizi nedir?

Server log analizi, web sunucusunun kaydettiği ham erişim günlüklerinin (access logs) incelenmesidir. Her HTTP isteği — ziyaretçi, bot, crawler — sunucuda bir satır log oluşturur: IP adresi, user-agent, talep edilen URL, HTTP durum kodu, zaman damgası. Google Analytics veya Google Tag Manager (GTM) gibi istemci tarafı (client-side) araçlar JavaScript çalıştıran gerçek kullanıcıları ölçerken, server loglar sunucuya ulaşan *tüm* trafiği gösterir. Bu, botları, API çağrılarını, başarısız istekleri, JavaScript devre dışı ziyaretçileri kapsayan eksiksiz resmi sunar.

Günümüzde AI crawler'ları (GPTBot, Google-Extended, ClaudeBot, Bingbot gibi büyük dil modeli — large language model — botları) içerik toplamak için siteleri tarar. Server log analizi, hangi botun hangi sayfaları ne sıklıkla ziyaret ettiğini, sunucu kaynaklarını nasıl kullandığını, erişim desenlerini gösterir. Bu veri, botları yönetmek, maliyetli taramaları sınırlamak, AEO (Answer Engine Optimization) stratejilerini iyileştirmek için kritiktir.

## Neden kritik?

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">GPTBot</div>
    <div class="l">AI crawler<br>tespit</div>
  </div>
  <div class="stat">
    <div class="n">200+</div>
    <div class="l">Log line/saat<br>yoğunluk</div>
  </div>
  <div class="stat">
    <div class="n">CCBot</div>
    <div class="l">Common Crawl<br>davranış</div>
  </div>
  <div class="stat">
    <div class="n">%47</div>
    <div class="l">Önlenebilir<br>crawl israfı</div>
  </div>
</div>

Google Analytics (GA4) ve GTM istemci tarafı çözümlerdir: tarayıcıda JavaScript çalıştırarak veri toplarlar. Botların çoğu JavaScript çalıştırmaz, dolayısıyla GA4'te görünmez. Server loglar ise her HTTP isteğini kaydeder — spam bot, SEO crawler, AI model eğitim botu, hatta DDoS denemesi olsa bile. Bu eksiksiz görünürlük üç kritik avantaj sağlar:

1. **Bot trafiği ayrımı**: Gerçek kullanıcı analitiğini bozan bot trafiğini tespit edip filtrelersiniz. Sunucu kaynaklarının yüzde kaçının botlara gittiğini bilirsiniz.
2. **AI crawler yönetimi**: GPTBot, Google-Extended gibi LLM botları hangi içeriği tarıyor? Hangi sayfalar sık taranıyor ama GA4'te düşük performanslı? Bu veri, AEO için hangi içeriğin AI modellerce değerli bulunduğunu gösterir. robots.txt veya HTTP header ile belirli botları engelleyebilir, sunucu maliyetini düşürebilirsiniz.
3. **Teknik SEO tespiti**: Googlebot hangi sayfaları taradı, hangi durum kodlarıyla karşılaştı (200, 404, 301)? Tarama bütçesi (crawl budget) nasıl harcanıyor? Server loglar, Search Console verileriyle çaprazlanarak kesin tarama davranışı analizi sunar.

Gonet'te server log analizi, özellikle büyük e-ticaret siteleri ve yüksek bot trafiği alan kurumsal platformlar için standart süreçtir. Bir müşterimizde aylık sunucu trafiğinin %68'inin bot olduğunu, bunun %22'sinin AI crawler'lar olduğunu tespit ettik. Bu botlardan biri (GPTBot) ürün detay sayfalarını yoğun tararken, kategori sayfalarını göz ardı ediyordu. Kategori sayfalarına yapılandırılmış veri (Schema.org Product markup) ekleyerek GPTBot taramasını dengeledik, ChatGPT'nin ürün önerilerinde müşteri görünürlüğü %34 arttı.

## Gonet yaklaşımı

<div class="gonet-process">
  <div class="pt">3 AŞAMALI SERVER LOG ANALİZİ SÜRECİ</div>
  <div class="steps">
    <div class="step is-primary">
      <div class="n">1</div>
      <div class="t">Log Toplama</div>
      <div class="d">Apache/Nginx logları parse, GZIP sıkıştırma, yapılandırılmış veri</div>
    </div>
    <div class="step">
      <div class="n">2</div>
      <div class="t">Bot Sınıflandırma</div>
      <div class="d">User-agent analizi, IP doğrulama, crawler kategorize</div>
    </div>
    <div class="step">
      <div class="n">3</div>
      <div class="t">Davranış Analizi</div>
      <div class="d">URL tarama, durum kodları, GA4 çaprazlama, raporlama</div>
    </div>
  </div>
</div>

Gonet'in server log analizi süreci üç aşamalıdır:

**1. Log toplama ve normalizasyon**: Apache, Nginx, IIS gibi sunuculardan ham logları alırız (Common Log Format veya Combined Log Format). Büyük sitelerde günlük GB'larca veri olabilir. Bu logları GZIP sıkıştırarak depolama maliyetini düşürür, parse ederek (user-agent, IP, URL, timestamp) yapılandırılmış veri haline getiririz. Python (regex + pandas) veya özelleştirilmiş ETL pipeline'lar kullanırız.

**2. Bot sınıflandırma**: User-agent string'leri ve IP adresleriyle botları kategorize ederiz:
- **Arama motoru botları**: Googlebot, Bingbot, Yandex
- **AI crawler'lar**: GPTBot, Google-Extended (Bard/Gemini), ClaudeBot, Meta-ExternalAgent (Meta AI), PerplexityBot
- **SEO araçları**: AhrefsBot, SemrushBot, DotBot
- **Spam/zararlı botlar**: bilinmeyen user-agent, yüksek istek hızı

IP adreslerini ters DNS sorgusu (reverse DNS lookup) ve ASN (Autonomous System Number) veritabanlarıyla doğrularız. Sahte Googlebot tespiti için IP'nin Google IP aralığında olup olmadığını kontrol ederiz.

**3. Davranış analizi ve raporlama**: Her bot kategorisi için:
- Taradığı URL'ler (hangi sayfa türleri?)
- Tarama sıklığı (günlük istek sayısı)
- HTTP durum kodları (404, 5xx hataları)
- Ortalama yanıt süresi (sunucu yükü)
- Veri aktarımı (GB cinsinden bandwidth)

Bu veriyi GTM/GA4 verileriyle çaprazlarız: GA4'te düşük etkileşimli ama yüksek bot taraması alan sayfalar, AEO için potansiyel fırsattır. Raporları müşteriye aylık sunarak bot yönetim önerileri sunarız (robots.txt güncellemesi, rate limiting, sitemap önceliklendirmesi).

Örneğin, bir SaaS müşterisinde ClaudeBot'un documentation (dokümantasyon) sayfalarını günde 2.400 kez taradığını tespit ettik. Bu sayfalar GA4'te düşük trafikli, ancak Claude AI'da sık referans gösteriliyordu. Dokümantasyon sayfalarına JSON-LD BreadcrumbList ve HowTo schema ekleyerek yapısal derinlik artırdık. Claude yanıtlarında müşteri dokümanlarının alıntılanma oranı 3 ay içinde %41 yükseldi.

## Hangi durumlarda kritik avantaj?

<div class="gonet-stat-bars">
  <div class="stat-title">KRİTİK AVANTAJ DURUMLARI</div>
  <div class="gonet-stat-bar is-primary">
    <span class="label">Bot trafiği >%40</span>
    <span class="track"><span class="fill" style="--val:85%"></span></span>
    <span class="value">Yüksek</span>
  </div>
  <div class="gonet-stat-bar">
    <span class="label">AI crawler yönetimi</span>
    <span class="track"><span class="fill" style="--val:80%"></span></span>
    <span class="value">Yüksek</span>
  </div>
  <div class="gonet-stat-bar">
    <span class="label">Crawl budget >10K sayfa</span>
    <span class="track"><span class="fill" style="--val:70%"></span></span>
    <span class="value">Orta-Yüksek</span>
  </div>
  <div class="gonet-stat-bar">
    <span class="label">DDoS/spam tespiti</span>
    <span class="track"><span class="fill" style="--val:75%"></span></span>
    <span class="value">Yüksek</span>
  </div>
</div>

| Durum | Etki |
|-------|------|
| **Yüksek bot trafiği (>%40)** | Sunucu maliyeti artışı, gerçek kullanıcı analitiği kirliliği. Log analizi ile zararlı botları tespit edip engellersiniz, kaynak kullanımını optimize edersiniz. |
| **AI crawler yönetimi** | GPTBot, Claude, Perplexity gibi LLM'ler hangi içeriği tarıyor? Hangi sayfalar AEO için değerli? Loglar bu veriyi verir, stratejik içerik optimizasyonu yaparsınız. |
| **Crawl budget optimizasyonu** | Büyük siteler (>10K sayfa): Googlebot tarama bütçesini boşa harcıyor mu? Loglar hangi sayfaların tarandığını, hangilerinin göz ardı edildiğini gösterir. Sitemap ve internal linking düzenlemesi yaparsınız. |
| **GA4'te görünmeyen trafik** | API endpoint'leri, PDF indirmeleri, RSS feed'leri GA4'te ölçülmez. Server loglar bu trafiği gösterir, tam kullanıcı yolculuğunu anlamanızı sağlar. |
| **DDoS/spam bot saldırıları** | Anormal istek patlamaları, bilinmeyen IP'lerden yüksek 404 istekleri. Loglar saldırı desenlerini tespit eder, IP bloklama veya WAF kuralları oluşturursunuz. |
| **Teknik SEO denetimi** | Googlebot hangi 404 sayfalarını görüyor? Hangi redirect zincirleri var? Search Console ile log verisini çaprazlayarak kesin teknik sorunları bulursunuz. |

## İlgili yetkinlikler

Server log analizi diğer analitik ve teknik SEO yetkinliklerle entegre çalışır:

- **[Google Tag Manager (GTM) kurulumu](/yetkinlikler/analitik-veri/google-tag-manager-kurulumu)**: İstemci tarafı veriyi toplarken, server loglar sunucu tarafı gerçeği gösterir. İkisini çaprazlayarak tam resim elde edersiniz.
- **[Google Analytics 4 (GA4) denetimi](/yetkinlikler/analitik-veri/google-analytics-4-denetimi)**: GA4 bot filtreleme ayarları doğru mu? Log analizi ile GA4 verilerini doğrular, bot trafiği sızıntısını tespit edersiniz.
- **[Teknik SEO denetimi](/yetkinlikler/teknik-seo/teknik-seo-denetimi)**: Tarama hataları, yavaş sayfalar, redirect sorunları log analiziyle kesinleşir.
- **[AEO içerik optimizasyonu](/yetkinlikler/aeo-geo/aeo-icerik-optimizasyonu)**: Hangi sayfalar AI crawler'larca taranıyor? Log verisi AEO stratejisini yönlendirir.

## Gonet ile çalışmak

Gonet, 2000'den beri Türkiye'nin en deneyimli dijital ajanslarından biri olarak server log analizini yalnızca teknik bir görev değil, stratejik bir keşif aracı olarak kullanır. 220+ marka portföyümüzde e-ticaret devlerinden SaaS firmalarına, yayıncılardan kurumsal platformlara kadar geniş yelpazede log analizi deneyimimiz var. Bot davranışını anlayarak sunucu maliyetlerinizi düşürür, AEO stratejinizi veriye dayalı hale getirir, teknik SEO sorunlarını kesin verilerle çözeriz. Server loglarınız bir maliyet kalemi değil, rekabet avantajı kaynağıdır. [İletişime geçin](/iletisim), loglarınızı stratejik bir varlığa dönüştürelim.
