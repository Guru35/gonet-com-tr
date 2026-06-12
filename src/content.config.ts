import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// AEO-uyumlu content schemas — extraction-readiness + E-E-A-T
// Her sayfa Article veya WebPage schema'sıyla render edilir

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    schemaType: z.enum(['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage']).default('WebPage'),
    published: z.date().optional(),
    updated: z.date().optional(),
    lang: z.enum(['tr', 'en']).default('tr'),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    author: z.object({
      name: z.string().default('Gonet'),
      role: z.string().optional(),
      url: z.string().optional(),
    }).default({ name: 'Gonet' }),
    published: z.date(),
    updated: z.date().optional(),
    ogImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    readingMinutes: z.number().optional(),
    lang: z.enum(['tr', 'en']).default('tr'),
    draft: z.boolean().default(false),
    // İnteraktif yazı bileşeni anahtarı. Set ise [...slug].astro prose'dan sonra
    // ilgili bileşeni render eder. Enum: typo build'de patlar (sessiz kayıp yok).
    interactive: z.enum(['model-kilavuzu']).optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    industry: z.string().optional(),
    services: z.array(z.string()).default([]),
    year: z.number(),
    results: z.array(z.object({
      metric: z.string(),
      value: z.string(),
    })).default([]),
    ogImage: z.string().optional(),
    lang: z.enum(['tr', 'en']).default('tr'),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    icon: z.string().optional(),
    order: z.number().default(0),
    relatedServices: z.array(z.string()).default([]),
    lang: z.enum(['tr', 'en']).default('tr'),
    draft: z.boolean().default(false),
  }),
});

// /yetenekler/<categorySlug>/<skillSlug> mikrosite alt sayfaları
// Klasör yapısı: src/content/yetkinlikler/<categorySlug>/<skillSlug>.md
const yetkinlikler = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/yetkinlikler' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string().optional(),
    categorySlug: z.string(),       // örn. 'aeo-geo-yeni-nesil-arama'
    categoryName: z.string(),       // örn. 'AEO / GEO — Yeni Nesil Arama'
    skillSlug: z.string(),          // örn. 'schema-org-json-ld-entity-authority'
    skillLevel: z.enum(['Uzman','İleri','Orta']).default('Uzman'),
    keywords: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    ogImage: z.string().optional(),
    detailHero: z.string().optional(),  // Detay sayfası geniş arka plan görseli (21:9 önerilir)
    references: z.array(z.object({
      title: z.string(),
      url: z.string().optional(),
      authors: z.string().optional(),
      publisher: z.string().optional(),
      year: z.string().optional(),
    })).default([]),
    editorReviewedAt: z.string().optional(),  // YYYY-MM-DD; boşsa "bekliyor" gösterilir
    editorReviewedBy: z.string().optional(),  // Onaylayan editör adı
    // Değişiklik geçmişi — sayfa dinamik sinyali (AEO için pozitif), şeffaflık
    changelog: z.array(z.object({
      date: z.string(),  // YYYY-MM-DD
      type: z.enum(['initial','revision','enhancement','factcheck','correction','schema']).default('revision'),
      summary: z.string(),
    })).default([]),
    published: z.date().optional(),
    updated: z.date().optional(),
    lang: z.enum(['tr', 'en']).default('tr'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, blog, 'case-studies': caseStudies, services, yetkinlikler };
