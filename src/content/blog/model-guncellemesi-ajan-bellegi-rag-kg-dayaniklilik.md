---
title: "Model Güncellemesi Sonrası Ajan Belleği: RAG mı, KG mi Dayanıklı?"
description: "Bir AI ajanı model güncellemesinden geçtiğinde belleği ne olur? arXiv'de yayımlanan kontrollü çalışma, dört farklı bellek mimarisini karşılaştırıyor: sabit şema bilgi grafikleri model değişikliğine karşı neredeyse sıfır hata ile direniyor; doğal dil notları ise yüzde 13'e varan doğruluk kaybı yaşıyor. RAG ve GEO altyapısı kuran ekipler için kritik mimari bir uyarı."
published: 2026-09-28
updated: 2026-09-28
author:
  name: "Gonet"
  role: "AEO/GEO Araştırma Ekibi"
category: "AEO/GEO"
readingMinutes: 6
draft: true
---
## Olay: Model Güncellemesi Belleği Nasıl Siliyor?

Bir AI ajanını yeni bir modele geçirdiniz; sistem çalışıyor, bellek deposu yerli yerinde. Ama ajan artık eski bilgileri doğru yorumlayamıyor. Ankit Goyal ve Jaideep Ray'in arXiv'de yayımlanan araştırması tam bu senaryoyu mercek altına alıyor.

Çalışma, dört bellek mimarisini 48 farklı sentetik geçmiş üzerinde test ediyor:

- **LC-RAW** — Ham konuşma geçmişi, uzun bağlam okuma için olduğu gibi saklananlar
- **RAG** (Retrieval-Augmented Generation — Erişim Destekli Üretim) — Metin parçalara bölünmüş, embedding tabanlı sorgu yapılan sistem
- **NOTES** — Bir model tarafından doğal dile sıkıştırılmış notlar
- **KG-fixed** — Sabit şema bilgi grafiği

Model değişikliğinde bu dört yapı birbirinden dramatik biçimde farklı davranıyor.

---

## Mekanizma: Neden Bazı Bellek Yapıları Dayanıklı, Bazıları Kırılgan?

### Sabit Şema Kazanıyor

KG-fixed mimarisinde, model değiştiğinde doğruluk farkı yalnızca **+0,0004 ± 0,0020** — pratikte sıfır kayıp. Bunun nedeni şema: sabit bir yapıya oturtulan bilgi, hangi modelin okuyacağından bağımsız hale geliyor. Modelin yorumlama tarzı değişse de veri yapısı sabit kaldığından anlam kayması yaşanmıyor.

### Doğal Dil Notları Modele Bağımlı

NOTES mimarisi tam tersi bir tablo çiziyor. Aynı geçmiş farklı yönlerde geçirildiğinde doğruluk **+9,91 ya da −13,28 puan** oynuyor. Araştırmacılar bu asimetrik kaybın yüzde 80'ini ilk not oluşturma aşamasındaki bilgi sıkıştırmasına bağlıyor. Yani kayıp, model değişiminde değil; notların yazıldığı anda zaten gerçekleşiyor. Sonraki model farklı bir "okur" olunca kayıp görünür hale geliyor.

### RAG'da Kısmi Embedding Geçişi Verimli Değil

RAG (Erişim Destekli Üretim) sistemlerinde belki de en pratik bulgu şu: Mevcut ve yeni embedding modelini **50/50 karıştıran** bir geçiş stratejisi, tam yeniden-embedding'in (re-embedding) sağladığı 11,90 puanlık kazancın yalnızca 4,96 puanını yakalıyor. Kalan fayda buharlaşıyor. RAG kayıplarının ise yüzde 81'i bilgi kaybından değil, **erişim hatalarından** kaynaklanıyor: doğru parça depoda var, ama sorgu onu bulamıyor.

### Ham Kaynak Saklamak Onarım İçin Zorunlu

Hasarlı bir NOTES deposunu yalnızca mevcut notlarla onarmak, 48 test senaryosunun hiçbirinde yüzde 90 performans eşiğine ulaşamıyor. Ama **ham kaynak geçmiş saklandığında** bu oran 48 senaryonun 34'üne yükselebiliyor. Sonuç açık: kaynak veriyi atmak, ileride onarım kapısını kapatıyor.

---

## Türk Pazarı için Ne Anlama Geliyor?

Türkiye'de kurumsal müşterilere RAG tabanlı chatbot veya içerik üretim ajanı sunan ajanslar ve teknoloji ekipleri için bu araştırma doğrudan bir kontrol listesi niteliği taşıyor.

**Kısa vadeli etki:** OpenAI, Anthropic veya açık kaynak modellerin sürüm güncellemeleri artık yılda birden fazla geliyor. Her güncelleme, NOTES tabanlı ajan belleğini sessizce bozabilir. Türkçe dil modellerinin (örneğin yerel fine-tune çalışmaları) devreye alındığı projelerde bu risk daha da somut: kaynak model Türkçe'yi farklı şekilde sıkıştırmış olabilir, hedef model farklı yorumlar.

