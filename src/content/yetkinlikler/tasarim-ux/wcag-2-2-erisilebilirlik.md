---
title: "WCAG 2.2 Erişilebilirlik Standardı ile Kapsayıcı Dijital Deneyim"
description: "AA+ compliance, klavye navigasyonu, ekran okuyucu uyumu ve kontrast optimizasyonu ile WCAG 2.2 erişilebilirlik standartlarını hayata geçiriyoruz. 26 yıllık deneyim."
h1: "WCAG 2.2 Erişilebilirlik Standardı ile Kapsayıcı Dijital Deneyim"
categorySlug: "tasarim-ux"
categoryName: "Tasarım & UX"
skillSlug: "wcag-2-2-erisilebilirlik"
skillLevel: "İleri"
detailHero: "/yetenekler-images/tasarim-ux/detail-tasarim-wcag.jpg"
keywords:
  - wcag-2.2
  - web-erisilebirligi
  - aa-compliance
  - klavye-navigasyonu
  - ekran-okuyucu
  - screen-reader
  - renk-kontrasti
  - aria-etiketleri
  - semantic-html
  - engelsiz-tasarim
  - kapsayici-ux
  - erişilebilirlik-testi
  - focus-indicator
  - dokunma-hedefi
  - w3c-standartlari
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "WCAG AA ve AAA seviyesi arasındaki fark nedir, çoğu proje için hangisi yeterlidir?"
    a: "WCAG AA seviyesi, yasal zorunlulukların ve kurumsal standartların referans aldığı seviyedir. Kontrast oranı 4.5:1, klavye erişimi, ekran okuyucu uyumu gibi temel gereksinimleri kapsar ve %95+ kullanım senaryosunda erişilebilirliği sağlar. AAA seviyesi ise 7:1 kontrast, işaret dili videoları, 200 kelimeden uzun metinlerde sesli okuma gibi çok daha katı kriterler içerir. Genellikle yalnızca özel sektörlerde (sağlık, eğitim, devlet kritik hizmetleri) veya gönüllü olarak hedeflenir. Gonet projelerinde AA seviyesi standart, AAA seçici kriterlerde (kontrast, form validasyonu) hedeflenir."
  - q: "Ekran okuyucu testleri nasıl yapılır, otomatik araçlar yeterli değil mi?"
    a: "Otomatik araçlar (Axe, WAVE, Lighthouse) yalnızca %30-40 erişilebilirlik sorununu tespit eder; alt metni eksik görsel, hatalı başlık hiyerarşisi gibi. Gerçek ekran okuyucu testi, NVDA (Windows, ücretsiz), JAWS (Windows, ücretli, kurumsal standart) veya VoiceOver (macOS/iOS, varsayılan) ile gerçek kullanıcı senaryolarını simüle eder. Test sırasında mouse kapatılır, yalnızca klavye ve ekran okuyucu komutları kullanılır. Formlar, modallar, dinamik içerik (AJAX yükleme) ve navigasyon özellikle test edilir. Gonet'te her büyük deployment öncesi en az iki farklı ekran okuyucu ile manuel test zorunludur."
  - q: "WCAG 2.2'de 2.1'e göre eklenen en kritik yeni kriter hangisidir?"
    a: "WCAG 2.2'nin en etkili yeni kriteri 2.5.8 Target Size (Minimum) — dokunma hedeflerinin minimum 24×24 CSS piksel olmasıdır (bazı istisnalar hariç). Bu, mobil kullanıcılar ve motor becerileri sınırlı bireyler için kritik. Gonet projelerinde 44×44px hedef kullanırız (Apple ve Material Design standartları). Diğer önemli kriterler: 2.4.11 Focus Not Obscured (odak göstergesi görünür kalmalı), 3.2.6 Consistent Help (yardım mekanizması tüm sayfalarda aynı yerde), 3.3.7 Redundant Entry (önceden girilen bilgiler tekrar istenmemeli). Bu kriterler özellikle SPA ve karmaşık formlar için oyun değiştirici."
  - q: "ARIA etiketleri ne zaman kullanılmalı, semantic HTML yeterli olmadığı durumlar nelerdir?"
    a: "İlk prensip: 'No ARIA is better than bad ARIA'. Semantic HTML5 (nav, button, main) her zaman ARIA'dan önceliklidir. ARIA yalnızca semantic HTML'in yetersiz kaldığı durumlarda kullanılır: (1) Dinamik içerik değişimleri (aria-live bölgeleri, SPA sayfa geçişlerinde), (2) Custom widget'lar (accordion, tabs, modal — role='dialog', aria-expanded), (3) İlişki tanımlama (aria-describedby, aria-labelledby, form hataları için), (4) Durum bildirimi (aria-disabled, aria-current). Örnek: <div role='button'> yerine her zaman <button> kullanılmalı; ancak button içinde loading spinner varsa aria-busy='true' eklenir. Gonet projelerinde ARIA kullanımı kod review'da özellikle denetlenir."
  - q: "Renk kontrastı dışında görme engelliler için başka hangi optimizasyonlar kritik?"
    a: "Kontrast oranı temeldir ancak yeterli değildir. Kritik diğer optimizasyonlar: (1) Bilginin yalnızca renkle iletilmemesi (hata mesajında kırmızı renk + ikon + metin), (2) Focus göstergeleri (klavye ile gezinirken hangi elemanda olduğu açıkça görünmeli, minimum 2px outline), (3) Metin ölçeklendirme (200% zoom'da layout bozulmamalı, text-overflow yerine reflow), (4) Alt text zenginliği (görselin bağlamını anlatan açıklama, dekoratif görseller için alt=''), (5) Başlık hiyerarşisi (H1>H2>H3 mantıksal sıra, ekran okuyucular bu yapıyı içindekiler gibi kullanır). Gonet projelerinde Lighthouse ve manuel zoom testleri her sprint'te yapılır."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "Ilk yayin"
  - date: "2026-06-07"
    type: "enhancement"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Kreatif viz eklendi (process, stat-bars)"
  - date: "2026-06-08"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## WCAG 2.2 erişilebilirlik nedir?

