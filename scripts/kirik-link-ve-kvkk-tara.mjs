#!/usr/bin/env node
// GW-Q10: dist/ içinde kırık iç link ve KVKK yer tutucu taraması (sıfır bağımlılık)

import fs from "node:fs";
import path from "node:path";

const DIST_DIZIN = path.resolve(process.cwd(), "dist");

function htmlDosyalariTopla(dizin) {
  const sonuc = [];
  for (const girdi of fs.readdirSync(dizin, { withFileTypes: true })) {
    const tamYol = path.join(dizin, girdi.name);
    if (girdi.isDirectory()) {
      sonuc.push(...htmlDosyalariTopla(tamYol));
    } else if (girdi.isFile() && girdi.name.endsWith(".html")) {
      sonuc.push(tamYol);
    }
  }
  return sonuc;
}

function icHedefVarMi(yolMetni) {
  const temiz = yolMetni.replace(/^\/+/, "");
  if (!temiz) {
    return fs.existsSync(path.join(DIST_DIZIN, "index.html"));
  }
  const adaylar = [
    path.join(DIST_DIZIN, temiz),
    path.join(DIST_DIZIN, temiz, "index.html"),
    path.join(DIST_DIZIN, `${temiz}.html`),
  ];
  return adaylar.some((aday) => fs.existsSync(aday));
}

if (!fs.existsSync(DIST_DIZIN)) {
  console.error(`[HATA] dist/ dizini bulunamadı: ${DIST_DIZIN}`);
  process.exit(1);
}

const htmlDosyalari = htmlDosyalariTopla(DIST_DIZIN);
const kirikLinkler = [];
const kvkkBulgulari = [];

const LINK_DESENI = /\bhref=["'](\/[^"'#?]*)(?:[?#][^"']*)?["']/gi;
const KVKK_DESENLERI = [
  /\[MERSİS[^\]]*\]/gi,
  /\[KEP[^\]]*\]/gi,
  /\[SUNUCU[^\]]*\]/gi,
  /\[SAKLAMA[^\]]*\]/gi,
  /\bTODO_KVKK\b/g,
  /\bYER_TUTUCU\b/g,
  /\[\[[^\]]+\]\]/g,
  /\bkendiniz\s+(?:de\s+)?silebilirsiniz\b/gi,
  /\bistediğiniz\s+zaman\s+silebilirsiniz\b/gi,
  /\b30\s+gün\s+içinde\s+silinir\b/gi,
];

for (const dosya of htmlDosyalari) {
  const goreli = path.relative(DIST_DIZIN, dosya);
  const icerik = fs.readFileSync(dosya, "utf8");

  for (const eslesme of icerik.matchAll(LINK_DESENI)) {
    const hedef = eslesme[1];
    if (
      hedef.startsWith("//") ||
      hedef.startsWith("/api/") ||
      hedef.startsWith("/cdn-cgi/")
    ) {
      continue;
    }
    if (!icHedefVarMi(hedef)) {
      kirikLinkler.push(`${goreli} -> ${hedef}`);
    }
  }

  for (const desen of KVKK_DESENLERI) {
    for (const eslesme of icerik.matchAll(desen)) {
      kvkkBulgulari.push(`${goreli} -> ${eslesme[0]}`);
    }
  }
}

if (kirikLinkler.length > 0) {
  console.error(`[HATA] ${kirikLinkler.length} kırık iç link bulundu:`);
  for (const kayit of kirikLinkler.slice(0, 30)) {
    console.error(`  - ${kayit}`);
  }
}

if (kvkkBulgulari.length > 0) {
  console.error(`[HATA] ${kvkkBulgulari.length} KVKK yer tutucusu bulundu:`);
  for (const kayit of kvkkBulgulari.slice(0, 30)) {
    console.error(`  - ${kayit}`);
  }
}

if (kirikLinkler.length > 0 || kvkkBulgulari.length > 0) {
  process.exit(1);
}

console.log(
  `[OK] Kırık iç link: 0, KVKK yer tutucu: 0 (${htmlDosyalari.length} HTML tarandı).`,
);
