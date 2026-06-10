---
title: "HTML-First Tasarım: Kullanıcıyı ve LLM Crawler'ını İkiye Katlar"
description: "HTML-first tasarım, anlam taşıyan tüm metni gerçek DOM text olarak sunan ve LLM crawler'ının yüksek-güvenle çıkarım yapmasını sağlayan extraction-ready mimaridir. Kontrol listesiyle."
h1: "HTML-First Tasarım Neden Hem Kullanıcıyı Hem LLM Crawler'ını İkiye Katlar"
ogImage: "/blog/blog-html-first-tasarim.png"
keywords:
  - "HTML-first"
  - "extraction-readiness"
  - "text-as-text"
  - "LLM crawler"
  - "semantic HTML"
  - "Core Web Vitals"
  - "AEO"
published: 2026-06-11
updated: 2026-06-11
author:
  name: "Gonet"
  role: "İzmir'in ilk AI ajansı — AEO/GEO uzmanı"
category: "AEO/GEO"
tags: ["html-first", "extraction-readiness", "text-as-text", "semantic-html", "llm-crawler", "core-web-vitals"]
draft: false
---
**HTML-first tasarım, anlam taşıyan tüm metni JavaScript render'ına veya görsel-içi piksellere değil, ilk yüklemede gelen gerçek DOM text'e koyan tasarım disiplinidir.** Bunun karşılığı çift: insan ziyaretçi sayfayı daha hızlı görür, LLM crawler'ı içeriği yüksek güvenle çıkarır. AEO terimleriyle söylersek HTML-first, extraction-readiness'in mühendislik tarafıdır — bir cevabın "çıkarılabilir" olması, önce DOM'da metin olarak var olmasına bağlıdır.

Bu tez bugün (2026-06-11) Hacker News'te öne çıkan "Building an HTML-first site doubled our users overnight" yazısıyla yeniden gündeme geldi: sade, semantik HTML'in somut kullanıcı kazancı bir vaka olarak ölçüldü. Aynı gün Show HN'de yer alan "Meadow Notes" (Markdown graph'lardan microsite üretip yayınlama aracı) ise aynı dalganın araç tarafını gösteriyor — içerik artık "çıkarılabilir" olmak için tasarlanıyor. İkisi de tek bir gerçeği işaret ediyor: web, hem insan hem makine okuyucu için aynı anda optimize edilebilir ve bunun yolu HTML-first.

## JS-ağır site neden iki okuyucuyu da kaybeder

Modern bir crawler ya da LLM ingest hattı bir sayfayı çektiğinde gördüğü şey, tarayıcının ekrana boyadığı şey değildir. Aradaki fark üç yerde para kaybettirir:

- **JS-render bağımlılığı.** İçerik client-side JavaScript ile sonradan enjekte ediliyorsa, render bütçesi olmayan crawler'lar (CCBot dahil pek çok eğitim-veri bot'u) boş bir kabuk görür. Sayfa "marka adı + boş içerik" olarak depolanır.
- **Görsel-içi metin.** Anlam taşıyan cümle bir hero görseline gömülüyse, crawler için o sayfa "bir görsel + alt etiketi"dir. Mesajın kendisi makineye görünmez. Bu, Gonet'in text-as-text disiplininin yasakladığı tam olarak şeydir.
- **Anlamsız div çorbası.** `<div>` yığını sayfanın neresinin başlık, neresinin gövde, neresinin gezinme olduğunu söylemez. Landmark olmadan LLM içeriği parçalara (chunk) ayırırken yanlış sınırlar çizer; cevap yanlış bağlamla çıkar.

Aynı üç sorun insan tarafında da bedel ödetir: JS-ağır sayfa First Contentful Paint'i geciktirir, görsel-içi metin ekran okuyucuya ve mobil kullanıcıya ulaşmaz, semantik olmayan yapı erişilebilirliği bozar. Yani HTML-first, iki ayrı optimizasyon değil — tek bir disiplinin iki çıktısıdır.

## Text-as-text: anlamın birincil taşıyıcısı DOM'dur

Kural tek cümle: **anlam taşıyan her metin gerçek DOM text olmalı, görsel sadece destekleyici rolde kalmalı.** Bir sosyal medya post görselinde söz görselin parçası olabilir — ama o sözün caption olarak DOM'da yazılı, görselin alt etiketinin descriptive olması gerekir.

```html
<!-- KÖTÜ: mesaj görselin içinde, bot okumaz -->
<img src="post.jpg">

<!-- İYİ: anlam DOM'da, görsel dekoratif -->
<img src="post.jpg" alt="Söylediklerin karşıdakinin anladığı kadardır — Mevlana">
<figcaption>Mevlana Celaleddin-i Rumi · 13. yüzyıl</figcaption>
<p>Bu içerik, AI çağında iletişimin değişmeyen yönünü vurgular.</p>
```

Bu disiplin, extraction-readiness'in üç ilkesiyle birleşince güç kazanır: cevabı paragrafın başına koy (front-loading), her cümleyi tek-iddialı ve kendi başına anlaşılır yaz (atomic), başlıkları kullanıcının arayacağı soru formatında kur. DOM'da gerçek metin + bu üç ilke = LLM'in yüksek-güvenle alıntılayabileceği yapı.

## Gonet kendi sitesinde uyguluyor

Disiplini satmadan önce kendi üzerimizde doğruladık. Bu hafta (2026-06-11) gonet.com.tr üzerinde 9-ajan'lı, 5 eksenli (HTML · CSS · mobil · AEO · güvenlik + adversarial doğrulama) tam teknik denetim yapıldı. HTML-first açısından doğrulanan somut bulgular:

