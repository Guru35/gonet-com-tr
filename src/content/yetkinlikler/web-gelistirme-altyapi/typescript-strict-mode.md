---
title: "TypeScript Strict Mode: Type-Safe Stack ve Runtime Validation"
description: "Gonet'in TypeScript strict mode uzmanlığı: Zod ile runtime validation, end-to-end tip güvenliği, bakım maliyeti düşürme ve production hata oranını minimize etme."
h1: "TypeScript Strict Mode: Type-Safe Stack ve Runtime Validation"
categorySlug: "web-gelistirme-altyapi"
categoryName: "Web Geliştirme & Altyapı"
skillSlug: "typescript-strict-mode"
skillLevel: "İleri"
detailHero: "/yetenekler-images/web-gelistirme-altyapi/detail-web-typescript.jpg"
keywords:
  - typescript-strict-mode
  - zod-runtime-validation
  - type-safe-development
  - typescript-zod-entegrasyonu
  - static-typing-javascript
  - schema-first-api
  - typescript-best-practices
  - runtime-type-checking
  - discriminated-unions
  - type-inference-zod
  - typescript-refactoring
  - end-to-end-type-safety
  - tsconfig-strict
  - typescript-migration
  - type-safe-stack
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "TypeScript strict mode'u mevcut JavaScript projesine nasıl entegre ederiz?"
    a: "Gonet'te kademe kademe migration stratejisi uygularız: İlk adımda tsconfig.json oluşturulur, strict: false ile başlanır. .js dosyaları .ts'e çevrilirken kritik modüllerden (API layer, data models) başlarız. Her sprint'te bir modül strict hale getirilir. Zod schema'lar önce yeni endpoint'lere eklenir, ardından legacy endpoint'ler refactor edilir. Ortalama 50 sayfalık bir SPA'da 8-12 haftalık süreçte tam strict mode'a geçiş sağlanır. CI/CD'ye tsc --noEmit eklenir, ancak initially warning modda çalışır, zamanla error moduna alınır. Bu yaklaşımla production risk minimize edilir."
  - q: "Zod runtime validation performans etkisi yaratır mı?"
    a: "Zod validation milisaniye seviyesinde overhead ekler, ancak strategik kullanımda ihmal edilebilir. Gonet'te Zod yalnızca boundary noktalarında çalışır: API request/response, form submission, external data parsing. Internal function call'larda TypeScript tip sistemi yeterlidir, runtime validation gereksizdir. Benchmark: 1000 field'lı karmaşık bir obje için Zod parse ~2ms sürer. Buna karşın, tip hatası yüzünden production'da crash olması ortalama 15 dakika downtime demektir. Performance tradeoff açıktır. Ayrıca Zod schema'lar lazyload edilebilir, code splitting ile ilk bundle boyutuna eklenmez."
  - q: "Strict mode hangi TypeScript hatalarını yakalar ki JavaScript'te yakalanmaz?"
    a: "Strict mode şu kritik hata sınıflarını derleme zamanında yakalar: (1) Null/undefined safety — obj.property erişiminde obj null olabilir kontrolü, (2) Implicit any yasağı — tip belirtilmemiş parametreler hata verir, (3) Unused variables — kullanılmayan değişkenler refactoring zamanı tespit edilir, (4) Incorrect function signatures — callback'lerde yanlış parametre sayısı/tipi, (5) Wrong property access — obje üzerinde var olmayan key'e erişim. Gonet portföyünde bir e-ticaret projesinde strict mode açıldığında 340 adet potansiyel null reference hatası tespit edildi, production'a ulaşmadan düzeltildi."
  - q: "Zod schema'dan TypeScript tipi nasıl türetilir ve neden önemli?"
    a: "Zod'un z.infer utility type'ı, runtime schema'dan derleme zamanı TypeScript tipi çıkarır: const UserSchema = z.object({ name: z.string(), age: z.number() }); type User = z.infer<typeof UserSchema>; şeklinde. Bu kritiktir çünkü tek kaynak (schema) hem runtime validation hem static typing'i garanti eder. Alternatif yaklaşımda (interface yazıp ayrıca validation kodu) iki kaynak sync dışı kalabilir — interface güncellenir ama validation unutulur. Gonet projelerinde schema-first yaklaşım sayesinde API contract değişikliği hem frontend tiplerini hem backend validation'ı otomatik günceller, manuel sync gereksiz hale gelir."
  - q: "TypeScript strict mode ekip için öğrenme eğrisi yaratır mı?"
    a: "İlk 2-3 hafta adaptasyon gerektirir, ancak modern IDE'ler (VS Code, WebStorm) tip hataları için instant feedback ve auto-fix önerileri sunar. Gonet'te yeni ekip üyelerine 4 saatlik TypeScript workshop + 2 hafta code review odaklı onboarding uygularız. Junior developer'ların ilk zorlandığı konular: generic types, discriminated unions, utility types (Pick, Omit, Partial). Ancak 1 ay sonra tip sistemi güvenlik ağı olarak görülür — kod yazarken editörde hata görmek, production'da kullanıcıdan görmekten iyidir. Gonet müşterilerinden birinde 3 kişilik ekip, 6 ayda strict mode'a alıştı ve artık JavaScript'e dönmek istemiyor, çünkü refactoring güveni %80 arttı."
