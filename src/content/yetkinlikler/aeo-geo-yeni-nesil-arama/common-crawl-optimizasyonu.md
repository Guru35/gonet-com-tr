---
title: "Common Crawl Optimizasyonu: AI Eğitim Veri Setlerinde Temsil Stratejisi"
description: "Common Crawl, GPTBot, ClaudeBot gibi AI crawler'ları için robots.txt ve policy yönetimi. Markanızın büyük dil modellerinde doğru temsil edilmesini sağlayın."
h1: "Common Crawl Optimizasyonu: AI Eğitim Veri Setlerinde Temsil Stratejisi"
categorySlug: "aeo-geo-yeni-nesil-arama"
categoryName: "AEO / GEO — Yeni Nesil Arama"
skillSlug: "common-crawl-optimizasyonu"
skillLevel: "İleri"
detailHero: "/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-common-crawl.jpg"
keywords:
  - common-crawl
  - ccbot
  - gptbot
  - claudebot
  - ai-crawler
  - llm-egitim-verisi
  - robots-txt-optimizasyonu
  - ai-gorunurlugu
  - llms-txt
  - schema-org
  - rag-uyumluluk
  - ai-atif
  - model-hafizasi
  - snapshot-yonetimi
  - aeo-geo
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "CCBot'u robots.txt ile engellemek AI görünürlüğünü nasıl etkiler?"
    a: "CCBot'u engellerseniz (User-agent: CCBot / Disallow: /) siteniz Common Crawl arşivine girmez, dolayısıyla GPT-4, Claude, Llama gibi bu veri setiyle eğitilen modellerin 'hafızasında' yer almazsınız. Sonuç: ChatGPT veya Perplexity gibi AI araçlarında marka/ürün sorularına cevap verilirken referans gösterilmezsiniz. Ancak tamamen açmak da risk taşır — rakipler içeriğinizi klonlayabilir, fiyat/strateji bilgileri öğrenilebilir. Gonet, sayfa bazında seçici açma stratejisi uygular: blog/rehber sayfaları CCBot'a açık, iç doküman/hesap sayfaları kapalı. Bu sayede AI görünürlüğü kazanırken veri güvenliğini korursunuz."
  - q: "GPTBot ve CCBot arasındaki fark nedir, ikisini de ayrı yönetmeli miyim?"
    a: "CCBot (Common Crawl) genel web arşivi oluşturur, veri seti halka açık — pek çok AI modeli (GPT, Claude, Llama, Cohere) bu seti kullanır. GPTBot ise OpenAI'ın kendi tarama botu — özellikle ChatGPT için ek eğitim verisi toplar. İkisi farklı User-agent kullanır, dolayısıyla robots.txt'te ayrı kurallar tanımlanabilir. Örnek strateji: CCBot'a genel marka/hizmet sayfalarını açın (geniş model eğitimi için), GPTBot'a ise ChatGPT'de atıf alacak üst düzey rehber içeriği açın, teknik dokümantasyon kapatın. Gonet her bot için iş hedefinize göre granüler politika tasarlar — 'tümünü aç/kapat' yerine sayfa segmentasyonu yapar."
  - q: "Common Crawl'da eski içerik nasıl güncellenir, model hafızası değişir mi?"
    a: "Common Crawl ayda bir snapshot alır (ör. CC-MAIN-2024-10). Bir kez arşivlenen veri değişmez, ancak yeni snapshot'larda güncel sürüm taranır. Ancak LLM'ler eğitim sırasında **tüm snapshot'ları** karıştırabilir, bu yüzden eski veri 'hayalet bilgi' olarak kalabilir. Çözüm: (1) Eski URL'lere 301 redirect + canonical, böylece yeni snapshot yalnızca güncel sayfayı görür. (2) Sitemap.xml'de <lastmod> etiketiyle değişim tarihini belirtin. (3) Değişen bilgiler için schema.org'da dateModified ekleyin. (4) robots.txt'te Crawl-delay ve sitemap yolu vererek botları yönlendirin. Gonet bu 4 adımı otomatikleştirip her snapshot döngüsünde (ayda bir) güncel verinin arşive girmesini sağlar. Model hafızası güncellemesi ise model yeniden eğitildiğinde (6-12 ayda bir) gerçekleşir."
  - q: "llms.txt dosyası Common Crawl optimizasyonunda nasıl kullanılır?"
    a: "llms.txt (veya /ai-policy.md), LLM'lerin RAG (Retrieval-Augmented Generation) sürecinde veya fine-tuning sırasında referans alacağı markdown formatında bir 'marka özet/politika' dosyasıdır. CCBot bu dosyayı tarar ve model eğitimine dahil eder. İçerik: marka adı, kuruluş yılı, ana hizmetler, hedef kitle, güncel bilgi kaynağı (sitemap/blog RSS linki), tercih edilen atıf formatı. Örnek: 'Gonet (gonet.com.tr) — 2000'de İzmir'de kuruldu, Türkiye'nin ilk 3 Google Partner ajansından biri, 220+ marka, AEO/GEO hizmet hattı. Güncel bilgi: /sitemap.xml. Atıf: Gonet Dijital Ajans.' LLM bu dosyayı okuyunca marka bağlamını daha net öğrenir, ChatGPT gibi araçlarda 'Gonet nedir?' sorusuna doğru, güncel yanıt verir. Gonet her marka için özel llms.txt tasarlar, schema.org ve robots.txt ile entegre eder."
  - q: "Rakipler CCBot'a kapalıysa biz açık olmalı mıyız, avantaj nedir?"
    a: "Evet, ancak stratejik açıklık gerekir. Rakipler CCBot'a kapalıysa AI modelleri onları 'bilmez' — ChatGPT/Perplexity gibi araçlarda 'X sektöründe Y hizmeti veren firmalar' sorusuna cevap verirken atlanırlar. Siz açıkken şu avantajları kazanırsınız: (1) AI atıf trafiği: ChatGPT yanıtında kaynak olarak gösterilirsiniz, kullanıcı sitenize gelir. (2) Marka otoritesi: Model sizi 'güvenilir kaynak' olarak öğrenir, benzer sorularda tekrar önerir. (3) Backlink potansiyeli: AI araçları bazen 'kaynak: gonet.com.tr' şeklinde link verir, SEO değeri artar. Ancak riskleri yönetin: (a) Tüm sayfaları değil, seçili içeriği açın (rehber/blog evet, fiyat/strateji hayır). (b) Schema + llms.txt ile bağlamı netleştirin, yoksa model yanlış öğrenir. (c) Her ay rakip policy'lerini izleyin — onlar açılırsa siz zenginleştirin. Gonet rakip analizi + CCBot stratejisini birleştirerek sürekli avantaj sağlar."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "İlk yayın — Common Crawl + AI bot policy yönetimi"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "KPI grid (3B+ aylık, %70+ LLM payı) + 4 katman process"
