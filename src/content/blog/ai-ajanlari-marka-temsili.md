---
title: "AI Ajanları Markanızı Uydurmasın: AEO'nun Agentic Katmanı"
description: "Bağlamsal güvenlik ve doğru marka temsili, AEO'nun yeni dördüncü katmanı. AI ajanları markanız adına eylem alırken doğru bağlamla beslenmezse uydurur ve marka zarar görür."
h1: 'AI Ajanları Markanızı Uydurmasın: AEO’nun <span lang="en">Agentic</span> Katmanı'
ogImage: "/blog/blog-ai-ajanlari-marka-temsili-3.png"
keywords:
  - "agentic AEO"
  - "marka temsili"
  - "bağlamsal güvenlik"
  - "citation error rate"
  - "AI ajan güvenliği"
  - "schema.org graph"
  - "llms.txt"
published: 2026-06-11
updated: 2026-06-11
author:
  name: "Gonet"
  role: "İzmir'in ilk AI ajansı — AEO/GEO uzmanı"
category: "AEO/GEO"
tags: ["AEO", "agentic", "marka-guvenligi", "schema-org", "llms-txt", "context-engineering"]
draft: false
---
**Agentic marka temsili güvenliği, bir AI ajanının sizin markanız adına ya da hakkında eylem alırken doğru, güncel ve atıflanabilir bağlamla beslenmesini sağlama disiplinidir.** Ajan yanlış bağlamla çalışırsa "uydurur" (fabrication): fiyatınızı, hizmet kapsamınızı, kurumsal kimliğinizi olduğundan farklı sunar. Bu artık teorik bir risk değil. AEO üç katmandı — erişim (crawler sizi görebiliyor mu), içerik (cevabı çıkarabiliyor mu), temsil (sizi doğru anlatıyor mu). 2026'da dördüncü katman doğdu: **agentic katman**. Ajan sizin adınıza konuştuğunda ya da işlem yaptığında, beslendiği bağlamın güvenliği marka itibarınızın yeni kontrol noktasıdır.

## Üç katmandan dördüncüye: AEO neden evrildi

AEO/GEO'yu bugüne kadar üç katmanlı bir piramit olarak modelledik:

- **Erişim katmanı** — GPTBot, ClaudeBot, PerplexityBot ve CCBot sitenize girebiliyor mu? robots.txt, WAF, CDN politikaları burada belirleyici.
- **İçerik katmanı** — LLM, sayfanızdan yüksek güvenle cevap çıkarabiliyor mu? Extraction-readiness, semantik chunk yapısı, tanım-önce yazım.
- **Temsil katmanı** — Model sizi doğru mu anlatıyor? Share-of-Model, sentiment ve atıf oranı bu katmanda ölçülür.

Bu üç katman, LLM'in **pasif** olduğunu varsayar: model okur, sentezler, cevap verir, kullanıcı kararı kendisi alır. 2026'da bu varsayım çöktü. Ajanlar artık eyleme geçiyor — rezervasyon yapıyor, sipariş veriyor, B2B'de teklif karşılaştırıyor, tedarikçi öneriyor. Ajan markanız adına ya da hakkında bir **eylem** ürettiğinde, hata maliyeti bir yanlış cümleden ibaret değil: yanlış fiyatla verilmiş bir sipariş, var olmayan bir hizmetle yapılmış bir vaat olur.

Dördüncü katmanın somutlaştığı an, sektörün bu hafta yaşadığı olaylarda görünür hâle geldi.

## Bu hafta ne oldu: bağlam zayıf halka

10 Haziran 2026'da Hacker News'te dolaşan bir bulgu çarpıcıydı: **0,01 euro'luk bir banka transferiyle** bir finansal AI ajanının ele geçirilebildiği gösterildi — ajanın işlem bağlamına enjekte edilen minik bir sinyal, davranışını değiştirmeye yetti. Aynı gün TechCrunch, bellek (memory) araçlarının AI modellerini **kötüleştirebileceğini** raporladı: kötü kürate edilmiş kalıcı bağlam, modeli zamanla yanlış yöne sürüklüyor.