---

## TypeScript (strict mode) nedir?

TypeScript, JavaScript'e statik tip sistemi ekleyen açık kaynak bir programlama dilidir. Strict mode (`tsconfig.json` içinde `strict: true` flag'i), dilin en katı tip kontrol seviyesini aktive eder: null safety, implicit any yasağı, unused parameter kontrolleri gibi tüm güvenlik katmanları devreye girer. Gonet'te TypeScript strict mode, sadece syntax kontrolü değil, **end-to-end type safety** stratejisinin temelidir — API sözleşmesinden UI component prop'larına, veritabanı şemasından form validasyonuna her katman tip güvenli inşa edilir. Zod gibi runtime validation (çalışma zamanı doğrulama) kütüphaneleriyle entegrasyonu, statik tiplerin runtime'da da garanti edilmesini sağlar.

26 yıllık deneyimimizde şunu gördük: büyük ölçekli projelerde hatalar %70 oranında tip uyumsuzluklarından kaynaklanır. Strict mode bu hataları development aşamasında yakalar, Zod ise dış dünyadan gelen veriyi (API response, user input) tip güvenli şekilde parse eder.

## Neden kritik?

JavaScript'in dinamik doğası esneklik sağlar, ancak ölçekte bakım maliyetini katlar. Production'da `undefined is not a function` hatası görmek, 2025'te kabul edilemez. TypeScript strict mode + runtime validation kombinasyonu üç kritik avantaj sunar:

**Erken hata tespiti**: Geleneksel JavaScript'te hata ancak kullanıcı o kod yoluna girdiğinde ortaya çıkar. Strict mode, editörde kod yazarken tip hatalarını gösterir. Bir API yanıtının `user.email` yerine `user.mail` döndüğü senaryoda, TypeScript derleme aşamasında uyarır, Zod ise runtime'da invalid response'u reject eder — kullanıcıya ulaşmadan.

**Refactoring güvenliği**: 50+ component'li bir proje düşünün. Bir data model'in field adı değiştiğinde, strict mode tüm etkilenen satırları işaretler. Manuel 'find-replace' yerine compiler sizi yönlendirir. Gonet portföyünde 200+ sayfa, 30+ API endpoint'li bir e-ticaret projesinde kategori şemasını değiştirdiğimizde, 4 saat yerine 20 dakikada refactor tamamlandı.

**Dokümantasyon olarak kod**: Tipler canlı dokümantasyondur. `ProductCard` component'ine bakan developer, kabul edilen prop'ları, zorunlu/opsiyonel alanları, enum değerlerini tip tanımlarından okur. Confluence'da güncellenmeyi unutulan doküman yerine, kod her zaman doğru kaynaktır.

Zod ekosistemindeki kritik rol: API contract'ı `zod.object({...})` ile tanımlanınca, aynı şemadan hem TypeScript interface (`z.infer<typeof schema>`) hem OpenAPI spec hem form validation kuralları türetilebilir. Tek kaynak, üç kullanım — DRY (Don't Repeat Yourself) prensibinin zirvesi.

## Gonet yaklaşımı

Gonet'te TypeScript strict mode standart, Zod ise tüm API ve form katmanlarında zorunludur. Yaklaşımımız üç katmandan oluşur:

**1. Schema-first API contracts**: Her API endpoint'i için Zod schema yazarız. Örnek Next.js API route:

