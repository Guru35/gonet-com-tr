---
title: "Figma ve Design System Uzmanlığı: Ölçeklenebilir Tasarım Altyapısı"
description: "Token-based design sistemleri, component library yönetimi ve auto layout ile tutarlı, hızlı geliştirilebilir dijital deneyimler. Gonet'in Figma uzmanlığı."
h1: "Figma ve Design System Uzmanlığı: Ölçeklenebilir Tasarım Altyapısı"
categorySlug: "tasarim-ux"
categoryName: "Tasarım & UX"
skillSlug: "figma-design-system"
skillLevel: "Uzman"
detailHero: "/yetenekler-images/tasarim-ux/detail-tasarim-figma.jpg"
keywords:
  - figma-tasarim
  - design-system
  - token-based-design
  - component-library
  - auto-layout
  - ui-tasarim-sistemi
  - figma-gelistirici-isbirligi
  - tasarim-token
  - atomic-design
  - figma-dev-mode
  - responsive-component
  - marka-tasarim-sistemi
  - style-dictionary
  - figma-versiyonlama
  - tasarim-handoff
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Token-based design ile klasik Figma stilleri arasındaki fark nedir?"
    a: "Klasik Figma stilleri (color/text styles) yalnızca Figma içinde çalışır ve tek katmandır (örneğin 'Primary Blue'). Token-based design ise primitive (mavi-500) ve semantic (button-primary-bg) katmanlarını ayırır; token'lar JSON dosyasında tutulur ve Style Dictionary gibi araçlarla hem Figma'ya hem CSS/SCSS/Tailwind config dosyalarına otomatik aktarılır. Böylece tasarım-geliştirme arasında tek gerçek kaynak (single source of truth) oluşur. Renk değişikliğinde JSON'da tek satır güncellenir, tüm platformlar (Figma, web, mobil app) senkronize kalır."
  - q: "Auto layout hangi durumlarda manuel frame'lerden daha avantajlıdır?"
    a: "Auto layout, içerik miktarı değişken olan bileşenlerde (buton metni uzarsa, liste elemanı eklenirse) tasarımın kırılmamasını sağlar. Manuel frame'de padding/genişlik elle ayarlanır, her değişiklikte yeniden düzenleme gerekir. Auto layout ise CSS Flexbox/Grid mantığıyla çalışır: direction (horizontal/vertical), spacing, padding, hug/fill davranışları tanımlıdır. Geliştirici Figma'daki auto layout yapısını doğrudan koda çevirir—tahmin değil, birebir aktarım. Responsive tasarımda ve çok dilli içeriklerde (Almanca metinler İngilizce'den %30 daha uzun olabilir) kritik avantaj sağlar."
  - q: "Component library'de variant ve property yapısı nasıl kurulmalı?"
    a: "Variant yapısı bileşenin tüm olası durumlarını (size, state, hierarchy) tek component set altında toplar. Örneğin Button component'i: size property → small/medium/large; state property → default/hover/active/disabled; hierarchy property → primary/secondary/ghost. Her kombinasyon ayrı variant'tır (toplam 3×4×3=36 variant). Property-based yapı sayesinde tasarımcı instance'ı seçip sağ panelden dropdown'larla istediği kombinasyonu kurar—36 ayrı component aramaz. Geliştirici de inspect panelinde hangi variant'ın seçili olduğunu görür ve ilgili CSS sınıfını (örneğin .btn--small.btn--primary) uygular. Bu yapı maintenance'i kolaylaştırır: yeni state eklendiğinde (örneğin 'loading') tüm size/hierarchy kombinasyonları otomatik güncellenir."
  - q: "Figma design system'i geliştirme sürecine nasıl entegre edilir?"
    a: "Entegrasyon 3 katmanda gerçekleşir: 1) Token senkronizasyonu—Figma Tokens eklentisi veya Style Dictionary ile token JSON'ları Git repository'de tutulur, CI/CD pipeline her commit'te CSS değişkenlerini günceller. 2) Component handoff—Figma Dev Mode'da geliştirici component props'ları (padding, font-size, color token referansı) inspect eder; Gonet ekibi bu değerleri React/Vue component'lerine map eder, Storybook'ta dokümante eder. 3) Versiyonlama—Figma branch'leri Git branch'leri ile senkronize; major tasarım değişikliği yeni branch'te test edilir, onaylandıktan sonra main'e merge edilir. Bu akış tasarım-geliştirme arasındaki 'telefon oyunu' riskini sıfırlar, her iki ekip de aynı versiyonu referans alır."
  - q: "Çok markalı yapılarda tek design system mi yoksa marka başına ayrı dosya mı tercih edilmeli?"
    a: "Tek design system, çoklu tema (multi-brand theming) yaklaşımı önerilir. Ana Figma dosyasında component library tüm markalarda ortak (button, input, card yapısı aynı), token dosyası her marka için fork edilir: marka-A-tokens.json, marka-B-tokens.json. Figma'da Swap Library özelliği ile aynı component farklı token setlerine bağlanır. Geliştirmede de tek component kütüphanesi, CSS'de theme class'ı ile token seti değişir (body.theme-a { --color-primary: #FF6B00; }). Bu yapı bakımı kolaylaştırır: button mantığında değişiklik tüm markalara yansır, ama her markanın renk/font'u bağımsız kalır. Gonet, 8 farklı franchise markası olan zincir için bu yapıyı kurdu; yeni marka ekleme süresi 2 haftadan 2 güne düştü."
