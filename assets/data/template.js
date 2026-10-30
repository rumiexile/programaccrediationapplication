/* ==========================================================================
   Şablon verisi — Program Akreditasyon Raporu Şablonu (Taslak 0.1)
   --------------------------------------------------------------------------
   Bölüm 3 dışındaki tüm sabit metinler burada durur: biçimsel inceleme
   ölçütleri (Bölüm 2), TYÇ öğrenme kazanımları, anahtar yetkinlikler,
   veri sayfası göstergeleri, karar kuralları ve sözlük.
   Bölüm 3 ölçütleri için bkz. assets/data/criteria.js (otomatik üretilir).
   ========================================================================== */

window.TEMPLATE = (function () {
  "use strict";

  /* Lisans Diploması Yeterlilik Tür Belirleyicisi öğrenme kazanımları */
  var tycOutcomesLisans = [
    "Bir iş veya öğrenme alanına ilişkin teori ve ilkeleri eleştirel bir yaklaşımla sorgulayabilecek ileri düzeyde kuramsal ve uygulamalı bilgiye sahiptir.",
    "Bir iş veya öğrenme alanında karmaşık, öngörülmeyen sorunları çözmede ileri düzeyde yenilikçi uzmanlık becerilerine sahiptir.",
    "Bir iş veya öğrenme alanındaki sorunlara ilişkin verileri analiz eder ve kanıta dayalı çözüm önerileri geliştirir.",
    "Alanıyla ilgili karmaşık mesleki ve teknik çalışmaları yönetir, uygulamada ortaya çıkabilecek sorunları çözmede ekip üyesi olarak sorumluluk alır, ekip üyelerinin mesleki gelişim ihtiyaçlarını belirler.",
    "Alanında sahip olduğu bilgi ve becerileri eleştirel bir yaklaşımla değerlendirir, öğrenme gereksinimlerini belirler ve bunları karşılamaya yönelik hayat boyu öğrenme anlayışına sahiptir.",
    "Anadilinde yazılı ve sözlü olarak etkili iletişim kurar ve bir yabancı dili en az Avrupa Dil Portföyü B1 Genel Düzeyinde kullanır.",
    "Alanına özgü bilişim teknolojilerini en az Avrupa Bilgisayar Kullanma Lisansı ileri düzeyinde kullanır.",
    "Alanıyla ilgili konularda düşüncelerini ve sorunlara ilişkin çözüm önerilerini nicel ve nitel verilerle destekleyerek yazılı ya da sözlü olarak alanda uzman veya uzman olmayan gruplarla paylaşır.",
    "Alanıyla ilgili verilerin toplanması, analiz edilmesi ve sonuçlarının duyurulması aşamalarında bilimsel, toplumsal ve etik ilke ve değerlere uygun davranır.",
    "Toplumsal sorumluluk bilinciyle yaşadığı sosyal çevre için diğer meslek grupları ile işbirliği içinde proje ve etkinlikler düzenler ve uygular.",
    "Temel insan hakları, kültürel ve evrensel değerler, sosyal adalet ve çevre konularında toplumun bilinçlenmesi için sorumluluk alır.",
    "Sağlıklı yaşam için gerekli tutum ve davranışlarına sahiptir.",
    "Ülkesinin sahip olduğu ve içinde yaşadığı toplumun itibar ettiği değerleri benimseyerek sosyal ilişkilerini düzenler.",
    "Ülkesinin stratejik önceliklerini göz önünde tutarak sosyal ve ekonomik sorunlara çözüm getirecek ileri düzeyde bilgi, beceri, tutum ve davranışlara sahiptir.",
    "Tutum ve davranışlarında toplumun örf ve adetlerini, kendine özgü özelliklerini ve milli kültürünü önceler.",
  ];

  var keyCompetences = [
    "Okuma yazma yetkinliği",
    "Çoklu dil yetkinliği",
    "Matematiksel yetkinlik ve bilim, teknoloji ve mühendislikte yetkinlik",
    "Dijital yetkinlik",
    "Kişisel, sosyal ve öğrenmeyi öğrenme yetkinliği",
    "Vatandaşlık yetkinliği",
    "Girişimcilik yetkinliği",
    "Kültürel farkındalık ve ifade yetkinliği",
  ];

  /* Bölüm 2 — Biçimsel inceleme ölçütleri.
     tyc: "TYÇ değeri / Programdaki durum" tablosu varsa yönlendirici metin. */
  var formal = [
    {
      code: "2.1",
      title: "Yeterlilik türü, seviye, yönelim ve kategori",
      tyc: "Yeterlilik türü · TYÇ / AYÇ seviyesi · Yönelim · Kategori",
      evidence: ["Diploma eki örneği", "Program açma onayı ve senato kararı", "Program bilgi paketi"],
    },
    {
      code: "2.2",
      title: "Sınıflandırma (ISCED-F 2013, ISCO)",
      tyc: "ISCED-F 2013 · ISCO",
      evidence: ["Program bilgi paketi", "YÖKSİS program kaydı"],
    },
    {
      code: "2.3",
      title: "Normal öğrenim süresi ve kredi",
      tyc: "Süre · Kredi (AKTS) — ör. Lisans Diploması: 4 yıl, 240 AKTS",
      evidence: [
        "Eğitim-öğretim ve sınav yönetmeliği",
        "Öğretim planı ve AKTS iş yükü hesapları",
        "Program bilgi paketi",
      ],
      note:
        "Azami öğrenim süresi (2547 sayılı Kanun md. 44/c) ve özel durumlar (ör. tıp 360, diş hekimliği / eczacılık / veteriner 300 AKTS) dikkate alınır.",
    },
    {
      code: "2.4",
      title: "Program profili ve öğrenme ortamı",
      tyc: "Program profili ve öğrenme ortamı tanımı (tür belirleyiciden)",
      evidence: ["Öğretim planı", "Staj / işyeri eğitimi yönergesi", "Uzaktan öğretim usul ve esasları (varsa)"],
    },
    {
      code: "2.5",
      title: "Program öğrenme çıktılarının TYÇ öğrenme kazanımlarıyla ilişkilendirilmesi",
      evidence: ["Program öğrenme çıktıları listesi", "PÇ – TYÇ eşleştirme matrisi", "Ders – PÇ matrisi"],
      matrix: "tyc",
    },
    {
      code: "2.6",
      title: "Anahtar yetkinlikler",
      evidence: ["PÇ – anahtar yetkinlik eşleştirmesi", "Seçmeli ders havuzu ve ortak dersler"],
      matrix: "key",
    },
    {
      code: "2.7",
      title: "Ölçme ve değerlendirme esasları",
      evidence: [
        "Senato onaylı eğitim-öğretim ve sınav yönetmeliği",
        "Not dönüşüm tablosu",
        "Ders bilgi paketlerinde ölçme yöntemleri ve katkı oranları",
      ],
    },
    {
      code: "2.8",
      title: "Giriş şartları",
      tyc: "Tür belirleyicideki giriş şartları (ör. YKS, özel yetenek sınavı, DGS)",
      evidence: ["ÖSYM kılavuzu kaydı", "Özel yetenek sınavı yönergesi (varsa)", "Kabul koşulları duyurusu"],
    },
    {
      code: "2.9",
      title: "Yeterliliği kazanma şartları ve belgelendirme",
      tyc: "Ör. asgari 240 AKTS ve kurumun belirlediği diğer yükümlülükler",
      evidence: ["Mezuniyet koşulları", "Diploma ve diploma eki örneği (Türkçe / İngilizce)"],
    },
    {
      code: "2.10",
      title: "İlerleme imkânları, geçişler ve tanınma",
      evidence: [
        "Yatay / dikey geçiş yönetmelikleri",
        "Çift anadal ve yan dal yönergeleri",
        "Önceki öğrenmelerin tanınması ve kredi transferi esasları",
      ],
    },
    {
      code: "2.11",
      title: "Yasal dayanak ve onaylar",
      evidence: [
        "YÖK program açma onayı",
        "İlgili senato ve yönetim kurulu kararları",
        "Ulusal Çekirdek Eğitim Programı veya meslek düzenlemesi (varsa)",
      ],
    },
    {
      code: "2.12",
      title: "Uygulanabilirse: ortak programlar ve işbirlikleri",
      optional: true,
      evidence: [
        "Ortak program protokolü",
        "Yükseköğretim dışı kurumla işbirliği protokolü (her iki tarafça imzalı olup olmadığı belirtilerek)",
      ],
    },
  ];

  /* 5.1 Program verileri — son üç eğitim-öğretim yılı */
  var dataIndicators = [
    { id: "quota", label: "Kontenjan" },
    { id: "newEnrol", label: "Yeni kayıt sayısı" },
    { id: "students", label: "Toplam öğrenci sayısı" },
    { id: "graduates", label: "Mezun sayısı" },
    { id: "onTime", label: "Normal sürede mezuniyet oranı (%)" },
    { id: "duration", label: "Ortalama mezuniyet süresi (yarıyıl)" },
    { id: "staff", label: "Tam zamanlı öğretim elemanı sayısı" },
    { id: "ratio", label: "Öğrenci / öğretim elemanı oranı" },
    { id: "exchange", label: "Giden / gelen değişim öğrencisi sayısı", text: true },
    { id: "employment", label: "Mezun istihdam oranı (%) (varsa)" },
  ];

  var legalBasis = [
    "2547 sayılı Yükseköğretim Kanunu, Ek Madde 35",
    "Yükseköğretim Kalite Güvencesi ve Yükseköğretim Kalite Kurulu Yönetmeliği",
    "Türkiye Yeterlilikler Çerçevesi ve ilgili Yeterlilik Tür Belirleyicisi",
  ];

  var rules = [
    { level: "Gösterge", rule: "Var / yok olarak işaretlenir." },
    {
      level: "Alt ölçüt",
      rule:
        "Karşılanıyor / karşılanmıyor olarak karar verilir. Bazı alt ölçütler zorunludur; bazıları programa göre kapsam dışı bırakılabilir.",
    },
    {
      level: "Ana ölçüt",
      rule:
        "Alt ölçüt kararlarına dayanılarak bütüncül biçimde uyumlu / kısmen uyumlu / uyumsuz olarak belirlenir. Yol gösterici oranlar: karşılanan alt ölçüt oranı %90 ve üzeri uyumlu, %30–90 arası kısmen uyumlu, %30’un altı uyumsuz. Zorunlu bir alt ölçüt karşılanmıyorsa ana ölçüt uyumsuz sayılır.",
    },
    {
      level: "Akreditasyon kararı",
      rule:
        "Akreditasyon ya da akreditasyonun reddi. Akreditasyon için tüm ana ölçütlerin uyumlu olması ya da en fazla üç ana ölçütte kısmi uyum, diğerlerinde tam uyum bulunması gerekir. Üçten fazla ana ölçütte kısmi uyum varsa akreditasyon reddedilir.",
    },
  ];

  var glossary = [
    ["Akreditasyon raporu", "Akreditasyon kuruluşunun biçimsel inceleme raporu (Bölüm 2) ile değerlendirme takımı raporundan (Bölüm 3) oluşan rapor."],
    ["Biçimsel inceleme raporu", "Programın TYÇ yeterlilik türüne uygunluğunu değerlendiren, akreditasyon kuruluşunca hazırlanan bölüm."],
    ["Değerlendirme takımı raporu", "Programın YÖKAK program akreditasyon ölçütlerini karşılama durumunu değerlendiren, değerlendirme takımınca hazırlanan bölüm."],
    ["Gösterge", "Alt ölçütün karşılanıp karşılanmadığını belirlemeye yarayan, var / yok olarak işaretlenen ifade."],
    ["Zorunlu alt ölçüt", "Karşılanmaması durumunda ilgili ana ölçütün uyumsuz sayıldığı alt ölçüt."],
    ["TYÇ", "Türkiye Yeterlilikler Çerçevesi."],
    ["AYÇ", "Avrupa Yeterlilikler Çerçevesi."],
    ["ISCED-F 2013", "UNESCO Uluslararası Standart Eğitim Sınıflandırması – Eğitim ve Öğretim Alanları."],
    ["ISCO", "Uluslararası Standart Meslek Sınıflandırması."],
    ["AKTS", "Avrupa Kredi Transfer Sistemi."],
    ["PÇ", "Program öğrenme çıktısı."],
    ["Yeniden akreditasyon", "Önceki bir akreditasyonun ardından yapılan akreditasyon."],
  ];

  return {
    version: "Taslak 0.1",
    tycOutcomesLisans: tycOutcomesLisans,
    keyCompetences: keyCompetences,
    formal: formal,
    dataIndicators: dataIndicators,
    legalBasis: legalBasis,
    rules: rules,
    glossary: glossary,
  };
})();
