// ========================================
// CORATUKA - Tuka Quiz Database
// ========================================
// Data quiz dan materi untuk maskot Tuka (Konservasi Penyu)
// 10 level dengan 3 soal per level

const quizDatabase = {
  tuka: {
    mascotName: "Tuka",
    mascotColor: "#16c6d0",
    mascotImage: "/img/welcome/tuka.png",
    theme: "Konservasi Penyu",
    levels: {
      level1: {
        title: "Kisah Hidup Seekor Penyu",
        subtitle: "Konservasi Penyu - Overview",
        focus: "Siklus hidup penyu",
        mediaType: "video",
        mediaSrc: "../../../video/TUKA/Tuka Level 1 (1).mp4", // YouTube embed or fallback to /videos/tuka-level1.mp4
        content: {
          summary:
            "Tuka menceritakan perjalanan dari telur hingga dewasa dan kembali bertelur di pantai asal.",
          detail: `Bayangkan kamu adalah seekor tukik kecil yang baru menetas di bawah sinar bulan. Kamu berlari menuju laut, menghadapi ombak pertama, tumbuh besar, lalu kembali bertelur di pantai yang sama. Itulah siklus hidup penyu — perjalanan luar biasa yang bisa berlangsung lebih dari 50 tahun. Tapi tak semua tukik beruntung. Dari seribu yang menetas, hanya satu yang kembali dewasa.

<strong>Poin Utama:</strong>
• Penyu selalu kembali ke pantai tempat mereka lahir
• Hanya 1 dari 1.000 tukik bertahan hingga dewasa
• Siklus hidup penyu menunjukkan pentingnya keseimbangan alam

<strong>Fun Fact:</strong>
🐢 Penyu memiliki "GPS alami" di otaknya untuk menemukan pantai asal mereka!

<strong>Pesan Nilai Konservasi:</strong>
"Setiap tukik punya harapan. Bantu mereka menemukan jalan pulang."`,
          keyPoints: [
            "Penyu selalu kembali ke pantai tempat mereka lahir",
            "Hanya 1 dari 1.000 tukik bertahan hingga dewasa",
            "Siklus hidup penyu menunjukkan pentingnya keseimbangan alam",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Ke mana penyu betina akan kembali setelah dewasa?",
            options: [
              { label: "A", text: "Ke pantai tempat dia lahir" },
              { label: "B", text: "Ke laut lepas mana pun" },
              { label: "C", text: "Ke danau terdekat" },
              { label: "D", text: "Ke hutan mangrove" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Penyu punya insting alami untuk kembali ke pantai tempat mereka menetas.",
              wrong:
                "💡 Coba lagi! Penyu punya insting alami untuk kembali ke pantai tempat mereka menetas.",
            },
          },
          {
            id: 2,
            question:
              "Dari 1.000 tukik yang menetas, berapa kira-kira yang bisa bertahan sampai dewasa?",
            options: [
              { label: "A", text: "1" },
              { label: "B", text: "100" },
              { label: "C", text: "500" },
              { label: "D", text: "900" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat sekali! Hanya 1 dari 1.000 tukik yang bertahan—itulah kenapa mereka sangat butuh perlindungan.",
              wrong:
                "💡 Hanya 1 dari 1.000 tukik yang bertahan—itulah kenapa mereka sangat butuh perlindungan.",
            },
          },
          {
            id: 3,
            question: "Apa pelajaran dari perjalanan hidup penyu?",
            options: [
              { label: "A", text: "Alam punya siklus yang harus dijaga" },
              { label: "B", text: "Penyu cepat tumbuh besar" },
              { label: "C", text: "Penyu bisa hidup tanpa laut" },
              { label: "D", text: "Laut tidak penting" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Penyu mengajarkan kita tentang kesabaran dan keseimbangan alam.",
              wrong:
                "💡 Penyu mengajarkan kita tentang kesabaran dan keseimbangan alam.",
            },
          },
        ],
      },
      level2: {
        title: "Ancaman di Laut",
        subtitle: "Konservasi Penyu - Tantangan",
        focus: "Bahaya yang dihadapi penyu",
        mediaType: "video",
        mediaSrc: "../../../video/TUKA/Tuka Level 2.mp4", // YouTube embed or fallback to /videos/tuka-level2.mp4
        content: {
          summary:
            "Tuka ingin menunjukkan dunia laut yang indah — tapi juga penuh bahaya.",
          detail: `Tuka ingin menunjukkan dunia laut yang indah — tapi juga penuh bahaya. Kantong plastik terlihat seperti ubur-ubur bagi penyu lapar, jaring nelayan bisa menjebak mereka, dan cahaya lampu di pantai membuat tukik salah arah. Ancaman kecil bagi manusia, tapi besar bagi penyu.

<strong>Poin Utama:</strong>
• Plastik dan jaring = ancaman utama penyu
• Cahaya buatan membuat tukik tersesat
• Tindakan manusia langsung memengaruhi hidup satwa laut

<strong>Fun Fact:</strong>
🐢 Lebih dari 50% penyu laut di dunia pernah menelan plastik!

<strong>Pesan Nilai Konservasi:</strong>
"Sekecil apapun tindakanmu, bisa jadi keselamatan bagi penyu."`,
          keyPoints: [
            "Plastik dan jaring = ancaman utama penyu",
            "Cahaya buatan membuat tukik tersesat",
            "Tindakan manusia langsung memengaruhi hidup satwa laut",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa plastik berbahaya bagi penyu?",
            options: [
              {
                label: "A",
                text: "Karena mirip ubur-ubur yang sering mereka makan",
              },
              { label: "B", text: "Karena baunya enak" },
              { label: "C", text: "Karena bisa dimakan manusia" },
              { label: "D", text: "Karena warnanya mencolok" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Penyu sering salah makan plastik karena terlihat seperti ubur-ubur.",
              wrong:
                "💡 Penyu sering salah makan plastik karena terlihat seperti ubur-ubur.",
            },
          },
          {
            id: 2,
            question: "Apa yang terjadi jika penyu tertangkap jaring nelayan?",
            options: [
              { label: "A", text: "Bisa terluka atau tenggelam" },
              { label: "B", text: "Dapat makanan gratis" },
              { label: "C", text: "Jadi hewan peliharaan" },
              { label: "D", text: "Tetap aman" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Jaring bisa membuat penyu terperangkap dan tak bisa bernapas.",
              wrong:
                "💡 Ups! Jaring bisa membuat penyu terperangkap dan tak bisa bernapas.",
            },
          },
          {
            id: 3,
            question: "Apa ancaman dari cahaya lampu di pantai bagi tukik?",
            options: [
              { label: "A", text: "Membuat tukik tersesat menjauh dari laut" },
              { label: "B", text: "Membuat pantai lebih indah" },
              { label: "C", text: "Membantu penyu melihat jalan" },
              { label: "D", text: "Tidak berpengaruh" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Cahaya buatan membuat tukik bingung arah menuju laut.",
              wrong: "💡 Cahaya buatan membuat tukik bingung arah menuju laut.",
            },
          },
        ],
      },
      level3: {
        title: "Aturan Melepas Tukik",
        subtitle: "Panduan Edukatif Pelepasan Tukik",
        focus: "Panduan edukatif pelepasan tukik",
        mediaType: "image",
        mediaSrc: "../../../video/TUKA/Tuka lvl 3.png",
        content: {
          summary:
            "Menunjukkan cara melepas tukik dengan aman tanpa mengganggu habitatnya.",
          detail: `Melihat tukik berlari ke laut memang indah, tapi ada aturan penting: jangan dipegang, jangan dibantu masuk air, dan jangan gunakan lampu kamera. Tukik harus menemukan jalannya sendiri agar bisa mengenali pantai asalnya nanti. Tuka mengajakmu belajar jadi pendamping yang bijak!

<strong>Poin Utama:</strong>
• Tukik harus berjalan sendiri menuju laut
• Cahaya dan suara bisa mengganggu insting mereka
• Edukasi wisatawan penting agar pelepasan tukik tidak salah

<strong>Fun Fact:</strong>
🐢 Langkah pertama tukik merekam "peta magnetik" pantai untuk masa depan mereka.

<strong>Pesan Nilai Konservasi:</strong>
"Biarkan mereka menemukan lautnya sendiri — itu pelajaran pertama tentang kebebasan."`,
          keyPoints: [
            "Tukik harus berjalan sendiri menuju laut",
            "Cahaya dan suara bisa mengganggu insting mereka",
            "Edukasi wisatawan penting agar pelepasan tukik tidak salah",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Mengapa tukik harus berjalan sendiri menuju laut?",
            options: [
              { label: "A", text: "Agar mengingat pantai asalnya" },
              { label: "B", text: "Agar tidak basah" },
              { label: "C", text: "Agar cepat sampai" },
              { label: "D", text: "Karena dilarang disentuh manusia" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Langkah pertama tukik merekam peta magnetik pantai untuk masa depan.",
              wrong:
                "💡 Langkah pertama tukik merekam peta magnetik pantai untuk masa depan.",
            },
          },
          {
            id: 2,
            question: "Apa yang sebaiknya TIDAK dilakukan saat melepas tukik?",
            options: [
              { label: "A", text: "Menggunakan lampu flash" },
              { label: "B", text: "Menonton dari jarak aman" },
              { label: "C", text: "Melepas saat sore" },
              { label: "D", text: "Menjaga kebersihan pantai" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Jangan gunakan flash, cahaya bisa membuat tukik tersesat.",
              wrong:
                "💡 Jangan gunakan flash, cahaya bisa membuat tukik tersesat.",
            },
          },
          {
            id: 3,
            question:
              "Mengapa manusia tidak boleh membantu tukik langsung ke laut?",
            options: [
              { label: "A", text: "Karena itu mengganggu insting alaminya" },
              { label: "B", text: "Karena air asin berbahaya" },
              { label: "C", text: "Karena pasir licin" },
              { label: "D", text: "Karena laut dingin" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Tukik perlu menemukan jalan sendiri agar bisa kembali saat dewasa.",
              wrong:
                "💡 Tukik perlu menemukan jalan sendiri agar bisa kembali saat dewasa.",
            },
          },
        ],
      },
      level4: {
        title: "Flash yang Berbahaya",
        subtitle: "Dampak Cahaya Terhadap Penyu",
        focus: "Dampak cahaya terhadap penyu",
        mediaType: "image",
        mediaSrc: "../../../video/TUKA/Tuka lvl 4.png",
        content: {
          summary: "Simulasi 'efek flash' yang membuat penyu kebingungan arah.",
          detail: `Penyu tidak suka sorotan terang. Lampu flash atau senter bisa membuat mereka bingung dan stres. Bayangkan kamu tidur lalu disinari lampu kamera terus-menerus — itulah yang dirasakan penyu saat difoto di pantai. Satu cahaya kecil bisa menggagalkan proses bertelur.

<strong>Poin Utama:</strong>
• Penyu sensitif terhadap cahaya buatan
• Gunakan cahaya redup atau filter merah di pantai peneluran
• Edukasi ini membantu wisatawan berperilaku benar

<strong>Fun Fact:</strong>
🐢 Penyu betina hanya naik ke pantai pada malam sangat gelap untuk merasa aman.

<strong>Pesan Nilai Konservasi:</strong>
"Matikan flash, nyalakan empati."`,
          keyPoints: [
            "Penyu sensitif terhadap cahaya buatan",
            "Gunakan cahaya redup atau filter merah di pantai peneluran",
            "Edukasi ini membantu wisatawan berperilaku benar",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa yang dirasakan penyu jika disinari flash kamera?",
            options: [
              { label: "A", text: "Bingung dan stres" },
              { label: "B", text: "Senang difoto" },
              { label: "C", text: "Tidak berpengaruh" },
              { label: "D", text: "Tidur lebih nyenyak" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Cahaya terang bisa membuat penyu gagal bertelur.",
              wrong: "💡 Cahaya terang bisa membuat penyu gagal bertelur.",
            },
          },
          {
            id: 2,
            question: "Mengapa penyu bertelur di malam hari?",
            options: [
              {
                label: "A",
                text: "Karena lebih tenang dan aman dari gangguan",
              },
              { label: "B", text: "Karena siang terlalu panas" },
              { label: "C", text: "Karena disuruh nelayan" },
              { label: "D", text: "Karena takut burung" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Penyu memilih malam gelap agar merasa aman bertelur.",
              wrong: "💡 Penyu memilih malam gelap agar merasa aman bertelur.",
            },
          },
          {
            id: 3,
            question:
              "Bagaimana sebaiknya wisatawan bersikap di pantai peneluran penyu?",
            options: [
              { label: "A", text: "Tenang dan tanpa cahaya terang" },
              { label: "B", text: "Bawa senter besar" },
              { label: "C", text: "Menyentuh telur penyu" },
              { label: "D", text: "Berteriak agar penyu keluar" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Hening dan gelap = suasana aman untuk penyu bertelur.",
              wrong: "💡 Hening dan gelap = suasana aman untuk penyu bertelur.",
            },
          },
        ],
      },
      level5: {
        title: "Pantai Aman untuk Penyu",
        subtitle: "Zona Bertelur Aman",
        focus: "Zona bertelur aman",
        mediaType: "image",
        mediaSrc: "../../../video/TUKA/Tuka lvl 5.png",
        content: {
          summary:
            "Area pantai yang sesuai untuk bertelur dengan indikator lingkungan.",
          detail: `Tidak semua pantai cocok untuk penyu bertelur. Mereka butuh pasir bersih, tenang, dan bebas cahaya. Pantai dengan musik keras atau bangunan terang membuat penyu enggan datang. Melalui simulasi interaktif, Tuka mengajakmu memilih pantai terbaik untuk teman-teman penyu.

<strong>Poin Utama:</strong>
• Penyu memilih pantai tenang untuk bertelur
• Kebersihan dan kegelapan malam penting untuk proses alami
• Pantai yang aman = habitat yang lestari

<strong>Fun Fact:</strong>
🐢 Penyu bisa menggali lubang hingga 70 cm untuk melindungi telurnya!

<strong>Pesan Nilai Konservasi:</strong>
"Pantai indah bukan hanya bersih — tapi juga nyaman bagi penyu."`,
          keyPoints: [
            "Penyu memilih pantai tenang untuk bertelur",
            "Kebersihan dan kegelapan malam penting untuk proses alami",
            "Pantai yang aman = habitat yang lestari",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa ciri pantai yang aman untuk penyu bertelur?",
            options: [
              { label: "A", text: "Tenang, gelap, dan bersih" },
              { label: "B", text: "Ramai dan banyak musik" },
              { label: "C", text: "Banyak lampu warna-warni" },
              { label: "D", text: "Penuh sampah" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Penyu butuh tempat sepi dan bersih untuk bertelur dengan aman.",
              wrong:
                "💡 Penyu butuh tempat sepi dan bersih untuk bertelur dengan aman.",
            },
          },
          {
            id: 2,
            question: "Apa dampak musik keras di pantai bagi penyu?",
            options: [
              { label: "A", text: "Mengganggu proses bertelur" },
              { label: "B", text: "Membuat penyu menari" },
              { label: "C", text: "Membuat pasir bergetar" },
              { label: "D", text: "Tidak berpengaruh" },
            ],
            correctAnswer: "A",
            feedback: {
              correct: "🎉 Tepat! Penyu butuh ketenangan, bukan konser.",
              wrong: "💡 Penyu butuh ketenangan, bukan konser.",
            },
          },
          {
            id: 3,
            question:
              "Siapa yang berperan menjaga pantai tetap aman untuk penyu?",
            options: [
              { label: "A", text: "Semua orang yang berkunjung" },
              { label: "B", text: "Hanya konservator" },
              { label: "C", text: "Hanya nelayan" },
              { label: "D", text: "Hanya turis asing" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Setiap pengunjung pantai bisa ikut menjaga agar penyu nyaman.",
              wrong:
                "💡 Setiap pengunjung pantai bisa ikut menjaga agar penyu nyaman.",
            },
          },
        ],
      },
      level6: {
        title: "Penyu dan Ekosistem Laut",
        subtitle: "Keterkaitan Penyu dengan Ekosistem",
        focus: "Keterkaitan penyu dengan ekosistem",
        mediaType: "image",
        mediaSrc: "../../../video/TUKA/Tuka lvl 6.png",
        content: {
          summary:
            "Menjelaskan hubungan penyu, karang, dan rumput laut dalam menjaga keseimbangan laut.",
          detail: `Ternyata penyu bukan hanya hewan lucu, tapi juga "penjaga keseimbangan laut." Mereka memakan ubur-ubur berlebih, membantu rumput laut tumbuh sehat, dan menjaga karang dari gangguan. Jika penyu hilang, laut kehilangan salah satu pengatur alaminya.

<strong>Poin Utama:</strong>
• Penyu menjaga keseimbangan rantai makanan laut
• Kehilangan satu spesies bisa merusak ekosistem
• Konservasi penyu = konservasi laut secara menyeluruh

<strong>Fun Fact:</strong>
🐢 Tanpa penyu, populasi ubur-ubur bisa meledak dan mengganggu wisata pantai!

<strong>Pesan Nilai Konservasi:</strong>
"Lindungi penyu, selamatkan laut."`,
          keyPoints: [
            "Penyu menjaga keseimbangan rantai makanan laut",
            "Kehilangan satu spesies bisa merusak ekosistem",
            "Konservasi penyu = konservasi laut secara menyeluruh",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa peran penyu dalam ekosistem laut?",
            options: [
              { label: "A", text: "Menjaga keseimbangan makanan laut" },
              { label: "B", text: "Menghias pantai" },
              { label: "C", text: "Membuat laut jadi dangkal" },
              { label: "D", text: "Tidak punya peran penting" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Penyu membantu menjaga keseimbangan rantai makanan laut.",
              wrong:
                "💡 Penyu membantu menjaga keseimbangan rantai makanan laut.",
            },
          },
          {
            id: 2,
            question: "Apa yang terjadi jika penyu punah?",
            options: [
              { label: "A", text: "Ubur-ubur bisa berkembang berlebihan" },
              { label: "B", text: "Laut jadi lebih bersih" },
              { label: "C", text: "Ikan makin banyak" },
              { label: "D", text: "Tidak ada perubahan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Tanpa penyu, laut bisa kehilangan keseimbangannya.",
              wrong: "💡 Tanpa penyu, laut bisa kehilangan keseimbangannya.",
            },
          },
          {
            id: 3,
            question: "Mengapa menjaga penyu berarti menjaga laut?",
            options: [
              {
                label: "A",
                text: "Karena mereka bagian penting dari rantai ekosistem",
              },
              { label: "B", text: "Karena mereka lucu" },
              { label: "C", text: "Karena penyu bisa berenang cepat" },
              { label: "D", text: "Karena laut milik penyu" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Semua makhluk laut saling bergantung satu sama lain.",
              wrong: "💡 Semua makhluk laut saling bergantung satu sama lain.",
            },
          },
        ],
      },
      level7: {
        title: "Kenali 7 Jenis Penyu",
        subtitle: "Biodiversitas Penyu Indonesia",
        focus: "Biodiversitas penyu Indonesia",
        mediaType: "image",
        mediaSrc: "../../../video/TUKA/Tuka lvl 7.png",
        content: {
          summary:
            "Membedakan penyu hijau, sisik, dan lekang berdasarkan ciri unik.",
          detail: `Indonesia adalah rumah bagi 6 dari 7 jenis penyu dunia! Ada penyu hijau, lekang, sisik, belimbing, tempayan, dan pipih. Setiap jenis punya bentuk dan habitat unik. Melalui kuis interaktif, Tuka akan membantumu mengenali mereka satu per satu.

<strong>Poin Utama:</strong>
• Ada 7 jenis penyu laut di dunia
• Indonesia menjadi tempat penting bagi enam di antaranya
• Semua jenis penyu dilindungi oleh hukum

<strong>Fun Fact:</strong>
🐢 Penyu belimbing bisa tumbuh lebih dari 2 meter dan beratnya mencapai 700 kg!

<strong>Pesan Nilai Konservasi:</strong>
"Kenali mereka, sebelum mereka hilang."`,
          keyPoints: [
            "Ada 7 jenis penyu laut di dunia",
            "Indonesia menjadi tempat penting bagi enam di antaranya",
            "Semua jenis penyu dilindungi oleh hukum",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Jenis penyu terbesar di dunia adalah...",
            options: [
              { label: "A", text: "Penyu belimbing" },
              { label: "B", text: "Penyu hijau" },
              { label: "C", text: "Penyu sisik" },
              { label: "D", text: "Penyu lekang" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Penyu belimbing bisa mencapai panjang lebih dari 2 meter!",
              wrong:
                "💡 Penyu belimbing bisa mencapai panjang lebih dari 2 meter!",
            },
          },
          {
            id: 2,
            question: "Berapa jenis penyu laut yang ada di dunia?",
            options: [
              { label: "A", text: "7" },
              { label: "B", text: "5" },
              { label: "C", text: "10" },
              { label: "D", text: "3" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Ada 7 jenis penyu, dan 6 di antaranya hidup di Indonesia!",
              wrong:
                "💡 Ada 7 jenis penyu, dan 6 di antaranya hidup di Indonesia!",
            },
          },
          {
            id: 3,
            question: "Semua jenis penyu laut di Indonesia adalah...",
            options: [
              { label: "A", text: "Dilindungi oleh hukum" },
              { label: "B", text: "Hewan peliharaan" },
              { label: "C", text: "Bisa dijual bebas" },
              { label: "D", text: "Tidak penting" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Penyu adalah satwa dilindungi—kita wajib menjaganya!",
              wrong: "💡 Penyu adalah satwa dilindungi—kita wajib menjaganya!",
            },
          },
        ],
      },
      level8: {
        title: "Saat Penyu Terluka",
        subtitle: "Penanganan Awal Penyu Terdampar",
        focus: "Penanganan awal penyu terdampar",
        mediaType: "image",
        mediaSrc: "../../../video/TUKA/Tuka lvl 8.png",
        content: {
          summary:
            "Menampilkan langkah aman menolong penyu dan melapor lewat fitur 'Emergency Rescue'.",
          detail: `Bagaimana jika kamu menemukan penyu terdampar atau terluka? Jangan panik. Jangan dorong ke laut, cukup laporkan dan jaga tetap tenang di tempatnya. Fitur Emergency Rescue akan membantu mengirim lokasi dan foto untuk tim konservasi.

<strong>Poin Utama:</strong>
• Jangan memindahkan penyu tanpa bantuan ahli
• Gunakan pelaporan cepat melalui sistem digital
• Edukasi masyarakat mempercepat penanganan satwa laut

<strong>Fun Fact:</strong>
🐢 Penyu bisa menahan napas hingga 7 jam jika mereka sakit atau stres!

<strong>Pesan Nilai Konservasi:</strong>
"Bantu dengan bijak, bukan dengan panik."`,
          keyPoints: [
            "Jangan memindahkan penyu tanpa bantuan ahli",
            "Gunakan pelaporan cepat melalui sistem digital",
            "Edukasi masyarakat mempercepat penanganan satwa laut",
          ],
        },
        questions: [
          {
            id: 1,
            question:
              "Apa yang harus dilakukan saat menemukan penyu terdampar?",
            options: [
              { label: "A", text: "Laporkan dan jaga jarak aman" },
              { label: "B", text: "Dorong langsung ke laut" },
              { label: "C", text: "Ambil foto dekat" },
              { label: "D", text: "Beri makanan seadanya" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Jangan panik! Laporkan lewat fitur Emergency Rescue agar ditangani ahli.",
              wrong:
                "💡 Jangan panik! Laporkan lewat fitur Emergency Rescue agar ditangani ahli.",
            },
          },
          {
            id: 2,
            question: "Mengapa tidak boleh langsung mengangkat penyu ke laut?",
            options: [
              { label: "A", text: "Karena bisa memperparah luka atau stres" },
              { label: "B", text: "Karena berat" },
              { label: "C", text: "Karena air terlalu dingin" },
              { label: "D", text: "Karena takut" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Penyu perlu diperiksa dulu oleh tim konservasi.",
              wrong: "💡 Penyu perlu diperiksa dulu oleh tim konservasi.",
            },
          },
          {
            id: 3,
            question:
              "Apa manfaat sistem pelaporan digital untuk konservasi penyu?",
            options: [
              { label: "A", text: "Mempercepat penanganan dan penyelamatan" },
              { label: "B", text: "Untuk hiburan" },
              { label: "C", text: "Agar penyu bisa viral" },
              { label: "D", text: "Agar wisatawan tahu arah" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Pelaporan cepat = nyawa penyu terselamatkan!",
              wrong: "💡 Pelaporan cepat = nyawa penyu terselamatkan!",
            },
          },
        ],
      },
      level9: {
        title: "Cerita Konservator",
        subtitle: "Peran Relawan Konservasi",
        focus: "Peran relawan konservasi",
        mediaType: "image",
        mediaSrc: "../../../video/TUKA/Tuka lvl 9.png",
        content: {
          summary:
            "Cerita Kak Daru, relawan penyu, membangkitkan empati dan rasa tanggung jawab.",
          detail: `Kenalan dengan Kak Daru, relawan konservasi yang sudah bertahun-tahun menjaga penyu di pesisir Yogyakarta. Ia rela begadang memantau telur, mengedukasi wisatawan, dan menyelamatkan penyu dari jaring nelayan. Kisah mereka mengajarkan bahwa konservasi dimulai dari kepedulian sederhana.

<strong>Poin Utama:</strong>
• Relawan adalah pahlawan tanpa sorotan
• Edukasi dan aksi nyata berjalan beriringan
• Konservasi dimulai dari satu langkah kecil

<strong>Fun Fact:</strong>
🐢 Beberapa relawan penyu membuat "adopsi tukik" untuk membiayai perawatan pantai!

<strong>Pesan Nilai Konservasi:</strong>
"Bukan seberapa besar aksi, tapi seberapa tulus niat menjaga laut."`,
          keyPoints: [
            "Relawan adalah pahlawan tanpa sorotan",
            "Edukasi dan aksi nyata berjalan beriringan",
            "Konservasi dimulai dari satu langkah kecil",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa tugas utama relawan konservasi penyu?",
            options: [
              {
                label: "A",
                text: "Menjaga telur, mengedukasi, dan menyelamatkan penyu",
              },
              { label: "B", text: "Menjual suvenir" },
              { label: "C", text: "Menangkap ikan" },
              { label: "D", text: "Menangkap penyu" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Relawan adalah pahlawan yang menjaga penyu tanpa pamrih.",
              wrong:
                "💡 Relawan adalah pahlawan yang menjaga penyu tanpa pamrih.",
            },
          },
          {
            id: 2,
            question: "Mengapa edukasi wisatawan penting dalam konservasi?",
            options: [
              {
                label: "A",
                text: "Agar mereka tahu cara berperilaku ramah lingkungan",
              },
              { label: "B", text: "Agar bisa memegang penyu" },
              { label: "C", text: "Agar pantai lebih ramai" },
              { label: "D", text: "Agar bisa berfoto lebih banyak" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Tepat! Edukasi menciptakan wisata yang cerdas dan peduli.",
              wrong: "💡 Edukasi menciptakan wisata yang cerdas dan peduli.",
            },
          },
          {
            id: 3,
            question: "Apa nilai utama yang dimiliki relawan konservasi?",
            options: [
              { label: "A", text: "Kepedulian dan konsistensi" },
              { label: "B", text: "Popularitas" },
              { label: "C", text: "Uang" },
              { label: "D", text: "Ketakutan" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Konservasi bukan soal ketenaran, tapi ketulusan.",
              wrong: "💡 Konservasi bukan soal ketenaran, tapi ketulusan.",
            },
          },
        ],
      },
      level10: {
        title: "Aku Penjaga Penyu",
        subtitle: "Komitmen Aksi Pribadi",
        focus: "Komitmen aksi pribadi",
        mediaType: "video",
        mediaSrc: "../../../video/TUKA/Tuka lvl 10.mp4",
        content: {
          summary: "Video contoh aksi yang bisa pengguna lakukan.",
          detail: `Tuka menutup petualanganmu dengan ajakan refleksi. Dari telur kecil hingga samudra luas, semua dimulai dari langkah pertama. Kini giliranmu — jadilah penjaga penyu! Kurangi plastik, dukung konservasi, dan sebarkan kisah mereka. Karena laut butuh lebih banyak hati yang peduli.

<strong>Poin Utama:</strong>
• Konservasi dimulai dari kebiasaan sehari-hari
• Setiap orang punya peran dalam menjaga penyu
• Refleksi membangun komitmen jangka panjang

<strong>Fun Fact:</strong>
🐢 Beberapa negara membuat paspor "penyu adopsi" sebagai simbol kepedulian global.

<strong>Pesan Nilai Konservasi:</strong>
"Jadilah penjaga penyu — pelindung kecil bagi lautan besar."`,
          keyPoints: [
            "Konservasi dimulai dari kebiasaan sehari-hari",
            "Setiap orang punya peran dalam menjaga penyu",
            "Refleksi membangun komitmen jangka panjang",
          ],
        },
        questions: [
          {
            id: 1,
            question: "Apa arti menjadi 'Penjaga Penyu'?",
            options: [
              { label: "A", text: "Menjadi bagian dari gerakan peduli laut" },
              { label: "B", text: "Memiliki penyu peliharaan" },
              { label: "C", text: "Memancing di laut" },
              { label: "D", text: "Makan telur penyu" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Jadi penjaga penyu berarti ikut menjaga kehidupan laut.",
              wrong:
                "💡 Jadi penjaga penyu berarti ikut menjaga kehidupan laut.",
            },
          },
          {
            id: 2,
            question:
              "Aksi kecil apa yang bisa kamu lakukan untuk bantu penyu?",
            options: [
              {
                label: "A",
                text: "Kurangi plastik dan jaga pantai tetap bersih",
              },
              { label: "B", text: "Beli cangkang penyu" },
              { label: "C", text: "Lepas tukik tanpa izin" },
              { label: "D", text: "Gunakan flash di pantai" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Sempurna! Mulai dari aksi kecil — tolak plastik, sayangi laut.",
              wrong: "💡 Mulai dari aksi kecil — tolak plastik, sayangi laut.",
            },
          },
          {
            id: 3,
            question:
              "Mengapa penting berbagi cerita tentang penyu ke orang lain?",
            options: [
              { label: "A", text: "Agar lebih banyak orang ikut peduli" },
              { label: "B", text: "Agar jadi terkenal" },
              { label: "C", text: "Agar pantai ramai" },
              { label: "D", text: "Agar penyu jadi tren" },
            ],
            correctAnswer: "A",
            feedback: {
              correct:
                "🎉 Benar! Semakin banyak yang tahu, semakin banyak yang menjaga.",
              wrong:
                "💡 Semakin banyak yang tahu, semakin banyak yang menjaga.",
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

/**
 * Get level data untuk level tertentu
 * @param {string} mascotId - 'tuka'
 * @param {number} levelNumber - 1-10
 * @returns {object} Level data
 */
function getLevelData(mascotId, levelNumber) {
  const mascotData = quizDatabase[mascotId];
  return mascotData?.levels[`level${levelNumber}`];
}

/**
 * Get total completed levels dari localStorage
 * @param {string} mascotId - 'tuka'
 * @returns {number} Jumlah level yang sudah diselesaikan
 */
function getCompletedLevels(mascotId) {
  const progress = JSON.parse(
    localStorage.getItem(`${mascotId}_progress`) || "{}"
  );
  return Object.keys(progress).length;
}

/**
 * Save level progress ke localStorage
 * @param {string} mascotId - 'tuka'
 * @param {number} levelNumber - 1-10
 * @param {number} stars - 1-3 bintang
 * @param {number} score - Skor yang didapat
 */
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

/**
 * Get star rating dari localStorage untuk level tertentu
 * @param {string} mascotId - 'tuka'
 * @param {number} levelNumber - 1-10
 * @returns {number} 0-3 bintang (0 = belum selesai)
 */
function getLevelStars(mascotId, levelNumber) {
  const progress = JSON.parse(
    localStorage.getItem(`${mascotId}_progress`) || "{}"
  );
  return progress[`level${levelNumber}`]?.stars || 0;
}

// Export untuk digunakan di file HTML
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    quizDatabase,
    getLevelData,
    getCompletedLevels,
    saveLevelProgress,
    getLevelStars,
  };
}
