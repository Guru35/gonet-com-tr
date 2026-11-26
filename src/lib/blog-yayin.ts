/**
 * Blog yazısı yayın görünürlük kilidi (GW-D01).
 *
 * Amaç: Taslak (`draft: true`), henüz yayınlanmamış durum (`yayinDurumu !== 'yayinda'`)
 * veya yayın tarihi gelecekte olan (`published > simdi`) blog yazılarının
 * statik HTML, /blog, /haberler, /rss.xml, /llms-blog.txt ve sitemap çıktılarında
 * erken sızmasını %100 engellemek.
 */

export interface BlogYayinAdayi {
  data: {
    draft?: boolean;
    yayinDurumu?: 'taslak' | 'zamanlanmis' | 'yayinda';
    published: Date;
  };
}

/**
 * Derleme anı referans zamanını döndürür.
 * Testlerde `GONET_BUILD_NOW` ortam değişkeni (ISO tarih) ile deterministik zaman verilebilir.
 */
export function buildZamani(): Date {
  const ozel = process.env.GONET_BUILD_NOW?.trim();
  if (ozel) {
    const parsed = new Date(ozel);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date();
}

/**
 * Bir blog yazısının canlıya çıkıp çıkmadığını doğrular.
 */
export function blogYayindaMi(post: BlogYayinAdayi, simdi: Date = buildZamani()): boolean {
  if (post.data.draft) return false;
  if (post.data.yayinDurumu && post.data.yayinDurumu !== 'yayinda') return false;
  return post.data.published.getTime() <= simdi.getTime();
}
