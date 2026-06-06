---
title: "Self-hosted PaaS: Coolify + Docker ile Vendor-Independent Deploy"
description: "Hetzner + Coolify + Cloudflare kombinasyonu ile Vercel/Heroku'ya bağımlılık olmadan ölçeklenebilir, maliyet-etkin altyapı kurun. Gonet'in 26 yıllık deneyimi."
h1: "Self-hosted PaaS: Coolify + Docker ile Vendor-Independent Deploy"
categorySlug: "web-gelistirme-altyapi"
categoryName: "Web Geliştirme & Altyapı"
skillSlug: "self-hosted-paas-coolify-docker"
skillLevel: "İleri"
keywords:
  - self-hosted-paas
  - coolify
  - docker-deployment
  - hetzner
  - cloudflare-cdn
  - vercel-alternatifi
  - vendor-independent
  - maliyet-optimizasyonu
  - infrastructure-as-code
  - kubernetes
  - git-based-deployment
  - edge-optimization
  - kvkk-uyumlu-hosting
  - disaster-recovery
  - monorepo-deploy
published: 2026-06-07
updated: 2026-06-07
faqs:
  - q: "Coolify ile Vercel arasındaki geliştirici deneyimi farkı nedir?"
    a: "Coolify, Vercel'in Git-push-deploy basitliğini sunar ancak GUI biraz daha teknik. Vercel'de her şey abstraction katmanı arkasında, Coolify'da Docker konteynerları, environment variable'lar, build log'ları doğrudan görülür. Deneyimli developerlar için bu avantaj (debug kolaylığı), junior'lar için öğrenme eğrisi var. Ancak Gonet'in hazır template'leri (Next.js, Nuxt, Laravel) ile ilk deploy 10 dakika. Preview URL, automatic SSL, domain routing Vercel'le birebir aynı. Eksik olan: Edge Functions (bunu Cloudflare Workers ile kapatıyoruz), Image Optimization (Sharp + CDN cache ile). Sonuç: %95 aynı DX (developer experience), %10 maliyet."
  - q: "Hetzner sunucu kapasitesi trafik artışında nasıl scale ediliyor?"
    a: "Coolify horizontal scaling (multi-server) desteklemez, tek sunucu limitindesiniz. Ancak Hetzner CCX serisi dakikalar içinde upgrade edilebilir (CCX23: 4 vCPU/16GB'den CCX33: 8 vCPU/32GB'ye). Downtime: 2-3 dakika. Gonet'in yaklaşımı: traffic spike beklenen dönemlerde (kampanya, product launch) önceden scale-up, sonra downgrade. Alternatif: Cloudflare'in edge cache agresifleştirilir, origin sunucuya istek %70 azalır. Gerçek horizontal scaling için Kubernetes'e geçiş öneriyoruz (50K+ concurrent user üzeri). Ancak çoğu proje tek Hetzner CCX43 (16 vCPU/64GB, €120/ay) ile 500K+ daily pageview kaldırıyor."
  - q: "Database backup ve disaster recovery SLA'sı ne?"
    a: "Gonet'in standart setup'ında BorgBackup ile günlük incremental, haftalık full backup Hetzner Storage Box'a şifreli gönderilir. Retention: 7 günlük incremental, 4 haftalık full. PostgreSQL için WAL archiving aktif, point-in-time recovery (PITR) herhangi bir saniyeye geri sarma sağlar. Disaster recovery test senaryosu: sunucu tamamen kaybolsa, yeni Hetzner instance + Terraform ile 15 dakikada altyapı ayağa kalkar, backup restore 30-60 dakika (database boyutuna göre). Toplam RTO (Recovery Time Objective): 1 saat. RPO (Recovery Point Objective): maksimum 24 saat (son backup), PITR ile teorik 0 (wal log sürekliliğinde). Production kritik sistemlerde hot-standby replica eklenebilir (ek maliyet)."
  - q: "Coolify ile monorepo (Nx, Turborepo) deploy senaryosu nasıl yönetiliyor?"
    a: "Coolify her uygulamayı ayrı 'resource' olarak deploy eder. Monorepo'da birden fazla app varsa (örn: Next.js frontend + NestJS API + admin dashboard), her biri Coolify'da ayrı service tanımlanır, aynı Git repo farklı build path ile. Dockerfile her app için customize edilir (WORKDIR, COPY path). Gonet yaklaşımı: root'ta docker-compose.yml, her service için build context belirlenir. Coolify bu compose'u import eder, tek seferde 5-10 servisi deploy eder. Nx/Turborepo'nun affected build özelliği CI/CD'de kullanılır: sadece değişen paketler rebuild edilir, Coolify'a webhook gönderilir. Örnek: 8 mikrosite monorepo, bir sitede değişiklik → sadece o site rebuild + deploy, diğerleri untouched. Deploy süresi 3 dakikadan 40 saniyeye düşer."
  - q: "Self-hosted PaaS güvenlik güncellemeleri kim tarafından yapılıyor?"
    a: "Coolify otomatik update özelliği var ama production'da manuel kontrol öneriyoruz. Gonet managed service'te: ayda 1 bakım penceresi (gece 02:00-04:00), Coolify + Docker + OS güncellemeleri test sunucusunda doğrulandıktan sonra production'a alınır. unattended-upgrades ile Ubuntu security patch'leri otomatik (kernel hariç, reboot gerektirmeyen). Kernel update 3 ayda 1, planlı 5 dakika downtime. Müşteri kendi yönetiyorsa: Coolify dashboard'dan tek tık update, Docker/OS için Gonet'in hazır Ansible playbook'u verilir. Kritik CVE (örn: Log4j benzeri) durumunda 24 saat içinde acil patch. Cloudflare WAF zero-day'lerde ilk savunma hattı, exploit trafiğini origin'e ulaşmadan bloklar."
