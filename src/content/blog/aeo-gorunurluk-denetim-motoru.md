---
title: "Yapay zeka motorlarında görünürlüğü ölçen denetim aracını geliştirdik"
description: "ChatGPT, Claude, Perplexity gibi AI cevap motorlarının bir siteyi ne kadar \"gördüğünü\" ölçen deterministik bir denetim aracı kurduk — arşiv varlığı + bağlantı-merkeziyeti sinyalleriyle skorlu rapor."
h1: "AI seni görüyor mu?"
published: 2026-07-22
author:
  name: "Gonet"
  role: "İzmir'in ilk AI ajansı — Geliştirme Günlüğü"
category: "Geliştirme Günlüğü"
tags: ["aeo", "geo", "ai-gorunurluk"]
sliderLines:
  - AI SENİ
  - GÖRÜYOR
  - MU?
sliderEtiket: "AEO/GEO"
ogImage: "/blog/blog-aeo-gorunurluk-denetim-motoru.jpg"
ogImageLight: "/blog/blog-aeo-gorunurluk-denetim-motoru-light.jpg"
draft: false
---

Bir web sitesinin yapay zeka cevap motorlarında ne kadar "görünür" olduğunu ölçmek, klasik arama motoru optimizasyonundan farklı bir iş. ChatGPT, Claude veya Perplexity bir markayı yanıtlarına alıyor mu, yoksa görmezden mi geliyor? Bu soruyu tahminle değil ölçümle yanıtlamak için, bir sitenin AI motorları tarafından bulunabilirliğini deterministik biçimde puanlayan bir denetim aracı geliştirdik.

Araç, bir sitenin arşivlerde ne kadar yer ettiğine ve web üzerindeki bağlantı ağının merkezinde durup durmadığına bakarak skorlu bir rapor üretiyor. Böylece "AI beni görüyor mu?" sorusu, üzerinde çalışılabilir somut bir tabloya dönüşüyor — nerede güçlüsün, nerede görünmez kalıyorsun.

## Sık sorulan sorular

**AI görünürlük denetimi ile klasik SEO raporu arasındaki fark nedir?**
Klasik SEO raporu Google sıralamasına bakar: anahtar kelime pozisyonu, backlink profili, sayfa hızı. AI görünürlük denetimi ise sitenin cevap motorları tarafından bulunabilir ve alıntılanabilir olup olmadığını ölçer. Bir site Google'da ilk sırada olup yapay zekâ cevaplarında hiç görünmeyebilir; bu iki ölçüm birbirinin yerine geçmez.

**Skorum düşük çıkarsa ne yapmam gerekir?**
Önce hangi katmanda takıldığınıza bakılır. Sorun erişim katmanındaysa (tarayıcılar siteye giremiyorsa) çözüm teknik ve hızlıdır. Arşiv varlığı düşükse bu genellikle zaman ve bağlantı otoritesi gerektirir, kısa yolu yoktur. İçerik çıkarıma uygun değilse düzenleme işi devreye girer. Skorun kendisi değil, hangi bileşenin düşük olduğu yol gösterir.

**Ölçümü ne sıklıkla tekrarlamak gerekir?**
Tek ölçüm bir fotoğraftır, asıl değerli olan eğilimdir. Arşiv ve bağlantı sinyalleri yavaş değiştiği için üç aylık aralıklar çoğu marka için yeterlidir. Sitede yapısal bir değişiklik yapıldığında (alan adı taşıma, yeniden tasarım, robots kuralı değişikliği) ölçümü beklemeden tekrarlamak gerekir.
