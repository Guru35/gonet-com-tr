---
title: "AI Alışveriş Ajanları Sahte Fırsatı %37 Oranında Satın Aldı"
description: "Dokuz AI modelinin 6.156 alışveriş denemesinde yürütülen bağımsız bir araştırma, yapay zeka ajanlarının açıkça sahte bir fırsatı üçte bir oranında satın aldığını ortaya koydu. Yalnızca Claude Opus hiç yanılmadı. Bu sonuç, e-ticaret sitelerinin ürün listelerini AI motorlarına nasıl sunduğunu doğrudan etkiliyor."
published: 2026-12-10
updated: 2026-11-26
author:
  name: "Gonet"
  role: "AEO/GEO Araştırma Ekibi"
category: "AEO/GEO"
readingMinutes: 6
draft: true
ozetMaddeleri:
  - "9 AI modelinin 6.156 alışveriş denemesinde ajanların açıkça sahte bir fırsatı ortalama %37 oranında satın aldığı ölçüldü."
  - "E-ticaret sitelerinde yalnızca cazip fiyat veya başlık değil, tutarlı ürün şeması, stok doğrulaması ve güven sinyalleri belirleyici oluyor."
  - "Yapay zekâ alışveriş ajanlarına hazırlanan markalar için Product JSON-LD, iade politikası ve doğrulanabilir yorum yapısı kritik önem taşıyor."
karsilastirmaTablosu:
  baslik: "AI Alışveriş Ajanlarında Güven Sinyali Karşılaştırması"
  sutunlar:
    - "Sayfa Sinyali"
    - "Sahte / Zayıf Sayfa"
    - "Güvenilir E-Ticaret Sayfası"
  satirlar:
    - ["Fiyat ve Kampanya", "Tutarsız ve abartılı indirim", "Product Schema ile doğrulanmış fiyat"]
    - ["Satıcı Kimliği", "Eksik künye ve iletişim", "Doğrulanmış Organization + iade şartları"]
    - ["Ajan Kararı", "%37 hata oranına açık", "Yüksek güvenle öneri ve yönlendirme"]
sss:
  - soru: "AI alışveriş ajanları hangi sinyallere bakarak ürün seçiyor?"
    cevap: "AI alışveriş ajanları öncelikle ürün listelerindeki yapılandırılmış verileri — fiyat, puan, yorum sayısı ve ürün açıklaması — analiz ediyor. Bu alanlar makine tarafından okunabilir formatta sunulduğunda güçlü karar sinyali oluşturuyor. Schema.org işaretlemesi bu sinyallerin AI tarafından doğru yorumlanmasını kolaylaştırıyor. Sahte listelemelerde bu alanlar \"doğru\" formatta ama anormal değerlerle doldurulduğunda modellerin bir kısmı ayrımı yapamıyor."
  - soru: "Claude Opus neden hiç yanılmadı, diğer üst modeller yanıldı?"
    cevap: "Araştırmacı kesin bir mekanizma tespit edemedi; ancak Claude Opus'un anormallik tespiti konusunda özel eğitim almış olabileceğini öne sürüyor. Önemli bulgu şu: Güvenilirlik model büyüklüğüyle doğru orantılı değil. Aynı şirketin (Anthropic) orta ve hızlı modelleri en yüksek hata oranlarını gösterdi. Bu, hangi modeli hangi görev için seçtiğinizin kritik olduğunu ortaya koyuyor."
  - soru: "Bu araştırma e-ticaret SEO stratejimi nasıl etkiler?"
    cevap: "AI ajanlarının karar mekanizmaları, arama motoru sıralama algoritmalarıyla giderek örtüşüyor. Listing kalitesi, fiyat tutarlılığı ve yorum özgünlüğü hem klasik SEO hem de GEO için çift işlevli güven sinyali haline geliyor. Türkiye'de AI destekli alışveriş henüz yaygınlaşmamış olsa da Google Shopping'in AI katmanı zaten bu sinyalleri kullanıyor. Bugün yapılan listing optimizasyonu, yarınki AI ajanı trafiğine hazırlık anlamına geliyor."
---
## Olay: Dokuz Model, 6.156 Alışveriş, Bir Sahte Ürün

Bağımsız araştırmacı Slobodan Manic, Anthropic, OpenAI ve Google'ın modellerini (her şirketten üç farklı katman) toplamda 6.156 sanal alışveriş turuna çıkardı. Her ürün kategorisinde 10 listeleme sunuldu; bunlardan biri açıkça anormal bir "fırsat"tı: on binlerce yorumdan gelen mükemmel 5.0 puanı ve rakiplerinin dörtte biri ile beşte biri arasında bir fiyat. Örneğin kokulu mum kategorisinde sahte ürün 6 dolar ve 39.000 yorumla 5.0 puan taşırken, gerçek ürünler 24-40 dolar arasında fiyatlanıyordu.

