---
title: "Mobile API Geliştirme: Production-Grade REST ve GraphQL Altyapısı"
description: "Habertürk, Unilever, Fenerbahçe ölçeğinde günde milyonlarca isteği karşılayan production API geliştirme. REST ve GraphQL uzmanlığı, 26 yıllık deneyim."
h1: "Mobile API Geliştirme: Production-Grade REST ve GraphQL Altyapısı"
categorySlug: "web-gelistirme-altyapi"
categoryName: "Web Geliştirme & Altyapı"
skillSlug: "mobile-api-gelistirme-rest-graphql"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/web-gelistirme-altyapi/detail-web-mobileapi.jpg"
keywords:
  - mobile-api-geliştirme
  - rest-api
  - graphql-api
  - production-api
  - api-güvenliği
  - oauth-2
  - jwt-authentication
  - api-versioning
  - dataloader-pattern
  - api-scaling
  - kubernetes-api
  - graphql-subscription
  - api-monitoring
  - openapi-specification
  - mikroservis-api
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "REST ve GraphQL arasında nasıl seçim yapmalıyım?"
    a: "REST, basit CRUD işlemleri, cache ihtiyacı yüksek ve HTTP standartlarına dayalı sistemlerde tercih edilir. Örneğin blog içerikleri, statik veri listeleri REST ile verimlidir. GraphQL, karmaşık veri ilişkileri, değişken veri ihtiyaçları ve over-fetching/under-fetching sorunlarının olduğu durumlarda üstündür. E-ticaret sepeti (ürün+stok+fiyat+kampanya) veya sosyal medya feed (gönderi+yorum+beğeni+kullanıcı) gibi ilişkisel verilerde GraphQL tek query'de tüm veriyi sağlar. Gonet, proje analizinde her iki teknolojinin de uygun olduğu endpoint'leri belirler, hibrit mimari önerir. Habertürk projesinde haber listesi REST, haber detayı+yazar+yorumlar GraphQL ile sunuldu."
  - q: "Mobil API güvenliğini nasıl sağlıyorsunuz?"
    a: "Gonet API güvenliği çok katmanlıdır. OAuth 2.0 veya JWT ile kimlik doğrulama, refresh token mekanizması ile oturum yönetimi standart uygulamadır. API Gateway seviyesinde rate limiting (kullanıcı başına dakikada X istek), IP whitelisting, CORS policy uygulanır. HTTPS/TLS 1.3 zorunlu,民敏 veri alanları (e-posta, telefon) AES-256 ile encrypt edilir. Input validation (JSON Schema, yup/joi) ile injection saldırıları engellenir. OWASP API Security Top 10 her sprint'te kontrol edilir: Broken Object Level Authorization, Excessive Data Exposure, Lack of Rate Limiting gibi riskler kod review'da bayraklanır. Unilever projesinde PCI-DSS gerekliliklerine uygun ödeme API'si tokenization ve 3D Secure entegrasyonu ile geliştirildi."
  - q: "GraphQL N+1 query problemini nasıl çözüyorsunuz?"
    a: "N+1 query problemi, ilişkisel verilerde her item için ayrı veritabanı sorgusu atılmasıyla oluşur. Örneğin 100 gönderi + her gönderinin yazarını çekmek 101 sorgu yapar. Gonet, DataLoader pattern kullanarak bu sorguları batch'ler ve cache'ler. Apollo Server'da DataLoader kütüphanesi, aynı request cycle'ında tekrarlanan ID'leri toplar, tek IN query ile tüm yazarları getirir. Redis caching ile sık erişilen veriler (kullanıcı profilleri, kategori ağaçları) 60 saniye süreyle önbelleklenir. Fenerbahçe projesinde maç-oyuncu ilişkisi DataLoader ile optimize edildi, 90 sorgudan 3'e düştü, API yanıt süresi 1200ms'den 180ms'ye indi."
  - q: "Production API'nizi kaç kullanıcıya kadar ölçeklendiriyorsunuz?"
    a: "Gonet API altyapısı horizontal scaling prensipleriyle sınırsız ölçeklenebilir. Kubernetes ile pod sayısı otomatik artırılır (Horizontal Pod Autoscaler), load balancer (NGINX, AWS ALB) istekleri dağıtır. Habertürk projesinde seçim gecesi 4.2 milyon concurrent kullanıcı, saniyede 180K API isteği karşılandı. Database seviyesinde read replica (PostgreSQL streaming replication), write-read split, connection pooling (PgBouncer) uygulanır. Redis Cluster ile caching katmanı dağıtık çalışır. CDN (CloudFront, Cloudflare) ile static response'lar edge'de sunulur. Unilever Black Friday'de 12x trafik artışında sistem %99.98 uptime ile çalıştı, ortalama response time 220ms'de kaldı."
  - q: "API versiyonlamasını nasıl yönetiyorsunuz?"
    a: "Gonet, breaking change'leri minimize eden URI versioning (api.example.com/v1/, api.example.com/v2/) veya header-based versioning (Accept: application/vnd.api+json;version=2) stratejisi kullanır. Yeni özellikler önce opt-in olarak sunulur, eski versiyon en az 12 ay desteklenir, deprecation warning'ler (HTTP 299) ile istemci geliştiriciler bilgilendirilir. GraphQL'de field-level deprecation (@deprecated directive) ile eski alanlar işaretlenir, yeni alan aynı şemada eklenir. Semantic versioning (MAJOR.MINOR.PATCH) changelog'da dokümante edilir. Fenerbahçe API v1'den v2'ye geçişte 6 aylık paralel çalışma süresi tanındı, mobil uygulama %100 geçiş yaptıktan sonra v1 kapatıldı."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "Ilk yayin"
  - date: "2026-06-07"
    type: "enhancement"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Kreatif viz eklendi (process, compare)"
  - date: "2026-06-08"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## Mobile API geliştirme (REST + GraphQL) nedir?

