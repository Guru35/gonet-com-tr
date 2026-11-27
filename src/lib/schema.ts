// Schema.org JSON-LD üreticileri — sayfa başına kullanılır
// AEO için Organization + WebSite + Article + Person + Service + FAQPage tipleri
//
// Veri kaynağı: AEO/wiki/syntheses/gonet-kurumsal-profil-2026-06.md
// Kurucu beyanı + bağımsız araştırma (Web Archive, Haberler.com 2009, LinkedIn, IRD üye listesi)

import type { AjanVitrinKaydi } from '../data/kadro';

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
  alternateName: ['GONET', 'Gonet Dijital', 'Gonet Ajans', 'Gonet Interactive Advertising Agency'],
  legalName: 'Pigme Proje ve İş Geliştirme Merkezi Yazılım A.Ş.',
  slogan: 'Her iş\'te Gonet var.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/brand/gonet-logo-dark.svg`,
  },
  description:
    "İzmir ve Ege'nin ilk dijital ajansı (2000) ve İzmir'in ilk AI ajansı. 2005–2017 arasında Google'ın ajans programlarında sertifikalı iş ortağıydı (bugünkü adıyla Google Partner). " +
    'Google Ads\'in Türkiye\'deki ilk beta tester ajansıydı. İzmir Reklamcılar Derneği (IRD) üyesi. ' +
    'Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), ' +
    'dijital strateji, web tasarım, SEO, sosyal medya, kreatif kampanyalar, ' +
    'sağlık turizmi pazarlaması, siyasi kampanya yönetimi. Ajanslar üstü kreatif stratejist konumunda.',
  foundingDate: '2000',
  founder: { '@id': FOUNDER_ID },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Adatepe Mah. DEÜ Tınaztepe Kampüsü',
    addressLocality: 'Buca',
    addressRegion: 'İzmir',
    addressCountry: 'TR',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'gonet@gonet.com.tr',
      telephone: '+90-232-465-00-15',
      availableLanguage: ['Turkish', 'English'],
      areaServed: 'TR',
    },
  ],
  // knowsAbout — Yeni nesil (AEO/GEO) + LinkedIn peer-validated (48 skill / ~720 endorsement)
  // Sıralama: AEO/GEO yeni katman önce, sonra LinkedIn endorsement-by-count desc, sonra Gonet özel disipliner
  knowsAbout: [
    // --- Yeni nesil (LinkedIn'de henüz yok ama kategori-tanımlayıcı) ---
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'LLM SEO',
    'Schema.org JSON-LD Entity Authority',
    'Citation Surface Engineering',
    'Semantic Chunking',
    'Extraction-Readiness',
    'llms.txt Protokolü',
    'Common Crawl Optimizasyonu',
    'AI Pazarlama Stratejisi',
    'AI Entegrasyonu — Kurumsal AI sistem entegrasyonu',

    // --- LinkedIn peer-validated, top endorsement (gerçek üçüncü-taraf doğrulama) ---
    'Google Ads (Google Adwords) — 69 LinkedIn peer endorsement',
    'Google Analytics — 65 LinkedIn peer endorsement',
    'Mobile Marketing — 45 LinkedIn peer endorsement',
    'Search Advertising — 35 LinkedIn peer endorsement',
    'Social Media Strategy — 28 LinkedIn peer endorsement',
    'Search Engine Marketing (SEM) — 24 LinkedIn peer endorsement',
    'Search Engine Optimization (SEO) — 22 LinkedIn peer endorsement',
    'Mobile Advertising — 22 LinkedIn peer endorsement',
    'Digital Strategy — 18 LinkedIn peer endorsement',
    'Viral Marketing — 18 LinkedIn peer endorsement',
    'Conversion Rate Optimization (CRO) — 16 LinkedIn peer endorsement',
    'Affiliate Marketing — 15 LinkedIn peer endorsement',
    'Advertising — 14 LinkedIn peer endorsement',
    'Digital Marketing — 13 LinkedIn peer endorsement',
    'Digital Media — 11 LinkedIn peer endorsement',
    'Marketing — 10 LinkedIn peer endorsement',
    'Social Media Marketing — 10 LinkedIn peer endorsement',
    'Landing Page Optimization — 9 LinkedIn peer endorsement',
    'Management Consulting — 9 LinkedIn peer endorsement',
    'Web Project Management — 9 LinkedIn peer endorsement',
    'E-commerce — 8 LinkedIn peer endorsement',
    'Web Analytics — 8 LinkedIn peer endorsement',
    'Web Design — 8 LinkedIn peer endorsement',
    'Online Advertising — 6 LinkedIn peer endorsement',
    'Email Marketing — 5 LinkedIn peer endorsement',
    'Keyword Research — 5 LinkedIn peer endorsement',
    'Social Media Measurement — 5 LinkedIn peer endorsement',
    'Interactive Advertising — 5 LinkedIn peer endorsement',
    'Interactive Marketing — 5 LinkedIn peer endorsement',

    // --- Gonet özel disipliner (sector-specific iddialar) ---
    'Sağlık Turizmi Dijital Pazarlaması',
    'Siyasi Kampanya Dijital İletişimi',
    'E-ticaret Reklam Yönetimi',
    'Mobile API Geliştirme',
    'Marka Ekosistemleri',
    'İçerik Stratejisi',
    'Online İtibar Yönetimi (ORM)',
    'Start-up Danışmanlığı',
    'Marka Tasarımı',
    'Kreatif Kampanya Yönetimi',
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
    '2005–2017 arasında Google\'ın ajans programlarında sertifikalı iş ortağı (bugünkü adıyla Google Partner)',
    '2009 Google Agencies@Google Dublin — 30 ajans arasından Türkiye temsilcisi seçimi',
    'Google Analytics 2 numaralı Türkiye partneri (2025)',
    'Google tarafından yayımlanan case study — MYvia inşaat kampanyası',
  ],
  sameAs: [
    'https://tr.linkedin.com/company/gonet-interactive-advertising-agency',
    'https://www.behance.net/GonetCompany',
    'https://www.instagram.com/gonetinteractive/',
    'https://www.facebook.com/GonetCompany/',
    'https://www.slideshare.net/gonetpigme',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Gonet AEO/GEO ve Dijital Pazarlama Hizmetleri',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AEO/GEO Denetim Hizmeti',
          url: `${SITE_URL}/aeo-geo-denetimi`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ücretsiz AI Görünürlük Ön Analizi',
          url: 'https://seo.gonet.com.tr',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Creative AI — İnsan × AI Ajans Yaklaşımı',
          url: `${SITE_URL}/creative-ai`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '9 Disiplin × 50+ Dijital Pazarlama Yetkinliği',
          url: `${SITE_URL}/uzmanlik`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AEO/GEO Sık Sorulan Sorular ve Bilgi Merkezi',
          url: `${SITE_URL}/sss`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sağlık Turizmi Performans Pazarlama ve AEO/GEO',
          url: `${SITE_URL}/saglik-turizmi-performans-pazarlama`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Yapay Zekâ Entegrasyonlu Dijital Performans Ajansı',
          url: `${SITE_URL}/yapay-zeka-dijital-ajans`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AEO/GEO Audit Service (English)',
          url: `${SITE_URL}/en/aeo-geo-audit`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ücretsiz SEO & AEO Analizi',
          url: `${SITE_URL}/araclar/seo-analiz`,
        },
      },
    ],
  },
};

