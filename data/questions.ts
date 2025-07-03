export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Ben hangi şehirde doğdum?",
    options: ["Ankara", "İzmir", "İstanbul", "Eskişehir"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Şu anda hangi şehirde yaşıyorum?",
    options: ["İzmir", "İstanbul", "Ankara", "Bursa"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Liseyi nerede okudum?",
    options: ["Ankara", "İzmir", "İstanbul", "Kayseri"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Üniversiteye ilk nerede başladım?",
    options: ["ODTÜ", "Hacettepe", "İstanbul Üniversitesi", "Ankara Üniversitesi"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Şu an hangi üniversitede okuyorum?",
    options: ["İstanbul Üniversitesi", "Bilkent", "Ankara Üniversitesi", "Galatasaray"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Hangi bölümü okuyorum?",
    options: ["Siyaset Bilimi", "Uluslararası İlişkiler", "Halkla İlişkiler", "İktisat"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "İngilizce seviyem nedir?",
    options: ["B2", "C2", "C1", "A2"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Daha önce hangi alanlarda staj yaptım?",
    options: ["Yalnızca satış", "Sadece pazarlama", "Satış, iş geliştirme ve idari işler", "Yazılım"],
    correctAnswer: 2
  },
  {
    id: 9,
    question: "Şu alanda asla staj yapmadım:",
    options: ["İdari işler", "İş geliştirme", "Satış", "Veterinerlik"],
    correctAnswer: 3
  },
  {
    id: 10,
    question: "Hangisi benim ilgi alanımda değildir?",
    options: ["Tiyatro", "Çizim", "Seramik", "Dalgıçlık"],
    correctAnswer: 3
  },
  {
    id: 11,
    question: "Hangi dilde biri bana \"Hola, ¿cómo estás?\" derse anlarım ama cevap veremem?",
    options: ["Fransızca", "İspanyolca", "İtalyanca", "Yunanca"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "İş arkadaşlarım beni nasıl tanımlar?",
    options: ["Sessiz", "Disiplinli", "Yaratıcı", "Yavaş ama kararlı"],
    correctAnswer: 2
  },
  {
    id: 13,
    question: "Benimle çalışmak isteyen biri ne beklemeli?",
    options: ["Yüksek disiplin", "Tembellik", "Başarısızlık", "Sessizlik ve geri planda kalmak"],
    correctAnswer: 0
  },
  {
    id: 14,
    question: "Grup çalışmalarında nasılımdır?",
    options: ["Sadece dinlerim", "Görev dağıtır, sonra yok olurum", "Sessizce her şeyi yaparım", "Hem fikir üretir hem uygulamaya geçerim"],
    correctAnswer: 3
  },
  {
    id: 15,
    question: "Hangi durumda \"bu işi çözerim\" diyebilirim?",
    options: ["Brief yoksa", "Zaman darsa", "Herkes panikse", "Hepsi"],
    correctAnswer: 3
  },
  {
    id: 16,
    question: "Daha önce hangi alanda staj yapmadım ama yapmış gibi soru gelince anlatırım?",
    options: ["Satış ve Pazarlama", "İş Geliştirme", "İdari işler", "Yazılım geliştirme"],
    correctAnswer: 3
  },
  {
    id: 17,
    question: "En çok hangi tip görevleri severim?",
    options: ["Karmaşık ama anlamlı olanları", "Herkesin korktuğu ama çözülür olanları", "Görselle birleştirilmiş fikir isteyenleri", "Hepsi"],
    correctAnswer: 3
  },
  {
    id: 18,
    question: "İş dağılımında benden uzak tutulan şey nedir?",
    options: ["Sunum taslağı", "Zor metin yazımı", "Rapor düzenleme", "Tembellik"],
    correctAnswer: 3
  },
  {
    id: 19,
    question: "Aşağıdakilerden hangisini hâlâ kullanmayı bilmiyorum (ama öğrenmek istiyorum)?",
    options: ["Excel", "PowerPoint", "Cursor", "Photoshop"],
    correctAnswer: 3
  },
  {
    id: 20,
    question: "Bu testi bitiren biri ilk olarak ne der?",
    options: ["Buna gerçekten gerek var mıydı?"],
    correctAnswer: 0
  }
]; 