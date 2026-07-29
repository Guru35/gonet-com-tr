---
title: "Bir siteyi baştan sona gezip görsel + teknik sağlığını çıkaran denetim ajanı"
description: "Sayfaları tek komutla dolaşıp her birinin ekran görüntüsü ile yapısal/teknik sağlığını raporlayan, spec bir kez yazılınca sürekli tekrar eden otonom bir kalite denetçisi."
h1: "Otonom QA"
published: 2026-07-19
author:
  name: "Gonet"
  role: "İzmir'in ilk AI ajansı — Geliştirme Günlüğü"
category: "Geliştirme Günlüğü"
tags: ["otomasyon", "qa", "test"]
sliderLines:
  - OTONOM
  - QA
sliderEtiket: "Otomasyon"
ogImage: "/blog/blog-otonom-gorsel-qa-ajani.jpg"
ogImageLight: "/blog/blog-otonom-gorsel-qa-ajani-light.jpg"
draft: false
---

Bir siteyi yayına almadan önce her sayfayı tek tek açıp "düzgün görünüyor mu, bir şey kırılmış mı?" diye kontrol etmek saatler alır ve göz yoruldukça hata kaçar. Bunu bir kez tarif edip sonra sürekli tekrar eden bir ajana devrettik.

Ajan, siteyi baştan sona dolaşıyor, her sayfanın ekran görüntüsünü alıyor ve yapısal/teknik sağlığını raporluyor. Bir kez "neye bakacağını" yazdığınızda, aynı denetimi her seferinde aynı titizlikle tekrarlıyor — insan gözünün yorulup atladığı ayrıntıları kaçırmadan.

## Sık sorulan sorular

**Bu denetim ajanı neyi yakalar, neyi yakalayamaz?**
Yakaladıkları: sayfa açılmıyor veya hata veriyor, görsel bozulmuş, öğeler üst üste binmiş, sayfa başlığı veya açıklaması eksik, bağlantı kırık, yapılandırılmış veri hatalı. Yakalayamadıkları: metnin ikna edici olup olmadığı, tasarımın markaya uygunluğu, içeriğin doğruluğu gibi yargı gerektiren konular. Ajan tutarlılığı denetler, yaratıcı kaliteyi değil.

**Manuel testin yerine tamamen geçer mi?**
Hayır, tekrar eden kısmının yerine geçer. Her yayın öncesi yüzlerce sayfayı elle gezmek hem yavaş hem hataya açıktır; ajan bunu her seferinde aynı titizlikle yapar. Ama yeni bir akışın mantıklı çalışıp çalışmadığına, bir tasarım kararının doğru olup olmadığına insan bakar. Doğru kurgu ikisinin birlikte çalışmasıdır.

**Kaç sayfaya kadar ölçeklenir?**
Yüzlerce sayfalık sitelerde tek çalıştırmayla sonuç alınabiliyor. Sınırlayıcı unsur sayfa sayısından çok her sayfanın yüklenme süresidir. Çok büyük sitelerde tüm siteyi her seferinde taramak yerine kritik şablonlardan örnekleme yapmak daha verimlidir.
