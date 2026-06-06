---
title: "E-mail Marketing Sequence Tasarımı: Behavioral Trigger ve Segmentasyon"
description: "Behavioral trigger tabanlı e-mail sequence'ları tasarlıyoruz. Segmentasyon, deliverability optimizasyonu ve otomasyon mimarisiyle dönüşüm odaklı e-posta pazarlama."
h1: "E-mail Marketing Sequence Tasarımı: Behavioral Trigger ve Segmentasyon"
categorySlug: "icerik-yaratici"
categoryName: "İçerik & Yaratıcı"
skillSlug: "e-mail-marketing-sequence-tasarimi"
skillLevel: "İleri"
keywords:
  - e-mail-marketing
  - sequence-tasarımı
  - behavioral-trigger
  - segmentasyon
  - deliverability
  - abandon-cart-sequence
  - onboarding-sequence
  - winback-sequence
  - marketing-automation
  - klaviyo
  - hubspot
  - esp-platformları
  - lifecycle-marketing
  - email-personalization
  - spam-score-optimizasyonu
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Abandon cart sequence'ında kaç e-posta optimal ve hangi sırayla gönderilmeli?"
    a: "Gonet standart uygulaması 3 e-postalıdır: (1) İlk e-posta sepet terk sonrası 1-2 saat içinde gönderilir, hatırlatma amaçlıdır, CTA 'Sepete Dön'. (2) İkinci e-posta 24 saat sonra gönderilir, %10-15 indirim veya ücretsiz kargo gibi teşvik içerir, aciliyet vurgulu CTA. (3) Üçüncü e-posta 72 saat sonra gönderilir, sosyal kanıt (müşteri yorumları), son şans mesajı ve güçlü CTA kombinasyonudur. Test datalarına göre 4. e-posta genelde marjinal getiri sağlar, 3 e-posta en yüksek ROI verir. Sequence açılma oranı ortalama %40-50, tıklama %15-20, kurtarma %15-40 arasıdır."
  - q: "Deliverability sorunları sequence performansını nasıl etkiler ve nasıl önlenir?"
    a: "Deliverability düşükse (inbox placement <%80) sequence e-postaları spam klasörüne gider veya hiç ulaşmaz, tüm çaba boşa gider. Gonet önleme stratejisi 4 katmanlıdır: (1) SPF, DKIM, DMARC authentication kayıtları DNS'e eklenir, gönderici doğrulaması sağlanır. (2) Dedicated IP kullanımı (yüksek hacimde) veya shared IP reputation izleme. (3) Liste hijyeni: 90+ gün inaktif kullanıcılar re-engagement sequence'a alınır, yanıt vermeyenler listeden çıkarılır; hard bounce hemen temizlenir. (4) Engagement-based segmentation: yüksek etkileşimli segment önce gönderilir, IP reputasyonu korunur. Mail Tester ve GlockApps ile spam skorları düzenli test edilir, %95+ inbox placement hedeflenir."
  - q: "SaaS onboarding sequence'ında hangi e-postalar kullanıcıyı trial-to-paid'e taşır?"
    a: "Gonet SaaS onboarding sequence'ı 5-7 e-postalıdır, trial süresine (7/14/30 gün) göre ayarlanır: (1) Welcome e-postası: ilk adımlar, dashboard turu linki, destek kanalları. (2) Feature spotlight (2-3 e-posta): her biri kritik bir özelliği anlatır, use case + video/gif + CTA 'Hemen Dene'. (3) Value moment tetikleyici: kullanıcı ilk anlamlı eylemi gerçekleştirmedi mi? Hatırlatma + rehber. (4) Sosyal kanıt e-postası: case study, müşteri hikayesi, rakamlar. (5) Trial sonu yaklaşırken (3-5 gün önce): aciliyet, özel indirim, upgrade CTA. Trial boyunca behavioral trigger'lar eklenir (kullanıcı X özelliği kullandı → ilgili advanced feature maili). Sequence conversion'ı %20-35 artırır."
  - q: "Segmentasyon ile personalization arasındaki fark nedir ve sequence'larda nasıl kullanılır?"
    a: "Segmentasyon kullanıcıları gruplara ayırmaktır (örn. 'son 30 günde alışveriş yapanlar', 'sepet değeri >500 TL olanlar'); personalization ise o grup içinde her kullanıcıya özel içerik sunmaktır (örn. e-postada kullanıcının adı, son baktığı ürün, önerilen kategori). Sequence'larda segmentasyon hangi akışa gireceğini belirler (yeni müşteri → welcome sequence, inaktif müşteri → winback sequence), personalization ise o akış içindeki mesajları dinamikleştirir (Klaviyo/HubSpot'ta merge tag'lerle 'Merhaba {{first_name}}, {{last_viewed_product}} seni bekliyor'). Gonet her sequence için 3-5 ana segment tanımlar, içeride 5-10 personalization noktası kullanır; açılma oranı %15-25, tıklama %10-20 artar."
  - q: "Hangi ESP platformu hangi kullanım senaryosu için tercih edilir?"
    a: "Gonet ESP seçimini müşteri ihtiyacına göre yapar: (1) Klaviyo: e-commerce için ideal, Shopify/WooCommerce entegrasyonu güçlü, behavioral segmentation ve SMS entegrasyonu var, maliyet orta-yüksek. (2) HubSpot: CRM entegreli lifecycle marketing gerekiyorsa, B2B ve SaaS için uygun, lead scoring + sequence + CRM tek platformda, maliyet yüksek. (3) Mailchimp: küçük-orta ölçek, basit sequence ihtiyacı, düşük maliyet, deliverability orta seviye. (4) ActiveCampaign: kompleks otomasyon ihtiyacı, güçlü conditional split'ler, orta maliyet. (5) SendGrid/Mailgun: transactional e-posta + yüksek hacim, developer-friendly API, deliverability yüksek. Gonet portföyünde e-commerce Klaviyo, SaaS HubSpot, B2B hizmet ActiveCampaign ağırlıktadır; her platformda sertifikalı uzmanlarımız vardır."
