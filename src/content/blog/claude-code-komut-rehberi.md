---
title: "Claude Code Slash Komutları: 95 Komutun Tam Türkçe Rehberi (2026)"
description: "Claude Code'un terminal içinden kullanılan tüm \"/\" (slash) komutları — kurulumdan model seçimine, paralel çalışmadan kod incelemesine, hesap yönetiminden bulut entegrasyonuna kadar 95 komut, 10 kategoride, Türkçe açıklamalarıyla. Bir mesajın başında / yazarak hepsini görebilir, harf ekleyerek filtreleyebilirsiniz."
h1: "Claude Code Komutları"
ogImage: "/blog/blog-claude-code-komut-rehberi.jpg"
keywords:
  - "Claude Code komutları"
  - "Claude Code slash commands"
  - "Claude Code / komutları"
  - "Claude Code Türkçe rehber"
  - "AI kodlama asistanı"
  - "yapay zeka geliştirici araçları"
published: 2026-06-16
updated: 2026-06-16
author:
  name: "Gonet"
  role: "İzmir'in ilk AI ajansı — yapay zekâ destekli üretim"
category: "Rehber"
tags: ["claude code", "yapay zeka", "anthropic", "geliştirici araçları", "verimlilik"]
readingMinutes: 9
draft: false
---

**Claude Code**, Anthropic'in terminal içinde çalışan yapay zekâ destekli kodlama asistanıdır. Bir mesajın başında **`/`** (slash) yazdığınız anda, oturumu yöneten onlarca komut açılır: model değiştirme, plan modu, kod inceleme, paralel görevler, hesap yönetimi ve fazlası.

Bu rehber, Claude Code'un tüm `/` komutlarını 10 kategoride topluyor — tek tek Türkçe açıklamalarıyla. Komutlar sık güncellenir; canlı listeyi her zaman terminalde `/` yazarak ya da `/help` ile görebilirsiniz.

Gonet'te yapay zekâ artık bir "deneme" değil, günlük üretim hattının bir parçası. Bu komutları her gün kullanıyoruz; aşağıdaki liste, ekibimizin başvuru kılavuzunun kamuya açık hâlidir.

> Her komut her kullanıcıda görünmez — platform, plan ve ortama göre değişir.

## 01 · Başlangıç & Proje Kurulumu

- **`/init`** — Projeyi tanır, başlangıç bir `CLAUDE.md` rehber dosyası oluşturur.
- **`/memory`** — `CLAUDE.md` hafıza dosyalarını düzenler; otomatik hafızayı açıp kapatır.
- **`/mcp`** — MCP sunucu bağlantılarını ve OAuth yetkilendirmesini yönetir.
- **`/agents`** — Alt-ajan (subagent) yapılandırmalarını yönetir.
- **`/permissions`** — Araç izinlerini (izin ver / sor / reddet) yönetir. Diğer ad: `/allowed-tools`.
- **`/add-dir`** — Oturum boyunca erişim için ek bir çalışma dizini ekler.
- **`/cd`** — Oturumu yeni bir çalışma dizinine taşır; prompt önbelleği korunur.
- **`/hooks`** — Araç olayları için hook (kanca) yapılandırmalarını görüntüler.
- **`/config`** — Ayarlar arayüzünü açar: tema, model, çıktı stili. Diğer ad: `/settings`.
- **`/plugin`** — Eklentileri yönetir — menü ya da `list/install/enable/disable`.

## 02 · Çalışırken: Model, Çaba & Bağlam

- **`/plan`** — Plan moduna geçer; büyük bir değişiklikten önce yaklaşımı planlar.
- **`/model`** — Yapay zekâ modelini değiştirir ve yeni oturumlar için varsayılan yapar.
- **`/effort`** — Akıl yürütme/çaba seviyesini ayarlar (`low`…`max`, `ultracode`).
- **`/advisor`** — Görevin kritik anlarında ikinci bir modelden görüş alır.
- **`/context`** — Bağlam penceresi kullanımını renkli ızgarayla gösterir.
- **`/compact`** — Konuşmayı özetleyerek bağlamda yer açar.
- **`/btw`** — Geçmişi şişirmeden hızlı bir yan soru sorar.
- **`/goal`** — Bir hedef belirler; koşul sağlanana dek turlar boyunca çalışır.
- **`/fast`** — Hızlı modu açar veya kapatır.
- **`/focus`** — Yalnızca son istem, kısa özet ve nihai yanıtı gösteren odak görünümü.

## 03 · Paralel & Arka Plan Çalışma

