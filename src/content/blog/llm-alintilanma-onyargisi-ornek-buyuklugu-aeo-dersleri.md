---
title: "LLM'ler Hangi Çalışmaları Öne Çıkarır? Alıntı Önyargısı ve AEO Dersleri"
description: "Cochrane veritabanındaki 20 sistematik derlemeyi referans alan yeni bir arXiv çalışması, ChatGPT, Claude ve Gemini'nin klinik sorularda hangi çalışmaları alıntıladığını ölçtü. Sonuç: LLM'ler büyük örneklemli çalışmaları sistematik biçimde tercih ediyor, model ve kullanıcı rolü geri çağırma oranını ciddi şekilde etkiliyor. Bu bulgu, içerik üreticileri için doğrudan bir AEO sinyali."
published: 2026-08-17
updated: 2026-08-17
author:
  name: "Gonet"
  role: "AEO/GEO Araştırma Ekibi"
category: "AEO/GEO"
readingMinutes: 7
draft: true
---
## Olay: LLM'ler Uzmanların Bulduğunu Buluyor mu?

Ağustos 2026'da arXiv'de yayımlanan bir araştırma, yapay zeka sohbet robotlarının tıbbi sorulara verdiği atıfların kalitesini sistematik biçimde ölçtü. Liu ve arkadaşları, **Claude Sonnet 5**, **Gemini 3.1 Pro** ve **ChatGPT GPT-5.5**'i Cochrane Sistematik Derlemeler Veri Tabanı'ndan alınan 20 soruyla sınadı. Her model; hasta, klinisyen ve kanıt-sentez araştırmacısı rollerinde sorgulandı, toplamda 720 yanıt elde edildi.

Temel bulgu şu: Bir LLM yanıtı, Cochrane'in dahil ettiği çalışmaların ortalama yalnızca **%39,2'sini** geri çağırabildi. Modeller arasındaki fark ise çarpıcı: ChatGPT %63,1 geri çağırma oranıyla Claude'un (%37,0) ve Gemini'nin (%17,3) belirgin şekilde önünde yer aldı. Dışlanan çalışmaların yanlışlıkla alıntılanma oranı ise %5,0 — yani "yanlış kaynak üretme" (hallucination) sorunun düşündüğümüzden daha dar bir mesele olduğunu gösteriyor; asıl kör nokta, *hangi doğru kaynağın seçildiğidir*.

---

## Mekanizma: Neden Büyük Örneklemli Çalışmalar Kazanıyor?

Araştırmanın en kritik bulgusu, yayın yılı ve açık erişim durumu kontrol altına alındığında **örneklem büyüklüğünün** geri çağırma üzerindeki tek bağımsız yordayıcı olmasıdır. Log örneklem büyüklüğündeki her bir birimlik artış, alıntılanma olasılığını 1,80 kat artırıyor (OR: 1,80; %95 GA: 1,37–2,36).

Bunun ardındaki mekanizma muhtemelen şu: Büyük ölçekli klinik çalışmalar, daha fazla gazeteciliğe, daha fazla ikincil yayına ve daha geniş bir web izine konu olur. RAG (Retrieval-Augmented Generation — Erişim Destekli Üretim) mimarisinde ya da ön-eğitim verilerinde bu çalışmalar daha yüksek frekanslıdır; dolayısıyla model, onları önce "hatırlar" ve öne çıkarır. Küçük ölçekli ama methodolojik açıdan güçlü çalışmalar, web'de az iz bıraktığı için LLM'lerin gözünden kaçar.

Kullanıcı rolünün de etkisi ölçüldü: Araştırmacı rolüyle sorulan sorgular (%42,8), hasta rolüyle sorulanlara (%36,1) kıyasla daha yüksek geri çağırma üretiyor. Yani prompt'un (sorgu metninin) yapısı, LLM'in hangi bilgi katmanına eriştiğini doğrudan belirliyor.

### Citation Surface (Alıntı Yüzeyi) Kavramı

