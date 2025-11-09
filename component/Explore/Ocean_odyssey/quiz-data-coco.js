// ========================================
// CORATUKA - Coco Quiz Database
// ========================================
// Data quiz dan materi untuk maskot Coco (Wisata Pantai Berkelanjutan)
// 10 level dengan 3 soal per level

const quizDatabase = {
  coco: {
    mascotName: "Coco",
    mascotColor: "#FF9F45",
    mascotImage: "/img/welcome/coco.png",
    theme: "Wisata Pantai Berkelanjutan",
    levels: {
      level1: {
        title: "Liburan Ramah Laut",
        subtitle: "Prinsip Wisata Berkelanjutan",
        focus: "Prinsip wisata berkelanjutan",
        mediaType: "video",
        mediaSrc: "../../../video/COCO/Coco Lvl 1.mp4",
        content: {
          summary:
            "User melihat contoh gaya liburan yang lebih hijau – lokal, hemat energi, minim sampah.",
          detail: `Coco mengajakmu merencanakan liburan — tapi bukan liburan biasa! Di sini, kamu akan belajar menjadi wisatawan yang bersahabat dengan laut. Pilih penginapan yang hemat energi, hindari plastik sekali pakai, dan dukung produk lokal. Liburan yang menyenangkan bukan hanya soal foto indah, tapi juga tentang meninggalkan jejak baik bagi alam.

<strong>Poin Utama:</strong>
• Wisata berkelanjutan = senang + bertanggung jawab
• Pilihan kecil (air, listrik, sampah) berdampak besar
• Nikmati laut tanpa merusaknya

<strong>Fun Fact:</strong>
🦀 Wisatawan "hijau" rata-rata menghemat 30% lebih banyak energi saat liburan!

<strong>Pesan Nilai Konservasi:</strong>
"Liburan terbaik adalah yang membuat alam tetap tersenyum."`,
          keyPoints: [
            "Wisata berkelanjutan = senang + bertanggung jawab",
            "Pilihan kecil (air, listrik, sampah) berdampak besar",
            "Nikmati laut tanpa merusaknya",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa contoh perilaku wisata ramah laut?",
            options: [
              { label: "A", text: "Menggunakan botol minum sendiri" },
              { label: "B", text: "Membuang sampah di pasir" },
              { label: "C", text: "Naik perahu bermesin besar tiap hari" },
              { label: "D", text: "Membeli banyak plastik sekali pakai" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Gunakan botol isi ulang untuk mengurangi sampah laut!",
              wrong: "💡 Gunakan botol isi ulang untuk mengurangi sampah laut!",
            },
          },
          {
            id: 2,
            question: "Mengapa memilih penginapan hemat energi itu penting?",
            options: [
              { label: "A", text: "Mengurangi emisi karbon dari listrik" },
              { label: "B", text: "Agar dapat diskon" },
              { label: "C", text: "Karena lebih mewah" },
              { label: "D", text: "Supaya tidak perlu AC" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Energi boros = karbon tinggi = laut makin panas.",
              wrong: "💡 Energi boros = karbon tinggi = laut makin panas.",
            },
          },
          {
            id: 3,
            question: "Apa arti liburan berkelanjutan?",
            options: [
              {
                label: "A",
                text: "Liburan yang menyenangkan tanpa merusak alam",
              },
              { label: "B", text: "Liburan setiap bulan" },
              { label: "C", text: "Liburan tanpa keluar rumah" },
              { label: "D", text: "Liburan dengan biaya mahal" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Liburan berkelanjutan = senang, sadar, dan bertanggung jawab!",
              wrong:
                "💡 Liburan berkelanjutan = senang, sadar, dan bertanggung jawab!",
            },
          },
        ],
      },
      level2: {
        title: "Pantai Tanpa Plastik",
        subtitle: "Dampak Sampah Terhadap Laut",
        focus: "Dampak sampah terhadap laut",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 2.png",
        content: {
          summary:
            "Menunjukkan perjalanan plastik dari pantai hingga ke lambung ikan.",
          detail: `Bayangkan pantai putih tanpa sampah berserakan. Indah, bukan? Tapi kenyataannya, jutaan ton plastik berakhir di laut setiap tahun. Kantong, sedotan, botol — semua bisa melukai penyu dan ikan. Coco mengajakmu jadi pahlawan kecil: bawa botol sendiri, tolak sedotan, dan pilah sampah dengan bijak.

<strong>Poin Utama:</strong>
• Plastik sekali pakai = ancaman utama laut
• Gunakan ulang, kurangi, dan daur ulang
• Aksi kecil punya dampak besar

<strong>Fun Fact:</strong>
🦀 Setiap menit, satu truk sampah plastik masuk ke laut di dunia!

<strong>Pesan Nilai Konservasi:</strong>
"Kurangi plastik, tambahkan keindahan."`,
          keyPoints: [
            "Plastik sekali pakai = ancaman utama laut",
            "Gunakan ulang, kurangi, dan daur ulang",
            "Aksi kecil punya dampak besar",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa plastik berbahaya bagi laut?",
            options: [
              { label: "A", text: "Bisa termakan hewan laut" },
              { label: "B", text: "Karena bentuknya jelek" },
              { label: "C", text: "Karena cepat terurai" },
              { label: "D", text: "Karena berat" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Plastik bisa disangka ubur-ubur oleh penyu!",
              wrong: "💡 Plastik bisa disangka ubur-ubur oleh penyu!",
            },
          },
          {
            id: 2,
            question:
              "Apa langkah kecil untuk mengurangi sampah plastik saat liburan?",
            options: [
              { label: "A", text: "Bawa tas kain sendiri" },
              { label: "B", text: "Gunakan plastik sekali pakai" },
              { label: "C", text: "Bakar sampah di pantai" },
              { label: "D", text: "Biarkan petugas yang bersihkan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Bawa tas kain, botol isi ulang, dan tolak sedotan!",
              wrong: "💡 Bawa tas kain, botol isi ulang, dan tolak sedotan!",
            },
          },
          {
            id: 3,
            question: "Apa akibat jika sampah plastik menumpuk di laut?",
            options: [
              { label: "A", text: "Hewan laut bisa mati atau sakit" },
              { label: "B", text: "Pantai makin wangi" },
              { label: "C", text: "Air laut jadi bening" },
              { label: "D", text: "Pasir jadi bersih" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Plastik bisa masuk rantai makanan dan meracuni ekosistem!",
              wrong:
                "💡 Plastik bisa masuk rantai makanan dan meracuni ekosistem!",
            },
          },
        ],
      },
      level3: {
        title: "Jejak Karbon di Laut",
        subtitle: "Dampak Transportasi Wisata",
        focus: "Dampak transportasi wisata",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 3.png",
        content: {
          summary:
            "Video menghitung jejak karbon dan menemukan tips menguranginya.",
          detail: `Coco ingin kamu tahu, setiap perjalanan meninggalkan jejak karbon — dari kendaraan, listrik, hingga makanan. Tapi jangan khawatir! Kamu bisa menyeimbangkannya dengan memilih transportasi ramah lingkungan, berjalan kaki, atau menanam pohon. Laut pun akan berterima kasih karena udara tetap bersih.

<strong>Poin Utama:</strong>
• Aktivitas wisata memengaruhi iklim global
• Kurangi karbon dengan pilihan cerdas
• Laut yang sejuk = karang yang sehat

<strong>Fun Fact:</strong>
🦀 Satu penerbangan Jakarta–Bali setara dengan 200 kg emisi karbon per orang!

<strong>Pesan Nilai Konservasi:</strong>
"Langkah kecilmu hari ini menentukan sejuknya laut esok hari."`,
          keyPoints: [
            "Aktivitas wisata memengaruhi iklim global",
            "Kurangi karbon dengan pilihan cerdas",
            "Laut yang sejuk = karang yang sehat",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Dari mana asal jejak karbon wisatawan?",
            options: [
              { label: "A", text: "Transportasi, listrik, dan konsumsi" },
              { label: "B", text: "Warna baju" },
              { label: "C", text: "Foto di pantai" },
              { label: "D", text: "Tidur siang" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Setiap perjalanan meninggalkan jejak karbon yang bisa dikurangi.",
              wrong:
                "💡 Setiap perjalanan meninggalkan jejak karbon yang bisa dikurangi.",
            },
          },
          {
            id: 2,
            question:
              "Bagaimana cara sederhana mengurangi jejak karbon saat liburan?",
            options: [
              { label: "A", text: "Jalan kaki atau naik sepeda" },
              { label: "B", text: "Naik kendaraan pribadi terus" },
              { label: "C", text: "Pesan makanan impor" },
              { label: "D", text: "Ganti baju terus" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Tepat! Jalan kaki = sehat + nol karbon!",
              wrong: "💡 Jalan kaki = sehat + nol karbon!",
            },
          },
          {
            id: 3,
            question: "Apa hubungan karbon dan laut?",
            options: [
              {
                label: "A",
                text: "Karbon berlebih memanaskan laut dan merusak karang",
              },
              { label: "B", text: "Karbon membuat laut jadi biru" },
              { label: "C", text: "Karbon tidak berpengaruh" },
              { label: "D", text: "Laut menyukai karbon" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Panas berlebih bikin karang memutih (bleaching)!",
              wrong: "💡 Panas berlebih bikin karang memutih (bleaching)!",
            },
          },
        ],
      },
      level4: {
        title: "Cerita dari Pantai Kotor",
        subtitle: "Refleksi Emosional",
        focus: "Refleksi emosional",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 4.png",
        content: {
          summary:
            "Kisah wisatawan yang kecewa melihat pantai kotor, disertai pilihan tindakan terbaik.",
          detail: `Suatu pagi, Coco menemukan pantai yang dipenuhi sampah plastik. Ikan-ikan menjauh, dan turis kecewa. Tapi lalu muncul sekelompok anak muda memungut sampah sambil tertawa — dan perlahan, pantai kembali indah. Cerita ini nyata: perubahan dimulai dari satu aksi kecil yang menular.

<strong>Poin Utama:</strong>
• Pantai kotor bukan akhir, tapi panggilan untuk bertindak
• Gotong royong menciptakan dampak nyata
• Edukasi lewat aksi lebih kuat dari kata

<strong>Fun Fact:</strong>
🦀 Kegiatan "Beach Clean-Up" bisa mengurangi 40% sampah di area wisata dalam 3 bulan!

<strong>Pesan Nilai Konservasi:</strong>
"Bersihkan pantai, bersihkan hatimu untuk laut."`,
          keyPoints: [
            "Pantai kotor bukan akhir, tapi panggilan untuk bertindak",
            "Gotong royong menciptakan dampak nyata",
            "Edukasi lewat aksi lebih kuat dari kata",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa yang bisa dilakukan saat melihat pantai kotor?",
            options: [
              { label: "A", text: "Ikut memungut sampah" },
              { label: "B", text: "Foto dan tinggalkan" },
              { label: "C", text: "Biarkan saja" },
              { label: "D", text: "Tambahkan sampah baru" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Aksi kecil seperti pungut 3 sampah bisa ubah pemandangan!",
              wrong:
                "💡 Aksi kecil seperti pungut 3 sampah bisa ubah pemandangan!",
            },
          },
          {
            id: 2,
            question: "Mengapa pantai kotor membuat wisatawan kecewa?",
            options: [
              {
                label: "A",
                text: "Karena mengurangi keindahan dan kenyamanan",
              },
              { label: "B", text: "Karena pasirnya lembut" },
              { label: "C", text: "Karena terlalu sunyi" },
              { label: "D", text: "Karena tidak ada musik" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Tepat! Pantai bersih bikin semua orang bahagia!",
              wrong: "💡 Pantai bersih bikin semua orang bahagia!",
            },
          },
          {
            id: 3,
            question: "Apa pelajaran dari kisah pantai kotor?",
            options: [
              {
                label: "A",
                text: "Setiap orang bertanggung jawab menjaga kebersihan",
              },
              { label: "B", text: "Sampah adalah bagian dari alam" },
              { label: "C", text: "Pantai bisa bersih sendiri" },
              { label: "D", text: "Biarkan hujan yang membersihkan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Bersih bukan tugas satu orang, tapi kita semua!",
              wrong: "💡 Bersih bukan tugas satu orang, tapi kita semua!",
            },
          },
        ],
      },
      level5: {
        title: "Hero of the Beach",
        subtitle: "Aksi Kecil Berdampak Besar",
        focus: "Aksi kecil berdampak besar",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 5.png",
        content: {
          summary: "Poster contoh hero of the beach.",
          detail: `Kamu tidak butuh jubah untuk jadi pahlawan — cukup sepasang tangan dan hati peduli. Coco menantangmu ikut aksi kecil: pungut tiga sampah setiap kali ke pantai. Bayangkan jika seribu orang melakukannya, laut akan tersenyum lebih cerah!

<strong>Poin Utama:</strong>
• Pahlawan lingkungan dimulai dari tindakan kecil
• Partisipasi banyak orang = dampak besar
• Jadikan kebiasaan positif bagian dari liburan

<strong>Fun Fact:</strong>
🦀 Gerakan #Take3ForTheSea dimulai dari satu pantai di Australia, kini mendunia!

<strong>Pesan Nilai Konservasi:</strong>
"Setiap sampah yang kamu pungut adalah doa kecil untuk laut."`,
          keyPoints: [
            "Pahlawan lingkungan dimulai dari tindakan kecil",
            "Partisipasi banyak orang = dampak besar",
            "Jadikan kebiasaan positif bagian dari liburan",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Bagaimana cara jadi 'pahlawan pantai'?",
            options: [
              { label: "A", text: "Pungut minimal 3 sampah tiap berkunjung" },
              { label: "B", text: "Bawa sound system besar" },
              { label: "C", text: "Berlari di atas karang" },
              { label: "D", text: "Buang sampah di pasir" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Aksi kecilmu menyelamatkan laut besar!",
              wrong: "💡 Aksi kecilmu menyelamatkan laut besar!",
            },
          },
          {
            id: 2,
            question: "Mengapa aksi kecil penting untuk laut?",
            options: [
              {
                label: "A",
                text: "Karena perubahan besar dimulai dari langkah kecil",
              },
              { label: "B", text: "Karena laut mudah berubah" },
              { label: "C", text: "Karena pahlawan butuh panggung" },
              { label: "D", text: "Karena sampah sedikit tak masalah" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Setiap botol plastik yang kamu pungut berarti satu hewan laut terselamatkan.",
              wrong:
                "💡 Setiap botol plastik yang kamu pungut berarti satu hewan laut terselamatkan.",
            },
          },
          {
            id: 3,
            question: "Apa hadiah terbaik jadi 'Hero of the Beach'?",
            options: [
              { label: "A", text: "Laut yang tetap indah" },
              { label: "B", text: "Sertifikat resmi" },
              { label: "C", text: "Uang tunai" },
              { label: "D", text: "Tiket konser" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Hadiah sejati adalah alam yang tetap hidup!",
              wrong: "💡 Hadiah sejati adalah alam yang tetap hidup!",
            },
          },
        ],
      },
      level6: {
        title: "Jangan Sentuh Mereka!",
        subtitle: "Etika Berinteraksi dengan Biota Laut",
        focus: "Etika berinteraksi dengan biota laut",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 6.png",
        content: {
          summary:
            "Edukasi 'do and don't' saat snorkeling atau memotret hewan laut.",
          detail: `Terumbu karang, bintang laut, dan ubur-ubur memang cantik, tapi bukan mainan. Coco mengingatkan: jangan menyentuh, memegang, atau mengangkat biota laut demi foto. Sentuhan kecil bisa melukai mereka. Ingat, laut bukan taman bermain, tapi rumah bagi makhluk hidup.

<strong>Poin Utama:</strong>
• Biota laut sensitif terhadap sentuhan manusia
• Foto keren tidak sebanding dengan kehidupan yang hilang
• Edukasi etika wisata laut penting untuk semua usia

<strong>Fun Fact:</strong>
🦀 Bintang laut bisa "stres" dan mati hanya karena disentuh tangan manusia!

<strong>Pesan Nilai Konservasi:</strong>
"Cukup lihat, kagumi, lalu biarkan mereka hidup damai."`,
          keyPoints: [
            "Biota laut sensitif terhadap sentuhan manusia",
            "Foto keren tidak sebanding dengan kehidupan yang hilang",
            "Edukasi etika wisata laut penting untuk semua usia",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa tidak boleh menyentuh karang saat snorkeling?",
            options: [
              { label: "A", text: "Karena karang mudah rusak dan stres" },
              { label: "B", text: "Karena karang gatal" },
              { label: "C", text: "Karena karang bisa lari" },
              { label: "D", text: "Karena karang tidak indah" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Sentuhan kecil bisa membuat karang mati!",
              wrong: "💡 Sentuhan kecil bisa membuat karang mati!",
            },
          },
          {
            id: 2,
            question: "Apa dampak menyentuh biota laut untuk foto?",
            options: [
              { label: "A", text: "Hewan bisa stres atau terluka" },
              { label: "B", text: "Foto jadi lebih keren" },
              { label: "C", text: "Air jadi jernih" },
              { label: "D", text: "Tidak ada pengaruh" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Foto bagus tak sebanding dengan nyawa hewan laut.",
              wrong: "💡 Foto bagus tak sebanding dengan nyawa hewan laut.",
            },
          },
          {
            id: 3,
            question: "Apa sikap terbaik saat melihat penyu atau bintang laut?",
            options: [
              { label: "A", text: "Lihat dan kagumi tanpa menyentuh" },
              { label: "B", text: "Pegang sebentar" },
              { label: "C", text: "Pindahkan agar mudah difoto" },
              { label: "D", text: "Sentuh pelan-pelan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Cukup amati dari jauh — mereka makhluk hidup juga!",
              wrong: "💡 Cukup amati dari jauh — mereka makhluk hidup juga!",
            },
          },
        ],
      },
      level7: {
        title: "Local is Lovely",
        subtitle: "Dukung Produk Lokal",
        focus: "Dukung produk lokal",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 7.png",
        content: {
          summary:
            "Video contoh perbedaan wisatawan yang paling ramah lingkungan dan budaya lokal.",
          detail: `Coco percaya, mencintai laut juga berarti mencintai budaya lokal. Cobalah makan di warung nelayan, beli produk kerajinan tangan, dan hormati adat setempat. Dengan begitu, uangmu membantu ekonomi lokal tanpa merusak alam. Wisata yang bijak adalah wisata yang memberdayakan.

<strong>Poin Utama:</strong>
• Produk lokal = lebih ramah lingkungan dan sosial
• Menghargai budaya menjaga harmoni alam
• Dukung komunitas pesisir untuk konservasi berkelanjutan

<strong>Fun Fact:</strong>
🦀 Setiap 1 juta rupiah yang dibelanjakan di usaha lokal bisa menciptakan 5 lapangan kerja di desa wisata!

<strong>Pesan Nilai Konservasi:</strong>
"Cinta laut, dukung yang lokal."`,
          keyPoints: [
            "Produk lokal = lebih ramah lingkungan dan sosial",
            "Menghargai budaya menjaga harmoni alam",
            "Dukung komunitas pesisir untuk konservasi berkelanjutan",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa mendukung produk lokal penting saat berwisata?",
            options: [
              { label: "A", text: "Membantu ekonomi dan budaya setempat" },
              { label: "B", text: "Karena lebih murah" },
              { label: "C", text: "Karena lebih trendi" },
              { label: "D", text: "Karena tak ada pilihan lain" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Belanja lokal = bantu masyarakat pesisir berkembang!",
              wrong: "💡 Belanja lokal = bantu masyarakat pesisir berkembang!",
            },
          },
          {
            id: 2,
            question: "Apa contoh wisata berbudaya positif?",
            options: [
              {
                label: "A",
                text: "Menghormati adat setempat dan berpakaian sopan",
              },
              { label: "B", text: "Mengabaikan aturan lokal" },
              { label: "C", text: "Membuat kebisingan" },
              { label: "D", text: "Membawa makanan impor" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Hormat budaya = harmoni antara manusia dan alam.",
              wrong: "💡 Hormat budaya = harmoni antara manusia dan alam.",
            },
          },
          {
            id: 3,
            question: "Apa dampak memilih produk lokal terhadap laut?",
            options: [
              {
                label: "A",
                text: "Mengurangi emisi dari transportasi jarak jauh",
              },
              { label: "B", text: "Tidak ada pengaruh" },
              { label: "C", text: "Membuat laut lebih biru" },
              { label: "D", text: "Menghasilkan lebih banyak plastik" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Produk lokal = karbon rendah = laut lebih sehat!",
              wrong: "💡 Produk lokal = karbon rendah = laut lebih sehat!",
            },
          },
        ],
      },
      level8: {
        title: "Foto Boleh, Tapi Bijak",
        subtitle: "Etika Foto di Alam",
        focus: "Etika foto di alam",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 8.png",
        content: {
          summary: "Simulasi: pilih gaya foto yang aman bagi alam.",
          detail: `Foto di pantai itu seru, tapi bijaklah dalam berpose! Jangan berdiri di karang, jangan pegang hewan laut, dan jangan buang sampah setelah sesi foto. Coco mengajarkan: foto terbaik bukan tentang gaya, tapi tentang cerita di baliknya — kamu peduli, kamu menjaga.

<strong>Poin Utama:</strong>
• Etika foto = bagian dari wisata berkelanjutan
• Hindari gaya yang berisiko bagi lingkungan
• Edukasi digital juga bagian dari konservasi

<strong>Fun Fact:</strong>
🦀 Beberapa taman laut kini memberi "sertifikat wisatawan bijak" bagi yang mengikuti aturan foto ramah lingkungan.

<strong>Pesan Nilai Konservasi:</strong>
"Jadilah keren tanpa merusak keindahan alam."`,
          keyPoints: [
            "Etika foto = bagian dari wisata berkelanjutan",
            "Hindari gaya yang berisiko bagi lingkungan",
            "Edukasi digital juga bagian dari konservasi",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Bagaimana cara berfoto yang ramah lingkungan?",
            options: [
              {
                label: "A",
                text: "Tidak menginjak karang dan tidak mengganggu hewan",
              },
              { label: "B", text: "Berdiri di atas karang" },
              { label: "C", text: "Mengangkat bintang laut" },
              { label: "D", text: "Menggunakan flash kuat" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Jadikan foto keren tanpa menyakiti alam!",
              wrong: "💡 Jadikan foto keren tanpa menyakiti alam!",
            },
          },
          {
            id: 2,
            question: "Apa yang sebaiknya tidak dilakukan demi foto bagus?",
            options: [
              { label: "A", text: "Menyentuh atau memegang hewan laut" },
              { label: "B", text: "Menjaga jarak" },
              { label: "C", text: "Mengikuti panduan pemandu" },
              { label: "D", text: "Mematikan flash" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Tepat! Biota laut bukan properti foto!",
              wrong: "💡 Biota laut bukan properti foto!",
            },
          },
          {
            id: 3,
            question: "Apa yang membuat foto di alam jadi bermakna?",
            options: [
              { label: "A", text: "Cerita peduli alam di baliknya" },
              { label: "B", text: "Banyak filter" },
              { label: "C", text: "Pose ekstrem" },
              { label: "D", text: "Banyak komentar" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Foto yang baik = cerita kebaikan.",
              wrong: "💡 Foto yang baik = cerita kebaikan.",
            },
          },
        ],
      },
      level9: {
        title: "Dari Wisata ke Aksi",
        subtitle: "Transformasi Pengalaman Jadi Aksi",
        focus: "Transformasi pengalaman jadi aksi",
        mediaType: "image",
        mediaSrc: "../../../video/COCO/Coco lvl 9.png",
        content: {
          summary:
            "Wisatawan berbagi aksi nyata (beach clean-up, donasi karang).",
          detail: `Coco percaya liburan seharusnya meninggalkan jejak baik. Setelah menikmati laut, kenapa tidak ikut aksi nyata? Ikut bersih pantai, adopsi karang, atau bagikan edukasi konservasi di media sosial. Dari wisata, lahir inspirasi — dan dari inspirasi, lahir perubahan.

<strong>Poin Utama:</strong>
• Wisata bisa jadi gerbang menuju aksi nyata
• Setiap kunjungan = peluang edukasi dan kontribusi
• Kampanye digital juga bagian dari konservasi modern

<strong>Fun Fact:</strong>
🦀 Program "Adopt a Coral" memungkinkan wisatawan menanam dan memantau pertumbuhan karang via aplikasi!

<strong>Pesan Nilai Konservasi:</strong>
"Liburanmu bisa jadi awal dari perubahan besar."`,
          keyPoints: [
            "Wisata bisa jadi gerbang menuju aksi nyata",
            "Setiap kunjungan = peluang edukasi dan kontribusi",
            "Kampanye digital juga bagian dari konservasi modern",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa langkah nyata setelah liburan di laut?",
            options: [
              { label: "A", text: "Ikut aksi bersih pantai" },
              { label: "B", text: "Tidur seharian" },
              { label: "C", text: "Lupa semua" },
              { label: "D", text: "Ambil pasir sebagai oleh-oleh" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Wisata yang bermakna = wisata yang menular jadi aksi!",
              wrong: "💡 Wisata yang bermakna = wisata yang menular jadi aksi!",
            },
          },
          {
            id: 2,
            question: "Mengapa berbagi pengalaman konservasi itu penting?",
            options: [
              { label: "A", text: "Agar makin banyak orang ikut peduli" },
              { label: "B", text: "Agar terkenal" },
              { label: "C", text: "Agar dapat like" },
              { label: "D", text: "Agar jadi influencer" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Cerita peduli alam bisa menginspirasi ribuan orang!",
              wrong: "💡 Cerita peduli alam bisa menginspirasi ribuan orang!",
            },
          },
          {
            id: 3,
            question: "Apa contoh aksi kecil pasca-liburan?",
            options: [
              {
                label: "A",
                text: "Posting edukasi, kurangi plastik, dukung konservasi",
              },
              { label: "B", text: "Ambil cangkang karang" },
              { label: "C", text: "Beli hewan laut" },
              { label: "D", text: "Lupakan semua aturan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Aksi kecil = dampak besar!",
              wrong: "💡 Aksi kecil = dampak besar!",
            },
          },
        ],
      },
      level10: {
        title: "Guardian of the Ocean",
        subtitle: "Komitmen Akhir",
        focus: "Komitmen akhir",
        mediaType: "video",
        mediaSrc: "../../../video/COCO/Coco lvl 10.mp4",
        content: {
          summary:
            "Coco menutup perjalanan dengan ajakan menjaga laut bersama.",
          detail: `Perjalanan bersama Coco berakhir di sini, tapi misinya baru dimulai. Kamu kini seorang Guardian of the Ocean — penjaga laut yang sadar, peduli, dan bertindak. Mulai dari langkah kecil: tolak plastik, dukung lokal, edukasi temanmu. Karena menjaga laut bukan tugas segelintir orang, tapi gaya hidup kita semua.

<strong>Poin Utama:</strong>
• Konservasi adalah perjalanan tanpa akhir
• Identitas "penjaga laut" bisa dimiliki siapa pun
• Aksi konsisten lebih penting dari aksi besar sesaat

<strong>Fun Fact:</strong>
🦀 Beberapa negara pesisir memberi gelar kehormatan "Ocean Guardian" bagi wisatawan peduli lingkungan.

<strong>Pesan Nilai Konservasi:</strong>
"Laut adalah rumahmu — jadilah penjaganya."`,
          keyPoints: [
            "Konservasi adalah perjalanan tanpa akhir",
            "Identitas 'penjaga laut' bisa dimiliki siapa pun",
            "Aksi konsisten lebih penting dari aksi besar sesaat",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa arti jadi 'Guardian of the Ocean'?",
            options: [
              { label: "A", text: "Orang yang peduli dan menjaga laut" },
              { label: "B", text: "Polisi laut" },
              { label: "C", text: "Nelayan besar" },
              { label: "D", text: "Pengunjung pantai" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Benar! Guardian bukan profesi, tapi panggilan hati!",
              wrong: "💡 Guardian bukan profesi, tapi panggilan hati!",
            },
          },
          {
            id: 2,
            question: "Apa kebiasaan sehari-hari Guardian Laut?",
            options: [
              {
                label: "A",
                text: "Tolak plastik, hemat air, dan jaga lingkungan",
              },
              { label: "B", text: "Pergi ke pantai tiap hari" },
              { label: "C", text: "Makan ikan setiap jam" },
              { label: "D", text: "Koleksi cangkang laut" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Guardian sejati menjaga laut lewat tindakan kecil.",
              wrong: "💡 Guardian sejati menjaga laut lewat tindakan kecil.",
            },
          },
          {
            id: 3,
            question: "Mengapa semua orang bisa jadi Guardian Laut?",
            options: [
              {
                label: "A",
                text: "Karena konservasi dimulai dari kesadaran pribadi",
              },
              { label: "B", text: "Karena harus punya izin khusus" },
              { label: "C", text: "Karena laut milik segelintir orang" },
              { label: "D", text: "Karena itu pekerjaan tetap" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Laut milik kita semua — semua bisa jadi penjaganya!",
              wrong: "💡 Laut milik kita semua — semua bisa jadi penjaganya!",
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