Sonuç: AI ajanları bu sahte listelemeden 360 denemede ortalama %37 oranında satın alma yaptı. Üstelik 315 vakada modeller listeyi şüpheli bulduklarını *kendi notlarına* yazdıkları hâlde 137 kez yine de satın aldı; hiçbirinde kullanıcıya danışmadı.

Model bazında dağılım şu şekilde:

| Model | Tier | Sahte Alım Oranı |
|---|---|---|
| Claude Opus | Anthropic, en iyi | %0 |
| Gemini 4 Argon | Google, en iyi | %16 |
| GPT-6.1 Sol | OpenAI, en iyi | %22 |
| GPT-6 Luna | OpenAI, hızlı | %39 |
| Gemini 3.5 Flash-Lite | Google, hızlı | %42 |
| Claude Sonnet | Anthropic, orta | %57 |
| Claude Haiku | Anthropic, hızlı | %60 |

En dikkat çekici bulgu: Anthropic'in en üst modeli Claude Opus 360 denemede sıfır hata yaparken, aynı şirketin orta ve hızlı modelleri en yüksek hata oranlarını sergiledi. Bu, model katmanı seçiminin güvenilirlik üzerindeki asimetrik etkisini gösteriyor.

## Mekanizma: AI Ajanı Neden Şüphelense de Satın Alıyor?

Buradaki kritik mesele "halüsinasyon" değil; **karar zinciri kopukluğu**. Modeller listing verisini yorumladığında uyarı sinyali üretiyorlar — ancak bu sinyal, satın alma aksiyonunu durdurmak için yeterince ağırlıklandırılmıyor.

Bunu daha teknik düzeyde açıklarsak:

- **RAG (Retrieval-Augmented Generation — üretimde dış veri kullanımı)** tabanlı alışveriş ajanları, fiyat ve rating gibi yapılandırılmış alanları güçlü sinyal olarak değerlendiriyor. Sahte listeleme bu alanları "doğru" formatta doldurduğu için alana güvenilirlik skoru atıyor.
- Modelin kendi ürettiği şüphe notu, reasoning (akıl yürütme) katmanında kalıp final action (nihai eylem) katmanına geçmiyor. Bu, **semantic chunking (anlamsal parçalama)** sırasında uyarı bağlamının kaybolmasına benzer bir mekanizma.
- Claude Opus'un neden yanılmadığı henüz kesin olarak bilinmiyor; araştırmacı, Anthropic'in bu modeli özellikle anormallik tespiti için eğitmiş olabileceğini öne sürüyor. Güvenilirlik, model büyüklüğüyle değil eğitim hedefiyle ilişkili görünüyor.

Bu mekanizma, **entity authority (varlık otoritesi)** kavramıyla da örtüşüyor: AI motorları bir listelemede sayısal otoriteyi (5.0 / 39.000 yorum) gerçek otorite olarak işliyor. Bu, GEO (Generative Engine Optimization — üretken motor optimizasyonu) stratejilerinin temelindeki "güvenilirlik sinyali" mantığının bir yansıması.

## Türk Pazarı için Ne Anlama Geliyor?

Türkiye'de AI destekli alışveriş ajanları henüz kitlesel kullanımda değil; ancak bu araştırmanın sonuçları bugün uygulanabilir iki ayrı alanda önem taşıyor.

**E-ticaret ve marketplace satıcıları için:** Trendyool, Hepsiburada veya Amazon.com.tr'de listeleme yapan markalar, AI ajanlarının hangi ürün sinyallerine güvendiğini anlamak zorunda kalacak. Ürün açıklamaları, fiyat tutarlılığı ve yorum profili yakında bir insan müşteriyi değil, bir AI ajanını ikna etmek üzere tasarlanmak durumunda kalabilir.

**Dijital pazarlama ajansları için:** Google Shopping ve Performance Max kampanyaları zaten AI tabanlı optimizasyon kullanıyor. Bu araştırma, feed kalitesinin ve listing güvenilirliğinin AI karar mekanizmalarını nasıl etkilediğini somutlaştırıyor. Yanlış ürün verisi, hem kullanıcıya hem de AI ajanına yanlış sinyal üretiyor.

