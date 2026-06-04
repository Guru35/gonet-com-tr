# Frontend Görsel Tasarım — Sorun & Çözüm Kataloğu

Bu vaultta karşılaşılan UI/CSS/JS sorunlarının ve çözümlerinin referans dökümü.
Yeni bir benzer sorun çıktığında **önce buradan kontrol et** — kolay/hızlı çözüm
büyük olasılıkla burada var. Yeni çözüm bulduğunda bu dosyayı da güncelle.

---

## 1. `text-white` + `bg-white` görünmez metin

**Semptom:** Bir kelime/strong vurgu sayfada hiç görünmüyor.

**Neden:** Tailwind class çakışması — text-white bir bg-white container içinde.

**Çözüm:** Çakışan utility class'ı kaldır, sadece görsel ihtiyacı kadar tut.

```html
<!-- Yanlış -->
<strong class="text-white">AI cevap motorları</strong>

<!-- Doğru -->
<strong>AI cevap motorları</strong>
```

---

## 2. Sayfada birden fazla `<h1>`

**Semptom:** SEO/a11y audit'inde "multiple h1" uyarısı. Heading hiyerarşisi
kırık.

**Neden:** Editöryel tipografi için iki ayrı dev başlık kullanıldı.

**Çözüm:** Tek `<h1>` + iki `<span class="block">` ile görsel olarak iki satıra
böl. Tipografi korunur, semantik düzelir.

```html
<h1 class="editorial-display text-black mb-12 lg:mb-20">
  <span class="block text-[18vw] ...">Her iş'te</span>
  <span class="block text-[28vw] ...">Gonet var.</span>
</h1>
```

---

## 3. Markdown/Astro template'de `Türkiye\'de` literal render

**Semptom:** Sayfada `Türkiye\'de` (ters slash dahil) görünüyor.

**Neden:** Astro template'de text içeriği değil, JSX string literal gibi
escape ediliyor — backslash gereksiz.

**Çözüm:** Backslash'i kaldır, düz apostrof bırak.

```html
<!-- Yanlış --> 100 ajans Türkiye\'de
<!-- Doğru -->  100 ajans Türkiye'de
```

---

## 4. Astro **scoped CSS** ile beklenmedik selector match'sizlik

**Semptom:** Component içinde tanımlanan `.foo { ... }` global olduğunda
çalışıyor ama scoped olduğunda elementi seçmiyor.

**Neden:** Astro `<style>` block'ları otomatik scoped — her CSS selector'a ve
her HTML elementine `data-astro-cid-xxxxxxx` ekler. `.foo` aslında
`.foo[data-astro-cid-xxxxxxx]` olur. Eğer JS ile dinamik class ekliyorsan
veya başka component'tan match istiyorsan scope çakışır.

**Çözüm seçenekleri:**
- `<style is:global>...</style>` — scope'u kapat (geniş etkili — dikkat)
- CSS'i `src/styles/global.css` içine taşı
- Selector'u parent class ile sıkılaştır (örn. `.case-card .editorial-display`)

---

## 5. `editorial-display` global `uppercase` — istemediğin yerde büyük harf

**Semptom:** `global.css`'te `.editorial-display { text-transform: uppercase }`.
Bazı sayfalarda sentence-case istiyorsun ama her yerde UPPERCASE oluyor.

**Çözüm:** Sayfaya bir wrapper class ekle + scoped override:

```html
<div class="case-detail">
  ...content with editorial-display...
</div>

<style>
  .case-detail .editorial-display { text-transform: none; }
</style>
```

İstisna: ana sayfa h1 gibi yerlerde uppercase istiyorsan o sayfaya wrapper
ekleme — global rule devam eder.

---

## 6. `absolute` element + `top + bottom + height: auto` çakışması

**Semptom:** Element konteynerinden taşıyor veya beklenmedik boyut alıyor.

**Neden:** `position: absolute` ile `top` ve `bottom` ikisi de set + `height: auto`
edildiğinde browser height'ı `parent - top - bottom` olarak hesaplar; ama
img element'i kendi intrinsic ratio'sunu zorluyorsa bu hesap çakışır, taşma
olur.

**Çözüm:** Sadece `top` ver, height'ı viewport-bazlı sınırla:

```css
.case-hero-img {
  top: 4rem;
  right: 0;
  bottom: auto;          /* bottom KALDIRıldı */
  height: auto;
  max-height: calc(100vh - 9rem);  /* viewport altına asla taşmaz */
  max-width: 27.5vw;
  object-fit: contain;
  object-position: right top;
}
```

`100%` yerine `100vh` kullan — section content yüksekliğine bağımlı kalma.

---

## 7. `object-fit: contain` vs `cover` — ne zaman ne?

| Property | Davranış | Ne zaman? |
|---|---|---|
| `contain` | Ratio korur, kutuya **sığar**, boş alan kalır | Görsel kesilmesin, tam içerik önemli |
| `cover` | Ratio korur, kutuyu **doldurur**, fazlası kesilir | Estetik dolu kadraj, içerik az kritik |