changelog:
  - date: "2026-06-06"
    type: "initial"
    summary: "Ilk yayin"
  - date: "2026-06-07"
    type: "enhancement"
  - date: "2026-06-07"
    type: "enhancement"
    summary: "Kreatif viz eklendi (process, compare)"
  - date: "2026-06-08"
    type: "enhancement"
    summary: "4-KPI stat-grid (KPI panosu) eklendi"
---

## Figma + design system nedir?

Figma, bulut tabanlı arayüz tasarım aracıdır; design system (tasarım sistemi) ise bir markanın tüm dijital ürünlerinde tutarlılığı sağlayan kurallar, bileşenler ve stil kılavuzlarının toplamıdır. Modern yaklaşımda **token-based design** (tasarım token'ları) renk, tipografi, boşluk gibi değerleri merkezi bir kaynakta tanımlar; **component library** (bileşen kütüphanesi) bu token'ları kullanan yeniden kullanılabilir UI elemanlarını barındırır; **auto layout** ise responsive (duyarlı) tasarımları kod mantığına en yakın şekilde Figma'da kurmayı sağlar.

Gonet 2000'den beri dijital ürün tasarlıyor; Figma ekosisteminde 5+ yıldır aktif çalışan ekibimiz, özellikle çok dilli, çok markalı yapılarda token-driven sistemler kuruyor. Bir design system yalnızca tasarım dosyası değil—tasarımcı-geliştirici iş birliğini hızlandıran, marka tutarlılığını garanti eden **canlı altyapıdır**.

## Neden kritik?

<div class="gonet-stat-grid">
  <div class="stat is-primary">
    <div class="n">Variants</div>
    <div class="l">Component<br>cesitleri</div>
  </div>
  <div class="stat">
    <div class="n">Tokens</div>
    <div class="l">Studio plugin<br>standart</div>
  </div>
  <div class="stat">
    <div class="n">Auto Layout</div>
    <div class="l">Responsive<br>frame</div>
  </div>
  <div class="stat">
    <div class="n">Dev Mode</div>
    <div class="l">Code<br>spec kopru</div>
  </div>
</div>

1. **Tutarlılık ölçeğinde**: 50+ sayfa, 10 farklı kampanya, mobil + web + uygulama içi banner… Manuel kontrol imkansız. Token sistemi tek kaynaktan tüm varlıkları günceller.
2. **Geliştirme hızı**: Component library sayesinde tasarımcı yeni ekranı saatler yerine dakikalarda üretir; geliştirici de Figma'daki auto layout yapısını doğrudan CSS Flexbox/Grid'e çevirir—tahmin değil, birebir aktarım.
3. **Rebrand/versiyonlama kolaylığı**: Marka rengi değişti mi? Token dosyasında tek satır, tüm dosyalar otomatik güncellenir. Eski versiyonu git benzeri sistemle korursunuz.
4. **İşbirliği şeffaflığı**: Figma bulutta; tasarımcı, geliştirici, ürün yöneticisi aynı dosyada eşzamanlı çalışır, yorum bırakır, inspect (inceleme) ile CSS/spacing değerlerini okur. Photoshop/Sketch zamanındaki 'dosya gönder-bekle' döngüsü tarih oldu.
5. **AEO/GEO uyum**: Tutarlı UI hiyerarşisi (başlık-gövde-buton) yapısal veriyi (Schema.org) destekler; hızlı geliştirme Core Web Vitals'ı iyileştirir; erişilebilirlik token'ları (kontrast oranı, font boyutu) WCAG (Web Content Accessibility Guidelines) uyumunu garantiler—LLM'lerin extract edeceği net semantik yapı.

## Gonet yaklaşımı

<div class="gonet-compare">
  <div class="col"><div class="lab">Geleneksel Yöntem</div><div class="bar"><span style="--h: 32px"></span></div><div class="v">8 hafta</div><div class="desc">Manuel tasarım, 120+ sayfa, tutarsızlık bug'ları</div></div>
  <div class="col is-primary"><div class="lab">Design System</div><div class="bar"><span style="--h: 104px"></span></div><div class="v">3 hafta</div><div class="desc">Token-driven, component library, %40 hız artışı</div></div>
</div>

<div class="gonet-process">
  <div class="pt">TASARIM SİSTEMİ KURULUM SÜRECİ</div>
  <div class="steps">
    <div class="step is-primary"><div class="n">1</div><div class="t">Token Mimarisi</div><div class="d">Renk, tipografi, spacing JSON'da tanımlanır</div></div>
    <div class="step"><div class="n">2</div><div class="t">Component Library</div><div class="d">Atomic Design ile button, input, card bileşenleri</div></div>
    <div class="step"><div class="n">3</div><div class="t">Documentation</div><div class="d">Usage guideline, do/don't, accessibility notları</div></div>
    <div class="step"><div class="n">4</div><div class="t">Versiyonlama</div><div class="d">Branching + annotation ile değişiklik takibi</div></div>
    <div class="step"><div class="n">5</div><div class="t">Handoff Otomasyonu</div><div class="d">Dev Mode ile CSS değerlerinin otomatik aktarımı</div></div>
  </div>
</div>

Gonet'te her proje başında **tasarım sistemi sağlık kontrolü** yaparız: mevcut varsa token yapısını audit ederiz, yoksa sıfırdan kurarız.

- **Token mimarisi**: Style Dictionary veya Figma Tokens eklentisi ile renk (primitive/semantic katmanlar), tipografi (font-size, line-height, letter-spacing), spacing (4px/8px grid), shadow, radius değerlerini JSON'da tanımlarız. Bu JSON hem Figma'ya hem CSS/SCSS/Tailwind config'e beslenir.
- **Component library**: Atomic Design metodolojisi—atomlar (button, input), moleküller (form field + label), organizmalar (header, card). Her bileşen **variant + property** sisteminde; örneğin Button → size (small/medium/large), state (default/hover/disabled), hierarchy (primary/secondary/ghost). Auto layout sayesinde içerik değişse bile bileşen kırılmaz.
- **Documentation**: Figma dosyasında her bileşenin yanına usage guideline (kullanım kılavuzu), do/don't örnekleri, accessibility notu ekleriz. Geliştirici dosyayı açtığında kod yazmadan önce nasıl kullanılacağını görür.
- **Versiyonlama**: Branching + annotation. Major rebrand için yeni branch, minor güncellemeler ana dosyada; her değişiklik Figma'nın version history'de etiketli.
- **Handoff otomasyonu**: Figma Dev Mode + component props inspection. Geliştirici padding/margin/font-weight değerlerini tek tıkla kopyalar; Gonet geliştirme ekibi bu değerleri doğrudan CSS değişkenlerine map eder.

Örneğin 120+ sayfalı e-ticaret platformunda tek tasarımcı 8 hafta yerine 3 haftada tüm ekranları tamamladı; geliştirme süresi %40 kısaldı, QA'de tutarsızlık bug'ı sıfırlandı.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Çok markalı yapı** (holding, franchise) | Token dosyası marka başına fork edilir; her markanın renk/font'u ayrı, component mantığı aynı—tek design system, 5 marka çıktısı. |
| **Hızlı kampanya döngüleri** | Component library'den sayfa şablonları 1 günde hazır; geliştirici haftalar değil günler içinde canlıya alır. |
| **Remote/dağıtık ekip** | Figma cloud-native; İstanbul tasarımcı + Ankara geliştirici + Almanya Product Owner aynı dosyada real-time çalışır. |
| **Rebrand/refresh projeleri** | Eski brand token'ını yeni token seti ile değiştir, auto layout sayesinde hiçbir ekran kırılmadan güncellenir. |
| **Erişilebilirlik (WCAG) zorunluluğu** | Kontrast ratio token'ı WCAG AA/AAA seviyesinde kilitli; tüm bileşenler bu token'ı kullandığı için otomatik uyumlu. |
| **Tasarım-geliştirme döngüsü yavaş** | Handoff süreci manuel screenshot + pdf yerine Figma inspect ile otomatik; iterasyon hızı 3-4x artar. |

## İlgili yetkinlikler

- [UI/UX tasarım ve prototipleme](/yetkinlikler/tasarim-ux/ui-ux-prototipleme): Figma'da tasarlanan deneyimlerin kullanıcı testine hazırlanması.
- [Responsive tasarım](/yetkinlikler/tasarim-ux/responsive-tasarim): Auto layout ile mobil/tablet/desktop grid sistemlerinin kurgulanması.
- [Marka kimliği ve görsel dil](/yetkinlikler/tasarim-ux/marka-kimligi): Token-based renk/tipografi paletlerinin marka stratejisi ile uyumlaştırılması.
- [Erişilebilirlik (A11y)](/yetkinlikler/tasarim-ux/erisebilirlik): WCAG uyumlu token setlerinin design system'e entegrasyonu.

## Gonet ile çalışmak

Gonet, Figma + design system altyapısını yalnızca 'tasarım dosyası' olarak değil, marka ve geliştirme ekiplerinin ortak dili olarak kurar. 26 yıllık ajans deneyimimiz, token mimarisinden component dokümantasyonuna kadar her adımı kanıtlanmış metodolojilerle yönetir. Mevcut Figma dosyanızı audit etmek veya sıfırdan ölçeklenebilir sistem kurmak için [iletişime geçin](/iletisim).
