/* ==========================================================================
   Rapor şeması — sekme → adım → alan
   --------------------------------------------------------------------------
   Program Akreditasyon Raporu Şablonu'nun (Taslak 0.1) web formu karşılığı.
   Sekmeler doldurma sırasına göre dizilmiştir; Bölüm 1 (Sonuçların özeti)
   Bölüm 2 ve 3'ten beslendiği için sona alınmıştır. Önizleme ve Word çıktısı
   ise şablondaki özgün bölüm sırasını korur.
   ========================================================================== */

window.SCHEMA = (function () {
  "use strict";

  var T = window.TEMPLATE;
  var C = window.CRITERIA;
  var key = window.Rules.key;

  var BY = {
    kurum: "Kurum",
    kurulus: "Akreditasyon kuruluşu",
    takim: "Değerlendirme takımı",
  };

  /* ---------------------------------------------------------------- */
  /* Bölüm 2 — biçimsel inceleme adımı                                 */
  /* ---------------------------------------------------------------- */
  function formalStep(item) {
    var k = "formal." + key(item.code);
    var fields = [];

    if (item.tyc) fields.push({ type: "compare", id: k, tyc: item.tyc });

    fields.push({
      type: "evidence",
      id: k + ".evidence",
      kinds: "formal",
      label: "Kanıtlar",
      hint: "Değerlendirmede hangi belgelere, hangi sürümleriyle (taslak / yürürlükte) atıf yapılmıştır?",
      examples: item.evidence,
      required: !item.optional,
    });

    if (item.note) fields.push({ type: "info", tone: "info", text: item.note });

    if (item.matrix === "tyc") {
      fields.push({
        type: "matrix",
        id: k + ".matrix",
        label: "Eşleştirme matrisi",
        hint: "Tabloda Lisans Diploması tür belirleyicisinin kazanımları yer alır. Lisans dışındaki yeterlilik türlerinde ilgili tür belirleyicinin öğrenme kazanımlarını satır olarak ekleyiniz.",
        rows: T.tycOutcomesLisans,
        rowLabel: "TYÇ yeterlilik türü öğrenme kazanımı",
        linkLabel: "İlişkili PÇ",
        linkPlaceholder: "ör. PÇ1, PÇ4",
        allowExtra: true,
        noOptional: true,
      });
    }
    if (item.matrix === "key") {
      fields.push({
        type: "matrix",
        id: k + ".matrix",
        label: "Anahtar yetkinlikler (TYÇ)",
        rows: T.keyCompetences,
        rowLabel: "Anahtar yetkinlik",
        linkLabel: "İlişkili PÇ / dersler",
        linkPlaceholder: "ör. PÇ2 · TDL101",
        noOptional: true,
      });
    }

    fields.push(
      {
        type: "textarea",
        id: k + ".status",
        label: "Durum / Değerlendirme",
        hint: "Öz değerlendirme raporundan birebir alınan ifadeler tırnak içinde ve kaynağıyla belirtilir.",
        required: !item.optional,
        large: true,
      },
      {
        type: "radio",
        id: k + ".decision",
        label: "Karar önerisi",
        required: true,
        options: [
          { value: "yes", label: "Ölçüt karşılanmıştır", tone: "success" },
          { value: "no", label: "Ölçüt karşılanmamıştır", tone: "danger" },
        ].concat(item.optional ? [{ value: "na", label: "Uygulanamaz", tone: "neutral" }] : []),
      },
      {
        type: "textarea",
        id: k + ".remedy",
        label: "Gerekçe ve önerilen giderme yolu",
        hint: "Karşılanmıyorsa: gerekçe ve kurumla görüşüldükten sonra önerilen giderme yolu.",
        required: true,
        rows: 4,
        showIf: { field: k + ".decision", eq: "no" },
      }
    );

    return {
      id: "f" + key(item.code),
      title: item.code + " " + item.title,
      short: item.code + " " + item.title,
      by: BY.kurulus,
      fields: fields,
    };
  }

  /* ---------------------------------------------------------------- */
  /* Bölüm 3 — ana ölçüt adımı                                         */
  /* ---------------------------------------------------------------- */
  function criterionStep(crit) {
    var fields = crit.subs.map(function (sub) {
      return { type: "subcrit", sub: sub };
    });
    fields.push({ type: "main-result", crit: crit });
    return {
      id: "c" + crit.no,
      title: "Ana ölçüt " + crit.no + ". " + crit.title,
      short: crit.no + ". " + crit.title,
      by: BY.takim,
      criterion: crit,
      desc:
        "Her alt ölçüt için göstergeleri “var / yok” olarak işaretleyin, kanıtları ve değerlendirmeyi yazın, alt ölçüt kararını verin. Ana ölçüt sonucu alt ölçüt kararlarından önerilir; bütüncül kararı sayfanın sonunda verirsiniz.",
      fields: fields,
    };
  }

  /* ---------------------------------------------------------------- */
  /* SEKMELER                                                          */
  /* ---------------------------------------------------------------- */
  var tabs = [
    /* ======================= KÜNYE (KAPAK) ========================== */
    {
      id: "cover",
      label: "Künye",
      sublabel: "Kapak sayfası",
      steps: [
        {
          id: "k-program",
          title: "Kurum ve program",
          short: "Kurum ve program",
          by: BY.kurum,
          desc: "Raporun kapak sayfasında yer alacak kurum ve program bilgileri.",
          fields: [
            { type: "text", id: "cover.institution", label: "Yükseköğretim kurumu", required: true, placeholder: "ör. … Üniversitesi" },
            { type: "text", id: "cover.unit", label: "Birim (fakülte / yüksekokul / MYO)", required: true },
            { type: "text", id: "cover.programName", label: "Program adı", required: true, hint: "Ad / unvan; varsa önceki ad değişiklikleri dahil." },
            { type: "text", id: "cover.degreeTitle", label: "Diploma / derece unvanı", required: true, half: true },
            { type: "text", id: "cover.awardingBody", label: "Yeterliliği veren kuruluş (sorumlu kurum)", required: true, half: true },
          ],
        },
        {
          id: "k-qual",
          title: "Yeterlilik ve sınıflandırma",
          short: "Yeterlilik ve sınıflandırma",
          by: BY.kurum,
          fields: [
            {
              type: "radio",
              id: "cover.qualType",
              label: "Yeterlilik türü",
              hint: "TYÇ Yeterlilik Tür Belirleyicisi",
              required: true,
              options: [
                { value: "onlisans", label: "Önlisans Diploması" },
                { value: "lisans", label: "Lisans Diploması" },
                { value: "yukseklisans", label: "Yüksek Lisans Diploması" },
                { value: "doktora", label: "Doktora Diploması" },
                { value: "sanatta", label: "Sanatta Yeterlik" },
                { value: "diger", label: "Diğer" },
              ],
              extras: [{ when: "diger", id: "cover.qualTypeOther", label: "Diğer", placeholder: "Yeterlilik türünü yazınız" }],
            },
            {
              type: "radio",
              id: "cover.orientation",
              label: "Yönelim",
              required: true,
              options: [
                { value: "genel", label: "Genel" },
                { value: "akademik", label: "Akademik" },
                { value: "mesleki", label: "Meslekî" },
              ],
            },
            {
              type: "radio",
              id: "cover.category",
              label: "Kategori",
              required: true,
              options: [
                { value: "ana", label: "Ana" },
                { value: "destekleyici", label: "Destekleyici" },
                { value: "birim", label: "Birim" },
                { value: "ozel", label: "Özel amaçlı" },
              ],
            },
            { type: "heading", text: "Seviye" },
            { type: "text", id: "cover.levelTyc", label: "TYÇ seviyesi", required: true, half: true, placeholder: "ör. 6" },
            { type: "text", id: "cover.levelAyc", label: "AYÇ seviyesi", required: true, half: true, placeholder: "ör. 6" },
            { type: "text", id: "cover.levelQf", label: "QF-EHEA döngüsü", required: true, half: true, placeholder: "ör. 1. döngü" },
            { type: "heading", text: "Sınıflandırma" },
            { type: "text", id: "cover.isced", label: "ISCED-F 2013 alan kodu", required: true, half: true, placeholder: "ör. 0613" },
            {
              type: "text",
              id: "cover.isco",
              label: "ISCO kodu",
              half: true,
              placeholder: "ör. 2512",
              hint: "Yönelimi meslekî olan programlar için.",
              required: true,
              showIf: { field: "cover.orientation", eq: "mesleki" },
            },
          ],
        },
        {
          id: "k-delivery",
          title: "Süre, kredi ve öğretim",
          short: "Süre, kredi ve öğretim",
          by: BY.kurum,
          fields: [
            { type: "number", id: "cover.durationYears", label: "Normal öğrenim süresi", suffix: "yıl", required: true, half: true, min: 0 },
            { type: "number", id: "cover.durationSemesters", label: "Normal öğrenim süresi", suffix: "yarıyıl", required: true, half: true, min: 0 },
            { type: "number", id: "cover.ects", label: "Toplam AKTS", required: true, half: true, min: 0, suffix: "AKTS" },
            {
              type: "checkboxes",
              id: "cover.delivery",
              label: "Öğretim türü ve öğrenme ortamı",
              hint: "Programa uyan tüm seçenekleri işaretleyiniz.",
              required: true,
              options: [
                { value: "orgun", label: "Örgün öğretim" },
                { value: "ikinci", label: "İkinci öğretim" },
                { value: "uzaktan", label: "Uzaktan öğretim" },
                { value: "acik", label: "Açık öğretim" },
                { value: "karma", label: "Karma (hibrit)" },
                { value: "staj", label: "Staj / işyeri eğitimi" },
                { value: "uygulamali", label: "Uygulamalı eğitim (ör. 3+1, 7+1)" },
                { value: "klinik", label: "Klinik / saha uygulaması" },
                { value: "uluslararasi", label: "Uluslararası ortak program" },
                { value: "cift", label: "Çift diploma" },
                { value: "yurtici", label: "Yurt içi ortak program" },
                { value: "isbirligi", label: "Yükseköğretim dışı kurumla işbirliği" },
              ],
            },
            {
              type: "radio",
              id: "cover.language",
              label: "Öğretim dili",
              required: true,
              options: [
                { value: "tr", label: "Türkçe" },
                { value: "y30", label: "%30 yabancı dil" },
                { value: "y100", label: "Tamamen yabancı dil" },
              ],
              extras: [
                { when: "y30", id: "cover.languageName", label: "Dil", placeholder: "ör. İngilizce" },
                { when: "y100", id: "cover.languageName", label: "Dil", placeholder: "ör. İngilizce" },
              ],
            },
          ],
        },
        {
          id: "k-intake",
          title: "Giriş şartları ve öğrenci sayıları",
          short: "Giriş ve öğrenci sayıları",
          by: BY.kurum,
          fields: [
            {
              type: "checkboxes",
              id: "cover.entry",
              label: "Giriş şartları",
              required: true,
              options: [
                { value: "yks", label: "YKS" },
                { value: "ozel", label: "Özel yetenek sınavı" },
                { value: "dgs", label: "DGS" },
                { value: "lisansustu", label: "Lisansüstü giriş (ALES/YDS vb.)" },
                { value: "diger", label: "Diğer" },
              ],
              extras: [
                { when: "yks", id: "cover.entryScore", label: "YKS puan türü", placeholder: "ör. SAY" },
                { when: "diger", id: "cover.entryOther", label: "Diğer", placeholder: "Giriş şartını yazınız" },
              ],
            },
            {
              type: "checkboxes",
              id: "cover.masters",
              label: "Yüksek lisans programları için",
              required: true,
              options: [
                { value: "tezli", label: "Tezli" },
                { value: "tezsiz", label: "Tezsiz" },
                { value: "uzaktan", label: "Uzaktan öğretim tezsiz" },
              ],
              showIf: { field: "cover.qualType", eq: "yukseklisans" },
            },
            { type: "date", id: "cover.firstIntake", label: "İlk öğrenci alım tarihi", required: true, half: true },
            { type: "number", id: "cover.quota", label: "Kontenjan (yıllık)", required: true, half: true, min: 0 },
            { type: "number", id: "cover.avgEnrol", label: "Ortalama yeni kayıt sayısı", suffix: "/ yıl", required: true, half: true, min: 0 },
            { type: "number", id: "cover.avgGrad", label: "Ortalama mezun sayısı", suffix: "/ yıl", required: true, half: true, min: 0 },
            { type: "text", id: "data.refPeriod", label: "Ortalamalar için referans dönemi", required: true, placeholder: "ör. 2023-2024 – 2025-2026", hint: "Bölüm 5.1 ile aynı alandır." },
          ],
        },
        {
          id: "k-accr",
          title: "Akreditasyon bilgileri",
          short: "Akreditasyon bilgileri",
          by: BY.kurulus,
          fields: [
            {
              type: "radio",
              id: "accr.type",
              label: "Akreditasyon türü",
              required: true,
              options: [
                { value: "ilk", label: "İlk akreditasyon" },
                { value: "yeniden", label: "Yeniden akreditasyon" },
                { value: "mezunsuz", label: "Henüz mezun vermemiş program" },
              ],
              extras: [{ when: "yeniden", id: "accr.reaccrNo", label: "Kaçıncı", placeholder: "ör. 2" }],
            },
            { type: "text", id: "accr.agency", label: "Sorumlu akreditasyon kuruluşu", required: true, half: true },
            { type: "text", id: "accr.rapporteur", label: "Kuruluş raportörü / sorumlu uzman", required: true, half: true },
            { type: "date", id: "accr.reportDate", label: "Rapor tarihi", required: true, half: true },
          ],
        },
      ],
    },

    /* =================== BÖLÜM 2 — BİÇİMSEL İNCELEME ================= */
    {
      id: "formal",
      label: "Biçimsel İnceleme",
      sublabel: "Bölüm 2",
      intro:
        "Bu bölüm akreditasyon kuruluşu tarafından doldurulur. Program, Türkiye Yeterlilikler Çerçevesi'ndeki (TYÇ) ilgili Yeterlilik Tür Belirleyicisinin alanlarıyla karşılaştırılır.",
      steps: T.formal.map(formalStep),
    },

    /* ==================== BÖLÜM 3 — ÖLÇÜTLER ======================== */
    {
      id: "criteria",
      label: "Program Ölçütleri",
      sublabel: "Bölüm 3",
      intro:
        "Bu bölüm değerlendirme takımı tarafından doldurulur. Her alt ölçüt için göstergeler “var / yok” olarak işaretlenir, alt ölçüt kararı “karşılanıyor / karşılanmıyor” olarak verilir; ana ölçüt sonucu bütüncül olarak belirlenir.",
      steps: [
        {
          id: "c0",
          title: "3.0 Değerlendirmenin odak noktaları / kalite gelişimi",
          short: "3.0 Odak noktaları",
          by: BY.takim,
          fields: [
            {
              type: "info",
              title: "Bu bölümde ele alınacak konular",
              bullets: [
                "Akreditasyon dönemindeki gelişim ve önceki değerlendirmelerdeki önerilerin ele alınışı",
                "Değerlendirmede öne çıkan konular",
                "Süreç içinde yapılan değişiklikler ve iyileştirmeler (içeriğe ilişkin)",
              ],
            },
            { type: "textarea", id: "s3.focus", label: "Odak noktaları ve kalite gelişimi", required: true, large: true, rows: 10 },
          ],
        },
      ].concat(C.map(criterionStep)),
    },

    /* ================= BÖLÜM 4–5 — SÜREÇ VE VERİLER ================== */
    {
      id: "process",
      label: "Süreç ve Veriler",
      sublabel: "Bölüm 4–5",
      steps: [
        {
          id: "p-general",
          title: "4.1 Genel bilgiler",
          short: "4.1 Genel bilgiler",
          by: BY.kurulus,
          fields: [
            {
              type: "info",
              title: "Varsa sürece ilişkin özel durumlar, örneğin:",
              bullets: [
                "Öğrenci temsilcilerinin öz değerlendirme raporunun hazırlanmasına nasıl katıldığı",
                "Yerinde ziyaret yapılmadıysa gerekçesi",
                "Mesleki yeterlilik / meslek düzenlemesine ilişkin bir değerlendirmeyle birlikte yürütülen süreçler",
                "Şablondan gerekçeli sapmalar (ör. sürece özgü bir bölüm eklenmesi)",
                "Olağan süreyi aşan değerlendirme sürelerinin gerekçesi",
                "Alana özgü referans sistemlerine (ör. ulusal çekirdek eğitim programları, uluslararası alan standartları) yapılan atıflar",
                "Süreç içinde yapılan değişiklikler",
                "Karşı oylar ve bunların yer aldığı bölüm",
              ],
            },
            { type: "textarea", id: "process.general", label: "Sürece ilişkin genel bilgiler", large: true, rows: 9 },
          ],
        },
        {
          id: "p-legal",
          title: "4.2 Yasal dayanak",
          short: "4.2 Yasal dayanak",
          by: BY.kurulus,
          fields: [
            { type: "info", tone: "info", title: "Ortak yasal dayanak", bullets: T.legalBasis },
            { type: "textarea", id: "process.legalExtra", label: "Programa özgü ek düzenlemeler", rows: 4, placeholder: "ör. Tıp Fakültesi Ulusal Çekirdek Eğitim Programı (2023)" },
          ],
        },
        {
          id: "p-team",
          title: "4.3 Değerlendirme takımı",
          short: "4.3 Değerlendirme takımı",
          by: BY.kurulus,
          fields: [
            {
              type: "repeater",
              id: "process.team",
              label: "Takım üyeleri",
              required: true,
              itemLabel: "Üye",
              addLabel: "Üye ekle",
              emptyText: "Henüz takım üyesi eklenmedi.",
              itemFields: [
                {
                  id: "role",
                  type: "select",
                  label: "Rol",
                  options: [
                    { value: "a", label: "a) Öğretim üyesi (alanla yakın)" },
                    { value: "b", label: "b) Mesleki uygulama / işveren temsilcisi" },
                    { value: "c", label: "c) Öğrenci" },
                    { value: "d", label: "d) Düzenlenmiş programlar için ek uzman" },
                    { value: "e", label: "e) Kuruluş raportörü / koordinatör" },
                  ],
                },
                { id: "name", label: "Unvan, ad soyad", placeholder: "ör. Prof. Dr. …" },
                { id: "institution", label: "Kurum" },
                { id: "field", label: "Alan" },
              ],
            },
          ],
        },
        {
          id: "p-data",
          title: "5.1 Program verileri",
          short: "5.1 Program verileri",
          by: BY.kurum,
          desc: "Son üç eğitim-öğretim yılı için doldurulur. Göstergeler önerilmiştir; ortalama sütunu otomatik hesaplanır.",
          fields: [
            { type: "data-table", id: "data.values", label: "Program verileri", noOptional: true },
            { type: "text", id: "data.refPeriod", label: "Kapakta belirtilen ortalamalar için referans dönemi", required: true },
            { type: "textarea", id: "data.extra", label: "Programa göre eklenen diğer göstergeler", rows: 3 },
          ],
        },
        {
          id: "p-accr",
          title: "5.2 Akreditasyon verileri",
          short: "5.2 Akreditasyon verileri",
          by: BY.kurulus,
          fields: [
            { type: "date", id: "accrData.contract", label: "Kurum – akreditasyon kuruluşu sözleşme tarihi", required: true, half: true },
            { type: "date", id: "accrData.ser", label: "Öz değerlendirme raporunun teslim tarihi", required: true, half: true },
            { type: "date", id: "accrData.visit", label: "Yerinde ziyaret tarihi", required: true, half: true },
            { type: "text", id: "accrData.first", label: "İlk akreditasyon tarihi ve kuruluşu", half: true, showIf: { field: "accr.type", eq: "yeniden" } },
            {
              type: "repeater",
              id: "accrData.reaccr",
              label: "Yeniden akreditasyonlar",
              itemLabel: "Yeniden akreditasyon",
              addLabel: "Yeniden akreditasyon ekle",
              showIf: { field: "accr.type", eq: "yeniden" },
              itemFields: [
                { id: "date", type: "date", label: "Tarih" },
                { id: "agency", label: "Kuruluş" },
              ],
            },
            { type: "text", id: "accrData.extension", label: "Varsa süre uzatması" },
            { type: "textarea", id: "accrData.groups", label: "Görüşülen gruplar", required: true, rows: 3, placeholder: "ör. Üst yönetim, program yöneticileri, öğretim elemanları, öğrenciler, mezunlar, işverenler" },
            { type: "textarea", id: "accrData.facilities", label: "İncelenen fiziksel ve dijital olanaklar", rows: 3 },
          ],
        },
      ],
    },

    /* ================== BÖLÜM 1 — SONUÇLARIN ÖZETİ =================== */
    {
      id: "summary",
      label: "Sonuçların Özeti",
      sublabel: "Bölüm 1",
      steps: [
        {
          id: "s-profile",
          title: "1.1 Programın kısa profili",
          short: "1.1 Programın profili",
          by: BY.kurulus,
          fields: [
            {
              type: "info",
              title: "En fazla 0,75 sayfa; özellikle şu konuları içermelidir:",
              bullets: [
                "Programın kurum içindeki yeri; kurumun misyonu, vizyonu ve stratejik öncelikleriyle ilişkisi",
                "Program amaçları, mezun profili, program öğrenme çıktıları ve alan odakları",
                "TYÇ yeterlilik türü, seviyesi ve yönelimi",
                "Özellikler (ör. uygulamalı eğitim modeli, staj/işyeri eğitimi, ortak program, yabancı dilde öğretim)",
                "Öne çıkan öğretim yöntemleri ve hedef öğrenci grupları",
              ],
            },
            { type: "textarea", id: "summary.profile", label: "Programın kısa profili", required: true, large: true, rows: 10 },
          ],
        },
        {
          id: "s-quality",
          title: "1.2 Değerlendirme takımının özet kalite değerlendirmesi",
          short: "1.2 Özet kalite değerlendirmesi",
          by: BY.takim,
          fields: [
            {
              type: "info",
              title: "En fazla 0,75 sayfa; şu konulardaki değerlendirmeleri içermelidir:",
              bullets: [
                "Programın kalitesine ilişkin genel izlenim; değerlendirmenin özü",
                "Güçlü yönler ve gelişmeye açık alanlar",
                "Yeniden akreditasyonda: önceki dönemdeki gelişim ve önceki önerilerin ele alınışı",
                "Kurum içi iyi uygulama örnekleri",
                "Varsa akreditasyonun reddine ilişkin gerekçeler",
              ],
            },
            { type: "textarea", id: "summary.quality", label: "Özet kalite değerlendirmesi", required: true, large: true, rows: 10 },
          ],
        },
        {
          id: "s-formal",
          title: "1.3 Biçimsel inceleme raporuna göre kuruluşun karar önerisi",
          short: "1.3 Biçimsel karar önerisi",
          by: BY.kurulus,
          desc: "Bölüm 2'deki kararlardan otomatik özetlenir.",
          fields: [
            { type: "formal-summary" },
            {
              type: "repeater",
              id: "summary.formalDeficits",
              label: "Eksiklikler ve giderilme yolları",
              hint: "En az bir biçimsel ölçüt karşılanmıyorsa: kuruluş, kurumla görüştükten sonra eksiklikleri ve giderilme yollarını belirtir.",
              itemLabel: "Eksiklik",
              addLabel: "Eksiklik ekle",
              required: true,
              showIf: function () {
                return window.Rules.formal().notMet.length > 0;
              },
              itemFields: [
                {
                  id: "criterion",
                  type: "select",
                  label: "Ölçüt",
                  options: function () {
                    return T.formal.map(function (f) {
                      return { value: f.code, label: f.code + " " + f.title };
                    });
                  },
                },
                { id: "text", type: "textarea", label: "Eksiklik ve giderilme yolu", wide: true },
              ],
            },
            {
              type: "checkboxes",
              id: "summary.formalReject",
              label: "Ciddi eksiklik",
              options: [{ value: "yes", label: "Biçimsel ölçütlerde ciddi eksiklik tespit edilmiştir: kuruluş, akreditasyonun reddini önerir.", tone: "danger" }],
              stack: true,
              showIf: function () {
                return window.Rules.formal().notMet.length > 0;
              },
            },
          ],
        },
        {
          id: "s-decision",
          title: "1.4 Değerlendirme takımının karar önerisi",
          short: "1.4 Takımın karar önerisi",
          by: BY.takim,
          desc: "Ana ölçüt sonuçları, Bölüm 3'teki alt ölçüt kararlarına dayanılarak bütüncül biçimde belirlenir (karar kuralları için Bölüm 6).",
          fields: [
            { type: "decision-summary" },
            {
              type: "radio",
              id: "summary.decision",
              label: "Karar önerisi",
              required: true,
              hint: "Önerilen karardan farklı bir seçim yaparsanız 1.2'de gerekçelendiriniz.",
              options: [
                { value: "akreditasyon", label: "Akreditasyon", tone: "success" },
                { value: "red", label: "Akreditasyonun reddi", tone: "danger" },
              ],
            },
            {
              type: "repeater",
              id: "summary.areas",
              label: "Gelişmeye açık alanlar (ölçüt numarasıyla)",
              itemLabel: "Gelişmeye açık alan",
              addLabel: "Gelişmeye açık alan ekle",
              itemFields: [
                {
                  id: "sub",
                  type: "select",
                  label: "Alt ölçüt",
                  options: function () {
                    var out = [];
                    C.forEach(function (c) {
                      c.subs.forEach(function (s) {
                        out.push({ value: s.code, label: s.code + " " + s.text.slice(0, 70) + (s.text.length > 70 ? "…" : "") });
                      });
                    });
                    return out;
                  },
                },
                { id: "text", type: "textarea", label: "Açıklama", wide: true },
              ],
            },
            { type: "textarea", id: "summary.recommendations", label: "Uygulanabilirse: değerlendirme takımının önerileri", rows: 5 },
          ],
        },
        {
          id: "s-regulated",
          title: "1.5 Mevzuatla düzenlenmiş programlar için ayrıca uygunluk",
          short: "1.5 Düzenlenmiş programlar",
          by: BY.kurulus,
          fields: [
            {
              type: "info",
              text:
                "Ulusal Çekirdek Eğitim Programı bulunan ya da meslek düzenlemesine tabi programlarda (ör. tıp, diş hekimliği, eczacılık, hemşirelik, öğretmen yetiştirme) ilgili düzenlemeye uyum ve varsa ek uzman görüşü burada belgelenir.",
            },
            {
              type: "radio",
              id: "summary.regulatedApplies",
              label: "Program mevzuatla düzenlenmiş bir program mı?",
              required: true,
              options: [
                { value: "evet", label: "Evet" },
                { value: "hayir", label: "Hayır" },
              ],
            },
            { type: "textarea", id: "summary.regulated", label: "Düzenlemeye uyum ve ek uzman görüşü", required: true, large: true, showIf: { field: "summary.regulatedApplies", eq: "evet" } },
          ],
        },
      ],
    },

    /* ======================= RAPOR VE GÖNDERİM ======================= */
    {
      id: "report",
      label: "Rapor",
      sublabel: "Bölüm 6–7 · Önizleme",
      steps: [
        {
          id: "r-rules",
          title: "6. Karar kuralları ve 7. Sözlük",
          short: "Karar kuralları ve sözlük",
          desc: "Taslak — “Program akreditasyon ölçütleri – Geri Bildirim” çalışma dosyasındaki Parametreler sayfasından alınmıştır; kesinleştirilecektir. Formdaki otomatik öneriler bu kurallara göre hesaplanır.",
          fields: [{ type: "heading", text: "6. Karar kuralları" }, { type: "rules" }, { type: "heading", text: "7. Sözlük" }, { type: "glossary" }],
        },
        {
          id: "r-review",
          title: "Rapor önizlemesi",
          short: "Önizleme ve gönderim",
          desc: "Rapor, şablondaki özgün bölüm sırasıyla aşağıda derlenir.",
          review: true,
          fields: [],
        },
      ],
    },
  ];

  return { tabs: tabs, BY: BY };
})();