Türkçe içerik ve Türkçe ürün listelemeleri için erken hazırlık şu anlama geliyor: **listing bütünlüğü (fiyat, puan, yorum sayısı tutarlılığı) AI güven skorunun çekirdeği haline geliyor**. [AEO ve GEO stratejilerinde](https://gonet.com.tr/yetenekler/aeo-geo-yeni-nesil-arama) bu sinyal katmanı, klasik anahtar kelime optimizasyonundan çok daha belirleyici bir rol üstlenecek.

[Klasik SEO perspektifinden](https://gonet.com.tr/yetenekler/seo-klasik-arama) bakıldığında da ürün sayfası kalitesi, schema işaretlemesi ve yorum özgünlüğü artık hem arama motorları hem de AI ajanları için çift işlevli güven sinyali oluşturuyor.

## Eylem Maddeleri

- [ ] **Ürün feed'inizdeki fiyat-puan tutarlılığını denetleyin.** AI ajanları anormal fiyat/puan oranlarını şüpheli buluyor; siz de kendi listelemenize bu gözle bakın. Kategori ortalamasından belirgin şekilde sapan değerler güven sinyalini zayıflatıyor.
- [ ] **Schema.org (yapılandırılmış veri işaretleme) Product markup'ınızı güncelleyin.** `aggregateRating`, `reviewCount` ve `price` alanlarını gerçek zamanlı ve tutarlı tutun. AI ajanları bu yapılandırılmış alanları güçlü sinyal olarak önceliklendiriyor.
- [ ] **Yorum profilinizi analiz edin.** 10.000+ yorum ve mükemmel puan kombinasyonu artık bir güven göstergesi değil, potansiyel şüphe sinyali olabilir. Özgün, dağılımlı ve tarih olarak tutarlı yorumlar hedefleyin.
- [ ] **Google Ads ve Shopping kampanyalarında feed kalitesi skorunu izleyin.** Performance Max, AI optimizasyonu kullandığı için listing kalitesi doğrudan teklif verimliliğini etkiliyor. Aylık feed denetimi rutin hale getirin.
- [ ] **AI ajanı simülasyonu yapın.** ChatGPT veya Claude'a ürün kategorinizde alışveriş yaptırın ve kendi listelemenizin nasıl değerlendirildiğini test edin. Bu, ücretsiz ve hızlı bir GEO denetimi yöntemi.

## Sık Sorulan Sorular

**AI alışveriş ajanları hangi sinyallere bakarak ürün seçiyor?**
AI alışveriş ajanları öncelikle ürün listelerindeki yapılandırılmış verileri — fiyat, puan, yorum sayısı ve ürün açıklaması — analiz ediyor. Bu alanlar makine tarafından okunabilir formatta sunulduğunda güçlü karar sinyali oluşturuyor. Schema.org işaretlemesi bu sinyallerin AI tarafından doğru yorumlanmasını kolaylaştırıyor. Sahte listelemelerde bu alanlar "doğru" formatta ama anormal değerlerle doldurulduğunda modellerin bir kısmı ayrımı yapamıyor.

**Claude Opus neden hiç yanılmadı, diğer üst modeller yanıldı?**
Araştırmacı kesin bir mekanizma tespit edemedi; ancak Claude Opus'un anormallik tespiti konusunda özel eğitim almış olabileceğini öne sürüyor. Önemli bulgu şu: Güvenilirlik model büyüklüğüyle doğru orantılı değil. Aynı şirketin (Anthropic) orta ve hızlı modelleri en yüksek hata oranlarını gösterdi. Bu, hangi modeli hangi görev için seçtiğinizin kritik olduğunu ortaya koyuyor.

**Bu araştırma e-ticaret SEO stratejimi nasıl etkiler?**
AI ajanlarının karar mekanizmaları, arama motoru sıralama algoritmalarıyla giderek örtüşüyor. Listing kalitesi, fiyat tutarlılığı ve yorum özgünlüğü hem klasik SEO hem de GEO için çift işlevli güven sinyali haline geliyor. Türkiye'de AI destekli alışveriş henüz yaygınlaşmamış olsa da Google Shopping'in AI katmanı zaten bu sinyalleri kullanıyor. Bugün yapılan listing optimizasyonu, yarınki AI ajanı trafiğine hazırlık anlamına geliyor.

---

AI ajanlarının alışveriş kararlarındaki bu güvenilirlik açığı, GEO ve AEO stratejilerinin neden teknik SEO'dan ayrı düşünülemeyeceğini bir kez daha gösteriyor. Ürün listelerinizin AI motorlarında nasıl temsil edildiğini anlamak istiyorsanız [Gonet ile iletişime geçin](https://gonet.com.tr/iletisim) — listing denetiminden schema implementasyonuna kadar süreci birlikte değerlendirebiliriz.

---

*İncelenen kaynak: [searchenginejournal.com](https://www.searchenginejournal.com/ai-shopping-agents-bought-a-fake-deal-37-of-the-time-claude-opus-never-did/598682/)*