WCAG 2.2 (Web Content Accessibility Guidelines 2.2 - Web İçeriği Erişilebilirlik Kılavuzu 2.2), W3C tarafından yayınlanan ve dijital içeriklerin engelli bireyler için erişilebilir olmasını sağlayan teknik standartlar bütünüdür. WCAG, A, AA ve AAA olmak üzere üç uyumluluk seviyesi tanımlar; AA seviyesi yasal zorunluluklar ve kurumsal standartlar için temel referanstır.

WCAG 2.2, 2023'te yayınlanan son versiyon olarak 2.1'e 9 yeni başarı kriteri eklemiştir. Bunlar arasında mobil cihazlarda dokunma hedefi boyutları, tutarlı yardım mekanizmaları ve gereksiz kimlik doğrulama adımlarının azaltılması yer alır. Klavye navigasyonu (keyboard navigation), tüm işlevlerin yalnızca klavye ile erişilebilir olmasını; ekran okuyucu (screen reader) uyumu, NVDA, JAWS ve VoiceOver gibi yardımcı teknolojilerin içeriği doğru yorumlamasını; renk kontrastı (contrast) ise metin ile arka plan arasında minimum 4.5:1 (normal metin) veya 3:1 (büyük metin) oranını ifade eder.

Gonet'te WCAG 2.2 uyumluluğu, semantic HTML5, ARIA (Accessible Rich Internet Applications) etiketleri, form validation mesajlarının doğru iletilmesi ve odak (focus) yönetimi gibi tekniklerle sağlanır. Manuel testler yanında Axe, WAVE ve Lighthouse gibi otomatik araçlar kullanılır, ancak asıl doğrulama gerçek ekran okuyucu testleri ile yapılır.

## Neden kritik?