İmge kompozisyonu önemliyse (portrait foto vb.) **contain**. Hero/banner gibi
estetik dolgu için **cover**.

---

## 8. `<img>` height: 0 — natural dimensions bilinmiyor

**Semptom:** Image elementine `width: 5rem; height: auto` verdin, ama
JS'te boyut ölçtüğünde h: 0 dönüyor. Sayfa scroll/layout etkilenmiş.

**Neden:** Image dosyası henüz YÜKLENMEDİ — browser intrinsic dimensions'ı
bilmiyor. `loading="lazy"` veya viewport dışındaysa bekler.

**Çözüm:** CSS `aspect-ratio` ekle — load olmadan da boyut hesabı yapılır.

```css
.body-aside-img {
  width: 5rem;
  aspect-ratio: 9 / 16;   /* yüklenmese bile h = w * 16/9 */
  object-fit: cover;
}
```

---

## 9. `IntersectionObserver` bazı senaryolarda tetiklenmiyor

**Semptom:** Element viewport içine girse de IO `entries` boş geliyor,
class eklenmiyor.

**Olası nedenler:**
- Parent container `overflow: hidden` + nested absolute layout (timing bug)
- IO observer kurulduğunda element henüz layout almamış (h: 0)
- Browser bug (özellikle test sandbox/headless'de)

**Çözüm:** IO yerine **scroll event listener** + element'in
`getBoundingClientRect()` kontrolü. Daha güvenli, her durumda çalışır:

```javascript
const handleScroll = () => {
  imgs.forEach((img) => {
    const r = img.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
      img.classList.add('is-visible');
    }
  });
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();  // ilk frame de kontrol et
```

`passive: true` performance için önemli.

---

## 10. Animation refresh'te kaybolma — default state'i invisible olunca risk

**Semptom:** Sayfa refresh edildiğinde animasyonlu element kayboluyor, hiç
görünmüyor.

**Neden:** CSS default `opacity: 0` + JS ile `is-visible` class eklenir
beklentisi. Eğer JS bir nedenle çalışmazsa veya geç çalışırsa, element
hiç görünmez.

**Çözüm:** Default state'i **görünür** yap. Animasyon nüansını farklı
property üzerinden ver:

```css
/* Yanlış — JS çalışmazsa kaybolur */
.body-aside-img { opacity: 0; transform: translateX(-15vw); }
.body-aside-img.is-visible { opacity: 1; transform: translateX(0); }

/* Doğru — her zaman görünür, animasyon sadece pozisyon */
.body-aside-img { opacity: 1; transform: translateX(-40%); }
.body-aside-img.is-visible { transform: translateX(0); }
```

İlke: **JS-bağımlı görünürlük ASGARİ olsun**. CSS-only animasyon mümkünse
tercih et.

---

## 11. `prefers-reduced-motion` `!important` ile beklenmedik override

**Semptom:** Hover/scroll'da çalışması gereken transform animasyonu hiç
oynamıyor.

**Neden:** Reduced-motion media query'de `transform: none !important` kullanılmış
— başka rule'lardaki transform'u da override eder.

**Çözüm:** `!important` kullanmadan dene, ya da reduced-motion'da sadece
transition'ı kapat:

```css
@media (prefers-reduced-motion: reduce) {
  .case-hero-img { transition: none; }
  /* transform: none !important — KULLANMA */
}
```

---

## 12. Astro scoped CSS body element'ini hedefleyemez

**Semptom:** `<style>body { ... }</style>` Astro component'inde yazılı ama
body'ye etki etmiyor.

**Neden:** Astro scope `body` element'ine `data-astro-cid` eklemez (DOM
hierarchy dışında).

**Çözüm:** `<style is:global>` kullan veya body kuralını `global.css`'e koy:

```html
<style is:global>
  body { scroll-snap-type: y proximity; }
</style>
```

---

## 13. Edge-to-edge yatay çizgi (viewport-width)

**Semptom:** Container'ın `max-w-7xl mx-auto` sınırının dışına çıkan
yatay çizgi istiyorsun.

**Çözüm:** `width: 100vw` + `transform: translateX(-50%)` ile center'a hizala:

```html
<span class="absolute top-0 h-px bg-black"
      style="left:50%;transform:translateX(-50%);width:100vw"></span>
```

`100vw` viewport-genişliği, parent container'a değil. translateX center'lar.

---

## 14. Mobile vs Desktop tamamen farklı layout — CSS yetmiyor

**Semptom:** Desktop'ta absolute pozisyonlu, mobile'da inline akışta olması
gereken element. CSS @media reposition bile yetmiyor (örn. siblings sırasını
değiştirmek).

**Çözüm:** JS ile DOM manipulation. `window.matchMedia` ile breakpoint
kontrolü + element'i taşı:

```javascript
const isMobile = () => window.matchMedia('(max-width: 1023px)').matches;

if (isMobile()) {
  const headings = document.querySelectorAll('article h2');
  imgs.forEach((img, i) => {
    if (headings[i]) headings[i].after(img);  // h2 hemen altına taşı
  });
}
```

