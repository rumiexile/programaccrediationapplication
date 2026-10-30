# YÖKAK — Program Akreditasyon Raporu Web Formu

**Program Akreditasyon Raporu Şablonu (Taslak 0.1)** belgesinin web formu
karşılığı. YÖKAK program akreditasyon ölçütleri ve TYÇ Yeterlilik Tür
Belirleyicisi esas alınmıştır. Tasarım dili
[theqcagencyapplication](https://github.com/rumiexile/theqcagencyapplication)
projesiyle ortaktır (aynı token, cam yüzey ve bileşen katmanı).

Kurulum, derleme adımı ve sunucu gerektirmez.

## Hızlı başlangıç

`index.html` dosyasını tarayıcıda açın ya da:

```bash
python3 -m http.server 8000
```

Tek dosyalık sürüm: [`dist/program-akreditasyon-raporu.html`](dist/program-akreditasyon-raporu.html)
(çift tıklayınca açılır, internet gerektirmez).

```bash
python3 tools/bundle.py dist/program-akreditasyon-raporu.html
```

## Form yapısı

Sekmeler doldurma sırasına göre dizilmiştir; önizleme ve Word çıktısı
şablondaki özgün bölüm sırasını (Kapak, 1–7) korur.

| Sekme | Şablon bölümü | Dolduran |
| --- | --- | --- |
| Künye | Kapak sayfası | Kurum / akreditasyon kuruluşu |
| Biçimsel İnceleme | Bölüm 2 (2.1–2.12) | Akreditasyon kuruluşu |
| Program Ölçütleri | Bölüm 3 (3.0, 9 ana ölçüt, 57 alt ölçüt) | Değerlendirme takımı |
| Süreç ve Veriler | Bölüm 4–5 | Kuruluş / kurum |
| Sonuçların Özeti | Bölüm 1 | Kuruluş / takım |
| Rapor | Bölüm 6–7, önizleme | — |

## Otomatik karar önerileri (Bölüm 6)

- **Ana ölçüt:** karşılanan alt ölçüt oranı ≥ %90 uyumlu, %30–90 kısmen
  uyumlu, < %30 uyumsuz. Zorunlu alt ölçüt karşılanmıyorsa uyumsuz.
  "Kapsam dışı" alt ölçütler paydaya girmez. Takım her ana ölçütte öneriyi
  bütüncül kararla geçersiz kılabilir.
- **Akreditasyon:** tüm ana ölçütler uyumlu ya da en fazla üçü kısmen
  uyumlu → akreditasyon; uyumsuz ana ölçüt ya da üçten fazla kısmi uyum →
  ret.
- **Biçimsel inceleme (1.3):** Bölüm 2 kararlarından özetlenir.

Ana ölçüt 2–9'daki alt ölçütlerin zorunluluğu şablon taslağında
belirlenmemiştir (☐ Evet ☐ Hayır); formda takım tarafından işaretlenir.

## Veri ve çıktılar

- Veri tarayıcının `localStorage` alanına otomatik kaydedilir.
- **Dışa / içe aktar:** JSON (`_meta.format: "YOKAK-Program-Accreditation-Report"`).
- **Word:** rapor `.doc` olarak indirilir (Word ile açılır).
- **Yazdır / PDF:** önizleme sayfasında yalnızca rapor kâğıdı basılır.

## Dosyalar

```
assets/data/criteria.js   Bölüm 3 ölçütleri (otomatik üretilir)
assets/data/template.js   Bölüm 2, TYÇ kazanımları, veri sayfası, kurallar, sözlük
assets/js/schema.js       Sekme → adım → alan şeması
assets/js/fields.js       Alan bileşenleri (alt ölçüt kartı, matrisler, kanıt listesi)
assets/js/rules.js        Karar kuralları
assets/js/report.js       Önizleme ve Word çıktısı
assets/js/app.js          Gezinme, ilerleme, kenar çubuğu
assets/css/report.css     Forma özgü bileşen stilleri
```

Şablondaki ölçütler değişirse:

```bash
pandoc sablon.docx -t plain --wrap=none -o sablon.txt
python3 tools/parse_criteria.py sablon.txt assets/data/criteria.js
```
