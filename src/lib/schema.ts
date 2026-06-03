// Schema.org JSON-LD üreticileri — sayfa başına kullanılır
// AEO için Organization + WebSite + Article + Person + Service + FAQPage tipleri
//
// Veri kaynağı: AEO/wiki/syntheses/gonet-kurumsal-profil-2026-06.md
// Kurucu beyanı + bağımsız araştırma (Web Archive, Haberler.com 2009, LinkedIn, IRD üye listesi)

export const SITE_URL = 'https://gonet.com.tr';
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

// Tek sefer tanımlanan global Organization
// Pigme A.Ş. legal entity + Gonet brand
export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Gonet',
  alternateName: ['GONET', 'Gonet Interactive Advertising Agency'],
  legalName: 'Pigme Proje ve İş Geliştirme Merkezi Yazılım A.Ş.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/brand/gonet-logo-dark.svg`,
  },
  description:
    "İzmir ve Ege'nin ilk dijital ajansı (2000) ve İzmir'in ilk AI ajansı. Türkiye'nin ilk 3 Google Partner ajansından biri, " +
    'Google Ads Türkiye beta tester. İzmir Reklamcılar Derneği (IRD) üyesi. ' +
    'Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), ' +
    'dijital strateji, web tasarım, SEO, sosyal medya, kreatif kampanyalar, ' +
    'sağlık turizmi pazarlaması, siyasi kampanya yönetimi. Ajanslar üstü kreatif stratejist konumunda.',
  foundingDate: '2000',
  founder: { '@id': FOUNDER_ID },
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 14, unitText: 'people' },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'İsmet Kaptan Mah. 1385 Sok. No:3 Kat:4 D:403',
      addressLocality: 'Konak',
      addressRegion: 'İzmir',
      addressCountry: 'TR',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Folkart Towers A Kule Kat:26 D:2601',
      addressLocality: 'Bayraklı',
      addressRegion: 'İzmir',
      addressCountry: 'TR',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'gokhan@gonet.com.tr',
    availableLanguage: ['Turkish', 'English'],
    areaServed: 'TR',
  },
  knowsAbout: [
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'LLM SEO',
    'Schema.org JSON-LD Entity Authority',
    'Dijital Strateji',
    'Web Tasarım',
    'Google Ads (SEM)',
    'Arama Motoru Optimizasyonu (SEO)',
    'Sosyal Medya Yönetimi',
    'Marka Tasarımı',
    'Kreatif Kampanya',
    'Online İtibar Yönetimi',
    'Start-up Danışmanlığı',
    'Sağlık Turizmi Pazarlaması',
    'Siyasi Kampanya Yönetimi',
    'E-ticaret Reklam Yönetimi',
    'Mobile API Geliştirme',
    'Marka Ekosistemleri',
    'İçerik Stratejisi',
  ],
  areaServed: { '@type': 'Country', name: 'TR' },
  // Üyelik — IRD (İzmir Reklamcılar Derneği) doğrulandı
  memberOf: {
    '@type': 'Organization',
    name: 'İzmir Reklamcılar Derneği',
    alternateName: 'IRD',
    url: 'https://ird.org.tr/',
  },
  // Lokasyon — DEPARK mukimi
  location: {
    '@type': 'Place',
    name: 'Dokuz Eylül Teknopark (DEPARK)',
    address: { '@type': 'PostalAddress', addressLocality: 'İzmir', addressCountry: 'TR' },
  },
  // Google ödülleri — Türkiye Google Partner programının önde gelen ajanslarından biri olarak
  award: [
    'Google\'dan birden fazla ajans ödülü (yıllar boyunca, çeşitli kategorilerde)',
    'Türkiye\'nin ilk 3 Google Partner ajansından biri',
    '2009 Google Agencies@Google Dublin — 30 ajans arasından Türkiye temsilcisi seçimi',
    'Google Analytics 2 numaralı Türkiye partneri (2025)',
  ],
  sameAs: [
    'https://tr.linkedin.com/company/gonet-interactive-advertising-agency',
    'https://www.behance.net/GonetCompany',
    'https://www.facebook.com/GonetCompany/',
    'https://www.slideshare.net/gonetpigme',
  ],
};

