# Coolify Deploy — gonet.com.tr Hetzner taşıma

## Coolify panel adımları (sırayla)

### 1. Yeni Resource → Application
- **Type:** Public Repository (veya Private — GitHub token gerekirse Coolify ayarlarından)
- **Repository:** `https://github.com/Guru35/gonet-com-tr`
- **Branch:** `main`
- **Build Pack:** `Static` (Astro `dist/` klasörünü serve eder)

### 2. Build & deploy settings
```
Install command:  npm ci
Build command:    npm run build
Publish directory: dist
Node version:     20.x veya 22.x (LTS)
```

### 3. Domain
- **Primary domain:** `gonet.com.tr`
- **SSL:** Let's Encrypt otomatik (Coolify default)
- **Force HTTPS:** AÇIK
- **www → non-www redirect:** AÇIK (gonet.com.tr canonical)

### 4. **Reverse Proxy custom rules** (Coolify "Nginx Configuration" veya "Custom Server Configuration" alanı)

Astro static build'de 301 redirect HTML meta refresh ile gelir.
**Gerçek 301 status code için** nginx katmanına eklenmesi gerekir:

```nginx
# Eski WP/PHP URL'leri → yeni Astro route'ları (301 permanent)
location = /seo-nedir { return 301 /blog/seo-nedir; }
location = /sem-nedir { return 301 /blog/arama-motoru-pazarlamasi-nedir; }
location = /arama-motoru-pazarlamasi-nedir { return 301 /blog/arama-motoru-pazarlamasi-nedir; }
location = /dijital-pazarlamada-23-yilda-neler-oldu { return 301 /blog/dijital-pazarlamada-23-yilda-neler-oldu; }
location = /saglik-turizmi-sektorunde-dijital-cagin-gereklilikleri { return 301 /blog/saglik-turizmi-sektorunde-dijital-cagin-gereklilikleri; }
location = /sosyal-medya-kamu-hizmetleri-ve-dijital-ajanslar-arasindaki-kopru { return 301 /blog/sosyal-medya-kamu-hizmetleri-ve-dijital-ajanslar-arasindaki-kopru; }
location = /web-tasarimda-cografi-etkiler { return 301 /blog/web-tasarimda-cografi-etkiler; }
location = /21-yuzyilda-reklam-ajanslari { return 301 /blog/21-yuzyilda-reklam-ajanslari; }

# Eski kurumsal HTML/PHP
location = /hakkimizda.html { return 301 /hakkimizda; }
location = /iletisim.html { return 301 /iletisim; }
location = /markalar.html { return 301 /markalar; }
location = /isler.html { return 301 /case-studies; }
location = /marka_musteriler.php { return 301 /markalar; }
location = /Referanslarimiz-14-4.php { return 301 /markalar; }
location = /index.php { return 301 /; }
location = /home { return 301 /; }

# Geri kalan 60 eski WP blog yazısı (sözlük serisi, logo hikayeleri, vb.) → 410 Gone
# Google bunları indexten çıkarsın, 404'ten temiz sinyal
location ~ ^/(roi-nedir|landing-page-nedir|cpm-nedir|ctr-nedir|kpi-nedir|smm-nedir|smo-nedir|cpi-nedir|ppc-nedir|pps-nedir|ads-nedir|afk-nedir|rtb-nedir|tos-nedir|c2c-nedir|nft-nedir|word-of-mouth|html-nedir|css-nedir|cms-nedir|ftp-nedir|mms-nedir|uhd-nedir|ugc-nedir|serp-nedir|nike-logo|ferrari-logo|mercedes-benz-logo|david-ogilvy|leo-burnett|william-bernbach|eli-aciman|jeffi-medina|koc-holdingin-logosunu|lacoste-nasil-kuruldu|markalardan-ilham|reklam-ajanslarının-kisa-tarihi|reklam-planinin-ilk-karari|iyi-ki-ben-bir-yaratici|illustrasyon-sanatinin|reklam-ajanslariyla-calismanin|reklamciligin-dahi-ismi|reklaminiz-sattirmiyorsa|pazarlama-ve-reklamda|calismaktan-zevk-duyanlara|bir-ulke-sahip-oldugu|izmir-seo-kelimesini-telaffuz-eden-ilk-dijital-reklam-ajansi|izmir-en-koklu-dijital-reklam-ajansi|web-sitesi-cozumleri|digital-medya-ve-arama-motoru|merhaba-dupia-kasifleri|eski-reklamlar|metadan-facebook-ve-whatsapp|ios-icin-whatsappa|twitter-engellenen-hesaplari|whatsapp-sesli-mesajlarin|wired-uk-istanbulun|madonna-dan-nft|meta-hesaplar-merkezi|twitter-hissedarlarindan)$ {
    return 410;
}
```

> Not: Coolify'da nginx custom config'i editlenemeyse alternatif: `public/_redirects` dosyası (Netlify/Cloudflare Pages syntax).
> Astro `redirects` config'inde tanımlı kurallar HTML meta refresh ile yine fallback olarak çalışır (301 değil 200+meta, SEO için suboptimal ama mevcut).

### 5. Environment variables
Gerekli olanları Coolify "Environment Variables" alanına ekle (yoksa boş bırakılabilir).

### 6. Deploy
- "Deploy" tuşuna bas
- Build log'u izle (npm ci → astro build → dist/ üretildi)
- "Application is running" yeşil olunca → temp Coolify URL'inden (örn. `https://abc.coolify.io`) test et

### 7. DNS A kaydı flip (geçişin son adımı)

**Cloudflare DNS:**
1. Önce TTL'yi düşür: A record `gonet.com.tr` → **TTL 300s (5 dk)** olarak ayarla (eski IP'de)
2. 1-2 saat bekle (mevcut TTL süresinden uzun)
3. A record IP'sini **Hetzner Coolify VM IP'si**'ne çevir
4. Test et: `dig gonet.com.tr A`, `curl -I https://gonet.com.tr`
5. 24 saat izleme süresi sonunda TTL'yi tekrar **3600s (1 saat)** yap

### 8. Google Search Console
- Önceki property aktif kalır (URL aynı)
- **Sitemap yeniden gönder:** `https://gonet.com.tr/sitemap-index.xml`
- **URL Inspection** ile 1-2 önemli sayfa için "Request Indexing"
- 7-14 gün sonra crawl sonuçlarını izle

## Geri dönüş planı (acil durum)

Eğer yeni site'de kritik bir sorun çıkarsa:
1. Cloudflare DNS panel → A record IP'sini **eski sunucu IP'sine** geri çevir
2. TTL 300s olduğu için 5-10 dakika içinde önceki site'e dönüş
3. Coolify'da debug et, fix push → tekrar A flip

## Çıktı doğrulama (geçiş sonrası)

```bash
# Status check
curl -I https://gonet.com.tr/
curl -I https://gonet.com.tr/seo-nedir  # eski URL — 301 olmalı
curl -I https://gonet.com.tr/blog/seo-nedir  # yeni URL — 200 olmalı

# Title + meta
curl -s https://gonet.com.tr/ | grep -E '<title>|description'

# Schema.org JSON-LD
curl -s https://gonet.com.tr/ | grep -c 'application/ld+json'

# Sitemap
curl -s https://gonet.com.tr/sitemap-index.xml | head -20

# robots.txt + llms.txt
curl https://gonet.com.tr/robots.txt
curl https://gonet.com.tr/llms.txt
```
