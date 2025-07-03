# Quiz App - Kişisel Soru-Cevap Testi

Bu proje Next.js (App Router) kullanılarak geliştirilmiş eğlenceli bir soru-cevap testi uygulamasıdır.

## 🎮 Özellikler

- 20 soruluk çoktan seçmeli test
- Kişiselleştirilmiş avatar maskot
- **Platform Tabanlı Oyun Mekaniği:**
  - 12 platform arası zıplama sistemi
  - Her doğru cevapta bir platform ilerleme
  - Platformlar arası boşluklarda lav havuzları
  - Doğru cevap → Maskot zıplayarak bir sonraki platforma geçer
  - Yanlış cevap → Maskot lav havuzuna düşer ve Game Over
- **Şiddetli Lav Sistemi:**
  - Platformların altında ana lav katmanı (120px derinlik)
  - Gap'lerde güçlendirilmiş lav havuzları
  - Çoklu lav animasyonları (akış, kabarcıklar, parıltı efektleri)
- **Gelişmiş Animasyonlar:**
  - Gerçekçi zıplama fiziği (squash & stretch efekti)
  - Dramatik lav düşme animasyonu (dönme ve küçülme efekti)
  - Lav parıltıları ve akış efektleri
  - Yumuşak geçiş animasyonları
- Progress bar ile ilerleme takibi
- Responsive tasarım
- Türkçe arayüz

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 📁 Proje Yapısı

```
Quiz/
├── app/
│   ├── layout.tsx          # Ana layout component
│   ├── page.tsx           # Ana sayfa
│   └── globals.css        # Global CSS stilleri
├── components/
│   └── TestPage.tsx       # Quiz ana component
├── data/
│   └── questions.ts       # Soru veritabanı
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🎯 Oyun Kuralları

1. Her soru için 4 şık bulunur (A, B, C, D)
2. Doğru cevap verirseniz karakter ileriye koşar ve sonraki soruya geçilir
3. Yanlış cevap verirseniz karakter lava düşer ve oyun biter
4. Tüm 20 soruyu doğru cevaplayarak oyunu tamamlayabilirsiniz
5. Game Over durumunda tekrar deneyebilirsiniz

## 🛠️ Geliştirme Notları

- Maskot için `public/avatar.png` dosyası kullanılmaktadır
- Platform tabanlı zıplama sistemi CSS animasyonlarla implement edilmiştir
- **12 Platform Sistemi:** Her doğru cevapta bir platform ilerleme
- **Şiddetli Lav Sistemi:** 
  - Ana lav katmanı: 120px derinlikte, platformların altında
  - Gap lavları: 145px yükseklikte, platform seviyesinden ana lava kadar
  - Çoklu animasyon katmanları (akış, kabarcık, parıltı)
- Sorular `data/questions.ts` dosyasında statik array olarak tutulmaktadır
- **Gelişmiş CSS Animasyon Sistemi:**
  - `jumpToPlatform`: Squash & stretch efektiyle zıplama
  - `fallToLava`: Şiddetli dönerek lav katmanına gömülme (145px → -120px)
  - `mainLavaFlow` & `mainLavaBubbles`: Ana lav katmanı efektleri
  - `intenseLavaFlow` & `intenseGapBubbles`: Gap lav efektleri
- Platform pozisyonları CSS class'larıyla kontrol edilir (`platform-1` to `platform-12`)

## 📦 Bağımlılıklar

- Next.js 14.2.5
- React 18
- TypeScript 5
- CSS Animations

## 🔧 Scripts

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build
npm run start    # Production sunucusu
npm run lint     # ESLint kontrolü
``` 