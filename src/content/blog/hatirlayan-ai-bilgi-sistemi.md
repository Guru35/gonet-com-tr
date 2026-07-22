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
