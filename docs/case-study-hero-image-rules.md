# Case Study & Sayfa Hero Görsel Kuralları

Bu doküman, gonet.com.tr içindeki vaka çalışmaları (`/case-studies/...`)
sayfaları için hero görsellerin **nasıl** ve **ne mantıkla** üretileceğini
tanımlar. Yeni bir vaka detay sayfasına görsel eklerken bu kurallara uy.

---

## Üretim Modeli

- **MCP tool**: `mcp__mcp-image__generate_image`
- **Underlying model**: Google `gemini-3-pro-image-preview` (yani "Nano Banana 2"
  ailesinin pro varyantı). Tool zaten bu modeli kullanır — ek parametre gerekmez.
- **Aspect ratio**: `9:16` (dikey / portrait)
- **Image size**: `2K`
- **Quality**: `quality`

## Görsel Estetik (her sayfada uyulmalı)

1. **Foto-realistik** — illüstrasyon değil, fotoğrafik.
2. **Siyah-beyaz (B&W)** — monokrom, prompt'ta belirt.
3. **Ultra minimal** — tek bir özne, geniş boşluk, sade kompozisyon.
4. **High-key / beyaza yakın BG** — site BG'si beyaz; görsel açık tonlarda
   (beyaz duvar, pale gri tonlar, soft pencere ışığı, near-overexposed).
   ❌ Karanlık siyah BG **kullanma** — sayfa BG'siyle uyumsuz, sert.
5. **Dramatik chiaroscuro değil, soft natural lighting** — yumuşak gün ışığı,
   yumuşak gölgeler.
6. **Tek figür/obje, çevre boşluk** — özne kompozisyonun küçük bir bölümünde,
   gerisi pale boşluk.
7. **Text / logo / UI yok** — saf görsel.
8. **Müze kalitesinde fine art fotoğraf** — Sugimoto, Trent Parke (soft hali),
   Hiroshi Sugimoto referansları prompt'ta kullanılabilir.

## Konum & Davranış (CSS — global)

CSS class: `.case-hero-img` (zaten `src/styles/global.css` içinde tanımlı).
Davranış:

