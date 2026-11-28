---
title: "Sitenin içeriğine hâkim, marka diline sadık AI sohbet asistanı"
description: "Herhangi bir web sitesine gömülen, o sitenin hizmetlerini bilen ve ziyaretçiyle o markanın diliyle konuşan bir AI sohbet asistanı modülü geliştirdik."
h1: "Siten konuşsun"
published: 2026-07-06
author:
  name: "Gonet"
  role: "İzmir merkezli hibrit Creative AI ajansı — Geliştirme Günlüğü"
category: "Geliştirme Günlüğü"
tags: ["ai", "chatbot", "urun"]
sliderLines:
  - SİTEN
  - KONUŞSUN
sliderEtiket: "Ürün/AI"
ogImage: "/blog/blog-siten-konussun-ai-sohbet.jpg"
ogImageLight: "/blog/blog-siten-konussun-ai-sohbet-light.jpg"
updated: 2026-11-26
draft: false
---

Bir web sitesine sohbet kutusu eklemek kolay; zor olan, o kutunun gerçekten o siteyi bilmesi. Çoğu hazır sohbet aracı genel cevaplar verir, markanın hizmetlerinden ya da dilinden habersizdir.

Biz, gömüldüğü sitenin içeriğine hâkim ve o markanın diliyle konuşan bir AI sohbet asistanı modülü geliştirdik. Ziyaretçi soru sorduğunda, asistan o sitenin hizmetlerini bilerek ve markanın tonunu koruyarak yanıt veriyor — genel bir bot değil, sitenin kendi sesi gibi.

## Örnek çıktı ve çalışma akışı

Asistan modülü siteye gömüldüğünde yalnızca markanın onaylı sayfalarını indeksler. Ziyaretçi sorusu geldiğinde çalışma akışı şu şekilde işler:

```text
Ziyaretçi: "Sağlık turizmi için İngiltere pazarına reklam yönetiyor musunuz?"
1. Kapsam Kontrolü : /saglik-turizmi-performans-pazarlama + Nano Dental vakası eşleşti
2. Yanıt Üretimi   : Markanın diliyle net özet + ilgili vaka bağlantısı
3. Yönlendirme     : Ön görüşme talebi için /iletisim veya panel.gonet.com.tr akışı
```

Bu yapı sayesinde halüsinasyon riski sınırlandırılır ve ziyaretçi soruları doğrudan ölçülebilir dönüşüm akışına bağlanır. Kurumsal entegrasyon için [iletişim](/iletisim) sayfamızdan bize ulaşabilirsiniz.

## Sık sorulan sorular

**Genel yapay zekâ sohbet araçlarından farkı nedir?**
Genel bir asistan dünya hakkında konuşur ama sizin fiyat listenizi, çalışma sürecinizi veya hizmet kapsamınızı bilmez. Bu modül yalnızca o sitenin içeriğine dayanarak cevap verir ve markanın diliyle konuşur. Dar kapsam bir kısıt değil, tasarım tercihidir: ziyaretçi genel bilgi değil, o markaya dair somut cevap arar.

**Yanlış veya uydurma bilgi verme riski var mı?**
Risk tamamen sıfırlanamaz, bu yüzden kurgu bunu sınırlamak üzerine kuruludur. Asistan cevaplarını sitedeki mevcut içerikle sınırlar, kapsamı dışındaki sorularda tahmin yürütmek yerine ilgili sayfaya veya iletişim kanalına yönlendirir. Fiyat, taahhüt ve yasal konu gibi hassas başlıklarda kesin ifade üretmemesi bilinçli bir kısıtlamadır.

**Kurulumu ne kadar sürer, siteyi yavaşlatır mı?**
Mevcut bir siteye eklenmesi genellikle günler mertebesindedir; asıl zaman içeriğin derlenmesi ve marka dilinin tanımlanmasında geçer. Sayfa açılışını yavaşlatmaması için asistan ana içerikten sonra yüklenir; ziyaretçi etkileşime girene kadar sayfa performansına ölçülebilir bir yük bindirmez.
