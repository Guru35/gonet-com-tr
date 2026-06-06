---
title: "Google Shopping + Merchant Center Optimizasyonu: Feed & Veri Kalitesi"
description: "Merchant Center feed optimizasyonu, GTIN yönetimi ve custom label stratejileri ile e-ticaret kampanyalarınızı performans odaklı yapılandırıyoruz."
h1: "Google Shopping + Merchant Center Optimizasyonu: Feed & Veri Kalitesi"
categorySlug: "google-ads-sem"
categoryName: "Google Ads & SEM"
skillSlug: "google-shopping-merchant-center"
skillLevel: "İleri"
keywords:
  - google-shopping
  - merchant-center
  - feed-optimizasyonu
  - gtin
  - custom-label
  - shopping-kampanyasi
  - urun-feed
  - merchant-center-feed
  - product-feed
  - e-ticaret-reklamlari
  - shopping-ads
  - feed-yonetimi
  - gtin-yonetimi
  - urun-veri-optimizasyonu
  - google-shopping-feed
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "GTIN olmayan ürünler için Google Shopping kampanyası açılabilir mi?"
    a: "Evet, ancak sınırlı kategorilerde ve brand (marka) + MPN (üretici parça numarası) kombinasyonu zorunludur. Google, giyim ve özel yapım (custom-made) ürünlerde GTIN muafiyeti tanır. Diğer kategorilerde GTIN eksikliği ürünü reddeder. Gonet, tedarikçi GTIN eşleştirme araçları ve alternatif tanımlayıcı stratejileri kullanarak %95+ onay oranı sağlar. GTIN olmayan ürünlerin görünürlüğü düşüktür; mümkün olduğunca GTIN sağlamak performans için kritiktir."
  - q: "Custom label sayısı kampanya performansını nasıl etkiler?"
    a: "Custom label, kampanya segmentasyonu ve teklif stratejisi esnekliği sağlar. Örneğin yüksek marjlı ürünleri ayrı bir kampanyaya alıp hedef ROAS'ı 300% yapabilirken, düşük marjlı ürünler için 150% hedef belirleyebilirsiniz. Label olmadan tüm ürünler tek havuzda yarışır, karlı ürünler bütçe alamaz. Gonet projelerinde 5 custom label kullanımı, label olmayan kontrole göre ortalama %55 ROAS artışı sağlamıştır. Ancak aşırı segmentasyon (20+ kampanya) öğrenme süresini uzatır; 8-12 segment optimum denge noktasıdır."
  - q: "Feed güncelleme sıklığı neden önemli?"
    a: "Google Merchant Center, feed'i günde bir kez otomatik çeker (fetch interval). Ancak fiyat ve stok değişiklikleri için Content API ile anlık güncelleme mümkündür. Gonet, günde 4 kez feed güncelleme + kritik alanlarda (stok=0, fiyat >%10 değişim) anlık API push yapılandırması kullanır. Bu sayede tükenen ürün 4 saat içinde kampanyadan çıkar, boş tıklama maliyeti oluşmaz. Manuel güncellemeli sistemlerde 24-48 saat gecikme, stoksuz ürünlere günlük bütçenin %8-15'inin harcanmasına neden olabilir."
  - q: "Merchant Center red nedenlerini nasıl hızlı çözümlüyorsunuz?"
    a: "Gonet, Google Merchant Center API'sini günlük çalışan bir script (betik) ile izler. Script, 'disapproved' (reddedilmiş) veya 'expiring' (süresi dolmakta) durumundaki ürünleri tespit edip red nedenini (GTIN eksik, politika ihlali, landing page mismatch vb.) kategorize eder ve otomatik ticket oluşturur. Müşteri tarafında düzeltme yapılınca feed'e yansıtılır ve re-crawl (yeniden taranma) tetiklenir. Ortalama çözüm süresi 6-12 saat; manuel takipte bu 3-5 gün sürebilir. Red oranını %1'in altında tutarak kampanya gösterim kaybını minimize ediyoruz."
  - q: "Google Shopping için başlık optimizasyonu nasıl yapılmalı?"
    a: "Google Shopping başlığı, arama terimini karşılamak ve tıklama almak için optimize edilmelidir. Gonet formülü: [Marka] [Temel Özellik] [Alt Kategori] [Varyant]. İlk 70 karakter mobilde görünür; bu bölüme en önemli anahtar kelimeler yerleştirilir. Örnek: 'Adidas Ultraboost 22 Erkek Koşu Ayakkabısı Mavi 43'. 'Koşu ayakkabısı' terimi kullanıcı niyetini, 'mavi 43' varyantı filtrelemeyi karşılar. Gereksiz kelimeler ('en iyi', 'kaliteli') kaldırılır. A/B testlerde bu yapı, genel e-ticaret başlıklarına göre %30 daha yüksek CTR (tıklama oranı) göstermiştir."