---

## Self-hosted PaaS — Coolify + Docker nedir?

Self-hosted PaaS (Platform as a Service), üçüncü taraf bulut sağlayıcılarına (Vercel, Netlify, Heroku) bağımlı olmadan kendi sunucularınızda uygulama dağıtımı yapmanızı sağlayan altyapıdır. Coolify, Docker konteynerları üzerinde çalışan açık kaynak bir PaaS çözümüdür — tek tıkla deploy, otomatik SSL, Git entegrasyonu ve multi-app yönetimi sunar.

Gonet'in tercih ettiği stack: **Hetzner** (maliyet-performans lideri bare-metal sunucular) + **Coolify** (deploy orkestrasyon) + **Cloudflare** (CDN, DDoS koruması, edge önbellekleme). Bu kombinasyon, Vercel benzeri geliştirici deneyimini ayda 1/10 maliyetle, tam kontrol ile sağlar.

Örnek senaryo: 12 mikrosite + 3 headless CMS + 5 API servisi çalıştıran bir müşteri, Vercel'de aylık €800 yerine Hetzner CCX23 (€28/ay) + Coolify üzerinde €50 toplam maliyetle işletiliyor — trafik patlamalarında fiyat artışı riski yok.

## Neden kritik?

**1. Vendor Lock-in'den Kurtulma**  
Vercel/Netlify fiyatlandırması trafik bazlıdır. Viral içerik veya DDoS saldırısı durumunda beklenmedik faturalarla karşılaşırsınız. Self-hosted PaaS'ta maliyet sabit — sunucu kapasitesi ödendiği an toplam maliyeti bilirsiniz.

**2. Tam Kontrol + Compliance**  
KVKK/GDPR gerektiren projeler için veri yerleşimi (data residency) kritik. Hetzner Almanya lokasyonlu sunucular + Coolify ile verileriniz AB sınırlarında kalır. Log, backup, retention politikaları tamamen sizin kontrolünüzdedir.

**3. Maliyet Optimizasyonu**  
Gonet'in analizine göre, aylık 500K+ pageview alan 8 Next.js uygulaması Vercel'de €600-900 tutarken, Coolify + Hetzner'de €60-80 arası. Fark 10 kat. Tasarruf doğrudan performans iyileştirme veya içerik bütçesine yönlendirilebilir.

**4. Multi-environment Esnekliği**  
Coolify, unlimited staging ortamı sağlar. Her PR için otomatik preview URL, database klonlama, isolated test ortamları — hiçbir ek ücret yok. Vercel'de bu özellikler Enterprise planına kilitli.

**5. Open Source Garantisi**  
Coolify açık kaynak. Proje dursa bile fork'layıp devam edebilirsiniz. Proprietary PaaS'larda böyle bir güvence yoktur.

## Gonet yaklaşımı

Gonet, 2023'ten bu yana orta-büyük ölçekli projelerde self-hosted PaaS altyapısını standart hale getirdi. Yaklaşımımız:

