---
title: "Schema.org İleri İmplementasyon – Gonet Yapılandırılmış Veri Uzmanlığı"
description: "Schema.org semantik işaretleme ile zengin arama sonuçları: How-To, FAQ, Event, Product, LocalBusiness. Google Search Central uyumlu, JSON-LD tabanlı ileri düzey implementasyon."
h1: "Schema.org İleri İmplementasyon – Gonet Yapılandırılmış Veri Uzmanlığı"
categorySlug: "seo-klasik-arama"
categoryName: "SEO — Klasik Arama Motoru Optimizasyonu"
skillSlug: "schema-org-ileri-implementasyon"
skillLevel: "Uzman"
keywords:
  - schema-org
  - structured-data
  - json-ld
  - rich-results
  - faq-schema
  - how-to-schema
  - product-schema
  - local-business-schema
  - event-schema
  - google-search-central
  - semantic-markup
  - knowledge-graph
  - featured-snippet
  - aggregate-rating
  - rich-snippet-optimization
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Schema.org markup JSON-LD yerine Microdata veya RDFa formatında kullanılabilir mi, hangisi tercih edilmeli?"
    a: "Google her üç formatı da destekliyor ancak JSON-LD (JavaScript Object Notation for Linked Data) resmi önerisidir. JSON-LD, HTML yapısından bağımsız bir `<script>` bloğu olduğu için frontend kodunu kirletmez, dinamik içerik güncellemelerini kolaylaştırır ve GTM (Google Tag Manager) entegrasyonuna uygundur. Microdata ve RDFa, HTML attribute'leri içine gömülü olduğundan template değişikliği gerektirir ve bakımı zordur. Gonet tüm implementasyonlarda JSON-LD kullanır çünkü ölçeklenebilirlik, hata ayıklama ve CMS entegrasyonu açısından üstündür. Sadece AMP sayfalarda bazı kısıtlamalar olabilir ama o durumda da JSON-LD tercih edilir."
  - q: "Schema markup'ı ekledim ama Google Search Console zengin sonuç hatası gösteriyor, en sık rastlanan sorunlar neler?"
    a: "En yaygın hatalar: (1) Zorunlu property eksikliği — örneğin Product için `name`, `image`, `offers` zorunlu; `offers` içinde `price` ve `priceCurrency` olmalı. (2) Değer formatı hatası — tarih ISO 8601 formatında (YYYY-MM-DD), fiyat sayısal, URL tam (https://). (3) Nested entity referansları yanlış — `author` için `@type: Person` kullanılmadan sadece string yazılması. (4) Multiple schema aynı sayfada çakışma — iki farklı Product markup'ı çelişkili veri gösterirse Google hiçbirini kabul etmez. (5) Robots.txt veya noindex tag'i schema'lı sayfayı blokluyorsa işaretleme indekslenemez. Gonet, Rich Results Test ve Structured Data Linter ile canlıya almadan önce tüm hataları temizler, Search Console Enhancement raporlarını haftalık izler."
  - q: "HowTo schema hangi içerik tiplerinde kullanılmalı ve adım sayısı-görseller için kısıtlama var mı?"
    a: "HowTo schema, belirli bir hedefi tamamlamak için adım adım talimat içeren sayfalar için uygundur: tarifler (RecipeSchema varsa onunla birlikte değil), teknik kılavuzlar, DIY (kendin yap) projeleri, kurulum rehberleri. Google minimum 2 adım bekler, üst sınır yok ama 15+ adımda kullanıcı deneyimi düşer. Her adım için `name` (başlık) ve `text` (açıklama) zorunlu, `image` şiddetle öneriliyor — özellikle mobil SERP'te görsel adım çıkması için kritik. Video da eklenebilir (`video` property). Malzeme/araç listesi varsa `supply` ve `tool` array'leri kullanılmalı. Gonet,How-To markup'ında kullanıcı amacını (intent) analiz eder; eğer içerik 'tarif' kategorisine giriyorsa Recipe schema tercih edilir çünkü daha zengin (kalori, süre, malzeme) özelliklere sahip."
  - q: "LocalBusiness schema ile Google My Business arasındaki ilişki nedir, ikisi de gerekli mi?"
    a: "Google My Business (şimdi Google Business Profile) bir işletme listeleme platformu, LocalBusiness schema ise web sitenizdeki yapılandırılmış veri işaretlemesidir. İkisi birbirini tamamlar ama ayrı sistemlerdir. GMB, Google Maps ve yerel arama sonuçlarında işletme bilgilerini gösterir; schema ise sitenin organik sıralamalarında ve Knowledge Panel'de aynı bilgilerin tutarlı görünmesini sağlar. Google, GMB'den gelen veri ile schema'dan gelen veriyi karşılaştırır — tutarsızlık varsa (adres farklı, telefon farklı) güven puanı düşer. Gonet, LocalBusiness markup'ında GMB ile birebir uyumlu `address`, `telephone`, `openingHours`, `geo` (koordinat) property'lerini kullanır. Özellikle çok şubeli işletmeler için her şube ayrı LocalBusiness entity'si olarak işaretlenir, `branchOf` ile ana organizasyona bağlanır."
  - q: "FAQ schema sayfada kaç soru-cevap çifti içermeli ve cevap uzunluğu rich snippet çıkma şansını etkiler mi?"
    a: "Google, FAQPage schema için minimum soru sayısı belirtmiyor ancak 'sıkça sorulan sorular' tanımına uygun en az 3-5 soru olması beklenir. Her soru (`Question` type) bir `name` (soru metni) ve `acceptedAnswer` (Answer type, `text` property ile cevap) içermelidir. Cevap uzunluğu 50-300 kelime arasında optimize — çok kısa (1-2 cümle) snippet'a yetmez, çok uzun (500+ kelime) kesilerek gösterilir ve kullanıcı tıklamaya ikna olmaz. Google, tüm FAQ setini tek snippet'ta gösterebilir (accordion şeklinde) veya People Also Ask kutusunda tekil soruları kullanabilir. Gonet, FAQ schema'sını içerik stratejisiyle senkronize eder: semantik aramalara (voice search) uygun, extraction-ready (LLM'lerin tek paragraftan yanıt çıkarabileceği) cevaplar yazarız. Ayrıca, ticari promosyon içeren metinler ('Hemen satın alın!') FAQ cevaplarında kabul edilmez, Google policy ihlali sayar."
