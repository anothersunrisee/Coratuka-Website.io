// ========================================
// CORATUKA - Cora Quiz Database
// ========================================
// Data quiz dan materi untuk maskot Cora (Konservasi Terumbu Karang)
// 10 level dengan 3 soal per level

const quizDatabase = {
  cora: {
    mascotName: "Cora",
    mascotColor: "#FF6B9D",
    mascotImage: "/img/welcome/cora.png",
    theme: "Konservasi Terumbu Karang",
    levels: {
      level1: {
        title: "Rumah di Bawah Laut",
        subtitle: "Fungsi Terumbu Karang sebagai Habitat Utama Laut",
        focus: "Fungsi terumbu karang sebagai habitat utama laut",
        mediaType: "video",
        mediaSrc: "../../../video/CORA/Cora Lvl 1.mp4",
        content: {
          summary:
            "Visual 3D memperlihatkan berbagai biota laut yang hidup di karang, dari ikan badut hingga udang kecil.",
          detail: `Bayangkan sebuah kota bawah laut penuh warna — tempat ikan badut bermain di antara dinding karang, dan udang kecil bekerja seperti "tukang bersih-bersih" alami. Itulah terumbu karang! Mereka bukan batu mati, melainkan makhluk hidup yang membentuk rumah bagi ribuan spesies laut. Karang menjaga keseimbangan laut dan menjadi tempat lahirnya kehidupan baru. Tapi jika rumah ini rusak, seluruh kota laut ikut hancur.

<strong>Poin Utama:</strong>
• Terumbu karang = habitat bagi 25% makhluk laut
• Karang adalah hewan kecil bernama polip, bukan tumbuhan
• Menjaga karang berarti menjaga seluruh ekosistem laut

<strong>Fun Fact:</strong>
🪸 Setiap meter persegi karang bisa menampung lebih banyak kehidupan dibanding hutan hujan tropis!

<strong>Pesan Nilai Konservasi:</strong>
"Laut yang sehat dimulai dari rumah yang terjaga. Jaga karang, jaga kehidupan."`,
          keyPoints: [
            "Terumbu karang = habitat bagi 25% makhluk laut",
            "Karang adalah hewan kecil bernama polip, bukan tumbuhan",
            "Menjaga karang berarti menjaga seluruh ekosistem laut",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa fungsi utama terumbu karang bagi kehidupan laut?",
            options: [
              { label: "A", text: "Tempat ikan bersembunyi dan mencari makan" },
              { label: "B", text: "Batu mati di dasar laut" },
              { label: "C", text: "Tempat wisata saja" },
              { label: "D", text: "Dekorasi alami tanpa fungsi" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Karang bukan batu mati, tapi rumah bagi ribuan biota laut.",
              wrong:
                "💡 Coba lagi! Karang bukan batu mati, tapi rumah bagi ribuan biota laut.",
            },
          },
          {
            id: 2,
            question: "Mengapa karang disebut 'hutan hujan laut'?",
            options: [
              { label: "A", text: "Karena warnanya hijau" },
              {
                label: "B",
                text: "Karena menghasilkan oksigen dan tempat hidup banyak makhluk laut",
              },
              { label: "C", text: "Karena tumbuh di darat" },
              { label: "D", text: "Karena bisa bergerak" },
            ],
            correctAnswer: "B",
            feedback: {
              correct:
                "🎉 Tepat! Seperti hutan, karang juga menopang kehidupan.",
              wrong:
                "💡 Hmm… bukan soal warna! Seperti hutan, karang juga menopang kehidupan.",
            },
          },
          {
            id: 3,
            question: "Apa yang terjadi jika karang rusak?",
            options: [
              { label: "A", text: "Ikan akan kehilangan tempat tinggal" },
              { label: "B", text: "Laut jadi lebih indah" },
              { label: "C", text: "Tidak ada pengaruh apa-apa" },
              { label: "D", text: "Air laut berubah warna" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Saat karang rusak, ribuan biota kehilangan rumah mereka.",
              wrong:
                "💡 Oh tidak! Saat karang rusak, ribuan biota kehilangan rumah mereka.",
            },
          },
        ],
      },
      level2: {
        title: "Siapa Penghuni Karang?",
        subtitle: "Pengenalan Fauna Penghuni Karang",
        focus: "Pengenalan fauna penghuni karang",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 2.png",
        content: {
          summary:
            "Pengguna mencocokkan video dari gambar biota dengan peran mereka di ekosistem.",
          detail: `Coba intip lebih dekat! Di sela karang, ada ikan badut, bintang laut, udang pembersih, dan bahkan cumi kecil yang bersembunyi. Mereka semua punya peran — seperti warga kota yang saling membantu. Ada yang menjaga kebersihan, ada yang jadi pelindung, dan ada yang jadi penyuplai makanan. Kalau satu hilang, rantai kehidupan terganggu.

<strong>Poin Utama:</strong>
• Setiap biota punya peran dalam ekosistem
• Keseimbangan laut bergantung pada keberagaman
• Menyentuh atau mengambil satu biota bisa mengganggu sistem alami

<strong>Fun Fact:</strong>
🪸 Ikan badut hanya bisa hidup di anemon tertentu karena mereka punya "pelindung lendir" unik di tubuhnya.

<strong>Pesan Nilai Konservasi:</strong>
"Kenali penghuninya, hormati ruang hidupnya."`,
          keyPoints: [
            "Setiap biota punya peran dalam ekosistem",
            "Keseimbangan laut bergantung pada keberagaman",
            "Menyentuh atau mengambil satu biota bisa mengganggu sistem alami",
          ],
        },
        questions: [
          {
            id: 1,
            question:
              "Mengapa ikan badut bisa hidup aman di antara anemon laut?",
            options: [
              { label: "A", text: "Karena tubuhnya dilapisi lendir pelindung" },
              { label: "B", text: "Karena anemon takut pada ikan" },
              { label: "C", text: "Karena ikan badut bisa menggigit" },
              { label: "D", text: "Karena anemon adalah tanaman" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Ikan badut punya lapisan lendir khusus agar tidak tersengat.",
              wrong:
                "💡 Perhatikan! Ikan badut punya lapisan lendir khusus agar tidak tersengat.",
            },
          },
          {
            id: 2,
            question: "Apa peran udang pembersih di ekosistem karang?",
            options: [
              { label: "A", text: "Membersihkan parasit di tubuh ikan lain" },
              { label: "B", text: "Memakan telur ikan" },
              { label: "C", text: "Menyembunyikan diri dari predator" },
              { label: "D", text: "Merusak karang" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Udang pembersih justru seperti 'dokter laut' yang menjaga kesehatan ikan.",
              wrong:
                "💡 Coba lagi! Udang pembersih justru seperti 'dokter laut' yang menjaga kesehatan ikan.",
            },
          },
          {
            id: 3,
            question: "Apa yang terjadi jika satu spesies di karang hilang?",
            options: [
              { label: "A", text: "Ekosistem jadi tidak seimbang" },
              { label: "B", text: "Laut tetap sama" },
              { label: "C", text: "Air jadi lebih jernih" },
              { label: "D", text: "Karang tumbuh lebih cepat" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Semua makhluk laut saling terhubung, kehilangan satu bisa mengganggu semuanya.",
              wrong:
                "💡 Ingat! Semua makhluk laut saling terhubung, kehilangan satu bisa mengganggu semuanya.",
            },
          },
        ],
      },
      level3: {
        title: "Karang Sehat vs Karang Sakit",
        subtitle: "Membedakan Kondisi Karang",
        focus: "Membedakan kondisi karang",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 3.png",
        content: {
          summary:
            "Bandingkan karang sehat, rusak, dan bleaching dengan animasi warna kontras.",
          detail: `Cora ingin menunjukkan dua pemandangan laut. Di satu sisi, karang berwarna cerah, penuh ikan — itulah karang sehat! Di sisi lain, karang memutih dan sunyi… itulah karang yang stres. Saat suhu laut naik atau air tercemar, alga yang memberi warna pada karang pergi, meninggalkan karang pucat dan rapuh.

<strong>Poin Utama:</strong>
• Warna cerah = karang sehat; putih pucat = bleaching
• Bleaching terjadi karena panas atau polusi
• Karang bisa pulih jika lingkungan kembali stabil

<strong>Fun Fact:</strong>
🪸 Karang yang "memutih" bukan mati, tapi sedang berjuang untuk bertahan hidup!

<strong>Pesan Nilai Konservasi:</strong>
"Bantu karang tetap berwarna — kurangi panas dan polusi laut."`,
          keyPoints: [
            "Warna cerah = karang sehat; putih pucat = bleaching",
            "Bleaching terjadi karena panas atau polusi",
            "Karang bisa pulih jika lingkungan kembali stabil",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa tanda karang yang sedang mengalami bleaching?",
            options: [
              { label: "A", text: "Warnanya memutih" },
              { label: "B", text: "Banyak ikan datang" },
              { label: "C", text: "Tumbuh lebih cepat" },
              { label: "D", text: "Mengeluarkan gelembung" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Karang putih bukan indah — itu tanda mereka kehilangan alga sahabatnya!",
              wrong:
                "💡 Karang putih bukan indah — itu tanda mereka kehilangan alga sahabatnya!",
            },
          },
          {
            id: 2,
            question: "Apa penyebab utama karang mengalami bleaching?",
            options: [
              { label: "A", text: "Kenaikan suhu laut dan polusi" },
              { label: "B", text: "Air laut yang dingin" },
              { label: "C", text: "Kurangnya cahaya" },
              { label: "D", text: "Banyak wisatawan berfoto" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Suhu panas membuat alga penyuplai makanan karang pergi.",
              wrong:
                "💡 Perhatikan! Suhu panas membuat alga penyuplai makanan karang pergi.",
            },
          },
          {
            id: 3,
            question: "Bagaimana cara membantu karang pulih?",
            options: [
              { label: "A", text: "Menjaga laut tetap bersih dan sejuk" },
              { label: "B", text: "Memutihkan karang biar seragam" },
              { label: "C", text: "Menyentuhnya supaya tidak kesepian" },
              { label: "D", text: "Membuang sampah ke laut" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Karang butuh lingkungan sehat, bukan sentuhan manusia.",
              wrong:
                "💡 Ups! Karang butuh lingkungan sehat, bukan sentuhan manusia.",
            },
          },
        ],
      },
      level4: {
        title: "Bahaya Sentuhan Kecil",
        subtitle: "Dampak Aktivitas Manusia di Laut",
        focus: "Dampak aktivitas manusia di laut",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 4.png",
        content: {
          summary:
            "Ilustrasi turis yang tanpa sengaja merusak karang dengan menyentuh atau menginjaknya.",
          detail: `Kadang tanpa sadar, wisatawan menginjak atau menyentuh karang saat snorkeling. Padahal, satu sentuhan kecil bisa mematahkan karang muda yang butuh bertahun-tahun untuk tumbuh! Bayangkan menyentuh sayap kupu-kupu — halus dan mudah rusak, begitulah karang di laut.

<strong>Poin Utama:</strong>
• Karang sangat rapuh dan tumbuh sangat lambat
• Hindari berdiri, menyentuh, atau memegang biota laut
• Gunakan pelampung atau fin dengan hati-hati

<strong>Fun Fact:</strong>
🪸 Beberapa karang hanya tumbuh 1 cm per tahun!

<strong>Pesan Nilai Konservasi:</strong>
"Sentuhan kecil bisa berakibat besar. Nikmati laut tanpa menyakitinya."`,
          keyPoints: [
            "Karang sangat rapuh dan tumbuh sangat lambat",
            "Hindari berdiri, menyentuh, atau memegang biota laut",
            "Gunakan pelampung atau fin dengan hati-hati",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa tidak boleh menyentuh karang saat snorkeling?",
            options: [
              { label: "A", text: "Karena karang rapuh dan bisa rusak" },
              { label: "B", text: "Karena licin" },
              { label: "C", text: "Karena bisa menyengat" },
              { label: "D", text: "Karena dilarang oleh penjaga pantai" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Sentuhan kecil bisa mematahkan karang muda yang tumbuh bertahun-tahun.",
              wrong:
                "💡 Sentuhan kecil bisa mematahkan karang muda yang tumbuh bertahun-tahun.",
            },
          },
          {
            id: 2,
            question:
              "Apa yang bisa dilakukan agar tidak menyentuh karang secara tidak sengaja?",
            options: [
              { label: "A", text: "Gunakan pelampung atau jaga jarak aman" },
              { label: "B", text: "Menyelam lebih dalam" },
              { label: "C", text: "Berdiri di atas karang" },
              { label: "D", text: "Menyentuh cepat-cepat" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Lebih baik melayang di air agar karang tetap aman.",
              wrong:
                "💡 Ingat! Lebih baik melayang di air agar karang tetap aman.",
            },
          },
          {
            id: 3,
            question: "Apa akibat dari karang yang patah?",
            options: [
              { label: "A", text: "Biota laut kehilangan tempat tinggal" },
              { label: "B", text: "Karang tumbuh lebih cepat" },
              { label: "C", text: "Laut jadi lebih biru" },
              { label: "D", text: "Tidak terjadi apa-apa" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Karang rusak = ekosistem terganggu. Satu patah bisa berdampak besar!",
              wrong:
                "💡 Karang rusak = ekosistem terganggu. Satu patah bisa berdampak besar!",
            },
          },
        ],
      },
      level5: {
        title: "Cahaya dan Suhu Laut",
        subtitle: "Faktor Lingkungan Terhadap Kesehatan Karang",
        focus: "Faktor lingkungan terhadap kesehatan karang",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 5.png",
        content: {
          summary:
            "Slider suhu menunjukkan efek 'stress' dan bleaching karang.",
          detail: `Seperti tanaman yang butuh sinar, karang juga hidup berdampingan dengan alga kecil bernama zooxanthellae. Alga ini memberi makanan dan warna bagi karang. Tapi saat laut terlalu panas, mereka pergi. Karang kehilangan warnanya dan kelaparan. Laut yang lebih panas = karang yang kesepian.

<strong>Poin Utama:</strong>
• Karang butuh suhu 25–29°C untuk bertahan
• Kenaikan suhu laut menyebabkan bleaching
• Pemanasan global = ancaman utama bagi karang

<strong>Fun Fact:</strong>
🪸 Satu derajat panas lebih tinggi bisa membuat ribuan km karang memutih!

<strong>Pesan Nilai Konservasi:</strong>
"Dari rumah ke laut, kurangi panas bumi — demi karang yang tetap berwarna."`,
          keyPoints: [
            "Karang butuh suhu 25–29°C untuk bertahan",
            "Kenaikan suhu laut menyebabkan bleaching",
            "Pemanasan global = ancaman utama bagi karang",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa hubungan suhu laut dengan warna karang?",
            options: [
              { label: "A", text: "Laut terlalu panas membuat karang memutih" },
              { label: "B", text: "Suhu tidak berpengaruh" },
              { label: "C", text: "Air dingin membuat karang terbakar" },
              { label: "D", text: "Panas membuat karang berwarna cerah" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Saat laut terlalu panas, alga sahabat karang pergi, warnanya pun hilang.",
              wrong:
                "💡 Saat laut terlalu panas, alga sahabat karang pergi, warnanya pun hilang.",
            },
          },
          {
            id: 2,
            question: "Alga kecil di karang bernama...",
            options: [
              { label: "A", text: "Zooxanthellae" },
              { label: "B", text: "Mikroplastik" },
              { label: "C", text: "Plankton merah" },
              { label: "D", text: "Fitoplankton" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Alga kecil ini adalah sahabat karang yang memberi warna dan makanan.",
              wrong:
                "💡 Coba ingat! Alga kecil ini adalah sahabat karang yang memberi warna dan makanan.",
            },
          },
          {
            id: 3,
            question:
              "Apa yang bisa kamu lakukan untuk membantu laut tetap sejuk?",
            options: [
              { label: "A", text: "Kurangi jejak karbon dan plastik" },
              { label: "B", text: "Gunakan AC terus menerus" },
              { label: "C", text: "Buang limbah ke laut" },
              { label: "D", text: "Naik kendaraan pribadi ke pantai" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Semakin sedikit polusi, semakin bahagia karangmu.",
              wrong:
                "💡 Ingat! Semakin sedikit polusi, semakin bahagia karangmu.",
            },
          },
        ],
      },
      level6: {
        title: "Peran Manusia di Laut",
        subtitle: "Dampak Aktivitas Manusia Terhadap Ekosistem",
        focus: "Dampak aktivitas manusia terhadap ekosistem",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 6.png",
        content: {
          summary:
            "Peta interaktif menjelaskan polusi, pembuangan limbah, dan penangkapan ikan berlebih.",
          detail: `Pernah lihat sampah plastik di pantai? Atau limbah yang mengalir ke laut? Semua itu berdampak pada karang dan makhluk laut lainnya. Tapi manusia juga bisa jadi pahlawan: mengurangi plastik, menanam karang, atau sekadar berbagi pengetahuan. Pilihan kecilmu menentukan masa depan laut.

<strong>Poin Utama:</strong>
• Aktivitas manusia = ancaman sekaligus harapan
• Polusi dan overfishing merusak keseimbangan laut
• Edukasi & aksi nyata bisa menyelamatkan karang

<strong>Fun Fact:</strong>
🪸 70% oksigen di bumi berasal dari laut, bukan dari hutan!

<strong>Pesan Nilai Konservasi:</strong>
"Jadilah bagian dari solusi, bukan polusi."`,
          keyPoints: [
            "Aktivitas manusia = ancaman sekaligus harapan",
            "Polusi dan overfishing merusak keseimbangan laut",
            "Edukasi & aksi nyata bisa menyelamatkan karang",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Bagaimana manusia bisa merusak laut tanpa sadar?",
            options: [
              { label: "A", text: "Membuang sampah dan limbah ke laut" },
              { label: "B", text: "Tidur di pantai" },
              { label: "C", text: "Menonton sunset" },
              { label: "D", text: "Makan ikan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Sampah kecil pun bisa sampai ke laut dan merusak ekosistem.",
              wrong:
                "💡 Sampah kecil pun bisa sampai ke laut dan merusak ekosistem.",
            },
          },
          {
            id: 2,
            question: "Apa cara mudah jadi pahlawan laut?",
            options: [
              { label: "A", text: "Kurangi plastik dan dukung konservasi" },
              { label: "B", text: "Gunakan sedotan plastik" },
              { label: "C", text: "Ambil karang untuk hiasan" },
              { label: "D", text: "Buang limbah ke sungai" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Pahlawan laut tak butuh jubah — cukup kesadaran kecil setiap hari!",
              wrong:
                "💡 Pahlawan laut tak butuh jubah — cukup kesadaran kecil setiap hari!",
            },
          },
          {
            id: 3,
            question: "Siapa yang bisa menjaga laut?",
            options: [
              { label: "A", text: "Semua orang" },
              { label: "B", text: "Hanya penyelam" },
              { label: "C", text: "Hanya pemerintah" },
              { label: "D", text: "Hanya nelayan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Setiap orang punya peran, sekecil apapun.",
              wrong: "💡 Setiap orang punya peran, sekecil apapun.",
            },
          },
        ],
      },
      level7: {
        title: "Coral Rescue!",
        subtitle: "Edukasi Transplantasi Karang",
        focus: "Edukasi transplantasi karang",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 7.png",
        content: {
          summary:
            "Pengguna melihat penanaman karang buatan dan melihat proses tumbuhnya.",
          detail: `Cora mengajakmu jadi penyelamat karang! Bayangkan kamu menanam potongan karang kecil di dasar laut, dan beberapa bulan kemudian, karang itu tumbuh jadi rumah baru bagi ikan-ikan. Transplantasi karang adalah cara ilmiah untuk menghidupkan kembali laut yang rusak.

<strong>Poin Utama:</strong>
• Transplantasi = menanam karang baru dari potongan sehat
• Teknik sederhana tapi berdampak besar
• Siapa pun bisa ikut konservasi karang!

<strong>Fun Fact:</strong>
🪸 Beberapa program konservasi mengizinkan wisatawan ikut menanam karang dan menamai "karang adopsi" mereka sendiri.

<strong>Pesan Nilai Konservasi:</strong>
"Menanam satu karang hari ini, berarti menumbuhkan kehidupan esok hari."`,
          keyPoints: [
            "Transplantasi = menanam karang baru dari potongan sehat",
            "Teknik sederhana tapi berdampak besar",
            "Siapa pun bisa ikut konservasi karang!",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa itu transplantasi karang?",
            options: [
              { label: "A", text: "Menanam potongan karang baru di laut" },
              { label: "B", text: "Mengecat karang agar berwarna" },
              { label: "C", text: "Menjual karang ke turis" },
              { label: "D", text: "Memindahkan ikan ke akuarium" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Transplantasi = membantu karang tumbuh kembali di laut.",
              wrong:
                "💡 Transplantasi = membantu karang tumbuh kembali di laut.",
            },
          },
          {
            id: 2,
            question: "Siapa yang bisa ikut kegiatan transplantasi karang?",
            options: [
              { label: "A", text: "Siapa saja dengan panduan konservator" },
              { label: "B", text: "Hanya ilmuwan" },
              { label: "C", text: "Hanya nelayan" },
              { label: "D", text: "Hanya penyelam profesional" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Semua bisa ikut, asal dengan cara aman dan edukatif!",
              wrong: "💡 Semua bisa ikut, asal dengan cara aman dan edukatif!",
            },
          },
          {
            id: 3,
            question: "Apa manfaat menanam karang baru?",
            options: [
              { label: "A", text: "Menghidupkan kembali ekosistem laut" },
              { label: "B", text: "Menambah warna laut" },
              { label: "C", text: "Untuk dekorasi bawah air" },
              { label: "D", text: "Sebagai atraksi wisata" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Menanam karang = menumbuhkan kehidupan baru di laut!",
              wrong: "💡 Menanam karang = menumbuhkan kehidupan baru di laut!",
            },
          },
        ],
      },
      level8: {
        title: "Kolaborasi Komunitas",
        subtitle: "Aksi Nyata Konservasi Karang",
        focus: "Aksi nyata konservasi karang",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 8.png",
        content: {
          summary:
            "Kisah nyata komunitas penyelam lokal yang menyelamatkan karang di Indonesia.",
          detail: `Di berbagai pesisir Indonesia, komunitas lokal bekerja sama menjaga karang. Ada yang membuat media tanam buatan, ada pula yang mengedukasi wisatawan. Kolaborasi manusia-lokal-lingkungan adalah kunci keberlanjutan. Cora percaya, laut sehat dimulai dari komunitas yang peduli.

<strong>Poin Utama:</strong>
• Komunitas lokal = garda depan konservasi
• Kolaborasi memberi dampak nyata & berkelanjutan
• Setiap orang bisa berperan sesuai kemampuannya

<strong>Fun Fact:</strong>
🪸 Beberapa desa di Bali memiliki "Bank Karang" — warga menanam karang seperti menabung masa depan laut!

<strong>Pesan Nilai Konservasi:</strong>
"Sendiri kita bisa sedikit, bersama kita bisa menyelamatkan laut."`,
          keyPoints: [
            "Komunitas lokal = garda depan konservasi",
            "Kolaborasi memberi dampak nyata & berkelanjutan",
            "Setiap orang bisa berperan sesuai kemampuannya",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa komunitas lokal penting dalam konservasi laut?",
            options: [
              {
                label: "A",
                text: "Karena mereka tinggal dekat dan tahu kondisi laut",
              },
              { label: "B", text: "Karena suka berenang" },
              { label: "C", text: "Karena hobi memancing" },
              { label: "D", text: "Karena diwajibkan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Komunitas lokal tahu cara terbaik menjaga laut di wilayahnya.",
              wrong:
                "💡 Komunitas lokal tahu cara terbaik menjaga laut di wilayahnya.",
            },
          },
          {
            id: 2,
            question: "Apa bentuk kolaborasi sederhana untuk menjaga karang?",
            options: [
              { label: "A", text: "Ikut bersih pantai dan edukasi wisatawan" },
              { label: "B", text: "Menjual pasir laut" },
              { label: "C", text: "Membangun hotel di pesisir" },
              { label: "D", text: "Memancing di zona karang" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Kolaborasi = kerja bareng, bukan merusak alam!",
              wrong: "💡 Kolaborasi = kerja bareng, bukan merusak alam!",
            },
          },
          {
            id: 3,
            question: "Apa hasil dari kerja sama manusia dan alam?",
            options: [
              { label: "A", text: "Laut yang sehat dan berkelanjutan" },
              { label: "B", text: "Laut penuh sampah" },
              { label: "C", text: "Karang makin rusak" },
              { label: "D", text: "Ikan berkurang" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Kerja sama manusia dan alam menciptakan keseimbangan.",
              wrong: "💡 Kerja sama manusia dan alam menciptakan keseimbangan.",
            },
          },
        ],
      },
      level9: {
        title: "Karang Putih Bukan Indah",
        subtitle: "Mengoreksi Mitos Karang Putih",
        focus: "Mengoreksi mitos karang putih",
        mediaType: "image",
        mediaSrc: "../../../video/CORA/Cora lvl 9.png",
        content: {
          summary:
            "Karang putih bukan indah, tapi tanda bleaching! Kuis menantang user menebak mana karang sehat.",
          detail: `Saat melihat laut jernih dan karang putih, mungkin terlihat cantik. Tapi Cora bilang: hati-hati, itu tanda bahaya! Karang yang memutih berarti kehilangan alga sahabatnya — mereka sedang sekarat. Jangan tertipu keindahan semu. Laut indah justru penuh warna alami.

<strong>Poin Utama:</strong>
• Warna putih = tanda bleaching, bukan keindahan
• Bleaching = reaksi karang terhadap stres lingkungan
• Keindahan laut sejati adalah keberagaman warnanya

<strong>Fun Fact:</strong>
🪸 Setelah bleaching parah, karang butuh waktu 10 tahun untuk pulih!

<strong>Pesan Nilai Konservasi:</strong>
"Jangan hanya kagum pada warna putih — kagumilah laut yang hidup dan berwarna."`,
          keyPoints: [
            "Warna putih = tanda bleaching, bukan keindahan",
            "Bleaching = reaksi karang terhadap stres lingkungan",
            "Keindahan laut sejati adalah keberagaman warnanya",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa karang putih belum tentu indah?",
            options: [
              { label: "A", text: "Karena tanda bleaching" },
              { label: "B", text: "Karena warnanya membosankan" },
              { label: "C", text: "Karena jarang difoto" },
              { label: "D", text: "Karena tidak ada ikan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Karang putih artinya sedang sakit, bukan cantik!",
              wrong: "💡 Karang putih artinya sedang sakit, bukan cantik!",
            },
          },
          {
            id: 2,
            question: "Apa yang menyebabkan bleaching pada karang?",
            options: [
              { label: "A", text: "Panas berlebih dan pencemaran air" },
              { label: "B", text: "Cahaya bulan" },
              { label: "C", text: "Gelombang tinggi" },
              { label: "D", text: "Kurang pasir" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Bleaching = stres karena laut terlalu panas atau kotor.",
              wrong:
                "💡 Bleaching = stres karena laut terlalu panas atau kotor.",
            },
          },
          {
            id: 3,
            question: "Bagaimana caramu membantu karang tetap berwarna?",
            options: [
              { label: "A", text: "Kurangi polusi dan jaga suhu laut" },
              { label: "B", text: "Tambah lampu bawah laut" },
              { label: "C", text: "Sentuh karang agar kuat" },
              { label: "D", text: "Gunakan sabun di laut" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Karang suka laut yang sejuk dan bersih.",
              wrong:
                "💡 Jangan ditambah cahaya! Karang suka laut yang sejuk dan bersih.",
            },
          },
        ],
      },
      level10: {
        title: "Karang Masa Depan",
        subtitle: "Aksi Kecil yang Bisa Dilakukan",
        focus: "Aksi kecil yang bisa dilakukan",
        mediaType: "video",
        mediaSrc: "../../../video/CORA/Cora Lvl 10.mp4",
        content: {
          summary:
            "Pengguna memilih langkah nyata yang bisa dilakukan (hemat plastik, snorkeling sadar).",
          detail: `Cora menutup perjalananmu dengan satu pertanyaan: "Laut seperti apa yang ingin kamu wariskan?" Karang masa depan bergantung pada pilihan kita hari ini — dari cara liburan, penggunaan plastik, hingga dukungan terhadap komunitas konservasi. Laut bukan sekadar pemandangan, tapi warisan hidup.

<strong>Poin Utama:</strong>
• Masa depan laut bergantung pada aksi kecil manusia
• Setiap keputusan berdampak pada ekosistem laut
• Edukasi dan kebiasaan baik menjaga keberlanjutan

<strong>Fun Fact:</strong>
🪸 Beberapa karang bisa hidup lebih dari 4.000 tahun — lebih tua dari piramida Mesir!

<strong>Pesan Nilai Konservasi:</strong>
"Jaga laut hari ini, agar masa depan tetap berwarna biru."`,
          keyPoints: [
            "Masa depan laut bergantung pada aksi kecil manusia",
            "Setiap keputusan berdampak pada ekosistem laut",
            "Edukasi dan kebiasaan baik menjaga keberlanjutan",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Siapa yang menentukan masa depan karang?",
            options: [
              { label: "A", text: "Kita semua" },
              { label: "B", text: "Hanya ilmuwan" },
              { label: "C", text: "Hanya nelayan" },
              { label: "D", text: "Hanya pemerintah" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Laut masa depan tergantung pada pilihan kecil kita hari ini!",
              wrong:
                "💡 Laut masa depan tergantung pada pilihan kecil kita hari ini!",
            },
          },
          {
            id: 2,
            question: "Apa kebiasaan kecil yang bisa bantu laut tetap sehat?",
            options: [
              { label: "A", text: "Kurangi plastik dan dukung konservasi" },
              { label: "B", text: "Buang sampah di sungai" },
              { label: "C", text: "Ambil karang untuk hiasan" },
              { label: "D", text: "Pakai sabun di laut" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Mulai dari rumah! Kebiasaan kecil berdampak besar.",
              wrong: "💡 Mulai dari rumah! Kebiasaan kecil berdampak besar.",
            },
          },
          {
            id: 3,
            question: "Mengapa laut penting bagi manusia?",
            options: [
              { label: "A", text: "Memberi oksigen dan kehidupan" },
              { label: "B", text: "Hanya untuk berenang" },
              { label: "C", text: "Sebagai pemandangan" },
              { label: "D", text: "Untuk menenggelamkan sampah" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Tanpa laut, kita pun kesulitan bernapas — 70% oksigen berasal dari sana!",
              wrong:
                "💡 Tanpa laut, kita pun kesulitan bernapas — 70% oksigen berasal dari sana!",
            },
          },
        ],
      },
    },
  },
};

// ========================================
// HELPER FUNCTIONS
// ========================================

function getLevelData(mascotId, levelNumber) {
  const mascotData = quizDatabase[mascotId];
  return mascotData?.levels[`level${levelNumber}`];
}

function getCompletedLevels(mascotId) {
  const progress = JSON.parse(
    localStorage.getItem(`${mascotId}_progress`) || "{}"
  );
  return Object.keys(progress).length;
}

function saveLevelProgress(mascotId, levelNumber, stars, score) {
  const progressKey = `${mascotId}_progress`;
  const progress = JSON.parse(localStorage.getItem(progressKey) || "{}");
  progress[`level${levelNumber}`] = {
    stars: stars,
    score: score,
    completedAt: new Date().toISOString(),
  };
  localStorage.setItem(progressKey, JSON.stringify(progress));
}

function getLevelStars(mascotId, levelNumber) {
  const progress = JSON.parse(
    localStorage.getItem(`${mascotId}_progress`) || "{}"
  );
  return progress[`level${levelNumber}`]?.stars || 0;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    quizDatabase,
    getLevelData,
    getCompletedLevels,
    saveLevelProgress,
    getLevelStars,
  };
}