<div class="gonet-stat-bars">
  <div class="stat-title">ERİŞİLEBİLİRLİK ETKİ ALANLARI</div>
  <div class="gonet-stat-bar is-primary"><span class="label">Dönüşüm Artışı</span><span class="track"><span class="fill" style="--val:75%"></span></span><span class="value">%15-25</span></div>
  <div class="gonet-stat-bar"><span class="label">Geniş Kitle Erişimi</span><span class="track"><span class="fill" style="--val:70%"></span></span><span class="value">%20-30</span></div>
  <div class="gonet-stat-bar"><span class="label">ABD Erişilebilirlik Davaları</span><span class="track"><span class="fill" style="--val:100%"></span></span><span class="value">4.000+</span></div>
  <div class="gonet-stat-bar"><span class="label">Türkiye Engelli Nüfus</span><span class="track"><span class="fill" style="--val:90%"></span></span><span class="value">8.5M</span></div>
</div>

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">AA</div>
    <div class="l">Min uyum<br>seviyesi</div>
  </div>
  <div class="stat">
    <div class="n">4.5:1</div>
    <div class="l">Kontrast<br>orani min</div>
  </div>
  <div class="stat">
    <div class="n">2.2</div>
    <div class="l">Aktif<br>WCAG surumu</div>
  </div>
  <div class="stat">
    <div class="n">AODA/EAA</div>
    <div class="l">Yasal<br>uyumluluk</div>
  </div>
</div>

Türkiye'de 8,5 milyonun üzerinde engelli birey yaşamaktadır (TÜİK 2022). Bu kitle, erişilebilir olmayan web sitelerinde alışveriş yapamaz, formu dolduramaz, içerik tüketemez. Erişilebilirlik yalnızca sosyal sorumluluk değil, iş fırsatıdır: erişilebilir siteler %20-30 daha geniş kitleye ulaşır, SEO performansı artar (Google ranking faktörlerinden biri), yasal risk düşer.

5378 sayılı Engelliler Hakkında Kanun ve Erişilebilirlik İzleme ve Denetleme Yönetmeliği, kamu kurumlarının AA seviyesi uyumluluğunu zorunlu kılar. Özel sektörde henüz yaygın denetim olmasa da AB uyum sürecinde (European Accessibility Act) bu gereklilik özel sektöre de yaygınlaşacaktır. ABD'de ADA (Americans with Disabilities Act) kapsamında erişilebilirlik davaları yıllık 4.000+ seviyeye ulaşmıştır; Türkiye'de de benzer trendler gözlenir.

Teknik boyutta, erişilebilir kod temiz koddur: semantic HTML, iyi tanımlanmış başlıklar (H1-H6 hiyerarşisi), anlamlı link metinleri ('buraya tıklayın' yerine 'ürün kataloğunu inceleyin') hem erişilebilirliği hem SEO'yu güçlendirir. ARIA etiketleri (aria-label, aria-describedby, role) dinamik içerik ve SPA (Single Page Application) uygulamalarında ekran okuyucuların sayfa değişikliklerini algılamasını sağlar.

## Gonet yaklaşımı

<div class="gonet-process">
  <div class="pt">GONET TEST SÜRECİ</div>
  <div class="steps">
    <div class="step is-primary"><div class="n">1</div><div class="t">Otomatik Tarama</div><div class="d">Axe DevTools ve Pa11y CI ile kod analizi</div></div>
    <div class="step"><div class="n">2</div><div class="t">Manuel Klavye Testi</div><div class="d">Mouse kullanmadan tüm site gezinme kontrolü</div></div>
    <div class="step"><div class="n">3</div><div class="t">Ekran Okuyucu Testi</div><div class="d">NVDA, JAWS ve VoiceOver ile doğrulama</div></div>
    <div class="step"><div class="n">4</div><div class="t">Kontrast Doğrulama</div><div class="d">WebAIM Contrast Checker ile oran kontrolü</div></div>
    <div class="step"><div class="n">5</div><div class="t">Zoom Testi</div><div class="d">%200-400 büyütme responsive davranış testi</div></div>
  </div>
</div>

Gonet'te WCAG 2.2 uyumluluğu, projenin ilk gününden itibaren tasarım ve geliştirme süreçlerine entegre edilir. 26 yıllık deneyimimizde, erişilebilirliğin sonradan eklenen bir özellik değil, temel mimari kararı olduğunu öğrendik.

