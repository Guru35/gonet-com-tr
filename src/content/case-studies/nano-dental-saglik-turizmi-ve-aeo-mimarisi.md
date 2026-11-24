---
title: "Nano Dental — Çok Şubeli Sağlık Turizmi Web Mimarisi, Ortak CRM ve AEO/GEO Dönüşümü"
description: "Aydın Didim ve İzmir Bornova'daki Nano Dental klinikleri için kurulan iki web sitesi (nanodental.com.tr ve nanodental.co.uk), ortak Directus CRM ve AEO/GEO altyapısı."
client: "Nano Dental Clinic (Aydın Didim & İzmir Bornova)"
industry: "Sağlık Turizmi / Ağız ve Diş Sağlığı"
services:
  - "Web mimarisi (Astro SSG)"
  - "Teknik SEO & AEO/GEO"
  - "Schema.org JSON-LD & llms.txt"
  - "Ortak Directus CMS & Şube İzoleli CRM"
  - "Güvenlik sertleştirme (CSP/HSTS/UK GDPR)"
year: 2026
results:
  - metric: "WebP görsel optimizasyonu"
    value: "57,21 MB → 13,05 MB (-%77,2), ilk ekran ~5 kat hızlı"
  - metric: "İki site tek yönetim"
    value: "nanodental.com.tr + nanodental.co.uk ortak Directus paneli & otomatik yayın"
  - metric: "Güvenlik ve tarayıcı hijyeni"
    value: "0 CSP/Console uyarısı, HSTS, UK GDPR ve şube bazlı CRM izolasyonu"
  - metric: "Yapay zeka arama uyumu"
    value: "Kanonik Schema.org, /llms.txt ve 2 katmanlı dijital altyapı künyesi"
lang: tr
draft: false
---

## Bağlam

Aydın Didim ve İzmir Bornova'da iki şubeyle hizmet veren Nano Dental, hem Türkiye'deki hastalara (`nanodental.com.tr`) hem de Birleşik Krallık başta olmak üzere yurt dışı sağlık turizmi hastalarına (`nanodental.co.uk`) ulaşan çift dilli bir dijital yapıya ihtiyaç duyuyordu. Mevcut dağınık form ve içerik süreçleri yerine; yüksek hız, katı güvenlik, şube bazlı hasta takibi ve yapay zeka arama motorlarında (AEO/GEO) doğrulanabilir bir varlık mimarisi kuruldu.

## Çözüm

Gonet, iki web sitesini tek merkezden yönetilen modern bir dijital altyapıda birleştirdi:

- **İki Site, Tek İçerik ve CRM Merkezi:** `panel.nanodental.com.tr` üzerinde Directus tabanlı merkezi yönetim kuruldu. Her iki sitenin formları ve fiyat hesaplayıcıları doğrudan `crm_leads` akışına bağlandı; Didim (`info@nanodental.com.tr`) ve Bornova (`bornova@nanodental.com.tr`) şubeleri yalnız kendi hastalarını görebilecek şekilde rol ve politika bazlı izole edildi.
- **Otomatik Yeniden Derleme:** Panelde içerik veya duyuru bandı güncellendiğinde Directus Flow her iki siteyi (`nanodental.com.tr` ve `nanodental.co.uk`) Coolify üzerinden otomatik olarak yeniden derler.
- **Performans ve Medya Optimizasyonu:** `nanodental.co.uk` üzerindeki 354 görsel WebP'ye dönüştürülerek medya boyutu **57,21 MB → 13,05 MB (-%77,2)** seviyesine indirildi ve ekran altı görsellere tembel yükleme (`loading="lazy"`) eklendi.
- **Güvenlik Sertleştirme ve UK GDPR:** HSTS, sıkı `Content-Security-Policy` (tarayıcıda **0 CSP/Console uyarısı**), bot korumaları ve Birleşik Krallık hastaları için açık rıza / çerez uyumu uygulandı.
- **AEO / GEO ve 2 Katmanlı Dijital Altyapı Künyesi:** Site geneli dış footer linki yerine her iki sitede sayfa bazlı `MedicalOrganization`, `Dentist`, `FAQPage`, `WebSite` (`creator` → `https://gonet.com.tr/#organization`) yapısal verisi, `/llms.txt` ve site içi dijital altyapı künye sayfaları yayına alındı.

## Canlı Pilot Bağlantıları

- Türkiye & Çift Dilli Klinik Sitesi: [nanodental.com.tr](https://nanodental.com.tr/) · [Dijital Altyapı Künyesi](https://nanodental.com.tr/dijital-altyapi/)
- Birleşik Krallık Sağlık Turizmi Sitesi: [nanodental.co.uk](https://nanodental.co.uk/) · [Digital Infrastructure Colophon](https://nanodental.co.uk/digital-infrastructure/)

## Sonuç

- Her iki sitede form gönderimleri tek şube-izoleli CRM'de toplandı ve eski harici form bağımlılıkları tamamen kaldırıldı.
- Yapay zeka arama botları (`Googlebot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`) için temiz erişim (`HTTP 200`), `/llms.txt` ve kanonik Schema.org varlık bağlantısı sağlandı.
- Gonet'in **2 katmanlı müşteri dijital altyapı künyesi** standardının ilk iki canlı pilotu eksiksiz devreye alındı.