**Infrastructure as Code (IaC)**  
Her kurulum Terraform/Ansible ile kodlanır. Sunucu provizyon, Coolify kurulum, Cloudflare DNS ayarları otomatik. Disaster recovery 20 dakikada yeni sunucuya replikasyon.

**Katmanlı Güvenlik**  
- Fail2ban + UFW firewall (sadece 80/443/22 açık, 22 sadece VPN)
- Automated backup (BorgBackup): günlük incremental, haftalık full, Hetzner Storage Box'a şifreli
- Cloudflare WAF (Web Application Firewall) + rate limiting
- Let's Encrypt SSL otomasyonu, HSTS zorunlu

**Monitoring + Alerting**  
Uptime Kuma (self-hosted) + Prometheus + Grafana. CPU/RAM/disk kullanımı, response time, error rate izlenir. Threshold aşımlarında Slack/e-posta alert.

**Git-based Deployment**  
GitHub/GitLab push → webhook → Coolify otomatik build + deploy. Rollback tek tık. Branch bazlı staging otomasyonu (main → production, dev → staging).

**Database + Cache Stack**  
PostgreSQL/MySQL konteynerları + Redis. pgBackRest ile point-in-time recovery. Production DB'ye developer doğrudan erişim yok, read-only replica üzerinden.

**CDN Edge Optimizasyonu**  
Cloudflare cache rules + Argo Smart Routing. Statik asset'ler (CSS/JS/resim) 7 gün edge cache, HTML 2 saat stale-while-revalidate. Ortalama TTFB %40 düşüş (Vercel'e kıyasla benzer, bazen daha iyi).

## Hangi durumlarda kritik avantaj?

| **Durum** | **Etki** |
|-----------|----------|
| **Yüksek trafik, düşük bütçe** | 100K+ monthly user'lı SaaS startup'lar Vercel'de €500+, Coolify'da €50-80 ile idare eder. Scale-up sunucu upgrade kadar basit. |
| **Multi-tenant SaaS platformu** | Her client için isolated subdomain + database. Coolify unlimited app destekler, Vercel Enterprise gerektirir (€2K+/ay). |
| **KVKV/compliance zorunluluğu** | Sağlık, finans sektöründe veri Türkiye/AB'de kalmalı. Hetzner Helsinki/Falkenstein veri merkezi + self-host tam uyumluluk sağlar. |
| **Mikroservis mimarisi** | 10+ servis (Next.js, NestJS, Python API, Go worker) tek sunucuda izole konteynerlar halinde. Coolify reverse proxy (Traefik) otomatik routing yapar. |
| **Frequent deploy + rollback** | Günde 20-30 deploy yapan agile ekipler için sınırsız build, anlık rollback. Vercel'de concurrent build sayısı plana göre kısıtlı. |
| **Cost-sensitive scaling** | Black Friday gibi peak dönemlerde sunucu kaynağı geçici artırılır (Hetzner'de upgrade dakikalar sürer), sonra downgrade. Vercel'de traffic-based pricing kontrolsüz fatura getirir. |

## İlgili yetkinlikler

- [Headless CMS Entegrasyonu](/yetkinlikler/headless-cms-entegrasyonu) — Strapi/Payload CMS'i Coolify üzerinde deploy, Next.js ile entegrasyon
- [Docker + Kubernetes Orkestrasyon](/yetkinlikler/docker-kubernetes-orkestrasyon) — Daha büyük ölçeklerde K8s'e geçiş stratejisi
- [CI/CD Pipeline Otomasyonu](/yetkinlikler/cicd-pipeline-otomasyon) — GitHub Actions + Coolify webhook entegrasyonu
- [Sunucu Güvenliği + Hardening](/yetkinlikler/sunucu-guvenligi-hardening) — Self-hosted altyapıda zero-trust güvenlik katmanları

## Gonet ile çalışmak

Gonet, self-hosted PaaS kurulumunu 3-5 iş günü içinde teslim eder: sunucu provizyon, Coolify yapılandırma, ilk uygulamanızın deploy'u, monitoring setup ve 2 saatlik ekip eğitimi dahil. Sonrasında aylık managed destek veya tamamen sizin yönetiminize bırakma seçenekleri sunuyoruz. Mevcut Vercel/Netlify projelerinizi sıfır downtime ile migrate edebiliriz. [İletişime geçin](/iletisim) — altyapı maliyetlerinizi %80-90 düşürme senaryonuzu birlikte hesaplayalım.
