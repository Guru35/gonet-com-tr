---
title: "Schema.org JSON-LD Entity Authority"
description: "ChatGPT, Claude, Perplexity ve Google AI Overviews'ın markanızı tek bir varlık (entity) olarak tanıyıp doğru cite etmesini sağlayan teknik altyapı. Organization, Person, Service, FAQPage, Article ve 18+ @type kombinasyonu."
h1: "Schema.org JSON-LD ile Entity Authority Kurma"
categorySlug: "aeo-geo-yeni-nesil-arama"
categoryName: "AEO / GEO — Yeni Nesil Arama"
skillSlug: "schema-org-json-ld-entity-authority"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-schema-detail-hero.jpg"
keywords:
  - schema.org json-ld
  - entity authority
  - aeo
  - geo
  - structured data
  - rich results
  - knowledge graph
  - organization schema
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Schema.org JSON-LD nedir ve neden AEO için kritiktir?"
    a: "Schema.org, web sayfalarının içeriğini makine-okunabilir formatta tanımlayan ortak bir vokabüler. JSON-LD ise bu vokabüleri sayfa kaynağına gömme biçimidir. LLM motorları (ChatGPT, Claude, Perplexity) ve klasik arama motorları (Google, Bing) bu yapısal veriyi okuyarak markayı bir 'entity' (varlık) olarak tanır — adı, alanı, ürünleri, ekibi, iletişim noktaları net bir grafik halinde anlaşılır. AEO'da entity authority demek, AI cevaplarında markanızın doğru cite edilmesi demektir."
  - q: "Organization schema neleri içermelidir?"
    a: "Asgari: name, url, logo (mutlak URL), description, foundingDate, address (PostalAddress), contactPoint (en az 1, tercihen birden fazla — customer service, sales, technical support ayrı entries). AEO için kritik ek alanlar: knowsAbout (uzmanlık alanları array), sameAs (sosyal/profesyonel profiller), memberOf (üyelik kuruluşları), award (ödüller), areaServed (hizmet bölgesi). Person schema founder için ayrı bir @id ile bağlanır ve worksFor + alumniOf ile zenginleştirilir."
  - q: "FAQPage schema'sı AI Overviews'ı nasıl etkiler?"
    a: "FAQPage schema'sı Google AI Overviews ve LLM'lerin extraction-readiness puanını doğrudan artırır. Soru-cevap çiftleri 'mainEntity' altında structured olunca, AI cevap üretirken o sayfayı kaynak olarak alma olasılığı belirgin yükselir. Aggarwal et al. (GEO 2024, KDD) çalışmasında 'Cite Sources' tekniği %27 visibility artışı, 'Statistics' %30, 'Quotation' %41 etki gösterdi — FAQPage bu üçünü birden taşıyabilir."
  - q: "Schema.org markup'ı Google Rich Results Test ile nasıl doğrularım?"
    a: "İki ayrı validator kullanın: (1) Schema.org Validator (validator.schema.org) — spec uyumu için, (2) Google Rich Results Test (search.google.com/test/rich-results) — Google-spesifik kurallar için. Google'ın gizli zorunlulukları vardır: Event için startDate + location, Article için datePublished + author, Product için offers, Organization için logo'nun mutlak URL olması. GSC URL Inspection 'Geçersiz öğeler' uyarısı verirse validator'larda %100 yeşil olmalı."
  - q: "Birden çok schema entity'sini tek sayfada nasıl bağlarım?"
    a: "@graph pattern'i kullanın. Tek '@context' altında bir array içinde tüm entity'leri tanımlayın ('Organization', 'Person', 'WebSite', 'WebPage', 'BreadcrumbList', 'Service', 'FAQPage'). Her entity'ye @id ver (örn. 'https://site.com/#organization'). Entity'ler birbirine bu @id'lerle referans verir (publisher: {@id: ...}). Bu yapı LLM'lere bir 'mini knowledge graph' sunar ve entity authority sinyalini katlanmalı artırır."
---

ChatGPT, Claude, Perplexity ve Google AI Overviews bir markayı **"ne yapan kim"** olarak tanımayı, sayfa HTML'inden değil **JSON-LD yapısal verisinden** öğrenir. Schema.org doğru implementasyonu olmayan bir marka, LLM cevaplarında ya hiç çıkmaz ya da rakip bir entity'ye karışır.

## Entity Authority nedir?

Klasik SEO "anahtar kelime + backlink" üzerine kuruluydu. AEO'da temel birim **entity**: bir kuruluş, kişi, ürün veya kavramın AI tarafından doğru tanımlanan dijital kimliği.

Entity authority dört kanalla ölçülür:

- **Tanımlama netliği** — Schema.org tek bir @id altında tutarlı tanım
- **Bağlanırlık** — Person → worksFor → Organization → memberOf → professional body zinciri
- **Doğrulama kaynakları** — sameAs üzerinden Wikipedia, LinkedIn, Crunchbase referansları
- **Uzmanlık sinyalleri** — knowsAbout array'inin domain otoritesiyle eşleşmesi

