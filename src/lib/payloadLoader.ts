import type { Loader, LoaderContext } from 'astro/loaders';

export interface PayloadSssKaydi {
  soru?: string;
  cevap?: string;
  question?: string;
  answer?: string;
}

export interface PayloadKarsilastirmaTablosu {
  baslik?: string;
  sutunlar?: string[];
  satirlar?: Array<string[] | { hucreler?: string[]; cells?: string[] }>;
}

export interface PayloadPostRecord {
  id?: string | number;
  slug?: string;
  title?: string;
  description?: string;
  h1?: string;
  keywords?: string[];
  author?: {
    name?: string;
    role?: string;
    url?: string;
  } | string;
  status?: 'draft' | 'published' | string;
  yayinDurumu?: 'taslak' | 'zamanlanmis' | 'yayinda';
  draft?: boolean;
  publishedAt?: string | Date;
  published?: string | Date;
  updatedAt?: string | Date;
  ogImage?: string | { url?: string };
  ogImageLight?: string | { url?: string };
  category?: string | { name?: string; title?: string };
  tags?: Array<string | { tag?: string; name?: string }>;
  readingMinutes?: number;
  lang?: 'tr' | 'en';
  interactive?: 'model-kilavuzu';
  sliderLines?: string[];
  sliderEtiket?: string;
  ozetMaddeleri?: Array<string | { madde?: string; text?: string }>;
  karsilastirmaTablosu?: PayloadKarsilastirmaTablosu;
  sss?: PayloadSssKaydi[];
  markdown?: string;
  contentMarkdown?: string;
  body?: string;
}

export interface PayloadPostsResponse {
  docs?: PayloadPostRecord[];
  hasNextPage?: boolean;
  nextPage?: number | null;
  page?: number;
  totalPages?: number;
}

export interface PayloadBlogLoaderOptions {
  apiUrl?: string;
  apiKey?: string;
  fetchFn?: typeof fetch;
  nowFn?: () => Date;
  limit?: number;
}

/**
 * Payload REST API `/api/posts` sorgu adresini yalnız yayındaki ve zamanı gelmiş
 * kayıtları isteyecek biçimde oluşturur.
 */
export function buildPayloadPostsUrl(
  apiUrl: string,
  simdi: Date = new Date(),
  limit = 100,
  page = 1,
): string {
  const temel = apiUrl.replace(/\/+$/, '');
  const url = new URL(`${temel}/api/posts`);
  url.searchParams.set('where[status][equals]', 'published');
  url.searchParams.set('where[publishedAt][less_than_equal]', simdi.toISOString());
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('page', String(page));
  url.searchParams.set('depth', '1');
  return url.toString();
}

