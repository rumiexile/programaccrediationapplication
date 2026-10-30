/* Otomatik üretilmiştir — tools/parse_criteria.py. Elle düzenlemeyin.
   mandatory: true/false şablonda sabit; null ise şablonda henüz belirlenmemiştir
   (☐ Evet ☐ Hayır) ve formda değerlendirme takımınca işaretlenir. */
window.CRITERIA = [
 {
  "no": 1,
  "title": "Kalite Güvencesi Politikası ve Yönetişim",
  "subs": [
   {
    "code": "1.1",
    "text": "Programın kalite güvencesi süreçleri kurumun stratejik karar alma ve yönetişim mekanizmalarıyla ilişkilendirilmiştir.",
    "mandatory": true,
    "rubric": [
     "A.1.1",
     "A.1.4",
     "A.2.2",
     "B.1.6"
    ],
    "indicators": [
     "Programın kalite güvencesi süreçleri, misyon ve vizyonu, kurum kalite politikası, stratejik planı ve eğitim-öğretim politikası ile ilişkilendirilmiştir.",
     "Program düzeyindeki kalite güvencesi süreçlerinin, kurumun ilgili akademik ve idari karar alma mekanizmalarıyla bağlantısı açıktır."
    ],
    "evidence": "Kurum kalite politikası, stratejik plan, eğitim-öğretim politikası, program kalite süreci, süreç şemaları, kurul/komisyon kararları, görev ve sorumluluk tanımları, program kalite güvencesi iş akışları."
   },
   {
    "code": "1.2",
    "text": "Program düzeyinde görev, yetki ve sorumluluklar tanımlıdır.",
    "mandatory": false,
    "rubric": [
     "A.1.1",
     "A.3.4",
     "B.1.6"
    ],
    "indicators": [
     "Bölüm başkanı, bölüm/program kurulu, program kalite sorumluları, komisyonlar, danışmanlar ve varsa destek birimlerinin görev, yetki ve sorumlulukları yazılı olarak tanımlanmıştır.",
     "Program kalite güvencesi süreçlerinde karar alma, uygulama ve raporlama sorumlulukları açık biçimde belirlenmiştir.",
     "Program düzeyindeki komisyon, kurul ve sorumlu kişilerin kurum kalite güvencesi yapılarıyla ilişkisi tanımlıdır."
    ],
    "evidence": "Görev tanımları, organizasyon şeması, komisyon listeleri, komisyon yönergeleri, çalışma usul ve esasları, görevlendirme yazıları, toplantı tutanakları, karar kayıtları, iş akışları, kalite güvencesi görev dağılım belgeleri."
   },
   {
    "code": "1.3",
    "text": "Öğrenciler, mezunlar, öğretim elemanları, işverenler ve ilgili dış paydaşlar kalite güvencesi ve karar süreçlerine sistematik ve etkili bir şekilde katılır.",
    "mandatory": false,
    "rubric": [
     "A.4.1",
     "A.4.2",
     "A.4.3",
     "B.1.5"
    ],
    "indicators": [
     "Programın iç ve dış paydaşları tanımlanmış; paydaşların hangi süreçlere, hangi sıklıkta ve hangi yöntemlerle katılacağı belirlenmiştir.",
     "Öğrenciler program kalite güvencesi süreçlerinde temsil edilir, karar alma süreçlerine etkili biçimde katılır.",
     "Mezunlar, işverenler, meslek örgütleri ve ilgili dış paydaşlar programın kalite güvencesi süreçlerine etkisi görülebilir biçimde dahil edilir.",
     "Paydaş katılım mekanizmalarının program kararlarıyla ilişkisi açıkça kurulmuştur ve uygulanmaktadır."
    ],
    "evidence": "Paydaş analizi, paydaş katılım planı, danışma kurulu yapısı, öğrenci temsilciliği kayıtları, paydaş toplantı gündemleri ve tutanakları, mezun ve işveren katılım kayıtları, program kurulu/danışma kurulu kararları."
   },
   {
    "code": "1.4",
    "text": "Program kalite güvencesi süreçlerinin sonuçları ilgili paydaşlarla paylaşılır.",
    "mandatory": true,
    "rubric": [
     "A.1.5",
     "A.4.1",
     "B.1.5"
    ],
    "indicators": [
     "Program kalite güvencesi süreçlerinden elde edilen temel sonuçların hangi paydaşlarla, hangi kanallar aracılığıyla ve hangi düzeyde paylaşılacağı tanımlanmıştır.",
     "Program değerlendirme sonuçları, alınan kararlar ve kalite güvencesi kapsamındaki temel çıktılar ilgili iç paydaşlarla paylaşılmaktadır.",
     "Öğrenciler ve ilgili dış paydaşlar, program kalite güvencesi süreçlerinin kendilerini ilgilendiren sonuçları hakkında bilgilendirilmektedir."
    ],
    "evidence": "Web sayfası duyuruları, kalite raporları, program değerlendirme özetleri, toplantı sunumları ve raporları, öğrenci/mezun/paydaş bilgilendirmeleri, e-posta veya duyuru kayıtları, program kurulu/danışma kurulu paylaşım kayıtları."
   },
   {
    "code": "1.5",
    "text": "Programda akademik özgürlük, akademik dürüstlük, kamu sorumluluğu, ayrımcılıkla mücadele ve sosyal kapsayıcılık ilkeleri gözetilir.",
    "mandatory": true,
    "rubric": [
     "A.2.1",
     "B.3.4",
     "D.1.1"
    ],
    "indicators": [
     "Programda akademik özgürlük, akademik dürüstlük ve etik ilkeler, kapsayıcılık, ayrımcılıkla mücadele, kamu sorumluluğu ve erişilebilirlik gözetilir ve akademik karar alma ve eğitim-öğretim süreçlerine entegre edilir.",
     "Akademik dürüstlük, etik davranış ve sorumluluk, kapsayıcılık ve ayrımcılıkla mücadele konularında öğrenci ve personel farkındalığını destekleyen uygulamalar, (kural, rehber ve yaptırım mekanizmaları) mevcuttur ve ilan edilmiştir.",
     "Program, akademik dürüstlük ve etik politikasını; üretken yapay zeka araçlarının öğrenme, öğretme, ölçme-değerlendirme ve öğrenci çalışmalarındaki kullanımını kapsayacak biçimde tanımlar. Bu kullanımın sorumlu, insan-merkezli ve insan denetimini/doğrulamasını güvence altına alan mekanizmalara sahiptir."
    ],
    "evidence": "Etik kurallar, yapay zeka politikası, akademik dürüstlük politikası, akademik özgürlük ve kamu sorumluluğuna ilişkin düzenlemeler, engelli öğrenci ve erişilebilirlik düzenlemeleri, kapsayıcılık uygulamaları, şikâyet/itiraz mekanizmaları, intihal ve etik ihlal süreçleri, eğitim ve farkındalık faaliyetleri."
   },
   {
    "code": "1.6",
    "text": "Program kapsamındaki staj, işyeri eğitimi, uygulamalı eğitim ve benzeri öğrenme ortamları kalite güvencesi kapsamındadır (Bu alt ölçüt staj ve uygulamalı eğitimin olduğu programlar için geçerlidir).",
    "mandatory": true,
    "rubric": [
     "B.1.3",
     "B.1.6",
     "B.3.1",
     "B.3.3"
    ],
    "indicators": [
     "Program kapsamında yürütülen staj, işyeri eğitimi, klinik uygulama, okul deneyimi, mesleki uygulama, saha çalışması, laboratuvar/atölye uygulaması, kurum/işletme temelli eğitim ve benzeri program dışı öğrenme ortamlarının kalite güvencesi kapsamı tanımlanmıştır.",
     "Bu faaliyetlerin program amaçları, program öğrenme çıktıları, ders/uygulama kazanımları, öğrenci iş yükü ve ölçme-değerlendirme süreçleriyle ilişkisi açıkça kurulmuştur.",
     "Uygulama yapılan kurum, işletme, okul, klinik, laboratuvar, atölye veya saha ortamlarında öğrencinin, programın, kurum dışı paydaşın, uygulama sorumlusunun ve varsa dış eğiticinin görev, sorumluluk ve iletişim kanalları açıkça belirlenmiştir."
    ],
    "evidence": "Staj/uygulama yönergeleri, işyeri/saha eğitimi usul ve esasları, uygulama protokolleri, iş birliği sözleşmeleri, uygulama yeri listeleri, uygulama sorumlusu/dış eğitici görevlendirme kayıtları, öğrenci bilgilendirme dokümanları, uygulama planları, uygulama değerlendirme formları, öğrenci devam ve başarı kayıtları, uygulama raporları."
   }
  ]
 },
 {
  "no": 2,
  "title": "Programın Tasarımı, Onayı, İzlenmesi ve Güncellenmesi",
  "subs": [
   {
    "code": "2.1",
    "text": "Program amaçları, mezun profili ve program öğrenme çıktıları açıkça tanımlanmıştır.",
    "mandatory": null,
    "rubric": [
     "A.2.1",
     "B.1.1",
     "B.1.3"
    ],
    "indicators": [
     "Programın genel amaçları ve mezun profili; programın misyonu, düzeyi, öğrenme çıktıları ve kapsamıyla uyumlu biçimde tanımlanmıştır.",
     "Program öğrenme çıktıları; öğrencilerin mezuniyet aşamasında kazanması beklenen bilgi, beceri ve yetkinlikleri açık, ölçülebilir ve değerlendirilebilir biçimde tanımlamaktadır."
    ],
    "evidence": "Program amaçları, mezun profili, program öğrenme çıktıları, program tanıtım dokümanları, ders bilgi paketleri, bölüm/program kurulu kararları, program tasarım dosyası."
   },
   {
    "code": "2.2",
    "text": "Programın yeterlilikleri ilgili ulusal ve uluslararası yeterlilik çerçeveleriyle ilişkilendirilmiştir.",
    "mandatory": null,
    "rubric": [
     "B.1.1",
     "B.1.3",
     "B.2.4"
    ],
    "indicators": [
     "Program öğrenme çıktıları, Türkiye Yeterlilikler Çerçevesi (TYÇ), Avrupa Yeterlilikler Çerçevesi (AYÇ) ve ilgili yükseköğretim yeterlilik düzeyi ile uyumludur.",
     "Programın kazandırdığı yeterlilikler, ilgili diploma düzeyi ve varsa mesleki/alan standartları ve çekirdek eğitim programlarıyla ilişkilendirilmiştir.",
     "Program yeterlilikleri; mezunların akademik gelişimlerini sürdürebilmelerini, mesleklerini yetkin bir şekilde icra edebilmelerini ve istihdam edilebilirliklerini destekleyecek bilgi, beceri ve yetkinlikleri kazandıracak biçimde tanımlanmıştır."
    ],
    "evidence": "TYÇ uyum matrisi, program yeterlilikleri matrisi, alan yeterlilikleri eşleştirmesi, ulusal/uluslararası mesleki standartlar, çekirdek eğitim programları, akreditasyon veya meslek standardı referansları."
   },
   {
    "code": "2.3",
    "text": "Dersler, öğrenme çıktıları, öğrenci iş yükü ve ölçme-değerlendirme yapısı program bütünlüğünü destekler.",
    "mandatory": null,
    "rubric": [
     "B.1.2",
     "B.1.3",
     "B.1.4",
     "B.2.2"
    ],
    "indicators": [
     "Ders öğrenme çıktıları ile program öğrenme çıktıları arasında sistematik ilişki kurulmuştur.",
     "Programın ders yapısı, zorunlu/seçmeli ders dengesi ve uygulama bileşenleri program amaçlarını destekleyecek şekilde düzenlenmiştir.",
     "Programda dersler, ön koşullar ve kademeli ilerleme mantığı dikkate alınarak yapılandırılmıştır.",
     "Öğrenci iş yükü ve AKTS kredileri, derslerin öğrenme çıktıları ve program öğrenme çıktılarını desteklekleyecek şekilde belirlenmiştir.",
     "Ölçme-değerlendirme yöntemleri, ders ve program öğrenme çıktılarının kazanımını gösterecek biçimde yapılandırılmıştır."
    ],
    "evidence": "Ders-program çıktıları matrisi, ders bilgi paketleri, AKTS iş yükü tabloları, ölçme-değerlendirme yöntemleri, ders izlenceleri, uygulama/staj kazanımları, müfredat haritası."
   },
   {
    "code": "2.4",
    "text": "Program tasarımı güncel, akademik, mesleki, toplumsal ve sektörel gelişmelerle ilişkilidir.",
    "mandatory": null,
    "rubric": [
     "A.1.3",
     "A.4.1",
     "B.1.1",
     "B.1.5"
    ],
    "indicators": [
     "Program içeriği ilgili disiplinin güncel akademik ve bilimsel gelişmeleriyle uyumludur.",
     "Program tasarımında mesleki uygulama alanlarındaki gelişmeler, teknolojik dönüşüm ve sektörel beklentiler dikkate alınmaktadır.",
     "Program; toplumun ihtiyaçları, mezun istihdamı ve öğrencilerin kişisel/mesleki gelişimiyle ilişkilendirilmiştir.",
     "Programın amaçları, müfredatı, öğrenme çıktıları, ders yapısı, öğrenci iş yükü veya uygulama bileşenleri ulusal ve/veya uluslararası benzer programlarla karşılaştırılarak konumlandırılmıştır.",
     "Programın niteliğine uygun olarak araştırma temelli öğrenme, uygulamalı öğrenme ve/veya mesleki deneyim kazandırmaya yönelik öğrenme etkinliklerine yer verilmiştir."
    ],
    "evidence": "Müfredat güncelleme dosyaları, alan tarama raporları, sektör/meslek analizi, danışma kurulu görüşleri, dış uzman raporları, iş gücü piyasası verileri, ulusal/uluslararası referans belgeleri, ulusal/uluslararası benzer program kıyaslama/karşılaştırma raporları."
   },
   {
    "code": "2.5",
    "text": "Program tasarımı, onayı ve gözden geçirilmesi süreçlerine öğrenciler ve ilgili paydaşlar etkili biçimde katılır.",
    "mandatory": null,
    "rubric": [
     "A.4.1",
     "A.4.2",
     "A.4.3",
     "B.1.1",
     "B.1.5"
    ],
    "indicators": [
     "Öğrenciler program tasarımı, onayı, gözden geçirilmesi ve güncellenmesi süreçlerine planlı ve sistematik biçimde dahil edilmektedir.",
     "Mezunlar, işverenler, meslek örgütleri, dış uzmanlar ve ilgili diğer paydaşların görüşleri program tasarım ve güncelleme süreçlerinde dikkate alınmaktadır.",
     "Paydaş katkılarının program amaçları, öğrenme çıktıları, ders yapısı veya uygulama bileşenleriyle ilişkisi kurulmuştur."
    ],
    "evidence": "Öğrenci geri bildirimleri, öğrenci temsilcisi kayıtları, danışma kurulu tutanakları, mezun ve işveren görüşleri, dış uzman değerlendirmeleri, paydaş toplantı tutanakları, müfredat çalıştayı kayıtları, program güncelleme kararları."
   },
   {
    "code": "2.6",
    "text": "Programın tasarım, onay ve güncelleme süreçleri tanımlı ve kurumsal karar mekanizmalarıyla güvence altındadır.",
    "mandatory": null,
    "rubric": [
     "A.3.4",
     "B.1.1",
     "B.1.5",
     "B.1.6"
    ],
    "indicators": [
     "Program açma, tasarlama, müfredat oluşturma, ders ekleme/çıkarma ve program güncelleme süreçleri tanımlıdır.",
     "Program tasarımı ve güncellemeleri ilgili akademik kurullar ve yetkili karar mekanizmaları tarafından onaylanmaktadır.",
     "Güncellenen program amaçları, öğrenme çıktıları, müfredat ve ders bilgi paketleri ilgili paydaşların erişimine sunulmaktadır"
    ],
    "evidence": "Program açma/onay dosyaları, senato/fakülte/yüksekokul/bölüm kararları, müfredat değişiklik formları, süreç akışları, komisyon kararları, güncel ders bilgi paketleri, yayımlanmış program bilgileri."
   },
   {
    "code": "2.7",
    "text": "Programın güncelliği ve amacına uygunluğu periyodik olarak gözden geçirilir.",
    "mandatory": null,
    "rubric": [
     "A.2.3",
     "B.1.5",
     "B.1.6"
    ],
    "indicators": [
     "Programın içeriği, öğrenme çıktıları, öğrenci iş yükü, öğrenci ilerlemesi, mezuniyet durumu ve öğrenme ortamıyla uyumu belirli aralıklarla gözden geçirilmektedir.",
     "Gözden geçirme süreci programın öğrencilerin, toplumun ve iş gücü piyasasının değişen ihtiyaçlarına cevap verme düzeyini ele almaktadır.",
     "Programın güncelliği ve rekabetçiliği, ulusal ve/veya uluslararası benzer programlarla yapılan karşılaştırmalar dikkate alınarak değerlendirilmektedir."
    ],
    "evidence": "Periyodik program gözden geçirme raporları, program değerlendirme toplantı tutanakları, müfredat değerlendirme formları, öğrenci iş yükü değerlendirmeleri, mezuniyet/ilerleme özetleri, ders değerlendirme sonuçları, güncelleme kararları, benchmarking raporları, benzer program karşılaştırma tabloları."
   }
  ]
 },
 {
  "no": 3,
  "title": "Öğrenci Merkezli Öğrenme, Öğretme ve Ölçme-Değerlendirme",
  "subs": [
   {
    "code": "3.1",
    "text": "Program, öğrencilerin öğrenme sürecinde aktif rol almalarını destekler.",
    "mandatory": null,
    "rubric": [
     "B.2.1",
     "B.3.2",
     "B.3.4"
    ],
    "indicators": [
     "Programda kullanılan öğretim yöntem ve teknikleri öğrencilerin derse aktif katılımını, öz değerlendirmesini ve öğrenme sorumluluğunu destekleyecek şekilde yapılandırılmıştır.",
     "Derslerde öğrencilerin tartışma, uygulama, problem çözme, araştırma, proje geliştirme, sunum yapma veya benzeri etkinliklerle öğrenme sürecine katılımı sağlanmaktadır.",
     "Öğrenme etkinlikleri, program ve ders öğrenme çıktılarının kazanımını destekleyecek biçimde tasarlanmıştır."
    ],
    "evidence": "Ders izlenceleri, ders bilgi paketleri, aktif öğrenme uygulamaları, proje/ödev/sunum örnekleri, uygulama çalışmaları, öğrenci katılımına ilişkin ders materyalleri, öğrenme etkinliği örnekleri."
   },
   {
    "code": "3.2",
    "text": "Program, öğrenci çeşitliliğini ve farklı öğrenme ihtiyaçlarını dikkate alır.",
    "mandatory": null,
    "rubric": [
     "B.1.3",
     "B.2.1"
    ],
    "indicators": [
     "Programda farklı öğrenci profilleri, öğrenme gereksinimleri ve öğrenme hızları dikkate alınmaktadır.",
     "Öğrencilerin öğrenme sürecine erişimini ve katılımını destekleyen esnek öğrenme olanakları ve/veya uygun destek mekanizmaları bulunmaktadır.",
     "Dezavantajlı gruplar, çalışan öğrenciler ve uluslararası öğrenciler için uygun düzenlemeler yapılmaktadır."
    ],
    "evidence": "Esnek öğrenme düzenlemeleri, danışmanlık kayıtları, engelli öğrenci düzenlemeleri, uzaktan/harmanlanmış öğretim uygulamaları, telafi/mazeret uygulamaları, öğrenci destek ve yönlendirme kayıtları."
   },
   {
    "code": "3.3",
    "text": "Programda kullanılan öğretim yöntemleri ve sunum biçimleri öğrenme çıktılarıyla uyumludur.",
    "mandatory": null,
    "rubric": [
     "B.2.1",
     "B.3.2",
     "B.3.4"
    ],
    "indicators": [
     "Derslerde kullanılan öğretim yöntemleri, ders öğrenme çıktılarının niteliğine ve düzeyine uygun olarak belirlenmiştir.",
     "Yüz yüze, uzaktan, harmanlanmış, uygulamalı, laboratuvar, atölye, klinik, saha veya işyeri temelli öğretim biçimleri programın amaçlarına ve öğrenme çıktılarına uygun biçimde kullanılmaktadır.",
     "Dijital ve teknolojik araçlar ile uygun olduğu durumlarda yapay zekâ, öğrenme çıktılarının kazanımını destekleyecek biçimde eğitim-öğretim süreçlerine entegre edilmiştir."
    ],
    "evidence": "Ders bilgi paketleri, öğretim yöntemi-öğrenme çıktısı eşleştirmeleri, ders izlenceleri, uygulama/laboratuvar/proje yönergeleri, uzaktan veya harmanlanmış öğretim materyalleri, dijital öğrenme platformu kayıtları."
   },
   {
    "code": "3.4",
    "text": "Program, öğrenci özerkliğini, akademik rehberlik, danışmanlık ve öğrenme sürecinde karşılıklı saygıyı destekler.",
    "mandatory": null,
    "rubric": [
     "B.1.3",
     "B.2.2"
    ],
    "indicators": [
     "Öğrencilerin kendi öğrenme süreçlerini planlama, izleme ve geliştirme becerilerini destekleyen yapılandırılmış mekanizmalar (akademik danışmanlık, bireysel öğrenme/çalışma planları, mikro yeterlilikler, öz değerlendirme araçları ve uygun dijital destekler) bulunmaktadır.",
     "Öğrencilere öğrenme sürecinde planlı, yapılandırılmış, süreçleri ve içeriği tanımlı akademik danışmanlık verilmektedir.",
     "Öğrenci-öğretim elemanı ilişkisinde karşılıklı saygı, açık iletişim ve güvenli öğrenme ortamını destekleyen ilkeler ve uygulamalar bulunmaktadır."
    ],
    "evidence": "Akademik danışmanlık kayıtları, öğrenci rehberleri, ders içi geri bildirim uygulamaları, öğrenci-öğretim elemanı iletişim kanalları, mikro yeterlilik mekanizmaları, öğrenci memnuniyet/geri bildirim kayıtları, etik ve davranış ilkeleri."
   },
   {
    "code": "3.5",
    "text": "Ölçme-değerlendirme yöntemleri öğrenme çıktılarıyla uyumludur.",
    "mandatory": null,
    "rubric": [
     "B.2.2"
    ],
    "indicators": [
     "Derslerde kullanılan ölçme-değerlendirme yöntemleri, öğrencilerin ilgili ders öğrenme çıktılarının kazanımını gösterecek şekilde tasarlanmıştır.",
     "Ölçme-değerlendirme araçları, dersin öğrenme çıktılarıyla uyumlu ve programın yapısına göre çeşitlendirilmiş biçimde seçilmektedir.",
     "Farklı kazanım türleri (teorik bilgi, uygulama becerisi, mesleki yetkinlik, araştırma ve iletişim becerisi) her birinin kendi niteliğine uygun ölçme araçlarıyla değerlendirilmektedir."
    ],
    "evidence": "Ölçme-değerlendirme yöntemleri, sınav/ödev/proje/rubrik örnekleri, ders öğrenme çıktısı-ölçme yöntemi eşleştirmeleri, uygulama değerlendirme formları, staj/klinik/saha değerlendirme araçları."
   },
   {
    "code": "3.6",
    "text": "Ölçme-değerlendirme süreçleri şeffaf, adil ve tutarlı biçimde yürütülür.",
    "mandatory": null,
    "rubric": [
     "A.4.2",
     "B.2.2"
    ],
    "indicators": [
     "Derslerin ölçme-değerlendirme yöntemleri, başarı ölçütleri, notlandırma esasları ve değerlendirme takvimi öğrencilerle önceden paylaşılmaktadır.",
     "Değerlendirme süreçleri ilan edilmiş usul ve esaslara göre tutarlı biçimde uygulanmaktadır.",
     "Mazeret, telafi, engel durumu veya özel koşullara ilişkin değerlendirme düzenlemeleri tanımlıdır ve öğrenciler tarafından erişilebilirdir.",
     "Programın niteliğine uygun durumlarda değerlendirme sürecinin tutarlılığını artırmak amacıyla dereceli değerlendirme anahtarları (rubrik), standart değerlendirme araçları veya birden fazla değerlendirici gibi uygulamalardan yararlanılmaktadır."
    ],
    "evidence": "Ders izlenceleri, öğrenci bilgi sistemi kayıtları, sınav yönergeleri, rubrikler, notlandırma anahtarları, sınav güvenliği düzenlemeleri, mazeret sınavı kararları, ölçme-değerlendirme usul ve esasları."
   },
   {
    "code": "3.7",
    "text": "Öğrencilere öğrenmelerini geliştirecek nitelikte geri bildirim sağlanır.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "B.2.2",
     "B.3.2"
    ],
    "indicators": [
     "Öğrencilere sınav, ödev, proje, uygulama, staj veya performans değerlendirmeleri sonrasında öğrenmelerini geliştirmeye yönelik geri bildirim verilmektedir.",
     "Geri bildirimler yalnızca not bildiriminden ibaret olmayıp öğrencinin güçlü yönlerini ve geliştirmesi gereken alanları göstermektedir.",
     "Öğrencilerin geri bildirimlere erişimini ve gerektiğinde öğretim elemanıyla açıklama/yeniden değerlendirme süreci yürütebilmesini sağlayan mekanizmalar bulunmaktadır."
    ],
    "evidence": "Geri bildirim örnekleri, rubrikler, ödev/proje değerlendirme formları, öğrenme yönetim sistemi geri bildirim kayıtları, uygulama/staj değerlendirme formları."
   },
   {
    "code": "3.8",
    "text": "Öğrenci şikâyet ve itiraz süreçleri görünür, erişilebilir ve işlevseldir.",
    "mandatory": null,
    "rubric": [
     "B.2.3"
    ],
    "indicators": [
     "Öğrencilerin öğrenme-öğretme ve ölçme-değerlendirme süreçlerine ilişkin şikâyet, itiraz ve başvuru yolları tanımlanmış ve öğrencilere duyurulmuştur.",
     "Sınav, not, uygulama, staj, danışmanlık veya öğrenme ortamına ilişkin itiraz ve şikâyetler tanımlı süreçlere göre ele alınmaktadır.",
     "Şikâyet ve itiraz süreçleri öğrenciler açısından erişilebilir, anlaşılır, güvenilir ve ayrımcılıktan uzak biçimde işletilmektedir."
    ],
    "evidence": "Öğrenci şikâyet ve itiraz yönergeleri, sınav itiraz formları, başvuru kanalları, öğrenci bilgi sistemi kayıtları, karar tutanakları, anonimleştirilmiş sonuç duyuruları, öğrenci bilgilendirme dokümanları."
   }
  ]
 },
 {
  "no": 4,
  "title": "Öğrenci Kabulü, İlerlemesi, Tanınma ve Mezuniyet",
  "subs": [
   {
    "code": "4.1",
    "text": "Programa kabul, kayıt ve yerleştirme süreçleri önceden tanımlanmış, yayımlanmış ve şeffaf biçimde yürütülür.",
    "mandatory": null,
    "rubric": [
     "B.2.3"
    ],
    "indicators": [
     "Programa kabul koşulları, kayıt esasları, kontenjanlar ve varsa özel kabul koşullarına ilişkin önerilerinin kurumsal karar mercilerine gerekçeli biçimde iletilmektedir.",
     "Kabul ve kayıt süreçlerine ilişkin bilgiler aday öğrencilerin, kayıtlı öğrencilerin ve ilgili paydaşların erişimine sunulmaktadır.",
     "Programa kabul ve kayıt işlemleri ilan edilmiş kurallara uygun, tutarlı ve ayrımcılıktan uzak biçimde yürütülmektedir."
    ],
    "evidence": "Program kabul koşulları, kontenjan bilgileri, YÖKSİS/YKS/kayıt kılavuzu bilgileri, program web sayfası, öğrenci işleri duyuruları, kayıt yönergeleri, özel koşul belgeleri."
   },
   {
    "code": "4.2",
    "text": "Öğrencilerin programa uyumu ve öğrenim sürecine başlangıcı desteklenir.",
    "mandatory": null,
    "rubric": [
     "A.3.1",
     "B.1.5",
     "B.3.2"
    ],
    "indicators": [
     "Yeni öğrencilerin programa, kuruma, akademik beklentilere ve öğrenci destek hizmetlerine uyumunu kolaylaştıran bilgilendirme veya oryantasyon uygulamaları bulunmaktadır.",
     "Öğrencilere ders seçimi, akademik beklentiler, program öğrenme çıktıları, ölçme-değerlendirme esasları ve mezuniyet koşulları hakkında bilgi verilmektedir.",
     "Öğrencilerin programa uyum sürecinde akademik danışmanlık ve gerekli yönlendirme mekanizmaları işletilmektedir."
    ],
    "evidence": "Oryantasyon programları, öğrenci el kitabı, program tanıtım sunumları, danışmanlık bilgilendirme kayıtları, öğrenci işleri bilgilendirme dokümanları, web duyuruları, akademik takvim ve ders kayıt rehberleri."
   },
   {
    "code": "4.3",
    "text": "Öğrenci ilerlemesi ve akademik gelişimi tanımlı süreçlerle takip edilir.",
    "mandatory": null,
    "rubric": [
     "A.5.1",
     "B.2.3"
    ],
    "indicators": [
     "Öğrencilerin ders alma, başarı, dönem/yıl geçişi, mezuniyete ilerleme ve akademik durumlarına ilişkin süreçler tanımlıdır.",
     "Akademik danışmanlık sistemi öğrencilerin program içindeki ilerlemesini destekleyecek biçimde işletilmektedir.",
     "Akademik başarısızlık, ders tekrarı, devamsızlık, kayıt yenilememe veya mezuniyet gecikmesi riski bulunan öğrenciler için yönlendirme ve destek mekanizmaları bulunmaktadır."
    ],
    "evidence": "Öğrenci bilgi sistemi kayıtları, akademik danışmanlık kayıtları, başarı ve ilerleme raporları, ders alma ve mezuniyet kontrol formları, akademik durum izleme kayıtları, riskli öğrenci listeleri."
   },
   {
    "code": "4.4",
    "text": "Öğrenci hareketliliği, geçişler ve önceki öğrenmelerin tanınması adil ve tutarlı biçimde yürütülür.",
    "mandatory": null,
    "rubric": [
     "B.2.3."
    ],
    "indicators": [
     "Yatay geçiş, dikey geçiş, çift ana dal, yan dal, değişim programları, özel öğrenci statüsü ve benzeri hareketlilik süreçlerine ilişkin kurallar tanımlıdır.",
     "Öğrencilerin daha önce aldığı dersler, yeterlilikler, mikro yeterlilikler, işyeri eğitimi, uygulama deneyimleri veya önceki öğrenmeleri tanımlı usullerle değerlendirilmektedir.",
     "Tanınma, muafiyet ve intibak kararları öğrenme çıktıları, kredi/iş yükü, ders içeriği ve yeterlilik düzeyi dikkate alınarak tutarlı biçimde verilmektedir.",
     "Ulusal ve uluslararası hareketlilik süreçlerinde öğrencilerin öğrenim kaybı yaşamamasını destekleyen akademik tanınma mekanizmaları bulunmaktadır."
    ],
    "evidence": "İntibak ve muafiyet yönergeleri, yatay/dikey geçiş kararları, çift ana dal/yan dal esasları, Erasmus/değişim programı belgeleri, öğrenim anlaşmaları, transkriptler, intibak komisyonu kararları, muafiyet başvuru ve karar formları."
   },
   {
    "code": "4.5",
    "text": "Mezuniyet koşulları ve yeterliliklerin belgelendirilmesi açık ve güvenilirdir.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "B.2.3",
     "B.2.4"
    ],
    "indicators": [
     "Programın mezuniyet koşulları, tamamlanması gereken kredi/AKTS, zorunlu/seçmeli dersler, staj/uygulama yükümlülükleri ve diğer mezuniyet gerekleri açık biçimde tanımlanmıştır.",
     "Mezuniyet kararları öğrencinin program öğrenme çıktıları, ders yükümlülükleri, uygulama/staj yükümlülükleri ve ilgili mevzuat gereklerini tamamlamasına dayalı olarak verilmektedir.",
     "Mezunlara verilen diploma eki, kazanılan yeterliliğin düzeyini, içeriğini, öğrenme çıktılarını ve programın statüsünü açıklayacak bilgileri içermektedir."
    ],
    "evidence": "Mezuniyet koşulları, mezuniyet kontrol listeleri, transkript örnekleri, diploma eki veya ilgili mezuniyet belgeleri, program yeterlilikleri, öğrenci bilgi sistemi kayıtları, staj/uygulama tamamlama belgeleri, mezuniyet komisyonu kararları."
   },
   {
    "code": "4.6",
    "text": "Öğrenci yaşam döngüsüne ilişkin kurallar öğrencilere açık, erişilebilir ve güncel biçimde sunulur.",
    "mandatory": null,
    "rubric": [
     "A.1.5."
    ],
    "indicators": [
     "Kabul, kayıt, ders alma, devam, başarı, tanınma, itiraz, mezuniyet ve belgelendirme süreçlerine ilişkin kurallar öğrencilerin erişimine sunulmuştur.",
     "Öğrenciler program süresince hakları, yükümlülükleri, başvuru yolları ve akademik süreçler konusunda bilgilendirilmektedir.",
     "Öğrenci yaşam döngüsüne ilişkin bilgiler farklı öğrenci grupları için anlaşılır, erişilebilir ve güncel biçimde yayımlanmaktadır."
    ],
    "evidence": "Öğrenci el kitabı, program web sayfası, akademik takvim, yönetmelik/yönerge bağlantıları, ders kayıt kılavuzu, ders bilgi paketleri,sıkça sorulan sorular, öğrenci bilgi sistemi duyuruları, danışmanlık bilgilendirme materyalleri."
   }
  ]
 },
 {
  "no": 5,
  "title": "Öğretim Kadrosu ve Eğitim-Öğretimi Destekleyen Personel",
  "subs": [
   {
    "code": "5.1",
    "text": "Programın öğretim kadrosu nicelik ve nitelik bakımından programın amaçları ve öğrenme çıktılarıyla uyumludur.",
    "mandatory": null,
    "rubric": [
     "A.3.2",
     "B.4.1"
    ],
    "indicators": [
     "Programda görev yapan öğretim elemanlarının uzmanlık alanları, akademik birikimleri ve mesleki deneyimleri programın amaçları, ders yapısı ve öğrenme çıktılarıyla uyumludur.",
     "Öğretim elemanı sayısı; öğrenci sayısı, ders yükü, uygulama yükü, danışmanlık sorumlulukları ve programın öğretim dili dikkate alındığında yeterlidir.",
     "Ders görevlendirmeleri öğretim elemanlarının uzmanlık alanı, deneyimi ve dersin öğrenme çıktıları dikkate alınarak yapılmaktadır."
    ],
    "evidence": "Öğretim elemanı listesi, özgeçmişler, uzmanlık alanları, ders görevlendirme tabloları, akademik kadro profili, öğrenci/öğretim elemanı oranları, program-ders-kadro eşleştirmeleri."
   },
   {
    "code": "5.2",
    "text": "Öğretim elemanlarının işe alınması, görevlendirilmesi ve yükseltilmesi süreçleri adil, şeffaf ve tanımlı esaslara dayanır.",
    "mandatory": null,
    "rubric": [
     "B.4.2",
     "B.4.3"
    ],
    "indicators": [
     "Program, öğretim kadrosu ihtiyacını uzmanlık alanı, ders yükü, öğrenme çıktıları ve öğrenci gereksinimleri temelinde belirler ve kurumsal insan kaynağı süreçlerine girdi sağlar.",
     "Programda öğretim elemanlarının görevlendirilmesi, ders yükü dağılımı ve akademik görevlerine ilişkin süreçler tanımlı usul ve esaslara göre yürütülmektedir.",
     "Akademik görevlendirmelerde programın ihtiyaçları, alan uzmanlığı, eğitim-öğretim yeterliliği ve öğrenci gereksinimleri dikkate alınmaktadır.",
     "Programda görev yapan öğretim elemanlarının görev ve sorumlulukları açık biçimde tanımlanmıştır."
    ],
    "evidence": "Atama ve yükseltme ölçütleri, görevlendirme yazıları, ders yükü dağılımları, akademik kurul kararları, insan kaynakları süreçleri, ilgili mevzuat ve yönergeler, atama ve yükseltmeye yönelik itiraz ve şikayetler."
   },
   {
    "code": "5.3",
    "text": "Öğretim elemanlarının eğitim-öğretim yetkinlikleri desteklenir.",
    "mandatory": null,
    "rubric": [
     "B.4.2",
     "C.2.1",
     "C.3.2"
    ],
    "indicators": [
     "Öğretim elemanlarının pedagojik yeterlilik, öğrenci merkezli öğrenme/öğretme, ölçme-değerlendirme, dijital öğretim ve kapsayıcı eğitim konularındaki gelişimleri desteklenmektedir.",
     "Öğretim elemanlarının öğrenme çıktıları, ders tasarımı, aktif öğrenme yöntemleri ve öğrenci geri bildirimi konularında yetkinlik geliştirmelerine yönelik imkânlar bulunmaktadır.",
     "Öğretim elemanlarının yenilikçi öğretim yöntemlerini ve dijital/üretken yapay zekâ uygulamalarını eğitim-öğretim süreçlerine entegre etmelerini destekleyen teşvik ve destek mekanizmaları bulunmaktadır."
    ],
    "evidence": "Eğiticilerin eğitimi kayıtları, hizmet içi eğitimler, ölçme-değerlendirme eğitimleri, dijital öğretim eğitimleri, kapsayıcı eğitim faaliyetleri, katılım belgeleri."
   },
   {
    "code": "5.4",
    "text": "Öğretim elemanlarının akademik, mesleki ve bilimsel gelişimi programın niteliğini destekler.",
    "mandatory": null,
    "rubric": [
     "B.4.2",
     "B.4.3",
     "C.3.2"
    ],
    "indicators": [
     "Öğretim elemanlarının akademik araştırma, akademik izin (sabatikal), mesleki uygulama, sanatsal faaliyet, sektörel deneyim veya alanla ilgili mesleki gelişim faaliyetleri programın güncelliğine katkı sağlamaktadır.",
     "Öğretim elemanlarının alanlarındaki güncel bilimsel, mesleki ve teknolojik gelişmeleri programın eğitim-öğretim süreçlerine yansıtması desteklenmektedir.",
     "Programda öğretim elemanlarının araştırma, uygulama ve toplumsal katkı faaliyetleri ile öğrenme-öğretme süreçleri arasında ilişki kurulmaktadır."
    ],
    "evidence": "Yayınlar, projeler, mesleki sertifikalar, sektör deneyimi belgeleri, sabatik izne çıkma oranı, konferans/çalıştay katılımları, araştırma ve uygulama faaliyetleri, akademik performans takip sistem çıktıları, dış paydaş faaliyetleri, sürdürülebilir kalkınma hedefleri kapsamında yürütülen faaliyetler."
   },
   {
    "code": "5.5",
    "text": "Öğretim elemanlarının eğitim-öğretim performansı çoklu geri bildirim kaynaklarıyla değerlendirilir.",
    "mandatory": null,
    "rubric": [
     "A.3.2",
     "B.3.1",
     "B.3.3"
    ],
    "indicators": [
     "Öğretim elemanlarının eğitim-öğretim performansının değerlendirilmesinde öğrenci geri bildirimleri, ders değerlendirmeleri, akademik kurul değerlendirmeleri veya benzeri kaynaklardan yararlanılmaktadır.",
     "Öğrenci geri bildirimleri öğretim elemanlarının öğretim yöntemleri, iletişim, geri bildirim verme, ölçme-değerlendirme ve ders organizasyonu gibi alanlarda gelişimini desteklemek üzere kullanılmaktadır.",
     "Öğretim performansına ilişkin değerlendirme süreçleri öğretim elemanlarının mesleki gelişimiyle ilişkilendirilmektedir."
    ],
    "evidence": "Ders değerlendirme anketleri, öğrenci geri bildirimleri, öğretim elemanı performans değerlendirme kayıtları, akademik kurul tutanakları, ders gözlem formları, akran değerlendirmeleri, öz değerlendirme formları, geri bildirim raporları."
   },
   {
    "code": "5.6",
    "text": "Eğitim-öğretimi destekleyen idari, teknik ve uygulama personeli programın ihtiyaçlarını karşılayacak yeterliliktedir.",
    "mandatory": null,
    "rubric": [
     "A.4.1",
     "B.1.6",
     "B.4.1"
    ],
    "indicators": [
     "Programın yapısı gerektiriyorsa laboratuvar, atölye, klinik, saha, dijital öğrenme ortamı veya öğrenci işleri süreçlerini destekleyen idari/teknik personel yeterliliği izlenir.",
     "Eğitim-öğretimi destekleyen personelin sayısı, uzmanlığı ve yetkinliği programın uygulama bileşenleri ve öğrenci ihtiyaçlarıyla uyumludur.",
     "Destek personelinin mesleki gelişimi, iş sağlığı ve güvenliği, öğrenciyle iletişim, dijital sistemler veya ilgili teknik alanlarda yetkinlikleri desteklenmektedir."
    ],
    "evidence": "Teknik/idari personel listeleri, görev tanımları, laboratuvar/atölye/klinik sorumlu listeleri, öğrenci işleri süreçleri, destek hizmet kayıtları, eğitim ve sertifika belgeleri."
   },
   {
    "code": "5.7",
    "text": "Staj, işyeri eğitimi, klinik uygulama, okul deneyimi, mesleki uygulama, saha çalışması veya benzeri süreçlerde görev alan eğiticilerin, uygulama sorumluları ve mesleki paydaşların yeterliliği güvence altındadır. (Bu alt ölçüt staj ve uygulamalı eğitimin olduğu programlar için geçerlidir.)",
    "mandatory": null,
    "rubric": [
     "B.3.1",
     "B.3.3"
    ],
    "indicators": [
     "Staj, işyeri eğitimi, klinik uygulama, okul deneyimi, mesleki uygulama, saha çalışması veya benzeri süreçlerde görev alan eğiticilerin ve uygulama sorumlularının rolleri tanımlıdır.",
     "Eğiticiler veya uygulama sorumluları program öğrenme çıktıları, uygulama beklentileri, öğrenci değerlendirme süreçleri ve iletişim kanalları hakkında bilgilendirilmektedir.",
     "Program dışı öğrenme ortamlarında görev alan kişilerin mesleki yeterliliği, deneyimi ve programla ilişkisi dikkate alınmaktadır.",
     "Eğiticiler, uygulama sorumluları, mesleki paydaşlar ve öğrencilerden uygulama süreçlerine ilişkin geri bildirim alınmakta ve bu geri bildirimler programın geliştirilmesinde kullanılmaktadır."
    ],
    "evidence": "Eğitici görevlendirme kayıtları, uygulama protokolleri, işyeri eğitimi sorumlusu listeleri, dış eğitici özgeçmişleri, uygulama değerlendirme formları, kurum/işletme sorumlu bilgileri, bilgilendirme materyalleri."
   }
  ]
 },
 {
  "no": 6,
  "title": "Öğrenme Ortamı, Kaynaklar ve Öğrenci Desteği",
  "subs": [
   {
    "code": "6.1",
    "text": "Programın fiziksel, dijital ve teknolojik öğrenme altyapısı program amaçlarıyla uyumludur.",
    "mandatory": null,
    "rubric": [
     "B.3.1"
    ],
    "indicators": [
     "Programın derslik, laboratuvar, atölye, klinik, stüdyo, uygulama alanı, bilgisayar altyapısı ve dijital öğrenme ortamları programın amaçları ve öğrenme çıktılarını desteklemektedir.",
     "Öğrenme ortamlarının kapasitesi, donanımı ve kullanım düzeni öğrenci sayısı, ders yapısı ve uygulama gerekliliklerini karşılayacak düzeydedir."
    ],
    "evidence": "Derslik, laboratuvar, atölye, klinik ve uygulama alanı envanterleri; dijital öğrenme platformu kayıtları; teknik altyapı listeleri; kapasite bilgileri; kullanım planları; program-ders-altyapı eşleştirmeleri."
   },
   {
    "code": "6.2",
    "text": "Programın öğrenme kaynakları yeterli, güncel ve erişilebilirdir.",
    "mandatory": null,
    "rubric": [
     "B.1.3",
     "B.3.1",
     "B.3.3"
    ],
    "indicators": [
     "Program öğrencilerinin öğrenme kaynaklarına (kütüphane kaynakları, veri tabanları, özel yazılımlar, simülasyon araçları vb.) erişimi bulunmaktadır.",
     "Öğrenme kaynakları programın alanı, ders içerikleri, öğrenme çıktıları ve öğrenci ihtiyaçlarıyla ilişkilidir.",
     "Öğrenciler öğrenme kaynaklarına kampüs içinde ve uygun olduğu durumlarda çevrim içi olarak erişebilmektedir."
    ],
    "evidence": "Kütüphane kaynak listeleri, veri tabanı abonelikleri, ders materyalleri, açık ders kaynakları, yazılım lisansları, simülasyon araçları, öğrenme yönetim sistemi içerikleri, kaynak kullanım istatistikleri."
   },
   {
    "code": "6.3",
    "text": "Programın uygulamalı eğitim ortamları güvenli, yeterli ve öğrenme çıktılarıyla uyumludur. (Bu alt ölçüt uygulamalı eğitimin olduğu programlar için geçerlidir.)",
    "mandatory": null,
    "rubric": [
     "B.3.2",
     "B.3.5"
    ],
    "indicators": [
     "Laboratuvar, atölye, klinik, saha, staj, işyeri eğitimi veya benzeri uygulamalı öğrenme ortamları ilgili ders/uygulama kazanımlarıyla ilişkilendirilmiştir.",
     "Uygulamalı eğitim ortamlarında gerekli donanım, ekipman, güvenlik önlemleri ve teknik destek sağlanmaktadır.",
     "Öğrencilere uygulama ortamlarının kullanımı, güvenlik kuralları, mesleki etik ve uygulama beklentileri hakkında bilgilendirme yapılmaktadır."
    ],
    "evidence": "Uygulama alanı envanterleri, laboratuvar/atölye/klinik yönergeleri, iş sağlığı ve güvenliği belgeleri, risk değerlendirmeleri, uygulama planları, cihaz ve ekipman listeleri, staj/işyeri eğitimi protokolleri."
   },
   {
    "code": "6.4",
    "text": "Öğrenci kaynakları ve destek hizmetleri öğrenci ihtiyaçlarıyla uyumludur ve öğrenciler bu hizmetlerden düzenli olarak haberdar edilir.",
    "mandatory": null,
    "rubric": [
     "B.3.1",
     "B.3.3",
     "B.3.4"
    ],
    "indicators": [
     "Öğrenme kaynakları, destek hizmetleri, danışmanlık olanakları, kütüphane ve dijital kaynaklar hakkında bilgiler güncel, anlaşılır ve erişilebilir şekilde öğrencilere sunulmaktadır.",
     "Yeni öğrenciler ve mevcut öğrenciler destek hizmetlerine nasıl erişecekleri konusunda bilgilendirilmektedir.",
     "Program, ihtiyaç duyan öğrencileri ilgili akademik, idari, psikolojik, sosyal veya kariyer destek birimlerine yönlendirmektedir.",
     "Akademik danışmanlık ile kurum tarafından sunulan kariyer, psikolojik danışmanlık, engelli öğrenci, sosyal destek ve öğrenci işleri hizmetlerine öğrencilerin erişimi bulunmaktadır."
    ],
    "evidence": "Öğrenci el kitabı, web sayfası, oryantasyon sunumları, kütüphane/dijital kaynak eğitimleri, destek hizmet duyuruları, öğrenci bilgi sistemi duyuruları, danışmanlık bilgilendirme materyalleri, akademik danışmanlık kayıtları, kariyer merkezi hizmetleri, psikolojik danışmanlık hizmetleri, engelli öğrenci birimi kayıtları, öğrenci işleri süreçleri, destek hizmet duyuruları, yönlendirme kayıtları."
   },
   {
    "code": "6.5",
    "text": "Öğrenme ortamı farklı öğrenci profilleri için erişilebilir ve kapsayıcıdır.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "B.3.1",
     "B.3.2"
    ],
    "indicators": [
     "Fiziksel ve dijital öğrenme ortamlarının erişilebilirliği dezavantajlı gruplar, uluslararası öğrenciler ve çalışan öğrencilerin öğrenme sürecine eşit katılımını desteklemektedir.",
     "Yalnızca yabancı dilde yürütülen, uluslararası ortaklı veya uluslararası öğrenci ağırlıklı programlarda; öğrencilerin programa uyumunu ve akademik başarılarını desteklemeye yönelik gerekli izleme ve destek mekanizmaları uygulanmaktadır."
    ],
    "evidence": "Erişilebilirlik düzenlemeleri, engelli öğrenci destek kararları, uyarlanmış materyaller, altyapı erişilebilirlik belgeleri, uluslararası öğrenci destek kayıtları, esnek öğrenme düzenlemeleri, kapsayıcılık uygulamaları."
   },
   {
    "code": "6.6",
    "text": "Program, öğrenci hareketliliği süreçlerini destekleyen hizmetlere sahiptir.",
    "mandatory": null,
    "rubric": [
     "A.2.3",
     "A.3.1",
     "B.1.5"
    ],
    "indicators": [
     "Öğrencilerin ulusal ve uluslararası hareketlilik, değişim programları ve benzeri öğrenme fırsatlarına erişimini destekleyen bilgilendirme ve yönlendirme mekanizmaları bulunmaktadır.",
     "Hareketlilik veya program dışı öğrenme süreçlerine katılan öğrenciler akademik, idari ve öğrenme kaynakları bakımından desteklenmektedir."
    ],
    "evidence": "Değişim programları bilgilendirmeleri, duyuruları, hareketlilik ofisi kayıtları, öğrenim anlaşmaları, danışmanlık kayıtları, başvuru kılavuzları, hareketlilik destek belgeleri."
   }
  ]
 },
 {
  "no": 7,
  "title": "Bilgi Yönetimi ve Sürekli İyileştirme",
  "subs": [
   {
    "code": "7.1",
    "text": "Program düzeyinde karar alma süreçlerini destekleyen ilgili ve güvenilir veriler tanımlanmıştır.",
    "mandatory": null,
    "rubric": [
     "A.2.3",
     "A.3.1",
     "B.1.5"
    ],
    "indicators": [
     "Programın yönetimi ve kalite güvencesi için izlenecek temel veriler, göstergeler, bilgi kaynakları; programın amaçları, öğrenme çıktıları, öğrenci destek hizmetleri, öğrenme kaynakları ve mezun profilini de kapsayacak şekilde tanımlanmıştır.",
     "Program düzeyinde öğrenci profili, öğrenci sayıları, başarı, ilerleme, mezuniyet, terk, ders tekrarı, yatay/dikey geçiş, hareketlilik ve benzeri öğrenci yaşam döngüsü verileri kayıt altındadır.",
     "Kullanılan verilerin güncelliği, doğruluğu, bütünlüğü ve güvenilirliği için sorumluluklar ve veri kaynakları açıkça belirlenmiştir."
    ],
    "evidence": "Program göstergeleri listesi, veri yönetimi planı, gösterge kartları, yıllık program değerlendirme şablonları, öğrenci bilgi sistemi raporları."
   },
   {
    "code": "7.2",
    "text": "Program verileri düzenli olarak toplanır, analiz edilir ve yorumlanır.",
    "mandatory": null,
    "rubric": [
     "A.4.1",
     "A.4.2",
     "A.4.3",
     "B.1.5"
    ],
    "indicators": [
     "Program düzeyindeki nicel ve nitel veriler belirli aralıklarla toplanmakta ve analiz edilmektedir.",
     "Ders başarıları, öğrenci ilerlemesi, mezuniyet oranları, öğrenci iş yükü, ders değerlendirmeleri ve program memnuniyeti gibi veriler program düzeyinde değerlendirilmektedir.",
     "Veriler yalnızca raporlanmakla kalmayıp programın güçlü yönlerini, risk alanlarını ve gelişmeye açık yönlerini ortaya koyacak biçimde yorumlanmaktadır.",
     "Program verileri yıllar, dönemler, dersler ve öğrenci grupları temelinde karşılaştırmalı olarak analiz edilir; mümkün olduğunda benzer programlarla kıyaslama yapılmaktadır."
    ],
    "evidence": "Öğrenci bilgi sistemi çıktıları, ders başarı analizleri, mezuniyet/terk/ilerleme raporları, anket analizleri, odak grup raporları, danışmanlık özetleri, program değerlendirme raporları, kalite komisyonu kararları."
   },
   {
    "code": "7.3",
    "text": "Öğrenci, mezun, öğretim elemanı, işveren ve dış paydaş geri bildirimleri sistematik biçimde değerlendirilir.",
    "mandatory": null,
    "rubric": [
     "A.4.2.",
     "A.4.3. A.1.4",
     "A.2.3",
     "A.3.1",
     "B.1.5"
    ],
    "indicators": [
     "Program öğrencilerden, mezunlardan, öğretim elemanlarından, işverenlerden ve ilgili dış paydaşlardan düzenli geri bildirim almaktadır.",
     "Geri bildirimler program amaçları, müfredat, öğrenme-öğretme süreçleri, ölçme-değerlendirme, danışmanlık, öğrenme kaynakları ve destek hizmetleriyle ilişkilendirilerek analiz edilmektedir.",
     "Öğrenci memnuniyeti ve öğrenci deneyimi verileri, programın öğrenme ortamı ve destek hizmetlerinin değerlendirilmesinde kullanılmaktadır.",
     "Mezun ve işveren geri bildirimleri; programın mezun yeterliliklerinin, çalışma yaşamına hazırlığının değerlendirilmesi ve geliştirilmesinde kullanılmaktadır."
    ],
    "evidence": "Öğrenci memnuniyet anketleri, ders değerlendirme anketleri, mezun anketleri, işveren anketleri, dış paydaş görüşleri, danışma kurulu tutanakları, odak grup kayıtları, geri bildirim analiz raporları."
   },
   {
    "code": "7.4",
    "text": "Programda veriye dayalı karar alma ve program iyileştirme mekanizmaları işletilir.",
    "mandatory": null,
    "rubric": [
     "A.1.4",
     "A.2.3",
     "B.1.5"
    ],
    "indicators": [
     "Program düzeyinde toplanan ve analiz edilen veriler akademik kurullar, kalite komisyonları, danışma kurulları veya ilgili karar mekanizmalarında ele alınmaktadır.",
     "Programla ilgili kararlar; öğrenci verileri, başarı göstergeleri, paydaş geri bildirimleri ve program değerlendirme sonuçlarına dayandırılmaktadır.",
     "Veri analizlerinden hareketle program tasarımı, ders içerikleri, öğretim yöntemleri, ölçme-değerlendirme, öğrenci desteği veya kaynak kullanımı alanlarında iyileştirme kararları alınmaktadır.",
     "İyileştirme kararlarının sorumluları, takvimi, beklenen çıktıları ve izlenme biçimi tanımlanmaktadır."
    ],
    "evidence": "Kurul/komisyon toplantı tutanakları, veri analizine dayalı kararlar, iyileştirme planları, aksiyon takip tabloları, sorumluluk ve takvimlendirme kayıtları, iyileştirme uygulama kanıtları."
   },
   {
    "code": "7.5",
    "text": "Alınan iyileştirme kararlarının sonuçları izlenir ve etkililiği değerlendirilir.",
    "mandatory": null,
    "rubric": [
     "A.2.1",
     "A.3.1",
     "A.3.4"
    ],
    "indicators": [
     "Program düzeyinde gerçekleştirilen iyileştirmelerin uygulanma durumu takip edilmektedir.",
     "Yapılan iyileştirmelerin öğrenci başarısı, öğrenci memnuniyeti, ders işleyişi, mezuniyet, destek hizmetleri veya öğrenme ortamı üzerindeki etkileri değerlendirilmektedir.",
     "Önceki değerlendirme, akreditasyon, iç değerlendirme veya paydaş geri bildirimlerinden kaynaklanan gelişmeye açık alanlar için ilerleme durumu izlenmektedir.",
     "İyileştirme sonuçları ilgili iç ve dış paydaşlarla uygun şekilde paylaşılmaktadır."
    ],
    "evidence": "İyileştirme takip tabloları, faaliyet raporları, önceki/sonraki karşılaştırmalar, etki değerlendirme raporları, güncellenmiş müfredat/ders bilgi paketi örnekleri, paydaş bilgilendirme kayıtları."
   },
   {
    "code": "7.6",
    "text": "Program bilgi yönetimi süreçlerinde veri güvenliği, gizlilik ve etik ilkeler gözetilir.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "A.3.1"
    ],
    "indicators": [
     "Program düzeyinde kullanılan öğrenci, mezun, personel ve paydaş verilerinin gizliliği ve güvenliği gözetilmektedir.",
     "Anket, görüşme, odak grup, öğrenci performans verisi veya mezun izleme verileri kullanılırken etik ilkeler ve kişisel verilerin korunmasına ilişkin kurallar dikkate alınmaktadır.",
     "Program kapsamında raporlanan veriler, kişisel verilerin korunması, anonimleştirme ve ayrımcılığın önlenmesi ilkeleri doğrultusunda analiz edilmekte ve sunulmaktadır."
    ],
    "evidence": "Veri güvenliği politikaları, KVKK uyum belgeleri, yetkilendirme kayıtları, anket bilgilendirme metinleri, anonimleştirilmiş raporlar, veri erişim yetkileri, etik kurul veya ilgili izin belgeleri."
   }
  ]
 },
 {
  "no": 8,
  "title": "Kamuoyunu Bilgilendirme ve Şeffaflık",
  "subs": [
   {
    "code": "8.1",
    "text": "Program bilgileri kamuoyuna açık, doğru, güncel ve erişilebilir biçimde sunulur.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "B.1.1",
     "B.1.3"
    ],
    "indicators": [
     "Programın adı, düzeyi, süresi, öğretim dili, kontenjanı, derece türü, bağlı olduğu akademik birim ve programın genel tanıtımı kamuoyuna açık biçimde yayımlanmaktadır.",
     "Program bilgileri doğru, güncel, tutarlı ve kolay erişilebilir biçimde sunulmaktadır.",
     "Kamuoyuna sunulan bilgiler farklı hedef grupların, özellikle aday öğrenciler, mevcut öğrenciler, mezunlar ve işverenlerin ihtiyaçları dikkate alınarak düzenlenmiştir."
    ],
    "evidence": "Program web sayfası, program tanıtım metinleri, YÖKSİS bilgileri, tercih/kayıt kılavuzu bilgileri, fakülte/yüksekokul/bölüm sayfaları, güncelleme kayıtları."
   },
   {
    "code": "8.2",
    "text": "Program amaçları, öğrenme çıktıları ve yeterlilikleri açık biçimde yayımlanır.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "B.1.2",
     "B.1.4",
     "B.2.2"
    ],
    "indicators": [
     "Program amaçları, mezun profili, program öğrenme çıktıları ve kazandırılan yeterlilikler kamuoyuna açık biçimde paylaşılmaktadır.",
     "Program öğrenme çıktıları, ilgili yeterlilik düzeyi ve mezunların sahip olması beklenen bilgi, beceri ve yetkinliklerle ilişkilendirilerek sunulmaktadır.",
     "Programın mezunlara sunduğu akademik ilerleme, mesleki uygulama ve istihdam olanaklarına ilişkin bilgiler açık ve yanıltıcı olmayan biçimde yayımlanmaktadır."
    ],
    "evidence": "Program amaçları, öğrenme çıktıları, mezun profili, yeterlilikler matrisi, ders bilgi paketleri, TYÇ uyum bilgileri, program tanıtım dokümanları."
   },
   {
    "code": "8.3",
    "text": "Dersler, öğretim yöntemleri, ölçme-değerlendirme ve öğrenci iş yüküne ilişkin bilgiler erişilebilirdir.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "B.2.3",
     "B.2.4"
    ],
    "indicators": [
     "Programdaki derslerin içerikleri, ders öğrenme çıktıları, AKTS kredileri, öğrenci iş yükü, ön koşullar ve dersin program çıktılarıyla ilişkisi yayımlanmaktadır.",
     "Öğretim türü ile ölçme-değerlendirme yöntemleri öğrenciler ve ilgili paydaşlar için erişilebilir durumdadır.",
     "Ders bilgi paketleri programın güncel müfredatıyla uyumlu, anlaşılır ve düzenli olarak güncellenmiş biçimde sunulmaktadır."
    ],
    "evidence": "Ders bilgi paketleri, AKTS bilgi paketi, ders izlenceleri, ders-program çıktıları matrisi, ölçme-değerlendirme bilgileri, akademik katalog, öğrenci bilgi sistemi çıktıları."
   },
   {
    "code": "8.4",
    "text": "Öğrenme kaynakları, öğrenci destek hizmetleri ve başvuru yolları hakkında bilgi sağlanır.",
    "mandatory": null,
    "rubric": [
     "A.1.4",
     "A.1.5",
     "B.1.5"
    ],
    "indicators": [
     "Öğrencilere sunulan akademik danışmanlık, kariyer hizmetleri, psikolojik danışmanlık, engelli öğrenci desteği, kütüphane, dijital kaynaklar ve diğer destek hizmetleri hakkında bilgiler yayımlanmaktadır.",
     "Öğrenci şikâyet, itiraz, öneri ve başvuru yolları açık, görünür ve erişilebilir biçimde duyurulmaktadır.",
     "Öğrenme kaynakları ve destek hizmetlerine erişim bilgileri farklı öğrenci gruplarının ihtiyaçları dikkate alınarak sunulmaktadır."
    ],
    "evidence": "Öğrenci destek hizmetleri sayfaları, danışmanlık duyuruları, kariyer merkezi bilgileri, kütüphane ve veri tabanı tanıtımları, engelli öğrenci birimi bilgileri, destek hizmet başvuru formları."
   },
   {
    "code": "8.5",
    "text": "Programın kalite güvencesi süreçleri ve temel çıktıları kamuoyuyla uygun düzeyde paylaşılır.",
    "mandatory": null,
    "rubric": [
     "A.1.5"
    ],
    "indicators": [
     "Programın kalite güvencesi süreçleri, değerlendirme mekanizmaları, paydaş katılımı ve kalite güvencesi kapsamındaki temel çıktıları hakkında kamuoyuna bilgi sunulmaktadır.",
     "Programın akreditasyon durumu, varsa dış değerlendirme sonuçları ve kalite güvencesi süreçleri sonucunda yapılan temel iyileştirmeler uygun düzeyde yayımlanmaktadır.",
     "Kalite güvencesine ilişkin bilgiler paylaşılırken kişisel verilerin korunması, gizlilik, etik ilkeler ve yürürlükteki mevzuat hükümleri gözetilmektedir."
    ],
    "evidence": "Program kalite raporları, program değerlendirme özetleri, iç değerlendirme çıktıları, paydaş bilgilendirme metinleri, kalite komisyonu duyuruları, program iyileştirme özetleri."
   },
   {
    "code": "8.6",
    "text": "Kamuoyuna sunulan bilgiler nesnel, tutarlı ve yanıltıcı olmayan bir dille hazırlanır.",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "A.3.4"
    ],
    "indicators": [
     "Program tanıtımlarında kullanılan bilgiler doğrulanabilir, nesnel ve programın gerçek koşullarıyla uyumludur.",
     "Programın başarıları, olanakları, mezun istihdamı, akreditasyon durumu veya uluslararasılaşma bilgileri abartılı ya da yanıltıcı olmayan biçimde sunulmaktadır.",
     "Farklı platformlarda yayımlanan program bilgileri arasında tutarlılık sağlanmaktadır."
    ],
    "evidence": "Web içerik kontrol kayıtları, tanıtım materyalleri, kataloglar, sosyal medya duyuruları, kalite güvencesi kontrol listeleri, içerik onay süreçleri, güncelleme sorumlulukları."
   },
   {
    "code": "8.7",
    "text": "Kamuoyunu bilgilendirme süreçlerinin sorumlulukları ve güncelleme mekanizmaları tanımlıdır.",
    "mandatory": null,
    "rubric": [
     "A.1.5. A.1.4",
     "B.1.5",
     "B.1.6"
    ],
    "indicators": [
     "Program bilgilerinin hazırlanması, onaylanması, yayımlanması ve güncellenmesine ilişkin görev ve sorumluluklar tanımlanmıştır.",
     "Program web sayfası, ders bilgi paketleri, tanıtım materyalleri ve kamuoyu bilgilendirme içerikleri düzenli olarak gözden geçirilmektedir.",
     "Güncel olmayan, eksik veya hatalı bilgilerin düzeltilmesine yönelik işleyen bir mekanizma bulunmaktadır."
    ],
    "evidence": "Web güncelleme sorumluları, içerik onay süreçleri, güncelleme takvimleri, bölüm/program kurulu kararları, kalite komisyonu kayıtları, web sayfası güncelleme kayıtları."
   }
  ]
 },
 {
  "no": 9,
  "title": "Dış Kalite Güvencesi (Kurumsal ve/veya Program) ve Akreditasyon Döngüsü",
  "subs": [
   {
    "code": "9.1",
    "text": "Program, dış kalite güvencesi (kurumsal ve/veya program) ve akreditasyon süreçlerine ilişkin yükümlülüklerini tanımlar ve takip eder.",
    "mandatory": null,
    "rubric": [
     "A.1.4",
     "A.3.1",
     "B.1.5"
    ],
    "indicators": [
     "Program, dış kalite güvencesi (kurumsal ve/veya program) ve akreditasyon süreçlerinde kendi görev, sorumluluk, takvim, kanıt hazırlığı ve iyileştirme izleme yükümlülüklerini tanımlar ve kurumsal süreçlerle ilişkilendirir.",
     "Program, dış kalite güvencesi (kurumsal ve/veya program) süreçlerine ilişkin kurumsal ve program düzeyindeki gereklilikleri düzenli olarak takip etmektedir."
    ],
    "evidence": "Akreditasyon takvimi, dış değerlendirme süreç planı, YÖKAK başvuru ve izleme yazışmaları, program akreditasyonu kararları, iç yazışmalar, kalite komisyonu kararları."
   },
   {
    "code": "9.2",
    "text": "Program, dış değerlendirme (kurumsal ve/veya program) ve akreditasyon süreçlerine kanıta dayalı biçimde hazırlanır.",
    "mandatory": null,
    "rubric": [
     "A.1.4",
     "A.2.3",
     "B.1.5"
    ],
    "indicators": [
     "Program iç değerlendirme, öz değerlendirme veya benzeri hazırlık çalışmalarını ölçütler ve kanıtlar temelinde yürütmektedir.",
     "Dış değerlendirme (kurumsal ve/veya program) sürecinde sunulacak bilgiler, programın mevcut durumunu doğru, bütüncül ve kanıta dayalı biçimde yansıtmaktadır.",
     "Programın dış değerlendirme (kurumsal ve/veya program) hazırlık sürecine akademik personel, öğrenciler, idari/teknik personel ve ilgili paydaşlar dahil edilmektedir."
    ],
    "evidence": "Program İç Değerlendirme Raporu, öz değerlendirme raporları, kanıt dosyaları, belge listeleri, süreç takvimleri, görev dağılım tabloları, hazırlık toplantısı tutanakları."
   },
   {
    "code": "9.3",
    "text": "Dış değerlendirme (kurumsal ve/veya program) raporları, kararları ve gelişmeye açık alanlar program düzeyinde ele alınır.",
    "mandatory": null,
    "rubric": [
     "A.1.4",
     "A.2.3",
     "B.1.5"
    ],
    "indicators": [
     "Dış değerlendirme (kurumsal ve/veya program), akreditasyon, izleme veya ara değerlendirme raporlarında yer alan güçlü yönler ve gelişmeye açık alanlar programın ilgili kurulunda ele alınmaktadır.",
     "Dış değerlendirme (kurumsal ve/veya program) sonuçları programın kalite güvencesi, müfredat, öğrenme-öğretme, ölçme-değerlendirme, öğrenci desteği ve kaynak yönetimi süreçleriyle ilişkilendirilmektedir.",
     "Dış değerlendirme (kurumsal ve/veya program) bulguları yalnızca raporlanmakla kalmayıp program gelişimi için somut karar ve eylemlere dönüştürülmektedir."
    ],
    "evidence": "Dış değerlendirme (kurumsal ve/veya program) raporları, akreditasyon kararları, izleme raporları, gelişmeye açık alan listeleri, kurul/komisyon tutanakları, aksiyon planları, sorumluluk ve takvimlendirme kayıtları,eyleme geçildiğine dair kanıtlar."
   },
   {
    "code": "9.4",
    "text": "Program, dış kalite güvencesi (kurumsal ve/veya program) süreçlerinden doğan iyileştirme eylemlerini izler. (İlk defa dış değerlendirmeye giren programlar için geçerli değildir.)",
    "mandatory": null,
    "rubric": [
     "A.1.5",
     "A.4.1",
     "B.1.5"
    ],
    "indicators": [
     "Dış değerlendirme (kurumsal ve/veya program) sonucunda belirlenen gelişmeye açık alanlar için eylem planı, sorumlular, takvim ve beklenen çıktılar tanımlanmaktadır.",
     "Dış değerlendirme (kurumsal ve/veya program) sonrası alınan kararların uygulanma durumu program düzeyinde takip edilmektedir.",
     "Gerçekleştirilen iyileştirmelerin programın işleyişine, öğrenci deneyimine, öğrenme çıktılarının kazanımına veya kalite güvencesi süreçlerine etkisi değerlendirilmektedir."
    ],
    "evidence": "İyileştirme eylem planları, izleme tabloları, sorumlu birim/kişi kayıtları, faaliyet raporları, ilerleme raporları, önceki-sonraki karşılaştırmalar, güncellenmiş program belgeleri."
   }
  ]
 }
];