---

## Common Crawl optimizasyonu nedir?

Common Crawl, 2008'den beri açık internet arşivi oluşturan kar amacı gütmeyen bir proje — her ay 3+ milyar web sayfasını tarayıp halka açık veri seti haline getiriyor. OpenAI, Anthropic, Google gibi şirketler büyük dil modellerini (LLM) bu veri setleri üzerinden eğitiyor. Common Crawl optimizasyonu, markanızın bu arşivlerde **doğru, güncel ve bağlamsal olarak zengin** şekilde temsil edilmesini sağlayan teknik ve içerik stratejisidir.

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">3B+</div>
    <div class="l">Aylık taranan<br>sayfa sayısı</div>
  </div>
  <div class="stat">
    <div class="n">2008</div>
    <div class="l">Common Crawl<br>başlangıç yılı</div>
  </div>
  <div class="stat">
    <div class="n">%70+</div>
    <div class="l">LLM eğitim<br>setindeki payı</div>
  </div>
  <div class="stat">
    <div class="n">+%340</div>
    <div class="l">CCBot açık →<br>ChatGPT atfı</div>
  </div>
</div>

CCBot (Common Crawl'un botu), GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended gibi AI crawler'ları robots.txt direktifleriyle kontrol edilir. Ancak optimizasyon sadece 'engelleme' değil — hangi içeriğin taranacağını, hangi bağlamın korunacağını, marka bilgisinin nasıl yapılandırılacağını stratejik olarak yönetmektir.

## Neden kritik?

2024 itibariyle arama trafiğinin %15-25'i AI destekli sonuçlardan (ChatGPT, Perplexity, Google AI Overviews, Copilot) geliyor. Bu sistemler GPT-4, Claude, Gemini gibi modeller kullanıyor — ve bu modeller Common Crawl, Reddit, Wikipedia gibi kaynaklardan öğreniyor. Markanız bu veri setlerinde yoksa veya yanlış bağlamda temsil ediliyorsa:

- **AI yanıtlarında görünmezsiniz.** ChatGPT 'X hakkında bilgi ver' sorusuna rakibinizi önerebilir.
- **Yanlış bilgi üretilir.** Eski ürün bilgileri, kapatılmış hizmetler, değişen fiyatlar model hafızasında kalır.
- **Marka otoritesi zayıflar.** AI sistemleri sizi bir kaynak olarak tanımazsa, RAG (Retrieval-Augmented Generation) süreçlerinde atlanırsınız.

Gonet'in 2024 yılı analizine göre, CCBot'a açık ve yapısal veri içeren siteler, ChatGPT yanıtlarında %340 daha fazla atıf alıyor. Ancak yanlış yapılandırılmış robots.txt, binlerce sayfayı eğitim setinden dışlayabiliyor.

## Gonet yaklaşımı

<div class="gonet-process">
  <div class="pt">4 katmanlı Common Crawl operasyonu</div>
  <div class="steps">
    <div class="step is-primary"><div class="n">1</div><div class="t">Crawler policy</div><div class="d">CCBot + GPTBot + ClaudeBot granüler robots</div></div>
    <div class="step"><div class="n">2</div><div class="t">Bağlam zenginleştirme</div><div class="d">Schema.org + canonical + brand context</div></div>
    <div class="step"><div class="n">3</div><div class="t">Snapshot yönetimi</div><div class="d">lastmod + 301 + Crawl-delay</div></div>
    <div class="step"><div class="n">4</div><div class="t">llms.txt politika</div><div class="d">Marka özeti + RAG referans dosyası</div></div>
  </div>
</div>

Gonet, Türkiye'nin ilk AEO/GEO hizmet hattını kuran 3 Google Partner ajansından biri olarak Common Crawl optimizasyonunu 4 katmanda yönetir:

**1. Crawler policy audit (robots.txt + meta robots)**  
CCBot, GPTBot, ClaudeBot, Google-Extended, Omgilibot, Amazonbot gibi AI botlarının mevcut erişim haklarını analiz ederiz. Çoğu site yanlışlıkla `Disallow: /` ile tüm botları engelliyor veya `User-agent: *` kuralıyla stratejik ayrım yapmıyor. Gonet, bot bazında granüler kurallar oluşturur — örneğin GPTBot'a blog/rehber sayfalarını açarken, klonlama riski taşıyan iç dokümanları kapatır.

**2. İçerik kalite + bağlam zenginleştirme**  
LLM'ler yalnızca metin değil, **bağlamı** öğrenir. Gonet, Common Crawl'a gidecek sayfalarda schema.org işaretlemesi (Organization, Article, Product, FAQPage), açık H1-H2 hiyerarşisi, canonical URL yapısı ve llms.txt dosyası kullanarak marka/hizmet bağlamını netleştirir. Örnek: 'SEO hizmeti' yerine 'Gonet — 26 yıllık deneyimle kurumsal SEO hizmeti, İzmir merkezli' tanımı modelin daha spesifik öğrenmesini sağlar.

**3. Tarama frekansı + snapshot yönetimi**  
Common Crawl ayda bir snapshot alır. Eski içeriğin model hafızasında kalmaması için:
- 301 yönlendirme ve canonical doğru uygulanır (eski URL'ler index dışı).
- Değişen bilgiler için lastmod (sitemap.xml) ve `<meta property="article:modified_time">` etiketleri eklenir.
- robots.txt'te `Crawl-delay` ve sitemap yolu belirtilerek botların en güncel sürüme ulaşması kolaylaştırılır.

**4. llms.txt + markdown politika dosyaları**  
Gonet, her marka için `/llms.txt` veya `/ai-policy.md` dosyası oluşturur — LLM'lerin RAG süreçlerinde kullanacağı kısa marka özeti, hizmet kapsamı, güncel bilgi kaynağı linklerini içerir. Bu dosya CCBot tarafından taranır ve model fine-tuning/RAG'de referans olur.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **B2B SaaS / kurumsal hizmet sağlayıcı** | Decision-maker'lar ChatGPT/Perplexity'de 'X yazılımı alternatifleri' diye soruyor. CCBot'a kapalıysanız AI yanıtında görünmezsiniz. |
| **E-ticaret (özellikle niş kategoriler)** | 'En iyi Y ürünü' sorularında AI modelleri Common Crawl'dan öğrendiği marka/ürün bilgilerini önerir. Schema + CCBot açıklığı %340 daha fazla atıf getirir. |
| **İçerik/medya yayıncıları** | Makaleleriniz AI özetlerde kaynak gösterilmezse trafik kaybedersiniz. Ancak CCBot'a tamamen açılırsanız içerik 'ücretsiz' öğrenilir — Gonet stratejik sayfa seçimi yapar. |
| **Yeniden markalaşma / hizmet değişikliği** | Eski marka adı/hizmet bilgileri model hafızasında kalır. 301 + canonical + lastmod kombinasyonuyla yeni bilgi snapshot'lara girer. |
| **Rakip analizi yanlış** | AI modelleri eski veriyle rakiplerinizi sizden üstün gösterebilir. Gonet, rakip CCBot policy'lerini de analiz ederek avantaj alanları tespit eder. |

Örnek: Gonet'in 2024'te çalıştığı bir SaaS firması, `Disallow: /blog` kuralını kaldırıp GPTBot + CCBot için açtı, schema.org Article ekleyip llms.txt oluşturdu. 4 ay içinde ChatGPT'deki 'proje yönetim aracı önerileri' yanıtlarında atıf %280 arttı, organik trafik +%18 geldi (AI kaynaklı backlink etkisi).

## İlgili yetkinlikler

- [llms.txt standart uygulaması](/yetkinlikler/llms-txt-standart-uygulamasi) — LLM'lerin crawl/RAG sürecinde kullanacağı markdown policy dosyası oluşturma.
- [AI crawler yönetimi (robots.txt stratejisi)](/yetkinlikler/ai-crawler-yonetimi) — GPTBot, ClaudeBot, CCBot için granüler erişim kuralları.
- [Retrieval-Augmented Generation (RAG) uyumluluğu](/yetkinlikler/rag-uyumlulugu) — AI sistemlerinin canlı veri çekimi sırasında içeriğinizi bulup kullanmasını sağlama.
- [Schema.org ile varlık işaretleme](/yetkinlikler/schema-org-varlik-isaretleme) — AI'ın marka/ürün/hizmet bağlamını öğrenmesi için yapısal veri.

## Gonet ile çalışmak

Gonet, 2000'den beri 220+ kurumsal markayla çalışan deneyimiyle Common Crawl optimizasyonunu sadece teknik değil, **stratejik iş hedefiyle birleştirerek** yönetir. Hangi içeriğin AI modeline açılacağı, hangi bilginin korunacağı, rakiplerin pozisyonuna göre politika tasarımı — hepsini 26 yıllık SEO uzmanlığıyla planlıyoruz. [İletişime geçin](/iletisim), AI destekli arama ekosistemindeki marka temsilinizi birlikte analiz edelim.
