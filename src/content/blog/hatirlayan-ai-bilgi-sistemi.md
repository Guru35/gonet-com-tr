---
title: "Projeleri oturumlar arası hatırlayan AI-yerel bilgi tabanı mimarisi"
description: "Her projenin bilgisini sade markdown dosyalarında tutan, oturumlar arası hatırlayan, kendini derleyen bir AI çalışma hafızası kurduk (Karpathy LLM-Wiki deseni)."
h1: "Hatırlayan AI"
published: 2026-07-13
author:
  name: "Gonet"
  role: "İzmir'in ilk AI ajansı — Geliştirme Günlüğü"
category: "Geliştirme Günlüğü"
tags: ["ai", "mimari", "karpathy"]
sliderLines:
  - HATIRLAYAN
  - AI
sliderEtiket: "Mimari"
ogImage: "/blog/blog-hatirlayan-ai-bilgi-sistemi.jpg"
ogImageLight: "/blog/blog-hatirlayan-ai-bilgi-sistemi-light.jpg"
draft: false
---

Yapay zekayla çalışırken en sık yaşanan sorun, her yeni oturumda "nerede kalmıştık?"a geri dönmek. AI, bir önceki konuşmayı kendiliğinden hatırlamaz; her seferinde bağlamı sıfırdan kurmak gerekir.

Biz bunu, her projenin bilgisini sade metin dosyalarında tutan, oturumlar arası hatırlayan ve kendini düzenli tutan bir çalışma hafızası ile çözdük. Andrej Karpathy'nin "LLM-Wiki" deseninden ilham alan bu yapı sayesinde AI, her projenin geçmişini, kararlarını ve sıradaki adımını biliyor — sohbet baştan başlamıyor, kaldığı yerden devam ediyor.

## Sık sorulan sorular

**Neden veritabanı değil de düz markdown dosyaları?**
Çünkü dosyalar hem insanın hem modelin doğrudan okuyabildiği tek ortak formattır. Veritabanı bir arayüz gerektirir, taşınması zordur ve on yıl sonra açılacağının garantisi yoktur. Düz metin dosyaları sürüm takibiyle çalışır, her satırın ne zaman neden değiştiği görünür ve hiçbir özel araca bağımlı değildir. Bilgi birikimi uzun vadeli bir varlıksa, formatının da uzun ömürlü olması gerekir.

**Normal not tutmaktan farkı nedir?**
Notlar birikir ama kendiliğinden düzenlenmez; zamanla aranamaz bir yığına dönüşür. Bu sistemde her yeni kaynak işlendiğinde ilgili sayfalar güncelleniyor, çelişen bilgi sessizce üzerine yazılmıyor, ayrıca işaretleniyor. Sonuç, not koleksiyonu değil, üzerine ekledikçe değeri artan bir bilgi tabanı — her oturum bir öncekinin üstüne biniyor.

**Hangi tür işlerde gerçekten fayda sağlar?**
Uzun soluklu ve çok oturumlu işlerde: süregiden projeler, uzmanlık alanı takibi, müşteri bilgisi biriktirme. Tek seferlik kısa işlerde kurulum maliyeti getirisini karşılamaz. Ayırt edici soru şudur: "üç ay sonra bu konuya geri döndüğümde, o günkü gerekçeleri hatırlamam gerekecek mi?" Cevap evetse sistem işe yarar.