- **Desktop ≥ 1024px** — **dondurulmuş final ebat (2026-06-04 tarihinde kabul edildi):**
  ```css
  top: 4rem;
  right: 0;
  bottom: auto;
  height: auto;
  width: auto;
  max-height: calc(100vh - 9rem);
  max-width: 27.5vw;
  object-fit: contain;
  object-position: right top;
  transform: translateX(40%);   /* default: %60 görünür, %40 dışarda */
  transition: transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
              filter 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
  filter: grayscale(100%) contrast(1.02);
  ```
  - Hover (hero section'a hover edilince): `transform: translateX(0)` + `filter:
    grayscale(0%)` — tam görünür ve renklenir
  - `max-height: calc(100vh - 9rem)` viewport altına asla taşmaz
  - `object-fit: contain` + `object-position: right top` — orijinal ratio
    korunur, sağ-üst köşeye yaslanır
  - Bu boyut **tüm vaka detay sayfaları için standarttır** — yeni vaka
    eklenirken bu CSS'e dokunma, sadece `ogImage` field'ı doldur.

- **Mobile < 1024px**:
  - Tam ekran BG (`inset:0`)
  - `opacity: 0.18` — yazıları ezmez, sade arka plan
  - Etkileşim kapalı (`pointer-events: none`)

## Body Section Görselleri (Sorun · Çözüm · Sonuç vb.)

Detay sayfasının body article'ında, başlıkların yanına dekoratif küçük görseller
yerleştirilir. CSS class: `.body-aside-img`.

- **Desktop ≥ 1280px** (final ebat):
  ```css
  position: absolute;
  right: 1.5rem;
  width: 9rem;
  filter: grayscale(100%) contrast(1.02);
  transform: translateX(-40vw);   /* default: sol dışarda, gizli */
  opacity: 0;
  transition: opacity 1.2s ease-out,
              transform 1.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  ```
  - IntersectionObserver `threshold: 0.15` + `rootMargin: '0px 0px -10% 0px'` ile
    viewport'a girdiğinde `.is-visible` class'ı eklenir:
    `opacity: 0.92; transform: translateX(0);` — sağa yapışık konuma slide
  - 3 görsel article içinde `top: 8%`, `top: 40%`, `top: 72%` pozisyonlarında

- **Tablet/Mobile < 1280px**: `display: none`
- **Reduced motion**: animasyon iptal, sadece opacity fade

Yeni vaka için CSS'e dokunmaya gerek yok — sadece doğru class kullan
(detay sayfası şablonunda zaten var).

## Sayfa İçindeki Tipografi

Vaka detay sayfalarında **tüm `editorial-display` metinleri sentence-case**
render edilir. Sayfa şablonu (`/src/pages/case-studies/[...slug].astro`) bunu
otomatik uygular (`.case-detail` wrapper ile). Prompt yazarken markaya `'`
ve özel karakterleri olduğu gibi kullan — render'da büyük harfe çevrilmeyecek.

## Görsel İçeriği — Konsept Seçimi

Görsel mutlaka **vakanın ağırlıklı anlamını/duygusunu** yansıtmalı.
Vaka türüne göre öneriler:

| Vaka türü | Görsel konsept önerisi |
|---|---|
| **EdTech / uzaktan eğitim** | Aydınlık beyaz odada tek öğrenci, laptop, sırtı dönük |
| **Kamu / sosyal kampanya — su, çevre, sağlık** | Tek bir simgesel obje (örn. bir el ve damla, açık beyaz arka plan, soft) |
| **İnşaat / mimari marka** | Boş bir inşaat alanı veya minimal bina cephesi, beyaz gökyüzü, dikey kadraj |
| **Online satış / D2C / e-ticaret** | Beyaz masa, tek bir paket veya laptop ekranı (UI yok), boşluk |
| **Siyasi kampanya** | Boş bir kürsü veya boş bir miting alanı, dramatik ama yumuşak ışık |
| **Otomotiv / kiralama** | Tek bir araç silüeti veya bir yolun beyaz manzarası, minimalist |
| **Sağlık / IVF / tüp bebek** | Soyut bir motif: yumuşak bir el dokunuşu, ışık huzmesi — etik hassasiyet |
| **Turizm / otel** | Boş bir lobi, açık pencere, deniz manzarası gibi minimal kadraj |

## Prompt Şablonu (English — model bu dilde daha iyi yorumluyor)

```
Ultra minimal photorealistic HIGH-KEY black and white photograph.
[KONSEPT — sahnenin tek satır anlatımı, vaka temasına özel].
Soft natural daylight, white walls, pale gray tones dominate the entire
composition. Hyperrealistic documentary photography, near-white background,
soft luminous shadows, high-key lighting, almost no deep blacks, gentle
overexposed pale tones, museum-grade fine art photography reminiscent of
Hiroshi Sugimoto. Vertical portrait orientation 9:16. No text, no logos,
no UI. Striking minimalism, vast empty white space, the subject occupies
only a small portion of the frame. Calm, contemplative atmosphere.
```

## Dosya Kuralları

1. Üretim çıktısı: `~/Documents/GonetWeb-1/01 Projects/Website/wiki/design/iterations/nano-banana/<slug>-hero.jpg`
2. `sips -Z 1600 <source> --out /Users/gonet/Documents/gonet-com-tr/public/case-studies/<slug>.jpg`
   ile yeniden boyutlandırılır (max 1600px). Hedef boyut 100–250 KB civarı.
3. Vaka md frontmatter'ında `ogImage: "/case-studies/<slug>.jpg"` ekle.
4. Detay sayfası `[...slug].astro` zaten `cs.data.ogImage` kontrol eder —
   otomatik render eder.

## Uygulama Sırası

Yeni vaka geldiğinde:

1. Vakanın **frontmatter description + ana cümlesini** oku.
2. Yukarıdaki konsept tablosundan en yakın temayı seç (veya türev).
3. Prompt şablonunu doldur, [KONSEPT] satırını vakaya özelleştir.
4. `mcp__mcp-image__generate_image` çağır — aspectRatio 9:16, imageSize 2K,
   quality "quality", fileName `<slug>-hero`.
5. `sips` ile compress + `/public/case-studies/<slug>.jpg`'e taşı.
6. Frontmatter'a `ogImage` field'ı ekle.
7. Tarayıcıda hero davranışını doğrula (default %60 görünür, hover'da tam).

## Olmaz / Kaçınılacak

- ❌ Karanlık siyah BG (önceki "v1" yanlıştı)
- ❌ Aşırı detay, kalabalık kompozisyon
- ❌ Görsel içinde text/logo/UI/grafik
- ❌ Hero section padding'i dışına taşan boyut
- ❌ Renkli görsel (siyah-beyaz olmazsa olmaz; hover'da renklenme JS değil
  CSS filter — kaynak görsel B&W kalır)