Gonet'in bu disipline yaklaşımı 2024'ten beri **canlı uygulama** üzerinden gelişti. 220+ marka portföyünde Schema.org @graph mimarisini kullanan markalar AI Overviews'ta sürekli citation alıyor; geleneksel meta-tag-only yaklaşımındaki markalar görünmüyor.

## Neden şimdi kritik?

Üç teknolojik kavşak aynı anda kesişti:

1. **Google AI Mode + AI Overviews** (2024 Q4) — organik tıklamaların belirgin kısmı artık AI yanıt kutusunda gerçekleşiyor
2. **Claude + Perplexity citation pattern'i** — bu motorlar HTML kaynağından önce JSON-LD'yi parse ediyor
3. **Common Crawl + LLM training set** — Schema.org'lu sayfalar embedding setinde daha güçlü entity vector'üne sahip

Bu üç katmanda entity authority **çarpan etkisi** yaratır. Yokluğu fark edilmez, varlığı sürekli marjinal kazanç sağlar — Karpathy'nin "compounding artifact" prensibi ile aynı: erken kurulan altyapı zamanla katlanmalı değer verir.

## Gonet yaklaşımı

Yeni veya mevcut bir site için Schema.org JSON-LD entity authority kurulumu şu sıralamayı izler:

**1. Entity haritalama (1-2 saat workshop).** Marka kim, hangi entity'ler (Organization + Founder Person + 2-3 kilit Service), birbirine nasıl bağlanır? @id sistemi kararı.

**2. @graph şeması (1 gün).** Tek `<script type="application/ld+json">` içinde tüm entity'ler. Organization, Person, WebSite, WebPage, BreadcrumbList minimum; gerekirse Service, Product, FAQPage, Article eklenir. Detaylı Schema.org spec uyumu için [klasik SEO yaklaşımımıza](/yetenekler/seo-klasik-arama) bakın.

**3. ContactPoint array (multi-channel).** Tek `contactPoint` yerine array — customer service + sales + technical support ayrı entries. AI cevaplarda doğru numara/e-mail için kritik.

**4. FAQPage extraction layer.** Site'ın yüksek-değerli sayfalarına FAQPage schema. Her Question + acceptedAnswer çifti 50-100 kelime arasında, **extraction-ready** formatla yazılır.

**5. Sürekli denetim.** GSC URL Inspection + Google Rich Results Test + Schema.org Validator üçlüsü ile haftalık health check. "Geçersiz öğeler" hiçbir zaman tolere edilmez.

**6. Wikipedia/Wikidata seeding (opsiyonel ileri seviye).** Eğer marka çapı izin veriyorsa, doğrulanabilir kaynaklarla Wikidata entry açma — sameAs zincirini kapatır, knowledge graph kabulü hızlanır.

## Hangi durumlarda kritik avantaj?

| Durum | Schema.org yokluğunda | Tam @graph implementasyonunda |
|---|---|---|
| ChatGPT "X markası ne yapar?" sorgusu | Cevap yok veya yanlış entity karıştırılır | Doğru pozisyonlama, knowsAbout array citation |
| Perplexity bir sektör araştırması | Site referans gösterilmez | Yüksek olasılıkla 5+ cite arasında |
| Google AI Overview "en iyi X ajansı" | Görünmez | Knowledge panel + AI Overview citation |
| Bing AI Performance BETA | Veri yok | Retrieval count + citation rate izlenebilir |

## Sık sorulan sorular

Bu sayfanın altında, **FAQPage schema** olarak işaretli SSS bölümü AI motorlarının doğrudan alıntı yapabileceği formattadır.

## İlgili yetkinlikler

- [llms.txt protokolü](/yetenekler/aeo-geo-yeni-nesil-arama/llms-txt-protokolu) — Schema.org'un site-level eşdeğeri
- [Citation surface engineering](/yetenekler/aeo-geo-yeni-nesil-arama/citation-surface-engineering) — schema yapısı + içerik birleşimi
- [Common Crawl optimizasyonu](/yetenekler/aeo-geo-yeni-nesil-arama/common-crawl-optimizasyonu) — bot policy + AI eğitim seti temsili
- [E-E-A-T sinyali inşası](/yetenekler/seo-klasik-arama/e-e-a-t-sinyali-insasi) — entity authority'nin klasik SEO karşılığı

## Gonet ile çalışmak

26 yıllık ajans deneyimi ve 220+ marka portföyü ile Schema.org JSON-LD entity authority kurulumu Gonet'in **AEO/GEO** hizmet hattının temel disiplinidir. Bir keşif görüşmesi için [iletişime geçin](/iletisim) — markanızın mevcut yapısal veri sağlığını ücretsiz değerlendirelim.