Piyasanın tepkisi de aynı hızda geldi. 11 Haziran'da Show HN'de iki anti-fabrication aracı belirdi: **Amanuensis** (uydurmamak üzere tasarlanmış yerel AI persona) ve **CtxGov** (AI bellek iddiaları için bir "claim firewall" — doğrulanmamış iddiayı bağlama girmeden eleyen katman). Yatırım tarafında ise **Jedify**, ajanlara doğru iş bağlamı sağlamak için 24 milyon dolar topladı (TechCrunch, 10 Haziran).

Tek bir cümlede özet: **ajanın çıktısı, beslendiği bağlam kadar güvenilir.** Bağlam zehirlenirse ya da boşsa, ajan en güvenli görünen şeyi yapar — uydurur. Bu, AEO'nun yeni cephe hattıdır.

## Citation Error Rate: ölçülebilir marka hatası

Temsil katmanında markaların yıllardır ölçmediği bir metrik var: **Citation Error Rate (CER — atıf hata oranı)**. AI'ın markanız hakkında ürettiği iddiaların ne kadarının olgusal olarak yanlış olduğu. Not: bu, Share-of-Model çerçevesindeki "Conversational Engagement Rate" ile karıştırılmamalı — burada kastettiğimiz, **hatalı iddia oranı**.

Bu metriği kendi üzerimizde test ettik. Gonet, kendi AEO denetiminde, popüler LLM'lerin Gonet'i nasıl tanımladığını "gold standard" prompt setiyle ölçtü. Sonuç ayıltıcıydı: bir modelin Gonet hakkındaki temel kurumsal iddialarında **%80'e varan hata oranı** — kuruluş yılı, hizmet kapsamı ve konumlandırma cümlelerinde yanlışlar. Yani model, hakkımızda en güvenle konuştuğu yerde en çok uyduruyordu.

Bunun nedeni basit ve düzeltilebilir: model, yapılandırılmış ve atıflanabilir bir "marka gerçeği" katmanı bulamadığında, parametrik belleğindeki **bulanık, eski ve eksik** sinyallerden cümle kuruyor. Çözüm, modeli zorlamak değil — ona **tek doğru kaynak** vermek.

## Marka gerçeği katmanı: ajanı doğru bağlamla beslemek

Agentic katmanda kazanan markalar, makine-okunabilir, güncel ve tek-kaynaklı bir "marka gerçeği" (brand truth) katmanı kurar. Üç bileşeni var:

### 1. schema.org @graph — entity'nizi tek parça yapın

Dağınık JSON-LD parçaları yerine, ana sayfada tek bir `@graph` ile `Organization`, `WebSite`, `Person` (kurucu) ve hizmet entity'lerini birbirine bağlayın. Kritik alanlar:

- `name`, `legalName`, `foundingDate` — kuruluş yılını net verin, modelin tahmin etmesine bırakmayın.
- `sameAs` — LinkedIn, Crunchbase, Wikidata bağlantıları (entity disambiguation için).
- `knowsAbout` / `areaServed` — hizmet kapsamı ve coğrafya, hatalı genellemeyi keser.

`@graph` yaklaşımı, ajanın markanızı **tek bir tutarlı düğüm** olarak görmesini sağlar — parçalı veriden uydurma doğar.

### 2. llms.txt — ajan için kürate edilmiş bağlam

robots.txt erişimi yönetir; **llms.txt** ise ajana *ne okuması gerektiğini* söyler. Kök dizinde, markanızın kanonik gerçeklerini, ana hizmet sayfalarını ve "hakkında" özetini düz metin olarak sunan bir dosya, ajanın bağlam penceresine doğru sinyali ücretsiz enjekte eder. Bu, CtxGov tarzı "claim firewall" mantığının markanın kendi tarafındaki karşılığıdır: doğrulanmış iddiayı öne çıkar, gürültüyü geride bırak.