---

## Google Shopping + Merchant Center nedir?

Google Shopping, ürün aramalarında görselli reklam formatı sunan Google Ads kampanya tipidir. Merchant Center ise ürün feed'inin (veri akışının) barındırıldığı, Google'a iletildiği ve kalite kontrolünün yapıldığı merkezi platformdur. Feed (ürün beslemesi), her bir ürünün başlık, açıklama, fiyat, stok, görsel, GTIN (Global Trade Item Number) gibi özelliklerini içeren yapılandırılmış veri dosyasıdır. Custom label (özel etiket) ise marka, marj, satış hızı gibi kendi belirlediğiniz kriterleri feed'e ekleyerek teklif stratejilerini segmentlere göre ayırmanızı sağlar.

Bir Shopping kampanyasının performansı doğrudan feed kalitesiyle orantılıdır. Eksik GTIN, belirsiz başlıklar, hatalı kategorizasyon kampanyayı gösterim alamama, düşük Kalite Skoru ve yüksek maliyete iter. Gonet, 2008'den beri e-ticaret markalarıyla çalıştığı için feed mühendisliğini deneyimle öğrenmiştir: hangi başlık deseninin tıklama aldığı, hangi custom label yapısının ROAS'ı (Return on Ad Spend) artırdığı, hangi product type (ürün tipi) hiyerarşisinin Google algoritmasını beslediği 15+ yıllık vaka çalışmalarında test edilmiştir.

## Neden kritik?

1. **Doğru kitle eşleşmesi**: Feed başlığı ve açıklaması, kullanıcının arama terimini karşılamazsa reklam gösterilmez. Google, feed içeriğini metin reklamlardan farklı bir algoritmaya tabi tutar; feed optimizasyonu olmadan kampanya 'yayında' olsa da sıfır gösterim alabilir.
2. **Kalite Skoru & Teklif Avantajı**: Tam GTIN, yüksek çözünürlüklü görsel, tutarlı marka bilgisi feed kalite skorunu yükseltir; bu da daha düşük tıklama başı maliyet (CPC) ve üst sıralama anlamına gelir.
3. **Segmentasyon & Bütçe Kontrolü**: Custom label ile yüksek marjlı ürünlere agresif teklif, düşük marjlı ürünlere koruyucu teklif ayırabilirsiniz. Bu olmadan tüm ürünler tek bir hedef ROAS'a tabi kalır, karlı ürünler yeterli payı alamaz.
4. **Merchant Center redleri**: GTIN eksikliği, politika ihlali (yanlış yaş sınırı, alkol kategorisi vb.), landing page (varış sayfası) uyumsuzluğu gibi hatalar ürünleri otomatik reddeder. Gonet sürekli feed izleme ve otomatik düzeltme süreçleri kurar, red oranını %1'in altında tutar.
5. **Çok kanallı kullanım**: Aynı feed, Google Free Listings, YouTube Shopping, Display remarketing kampanyalarında paylaşılır. Bir kez optimize edilmiş feed, tüm ekosistemi besler.

## Gonet yaklaşımı

Gonet, feed optimizasyonunu üç katmanda yürütür:

**1. Teknik Altyapı & Veri Kalitesi**  
- GTIN zorunluluğu: EAN, UPC, ISBN gibi standart tanımlayıcılar feed'de eksiksiz yer alır. Tedarikçi GTIN vermeyen ürünler için brand + MPN (Manufacturer Part Number) kombinasyonunu kullanırız.
- Otomatik feed güncellemesi: Stok, fiyat, promosyon değişikliklerini günde 4 kez çekerek Merchant Center'a iletiyoruz (Google'ın manuel güncelleme limiti 30 günlük süreçleri 7.5 güne düşürüyor).
- Hata yönetimi: Google Merchant Center API'si (Application Programming Interface) üzerinden günlük red/uyarı raporlarını çeker, otomatik ticket açarak müşteri tarafında düzeltmeyi tetikleriz.

