# Hero Haber-Slider — İçerik + Uygulama Paketi

> **Kimden:** Atölye-1 hub (AAI) · **Kime:** gonet.com.tr geliştirme CCD'si · **Tarih:** 2026-07-22
> **Durum:** İçerik Gökhan tarafından ONAYLANDI. Bu paket kendi kendine yeterlidir — uygulamak için başka dosyaya ihtiyaç yok.
> **Not:** `hero-slider-proto` branch'i zaten açık; bu iş orada sürebilir.

Bu, gonet.com.tr ana sayfa hero'sunu deneysel bir **tipografi haber-slider'ına** çeviren işin içerik + teknik paketidir. Gökhan tarif etti, hub içeriği derledi + gizlilik süzgecinden geçirdi. **Deneysel** — beğenilmezse tek anahtarla eski hero'ya dönülebilmeli (§C).

---

## A. Vizyon (tek cümle)

Ana sayfa hero'su statik başlıktan; **slide 0 = kalıcı marka mesajı ("Her iş'te Gonet var."), slide 1..N = "Claude Code ile ne geliştirdik" haberleri** olan bir slider'a dönüşür. Her haber kendi detay sayfasına gider; tıklanan haber slider'da bir daha görünmez.

## B. 🔴 En kritik kısıt — AEO görünürlüğü

gonet.com.tr aynı zamanda bir AEO/GEO AR-GE laboratuvarı. Haberlerin kendisi lab çıktısı ve AI motorlarına (GPTBot/ClaudeBot/PerplexityBot) yem. **Bu yüzden:** slider client-side JS ile dönse de, **tüm slide içerikleri (başlık + özet + detay linki) sunucu-render edilmiş HTML'de bulunmalı** — JS ile sonradan enjekte EDİLMEMELİ. JS yalnızca görünürlük/geçiş/gizleme yönetir; içerik DOM'da hazır durur. Kabul kriteri: JS kapalıyken `curl` çıktısında tüm slide metinleri görünmeli.

---

## C. İçerik — 7 lab haberi (FINAL, hepsi girecek)

