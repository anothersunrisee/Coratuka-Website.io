// ========================================
// OCEAN CHALLENGE & REWARDS DATA INITIALIZATION
// Updated to match HTML structure
// ========================================

/**
 * Initialize Ocean Challenges data structure
 */
function initializeChallengeData() {
  console.log("🎯 Initializing Ocean Challenge & Rewards data...");

  // Check if already initialized
  if (
    localStorage.getItem("oceanChallenges") &&
    localStorage.getItem("oceanRewards") &&
    localStorage.getItem("challengeSubmissions")
  ) {
    console.log("✅ Challenge data already exists");
    return;
  }

  // ========================================
  // OCEAN CHALLENGES
  // ========================================
  const sampleChallenges = [
    {
      id: "ch-001",
      title: "Kumpulkan 20 sampah plastik di pantai",
      description:
        "Ambil sampah plastik di area pantai dan bantu menjaga kebersihan laut",
      category: "cleanup",
      categoryLabel: "🏖️ Cleanup Challenge",
      categoryColor: "success",
      duration: "15 menit",
      points: 50,
      maxParticipants: 100,
      currentParticipants: 47,
      location: "Area Pantai",
      image: "../../../../img/challenge/sampah.png",
      difficulty: "easy",
      status: "active",
      requirements: [
        "Kumpulkan minimal 20 sampah plastik",
        "Upload foto bukti sampah yang dikumpulkan (1-3 foto)",
        "Berikan deskripsi minimal 50 karakter tentang aktivitasmu",
      ],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date("2025-11-11T23:59:59").toISOString(),
    },
    {
      id: "ch-002",
      title: "Amati & Laporkan Penyu",
      description: "Dokumentasikan penyu yang kamu temui",
      category: "wildlife",
      categoryLabel: "🐢 Wildlife Challenge",
      categoryColor: "primary",
      duration: "30 menit",
      points: 75,
      maxParticipants: 100,
      currentParticipants: 72,
      location: "Pantai Glagah, Bantul",
      image: "../../../../img/challenge/penyu.png",
      difficulty: "medium",
      status: "in-progress",
      requirements: [
        "Jangan mengganggu penyu",
        "Ambil foto dari jarak aman",
        "Catat lokasi dan waktu dengan lengkap",
      ],
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(
        Date.now() + 2.21 * 24 * 60 * 60 * 1000
      ).toISOString(), // 2d 5h from now
    },
    {
      id: "ch-003",
      title: "Belanja Tanpa Plastik",
      description:
        "Bawa tas belanja sendiri dan hindari kantong plastik sekali pakai saat berbelanja.",
      category: "lifestyle",
      categoryLabel: "♻️ Lifestyle",
      categoryColor: "info",
      duration: "10 menit",
      points: 30,
      maxParticipants: 100,
      currentParticipants: 15,
      location: "Dimana saja",
      image: "../../../../img/challenge/jajan.png",
      difficulty: "easy",
      status: "completed",
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      requirements: [
        "Gunakan tas belanja sendiri",
        "Upload foto saat berbelanja",
        "Minimal 1 kali belanja",
      ],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ch-004",
      title: "kunjungi konservasi penyu dan ajak temanmu!",
      description: "ajak 3 reman ke konservasi penyu pantai pelangi",
      category: "education",
      categoryLabel: "📚 Education",
      categoryColor: "warning",
      duration: "20 menit",
      points: 40,
      maxParticipants: 200,
      currentParticipants: 123,
      location: "Online",
      image: "../../../../img/QR/thumb-penyu.png",
      difficulty: "easy",
      status: "active",
      requirements: [
        "Selesaikan 3 kuis Ocean Odyssey",
        "Skor minimal 80% tiap kuis",
        "Screenshot hasil kuis",
      ],
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ch-005",
      title: "Edukasi 5 Teman",
      description:
        "Ajak 5 temanmu untuk belajar tentang konservasi laut. Share pengetahuanmu!",
      category: "community",
      categoryLabel: "💙 Community",
      categoryColor: "secondary",
      duration: "1 minggu",
      points: 100,
      maxParticipants: 50,
      currentParticipants: 18,
      location: "Dimana saja",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
      difficulty: "medium",
      status: "active",
      requirements: [
        "Edukasi minimal 5 orang",
        "Dokumentasi foto/video",
        "Feedback dari peserta",
      ],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "ch-006",
      title: "Transplantasi Karang",
      description:
        "Ikuti program transplantasi terumbu karang. Bantu pulihkan ekosistem laut dengan aksi nyata!",
      category: "action",
      categoryLabel: "🪸 Action",
      categoryColor: "primary",
      duration: "1 hari",
      points: 200,
      maxParticipants: 30,
      currentParticipants: 12,
      location: "Pantai Marina, Semarang",
      image:
        "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=600&h=400&fit=crop",
      difficulty: "hard",
      status: "active",
      requirements: [
        "Daftar program resmi",
        "Ikuti pelatihan",
        "Transplantasi min 10 fragmen",
        "Upload sertifikat",
      ],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // ========================================
  // OCEAN REWARDS
  // ========================================
  const sampleRewards = [
    {
      id: "rw-001",
      title: "Eco Sticker Pack",
      description: "Set 10 stiker konservasi laut dengan desain eksklusif",
      category: "physical",
      categoryLabel: "Physical",
      pointsCost: 100,
      stock: 25,
      claimed: 5,
      image: "../../../../img/reward/sticker.png",
      badge: "🎨",
      type: "physical",
      isAvailable: true,
      features: [
        "10 stiker waterproof",
        "Desain eksklusif CORATUKA",
        "Bahan vinyl premium",
        "Ukuran bervariasi",
      ],
      claimLocation: "Pos Konservasi Pantai Parangtritis, Bantul",
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "rw-002",
      title: "Ocean E-Book Bundle",
      description: "Kumpulan 5 e-book tentang konservasi laut Indonesia",
      category: "digital",
      categoryLabel: "Digital",
      pointsCost: 150,
      stock: 999,
      claimed: 42,
      image: "../../../../img/reward/sticker.png",
      badge: "📚",
      type: "digital",
      isAvailable: true,
      features: [
        "5 e-book lengkap",
        "Format PDF + EPUB",
        "Total 500+ halaman",
        "Download instan",
      ],
      claimLocation: "Download Link Email",
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "rw-003",
      title: "CORATUKA Premium T-shirt",
      description: "Kaos eksklusif dengan desain limited edition",
      category: "physical",
      categoryLabel: "Physical",
      pointsCost: 250,
      stock: 15,
      claimed: 8,
      image: "../../../../img/reward/kaos.png",
      badge: "👜",
      type: "physical",
      isAvailable: true,
      features: [
        "Bahan kanvas premium",
        "Desain limited edition",
        "Ukuran: 40x35 cm",
        "Kapasitas 10 kg",
      ],
      claimLocation: "Kantor DPTEI FT UNY",
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "rw-004",
      title: "Coratuka Mug",
      description: "mug coratuka dengan desain eksklusif konservasi laut",
      category: "physical",
      categoryLabel: "Physical",
      pointsCost: 200,
      stock: 30,
      claimed: 12,
      image: "../../../../img/reward/mug.png",
      badge: "🥤",
      type: "physical",
      isAvailable: true,
      features: [
        "4 sedotan berbeda ukuran",
        "Sikat pembersih included",
        "Pouch kain praktis",
        "Food grade, aman",
      ],
      claimLocation: "Pos Konservasi Pantai Parangtritis, Bantul",
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "rw-005",
      title: "Ocean Webinar Access",
      description: "Akses eksklusif ke 3 webinar konservasi laut",
      category: "digital",
      categoryLabel: "Digital",
      pointsCost: 300,
      stock: 50,
      claimed: 18,
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop",
      badge: "🎓",
      type: "digital",
      isAvailable: true,
      features: [
        "3 sesi webinar live",
        "Materi dari ahli",
        "Sertifikat digital",
        "Q&A session",
      ],
      claimLocation: "Zoom Link Email",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // ========================================
  // CHALLENGE SUBMISSIONS (Dummy Data)
  // ========================================
  const sampleSubmissions = [
    // ===== CLEANUP CATEGORY =====
    {
      id: "sub-001",
      challengeId: "ch-001",
      challengeTitle: "Kumpulkan 20 sampah plastik di pantai",
      userId: "user-001",
      userName: "Budi Santoso",
      userEmail: "budi@example.com",
      status: "submitted",
      proofImages: [
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&h=400&fit=crop",
      ],
      notes:
        "Berhasil mengumpulkan 25 sampah plastik di Pantai Parangtritis. Kebanyakan botol plastik dan sedotan. Area pantai terlihat lebih bersih setelah aksi ini.",
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null,
    },
    {
      id: "sub-002",
      challengeId: "ch-001",
      challengeTitle: "Kumpulkan 20 sampah plastik di pantai",
      userId: "user-002",
      userName: "Siti Aminah",
      userEmail: "siti@example.com",
      status: "approved",
      proofImages: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
      ],
      notes:
        "Cleanup activity di Pantai Depok. Total 30 sampah plastik dikumpulkan termasuk kemasan makanan ringan.",
      submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      reviewedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      reviewedBy: "Conservator Admin",
      rejectionReason: null,
    },
    {
      id: "sub-003",
      challengeId: "ch-001",
      challengeTitle: "Kumpulkan 20 sampah plastik di pantai",
      userId: "user-003",
      userName: "Ahmad Fauzi",
      userEmail: "ahmad@example.com",
      status: "rejected",
      proofImages: [
        "https://images.unsplash.com/photo-1484160509687-5f4e0b641239?w=600&h=400&fit=crop",
      ],
      notes: "Membersihkan area pantai dari sampah plastik.",
      submittedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
      reviewedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      reviewedBy: "Conservator Admin",
      rejectionReason:
        "Foto kurang jelas dan jumlah sampah tidak terlihat memenuhi minimal 20 item. Mohon upload ulang dengan foto yang lebih jelas menunjukkan sampah yang dikumpulkan.",
    },

    // ===== WILDLIFE CATEGORY =====
    {
      id: "sub-004",
      challengeId: "ch-002",
      challengeTitle: "Amati & Laporkan Penyu",
      userId: "user-004",
      userName: "Dewi Lestari",
      userEmail: "dewi@example.com",
      status: "submitted",
      proofImages: [
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&h=400&fit=crop",
      ],
      notes:
        "Menemukan penyu hijau di Pantai Glagah pukul 06:30 WIB. Koordinat: -7.8962, 110.1553. Penyu dalam kondisi sehat dan sedang mencari makan.",
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null,
    },
    {
      id: "sub-005",
      challengeId: "ch-002",
      challengeTitle: "Amati & Laporkan Penyu",
      userId: "user-005",
      userName: "Rudi Hartono",
      userEmail: "rudi@example.com",
      status: "approved",
      proofImages: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      ],
      notes:
        "Dokumentasi penyu sisik yang sedang bertelur di Pantai Sukamade. Data sudah dicatat lengkap dengan waktu dan koordinat GPS.",
      submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
      reviewedAt: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
      reviewedBy: "Conservator Admin",
      rejectionReason: null,
    },
    {
      id: "sub-006",
      challengeId: "ch-002",
      challengeTitle: "Amati & Laporkan Penyu",
      userId: "user-006",
      userName: "Maya Sari",
      userEmail: "maya@example.com",
      status: "submitted",
      proofImages: [
        "https://images.unsplash.com/photo-1600353068678-a42a843ac5f4?w=600&h=400&fit=crop",
      ],
      notes:
        "Penyu tempayan di Pantai Tanjung Benoa. Foto diambil dari jarak aman 5 meter sesuai protokol.",
      submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null,
    },

    // ===== LIFESTYLE CATEGORY =====
    {
      id: "sub-007",
      challengeId: "ch-003",
      challengeTitle: "Belanja Tanpa Plastik",
      userId: "user-007",
      userName: "Lina Marlina",
      userEmail: "lina@example.com",
      status: "approved",
      proofImages: [
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop",
      ],
      notes:
        "Belanja di pasar tradisional menggunakan tas kanvas. Menolak semua kantong plastik dari pedagang!",
      submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      reviewedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      reviewedBy: "Conservator Admin",
      rejectionReason: null,
    },
    {
      id: "sub-008",
      challengeId: "ch-003",
      challengeTitle: "Belanja Tanpa Plastik",
      userId: "user-008",
      userName: "Agus Priyanto",
      userEmail: "agus@example.com",
      status: "submitted",
      proofImages: [
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=400&fit=crop",
      ],
      notes:
        "Belanja sayuran dan buah di supermarket dengan tas belanja sendiri. Zero waste shopping!",
      submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      reviewedAt: null,
      reviewedBy: null,
      rejectionReason: null,
    },
    {
      id: "sub-009",
      challengeId: "ch-003",
      challengeTitle: "Belanja Tanpa Plastik",
      userId: "user-009",
      userName: "Fitri Handayani",
      userEmail: "fitri@example.com",
      status: "approved",
      proofImages: [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
      ],
      notes:
        "Zero waste shopping di toko organik. Membawa wadah sendiri untuk semua belanjaan.",
      submittedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
      reviewedAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
      reviewedBy: "Conservator Admin",
      rejectionReason: null,
    },
  ];

  // ========================================
  // USER CLAIMED REWARDS (Dummy Data)
  // ========================================
  const sampleClaimedRewards = [
    {
      id: "claim-001",
      rewardId: "rw-001",
      rewardTitle: "Eco Sticker Pack",
      userId: "user-current",
      userName: "Current User",
      claimCode: "ECO-STK-8472",
      pointsUsed: 100,
      claimStatus: "claimed",
      claimedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      redeemedAt: null,
      claimLocation: "Pos Konservasi Pantai Parangtritis, Bantul",
      type: "physical",
    },
    {
      id: "claim-002",
      rewardId: "rw-002",
      rewardTitle: "Ocean E-Book Bundle",
      userId: "user-current",
      userName: "Current User",
      claimCode: "EBOOK-DIG-2849",
      pointsUsed: 150,
      claimStatus: "redeemed",
      claimedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      redeemedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      claimLocation: "Download Link Email",
      type: "digital",
    },
  ];

  // ========================================
  // USER PROFILE
  // ========================================
  const userProfile = {
    totalPoints: 150,
    completedChallenges: 5,
    impactTracker: {
      wasteCollected: "2.5 kg",
      treesPlanted: 3,
      carbonReduced: "5 kg",
    },
    badges: ["🏆", "🌟", "🎯"],
  };

  // Save to localStorage
  localStorage.setItem("oceanChallenges", JSON.stringify(sampleChallenges));
  localStorage.setItem("oceanRewards", JSON.stringify(sampleRewards));
  localStorage.setItem(
    "challengeSubmissions",
    JSON.stringify(sampleSubmissions)
  );
  localStorage.setItem("claimedRewards", JSON.stringify(sampleClaimedRewards));
  localStorage.setItem("userProfile", JSON.stringify(userProfile));

  console.log("✅ Ocean Challenges initialized (6 challenges)");
  console.log("✅ Ocean Rewards initialized (5 rewards)");
  console.log("✅ Challenge Submissions initialized (9 submissions)");
  console.log("✅ Claimed Rewards initialized (2 rewards)");
  console.log(
    "✅ User profile initialized (150 points, 5 completed challenges)"
  );
}

/**
 * Get challenge categories configuration
 */
function getChallengeCategories() {
  return {
    cleanup: {
      id: "cleanup",
      label: "🏖️ Cleanup",
      color: "success",
      bgClass: "bg-success",
      textClass: "text-success",
    },
    wildlife: {
      id: "wildlife",
      label: "🐢 Wildlife",
      color: "primary",
      bgClass: "bg-primary",
      textClass: "text-primary",
    },
    lifestyle: {
      id: "lifestyle",
      label: "♻️ Lifestyle",
      color: "info",
      bgClass: "bg-info",
      textClass: "text-info",
    },
    education: {
      id: "education",
      label: "📚 Education",
      color: "warning",
      bgClass: "bg-warning",
      textClass: "text-warning",
    },
    community: {
      id: "community",
      label: "💙 Community",
      color: "secondary",
      bgClass: "bg-secondary",
      textClass: "text-secondary",
    },
    action: {
      id: "action",
      label: "🪸 Action",
      color: "primary",
      bgClass: "bg-primary",
      textClass: "text-primary",
    },
  };
}

/**
 * Get difficulty levels configuration
 */
function getDifficultyLevels() {
  return {
    easy: {
      id: "easy",
      label: "Mudah",
      color: "#47b881",
      emoji: "🟢",
    },
    medium: {
      id: "medium",
      label: "Sedang",
      color: "#ffad0d",
      emoji: "🟡",
    },
    hard: {
      id: "hard",
      label: "Sulit",
      color: "#f64c4c",
      emoji: "🔴",
    },
  };
}

/**
 * Get reward categories configuration
 */
function getRewardCategories() {
  return {
    physical: {
      id: "physical",
      label: "Physical",
      emoji: "🎁",
      color: "success",
    },
    digital: {
      id: "digital",
      label: "Digital",
      emoji: "💻",
      color: "info",
    },
  };
}

/**
 * Get challenge status configuration
 */
function getChallengeStatuses() {
  return {
    active: {
      id: "active",
      label: "Tersedia",
      color: "primary",
      bgClass: "bg-primary",
      textClass: "text-primary",
    },
    "in-progress": {
      id: "in-progress",
      label: "Sedang Dikerjakan",
      color: "warning",
      bgClass: "bg-warning",
      textClass: "text-warning",
    },
    completed: {
      id: "completed",
      label: "Selesai",
      color: "success",
      bgClass: "bg-success",
      textClass: "text-success",
    },
    expired: {
      id: "expired",
      label: "Kadaluarsa",
      color: "danger",
      bgClass: "bg-danger",
      textClass: "text-danger",
    },
  };
}

/**
 * Get submission status configuration
 */
function getSubmissionStatuses() {
  return {
    submitted: {
      id: "submitted",
      label: "Menunggu Review",
      color: "warning",
      bgClass: "bg-warning/20",
      textClass: "text-warning",
      icon: "⏰",
    },
    approved: {
      id: "approved",
      label: "Disetujui",
      color: "success",
      bgClass: "bg-success/20",
      textClass: "text-success",
      icon: "✅",
    },
    rejected: {
      id: "rejected",
      label: "Ditolak",
      color: "danger",
      bgClass: "bg-danger/20",
      textClass: "text-danger",
      icon: "❌",
    },
  };
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format date to Indonesian locale
 */
function formatDateIndonesian(dateString) {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

/**
 * Calculate time remaining
 */
function getTimeRemaining(expiresAt) {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry - now;

  if (diff <= 0) {
    return "Expired";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h tersisa`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m tersisa`;
  } else {
    return `${minutes}m tersisa`;
  }
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} hari lalu`;
  } else if (hours > 0) {
    return `${hours} jam lalu`;
  } else if (minutes > 0) {
    return `${minutes} menit lalu`;
  } else {
    return "Baru saja";
  }
}

// ========================================
// AUTO-INITIALIZE ON LOAD
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeChallengeData);
} else {
  initializeChallengeData();
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
window.initializeChallengeData = initializeChallengeData;
window.getChallengeCategories = getChallengeCategories;
window.getDifficultyLevels = getDifficultyLevels;
window.getRewardCategories = getRewardCategories;
window.getChallengeStatuses = getChallengeStatuses;
window.getSubmissionStatuses = getSubmissionStatuses;
window.formatDateIndonesian = formatDateIndonesian;
window.getTimeRemaining = getTimeRemaining;
window.getRelativeTime = getRelativeTime;

console.log("✅ Challenge & Rewards data initialization module loaded");
