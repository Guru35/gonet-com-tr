# gonet-com-tr — ajan haritası

Gonet'in kurumsal sitesi **gonet.com.tr**: Astro 6 + Tailwind 4, statik derleme (`dist/`). Node ≥ 22.12.

## Dizin haritası

| yol | ne |
|---|---|
| `src/pages/` | sayfalar (`blog/[...slug].astro` blog şablonu) |
| `src/lib/schema.ts` | ortak yapısal veri (Organization · WebSite · Person); her sayfaya `@graph` ile basılır |
| `src/styles/global.css` | tema ve renk değişkenleri |
| `src/content/`, `src/data/` | blog, vaka ve SSS içerikleri |
| `content-queue/` | gece botunun AEO aday listesi (yalnız bot yazar) |
| `tests/` | kabul testleri (`node --test`, TAP) |
| `.github/workflows/` | `aeo-sinyal-tarama` (gece botu) · `blog-build-check` (blog PR'ı) · `post-publish` (IndexNow) |

## Nasıl koşulur

```bash
npm ci
npm run build   # src/data/guncellemeler.json üretir + astro build
npm test        # astro build + tests/*.test.mjs
```

`kod-kapisi.json` yerel kod kapısının test komutudur (`npm test`, TAP). Commit öncesi yeşil olmalı.
`npm run build` `src/data/guncellemeler.json`'u yeniden yazar; işin parçası değilse commit'e katmayın.

## Kurallar

- **`main`'e birleştirme = CANLIYA ÇIKIŞ.** Coolify `main`'e her push'ta siteyi yayına alır (webhook ölçüldü).
  Birleştirme yalnız operatörün işidir. Ajan taslak PR açar; `gh pr ready` ve `gh pr merge` yapmaz, `main`'e doğrudan push etmez.
- **Marka rengi `#ff0000` tek tondur**, değiştirilmez. Kontrast için renk değil boyut, kalınlık ya da zemin ayarlanır.
- **Gece botu** (`aeo-sinyal-tarama`, 03:00 UTC) `main`'e değil `bot/aeo-sinyal` dalına yazar ve oradan taslak PR açar
  (PR #39 ile; o birleşene kadar eski iş akışı `main`'e yazar).
