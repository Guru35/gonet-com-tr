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
    "2000 yılında İzmir'de kurulan dijital ajans; bugün kurucu insan liderliğini anayasal sınırlı 27 uzman yapay zekâ ajanıyla şeffaf biçimde birleştiren hibrit Creative AI ajansı. " +
    "2005–2017 arasında Google'ın ajans programlarında sertifikalı iş ortağıydı (bugünkü adıyla Google Partner). " +
    "Google Ads'in Türkiye'deki erken dönem beta tester ajanslarındandı. İzmir Reklamcılar Derneği (IRD) üyesi. " +
    'Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), ' +
    'dijital strateji, web tasarım, SEO, sosyal medya, kreatif kampanyalar, ' +
    'sağlık turizmi pazarlaması ve siyasi kampanya yönetimi alanlarında çalışır.',
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
    'Constitutional AI Agent Governance (Anayasal AI Ajan Yönetişimi)',
    'Transparent Human × AI Hybrid Agency Architecture',

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
    'https://www.edvido.com/tr/ajans/gonet',
  ],
  department: [
    {
      '@type': 'Organization',
      '@id': `${ORG_ID}-dept-yonetim`,
      name: 'Yönetim & Kurmay',
      alternateName: 'Governance & Strategy',
      description:
        'Kurucu insan onayına bağlı stratejik planlama, iş paketi dağıtımı, AI İK gelişim takibi ve bağımsız iç denetim birimi (3 uzman AI ajanı).',
      parentOrganization: { '@id': ORG_ID },
      url: `${SITE_URL}/ekibimiz`,
    },
    {
      '@type': 'Organization',
      '@id': `${ORG_ID}-dept-pazarlama-kreatif`,
      name: 'Pazarlama & Kreatif',
      alternateName: 'Marketing & Creative',
      description:
        'AEO/GEO görünürlük, dijital pazarlama stratejisi, kreatif direktörlük, art direktörlük, kaynaklı metin yazarlığı ve görsel üretim birimi (6 uzman AI ajanı).',
      parentOrganization: { '@id': ORG_ID },
      url: `${SITE_URL}/ekibimiz`,
    },
    {
      '@type': 'Organization',
      '@id': `${ORG_ID}-dept-web-yazilim`,
      name: 'Web & Yazılım',
      alternateName: 'Web & Software Engineering',
      description:
        'Astro web mimarisi, WCAG erişilebilirlik, teknik SEO/JSON-LD, API servisleri, veri boru hatları ve müşteri paneli mühendisliği birimi (2 uzman AI ajanı).',
      parentOrganization: { '@id': ORG_ID },
      url: `${SITE_URL}/ekibimiz`,
    },
    {
      '@type': 'Organization',
      '@id': `${ORG_ID}-dept-kalite-arastirma-hukuk`,
      name: 'Kalite, Araştırma & Hukuk',
      alternateName: 'QA, Research & Legal Compliance',
      description:
        'Bağımsız kalite kontrol kapısı, regresyon ve erişilebilirlik testleri, birincil kaynak araştırması, otomasyon mühendisliği ve KVKK/Reklam Kurulu/AB AI Act uyum danışmanlığı birimi (5 uzman AI ajanı).',
      parentOrganization: { '@id': ORG_ID },
      url: `${SITE_URL}/ekibimiz`,
    },
    {
      '@type': 'Organization',
      '@id': `${ORG_ID}-dept-altyapi-operasyon`,
      name: 'Altyapı, Hafıza & Operasyon',
      alternateName: 'Infrastructure, Memory & Operations',
      description:
        'OKF v0.3 kurumsal hafıza mimarisi, YBF etik denetimi, deterministik doğrulama kapıları, depo stratejisi, DNS/alan adı güvenliği, ön muhasebe ve karar kalibrasyonu birimi (11 uzman AI ajanı).',
      parentOrganization: { '@id': ORG_ID },
      url: `${SITE_URL}/ik`,
    },
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

export interface LokalMetin {
  tr: string;
  en: string;
}

export interface KadroAjanSchemaGirdisi {
  kod: string;
  slug: string;
  personaAdi: string;
  aiBeyani: LokalMetin;
  departmanKodu: string;
  departmanEtiketi: LokalMetin;
  rolUnvani: LokalMetin;
  gorevOzeti: LokalMetin;
  sinir: LokalMetin;
  raporHatti: LokalMetin;
  basamak: {
    kod: 'aday' | 'yetkin' | 'kidemli' | 'usta';
    tr: string;
    en: string;
    kanitOlcegi: 0 | 1 | 2 | 3;
  };
  ybfIlkesi: string;
}

// Hibrit kadro (/ekibimiz, /en/team) — Person yalnız FOUNDER_ID için kullanılır; AI ajanları SoftwareApplication
export function teamPageSchema(
  ajanlar: readonly (AjanVitrinKaydi | KadroAjanSchemaGirdisi)[],
  lang: 'tr' | 'en' = 'tr'
) {
  const url = lang === 'tr' ? `${SITE_URL}/ekibimiz` : `${SITE_URL}/en/team`;
  const homeUrl = lang === 'tr' ? `${SITE_URL}/` : `${SITE_URL}/en`;
  const title =
    lang === 'tr'
      ? 'Ekibimiz — Tek İnsan Liderliği ve Şeffaf AI Ajan Kadrosu | Gonet'
      : 'Team — Single Human Leadership & Transparent AI Roster | Gonet';
  const description =
    lang === 'tr'
      ? "Gonet'te her karar tek insan onayından geçer; üretimde 27 uzman yapay zekâ ajanı açık kimlik, görev sınırı ve gelişim karnesiyle çalışır."
      : 'Every deliverable at Gonet is approved by human founder Gökhan Kazancı. Meet our 27 specialist AI agents with declared boundaries and growth levels.';

  return {
    '@type': 'AboutPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    about: { '@id': ORG_ID },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'tr' ? 'Ana sayfa' : 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: lang === 'tr' ? 'Ekibimiz' : 'Team', item: url },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      '@id': `${url}#roster`,
      name: lang === 'tr' ? 'Gonet Hibrit Ajans Kadrosu' : 'Gonet Hybrid Agency Roster',
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
            url: `${url}#agent-${a.slug}`,
            name: `${a.personaAdi} (${a.kod} — ${a.rolUnvani[lang]})`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Constitutional Multi-Agent System',
            softwareVersion: `${a.basamak[lang]} (${a.basamak.kanitOlcegi}/3)`,
            inLanguage: lang,
            creator: { '@id': ORG_ID },
            maintainer: { '@id': ORG_ID },
            disambiguatingDescription: a.aiBeyani[lang],
            featureList: [
              a.departmanEtiketi[lang],
              `YBF: ${a.ybfIlkesi}`,
              `${lang === 'tr' ? 'Rapor Hattı' : 'Reports to'}: ${a.raporHatti[lang]}`,
            ],
            description: `${a.aiBeyani[lang]}. ${a.gorevOzeti[lang]} ${
              lang === 'tr' ? 'Ne DEĞİLDİR:' : 'Boundary:'
            } ${a.sinir[lang]}`,
          },
        })),
      ],
    },
  };
}