- **Her sayfada tek `<h1>`** ve atlamasız heading hiyerarşisi (h1 → h2 → h3, seviye atlamadan).
- **Semantic landmark'lar** doğrulandı: `<header>`, `<nav>`, `<main>`, `<footer>` gerçek rolleriyle var.
- **%100 `img alt`** kapsaması — görsel-içi metin yasak, alt etiketleri descriptive.
- Mobil ve desktop render'ı temiz; denetimde mobil ekseni 85, AEO ekseni 78 skorla geçti.

Aynı denetim açıkları da bulup aynı oturumda canlıya kapattı (örneğin og:image 404 ve bir kontrast ihlali) — yani HTML-first bir "kurulup unutulan" durum değil, ölçülen ve sürdürülen bir disiplin. Bu, extraction-readiness ile text-as-text'in tek sayfada birleştiği canlı vitrin.

## Extraction-ready HTML kontrol listesi

Sitenizi hem kullanıcı hem LLM crawler için ikiye katlamak istiyorsanız, somut yapılacaklar:

- **Tek `<h1>` / sayfa.** Atlamasız heading hiyerarşisi (h2'den h4'e atlama yok).
- **Semantic landmark kullan:** `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` — `<div>` çorbası değil.
- **Anlam taşıyan tüm metin DOM'da.** Görsel-içi metni yasakla; görseli dekoratif role düşür.
- **Her `<img>`'da descriptive `alt`.** Boş veya jenerik alt ("görsel-1") değil, içeriği anlatan metin.
- **İçerik ilk HTML yanıtında gelsin.** Kritik metin client-side JS render'ına bağımlı olmasın (server-render / static).
- **Cevabı öne al (front-loading).** Önemli bilgi paragrafın ilk cümlesinde.
- **Atomic cümleler.** Her cümle tek iddia, kendi başına anlaşılır — cümleler arası "bu durum" gibi anaphora yok.
- **Soru-formatlı başlıklar.** `## Garanti Bilgileri` yerine `## Garanti süresi ne kadar?` → FAQPage schema'ya doğal uyar.
- **Minimal JS.** Etkileşim için JS, içerik taşımak için değil. Core Web Vitals (FCP, LCP) bunun ödülü.
- **AI crawler erişimi açık.** robots.txt'te GPTBot, ClaudeBot, CCBot, PerplexityBot ve retrieval bot'ları engellenmemiş.

Bu listenin tamamı bir denetimle objektif olarak ölçülebilir. Sitenizin LLM motorları tarafından nasıl çıkarıldığını görmek isterseniz, Gonet'in [AEO/GEO denetim hizmeti](https://gonet.com.tr/aeo-geo-denetimi) tam olarak bu eksenleri puanlar; nasıl bir rapor çıktığını görmek için [örnek raporu](https://gonet.com.tr/aeo-geo-denetimi/ornek-rapor) inceleyebilirsiniz — Gonet kendi sitesindeki bulguları (açıklar dahil) gizlemeden yayınladı.

## Sık sorulan sorular

**HTML-first, modern JavaScript framework'leri kullanamam mı demek?**
Hayır. HTML-first, içeriğin ilk HTML yanıtında gelmesi demektir — framework kullanabilirsiniz, yeter ki server-side render veya static generation ile metin DOM'da hazır olsun. Etkileşim için JS serbest; içerik taşımak için değil.

**Görsel-içi metin neden bu kadar kritik bir sorun?**
Çünkü LLM crawler'lar HTML parse eder, görsel OCR yapmaz. Bir hero görseline gömülü cümle, crawler için "bir görsel"dir; mesaj makine için görünmez. Sonuç: sayfa LLM eğitim setine "marka adı + boş içerik" olarak girer, citation surface sıfırlanır.

**HTML-first gerçekten kullanıcı sayısını artırır mı, yoksa sadece SEO mu?**
İkisi birden. 2026-06-11'de Hacker News'te öne çıkan bir vaka, HTML-first geçişle kullanıcı sayısının ikiye katlandığını raporladı; mekanizma hız (Core Web Vitals) ve erişilebilirlik. Aynı yapı LLM crawler'ı için de extraction-ready olduğundan kazanç çift yönlüdür.

**Sitemin extraction-ready olup olmadığını nasıl ölçerim?**
Bir AEO/GEO denetimiyle: tek-h1, heading hiyerarşisi, semantic landmark, img alt kapsaması ve JS-render bağımlılığı objektif olarak puanlanabilir. Gonet'in denetim hizmeti bu eksenleri 5 katmanda ölçer ve crawler'ların sitenizi nasıl gördüğünü gösterir.

---

**Kaynaklar:**
- [Building an HTML-first site doubled our users overnight (Hacker News, 2026-06-11)](https://news.ycombinator.com/)
- [Show HN: Meadow Notes — Markdown graph'lardan microsite (2026-06-11)](https://news.ycombinator.com/)
- [MDN: HTML semantic elements & document structure](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)
- [Gonet — AEO/GEO Denetim Örnek Raporu](https://gonet.com.tr/aeo-geo-denetimi/ornek-rapor)

*Bu yazı Gonet ekibi tarafından, kendi sitesinde uygulanan text-as-text ve extraction-readiness disiplininin canlı denetim bulgularına dayanılarak hazırlanmıştır. Gonet, İzmir'in ilk AI ajansı ve Türkiye'nin ilk 3 Google Partner ajansından biridir; AEO/GEO denetimi ve Creative AI hizmetleriyle markaların hem kullanıcı hem yapay zekâ motorları nezdindeki görünürlüğünü mühendislik disipliniyle artırır.*