- **`/batch`** — Büyük işi 5-30 parçaya böler, her birini ayrı worktree'de çalıştırıp PR açar.
- **`/background`** — Oturumu arka plan ajanı yapar, terminali serbest bırakır. Diğer ad: `/bg`.
- **`/fork`** — Tüm konuşmayı miras alan bir arka plan alt-ajanı oluşturur.
- **`/branch`** — Konuşmayı dallandırır; orijinali kaybetmeden farklı bir yön denersiniz.
- **`/tasks`** — Arka planda çalışan her şeyi görüntüler ve yönetir. Diğer ad: `/bashes`.
- **`/workflows`** — İş akışı ilerlemesini açar: izle, duraklat, sürdür, kaydet.
- **`/loop`** — Bir istemi tekrar tekrar çalıştırır (örn. `/loop 5m deploy bitti mi`).
- **`/schedule`** — Anthropic bulutunda çalışan rutinler oluşturur. Diğer ad: `/routines`.

## 04 · Göndermeden Önce: İnceleme & Diff

- **`/diff`** — Commit'lenmemiş değişiklikler için etkileşimli diff görüntüleyici.
- **`/code-review`** — Diff'i hata ve sadeleştirme için inceler; `--fix`, `--comment`, `ultra`.
- **`/review`** — Bir pull request'i geçerli oturumda yerel olarak inceler.
- **`/security-review`** — Bekleyen değişiklikleri güvenlik açıkları için analiz eder.
- **`/simplify`** — Değişen kodu sadeleştirir (4 paralel ajan); hata aramaz.
- **`/ultrareview`** — Bulutta çok-ajanlı derin inceleme. Tercih edilen: `/code-review ultra`.
- **`/ultraplan`** — Plan taslağını tarayıcıda inceletir, sonra uzaktan çalıştırır.
- **`/run`** — Değişikliği çalışan uygulamada görmek için projeyi başlatır.
- **`/verify`** — Değişikliği derleyip çalıştırarak gerçekten doğru olduğunu doğrular.
- **`/run-skill-generator`** — `/run` ve `/verify`'a uygulamayı kurmayı öğreten beceri yazar.

## 05 · Oturumlar Arası: Devam & Senkron

- **`/clear`** — Boş bağlamla yeni konuşma başlatır; proje hafızası korunur. Diğer ad: `/new`.
- **`/resume`** — Bir konuşmayı ID veya ad ile sürdürür. Diğer ad: `/continue`.
- **`/rewind`** — Konuşmayı ve/veya kodu önceki kontrol noktasına geri sarar. Diğer ad: `/undo`.
- **`/teleport`** — Bir Claude Code web oturumunu bu terminale çeker. Diğer ad: `/tp`.
- **`/remote-control`** — Oturumu claude.ai üzerinden uzaktan kontrole açar. Diğer ad: `/rc`.
- **`/desktop`** — Oturumu masaüstü uygulamada sürdürür. Diğer ad: `/app`.
- **`/rename`** — Geçerli oturumu yeniden adlandırır.
- **`/recap`** — Geçerli oturumun tek satırlık özetini üretir.
- **`/export`** — Konuşmayı düz metin olarak dışa aktarır.
- **`/copy`** — Son asistan yanıtını panoya kopyalar.

## 06 · Sorun Giderme & Tanılama

- **`/doctor`** — Kurulumu ve ayarları tanılar; `f` ile sorunları düzelttirir.
- **`/debug`** — Hata ayıklama günlüğünü açar ve okuyarak sorun giderir.
- **`/feedback`** — Geri bildirim gönderir, hata bildirir veya konuşmayı paylaşır. Diğer ad: `/bug`.
- **`/heapdump`** — Yüksek bellek kullanımı için JS yığın anlık görüntüsü yazar.
- **`/release-notes`** — Değişiklik günlüğünü etkileşimli sürüm seçicide görüntüler.
- **`/reload-plugins`** — Aktif eklentileri yeniden başlatmadan yeniden yükler.
- **`/reload-skills`** — Beceri ve komut dizinlerini yeniden tarar.

## 07 · Hesap, Kullanım & Plan

- **`/login`** — Anthropic hesabına giriş yapar.
- **`/logout`** — Anthropic hesabından çıkış yapar.
- **`/usage`** — Oturum maliyeti, plan limitleri ve istatistikleri gösterir. Diğer ad: `/cost`.
- **`/usage-credits`** — Limite ulaşınca devam için kullanım kredilerini yapılandırır.
- **`/upgrade`** — Yükseltme sayfasını açar (yalnızca Pro/Max).
- **`/privacy-settings`** — Gizlilik ayarlarını görüntüler ve günceller (Pro/Max).
- **`/passes`** — Arkadaşlarla bir haftalık ücretsiz Claude Code paylaşır.

## 08 · Arayüz, Tema & Kişiselleştirme