Bu bulgular, [AEO/GEO stratejisi](https://gonet.com.tr/yetenekler/aeo-geo-yeni-nesil-arama) kapsamında tartışılan **citation surface** (alıntı yüzeyi — bir içeriğin LLM tarafından referans alınabilir yüzey alanı) kavramını doğruluyor. Büyük örneklemli çalışmaların web'deki izi ne kadar genişse, citation surface'ı o kadar büyük. Bu dinamik, yalnızca tıp sektörüne değil; ürün karşılaştırmaları, hukuki rehberler veya teknik belgeler gibi otorite gerektiren her içerik türüne uygulanabilir.

---

## Türk Pazarı için Ne Anlama Geliyor?

Bu araştırma doğrudan sağlık sektörüne odaklansa da çıkarımlar Türk dijital pazarında çok daha geniş bir yelpazeye yansıyor.

**Türkçe içerik üreticilerinin önündeki fırsat penceresi:** Türkçe web, İngilizce web'e kıyasla çok daha az secondary citation (ikincil atıf) barındırıyor. Yani bir Türkçe makale, İngilizce karşılığından çok daha hızlı biçimde "tek kaynak" konumuna oturabilir — bu da LLM'lerin onu alıntılama olasılığını artırır.

**KOBİ ve e-ticaret siteleri için pratik yorum:** Ürün sayfanızdaki veriler (karşılaştırma tabloları, kullanıcı sayısı, test sonuçları, sertifikalar) ne kadar büyük ve güvenilir bir örnekleme dayanıyorsa, ChatGPT veya Perplexity o sayfayı bir kullanıcı sorusuna yanıt olarak öne çıkarma olasılığı o kadar yüksek. "N değeri" artık sadece araştırmacıların değil, içerik stratejistlerinin de metriği.

**Ajanslar için:** Müşterilerinizin içeriklerini LLM'lerin gözünden değerlendirirken yalnızca teknik SEO değil, *içeriğin ne kadar kanıt taşıdığını* da ölçmeye başlama zamanı. [Klasik SEO](https://gonet.com.tr/yetenekler/seo-klasik-arama) metrikleriyle birlikte citation surface analizi artık zorunlu bir katman haline geliyor.

---

## Eylem Maddeleri (Checklist)

- [ ] **Kanıt yoğunluğunu artır:** Her içerik sayfasına, ürün veya hizmetin arkasındaki veriyi açıkça yaz — kullanıcı sayısı, test periyodu, örneklem büyüklüğü, tarih. LLM'ler bu sinyalleri ağırlıklandırıyor.
- [ ] **İkincil yayın izini genişlet:** Bir araştırma, vaka çalışması veya anket yürüttüyseniz sonuçları birden fazla kanalda (blog, PDF, basın bülteni, SlideShare) yayınlayın. Citation surface'ı büyütmek için tekrarlı doğru kaynak gerekiyor.
- [ ] **Prompt rolü testi yap:** ChatGPT, Claude ve Perplexity'de marka adınızı ya da ürününüzü hem "kullanıcı" hem de "uzman" rolünde sorgulayın. İki yanıt arasındaki fark, içeriğinizin hangi katmanda temsil edildiğini gösterir.
- [ ] **Schema.org ile kanıt işaretle:** `Dataset`, `MedicalStudy` veya `Review` şema türlerini kullanarak içeriğinizdeki araştırma verilerini yapılandırın; bu JSON-LD (JavaScript Object Notation for Linked Data — bağlantılı veri için yapılandırılmış format) işaretleme, hem Google AI Overviews hem de RAG pipeline'larına doğrudan sinyal gönderir.
- [ ] **Model kıyaslama rutini kur:** Aynı soruyu ChatGPT, Gemini ve Perplexity'de çalıştırıp markanızın hangi modelde, hangi sırayla alıntılandığını aylık kayıt altına alın. Bu, GEO (Generative Engine Optimization — üretici motorlar için optimizasyon) performansınızın ölçülebilir tabanıdır.

---

## Sık Sorulan Sorular

**LLM'ler içerikleri seçerken en çok hangi faktörü dikkate alıyor?**
Bu araştırmaya göre yayın yılı veya açık erişim durumundan bağımsız olarak örneklem büyüklüğü, LLM'lerin bir çalışmayı alıntılama ihtimalini en güçlü şekilde belirleyen faktör. Log ölçeğinde örneklem büyüklüğündeki her bir birimlik artış, alıntılanma olasılığını 1,80 kat artırıyor. İçerik üreticileri için bu, veriye dayalı, ölçülebilir argümanlar sunan sayfaların LLM alıntı sırasında avantajlı olduğu anlamına geliyor.

**ChatGPT, Claude ve Gemini arasındaki geri çağırma farkı neden bu kadar büyük?**
Çalışma bu farkın nedenini doğrudan açıklamıyor; ancak olası etkenler şunlar: ön-eğitim veri tabanının genişliği, RAG mimarisinin yapılandırılma biçimi ve model prompt yorumlama kapasitesi. ChatGPT %63,1, Claude %37,0 ve Gemini %17,3 geri çağırma oranına ulaştı. Bu fark, bir markanın farklı LLM'lerde farklı düzeylerde temsil edilebileceğini ve GEO stratejisinin platform bazında kurgulanması gerektiğini gösteriyor.

**Kullanıcı rolü neden alıntı kalitesini etkiliyor?**
Araştırmacı rolüyle kurulan sorgular, hasta rolüyle kıyaslandığında %6,7 daha yüksek geri çağırma oranı üretiyor. Bunun nedeni, uzman rolü simüle eden prompt'ların LLM'i daha teknik, kaynak-yoğun bir yanıt moduna yönlendirmesi. AEO açısından bu şunu söylüyor: Sayfanızın hitap ettiği kullanıcı niyetini (teknik mi, genel mi?) açıkça tanımlayan içerik yapısı, LLM'in o sayfayı doğru sorgularda devreye sokma ihtimalini artırır.

---

Bu araştırmanın ortaya koyduğu önyargı mekanizmaları, içerik stratejinizi veriye dayalı biçimde yeniden değerlendirmeniz için güçlü bir gerekçe sunuyor. Markanızın LLM'lerde nasıl temsil edildiğini analiz etmek ve citation surface'ınızı büyütmek için [Gonet ile iletişime geçin](https://gonet.com.tr/iletisim) — AEO denetimini birlikte yürütelim.

---

*İncelenen kaynak: [arxiv.org](https://arxiv.org/abs/2608.13786)*