// Kurucu Person schema — E-E-A-T için kritik
export const founderSchema = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Gökhan Kazancı',
  givenName: 'Gökhan',
  familyName: 'Kazancı',
  birthDate: '1975-11-11',
  jobTitle: 'Kurucu & Dijital Pazarlama Stratejisti',
  worksFor: { '@id': ORG_ID },
  email: 'gokhan@gonet.com.tr',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Dokuz Eylül Üniversitesi',
    department: 'İktisadi ve İdari Bilimler Fakültesi (İİBF)',
  },
  affiliation: [
    {
      '@type': 'EducationalOrganization',
      name: 'Dokuz Eylül Üniversitesi — Rektörlük',
      department: 'Uzaktan Eğitim Sistemleri Danışmanlığı',
      url: 'https://www.deu.edu.tr/',
    },
    {
      '@type': 'EducationalOrganization',
      name: 'DEUZEM — Dokuz Eylül Üniversitesi Uzaktan Eğitim Uygulama ve Araştırma Merkezi',
      department: 'Danışmanlık',
      url: 'https://deuzem.deu.edu.tr/',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Yaşar Üniversitesi',
      department: 'Dijital Pazarlama Dersleri (Eğitmen)',
      url: 'https://www.yasar.edu.tr/',
    },
  ],
  knowsAbout: [
    'Dijital Pazarlama Stratejisi',
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'LLM SEO',
    'Schema.org JSON-LD Entity Authority',
    'Google Ads (SEM)',
    'SEO',
    'Sosyal Medya Pazarlaması',
    'Start-up Danışmanlığı',
    'Marka Stratejisi',
    'Web Tasarım',
    'Web Geliştirme',
    'E-ticaret',
    'Interactive Advertising',
    'Kreatif Direktörlük',
    'Ajans Yönetimi',
    'İçerik Stratejisi',
    'Sağlık Turizmi Pazarlaması',
    'Siyasi Kampanya Dijital İletişimi',
    'Mobile API Geliştirme',
  ],
  description:
    "Gonet kurucusu. 2000'den beri İzmir merkezli, Türkiye'nin ilk 3 Google Partner ajansından birini yönetiyor. " +
    "Yaşar Üniversitesi'nde dijital pazarlama dersleri verdi. " +
    "Dokuz Eylül Üniversitesi (DEÜ) Rektörlük danışmanı (uzaktan eğitim sistemleri) ve DEUZEM (DEÜ Uzaktan Eğitim Merkezi) danışmanı görevlerinde bulundu — DEÜ\\'nün Avrupa\\'nın en büyük uzaktan eğitim sisteminin (25K anlık kullanıcı) inşasında stratejik danışman. " +
    'Babası matbaacı ve yerel gazete sahibi — basın/yayın geçmişi mirasından. ' +
    "LinkedIn'de 16.000'den fazla takipçisi var; profesyonel motto: \"Her şey çok güzel olacak :)\".",
  nationality: { '@type': 'Country', name: 'TR' },
  address: { '@type': 'PostalAddress', addressLocality: 'İzmir', addressCountry: 'TR' },
  sameAs: [
    'https://www.linkedin.com/in/gokhankazanci/',
    'https://www.behance.net/GonetCompany',
  ],
  award: [
    'Google ajans ödülleri (çoklu, yıllar boyunca)',
    '2009 Google Agencies@Google Dublin — 30 ajans arasından Türkiye temsilcisi',
    'Türkiye\'nin ilk 3 Google Partner ajansından biri (kurucu)',
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Dijital Pazarlama Eğitmeni',
      description: 'Yaşar Üniversitesi\'nde dijital pazarlama dersleri + çok sayıda firma ve kurumda dijital pazarlama eğitimleri verdi',
    },
    {
      '@type': 'Occupation',
      name: 'Konferans Konuşmacısı',
      description: 'DEÜ Ergonomi Kongresi sponsorluğu + eğitim sunumu dahil çeşitli akademik ve sektörel etkinliklerde konuşmacı',
    },
    {
      '@type': 'Occupation',
      name: 'Uzaktan Eğitim Sistemleri Danışmanı',
      description: 'DEÜ Rektörlük + DEUZEM — Avrupa\'nın en büyük uzaktan eğitim sisteminin (anlık 25K kullanıcı) inşasında stratejik danışmanlık',
    },
  ],
  performerIn: {
    '@type': 'EducationEvent',
    name: 'DEÜ Ergonomi Kongresi',
    organizer: { '@type': 'CollegeOrUniversity', name: 'Dokuz Eylül Üniversitesi' },
    description: 'Gonet sponsor; Gökhan Kazancı eğitim sunumu',
  },
  interactionStatistic: {
    '@type': 'InteractionCounter',
    interactionType: { '@type': 'FollowAction' },
    userInteractionCount: 16084,
    name: 'LinkedIn followers',
  },
};

// Global WebSite schema
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: 'Gonet',
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
      name: opts.author?.name || 'Gökhan Kazancı',
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