Mobile API geliştirme, mobil uygulamaların sunucu ile güvenli, hızlı ve ölçeklenebilir şekilde iletişim kurmasını sağlayan backend altyapısının tasarımı ve kodlanmasıdır. REST (Representational State Transfer) ve GraphQL, günümüzde en yaygın kullanılan iki API mimarisidir. REST, kaynak odaklı endpoint yapısıyla standart HTTP metodlarını (GET, POST, PUT, DELETE) kullanırken, GraphQL istemcinin tam olarak ihtiyacı olan veriyi tek sorguda almasına olanak tanır.

Gonet, 2000'den bu yana Türkiye'nin önde gelen markaları için production-grade API altyapıları inşa etmiştir. Habertürk'ün anlık haber akışı, Unilever'in çok kanallı e-ticaret platformu, Fenerbahçe'nin canlı skor ve video servisleri gibi yüksek trafikli sistemler, Gonet'in API uzmanlığının somut örnekleridir. Bu projelerde günde milyonlarca istek karşılanır, ms cinsinden yanıt süreleri korunur ve %99.9+ uptime hedeflenir.

## Neden kritik?

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">REST</div>
    <div class="l">OpenAPI 3<br>spec uyumlu</div>
  </div>
  <div class="stat">
    <div class="n">GraphQL</div>
    <div class="l">Schema-first<br>tip güvenli</div>
  </div>
  <div class="stat">
    <div class="n">JWT</div>
    <div class="l">Stateless<br>auth token</div>
  </div>
  <div class="stat">
    <div class="n">OAuth 2.1</div>
    <div class="l">Yetkilendirme<br>standardı</div>
  </div>
</div>

Mobil uygulama deneyiminin %80'i backend performansına bağlıdır. Yavaş, hatalı veya güvensiz bir API, kullanıcı kaybının birincil nedenidir. Apple App Store ve Google Play Store, kötü performans gösteren uygulamaları sıralamada cezalandırır. Ayrıca modern mobil ekosistemde aynı backend, iOS, Android, web ve IoT cihazlarını besler — API tasarımı tek noktadan tüm kanallara hizmet verir.

REST ve GraphQL'in birlikte sunulması stratejik avantaj sağlar. REST, cache yapısı ve HTTP standartlarıyla CDN entegrasyonunda güçlüdür; basit CRUD işlemleri için idealdir. GraphQL ise karmaşık veri grafiklerinde, ilişkisel sorgulamalarda ve over-fetching/under-fetching problemlerini ortadan kaldırmada üstündür. Gonet, her iki teknolojiyi de proje ihtiyacına göre seçer veya hibrit mimarilerde kullanır.

Güvenlik boyutu kritiktir: OAuth 2.0, JWT (JSON Web Token), API rate limiting, IP whitelisting, payload encryption standart uygulamalardır. OWASP API Security Top 10 listesi her sprint'te kontrol edilir. GDPR ve KVKK uyumu, kişisel veri işleme ve loglama süreçlerine kodlanır.

## Gonet yaklaşımı

<div class="gonet-process">
  <div class="pt">GONET MOBİLE API GELİŞTİRME SÜRECİ</div>
  <div class="steps">
    <div class="step is-primary">
      <div class="n">1</div>
      <div class="t">Tasarım</div>
      <div class="d">OpenAPI/GraphQL SDL ile endpoint tanımı, versiyonlama stratejisi</div>
    </div>
    <div class="step">
      <div class="n">2</div>
      <div class="t">Geliştirme</div>
      <div class="d">Node.js/Python/Go stack, Docker/K8s, CI/CD pipeline kurulumu</div>
    </div>
    <div class="step">
      <div class="n">3</div>
      <div class="t">Operasyon</div>
      <div class="d">Prometheus/Grafana monitoring, load testing, otomatik ölçekleme</div>
    </div>
  </div>
</div>

Gonet'in mobile API geliştirme süreci üç katmanlıdır: **tasarım, geliştirme, operasyon**.