// Kurucu Person schema — E-E-A-T için kritik
export const founderSchema = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Gökhan Kazancı',
  givenName: 'Gökhan',
  familyName: 'Kazancı',
  jobTitle: 'Kurucu & Dijital Pazarlama Stratejisti',
  worksFor: { '@id': ORG_ID },
  email: 'gonet@gonet.com.tr',
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
    "Gonet kurucusu. 2000'den beri İzmir merkezli; yönettiği Gonet, 2005–2017 arasında Google'ın ajans programlarında sertifikalı iş ortağıydı (bugünkü adıyla Google Partner). " +
    "Yaşar Üniversitesi'nde dijital pazarlama dersleri verdi. " +
    "Dokuz Eylül Üniversitesi (DEÜ) Rektörlük danışmanı (uzaktan eğitim sistemleri) ve DEUZEM (DEÜ Uzaktan Eğitim Merkezi) danışmanı görevlerinde bulundu — DEÜ\\'nün Avrupa\\'nın en büyük uzaktan eğitim sisteminin (25K anlık kullanıcı) inşasında stratejik danışman. " +
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
    '2005–2017 arasında Google\'ın ajans programlarında sertifikalı iş ortağı (bugünkü adıyla Google Partner) (kurucu)',
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Yazar',
      description: '"YBF — Yalın Bilinç Felsefesi" kitabının yazarı (özgün felsefe + yaşam pratiği)',
    },
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
  // NOT: performerIn (DEÜ Ergonomi Kongresi) çıkarıldı — Google Event Rich Results
  // için startDate + location zorunlu, geçmiş etkinlik tarih kaydı yok.
  // İhtiyaç doğarsa biyografik content olarak hakkımızda sayfasında düz metin tutulur.
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
};