function tarihCoz(deger: string | Date | undefined): Date | null {
  if (!deger) return null;
  const d = deger instanceof Date ? deger : new Date(deger);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * İkinci güvenlik filtresi: Payload API'den dönen her kaydın gerçekten
 * `published` durumunda olduğunu ve yayın tarihinin gelecekte olmadığını doğrular.
 */
export function payloadKaydiYayindaMi(
  kayit: PayloadPostRecord,
  simdi: Date = new Date(),
): boolean {
  if (!kayit || typeof kayit !== 'object') return false;
  if (kayit.status !== 'published') return false;
  if (kayit.draft === true) return false;
  if (kayit.yayinDurumu && kayit.yayinDurumu !== 'yayinda') return false;

  const yayinTarihi = tarihCoz(kayit.publishedAt ?? kayit.published);
  if (!yayinTarihi) return false;
  return yayinTarihi.getTime() <= simdi.getTime();
}

function gorselUrlCoz(deger: string | { url?: string } | undefined): string | undefined {
  if (!deger) return undefined;
  if (typeof deger === 'string') return deger.trim() || undefined;
  if (typeof deger === 'object' && typeof deger.url === 'string') {
    return deger.url.trim() || undefined;
  }
  return undefined;
}

function ozetMaddeleriniEsle(
  maddeler: PayloadPostRecord['ozetMaddeleri'],
): string[] | undefined {
  if (!Array.isArray(maddeler)) return undefined;
  const temiz = maddeler
    .map((m) => {
      if (typeof m === 'string') return m.trim();
      if (m && typeof m === 'object') return (m.madde ?? m.text ?? '').trim();
      return '';
    })
    .filter(Boolean);
  return temiz.length === 3 ? temiz : undefined;
}

function karsilastirmaTablosunuEsle(
  tablo: PayloadPostRecord['karsilastirmaTablosu'],
): { baslik?: string; sutunlar: string[]; satirlar: string[][] } | undefined {
  if (!tablo || typeof tablo !== 'object') return undefined;
  const sutunlar = Array.isArray(tablo.sutunlar)
    ? tablo.sutunlar.map((s) => String(s).trim()).filter(Boolean)
    : [];
  const satirlar = Array.isArray(tablo.satirlar)
    ? tablo.satirlar
        .map((satir) => {
          if (Array.isArray(satir)) return satir.map((h) => String(h));
          if (satir && typeof satir === 'object') {
            const hucreler = satir.hucreler ?? satir.cells;
            return Array.isArray(hucreler) ? hucreler.map((h) => String(h)) : [];
          }
          return [];
        })
        .filter((satir) => satir.length > 0)
    : [];

  if (sutunlar.length < 2 || satirlar.length === 0) return undefined;
  const baslik = typeof tablo.baslik === 'string' && tablo.baslik.trim()
    ? tablo.baslik.trim()
    : undefined;
  return { baslik, sutunlar, satirlar };
}

function sssEsle(
  sss: PayloadPostRecord['sss'],
): Array<{ soru: string; cevap: string }> | undefined {
  if (!Array.isArray(sss) || sss.length === 0) return undefined;
  const temiz = sss
    .map((item) => ({
      soru: (item?.soru ?? item?.question ?? '').trim(),
      cevap: (item?.cevap ?? item?.answer ?? '').trim(),
    }))
    .filter((item) => item.soru.length > 0 && item.cevap.length > 0);
  return temiz.length > 0 ? temiz : undefined;
}

/**
 * Payload post kaydını Astro `blog` koleksiyonu ve 1–31 Aralık şablon
 * alanlarıyla (`ozetMaddeleri`, `karsilastirmaTablosu`, `sss`) birebir eşler.
 */
export function mapPayloadPostToBlogData(kayit: PayloadPostRecord) {
  const published = tarihCoz(kayit.publishedAt ?? kayit.published) ?? new Date();
  const updated = tarihCoz(kayit.updatedAt) ?? undefined;

  const author =
    typeof kayit.author === 'string'
      ? { name: kayit.author.trim() || 'Gonet' }
      : {
          name: kayit.author?.name?.trim() || 'Gonet',
          ...(kayit.author?.role ? { role: kayit.author.role } : {}),
          ...(kayit.author?.url ? { url: kayit.author.url } : {}),
        };

  const category =
    typeof kayit.category === 'string'
      ? kayit.category
      : kayit.category?.name ?? kayit.category?.title;

  const tags = Array.isArray(kayit.tags)
    ? kayit.tags
        .map((t) => (typeof t === 'string' ? t : t?.tag ?? t?.name ?? '').trim())
        .filter(Boolean)
    : [];

  const ozetMaddeleri = ozetMaddeleriniEsle(kayit.ozetMaddeleri);
  const karsilastirmaTablosu = karsilastirmaTablosunuEsle(kayit.karsilastirmaTablosu);
  const sss = sssEsle(kayit.sss);

  return {
    title: kayit.title?.trim() || 'Başlıksız Yazı',
    description: kayit.description?.trim() || '',
    ...(kayit.h1 ? { h1: kayit.h1 } : {}),
    ...(Array.isArray(kayit.keywords) ? { keywords: kayit.keywords } : {}),
    author,
    published,
    ...(updated ? { updated } : {}),
    ...(gorselUrlCoz(kayit.ogImage) ? { ogImage: gorselUrlCoz(kayit.ogImage) } : {}),
    ...(gorselUrlCoz(kayit.ogImageLight) ? { ogImageLight: gorselUrlCoz(kayit.ogImageLight) } : {}),
    ...(category ? { category } : {}),
    tags,
    ...(typeof kayit.readingMinutes === 'number' ? { readingMinutes: kayit.readingMinutes } : {}),
    lang: kayit.lang === 'en' ? ('en' as const) : ('tr' as const),
    draft: false,
    yayinDurumu: 'yayinda' as const,
    ...(kayit.interactive ? { interactive: kayit.interactive } : {}),
    ...(Array.isArray(kayit.sliderLines) ? { sliderLines: kayit.sliderLines } : {}),
    ...(kayit.sliderEtiket ? { sliderEtiket: kayit.sliderEtiket } : {}),
    ...(ozetMaddeleri ? { ozetMaddeleri } : {}),
    ...(karsilastirmaTablosu ? { karsilastirmaTablosu } : {}),
    ...(sss ? { sss } : {}),
  };
}

/**
 * Astro 6 Content Layer için özel Payload CMS blog yükleyicisi.
 */
export function createPayloadBlogLoader(options: PayloadBlogLoaderOptions = {}): Loader {
  const apiUrl = (options.apiUrl ?? process.env.PAYLOAD_API_URL ?? '').trim();
  const apiKey = (options.apiKey ?? process.env.PAYLOAD_API_KEY ?? '').trim();
  const fetchFn = options.fetchFn ?? globalThis.fetch;
  const nowFn = options.nowFn ?? (() => new Date());
  const limit = options.limit ?? 100;

  return {
    name: 'payload-blog-loader',
    load: async (context: LoaderContext) => {
      if (!apiUrl) {
        throw new Error('PAYLOAD_API_URL tanımlı değil; payload-blog-loader çalıştırılamadı.');
      }

      const simdi = nowFn();
      const headers: Record<string, string> = {
        Accept: 'application/json',
      };
      if (apiKey) {
        headers.Authorization = `users API-Key ${apiKey}`;
      }

      context.store.clear();

      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const endpoint = buildPayloadPostsUrl(apiUrl, simdi, limit, page);
        const res = await fetchFn(endpoint, { headers });
        if (!res.ok) {
          throw new Error(`Payload API yanıtı başarısız (${res.status} ${res.statusText})`);
        }

        const payload = (await res.json()) as PayloadPostsResponse;
        const docs = Array.isArray(payload.docs) ? payload.docs : [];

        for (const doc of docs) {
          if (!payloadKaydiYayindaMi(doc, simdi)) {
            continue;
          }

          const id = (doc.slug ?? String(doc.id ?? '')).trim();
          if (!id) continue;

          const rawData = mapPayloadPostToBlogData(doc);
          const data = await context.parseData({ id, data: rawData });
          const body = doc.markdown ?? doc.contentMarkdown ?? doc.body ?? '';
          const rendered = body && context.renderMarkdown ? await context.renderMarkdown(body) : undefined;
          const digest = context.generateDigest(data);

          context.store.set({
            id,
            data,
            body,
            rendered,
            digest,
          });
        }

        hasNextPage = Boolean(payload.hasNextPage && payload.nextPage);
        page = payload.nextPage ?? page + 1;
      }

      context.logger.info('Payload CMS blog yazıları güvenle yüklendi.');
    },
  };
}