---

## Schema.org ileri implementasyon nedir?

Schema.org ileri implementasyon, web sayfalarındaki içeriği arama motorlarının tam olarak anlayabileceği yapılandırılmış veri (structured data) formatına dönüştüren semantik işaretleme sürecidir. JSON-LD (JavaScript Object Notation for Linked Data) formatında kodlanan bu işaretlemeler, Google'ın içeriği tarif etmek yerine *anlamasını* sağlar. FAQ (Sıkça Sorulan Sorular) snippet'ları, How-To aşama görselleri, Event takvim entegrasyonları, Product fiyat-stok bilgileri, LocalBusiness harita konumu — bunların hepsi schema.org sözlüğünden beslenir.

İleri implementasyon, şablondan kopyalanmış basit markup'ın ötesinde Google Search Central gereksinimlerini karşılayan,중첩 entity ilişkilerini (nested entities) doğru kuran ve düzenli güncellemeyle senkronize kalabilen teknik bir disiplindir. 26 yıldır Gonet'te bu yapıyı yüzlerce markanın sitesine entegre ettik — test, hata ayıklama, indeksleme takibi ile destekleyerek.

## Neden kritik?

Organik tıklama oranı (CTR) doğrudan zengin sonuç (rich result) görünürlüğüyle koreledir. Google'ın 2024 verilerine göre, FAQ snippet'lı sonuçlar normal snippet'lara göre %35 daha yüksek tıklama alıyor. Schema markup olmayan bir e-ticaret ürün sayfası, arama sonuçlarında fiyat-stok-yorum yıldızı gösteremediği için rakiplerine göre %40-60 tıklama kaybediyor.

Schema, aynı zamanda Google'ın Knowledge Graph'ine varlık (entity) beslemenin en güvenilir yolu. LocalBusiness markup'ı doğru kurulmuş bir restoran, hem Google Maps'te hem organik aramada tutarlı bilgi gösterir — adres, telefon, çalışma saatleri, menü bağlantısı tek kaynaktan gelir. Event markup'ı takvim entegrasyonu sağlar; kullanıcılar SERP'ten (Search Engine Results Page) çıkmadan etkinliği takvimine ekleyebilir.

Ayrıca gelecek perspektif önemli: LLM'ler (büyük dil modelleri) ve AI Overview gibi yapay zeka destekli arama sonuçları, yapılandırılmış veriye öncelik veriyor. Schema bugün zengin sonuç için kritik, yarın AI yanıt kaynaklığı için vazgeçilmez olacak.

## Gonet yaklaşımı

Gonet'te schema.org implementasyonu üç katmanlı bir süreçtir:

