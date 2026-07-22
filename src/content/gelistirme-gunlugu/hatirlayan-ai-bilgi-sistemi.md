---
title: Projeleri oturumlar arası hatırlayan AI-yerel bilgi tabanı mimarisi
sliderLines:
  - HATIRLAYAN
  - AI
summary: Her projenin bilgisini sade markdown dosyalarında tutan, oturumlar arası hatırlayan, kendini derleyen bir AI çalışma hafızası kurduk (Karpathy LLM-Wiki deseni).
etiket: Mimari
published: 2026-07-13
draft: false
---

Yapay zekayla çalışırken en sık yaşanan sorun, her yeni oturumda "nerede kalmıştık?"a geri dönmek. AI, bir önceki konuşmayı kendiliğinden hatırlamaz; her seferinde bağlamı sıfırdan kurmak gerekir.

Biz bunu, her projenin bilgisini sade metin dosyalarında tutan, oturumlar arası hatırlayan ve kendini düzenli tutan bir çalışma hafızası ile çözdük. Andrej Karpathy'nin "LLM-Wiki" deseninden ilham alan bu yapı sayesinde AI, her projenin geçmişini, kararlarını ve sıradaki adımını biliyor — sohbet baştan başlamıyor, kaldığı yerden devam ediyor.