export const AI_CULTURE_FAQ_TR: { question: string; answer: string }[] = [
  {
    question: 'Anayasal AI Ajan Yönetişimi nedir ve ajans iş akışında neyi değiştirir?',
    answer:
      'Anayasal AI Ajan Yönetişimi, her yapay zekâ ajanının açık kimlik beyanı, yazılı görev sınırı, itiraz hakkı ve bağımsız denetim altında çalıştırıldığı ajans mimarisidir. Gonet bu modelle 27 uzman ajanını belirsiz sohbet botları yerine hesap verebilir üretim birimlerine dönüştürerek her çıktıyı kurucu insan onayına bağlar.',
  },
  {
    question: "Gonet'in YBF Varlık Anayasası yapay zekâ halüsinasyonlarını ve marka risklerini nasıl önler?",
    answer:
      'YBF Varlık Anayasası, Gerçeklik, Onur, Saygı, Sınır ve Özgürlük eksenlerinden birinde dahi ihlal oluştuğunda çıktıyı geçersiz sayan çarpımsal denetim modelidir. Üreten ajan kendi işini onaylayamaz; kaynaksız tahmin veya kanıtsız iddia tespit edildiğinde bağımsız kalite kontrol ve test ajanları yayını otomatik olarak durdurur.',
  },
  {
    question: '0–3 Kanıtlı Ajan Gelişim Ölçeği müşteri teslimat kalitesini nasıl etkiler?',
    answer:
      '0–3 Kanıtlı Ajan Gelişim Ölçeği, ajan yetkinliğini 0 (Yok), 1 (Metinde), 2 (Mekanikte) ve 3 (Bağımsız Kanıtlı) basamaklarıyla ölçer. Bu sayede müşteri işleri süslü unvanlara değil; otomatik doğrulama betiklerinden, gölge prova testlerinden ve bağımsız kalite kontrol onayından geçmiş ölçülebilir kanıtlara emanet edilir.',
  },
  {
    question: 'Yapay zekâ ajanları AB AI Act Madde 50 ve Türkiye mevzuatına nasıl uyum sağlar?',
    answer:
      'Gonet, AB Yapay Zekâ Yasası Madde 50 ve T.C. Ticaret Bakanlığı şeffaflık düzenlemeleri uyarınca her ajanını ilk temasta açıkça Yapay Zekâ Ajanı olarak bildirir. Hiçbir ajan sahte insan özgeçmişi veya sentetik insan fotoğrafı taşımaz; kanıtlanmamış ilk, tek veya en üstünlük iddiaları yayımlanmaz.',
  },
  {
    question: 'Müşteri verileri ve marka stratejileri genel yapay zekâ modellerini eğitmek için kullanılıyor mu?',
    answer:
      'Hayır. Müşteri verileri, kampanya bütçeleri ve strateji belgeleri genel amaçlı yapay zekâ modellerinin eğitim havuzlarına kesinlikle aktarılmaz. Her müşteri çalışması izole proje çalışma alanında tutulur; kamuya açık ekip vitrininde ve ajans dışı dokümanlarda hiçbir gizli müşteri veya proje bilgisi yer almaz.',
  },
  {
    question: 'Gonet hibrit ajans modelinde nihai onay ve hukuki sorumluluk kimde kalır?',
    answer:
      'Nihai onay ve tüm ticari ya da hukuki sorumluluk tek yetkili insan lider olan kurucu Gökhan Kazancı’da kalır. 27 uzman AI ajanı araştırma, üretim ve ön denetim aşamalarında görev sınırları içinde çalışır; kurucu imzası olmadan hiçbir strateji, bütçe kararı veya yayın müşteriye teslim edilmez.',
  },
];

