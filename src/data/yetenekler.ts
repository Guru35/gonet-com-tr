// Yetkinlik kategorileri — /yetenekler + /yetenekler/[slug] sayfaları için ortak veri kaynağı

export type Skill = {
  name: string;
  level: 'Uzman' | 'İleri' | 'Orta';
  detail: string;
  slug?: string;  // İlişkili mikrosite alt-sayfası slug (src/content/yetkinlikler/<categorySlug>/<slug>.md)
  image?: string; // Kart görünümünde gösterilecek görsel (public/yetenekler-images/...)
  teaser?: string; // Hover ile beliren kısa içerik özeti (1-2 cümle, ~30-50 kelime)
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
  intro: string;
  skills: Skill[];
  heroImage?: string;  // Kategori sayfası header'ı için background görsel (siyah-beyaz, açık renkli)
};

export const categories: Category[] = [
  {
    slug: 'aeo-geo-yeni-nesil-arama',
    name: 'AEO / GEO — Yeni Nesil Arama',
    emoji: '★',
    intro:
      'ChatGPT, Claude, Perplexity, Gemini ve Google AI Overviews için içerik ve entity optimizasyonu. ' +
      'Klasik SEO\'nun yerini alan değil, üstüne katlanan disiplin.',
    heroImage: '/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-hero.jpg',
    skills: [
      {
        name: 'Schema.org JSON-LD entity authority',
        level: 'Uzman',
        detail: 'Organization, Person, Service, FAQPage, ItemList, Article, BreadcrumbList ve 18+ @type kombinasyonu',
        image: '/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-schema-org.jpg',
        teaser: 'LLM motorları markanızı tek bir varlık olarak tanır ya da hiç tanımaz. @graph mimarisiyle Organization + Person + Service + FAQPage entity\'leri tek bir knowledge graph\'ta bağlanır; AI cevaplarındaki citation pozisyonu doğrudan yükselir.',
      },
      {
        name: 'llms.txt protokolü',
        level: 'Uzman',
        detail: 'Site genelinde LLM-okunabilir yapı tanımı — Anthropic ve OpenAI öneri formatına uygun',
        image: '/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-llms-txt.jpg',
        teaser: 'LLM\'ler için site rehberi: tek bir markdown dosyasıyla en önemli sayfalarınızı, navigasyon yapınızı ve içerik hiyerarşinizi açıkça bildirir. ChatGPT, Claude ve Perplexity için ekstra fetch bütçesi kazandırır.',
      },
      {
        name: 'Semantic chunking',
        level: 'Uzman',
        detail: 'Embedding-friendly içerik bölümleme; RAG sistemlerinde citation kazanma odaklı',
        image: '/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-semantic-chunking.jpg',
        teaser: 'RAG sistemleri sayfayı 500-1000 karakterlik parçalara bölerek embedding alır. Doğru chunk sınırları + her parçanın bağımsız anlamlı olması, citation kazanma olasılığını 2-3 kat artırır.',
      },
      {
        name: 'Citation surface engineering',
        level: 'Uzman',
        detail: 'GEO 2024 (Aggarwal et al. KDD) yöntemleri: Statistics +30%, Quotation +41%, Cite Sources +27% etki artışı',
        image: '/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-citation-surface.jpg',
        teaser: 'AI cevaplarda alıntılanabilir yüzey alanı mühendisliği. Akademik kaynak referansı + somut istatistik + tırnaklı uzman görüşü kombinasyonu, Aggarwal et al. (KDD 2024) ölçümünde %27-41 görünürlük artışı sağladı.',
      },
      {
        name: 'Common Crawl optimizasyonu',
        level: 'İleri',
        detail: 'AI eğitim veri setlerinde temsil — robots.txt, CCBot, GPTBot, ClaudeBot policy yönetimi',
        image: '/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-common-crawl.jpg',
        teaser: 'Common Crawl, LLM\'lerin eğitim setinin %70+\'ını besler. Marka temsiliyetinizin bu arşivde olması, gelecek modellerin sizi parametrik bellekte taşıması demek. CCBot izni + Harmonic Centrality optimizasyonu kritik.',
      },
      {
        name: 'Extraction-readiness',
        level: 'Uzman',
        detail: 'LLM\'in tek paragraftan tam yanıt çıkarabilmesi için içerik mühendisliği',
        image: '/yetenekler-images/aeo-geo-yeni-nesil-arama/aeo-geo-extraction-readiness.jpg',
        teaser: 'LLM\'ler 50-100 kelimelik parçalardan tam yanıt çıkarmaya çalışır. Cümle başında konu sahibi, açık tanım, ölçülebilir veri ve self-contained yapı — bu dörtlü extraction-readiness puanını maksimuma taşır.',
      },
    ],
  },
  {
    slug: 'seo-klasik-arama',
    name: 'SEO — Klasik Arama Motoru Optimizasyonu',
    emoji: '◆',
    intro:
      'Google\'ın 2003\'ten bu yana her algoritma güncellemesi içinden geçtik. Panda, Penguin, ' +
      'Hummingbird, BERT, MUM, Helpful Content Update, Spam Update — hepsinin pratik etkisini yaşadık.',
    heroImage: '/yetenekler-images/seo-klasik-arama/seo-klasik-hero.jpg',
    skills: [
      { name: 'Teknik SEO — Core Web Vitals, INP, CLS', level: 'Uzman', detail: 'LCP <1s, INP <200ms, CLS <0.1 hedeflerine kadar ileri optimizasyon' },
      { name: 'On-page SEO + içerik mimarisi', level: 'Uzman', detail: 'Pillar-cluster topology, internal link velocity, topical authority' },
      { name: 'E-E-A-T sinyali inşası', level: 'Uzman', detail: 'Experience, Expertise, Authoritativeness, Trust — 4 sinyalin entity grafiğinde modellenmesi' },
      { name: 'International SEO — hreflang, geo-targeting', level: 'İleri', detail: 'Almanya-Hollanda diaspora SEO\'su gibi niş bölgesel hedefleme' },
      { name: 'Crawl budget + log analizi', level: 'İleri', detail: 'Server log\'larından Googlebot davranış analizi' },
      { name: 'Schema.org ileri implementasyon', level: 'Uzman', detail: 'Rich results, How-To, FAQ, Event, Product, LocalBusiness — Google Search Central uyumu' },
    ],
  },
  {
    slug: 'google-ads-sem',
    name: 'Google Ads & SEM',
    emoji: '◉',
    intro:
      'Türkiye\'nin ilk 3 Google Partner ajansından biri. 2003\'ten bu yana AdWords/Google Ads ' +
      'operasyonu — sağlık, inşaat, e-ticaret, siyaset, otomotiv, turizm, eğitim sektörlerinde.',
    heroImage: '/yetenekler-images/google-ads-sem/google-ads-hero.jpg',
    skills: [
      { name: 'Performance Max kampanyaları', level: 'Uzman', detail: 'PMax + asset group mimarisi + audience signal stratejisi' },
      { name: 'Smart Bidding + offline conversion import', level: 'Uzman', detail: 'tCPA, tROAS, Max Conversions optimizasyonu' },
      { name: 'Google Shopping + Merchant Center', level: 'İleri', detail: 'Feed optimization, GTIN, custom labels' },
      { name: 'YouTube reklamcılığı', level: 'İleri', detail: 'In-stream, Discovery, Shorts, Performance Max for video' },
      { name: 'B2B Account-Based Marketing', level: 'İleri', detail: 'LinkedIn + Google Ads + e-mail entegre kampanyalar' },
      { name: 'Hesap denetimi & restorasyonu', level: 'Uzman', detail: 'Bozuk hesap yapısının audit + yeniden inşası' },
    ],
  },
  {
    slug: 'analitik-veri',
    name: 'Analitik & Veri',
    emoji: '▣',
    intro:
      'Türkiye\'nin 2 numaralı Google Analytics partneri. Veri olmadan optimize edilmez — biz veri ' +
      'altyapısını kurar, anlamlandırır ve aksiyona çeviririz.',
    heroImage: '/yetenekler-images/analitik-veri/analitik-veri-hero.jpg',
    skills: [
      { name: 'Google Analytics 4 (GA4)', level: 'Uzman', detail: 'Event-based model, custom dimensions, audience builder, attribution' },
      { name: 'Google Tag Manager (GTM)', level: 'Uzman', detail: 'Server-side tagging, data layer mimarisi, consent mode v2' },
      { name: 'BigQuery + SQL', level: 'İleri', detail: 'GA4 raw export analizi, custom funnel, churn modelleme' },
      { name: 'Looker Studio', level: 'Uzman', detail: 'Stakeholder dashboard, blended data, calculated fields' },
      { name: 'A/B test & deney tasarımı', level: 'İleri', detail: 'Statistical significance, sample size, MDE planning' },
      { name: 'Server log analizi', level: 'İleri', detail: 'Bot davranış analizi, AI crawler tespiti' },
    ],
  },
  {
    slug: 'web-gelistirme-altyapi',
    name: 'Web Geliştirme & Altyapı',
    emoji: '◇',
    intro:
      'WordPress\'ten Astro\'ya, monolitten edge-rendering\'a, klasik PHP\'den serverless\'a — ' +
      'her ölçek ve her bütçe için altyapı kurabiliriz. Avrupa\'nın en büyüğü olan DEÜ Uzaktan ' +
      'Eğitim Sistemi (anlık 25K kullanıcı) bizim altyapımız.',
    heroImage: '/yetenekler-images/web-gelistirme-altyapi/web-gelistirme-hero.jpg',
    skills: [
      { name: 'Astro 5 + Content Collections', level: 'Uzman', detail: 'Server Islands, View Transitions, content layer, edge runtime' },
      { name: 'Next.js 15 + React 19', level: 'İleri', detail: 'App Router, RSC, server actions, partial prerendering' },
      { name: 'Laravel + PHP', level: 'Uzman', detail: '15+ yıl Laravel production deneyimi — Octane, Horizon, Sanctum' },
      { name: 'WordPress (legacy + headless)', level: 'Uzman', detail: 'Custom theme, ACF, WP REST API, headless decoupling' },
      { name: 'Mobile API geliştirme (REST + GraphQL)', level: 'Uzman', detail: 'Habertürk, Unilever, Fenerbahçe ölçeğinde production API' },
      { name: 'Tailwind CSS v4', level: 'Uzman', detail: 'Modern utility-first, design tokens, responsive system' },
      { name: 'TypeScript (strict mode)', level: 'İleri', detail: 'Type-safe stack, Zod runtime validation' },
      { name: 'Self-hosted PaaS — Coolify + Docker', level: 'İleri', detail: 'Hetzner + Coolify + Cloudflare ile vendor-independent deploy' },
    ],
  },
  {
    slug: 'icerik-yaratici',
    name: 'İçerik & Yaratıcı',
    emoji: '✎',
    intro:
      'Veri ne kadar güçlü olursa olsun, içerik hâlâ ölçüldüğü insanla kurulan ilk temas. ' +
      'AEO çağında "iyi içerik" tanımı değişti — LLM\'in alıntılayabileceği, kaynağa atfedebileceği, ' +
      'rakamla destekli, yapısal içerik.',
    heroImage: '/yetenekler-images/icerik-yaratici/icerik-yaratici-hero.jpg',
    skills: [
      { name: 'Long-form SEO içerik üretimi', level: 'Uzman', detail: '2000+ kelime pillar içerik, semantic clustering' },
      { name: 'AEO odaklı içerik — citation-worthy', level: 'Uzman', detail: 'Statistics, quotations, fluent transitions — GEO 2024 yöntemleri' },
      { name: 'Marka hikayeleştirme', level: 'İleri', detail: 'Founder story, brand archetype, narrative arc' },
      { name: 'Video script + kısa form sosyal', level: 'İleri', detail: 'Reels, TikTok, YouTube Shorts — algoritma uyumlu' },
      { name: 'E-mail marketing — sequence tasarımı', level: 'İleri', detail: 'Behavioral trigger, segmentation, deliverability' },
    ],
  },
  {
    slug: 'sosyal-medya-topluluk',
    name: 'Sosyal Medya & Topluluk',
    emoji: '◐',
    intro:
      'Instagram, LinkedIn, X, TikTok, Facebook, YouTube — her platformun kendi algoritması, ' +
      'kendi içerik dili. Sağlık, siyaset, FMCG, eğitim sektörlerinde regülasyona uygun sosyal medya yönetimi.',
    heroImage: '/yetenekler-images/sosyal-medya-topluluk/sosyal-medya-hero.jpg',
    skills: [
      { name: 'Meta Ads — Facebook & Instagram', level: 'Uzman', detail: 'Advantage+, Catalog Ads, CAPI server-side conversions' },
      { name: 'LinkedIn Ads + Sales Navigator', level: 'İleri', detail: 'B2B targeting, Matched Audiences, account-based marketing' },
      { name: 'TikTok Ads + Spark Ads', level: 'İleri', detail: 'Genç demografi B2C kampanyaları' },
      { name: 'Influencer marketing', level: 'İleri', detail: 'Micro/macro influencer, performance-based pricing' },
      { name: 'Topluluk yönetimi + CRM entegrasyonu', level: 'Uzman', detail: 'HubSpot, Pipedrive, Zoho ile sosyal CRM' },
    ],
  },
  {
    slug: 'tasarim-ux',
    name: 'Tasarım & UX',
    emoji: '◧',
    intro:
      'Kullanıcı deneyimi, dijital pazarlamanın görünmez %50\'si. Erişilebilirlik (WCAG 2.2), ' +
      'mobil-öncelikli tasarım ve dönüşüm odaklı UI ekibimizin DNA\'sında.',
    heroImage: '/yetenekler-images/tasarim-ux/tasarim-ux-hero.jpg',
    skills: [
      { name: 'Figma + design system', level: 'Uzman', detail: 'Token-based design, component library, auto layout' },
      { name: 'Mobil-öncelikli responsive tasarım', level: 'Uzman', detail: 'Container queries, fluid typography, intrinsic sizing' },
      { name: 'WCAG 2.2 erişilebilirlik', level: 'İleri', detail: 'AA+ compliance, keyboard nav, screen reader, contrast' },
      { name: 'Conversion Rate Optimization (CRO)', level: 'Uzman', detail: 'Heatmap, session recording, funnel analysis, A/B test' },
      { name: 'Brand identity + logo', level: 'İleri', detail: 'Logo, color, typography, brand guideline' },
    ],
  },
  {
    slug: 'strateji-danismanlik',
    name: 'Strateji & Danışmanlık',
    emoji: '◈',
    intro:
      'En değerli yetkinliğimiz: 26 yılda 100+ markada görülmüş örüntüleri okumak. Yeni kuruluyorsanız ' +
      'da, dijitalde tıkanmış büyük markayı da yeniden hizalayabiliriz.',
    heroImage: '/yetenekler-images/strateji-danismanlik/strateji-hero.jpg',
    skills: [
      { name: 'Dijital pazarlama strateji geliştirme', level: 'Uzman', detail: 'STP, customer journey, attribution model' },
      { name: 'Startup büyüme danışmanlığı', level: 'İleri', detail: 'DEPARK, Dojonote, Bambu projeleri — go-to-market, growth loops' },
      { name: 'Sektör girişi & competitive positioning', level: 'Uzman', detail: '15+ sektörde "ilk" olma deneyimi' },
      { name: 'Marka iletişimi krizi yönetimi', level: 'Uzman', detail: 'Siyasi, sağlık ve enterprise kriz yönetimi' },
      { name: 'M&A — dijital due diligence', level: 'Orta', detail: 'Hedef markanın dijital varlık değerlemesi' },
    ],
  },
];