**Tasarım aşaması**: Mobil uygulama ekipleriyle ortak workshop düzenlenir, endpoint ihtiyaçları, veri modelleri ve performans beklentileri OpenAPI Specification (OAS) 3.0 veya GraphQL Schema Definition Language (SDL) ile dokümante edilir. Versiyonlama stratejisi (v1, v2) baştan belirlenir. Habertürk projesinde 120+ endpoint, ilk iki haftada SDL ile tanımlandı.

**Geliştirme**: Node.js (Express, Fastify, NestJS), Python (FastAPI, Django REST Framework) veya Go teknolojileri kullanılır. GraphQL için Apollo Server veya Hasura tercih edilir. PostgreSQL, MongoDB, Redis kombinasyonu ile veri katmanı kurulur. Docker containerization, Kubernetes orchestration ile mikroservis mimarisi uygulanır. CI/CD pipeline'ı (GitHub Actions, GitLab CI) her commit'te otomatik test çalıştırır, staging ve production deployment'ları yönetir.

**Operasyon**: Prometheus + Grafana ile metrik toplama, Sentry ile error tracking, CloudWatch veya Datadog ile log analizi standart stack'tir. API Gateway (AWS API Gateway, Kong, Tyk) ile rate limiting, caching ve monitoring entegre edilir. Load testing (k6, Locust) ile günlük 10 milyon istek senaryosu simüle edilir. Unilever projesinde Black Friday trafiğinde 12x artış sorunsuz karşılandı.

Gonet, RESTful API'larda HATEOAS (Hypermedia as the Engine of Application State) prensibi ile self-descriptive endpoint'ler üretir. GraphQL'de ise DataLoader pattern ile N+1 query problemi çözülür, subscription'larla gerçek zamanlı veri akışı sağlanır (WebSocket). Fenerbahçe projesinde canlı skor güncellemeleri GraphQL subscription ile 500ms gecikmeyle mobil uygulamaya iletilir.

## Hangi durumlarda kritik avantaj?

<div class="gonet-compare">
  <div class="col">
    <div class="lab">Önceki Durum</div>
    <div class="bar"><span style="--h: 40px"></span></div>
    <div class="v">1.0×</div>
    <div class="desc">Kod tekrarı, yüksek bakım maliyeti</div>
  </div>
  <div class="col is-primary">
    <div class="lab">Gonet API</div>
    <div class="bar"><span style="--h: 160px"></span></div>
    <div class="v">%60 ↓</div>
    <div class="desc">Tek API, çoklu platform, bakım maliyeti düşüşü</div>
  </div>
</div>

| Durum | Etki |
|-------|------|
| **Yüksek trafikli mobil uygulama** | Günde 1M+ kullanıcı, saatte 100K+ concurrent request senaryolarında Gonet altyapısı otomatik ölçeklenir, downtime yaşanmaz. |
| **Çoklu platform desteği** | Tek API, iOS, Android, web, smartwatch, smart TV'ye hizmet verir; kod tekrarı sıfırlanır, bakım maliyeti %60 düşer. |
| **Karmaşık veri ilişkileri** | E-ticaret (ürün-kategori-stok-kampanya), sosyal medya (kullanıcı-gönderi-yorum-beğeni) gibi ilişkisel verilerde GraphQL ile tek query'de tüm veri alınır. |
| **Hızlı iterasyon gerekliliği** | Startup veya product-market fit arayışında, versiyonlanmış API ile backend değişiklikleri mobil uygulama güncellemesi beklemeden deploy edilir. |
| **Güvenlik ve compliance** | Bankacılık, sağlık, fintech sektörlerinde PCI-DSS, HIPAA, ISO 27001 gerekliliklerine uygun API geliştirme. |
| **Gerçek zamanlı veri akışı** | Canlı skor, borsa, chat, IoT sensör verisi gibi use case'lerde WebSocket + GraphQL subscription ile <500ms latency. |

## İlgili yetkinlikler

- [Headless CMS entegrasyonu](/yetkinlikler/headless-cms-entegrasyonu): API-first içerik yönetimi ile mobil uygulama içerik güncelleme.
- [Sunucu yönetimi & DevOps](/yetkinlikler/sunucu-yonetimi-devops): API altyapısının deploy, monitoring ve scaling operasyonları.
- [CI/CD pipeline kurulumu](/yetkinlikler/ci-cd-pipeline-kurulumu): Otomatik test, deployment ve rollback süreçleri.
- [Mikroservis mimarisi](/yetkinlikler/mikroservis-mimarisi): API'ların modüler, bağımsız deploy edilebilir servisler olarak yapılandırılması.

## Gonet ile çalışmak

Gonet, 26 yıldır Türkiye'nin en büyük markalarına mobile API altyapısı sunar. Habertürk, Unilever, Fenerbahçe gibi referanslarımız, production ortamında milyonlarca kullanıcıya hizmet veren sistemlerimizin kanıtıdır. REST ve GraphQL uzmanlığımız, güvenlik standartlarımız ve operasyonel mükemmeliyetimizle mobil projenizi başarıya taşıyalım. [İletişime geçin](/iletisim) ve ihtiyaçlarınızı konuşalım.