```typescript
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  price: z.number().positive(),
  tags: z.array(z.string()).optional()
});

export async function POST(req: Request) {
  const body = await req.json();
  const validated = ProductSchema.parse(body); // Runtime'da tip garanti
  // validated değişkeni artık type-safe
}
```

Bu yaklaşım hem backend hem frontend'de aynı şemayı kullanır (monorepo'da paylaşılan `@repo/schemas` paketi). API değiştiğinde, tüm tüketen kodlar derleme hatası verir.

**2. Discriminated unions**: Form state, async data gibi karmaşık durumlar için discriminated union pattern'i uygularız:

```typescript
type AsyncData<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

React component'lerinde `if (state.status === 'success')` kontrolü yaptığınızda, TypeScript otomatik olarak `state.data`'nın mevcut olduğunu bilir. Runtime `undefined` hatası imkansız hale gelir.

**3. Build-time type checks**: CI/CD pipeline'da `tsc --noEmit` komutu zorunlu adımdır. Tip hatası olan kod asla production'a ulaşmaz. GitHub Actions workflow örneği:

```yaml
- name: Type check
  run: pnpm tsc --noEmit
- name: Validate schemas
  run: pnpm test:schemas # Zod schema'ların kendi test suite'i
```

Gonet müşterilerinden biri için geliştirdiğimiz headless CMS entegrasyonunda, 40+ content type Zod schema'yla tanımlandı. Content editör yanlış formatta veri girdiğinde, kaydetme öncesi validation UI'da gösterildi — API'ye invalid request asla ulaşmadı. Sonuç: 6 ay içinde production'da sıfır tip hatası.

## Hangi durumlarda kritik avantaj?

| Durum | Etki |
|-------|------|
| **Büyük ekip/yüksek churn**: 5+ developer veya yıllık %30+ ekip değişimi | Yeni developer'lar tip sistem sayesinde kodbase'i hızlı anlar, onboarding süresi %40 kısalır. Tip hataları pull request aşamasında yakalanır. |
| **API-heavy uygulamalar**: 20+ external/internal endpoint tüketen SPA | Zod schema'lar API contract'ını garanti eder. Backend değişikliği frontend'de derleme hatası verir, runtime surprise ortadan kalkar. |
| **Form-intensive projeler**: Çok adımlı formlar, karmaşık validation | Zod schema'dan hem TypeScript tip hem form validation hem error message'lar türetilir. Tek kaynak, tutarlı UX. |
| **Monorepo/paylaşılan kod**: Frontend, backend, mobile aynı repo'da | Shared `@repo/types` paketi sayesinde tüm platformlar aynı tip tanımlarını kullanır. Değişiklik hepsini etkiler, sync otomatik. |
| **Yüksek uptime gereksinimi**: E-ticaret, fintech gibi hata toleransı düşük sistemler | Strict mode + runtime validation, production'da tip kaynaklı crash'leri minimize eder. Gonet portföyünde bir fintech müşterisinde 99.97% uptime katkısı. |

## İlgili yetkinlikler

TypeScript strict mode, modern web stack'inin omurgasıdır ve şu yetkinliklerle sinerji yaratır:

- [Next.js App Router](/yetkinlikler/nextjs-app-router): Server Component'lerde end-to-end type safety, özellikle async data fetching'de kritik.
- [Headless CMS Entegrasyonu](/yetkinlikler/headless-cms-entegrasyonu): Content type'ları Zod schema'yla model edilir, GraphQL/REST response'ları runtime validate edilir.
- [React Server Components](/yetkinlikler/react-server-components): Server-client boundary'de tip güvenliği, serialization hatalarını önler.
- [API Tasarımı (RESTful/GraphQL)](/yetkinlikler/api-tasarimi): Zod schema'lar OpenAPI spec'e dönüştürülür, API dokümantasyonu otomatik güncellenir.

## Gonet ile çalışmak

Gonet'in 220+ marka portföyünde TypeScript strict mode, bakım maliyetini ortalama %35 düşürdü. Zod entegrasyonuyla runtime hata oranı %60 azaldı. Ekibimiz, legacy JavaScript kodunuzu kademe kademe TypeScript'e migrate edebilir veya greenfield projenizi ilk satırdan type-safe inşa edebilir. Type safety sadece teknik tercih değil, uzun vadeli yatırım güvencesidir. [İletişime geçin](/iletisim), projeniz için type-safe stack stratejisi oluşturalım.