CSS'te de mobile-state için `position: static; margin: 1.5rem auto;` ekle.

---

## 15. `scroll-snap` — sayfa içi snap ritmi

**Semptom:** Belirli section'lar (vakalar) tam ekran yüksekliğinde olmalı +
scroll'da kademeli geçmeli.

**Çözüm:**

```css
html { scroll-snap-type: y proximity; scroll-behavior: smooth; }
.case-snap {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;     /* sonraki snap'i atlayıp geçemez */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-snap-type: none; scroll-behavior: auto; }
}
```

`proximity` snap mandatory'den nazik — yakındaysa snap eder, free scroll'a
izin verir. `mandatory` agresiftir.

---

## 16. Image overlay aydınlık bg + transparan filter

**Semptom:** Görsel sayfa arka planı olarak rendere edildiğinde yazıların
okunabilirliği bozulmuş.

**Çözüm:** Görsel `opacity: 0.18`'e düşür (mobil için) + grayscale filter:

```css
@media (max-width: 1023px) {
  .case-hero-img {
    filter: grayscale(100%) contrast(0.9) brightness(1.15);
    opacity: 0.18;
    inset: 0;
    object-fit: cover;
    pointer-events: none;
  }
}
```

Veya tam tersi: BG olarak değil, content sonuna inline image olarak göster
(daha okunaklı). [Bkz #14](#14-mobile-vs-desktop-tamamen-farklı-layout--css-yetmiyor)

---

## 17. CSS specificity savaşı — `.foo.bar` çalışmıyor gibi görünür

**Semptom:** `.foo.bar { opacity: 1 }` rule var, class element'te de var,
ama browser uygulamıyor.

**Olası nedenler:**
- Browser cache (HMR ile CSS yenilenmemiş — hard refresh: Cmd+Shift+R)
- `!important` başka bir rule'da var, override ediyor
- Class element'e gerçekten eklenmemiş — `element.classList` ile doğrula
- Transition akışı tamamlanmamış — `getComputedStyle` "in-flight" değer verir

**Debug adımları:**
1. DevTools → Element seç → Styles tab → matched rules
2. Element'in `classList.contains('bar')` true mu?
3. `getComputedStyle(el).opacity` neyi gösteriyor (1+ saniye sonra)
4. CSS rule'da typo yok mu (selector, property name)

---

## 18. `transform: translate*` ile `getBoundingClientRect`

**Semptom:** Element transform ile kaydırılmış. JS ile pozisyon ölçüyorsun
ama beklenmedik değer dönüyor.

**Neden:** `getBoundingClientRect` **post-transform** koordinatlar verir —
yani translateX(-100px) ise rect.left de -100 olur.

**Çözüm:** Transform'u biliyorsan hesaba kat, ya da transform kaldırıp
ölç sonra geri uygula. Veya `element.offsetTop` kullan (transform-agnostic).

---

## 19. Astro Content Collection schema — yeni field eklemek

**Semptom:** Frontmatter'a yeni alan eklendi ama Astro hata veriyor: `Object
literal may only specify known properties`.

**Çözüm:** `src/content.config.ts` (veya `content.config.js`) içinde ilgili
collection schema'ya `z.optional()` ile alanı ekle:

```typescript
const caseStudies = defineCollection({
  schema: z.object({
    // ... mevcut alanlar
    bodyImages: z.array(z.string()).optional(),  // yeni
  }),
});
```

Sonra `cs.data.bodyImages` TypeScript-safe olur.

---

## 20. Image dosyası boyutu (web için)

**Pratik kurallar:**
- Hero görseller: max 1600px uzun kenar, 100–250 KB JPEG
- Body decorative görseller: max 1200px, 40–80 KB JPEG
- `sips -Z 1600 src.jpg --out dest.jpg` macOS native komut, hızlı

`/public/...` altındaki görseller doğrudan path ile serve edilir. CDN/optimizasyon
gerekmez küçük projeler için.

---

## Genel İlkeler

1. **JS-bağımlı görünürlük asgari** — default görünür, animasyon nüans
2. **viewport-bazlı sınırlar** (vw/vh) içerik-bazlı (`%`) sınırlardan daha
   öngörülebilir
3. **Astro scoped CSS** her zaman global olmaz — global CSS'i `global.css`'e
   ya da `<style is:global>` ile yaz
4. **CSS-only animasyon mümkünse** JS scroll listener'dan iyidir
5. **Hard refresh** (`Cmd+Shift+R`) ile CSS değişikliği test et — HMR bazen
   eski CSS'i tutar
6. **DevTools Styles tab** matched rules + computed style en doğru debug

---

## Şu Vault'a Özel Notlar

- `editorial-display` global `text-transform: uppercase` — sentence-case
  istiyorsan wrapper class
- `case-hero-img` ve `body-aside-img` global class'ları — sayfaya özel
  override gerekmiyorsa CSS'e dokunma, sadece `ogImage`/`bodyImages`
  frontmatter ekle
- Vaka hero görsel kuralları için: `docs/case-study-hero-image-rules.md`