Her haber: `sliderText` (slider'da dev tipografiyle görünen kısa metin) + `title` (detay başlığı) + `summary` (özet) + `body` (detay gövdesi) + `etiket`.

### H1 — AI Görünürlük Denetim Motoru
- **sliderText:** `AI SENİ GÖRÜYOR MU?`
- **title:** Yapay zeka motorlarında görünürlüğü ölçen denetim aracını geliştirdik
- **summary:** ChatGPT, Claude, Perplexity gibi AI cevap motorlarının bir siteyi ne kadar "gördüğünü" ölçen deterministik bir denetim aracı kurduk — arşiv varlığı + bağlantı-merkeziyeti sinyalleriyle skorlu rapor.
- **etiket:** AEO/GEO
- **body:**

  Bir web sitesinin yapay zeka cevap motorlarında ne kadar "görünür" olduğunu ölçmek, klasik arama motoru optimizasyonundan farklı bir iş. ChatGPT, Claude veya Perplexity bir markayı yanıtlarına alıyor mu, yoksa görmezden mi geliyor? Bu soruyu tahminle değil ölçümle yanıtlamak için, bir sitenin AI motorları tarafından bulunabilirliğini deterministik biçimde puanlayan bir denetim aracı geliştirdik.

  Araç, bir sitenin arşivlerde ne kadar yer ettiğine ve web üzerindeki bağlantı ağının merkezinde durup durmadığına bakarak skorlu bir rapor üretiyor. Böylece "AI beni görüyor mu?" sorusu, üzerinde çalışılabilir somut bir tabloya dönüşüyor — nerede güçlüsün, nerede görünmez kalıyorsun.

### H2 — Otonom Görsel Kalite Denetçisi
- **sliderText:** `OTONOM QA`
- **title:** Bir siteyi baştan sona gezip görsel + teknik sağlığını çıkaran denetim ajanı
- **summary:** Sayfaları tek komutla dolaşıp her birinin ekran görüntüsü ile yapısal/teknik sağlığını raporlayan, spec bir kez yazılınca sürekli tekrar eden otonom bir kalite denetçisi.
- **etiket:** Otomasyon
- **body:**

  Bir siteyi yayına almadan önce her sayfayı tek tek açıp "düzgün görünüyor mu, bir şey kırılmış mı?" diye kontrol etmek saatler alır ve göz yoruldukça hata kaçar. Bunu bir kez tarif edip sonra sürekli tekrar eden bir ajana devrettik.

  Ajan, siteyi baştan sona dolaşıyor, her sayfanın ekran görüntüsünü alıyor ve yapısal/teknik sağlığını raporluyor. Bir kez "neye bakacağını" yazdığınızda, aynı denetimi her seferinde aynı titizlikle tekrarlıyor — insan gözünün yorulup atladığı ayrıntıları kaçırmadan.

### H3 — İçerik Besleme + Üretim Döngüsü
- **sliderText:** `SİNYALDEN İÇERİĞE`
- **title:** Çok kaynaklı sinyalleri içeriğe çeviren besleme motorunu kurduk
- **summary:** Web'deki dağınık sinyalleri toplayıp nişe göre süzen, haber ve makale adaylarına dönüştüren bir içerik besleme hattı geliştirdik.
- **etiket:** İçerik/AI
- **body:**

  İyi içerik üretmenin en zor kısmı çoğu zaman yazmak değil, "ne hakkında yazmalı?" sorusuna doğru anı yakalayarak cevap vermek. Web'e dağılmış onlarca sinyali — haberi, tartışmayı, trendi — tek tek takip etmek ise tek kişinin işi değil.

  Bu yüzden çok kaynaktan sinyal toplayan, bunları ilgili olduğu alana göre süzen ve haber ya da uzun makale adaylarına dönüştüren bir besleme hattı kurduk. Dağınık ham sinyal bir uçtan giriyor, üzerinde çalışılmaya hazır içerik adayları diğer uçtan çıkıyor.

### H4 — AI-Yerel Bilgi Sistemi
- **sliderText:** `HATIRLAYAN AI`
- **title:** Projeleri oturumlar arası hatırlayan AI-yerel bilgi tabanı mimarisi
- **summary:** Her projenin bilgisini sade markdown dosyalarında tutan, oturumlar arası hatırlayan, kendini derleyen bir AI çalışma hafızası kurduk (Karpathy LLM-Wiki deseni).
- **etiket:** Mimari
- **body:**

  Yapay zekayla çalışırken en sık yaşanan sorun, her yeni oturumda "nerede kalmıştık?"a geri dönmek. AI, bir önceki konuşmayı kendiliğinden hatırlamaz; her seferinde bağlamı sıfırdan kurmak gerekir.

  Biz bunu, her projenin bilgisini sade metin dosyalarında tutan, oturumlar arası hatırlayan ve kendini düzenli tutan bir çalışma hafızası ile çözdük. Andrej Karpathy'nin "LLM-Wiki" deseninden ilham alan bu yapı sayesinde AI, her projenin geçmişini, kararlarını ve sıradaki adımını biliyor — sohbet baştan başlamıyor, kaldığı yerden devam ediyor.

### H5 — Web Modül/Ürün Fabrikası
- **sliderText:** `MODÜL FABRİKASI`
- **title:** Tekrar eden web geliştirmelerini ürüne çeviren fabrika kurduk
- **summary:** Farklı projelerde tekrar tekrar yazdığımız web parçalarını tek tek yeniden kullanılabilir ürün ve modüllere dönüştüren bir üretim hattı tasarladık.
- **etiket:** Ürün
- **body:**

  Farklı projelerde çalışırken aynı web parçalarını tekrar tekrar yazdığımızı fark ettik: aynı iletişim formu, aynı çok-dil altyapısı, aynı görünürlük katmanı. Her seferinde sıfırdan yazmak hem zaman kaybı hem de tutarsızlık kaynağı.

  Bunun için tekrar eden geliştirmeleri toplayıp tek tek yeniden kullanılabilir ürün ve modüllere çeviren bir üretim hattı tasarladık. Bir kez iyi yapılan iş, bir sonraki projede hazır bir parçaya dönüşüyor — böylece her yeni site daha hızlı ve daha sağlam kuruluyor.

### H6 — Gömülebilir AI Sohbet Asistanı
- **sliderText:** `SİTEN KONUŞSUN`
- **title:** Sitenin içeriğine hâkim, marka diline sadık AI sohbet asistanı
- **summary:** Herhangi bir web sitesine gömülen, o sitenin hizmetlerini bilen ve ziyaretçiyle o markanın diliyle konuşan bir AI sohbet asistanı modülü geliştirdik.
- **etiket:** Ürün/AI
- **body:**

  Bir web sitesine sohbet kutusu eklemek kolay; zor olan, o kutunun gerçekten o siteyi bilmesi. Çoğu hazır sohbet aracı genel cevaplar verir, markanın hizmetlerinden ya da dilinden habersizdir.

  Biz, gömüldüğü sitenin içeriğine hâkim ve o markanın diliyle konuşan bir AI sohbet asistanı modülü geliştirdik. Ziyaretçi soru sorduğunda, asistan o sitenin hizmetlerini bilerek ve markanın tonunu koruyarak yanıt veriyor — genel bir bot değil, sitenin kendi sesi gibi.

### H7 — Site Sağlık Monitörü
- **sliderText:** `KIRIK LİNK AVCISI`
- **title:** Kırık bağlantı ve arama motoru sorunlarını yakalayan otomatik monitör
- **summary:** Siteleri periyodik tarayıp kırık bağlantıları ve arama motoru sağlık sorunlarını erkenden yakalayan otomatik bir izleme aracı kurduk.
- **etiket:** Otomasyon
- **body:**

  Bir site yayına girdikten sonra sessizce bozulabilir: bir bağlantı kırılır, bir sayfa arama motorlarından düşer, kimse fark etmez. Sorun genellikle biri şikayet edene kadar görünmez kalır.

  Bunu önlemek için siteleri düzenli aralıklarla tarayan, kırık bağlantıları ve arama motoru sağlık sorunlarını erkenden yakalayan otomatik bir izleme aracı kurduk. Sorunlar büyümeden, daha kimse fark etmeden yüzeye çıkıyor.

**Gizlilik denetimi ✅:** Müşteri adı/işi/verisi yok · token/path/iç mimari yok · gelir/fiyat yok · uydurma metrik yok.

---

## D. Fonksiyonel gereksinimler

| # | Gereksinim |
|---|---|
| F1 | Hero bir slider olur (slide'lar arası geçiş). |
| F2 | Slide 0 = kalıcı marka slide'ı ("Her iş'te Gonet var."), her zaman ilk, asla düşmez. Mevcut `index.astro` hero'su birebir korunur — slider'ın ilk frame'i olur. |
| F3 | Slide 1..N = 7 haber (en yeniden eskiye). |
| F4 | Haber slide'ına tıklama → detay sayfası açılır. |
| F5 | Tıklanan haber slider'da bir daha görünmez (kalıcı, kullanıcı-başı). `localStorage` öner. İşaretleme **tık anında** (Gökhan: "tıklanan bir daha gelmez"). |
| F6 | Tüm haberler tükeninceslider zarifçe sadece marka slide'ıyla kalır (kırık/boş durum yok). |
| F7 | Otomatik geçiş (~6-7sn) + manuel kontrol (ok/nokta/swipe); hover'da dur; `prefers-reduced-motion`'da otomatik KAPALI. |

## E. Tasarım yönü

Gökhan: *"beyaz zemin, sadece yazı, devasa fonlar, çılgın."* **Mevcut hero zaten tam bu dilde — yeni dil icat etme, mevcut editorial sistemi slider'a genişlet.**
- Zemin saf beyaz, metin siyah; **görsel/foto YOK, sadece tipografi.** Dark mode uyumlu (`[data-theme="dark"]` → siyah zemin/beyaz metin).
- Tipografi: mevcut `.editorial-display` (bkz. `src/styles/global.css` — `var(--font-display)`, uppercase, `line-height:0.85`, `letter-spacing:-0.02em`). Devasa `vw`-ölçek (mevcut hero: `text-[28vw]`/`xl:text-[320px]`). Her `sliderText` bu ölçekte "çığlık atan" 1-2 kelime.
- "Çılgın": mevcut hero'daki tilt/rotate (`rotate(-0.8deg)`), karışık boyut/hizalama, boydan-boya çizgi öğelerini haber slide'larına taşı — "editöryel poster" hissi. Tekdüze olmasın ama okunabilir kalsın.
- Geçiş tipografik olsun (kesme/kayma/maske), cheesy carousel değil.
- Mobil: swipe.

## F. Teknik yaklaşım (Astro 6 statik)

- Yeni component (örn. `src/components/HeroSlider.astro`) — slide'ları **SSR-render** eder (F2 marka + collection'dan 7 haber). `index.astro` mevcut hero `<section>`'ını bununla değiştirir **ama eski hero'yu silme** (§C-geri dönüş).
- Yeni content collection (Astro `defineCollection`+zod, mevcut `src/content.config.ts` desenine uyumlu). **Şema:**
  ```
  title · sliderText · slug · published(date) · summary · body(md) · etiket · draft(bool)
  ```
- 🔶 **Collection/rota ismi kararı:** `/haberler` zaten blog listesine bağlı (çakışma riski). Öneri: `lab-gunlugu` collection + `/lab/[slug]` rota (mevcut `src/pages/labs/` kimliğiyle örtüşür). Nihai isim Gökhan+CCD kararı.
- Client JS (küçük `<script>`): geçiş, otomatik ilerleme, klavye/swipe, görülen-gizleme. İçerik zaten DOM'da; JS sadece aktif-slide + `hidden` yönetir.
- localStorage: örn. `gonet:hero:seen` = tıklanan slug'ların JSON dizisi. Yüklenince JS bu slug'ları görsel döngüden çıkarır (DOM'da kalır → bot görür → görselde atlanır). Tıkta slug listeye eklenir.
- Erişilebilirlik: `role`/`aria-roledescription`, klavye okları, focus yönetimi, `prefers-reduced-motion`.
- **Bağımlılık ekleme** — Swiper vb. GEREKMEZ; birkaç slide için saf CSS+JS yeterli.

## G. Geri-alınabilirlik (ZORUNLU)

- Mevcut hero markup'ını **silme**; ayrı yapıya al (örn. `HeroClassic.astro`) veya git ile koru. `index.astro`'da tek anahtar/koşulla eski hero ↔ slider geçişi mümkün olsun. Beğenilmezse **tek satır** değişiklikle eski statik "Her iş'te Gonet var." geri gelir.
- Deploy manuel (Coolify "Deploy"; push otomatik deploy etmez) — Gökhan'a önizleme sonrası yayınla.

## H. Kabul kriterleri (bitti demeden doğrula)

1. Ana sayfada slide 0 = "Her iş'te Gonet var." görünür; sonra 7 haber döner.
2. JS-kapalı / `curl` görünümde **tüm slide metinleri HTML'de mevcut** (AEO — §B).
3. Haber tıklama → doğru detay sayfası; detay kendi Article/WebPage schema'sıyla render.
4. Tıklanan haber yenilemede döngüde gelmiyor; localStorage temizlenince geri geliyor.
5. Tüm haberler tıklanınca marka slide'ıyla stabil kalıyor (kırık yok).
6. `prefers-reduced-motion` açıkken otomatik kapalı, manuel çalışıyor.
7. Dark mode uyumlu; mobil swipe çalışıyor.
8. Eski hero'ya dönüş tek anahtarla mümkün.

## I. Açık kararlar (Gökhan + CCD netleştirir)

- Collection/rota ismi (`lab-gunlugu`+`/lab` önerisi).
- Otomatik geçiş hızı + açık/kapalı varsayılanı.
- Slider'da aynı anda kaç haber döner (7'si de mevcut; tıklanan düşer).

**Süreklilik kararı (Gökhan 2026-07-22):** Bu **tek seferlik** — 7 haber konur, denenir. Beğenilirse sonra düzenli lab-günlüğü akışına (yayın-otomasyonu Profil B) bağlanır. Şimdilik otomasyon YOK, içerik elle bu paketten.