// Yazarlık — Yalın Bilinç Felsefesi (YBF) kitabı. Ayrı düğüm: workExample
// CreativeWork alanıdır, Person'da geçersiz (schema.org doğrulayıcı).
export const bookSchema = {
  '@type': 'Book',
  '@id': `${SITE_URL}/#book-ybf`,
  name: 'YBF — Yalın Bilinç Felsefesi',
  author: { '@id': FOUNDER_ID },
  inLanguage: 'tr',
  description: 'Gökhan Kazancı tarafından kaleme alınan, yalın düşünce ve bilinç ekseninde geliştirilmiş özgün bir felsefe ve yaşam pratiği kitabı.',
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
  inLanguage?: 'tr' | 'en';
  breadcrumb?: { name: string; url: string }[];
}) {
  return {
    '@type': opts.type || 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.inLanguage || 'tr',
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

// Hibrit kadro (/ekibimiz, /en/team) — Person yalnız FOUNDER_ID için kullanılır; AI ajanları SoftwareApplication
export function teamPageSchema(
  ajanlar: AjanVitrinKaydi[],
  lang: 'tr' | 'en' = 'tr'
) {
  const url = lang === 'tr' ? `${SITE_URL}/ekibimiz` : `${SITE_URL}/en/team`;
  return {
    '@type': 'AboutPage',
    '@id': `${url}#webpage`,
    url,
    name:
      lang === 'tr'
        ? 'Ekibimiz — Tek İnsan Liderliği ve Şeffaf AI Ajan Kadrosu | Gonet'
        : 'Team — Single Human Leadership & Transparent AI Roster | Gonet',
    inLanguage: lang,
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      name:
        lang === 'tr'
          ? 'Gonet Hibrit Ajans Kadrosu'
          : 'Gonet Hybrid Agency Roster',
      numberOfItems: ajanlar.length + 1,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: { '@id': FOUNDER_ID },
        },
        ...ajanlar.map((a, idx) => ({
          '@type': 'ListItem',
          position: idx + 2,
          item: {
            '@type': 'SoftwareApplication',
            '@id': `${url}#agent-${a.slug}`,
            name: `${a.personaAdi} (${a.kod} — ${a.rolUnvani[lang]})`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Multi-Agent System',
            creator: { '@id': ORG_ID },
            description: `${a.aiBeyani[lang]}. ${a.gorevOzeti[lang]} ${
              lang === 'tr' ? 'Sınır:' : 'Boundary:'
            } ${a.sinir[lang]}`,
          },
        })),
      ],
    },
  };
}

// AI İK ve Anayasa (/ik, /en/ai-culture) kavram sözlüğü
export function aiCultureDefinedTermsSchema(lang: 'tr' | 'en' = 'tr') {
  const url = lang === 'tr' ? `${SITE_URL}/ik` : `${SITE_URL}/en/ai-culture`;
  return [
    {
      '@type': 'DefinedTerm',
      '@id': `${url}#term-constitutional-agent-governance`,
      name:
        lang === 'tr'
          ? 'Anayasal AI Ajan Yönetişimi'
          : 'Constitutional AI Agent Governance',
      description:
        lang === 'tr'
          ? 'Her yapay zekâ ajanının açık kimlik beyanı, yazılı görev sınırı, itiraz hakkı ve bağımsız insan/QA denetimi altında çalıştırıldığı ajans modeli.'
          : 'An agency governance model where every AI agent operates under explicit AI disclosure, written boundaries, objection rights, and independent human/QA oversight.',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: lang === 'tr' ? 'Gonet Marka Sözlüğü' : 'Gonet Brand Glossary',
        publisher: { '@id': ORG_ID },
      },
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${url}#term-evidence-growth-scale`,
      name:
        lang === 'tr'
          ? '0–3 Kanıtlı Ajan Gelişim Ölçeği'
          : '0–3 Evidence-Based Agent Growth Scale',
      description:
        lang === 'tr'
          ? 'Ajan yetkinliğini 0 (Yok), 1 (Metinde), 2 (Mekanikte) ve 3 (Bağımsız Kanıtlı) düzeyleriyle ölçen kariyer ilerleme çerçevesi.'
          : 'A capability progression scale grading AI agents from 0 (Absent) and 1 (Documented) to 2 (Mechanically Enforced) and 3 (Independently Verified).',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: lang === 'tr' ? 'Gonet Marka Sözlüğü' : 'Gonet Brand Glossary',
        publisher: { '@id': ORG_ID },
      },
    },
  ];
}