**2. İçerik Optimizasyonu**  
- **Başlık formülü**: [Marka] + [Temel Özellik] + [Alt Kategori] + [Renk/Beden] formatını kullanıyoruz (örn. 'Nike Air Zoom Pegasus 40 Erkek Koşu Ayakkabısı Siyah 42'). İlk 70 karakter mobil gösterimde görünür, bu bölüme anahtar terimleri yerleştiriyoruz.
- **Açıklama zenginleştirme**: Standart e-ticaret açıklamalarını, kullanıcı niyet terimleriyle (örn. 'outdoor', 'su geçirmez', 'hafif') destekliyoruz. 500-1000 karakter hedefi.
- **Product Type vs Google Kategori**: Google'ın taxonomy'sine (kategori ağacı) uygun `google_product_category` alanını doldururken, kendi segmentasyon hiyerarşinizi `product_type` alanında tutuyoruz (örn. 'Giyim > Kadın > Elbise > Kokteyl').

**3. Custom Label & Strateji Katmanları**  
Gonet'in standart custom label yapısı:
- **custom_label_0**: Marj segmenti (Yüksek / Orta / Düşük)
- **custom_label_1**: Satış hızı (Bestseller / Normal / Yavaş)
- **custom_label_2**: Sezonluk/Kampanya (Yaz Koleksiyonu / İndirimli / Yeni Ürün)
- **custom_label_3**: Müşteri segment hedefi (Yeni Ziyaretçi / Remarketing / VIP)
- **custom_label_4**: Ürün yaşam döngüsü (Lansman / Olgunluk / Çıkarma)

Bu etiketler, 10+ ayrı kampanya segmentini tek feed'den besleyerek her segmente özel hedef ROAS, bütçe ve teklif stratejisi uygulamayı sağlar.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Geniş ürün kataloğu (500+ SKU)** | Custom label olmadan tüm ürünler tek havuzda yarışır; karlı ürünler bütçe alamaz. Label segmentasyonu ROAS'ı %40-80 artırır. |
| **GTIN eksik/hatalı ürünler** | Google reddi → sıfır gösterim. Gonet brand+MPN fallback (yedek çözüm) ve tedarikçi GTIN eşleştirmesiyle %95+ onay oranı sağlar. |
| **Dinamik fiyat/stok değişimi** | Manuel feed güncellemesi 24-48 saat gecikme yaratır; otomatik akış stoksuz ürünü 4 saat içinde kampanyadan çıkarır, kaynak kaybını önler. |
| **Çok kanallı satış (marketplace + web)** | Tek feed hem Google Shopping hem Free Listings, YouTube, Display'de kullanılır; tutarlı ürün verisi omnichannel (çok kanallı) performans izlemeyi mümkün kılar. |
| **Promosyon/sezon kampanyaları** | Custom label ile kampanya ürünlerini ayrı bütçe havuzuna alıp agresif teklif verebilirsiniz; kampanya bitince label değiştirerek normal stratejiye dönersiniz. |

## İlgili yetkinlikler

- [Performance Max (PMax) Kampanya Yönetimi](/yetkinlikler/google-ads-sem/performance-max-pmax-kampanya-yonetimi): PMax, Shopping feed'ini tüm Google envanterine yayar; feed kalitesi PMax performansını doğrudan etkiler.
- [Google Ads Veri & Ölçümleme Altyapısı](/yetkinlikler/google-ads-sem/google-ads-veri-olcumleme-altyapisi): Conversion tracking (dönüşüm izleme) ve değer ataması, feed segmentlerinin ROAS analizini mümkün kılar.
- [Dinamik Remarketing Kampanyaları](/yetkinlikler/google-ads-sem/dinamik-remarketing-kampanyalari): Aynı feed, Display ve YouTube remarketing kampanyalarında kişiselleştirilmiş ürün gösterimi için kullanılır.
- [E-ticaret GA4 & Ölçümleme Sistemleri](/yetkinlikler/veri-analitics/e-ticaret-ga4-olcumleme-sistemleri): Feed performansı GA4 e-ticaret raporlarıyla birleştirilerek ürün düzeyinde karlılık analizi yapılır.

## Gonet ile çalışmak

Gonet, 2008'den beri 80+ e-ticaret markasının Google Shopping yapılandırmasını yönetiyor. Feed audit (denetim), custom label mimarisi, otomatik güncelleme altyapısı ve sürekli optimizasyon döngüsü ile katalog performansınızı maksimize ediyoruz. E-ticaret kampanyalarınızı feed temelli yeniden yapılandırmak için [iletişime geçin](/iletisim).