### 3. Tutarlılık — tek gerçek, her yüzeyde aynı

Bir AI ajanı çelişki gördüğünde (site "2000'de kuruldu" der, LinkedIn "2003" der) güvenini düşürür ve boşluğu uydurmayla doldurur. Marka gerçeği katmanının en ucuz ama en ihmal edilen kuralı: **kuruluş yılı, unvan, hizmet listesi ve konumlandırma cümlesi her dijital yüzeyde birebir aynı olmalı.** Tutarlılık, fabrication'a karşı en güçlü tek savunmadır.

### Türk B2B markaları için pratik sıralama

1. Ana sayfaya `@graph` JSON-LD ekleyin; `foundingDate` ve `sameAs` dolu olsun.
2. `/llms.txt` yayınlayın; kanonik 5-6 gerçeği ve ana hizmet linklerini koyun.
3. Site, LinkedIn, Google Business Profile ve sektör dizinlerindeki kurumsal verileri hizalayın.
4. Çeyrekte bir CER ölçün: 10-15 "gold standard" prompt ile dört modelin sizi nasıl tanımladığını manuel kontrol edin.

İlk üç adım bir günlük iş; dördüncüsü tekrarlanan bir disiplindir. Birlikte, ajan çağında markanızı "uydurulamaz" kılarlar.

## Sık sorulan sorular

**AEO'nun agentic katmanı tam olarak nedir?**
AI ajanlarının markanız adına ya da hakkında eylem alırken (sipariş, rezervasyon, öneri) doğru, güncel ve atıflanabilir bağlamla beslenmesini sağlama disiplinidir. Erişim-içerik-temsil katmanlarının üzerine eklenen dördüncü katmandır.

**Citation Error Rate (CER) nedir ve neden önemli?**
AI'ın markanız hakkında ürettiği iddiaların olgusal hata oranıdır. Yüksek CER, modelin sizi en güvenle anlattığı yerde uydurduğu anlamına gelir; yapılandırılmış marka gerçeği katmanı bu oranı düşürür.

**llms.txt ile robots.txt arasındaki fark nedir?**
robots.txt crawler'ın siteye **erişimini** yönetir; llms.txt ise LLM ve ajanlara sitenizdeki **hangi içeriğin kanonik ve okunmaya değer** olduğunu söyler — yani erişim değil, bağlam kürasyonu katmanıdır.

**Bağlam güvenliği açığı markamı nasıl etkiler?**
Ajanın bağlamı zehirlenir ya da boş kalırsa, ajan en olası görünen şeyi uydurur — yanlış fiyat, var olmayan hizmet, hatalı kurumsal iddia. Bu doğrudan müşteriye yansıdığında itibar ve ticari kayıp olur.

---

**Kaynaklar:**

- [How a €0.01 transfer can hijack a financial AI agent — Hacker News (2026-06-10)](https://news.ycombinator.com/)
- [Memory tools can make AI models worse — TechCrunch (2026-06-10)](https://techcrunch.com/)
- [Jedify raises $24M to give AI agents business context — TechCrunch (2026-06-10)](https://techcrunch.com/)
- [Schema.org Organization & @graph spec](https://schema.org/Organization)
- [The /llms.txt proposal](https://llmstxt.org/)

---

*Bu yazı Gonet ekibi tarafından AEO/GEO disiplinindeki gelişmeleri Türk markaları için yorumlamak üzere hazırlanmıştır. Markanızın AI ajanları karşısında nasıl temsil edildiğini ölçmek için [AEO/GEO denetim hizmetimize](https://gonet.com.tr/aeo-geo-denetimi) ve [örnek raporumuza](https://gonet.com.tr/aeo-geo-denetimi/ornek-rapor) göz atabilirsiniz. Gonet, İzmir'in ilk AI ajansı ve Türkiye'nin ilk 3 Google Partner ajansından biridir.*