---

## E-mail marketing sequence tasarımı nedir?

E-mail marketing sequence tasarımı, kullanıcı davranışlarına (behavioral trigger) dayalı otomatik e-posta dizilerinin stratejik planlanması, yazılması ve teknik kurulumudur. Klasik toplu e-posta gönderiminden farklı olarak sequence'lar, bir tetikleyici olaya (kayıt, terk edilen sepet, ürün incelemesi, indirme) yanıt olarak belirli zaman aralıklarında kişiselleştirilmiş mesajlar gönderir.

Gonet'te sequence tasarımı üç katmanda yürür: segmentasyon (hangi kitleye, ne zaman), içerik mimarisi (kaç e-posta, hangi mesaj sıralaması, CTA stratejisi) ve deliverability optimizasyonu (spam skorları, authentication, engagement rate). ESP (Email Service Provider) platformlarında (HubSpot, Klaviyo, Mailchimp, ActiveCampaign) kurulum, A/B testler ve performans izleme de sürecin parçasıdır.

## Neden kritik?

**Lifecycle marketing'in omurgası**: Soğuk lead'den müşteriye, müşteriden savunucuya (advocacy) tüm yolculuk sequence'larla yönetilir. Welcome serisi, onboarding, re-engagement, upsell, winback — her aşama kendi dizisini gerektirir.

**ROI ölçülebilir ve yüksek**: Gonet portföyünde e-commerce müşterilerinde abandon cart sequence'ları %15-40 kurtarma oranı, SaaS müşterilerinde trial-to-paid onboarding %20-35 conversion artışı sağladı. Ölçüm direkt: açılma, tıklama, dönüşüm, gelir.

**Personalization ölçeklenebilir**: 100.000 kullanıcıya aynı anda farklı sequence gönderilebilir — segmentasyon ve trigger mimarisi bunu otomatikleştirir. Behavioral data (sayfa ziyareti, kategori ilgisi, sepet değeri) segmentleri dinamik tutar.

**Deliverability hayati**: En iyi içerik, spam klasöründe işe yaramaz. SPF, DKIM, DMARC authentication, IP reputation yönetimi, engagement-based list hygiene (inaktif temizliği) olmadan sequence'lar etkisiz kalır. Gonet bu katmanı teknik altyapı olarak kurar.

## Gonet yaklaşımı

