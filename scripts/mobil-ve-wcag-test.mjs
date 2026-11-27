#!/usr/bin/env node
// GW-Q11: Playwright ile 320px/375px/1440px yatay taşma, WCAG 2.2 AA kontrast ve dokunma hedefi testi

import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const DIST_DIZIN = path.resolve(process.cwd(), "dist");
const EKRAN_GORUNTU_DIZIN = path.resolve(process.cwd(), "test-results", "ekran-goruntuleri");
const SAYFALAR = ["/", "/hakkimizda", "/kurumsal-kimlik", "/teklif-al", "/blog"];
const GENISLIKLER = [320, 375, 1440];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function dosyaCoz(urlYolu) {
  const temiz = decodeURIComponent(urlYolu.split("?")[0]).replace(/^\/+/, "");
  const adaylar = temiz
    ? [
        path.join(DIST_DIZIN, temiz),
        path.join(DIST_DIZIN, temiz, "index.html"),
        path.join(DIST_DIZIN, `${temiz}.html`),
      ]
    : [path.join(DIST_DIZIN, "index.html")];

  for (const aday of adaylar) {
    if (fs.existsSync(aday) && fs.statSync(aday).isFile()) {
      return aday;
    }
  }
  return null;
}

function statikSunucuBaslat() {
  return new Promise((resolve) => {
    const sunucu = http.createServer((req, res) => {
      const dosya = dosyaCoz(req.url || "/");
      if (!dosya) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const uzanti = path.extname(dosya).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[uzanti] || "application/octet-stream" });
      fs.createReadStream(dosya).pipe(res);
    });
    sunucu.listen(0, "127.0.0.1", () => {
      const adres = sunucu.address();
      resolve({ sunucu, tabanUrl: `http://127.0.0.1:${adres.port}` });
    });
  });
}

if (!fs.existsSync(DIST_DIZIN)) {
  console.error(`[HATA] dist/ dizini bulunamadı: ${DIST_DIZIN}`);
  process.exit(1);
}

let playwright;
try {
  playwright = await import("playwright");
} catch {
  console.error("[HATA] 'playwright' paketi kurulu değil. CI veya yerelde 'npm i -D playwright' gerekir.");
  process.exit(1);
}

const { sunucu, tabanUrl } = await statikSunucuBaslat();
const tarayici = await playwright.chromium.launch();
const ihlaller = [];

try {
  for (const genislik of GENISLIKLER) {
    const baglam = await tarayici.newContext({ viewport: { width: genislik, height: 900 } });
    const sayfa = await baglam.newPage();

    for (const yol of SAYFALAR) {
      await sayfa.goto(`${tabanUrl}${yol}`, { waitUntil: "networkidle" });
      const sonuc = await sayfa.evaluate((vw) => {
        const sorunlar = [];
        if (document.documentElement.scrollWidth > window.innerWidth + 2) {
          sorunlar.push(`Yatay taşma: scrollWidth=${document.documentElement.scrollWidth} > innerWidth=${window.innerWidth}`);
        }

        function rgbCoz(str) {
          const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (!m) return null;
          return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
        }
        function parlaklik({ r, g, b }) {
          const [rs, gs, bs] = [r, g, b].map((v) => {
            const c = v / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        }
        function arkaPlanBul(el) {
          let cur = el;
          while (cur) {
            const c = rgbCoz(getComputedStyle(cur).backgroundColor);
            if (c && c.a > 0.1) return c;
            cur = cur.parentElement;
          }
          return { r: 255, g: 255, b: 255, a: 1 };
        }

        for (const el of document.querySelectorAll("h1, h2, p, a, button")) {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;
          const stil = getComputedStyle(el);
          if (stil.visibility === "hidden" || stil.display === "none") continue;

          const fg = rgbCoz(stil.color);
          const bg = arkaPlanBul(el);
          if (fg && bg) {
            const l1 = parlaklik(fg);
            const l2 = parlaklik(bg);
            const oran = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            const punto = parseFloat(stil.fontSize);
            const kalin = parseInt(stil.fontWeight, 10) >= 700;
            const buyuk = punto >= 24 || (punto >= 18.66 && kalin);
            const esik = buyuk ? 3.0 : 4.5;
            if (oran < esik) {
              sorunlar.push(`Düşük kontrast (${oran.toFixed(2)} < ${esik}): ${el.tagName} "${(el.textContent || "").trim().slice(0, 30)}"`);
              if (sorunlar.length >= 10) break;
            }
          }
        }

        if (vw <= 375) {
          for (const el of document.querySelectorAll('button, a.btn, [role="button"]')) {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            if (rect.height < 24 || rect.width < 24) {
              sorunlar.push(`Küçük dokunma hedefi (${Math.round(rect.width)}x${Math.round(rect.height)}): "${(el.textContent || "").trim().slice(0, 25)}"`);
            }
          }
        }
        return sorunlar;
      }, genislik);

      if (sonuc.length > 0) {
        fs.mkdirSync(EKRAN_GORUNTU_DIZIN, { recursive: true });
        const dosyaAdi = `${yol === "/" ? "anasayfa" : yol.replace(/^\/+/, "").replace(/\//g, "_")}-${genislik}px.png`;
        await sayfa.screenshot({ path: path.join(EKRAN_GORUNTU_DIZIN, dosyaAdi), fullPage: true });
        for (const s of sonuc) {
          ihlaller.push(`${yol} @ ${genislik}px -> ${s}`);
        }
      }
    }
    await baglam.close();
  }
} finally {
  await tarayici.close();
  sunucu.close();
}

if (ihlaller.length > 0) {
  console.error(`[HATA] ${ihlaller.length} mobil/WCAG ihlali bulundu:`);
  for (const i of ihlaller.slice(0, 30)) {
    console.error(`  - ${i}`);
  }
  process.exit(1);
}

console.log("[OK] 3 çözünürlükte yatay taşma=0, ciddi erişilebilirlik ihlali=0.");
