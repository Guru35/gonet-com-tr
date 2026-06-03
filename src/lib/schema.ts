// Schema.org JSON-LD üreticileri — sayfa başına kullanılır
// AEO için Organization + WebSite + Article + Person + Service + FAQPage tipleri

const SITE_URL = 'https://gonet.com.tr';
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

// Tek sefer tanımlanan global Organization
export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'GONET',
  alternateName: 'Gonet Kreatif Ajans',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.svg`,
  },
  description:
    'Gonet, firmaları çekici kılar ve müşterileriyle buluşturur. 25 yılı aşkın deneyimle dijital strateji, kreatif pazarlama, web tasarım ve marka ekosistemleri üretir.',
  foundingDate: '2001',
  founder: { '@type': 'Person', name: 'Gokhan' },
  knowsAbout: [
    'Dijital Strateji',
    'Kreatif Pazarlama',
    'Marka Ekosistemleri',
    'Web Tasarım',
    'Reklam Kampanyaları',
    'Sağlık Turizmi Pazarlama',
    'Answer Engine Optimization',
  ],
  areaServed: { '@type': 'Country', name: 'TR' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'gokhan@gonet.com.tr',
    availableLanguage: ['Turkish', 'English'],
  },
  sameAs: [
    // TODO: gerçek sosyal medya hesapları eklenecek
    // 'https://www.linkedin.com/company/gonet-com-tr',
    // 'https://twitter.com/gonetcomtr',
  ],
};

// Global WebSite schema
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'GONET',
  publisher: { '@id': ORG_ID },
  inLanguage: 'tr',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Article schema (blog post için)
export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  published: Date;
  updated?: Date;
  author?: { name: string; role?: string; url?: string };
  category?: string;
  tags?: string[];
  image?: string;
}) {
  const url = `${SITE_URL}/blog/${opts.slug}`;
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: opts.title,
    description: opts.description,
    url,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated || opts.published).toISOString(),
    author: {
      '@type': 'Person',
      name: opts.author?.name || 'Gonet',
      jobTitle: opts.author?.role,
      url: opts.author?.url,
    },
    publisher: { '@id': ORG_ID },
    inLanguage: 'tr',
    isPartOf: { '@id': SITE_ID },
    image: opts.image ? { '@type': 'ImageObject', url: opts.image } : undefined,
    articleSection: opts.category,
    keywords: opts.tags?.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

// WebPage schema (statik sayfa için)
export function webpageSchema(opts: {
  title: string;
  description: string;
  url: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  breadcrumb?: { name: string; url: string }[];
}) {
  return {
    '@type': opts.type || 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: 'tr',
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    breadcrumb: opts.breadcrumb && {
      '@type': 'BreadcrumbList',
      itemListElement: opts.breadcrumb.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    },
  };
}

// Service schema
export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  areaServed?: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/uzmanlik/${opts.slug}#service`,
    name: opts.name,
    description: opts.description,
    provider: { '@id': ORG_ID },
    areaServed: opts.areaServed || 'TR',
    serviceType: opts.name,
    url: `${SITE_URL}/uzmanlik/${opts.slug}`,
  };
}

// FAQ schema
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}