export const AI_CULTURE_FAQ_EN: { question: string; answer: string }[] = [
  {
    question: 'What is Constitutional AI Agent Governance and how does it improve agency delivery?',
    answer:
      'Constitutional AI Agent Governance is an agency framework where every AI agent operates under explicit identity disclosure, written scope boundaries, objection rights, and independent oversight. Gonet applies this governance across 27 specialist agents so automated production remains auditable, predictable, and strictly accountable to human founder sign-off.',
  },
  {
    question: "How does Gonet's YBF Entity Constitution prevent AI hallucinations and brand compliance risks?",
    answer:
      'The YBF Entity Constitution enforces five multiplicative principles: Reality, Dignity, Respect, Boundary, and Freedom, where a single violation invalidates the entire output. Producing agents cannot self-approve deliverables; independent QA, test, and legal compliance gates automatically block unverified claims or unsourced statistics before client delivery.',
  },
  {
    question: 'How does the 0–3 Evidence-Based Agent Growth Scale affect client deliverable quality?',
    answer:
      'The 0–3 Evidence-Based Agent Growth Scale grades agent capabilities from Level 0 (Absent) and Level 1 (Documented) to Level 2 (Mechanically Enforced) and Level 3 (Independently Verified). Client deliverables rely on deterministic verification scripts, shadow rehearsal checks, and independent QA sign-off rather than opaque prompt tuning.',
  },
  {
    question: "How do Gonet's AI agents comply with EU AI Act Article 50 and advertising regulations?",
    answer:
      'Gonet aligns with EU AI Act Article 50 and Turkish Ministry of Trade disclosure rules by labeling every agent as an AI Agent at first contact. Agents carry zero fabricated human CVs, ages, or stock portraits, and unsubstantiated superlatives such as first or best are strictly prohibited.',
  },
  {
    question: 'Is client data used to train public or third-party AI models?',
    answer:
      "No. Client data, campaign budgets, and proprietary strategy records are never routed into public foundation model training pools. Each client engagement remains isolated inside dedicated project environments, and zero confidential client names, internal workspace identifiers, or proprietary deliverables appear on Gonet’s public team or culture pages.",
  },
  {
    question: "Who holds final approval and legal accountability in Gonet's Human × AI hybrid agency?",
    answer:
      'Final approval and full commercial and legal accountability remain exclusively with human founder Gökhan Kazancı. While 27 specialist AI agents execute research, drafting, engineering, and verification within documented boundaries, no strategy, ad spend commitment, or public deliverable ships to a client without direct founder review.',
  },
];