- **`/theme`** — Renk temasını değiştirir: aydınlık/karanlık, `auto`, özel temalar.
- **`/color`** — Geçerli oturumun istem çubuğu rengini ayarlar.
- **`/tui`** — Terminal arayüz işleyicisini ayarlar (`fullscreen` titreşimsiz tam ekran).
- **`/statusline`** — Claude Code'un durum satırını yapılandırır.
- **`/keybindings`** — Klavye kısayolları dosyanızı açar.
- **`/scroll-speed`** — Fare tekerleği kaydırma hızını etkileşimli ayarlar.
- **`/voice`** — Sesli dikteyi açar/kapatır (`hold`/`tap`/`off`).
- **`/vim`** — (Kaldırıldı) Düzenleme modları artık `/config → Editor mode`.

## 09 · Beceriler, Yardım & Diğer

- **`/skills`** — Mevcut becerileri (skills) listeler.
- **`/help`** — Yardımı ve mevcut tüm komutları gösterir.
- **`/powerup`** — Animasyonlu kısa derslerle özellikleri keşfettirir.
- **`/insights`** — Claude Code oturumlarını analiz eden bir rapor üretir.
- **`/team-onboarding`** — Son 30 günlük kullanımdan ekip onboarding rehberi üretir.
- **`/claude-api`** — Claude API referansını yükler; `migrate` ile kodu yeni modele taşır.
- **`/deep-research`** — Web aramalarını dağıtıp kaynakları çapraz kontrol eden rapor sentezler.
- **`/fewer-permission-prompts`** — Sık salt-okunur çağrıları allowlist'e ekleyip izin istemlerini azaltır.
- **`/radio`** — Tarayıcıda Claude FM lo-fi radyoyu açar.
- **`/stickers`** — Claude Code çıkartmaları sipariş eder.

## 10 · GitHub, Bulut & Entegrasyon

- **`/autofix-pr`** — PR'ı izleyip CI hatalarında/yorumlarda düzeltme iten web oturumu başlatır.
- **`/install-github-app`** — Bir depo için Claude GitHub Actions uygulamasını kurar.
- **`/install-slack-app`** — Claude Slack uygulamasını kurar.
- **`/web-setup`** — GitHub hesabını Claude Code on the web'e bağlar.
- **`/remote-env`** — Bulut ajanları için varsayılan ortamı seçer.
- **`/chrome`** — Claude in Chrome ayarlarını yapılandırır.
- **`/ide`** — IDE entegrasyonlarını yönetir ve durumu gösterir.
- **`/sandbox`** — Sandbox (kum havuzu) modunu açar/kapatır.
- **`/setup-bedrock`** — Amazon Bedrock kimlik doğrulama ve model ayarlarını yapılandırır.
- **`/setup-vertex`** — Google Vertex AI kimlik doğrulama ve model ayarlarını yapılandırır.
- **`/terminal-setup`** — Terminal tuş atamalarını yapılandırır (Shift+Enter vb.).
- **`/status`** — Sürüm, model, hesap ve bağlantı bilgisini gösterir.
- **`/mobile`** — Mobil uygulama için QR kodu gösterir. Diğer ad: `/ios`, `/android`.
- **`/exit`** — CLI'dan çıkar. Diğer ad: `/quit`.
- **`/stop`** — Geçerli arka plan oturumunu durdurur (yalnızca bağlıyken).

## Sık sorulan sorular

**Claude Code nedir?**
Anthropic'in terminal içinde çalışan, kod yazıp düzenleyebilen yapay zekâ destekli kodlama asistanıdır. CLI'nin yanı sıra masaüstü, web ve IDE eklentisi olarak da kullanılır.

**Claude Code slash komutlarını nasıl görürüm?**
Bir mesajın başında `/` yazmanız yeterli; tüm komutlar listelenir, harf ekledikçe filtrelenir. `/help` komutu da tam listeyi gösterir.

**Neden bazı komutlar bende görünmüyor?**
Komut görünürlüğü platform, abonelik planı ve ortama göre değişir. Örneğin `/desktop` yalnızca masaüstü uygulamada, `/setup-bedrock` yalnızca Bedrock ortamında çıkar.

**Bu komut listesi güncel kalır mı?**
Claude Code çok sık güncellenir. En doğru kaynak her zaman terminalde `/` veya `/help`'tir; bu rehber Haziran 2026 itibarıyla derlenmiştir.

---

**Kaynaklar:**

- Anthropic, "Claude Code — Slash commands", resmî belgeler, [code.claude.com/docs/en/commands](https://code.claude.com/docs/en/commands)
- Claude Code, terminal içi `/help` çıktısı — Haziran 2026

*Bu rehber, Gonet ekibinin günlük kullandığı Claude Code komutlarından Haziran 2026'da derlenmiştir. Gonet, İzmir'in ilk yapay zekâ ajansı olarak üretim süreçlerini yapay zekâ ile yeniden kuruyor — 2000'den beri dijitalin içindeyiz.*