**1. Trigger mapping ve customer journey audit**: Hangi kullanıcı eylemi (veya eylemsizlik) hangi sequence'ı tetiklemeli? Lead magnet indirme, ürün kategori gezinme, demo talep formu, ilk alışverişten 30 gün sonra — trigger noktalarını CRM/analytics datası üzerinden haritalıyoruz.

**2. Segmentasyon stratejisi**: Demografik (konum, sektör) + behavioral (sayfa ziyaret sıklığı, sepet değeri, son etkileşim tarihi) + lifecycle (yeni abone, aktif müşteri, churn riski) segmentlerini tanımlıyoruz. Klaviyo ve HubSpot'ta dinamik segment filtreleri kuruyoruz.

**3. Sequence copywriting ve CTA design**: Her e-posta bir amaç taşır: bilgi, güven, aciliyet, sosyal kanıt, teklif. Ton kullanıcı yolculuğuna göre değişir (welcome mesajı sıcak, winback mesajı empatik, upsell mesajı değer odaklı). CTA'lar net, tek eylem, A/B test edilir.

**4. Timing ve frequency optimizasyonu**: İlk e-posta kaç saat sonra? İkincisi kaç gün sonra? Kaç e-posta optimal? Gonet benchmark'larından başlar (örn. abandon cart: 1 saat, 24 saat, 72 saat), müşteri datasıyla iterasyon yapar.

**5. Technical setup**: ESP platformunda automation workflow kurulumu, UTM parametreleri (her link izlenebilir), spam score testi (Mail Tester, GlockApps), authentication kontrolü. Transactional e-postalar (sipariş onayı) ayrı IP'den gider.

**6. Deliverability monitoring**: Inbox placement rate (Gmail, Outlook ayrı), bounce rate, spam complaint oranı haftalık izlenir. Liste hijyenini sürekli tutuyoruz: 90 gün inaktif segmenti re-engagement sequence'a alınır, yanıt vermeyenler listeden çıkar.

**7. Performance reporting**: Sequence-level dashboard: açılma, tıklama, dönüşüm, gelir, unsubscribe. Hangi e-posta zayıf performans veriyor? A/B test sırası. Subject line, preheader, CTA rengi, gönderim saati test edilir.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **E-commerce abandon cart oranı >%70** | Sequence %15-40 sepeti kurtarır; ilk e-posta hatırlatma, ikinci indirim/ücretsiz kargo, üçüncü sosyal kanıt + son şans. |
| **SaaS trial-to-paid conversion <%15** | Onboarding sequence kullanıcıyı özelliklerle tanıştırır, value moment'e götürür; %20-35 conversion artışı. |
| **Yeni lead'lerin %60'ı ilk 7 günde soğuyor** | Welcome series ve nurture sequence engagement'ı canlı tutar; eğitici içerik, case study, demo teklifi sırayla sunulur. |
| **Müşteri churn oranı yüksek** | Winback sequence inaktif kullanıcılara özel teklif/içerik gönderir; re-engagement %10-20 arası. |
| **Manuel e-posta gönderimi zaman alıyor** | Otomasyon 1 kez kurulur, sonsuz çalışır; pazarlama ekibi stratejiye odaklanır, operasyonel yük sıfırlanır. |
| **Deliverability düşük (<%80 inbox)** | Authentication + list hygiene + engagement-based segmentation inbox placement'ı %90+ çıkarır. |

## İlgili yetkinlikler

- [Copywriting — conversion odaklı metin](/yetkinlikler/icerik-yaratici/copywriting-conversion)
- [Marketing automation mimarisi](/yetkinlikler/icerik-yaratici/marketing-automation)
- [Customer journey mapping](/yetkinlikler/icerik-yaratici/customer-journey-mapping)
- [A/B testing ve multivariate testler](/yetkinlikler/veri-analiz/ab-testing-multivariate)

## Gonet ile çalışmak

26 yıldır Türkiye'nin dijital pazarlama altyapısını kuruyoruz. E-mail sequence tasarımında trigger mapping'den deliverability izlemeye tam döngüyü yönetiyoruz. Portföyümüzde e-commerce, SaaS, B2B hizmet markaları için yüzlerce sequence çalışıyor. Siz de lifecycle marketing'i otomasyonla ölçeklemek istiyorsanız [iletişime geçin](/iletisim).
