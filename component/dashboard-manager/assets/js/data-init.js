// ========================================
// DATA INITIALIZATION SCRIPT
// Ensures all localStorage keys are properly set up
// ========================================

/**
 * Initialize all required localStorage keys with proper structure
 * Run this once on first load or when data is missing
 */
function initializeAllData() {
  console.log("🔄 Initializing data structure...");

  // 1. EMERGENCY REPORTS
  if (!localStorage.getItem("emergencyReports")) {
    localStorage.setItem("emergencyReports", JSON.stringify([]));
    console.log("✅ Initialized: emergencyReports");
  }

  // 2. OCEAN CHALLENGES
  if (!localStorage.getItem("oceanChallenges")) {
    const sampleChallenges = [
      {
        id: "CHLG-001",
        title: "Beach Cleanup Challenge",
        description:
          "Join us to clean up Marina Beach and collect marine debris",
        thumbnail: "../../../../img/QR/",
        mascot: "coco",
        category: "beach-cleanup",
        rewardPoints: 100,
        maxParticipants: 50,
        currentParticipants: 0,
        location: "Pantai Marina, Semarang",
        startDate: "2025-11-10",
        endDate: "2025-11-20",
        duration: "10 days",
        status: "open",
        requirements: [
          "Bring your own gloves",
          "Wear comfortable clothes",
          "Take before/after photos",
        ],
        submissions: [],
        participants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "CHLG-002",
        title: "Sea Turtle Observation",
        description:
          "Document sea turtle nesting sites and report to conservation team",
        thumbnail: "",
        mascot: "tuka",
        category: "wildlife-observation",
        rewardPoints: 150,
        maxParticipants: 30,
        currentParticipants: 0,
        location: "Pantai Tirang, Semarang",
        startDate: "2025-11-15",
        endDate: "2025-12-15",
        duration: "1 month",
        status: "open",
        requirements: [
          "Observe from distance",
          "Document with photos",
          "Report location",
        ],
        submissions: [],
        participants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("oceanChallenges", JSON.stringify(sampleChallenges));
    console.log("✅ Initialized: oceanChallenges (2 samples)");
  }

  // 3. OCEAN REWARDS
  if (!localStorage.getItem("oceanRewards")) {
    const sampleRewards = [
      {
        id: "RWD-001",
        name: "CORATUKA T-Shirt",
        description: "Official CORATUKA conservation team t-shirt",
        image: "",
        type: "merchandise",
        pointsCost: 500,
        stock: 25,
        stockInitial: 50,
        status: "available",
        redemptionLocation: "Kantor CORATUKA, Semarang",
        mascot: "coco",
      },
      {
        id: "RWD-002",
        name: "Eco-Friendly Water Bottle",
        description: "Reusable stainless steel water bottle",
        image: "",
        type: "merchandise",
        pointsCost: 300,
        stock: 40,
        stockInitial: 50,
        status: "available",
        redemptionLocation: "Kantor CORATUKA, Semarang",
        mascot: "tuka",
      },
      {
        id: "RWD-003",
        name: "Beach Cleanup Voucher",
        description: "Free entry to guided beach cleanup event",
        image: "",
        type: "voucher",
        pointsCost: 200,
        stock: 100,
        stockInitial: 100,
        status: "available",
        redemptionLocation: "Any CORATUKA event",
        mascot: "coco",
      },
    ];
    localStorage.setItem("oceanRewards", JSON.stringify(sampleRewards));
    console.log("✅ Initialized: oceanRewards (3 samples)");
  }

  // 4. CAMPAIGN EVENTS
  if (!localStorage.getItem("campaignEvents")) {
    const sampleEvents = [
      {
        id: "EVT-001",
        title: "World Ocean Day Celebration",
        description:
          "Join us for a day of ocean conservation activities, educational workshops, and beach cleanup",
        image: "",
        date: "2025-06-08",
        time: "08:00",
        endTime: "16:00",
        location: "Pantai Marina, Semarang",
        locationCoords: { lat: -6.9932, lng: 110.4203 },
        maxParticipants: 100,
        currentParticipants: 0,
        status: "open",
        isFeatured: true,
        type: "campaign",
        category: "awareness",
        mascot: "coco",
        contactPerson: "Budi (0812-3456-7890)",
        organizer: "CORATUKA Conservation Team",
        registrants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "Dev Conservator",
      },
      {
        id: "EVT-002",
        title: "Coral Reef Restoration Workshop",
        description:
          "Learn about coral reef restoration techniques and participate in hands-on activities",
        image: "",
        date: "2025-11-25",
        time: "09:00",
        endTime: "15:00",
        location: "Pantai Kartini, Jepara",
        locationCoords: { lat: -6.5894, lng: 110.6678 },
        maxParticipants: 50,
        currentParticipants: 0,
        status: "open",
        isFeatured: false,
        type: "workshop",
        category: "education",
        mascot: "cora",
        contactPerson: "Siti (0813-4567-8901)",
        organizer: "CORATUKA Conservation Team",
        registrants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "Dev Conservator",
      },
    ];
    localStorage.setItem("campaignEvents", JSON.stringify(sampleEvents));
    console.log("✅ Initialized: campaignEvents (2 samples)");
  }

  // 5. OCEAN ODYSSEY LESSONS (Self-paced learning - DIFFERENT from Ocean Classroom!)
  if (!localStorage.getItem("oceanOdysseyLessons")) {
    const mascots = ["tuka", "cora", "coco"];
    const levels = ["beginner", "intermediate", "advanced"];
    const lessons = {};

    mascots.forEach((mascot) => {
      lessons[mascot] = {};
      levels.forEach((level) => {
        lessons[mascot][level] = {
          title: `${capitalize(mascot)} - ${capitalize(level)} Level`,
          mascot: mascot,
          level: level,
          description: `Learn about ${getMascotFocus(
            mascot
          )} at ${level} level`,
          sections: [
            {
              title: "Introduction",
              type: "text",
              content: `Welcome to ${capitalize(mascot)} ${level} lesson!`,
              order: 1,
            },
            {
              title: "Main Content",
              type: "text",
              content: `This is the main learning content for ${mascot}.`,
              order: 2,
            },
          ],
          estimatedTime: 15,
          completions: 0,
          avgScore: 0,
        };
      });
    });

    localStorage.setItem("oceanOdysseyLessons", JSON.stringify(lessons));
    console.log("✅ Initialized: oceanOdysseyLessons (9 lessons)");
  }

  // 6. OCEAN ODYSSEY QUIZZES
  if (!localStorage.getItem("oceanOdysseyQuizzes")) {
    const mascots = ["tuka", "cora", "coco"];
    const levels = ["beginner", "intermediate", "advanced"];
    const quizzes = {};

    mascots.forEach((mascot) => {
      quizzes[mascot] = {};
      levels.forEach((level) => {
        quizzes[mascot][level] = [
          {
            type: "multiple-choice",
            question: `What is the main focus of ${capitalize(mascot)}?`,
            options: [
              getMascotFocus(mascot),
              "General ocean knowledge",
              "Beach tourism",
              "Marine biology",
            ],
            correctAnswer: 0,
            explanation: `${capitalize(mascot)} focuses on ${getMascotFocus(
              mascot
            )}.`,
          },
          {
            type: "true-false",
            question: `${capitalize(mascot)} is one of the CORATUKA mascots.`,
            correctAnswer: true,
            explanation: `Yes, ${capitalize(
              mascot
            )} is one of the three CORATUKA mascots.`,
          },
        ];
      });
    });

    localStorage.setItem("oceanOdysseyQuizzes", JSON.stringify(quizzes));
    console.log("✅ Initialized: oceanOdysseyQuizzes (54 questions)");
  }

  // 7. USER ODYSSEY PROGRESS
  if (!localStorage.getItem("userOdysseyProgress")) {
    localStorage.setItem("userOdysseyProgress", JSON.stringify({}));
    console.log("✅ Initialized: userOdysseyProgress");
  }

  // 8. BEACH GUIDE LOCATIONS
  if (!localStorage.getItem("beachGuideLocations")) {
    const locations = {
      marina: {
        id: "marina",
        name: "Pantai Marina",
        description:
          "Pantai Marina adalah salah satu destinasi favorit di Semarang dengan pasir putih dan fasilitas lengkap.",
        coordinates: { lat: -6.9932, lng: 110.4203 },
        thumbnail: "",
        sections: [
          {
            type: "text",
            title: "Welcome to Marina Beach",
            content:
              "Marina Beach is one of the most popular beaches in Semarang, known for its white sand and complete facilities.",
            order: 1,
          },
          {
            type: "text",
            title: "Facilities",
            content:
              "Parking area, restrooms, food court, playground, and more.",
            order: 2,
          },
        ],
        scans: 0,
        lastScanned: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      maron: {
        id: "maron",
        name: "Pantai Maron",
        description:
          "Pantai Maron menawarkan suasana tenang dengan pemandangan sunset yang indah.",
        coordinates: { lat: -6.9845, lng: 110.4156 },
        thumbnail: "",
        sections: [
          {
            type: "text",
            title: "About Maron Beach",
            content:
              "Maron Beach offers a peaceful atmosphere with beautiful sunset views.",
            order: 1,
          },
        ],
        scans: 0,
        lastScanned: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tirang: {
        id: "tirang",
        name: "Pantai Tirang",
        description:
          "Pantai Tirang terkenal dengan ekosistem mangrove dan aktivitas konservasi.",
        coordinates: { lat: -6.9956, lng: 110.4289 },
        thumbnail: "",
        sections: [
          {
            type: "text",
            title: "Tirang Conservation Area",
            content:
              "Tirang Beach is famous for its mangrove ecosystem and conservation activities.",
            order: 1,
          },
        ],
        scans: 0,
        lastScanned: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      baruna: {
        id: "baruna",
        name: "Pantai Baruna",
        description:
          "Pantai Baruna cocok untuk keluarga dengan playground dan area piknik.",
        coordinates: { lat: -6.9923, lng: 110.4178 },
        thumbnail: "",
        sections: [],
        scans: 0,
        lastScanned: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      kartini: {
        id: "kartini",
        name: "Pantai Kartini",
        description:
          "Pantai Kartini adalah ikon Jepara dengan taman laut yang menarik.",
        coordinates: { lat: -6.5894, lng: 110.6678 },
        thumbnail: "",
        sections: [],
        scans: 0,
        lastScanned: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      "muara-baru": {
        id: "muara-baru",
        name: "Pantai Muara Baru",
        description:
          "Pantai Muara Baru menawarkan spot fishing dan kuliner seafood segar.",
        coordinates: { lat: -6.9978, lng: 110.4312 },
        thumbnail: "",
        sections: [],
        scans: 0,
        lastScanned: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    localStorage.setItem("beachGuideLocations", JSON.stringify(locations));
    console.log("✅ Initialized: beachGuideLocations (6 locations)");
  }

  // 9. OCEAN CLASSROOM (Batch-based classes - DIFFERENT from Ocean Odyssey!)
  if (!localStorage.getItem("oceanClasses")) {
    const sampleClasses = [
      {
        id: "CLASS-001",
        title: "Turtle Class - Batch #1",
        theme: "Konservasi Penyu - Pantai Pelangi",
        description:
          "Jelajahi keindahan terumbu karang dalam tur 3D interaktif dan temukan beragam biota laut.",
        mascot: "tuka",
        location: "Pantai Marina, Semarang",
        startDate: "2025-11-01",
        endDate: "2025-12-31",
        maxStudents: 30,
        classCode: "TURTLE2025",
        thumbnail: "../../../../img/classroom/turtle.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "Dev Conservator",
      },
      {
        id: "CLASS-002",
        title: "Coral Class - Batch #2",
        theme: "Restorasi Terumbu Karang",
        description:
          "Pelajari teknik restorasi terumbu karang dan konservasi ekosistem laut.",
        mascot: "cora",
        location: "Pantai Kartini, Jepara",
        startDate: "2025-11-15",
        endDate: "2026-01-15",
        maxStudents: 25,
        classCode: "CORAL2025",
        thumbnail: "../../../../img/classroom/coral.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "Dev Conservator",
      },
    ];

    localStorage.setItem("oceanClasses", JSON.stringify(sampleClasses));
    console.log("✅ Initialized: oceanClasses (2 sample classes)");
  }

  // 10. OCEAN CLASS STUDENTS
  if (!localStorage.getItem("oceanClassStudents")) {
    localStorage.setItem("oceanClassStudents", JSON.stringify([]));
    console.log("✅ Initialized: oceanClassStudents");
  }

  // 11. OCEAN TASK SUBMISSIONS
  if (!localStorage.getItem("oceanTaskSubmissions")) {
    localStorage.setItem("oceanTaskSubmissions", JSON.stringify([]));
    console.log("✅ Initialized: oceanTaskSubmissions");
  }

  // 12. OCEAN CERTIFICATES
  if (!localStorage.getItem("oceanCertificates")) {
    localStorage.setItem("oceanCertificates", JSON.stringify([]));
    console.log("✅ Initialized: oceanCertificates");
  }

  // 13. BEACH QR CONTENT (6 topics matching qr-content.json)
  if (!localStorage.getItem("beachQRContent")) {
    const qrTopics = {
      sampah: {
        title: "Tempat Sampah Pantai",
        icon: "🗑️",
        mascot: "coco",
        cardImage: "../../../../img/QR/thumb-sampah.png",
        media: {
          type: "image",
          url: "../../../../img/QR/materi-sampah.png",
        },
        why: {
          title: "Mengapa Penting?",
          content:
            "Sampah plastik di pantai dapat terbawa arus ke laut dan merusak ekosistem. Setiap tahun, jutaan ton sampah berakhir di lautan, membahayakan kehidupan laut seperti penyu dan ikan.",
        },
        actions: {
          title: "Apa yang Bisa Kamu Lakukan?",
          list: [
            "Pisahkan sampah organik dan anorganik",
            "Buang sampah di tempat yang telah disediakan",
            "Bawa kantong sendiri untuk membawa pulang sampahmu",
            "Ajak teman atau keluarga untuk ikut menjaga kebersihan pantai",
          ],
        },
        fact: {
          title: "Fakta Lokal",
          content:
            "Pantai di Indonesia menghasilkan rata-rata 20-50 kg sampah per hari. Dengan memilah sampah, volume yang masuk ke TPA bisa berkurang hingga 40%!",
        },
        appreciation:
          "Terima kasih sudah peduli! Setiap aksi kecilmu membantu pantai tetap bersih. 🌊",
        scans: 0,
        lastUpdated: new Date().toISOString(),
      },
      penyu: {
        title: "Konservasi Penyu Laut",
        icon: "🐢",
        mascot: "tuka",
        cardImage: "../../../../img/QR/thumb-penyu.png",
        media: { type: "image", url: "../../../../img/QR/materi-penyu.png" },
        why: {
          title: "Mengapa Penting?",
          content:
            "Penyu laut adalah spesies yang terancam punah. Mereka berperan penting dalam menjaga keseimbangan ekosistem laut.",
        },
        actions: {
          title: "Apa yang Bisa Kamu Lakukan?",
          list: [
            "Jangan menyentuh atau mengganggu penyu dan sarangnya",
            "Matikan lampu atau flash kamera di malam hari",
            "Jaga jarak minimal 3 meter saat mengamati penyu",
            "Laporkan jika menemukan sarang penyu yang terluka",
          ],
        },
        fact: {
          title: "Fakta Lokal",
          content:
            "Indonesia adalah rumah bagi 6 dari 7 spesies penyu di dunia! Hanya 1 dari 1.000 tukik yang berhasil bertahan hingga dewasa.",
        },
        appreciation:
          "Hebat! Dengan menjaga penyu, kamu melindungi lautan untuk masa depan. 🐢💚",
        scans: 0,
        lastUpdated: new Date().toISOString(),
      },
      terumbu: {
        title: "Ekosistem Terumbu Karang",
        icon: "🪸",
        mascot: "cora",
        cardImage: "../../../../img/QR/thumb-coral.png",
        media: { type: "image", url: "../../../../img/QR/materi-coral.png" },
        why: {
          title: "Mengapa Penting?",
          content:
            'Terumbu karang adalah "hutan hujan" dari lautan. Mereka menyediakan rumah bagi 25% kehidupan laut.',
        },
        actions: {
          title: "Apa yang Bisa Kamu Lakukan?",
          list: [
            "Jangan berdiri atau menginjak terumbu karang",
            "Jaga jarak aman minimal 1 meter dari karang",
            "Gunakan sunscreen ramah karang",
            "Jangan mengambil souvenir dari karang atau biota laut",
          ],
        },
        fact: {
          title: "Fakta Lokal",
          content:
            "Indonesia memiliki 18% terumbu karang dunia, terluas kedua setelah Australia.",
        },
        appreciation:
          "Keren! Dengan menjaga terumbu karang, kamu melindungi rumah ribuan makhluk laut. 🪸✨",
        scans: 0,
        lastUpdated: new Date().toISOString(),
      },
      bleaching: {
        title: "Pemutihan Karang (Coral Bleaching)",
        icon: "🌡️",
        mascot: "cora",
        cardImage: "../../../../img/QR/thumb-bleaching.png",
        media: {
          type: "image",
          url: "../../../../img/QR/materi-bleaching.png",
        },
        why: {
          title: "Mengapa Penting?",
          content:
            "Coral bleaching terjadi ketika suhu air laut meningkat akibat perubahan iklim.",
        },
        actions: {
          title: "Apa yang Bisa Kamu Lakukan?",
          list: [
            "Kurangi jejak karbon dengan transportasi ramah lingkungan",
            "Dukung program restorasi terumbu karang lokal",
            "Edukasi orang lain tentang perubahan iklim",
            "Hindari aktivitas yang merusak karang",
          ],
        },
        fact: {
          title: "Fakta Lokal",
          content:
            "Pada tahun 2016, peristiwa bleaching global menyebabkan 50% terumbu karang dunia memutih.",
        },
        appreciation:
          "Luar biasa! Aksi kecilmu membantu melindungi karang. 🌡️💙",
        scans: 0,
        lastUpdated: new Date().toISOString(),
      },
      rambu: {
        title: "Rambu & Zona Pantai",
        icon: "⚠️",
        mascot: "coco",
        cardImage: "../../../../img/QR/thumb-rambu.png",
        media: { type: "image", url: "../../../../img/QR/materi-rambu.png" },
        why: {
          title: "Mengapa Penting?",
          content:
            "Rambu pantai dipasang untuk menjaga keselamatan pengunjung dan melindungi area konservasi.",
        },
        actions: {
          title: "Apa yang Bisa Kamu Lakukan?",
          list: [
            "Baca dan patuhi semua rambu yang terpasang",
            "Jangan memasuki zona larangan",
            "Ikuti jalur yang telah ditentukan",
            "Tanyakan kepada petugas jika ada yang kurang jelas",
          ],
        },
        fact: {
          title: "Fakta Lokal",
          content:
            "Banyak pantai di Indonesia memiliki arus bawah (rip current) yang berbahaya. Ikuti rambu untuk keselamatan!",
        },
        appreciation:
          "Pintar! Dengan mengikuti rambu, kamu menjaga diri sendiri dan alam. ⚠️🌊",
        scans: 0,
        lastUpdated: new Date().toISOString(),
      },
      jajan: {
        title: "Area Jajanan Pantai",
        icon: "🍴",
        mascot: "coco",
        cardImage: "../../../../img/QR/thumb-jajan.png",
        media: { type: "image", url: "../../../../img/QR/materi-jajan.png" },
        why: {
          title: "Mengapa Penting?",
          content:
            "Area jajanan di pantai sering menjadi titik awal sampah berserakan.",
        },
        actions: {
          title: "Apa yang Bisa Kamu Lakukan?",
          list: [
            "Buang semua sampah di tempat sampah setelah jajan",
            "Bawa wadah atau botol sendiri",
            "Dukung UMKM lokal yang ramah lingkungan",
            "Jangan tinggalkan sisa makanan di pasir",
          ],
        },
        fact: {
          title: "Fakta Lokal",
          content:
            "Plastik sekali pakai seperti sedotan menjadi penyumbang terbesar sampah pantai. Satu sedotan butuh 200 tahun untuk terurai!",
        },
        appreciation: "Mantap! Kebiasaan kecilmu membawa dampak besar. 🍴🌊",
        scans: 0,
        lastUpdated: new Date().toISOString(),
      },
    };

    localStorage.setItem("beachQRContent", JSON.stringify(qrTopics));
    console.log("✅ Initialized: beachQRContent (6 topics)");
  }

  console.log("✅ All data structures initialized!");
  console.log("💡 Refresh page to see data loaded in managers");

  return true;
}

/**
 * Check if data needs initialization
 * @returns {boolean}
 */
function needsDataInitialization() {
  const requiredKeys = [
    "emergencyReports",
    "oceanChallenges",
    "oceanRewards",
    "campaignEvents",
    "oceanOdysseyLessons",
    "oceanOdysseyQuizzes",
    "beachGuideLocations",
    "oceanClasses",
    "oceanClassStudents",
    "oceanTaskSubmissions",
    "oceanCertificates",
    "beachQRContent",
  ];

  const missingKeys = requiredKeys.filter((key) => !localStorage.getItem(key));

  if (missingKeys.length > 0) {
    console.log("⚠️ Missing data keys:", missingKeys);
    return true;
  }

  return false;
}

/**
 * Helper function to capitalize string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Helper function to get mascot focus
 */
function getMascotFocus(mascot) {
  const focuses = {
    tuka: "Sea turtle conservation",
    cora: "Coral reef restoration",
    coco: "Sustainable coastal tourism",
  };
  return focuses[mascot] || "Marine conservation";
}

// ========================================
// AUTO-INITIALIZE ON LOAD
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  if (needsDataInitialization()) {
    console.log("🔄 Data initialization needed...");
    initializeAllData();
  } else {
    console.log("✅ All data already initialized");
  }
});

// ========================================
// MANUAL TRIGGER FUNCTION
// ========================================
window.initializeAllData = initializeAllData;
window.needsDataInitialization = needsDataInitialization;

console.log("✅ Data initialization script loaded");
console.log("💡 Run initializeAllData() to set up sample data");