**Tasarım aşaması:** Figma/Adobe XD tasarımlarında Stark, Contrast gibi eklentilerle renk kontrastı otomatik kontrol edilir. Font boyutları minimum 16px (mobil 14px), interaktif elemanlar (buton, link) minimum 44×44px dokunma alanı (WCAG 2.2 yeni kriteri) ile tasarlanır. Odak göstergeleri (focus indicator) varsayılan tarayıcı outline'ı yerine özel tasarlanır, minimum 2px kalınlık ve yüksek kontrastlı renklerle.

**Geliştirme aşaması:** Semantic HTML5 elemanları (nav, main, article, aside, footer) kullanılır. Tüm formlar label ile ilişkilendirilir, hata mesajları aria-live bölgeleri ile gerçek zamanlı iletilir. Skip link ('ana içeriğe geç') her sayfada bulunur. Klavye tuzakları (focus trap) modal ve dropdown'larda Esc ile çıkış, Tab ile doğru sırada gezinme sağlanır.

**Test süreci:** 
1. Otomatik tarama (Axe DevTools, Pa11y CI)
2. Manuel klavye testi (mouse kullanmadan tüm site gezilir)
3. Gerçek ekran okuyucu testi (NVDA, JAWS, VoiceOver)
4. Kontrast oranı doğrulama (WebAIM Contrast Checker)
5. Zoom testi (%200-400 büyütme, responsive davranış)

JSON-LD ile structured data, ekran okuyucuların içerik yapısını daha iyi anlamasını sağlar. GTM (Google Tag Manager) etkinlikleri klavye ve ekran okuyucu etkileşimleriyle tetiklenecek şekilde yapılandırılır.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| Kamu kurumu/yasal zorunluluk | Yönetmelik uyumu, denetim geçişi, ceza riskinin sıfırlanması |
| E-ticaret/finans uygulamaları | %15-25 daha fazla dönüşüm (engelli kullanıcılar + yaşlı/geçici engelli bireyler), sepet terk oranı düşüşü |
| Çokuluslu/AB pazarı hedefi | European Accessibility Act (Haziran 2025) uyumu, rekabette öne geçiş |
| Yüksek trafik/SEO odaklı | Google Core Web Vitals ile korelasyon, semantic HTML sayesinde daha iyi crawling, snippet kazanımı |
| Mobil-first uygulamalar | WCAG 2.2 mobil kriterleri (dokunma hedefi, oryantasyon, hareket tetikleme) kullanıcı deneyimini doğrudan iyileştirir |
| SaaS/karmaşık arayüzler | Ekran okuyucu uyumu olmadan kurumsal müşteriler (özellikle ABD/AB) ürünü satın alamaz |

## İlgili yetkinlikler

- [Kullanıcı Deneyimi (UX) Tasarımı](/yetkinlikler/tasarim-ux/kullanici-deneyimi-tasarimi) — WCAG uyumluluğu UX'in temel bileşenidir, kapsayıcı tasarım prensipleriyle birleşir.
- [Responsive Tasarım](/yetkinlikler/tasarim-ux/responsive-tasarim) — Erişilebilirlik tüm ekran boyutlarında çalışmalıdır; viewport zoom ve reflow kriterleri responsive yapıyı gerektirir.
- [Semantic HTML & Schema.org](/yetkinlikler/seo/semantic-html-schema) — Erişilebilir kodun temeli semantic yapıdır; arama motorları ve ekran okuyucular aynı yapıyı kullanır.
- [Hız Optimizasyonu (Core Web Vitals)](/yetkinlikler/teknik-seo/core-web-vitals) — Klavye ve ekran okuyucu kullanıcıları yavaş sitelerde kaybolur; FID ve INP erişilebilirlik için kritiktir.

## Gonet ile çalışmak

Gonet, Türkiye'nin ilk üç Google Partner ajansından biri olarak 220+ markaya WCAG 2.2 uyumlu çözümler sunmuştur. Kamu, finans, e-ticaret ve SaaS projelerimizde AA+ compliance ve gerçek kullanıcı testleri ile erişilebilirliği garantileriz. Sitenizi herkes için erişilebilir hale getirmek, yasal uyumluluğu sağlamak ve dönüşüm oranlarınızı artırmak için [iletişime geçin](/iletisim).
