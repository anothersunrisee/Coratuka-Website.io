// ==========================================
// CORATUKA - Data Initialization for Manager
// Initialize campaign and event data from user pages
// ==========================================

// === CAMPAIGN DATA (from campaign.html) ===
const INITIAL_CAMPAIGNS = [
  {
    id: "campaign-1",
    title: "Kampanye #SaveOurReef",
    category: "edukasi",
    description:
      "Edukasi pentingnya terumbu karang untuk ekosistem laut dan cara melindunginya melalui berbagai aktivitas awareness online dan offline.",
    emoji: "🪸",
    participants: 234,
    target: 500,
    status: "open",
    duration: "3 bulan",
    createdAt: "2025-08-01T00:00:00Z",
    registrants: [],
  },
  {
    id: "campaign-2",
    title: "Bijak Plastik di Pantai",
    category: "kampanye",
    description:
      "Kampanye pengurangan sampah plastik dan promosi penggunaan produk ramah lingkungan di kawasan pesisir.",
    emoji: "♻️",
    participants: 567,
    target: 1000,
    status: "open",
    duration: "6 bulan",
    createdAt: "2025-07-15T00:00:00Z",
    registrants: [],
  },
  {
    id: "campaign-3",
    title: "Jaga Penyu Bersama",
    category: "relawan",
    description:
      "Program rekrutmen relawan untuk monitoring dan perlindungan habitat penyu laut sepanjang pesisir Indonesia.",
    emoji: "🐢",
    participants: 89,
    target: 150,
    status: "open",
    duration: "1 tahun",
    createdAt: "2025-06-20T00:00:00Z",
    registrants: [],
  },
  {
    id: "campaign-4",
    title: "Laut Sehat, Hidup Sehat",
    category: "edukasi",
    description:
      "Program edukasi tentang hubungan kesehatan laut dengan kesehatan manusia dan pentingnya menjaga ekosistem laut.",
    emoji: "🌊",
    participants: 178,
    target: 300,
    status: "open",
    duration: "4 bulan",
    createdAt: "2025-05-10T00:00:00Z",
    registrants: [],
  },
  {
    id: "campaign-5",
    title: "Pantai Bersih Indonesia",
    category: "edukasi",
    description:
      "Campaign edukasi kebersihan pantai yang telah selesai dilaksanakan dengan sukses.",
    emoji: "🌿",
    participants: 450,
    target: 500,
    status: "completed",
    duration: "3 bulan",
    createdAt: "2025-03-01T00:00:00Z",
    registrants: [],
  },
];

// === EVENT DATA (from event.html) ===
const INITIAL_EVENTS = [
  {
    id: "event-1",
    title: "Bersih Pantai Teluk Awur",
    category: "relawan",
    description:
      "Bergabunglah dalam aksi bersih pantai untuk mengangkat sampah plastik dan edukasi wisatawan tentang pentingnya menjaga kebersihan laut.",
    emoji: "🏖️",
    date: "2025-11-15",
    time: "08:00",
    location: "Pantai Teluk Awur, Jepara",
    participants: 45,
    maxParticipants: 50,
    status: "open",
    isFeatured: false,
    contact: "Ibu Sri (081234567890)",
    createdAt: "2025-10-15T00:00:00Z",
    registrants: [],
  },
  {
    id: "event-2",
    title: "Pelepasan Penyu",
    category: "edukasi",
    description:
      "Saksikan langsung pelepasan tukik (anak penyu) ke laut dan pelajari siklus hidup penyu serta tantangan konservasinya.",
    emoji: "🐢",
    date: "2025-11-20",
    time: "17:00",
    location: "Pantai Sindhu, Bali",
    participants: 23,
    maxParticipants: 40,
    status: "open",
    isFeatured: true,
    contact: "Pak Wayan (081234567891)",
    createdAt: "2025-10-20T00:00:00Z",
    registrants: [],
  },
  {
    id: "event-3",
    title: "Workshop Konservasi Terumbu",
    category: "edukasi",
    description:
      "Pelatihan identifikasi dan monitoring kesehatan terumbu karang menggunakan metode ilmiah untuk konservasi.",
    emoji: "🪸",
    date: "2025-11-25",
    time: "09:00",
    location: "Balai Konservasi, Lombok",
    participants: 18,
    maxParticipants: 30,
    status: "open",
    isFeatured: false,
    contact: "Dr. Ahmad (081234567892)",
    createdAt: "2025-10-25T00:00:00Z",
    registrants: [],
  },
  {
    id: "event-4",
    title: "Penanaman Mangrove",
    category: "kampanye",
    description:
      "Tanam 500 bibit mangrove untuk perlindungan pesisir dan mencegah abrasi pantai.",
    emoji: "🌱",
    date: "2025-11-30",
    time: "07:00",
    location: "Hutan Mangrove, Surabaya",
    participants: 34,
    maxParticipants: 60,
    status: "open",
    isFeatured: true,
    contact: "Pak Joko (081234567893)",
    createdAt: "2025-10-30T00:00:00Z",
    registrants: [],
  },
  {
    id: "event-5",
    title: "Bersih Pantai Parangtritis",
    category: "relawan",
    description:
      "Event bersih pantai yang telah selesai dilaksanakan dengan sukses.",
    emoji: "🌊",
    date: "2025-11-01",
    time: "08:00",
    location: "Pantai Parangtritis, Yogyakarta",
    participants: 60,
    maxParticipants: 60,
    status: "completed",
    isFeatured: false,
    contact: "Ibu Dewi (081234567894)",
    createdAt: "2025-10-01T00:00:00Z",
    registrants: [
      {
        userName: "Ahmad Fauzi",
        userEmail: "ahmad.fauzi@email.com",
        userPhone: "081234567895",
        attended: true,
        registeredAt: "2025-10-15T10:00:00Z",
      },
      {
        userName: "Siti Nurhaliza",
        userEmail: "siti.nur@email.com",
        userPhone: "081234567896",
        attended: true,
        registeredAt: "2025-10-16T14:30:00Z",
      },
      {
        userName: "Budi Santoso",
        userEmail: "budi.santoso@email.com",
        userPhone: "081234567897",
        attended: false,
        registeredAt: "2025-10-20T09:15:00Z",
      },
    ],
  },
];

// ==========================================
// INITIALIZATION FUNCTION
// ==========================================
function initializeData() {
  // Initialize campaigns if not exists
  let campaigns = localStorage.getItem("coratukaCampaigns");
  if (!campaigns) {
    localStorage.setItem(
      "coratukaCampaigns",
      JSON.stringify(INITIAL_CAMPAIGNS)
    );
    console.log(
      "✅ Campaign data initialized:",
      INITIAL_CAMPAIGNS.length,
      "campaigns"
    );
  } else {
    console.log("📋 Campaign data already exists");
  }

  // Initialize events if not exists
  let events = localStorage.getItem("campaignEvents");
  if (!events) {
    localStorage.setItem("campaignEvents", JSON.stringify(INITIAL_EVENTS));
    console.log("✅ Event data initialized:", INITIAL_EVENTS.length, "events");
  } else {
    console.log("📋 Event data already exists");
  }
}

// Auto-initialize when loaded
initializeData();

// Export for external use
window.initializeData = initializeData;
window.INITIAL_CAMPAIGNS = INITIAL_CAMPAIGNS;
window.INITIAL_EVENTS = INITIAL_EVENTS;

console.log("🎯 Data initialization module loaded");