**GEO ve AEO açısından:** [AEO/GEO hizmeti geliştiren](https://gonet.com.tr/yetenekler/aeo-geo-yeni-nesil-arama) ajanslar için bu bulgu ayrı bir anlam taşıyor. Eğer bir içerik üretim ajanı, marka bilgi tabanını NOTES formatında saklıyorsa ve model değişirse, ajanın ürettiği yanıtlar tutarsızlaşabilir — bu tutarsızlık doğrudan citation surface (alıntı yüzeyi) kalitesini etkiler. Sabit şema yapılar, marka bilgisinin model değişimlerinden bağımsız tutulmasını sağlıyor.

**Türkçe içerik üretenler için erken hazırlık:** Yerel dil modelleri veya ince ayarlı (fine-tuned) modeller arasında geçiş planı yapan ekiplerin, her geçiş yönünü ayrı ayrı test etmesi gerekiyor. Araştırmacıların "yön-özgü geçiş testi" dediği bu adım, Türkçe için ekstra önem taşıyor çünkü dil modellerinin Türkçe'ye özgü tokenizasyon farkları ek değişkenler yaratıyor.

[Gonet'in klasik SEO ve teknik yapı yaklaşımını](https://gonet.com.tr/yetenekler/seo-klasik-arama) zaten benimseyen ekipler için bu mimari disiplin yabancı değil: veriyi yapılandırmak, belirsizliği azaltır.

---

## Eylem Maddeleri: Yarın Uygulanabilir Kontrol Listesi

- [ ] **Ham kaynak geçmişi arşivle.** NOTES veya sıkıştırılmış bellek kullanan her ajan projesinde, kaynak konuşmaları ve dökümanları ayrı, ham biçimde sakla. Onarım penceresi açık kalsın.
- [ ] **Embedding geçişlerinde tam yeniden-indeksleme yap.** Karma (mixed) embedding indeksleri performansın yarısını bile kurtaramıyor. Model güncellemesinde tüm vektör deposunu yeniden oluştur; kısmi strateji bütçe tasarrufu değil, performans kaybıdır.
- [ ] **Yön-özgü geçiş testi ekle.** Model A → Model B geçişi ile Model B → Model A geçişini ayrı ayrı ölç. Asimetrik kayıplar, tek yönlü testle görünmez kalır.
- [ ] **Kritik bilgi tabanları için KG-fixed veya sabit şema değerlendir.** Marka bilgisi, ürün kataloğu veya sıkça sorulan sorular gibi yüksek değerli içerikler için yapılandırılmış bilgi grafikleri, model bağımsızlığı sağlıyor.
- [ ] **NOTES tabanlı ajanlar için model sürüm etiketlemesi uygula.** Hangi notun hangi model versiyonuyla yazıldığını meta veride sakla. Gelecekteki uyumluluk sorunlarını erken teşhis eder.

---

## Sık Sorulan Sorular

**S: Model güncellemesi sonrası RAG sistemi neden bozulur?**
Cevap: RAG sistemlerinde her metin parçası bir embedding modeli tarafından vektöre çevrilir. Yeni model farklı bir vektör uzayı kullanır. Eski vektörlerle yeni sorgular arasındaki mesafe hesabı anlamsızlaşır; doğru parçalar depoda dursa bile sorgu onları bulamaz. Tam yeniden-embedding (re-embedding) bu uyumsuzluğu giderir; kısmi geçiş ise çoğu faydayı heba eder.

**S: NOTES mimarisi neden bu kadar model bağımlı?
**Cevap: Doğal dil notları, oluşturulduğu modelin dil örüntüsünü taşır. Yeni model aynı metni farklı anlam ağırlıklarıyla yorumlayabilir. Üstelik bilginin yüzde 80'i zaten not yazılırken kaybolmaktadır; model değişimi bu kaybı gün yüzüne çıkarır. Sorun geçiş anında değil, bilgi sıkıştırma anında başlar.

**S: Sabit şema bilgi grafiği (KG-fixed) GEO projelerinde nasıl kullanılır?**
Cevap: Marka bilgisi, ürün özellikleri veya SSS içerikleri sabit alanlara (entity, relation, attribute) haritalandığında, hangi LLM okursa okusun yapı aynı kalır. Bu, GEO (Generative Engine Optimization) açısından kritiktir: AI motorlarına sunulan bilgi tutarlı ve yapılandırılmış olduğunda, yanlış alıntı veya model kaynaklı hallüsinasyon riski azalır.

---

*İncelenen kaynak: [arxiv.org](https://arxiv.org/abs/2609.05339)*