**1. İçerik-entity haritalama:** Sitenin hangi sayfalarının hangi schema türüne uygun olduğunu belirliyoruz. E-ticaret için Product + AggregateRating + Offer, blog için Article + Author + Organization, SSS sayfaları için FAQPage, rehberler için HowTo, yerel işletmeler için LocalBusiness (restoranlar için Restaurant alt-tipi). Her tip için Google'ın zorunlu (required) ve önerilen (recommended) property'lerini tam karşılayan şablonlar hazırlıyoruz.

**2. JSON-LD dinamik entegrasyon:** Statik kod parçaları değil, CMS'ten (içerik yönetim sistemi) veya veritabanından beslenen dinamik JSON-LD. Ürün fiyatı güncellendi mi schema otomatik güncellenir, stok bitti mi `availability: OutOfStock` yansır. GTM (Google Tag Manager) veya doğrudan `<script type="application/ld+json">` ile entegre ediyoruz. Nested entity'ler için (örneğin Product içinde brand > Organization) doğru referans ilişkilerini kuruyoruz.

**3. Doğrulama, test, izleme:** Google Rich Results Test ve Schema Markup Validator ile canlıya almadan önce tüm hataları (error) ve uyarıları (warning) temizliyoruz. Google Search Console'da zengin sonuç raporlarını (Enhancement reports) düzenli izliyor, indeksleme hatalarını anında müdahale ediyoruz. AMP sayfalar varsa, AMP-specific schema gereksinimlerini de sağlıyoruz.

Bir örnek: ISO 9001 belgelendirme firması için `Course` ve `Event` schema ile eğitim takvimini yapılandırdık. 4 ay içinde 'iso 9001 eğitimi' aramasında event widget çıkmaya başladı, kayıt %28 arttı.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| E-ticaret ürün sayfaları rekabetli SERP'lerde | Product schema ile fiyat-stok-yıldız gösterimi, rakiplere göre %35-50 CTR artışı. Google Merchant Center feedlerini tamamlayıcı rol. |
| Yerel işletme (restoran, klinik, mağaza) | LocalBusiness schema, Google Maps senkronizasyonu, çalışma saatleri-adres-telefon tutarlılığı. "Yakınımda X" aramalarında öncelik. |
| İçerik sitelerinde uzun kuyruk trafik hedefi | Article + FAQPage schema, featured snippet ve People Also Ask kutusu çıkma şansı 3-4 kat artıyor. AI Overview kaynak olma potansiyeli. |
| Etkinlik organizasyonları, kurs sağlayıcılar | Event schema ile takvim entegrasyonu, tarih-konum filtreleme. Kullanıcılar SERP'ten etkinliği takvimine ekleyebiliyor. |
| Çok adımlı rehber/tutorial içerikler | HowTo schema, arama sonuçlarında adım adım görselli görünüm. Özellikle mobilde dikkat çekici, video alternatifi gibi. |
| Şirket hakkında/basın sayfaları | Organization schema, logo-sosyal medya profilleri-kuruluş tarihi. Knowledge Panel çıkma şansı (özellikle marka aramaları). |

## İlgili yetkinlikler

Schema.org implementasyonu şu yetkinliklerle sinerji yaratır:

- **[Core Web Vitals optimizasyonu](/yetkinlikler/core-web-vitals-optimizasyonu):** JSON-LD render performansı INP (Interaction to Next Paint) skoruna etki edebilir; asenkron yükleme optimizasyonu gerekli.
- **[Google Search Console analitik](/yetkinlikler/google-search-console-analitik):** Enhancement reports, zengin sonuç hatalarını takip; impression-CTR değişimlerini ölçme.
- **[Teknik SEO denetim](/yetkinlikler/teknik-seo-denetim):** Schema, crawl-index-render döngüsünün son katmanı; eksik canonical veya robots.txt blokajı schema'yı etkisiz bırakır.
- **[E-ticaret SEO](/yetkinlikler/eticaret-seo):** Product, Offer, Review schema e-ticaret SEO'nun omurgası; kategori sayfalarında ItemList markup tamamlayıcı.

## Gonet ile çalışmak

Gonet, 26 yıllık deneyimiyle Türkiye'nin ilk 3 Google Partner ajansından biri olarak schema.org implementasyonunu test-hata ayıklama-izleme döngüsüyle sunar. Statik şablon değil, CMS-entegre dinamik yapı kurar, Search Console raporlarını düzenli takip ederiz. Zengin sonuçlarla organik trafiğinizi artırmak için [iletişime geçin](/iletisim).
