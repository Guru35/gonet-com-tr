---
title: "Yapay zeka motorlarında görünürlüğü ölçen denetim aracını geliştirdik"
description: "Yapay zekâ cevap motorlarının bir siteyi görüp görmediğine dair sinyalleri (arşiv varlığı, bağlantı merkeziyeti) ölçen deterministik bir denetim aracı kurduk — sonuç skorlu bir rapor."
h1: "AI seni görüyor mu?"
published: 2026-07-22
author:
  name: "Gonet"
  role: "İzmir merkezli hibrit Creative AI ajansı — Geliştirme Günlüğü"
category: "Geliştirme Günlüğü"
tags: ["aeo", "geo", "ai-gorunurluk"]
sliderLines:
  - AI SENİ
  - GÖRÜYOR
  - MU?
sliderEtiket: "AEO/GEO"
ogImage: "/blog/blog-aeo-gorunurluk-denetim-motoru.jpg"
ogImageLight: "/blog/blog-aeo-gorunurluk-denetim-motoru-light.jpg"
updated: 2026-11-26
draft: false
---

Bir web sitesinin yapay zeka cevap motorlarında ne kadar "görünür" olduğunu ölçmek, klasik arama motoru optimizasyonundan farklı bir iş. Bir cevap motoru markayı yanıtlarına alıyor mu, yoksa görmezden mi geliyor? Bunu doğrudan bilemeyiz; ama motorların bir siteyi görmesiyle ilişkili sinyalleri, yani arşiv varlığını ve bağlantı merkeziyetini, tahminle değil ölçümle izleyebiliriz. Bunun için bir sitenin bu sinyallerini deterministik biçimde puanlayan bir denetim aracı geliştirdik.

Araç, bir sitenin arşivlerde ne kadar yer ettiğine ve web üzerindeki bağlantı ağının merkezinde durup durmadığına bakarak skorlu bir rapor üretiyor. Böylece "AI beni görüyor mu?" sorusu, üzerinde çalışılabilir somut bir tabloya dönüşüyor — nerede güçlüsün, nerede görünmez kalıyorsun.

## Örnek çıktı ve çalışma akışı

Denetim motorumuz [seo.gonet.com.tr](https://seo.gonet.com.tr) üzerinde bir alan adı tarandığında tahmin yerine deterministik sinyaller üretir. Örnek bir kurumsal site çıktısı şu 4 başlıkta raporlanır:

```text
Alan adı: ornekmarka.com.tr
1. Erişim & Bot İzni : GPTBot=İzinli | ClaudeBot=İzinli | PerplexityBot=Engelli (robots.txt)
2. Yapısal Veri      : Organization=Var | Service=Eksik | FAQPage=0 sayfa
3. Arşiv & Merkeziyet: CommonCrawl/Wayback sinyali=Orta | Harici atıf açığı=Yüksek
4. Öncelikli Aksiyon : robots.txt PerplexityBot izni aç + Service/FAQPage şeması ekle
```

Bu çıktı doğrudan [panel.gonet.com.tr](https://panel.gonet.com.tr) üzerinden takip edilen iyileştirme görevlerine dönüştürülür. Detaylı teknik inceleme için [AEO/GEO denetimi](/aeo-geo-denetimi) sayfamızı inceleyebilirsiniz.

## Sık sorulan sorular

**AI görünürlük denetimi ile klasik SEO raporu arasındaki fark nedir?**
Klasik SEO raporu Google sıralamasına bakar: anahtar kelime pozisyonu, backlink profili, sayfa hızı. AI görünürlük denetimi ise sitenin cevap motorları tarafından bulunabilir ve alıntılanabilir olup olmadığını ölçer. Bir site Google'da ilk sırada olup yapay zekâ cevaplarında hiç görünmeyebilir; bu iki ölçüm birbirinin yerine geçmez.

**Skorum düşük çıkarsa ne yapmam gerekir?**
Önce hangi katmanda takıldığınıza bakılır. Sorun erişim katmanındaysa (tarayıcılar siteye giremiyorsa) çözüm teknik ve hızlıdır. Arşiv varlığı düşükse bu genellikle zaman ve bağlantı otoritesi gerektirir, kısa yolu yoktur. İçerik çıkarıma uygun değilse düzenleme işi devreye girer. Skorun kendisi değil, hangi bileşenin düşük olduğu yol gösterir.

**Ölçümü ne sıklıkla tekrarlamak gerekir?**
Tek ölçüm bir fotoğraftır, asıl değerli olan eğilimdir. Arşiv ve bağlantı sinyalleri yavaş değiştiği için üç aylık aralıklar çoğu marka için yeterlidir. Sitede yapısal bir değişiklik yapıldığında (alan adı taşıma, yeniden tasarım, robots kuralı değişikliği) ölçümü beklemeden tekrarlamak gerekir.