// AI İK ve Anayasa (/ik, /en/ai-culture) kavram sözlüğü — tekil #termset DefinedTermSet düğümü
export function aiCultureDefinedTermsSchema(lang: 'tr' | 'en' = 'tr') {
  const url = lang === 'tr' ? `${SITE_URL}/ik` : `${SITE_URL}/en/ai-culture`;
  const termSetId = `${url}#termset`;
  return {
    '@type': 'DefinedTermSet',
    '@id': termSetId,
    name: lang === 'tr' ? 'Gonet Anayasal AI Yönetişim Sözlüğü' : 'Gonet Constitutional AI Governance Glossary',
    inLanguage: lang,
    publisher: { '@id': ORG_ID },
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        '@id': `${url}#term-ybf-entity-constitution`,
        name: lang === 'tr' ? 'YBF Varlık Anayasası' : 'YBF Entity Constitution',
        description:
          lang === 'tr'
            ? 'Yalın Bilinç Felsefesi’nin Gerçeklik, Onur, Saygı, Sınır ve Özgürlük eksenlerine dayanan, tek bir eksendeki ihlalin (-1) bütün çıktıyı geçersiz saydığı çarpımsal AI ajan etik anayasası.'
            : 'A multiplicative ethical charter built on YBF’s five axes—Reality, Dignity, Respect, Boundary, and Freedom—where a violation on any single axis invalidates the output.',
        inDefinedTermSet: { '@id': termSetId },
      },
      {
        '@type': 'DefinedTerm',
        '@id': `${url}#term-constitutional-agent-governance`,
        name: lang === 'tr' ? 'Anayasal AI Ajan Yönetişimi' : 'Constitutional AI Agent Governance',
        description:
          lang === 'tr'
            ? 'Her yapay zekâ ajanının açık kimlik beyanı, yazılı görev ve yetki sınırı, itiraz hakkı ve üreten ile onaylayanı ayıran bağımsız insan/QA denetimi altında çalıştırıldığı ajans modeli.'
            : 'An agency governance model where every AI agent operates under explicit AI disclosure, written boundaries, objection rights, and strict separation between production and independent human/QA approval.',
        inDefinedTermSet: { '@id': termSetId },
      },
      {
        '@type': 'DefinedTerm',
        '@id': `${url}#term-evidence-growth-scale`,
        name: lang === 'tr' ? '0–3 Kanıtlı Ajan Gelişim Ölçeği' : '0–3 Evidence-Based Agent Growth Scale',
        description:
          lang === 'tr'
            ? 'Ajan yetkinliğini 0 (Yok), 1 (Metinde), 2 (Mekanikte) ve 3 (Bağımsız Kanıtlı) düzeyleriyle ölçen ve Aday, Yetkin, Kıdemli, Usta basamaklarını bağımsız doğrulamaya bağlayan kariyer çerçevesi.'
            : 'A capability progression scale grading AI agents across Level 0 (Absent), 1 (Documented), 2 (Mechanically Enforced), and 3 (Independently Verified) across Candidate to Master stages.',
        inDefinedTermSet: { '@id': termSetId },
      },
    ],
  };
}

export function aiCulturePageSchema(lang: 'tr' | 'en' = 'tr') {
  const url = lang === 'tr' ? `${SITE_URL}/ik` : `${SITE_URL}/en/ai-culture`;
  const homeUrl = lang === 'tr' ? `${SITE_URL}/` : `${SITE_URL}/en`;
  const termSetId = `${url}#termset`;
  const pageId = `${url}#webpage`;
  const faqItems = lang === 'tr' ? AI_CULTURE_FAQ_TR : AI_CULTURE_FAQ_EN;

  const title =
    lang === 'tr'
      ? 'AI İnsan Kaynakları, Anayasa ve Gelişim Sistemi | Gonet'
      : 'AI Governance, Constitution & Growth System | Gonet';
  const description =
    lang === 'tr'
      ? "Gonet'te yapay zekâ ajanları 15 maddelik YBF anayasası, hak ve sınır kuralları, 6 eğitim türü ve 0–3 kanıtlı kariyer ölçeğiyle yönetilir."
      : 'How Gonet governs 27 specialist AI agents under a 15-article ethical constitution, strict role boundaries, 6 learning loops, and a 0–3 evidence scale.';

  const webPageNode = {
    '@type': 'WebPage',
    '@id': pageId,
    url,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    about: { '@id': ORG_ID },
    mainEntity: { '@id': termSetId },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: lang === 'tr' ? 'Ana sayfa' : 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: lang === 'tr' ? 'İK ve AI Kültürü' : 'AI Governance & Culture', item: url },
      ],
    },
  };

  const definedTermSetNode = aiCultureDefinedTermsSchema(lang);

  const faqNode = {
    ...faqSchema(faqItems),
    '@id': `${url}#faq`,
    inLanguage: lang,
    isPartOf: { '@id': pageId },
  };

  return { webPageNode, definedTermSetNode, faqNode, graph: [webPageNode, definedTermSetNode, faqNode] };
}
