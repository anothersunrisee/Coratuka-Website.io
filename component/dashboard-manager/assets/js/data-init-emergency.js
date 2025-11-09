// ========================================
// EMERGENCY RESCUE DATA INITIALIZATION
// Separate file for emergency-specific data
// ========================================

/**
 * Initialize Emergency Reports data structure
 */
function initializeEmergencyData() {
  console.log("🚨 Initializing Emergency Rescue data...");

  // Check if already initialized
  if (localStorage.getItem("emergencyReports")) {
    console.log("✅ Emergency data already exists");
    return;
  }

  // Sample emergency reports
  const sampleReports = [
    {
      id: generateEmergencyId(),
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      reporterName: "User Test 1",
      reporterPhone: "081234567890",
      reporterEmail: "konservator@coratuka.id",
      location: {
        text: "Pantai Marina, Semarang",
        coords: { lat: -6.9932, lng: 110.4203 },
      },
      animalType: "sea-turtle",
      animalTypeLabel: "Penyu Laut",
      condition: "injured",
      conditionLabel: "Terluka",
      description:
        "Penyu hijau ditemukan terdampar dengan luka di siripnya. Kondisi lemah namun masih bernapas.",
      photos: ["../../../../img/reporting/test.jpg"],
      status: "in-progress",
      priority: "high",
      assignedTo: "",
      handlerNotes: "",
      statusHistory: [
        {
          status: "pending",
          timestamp: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          title: "Laporan Diterima",
          note: "Laporan telah masuk sistem dan sedang ditinjau",
          updatedBy: "System",
        },
        {
          status: "in-progress",
          timestamp: new Date(
            Date.now() - 1.5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          title: "Tim Respons Dikirim",
          note: "Tim penyelamat sudah dikirim ke lokasi",
          updatedBy: "Dev Conservator",
        },
      ],
    },
    {
      id: generateEmergencyId(),
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      reporterName: "Siti Aminah",
      reporterPhone: "081298765432",
      reporterEmail: "siti@example.com",
      location: {
        text: "Pantai Tirang, Semarang",
        coords: { lat: -6.9956, lng: 110.4289 },
      },
      animalType: "dolphin",
      animalTypeLabel: "Lumba-lumba",
      condition: "stranded",
      conditionLabel: "Terdampar",
      description:
        "Lumba-lumba terdampar di pantai, kesulitan bernapas. Butuh penanganan segera.",
      photos: [],
      status: "resolved",
      priority: "urgent",
      assignedTo: "Dev Conservator",
      handlerNotes:
        "Berhasil dikembalikan ke laut setelah pemeriksaan kesehatan.",
      statusHistory: [
        {
          status: "pending",
          timestamp: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          title: "Laporan Diterima",
          note: "Laporan emergency diterima",
          updatedBy: "System",
        },
        {
          status: "in-progress",
          timestamp: new Date(
            Date.now() - 4.8 * 24 * 60 * 60 * 1000
          ).toISOString(),
          title: "Tim di Lokasi",
          note: "Tim emergency response telah tiba di lokasi",
          updatedBy: "Dev Conservator",
        },
        {
          status: "resolved",
          timestamp: new Date(
            Date.now() - 4.5 * 24 * 60 * 60 * 1000
          ).toISOString(),
          title: "Penyelamatan Berhasil",
          note: "Lumba-lumba berhasil dikembalikan ke laut dalam kondisi sehat",
          updatedBy: "Dev Conservator",
        },
      ],
    },
  ];

  // Save to localStorage
  localStorage.setItem("emergencyReports", JSON.stringify(sampleReports));
  console.log("✅ Emergency reports initialized (2 samples)");
}

/**
 * Generate unique emergency ID
 */
function generateEmergencyId() {
  const date = new Date();
  const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ER-${dateStr}-${randomNum}`;
}

/**
 * Get animal types configuration
 */
function getAnimalTypes() {
  return {
    "sea-turtle": {
      id: "sea-turtle",
      label: "Penyu Laut",
      emoji: "🐢",
      priority: "high",
    },
    dolphin: {
      id: "dolphin",
      label: "Lumba-lumba",
      emoji: "🐬",
      priority: "urgent",
    },
    shark: {
      id: "shark",
      label: "Hiu",
      emoji: "🦈",
      priority: "high",
    },
    "manta-ray": {
      id: "manta-ray",
      label: "Pari Manta",
      emoji: "🦋",
      priority: "medium",
    },
    whale: {
      id: "whale",
      label: "Paus",
      emoji: "🐋",
      priority: "urgent",
    },
    other: {
      id: "other",
      label: "Lainnya",
      emoji: "🐠",
      priority: "medium",
    },
  };
}

/**
 * Get condition types configuration
 */
function getConditionTypes() {
  return {
    stranded: {
      id: "stranded",
      label: "Terdampar",
      priority: "medium",
    },
    injured: {
      id: "injured",
      label: "Terluka",
      priority: "high",
    },
    entangled: {
      id: "entangled",
      label: "Terjerat",
      priority: "high",
    },
    sick: {
      id: "sick",
      label: "Sakit",
      priority: "medium",
    },
    dead: {
      id: "dead",
      label: "Mati",
      priority: "urgent",
    },
    other: {
      id: "other",
      label: "Lainnya",
      priority: "low",
    },
  };
}

/**
 * Calculate priority based on animal and condition
 */
function calculatePriority(animalType, condition) {
  const animals = getAnimalTypes();
  const conditions = getConditionTypes();

  // Urgent conditions always override
  if (condition === "dead" || condition === "entangled") {
    return "urgent";
  }

  // High priority animals + serious conditions
  if (
    (animalType === "sea-turtle" || animalType === "dolphin") &&
    (condition === "injured" || condition === "stranded")
  ) {
    return "high";
  }

  // Use condition priority as base
  return conditions[condition]?.priority || "medium";
}

// ========================================
// AUTO-INITIALIZE ON LOAD
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEmergencyData);
} else {
  initializeEmergencyData();
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
window.initializeEmergencyData = initializeEmergencyData;
window.getAnimalTypes = getAnimalTypes;
window.getConditionTypes = getConditionTypes;
window.calculatePriority = calculatePriority;
window.generateEmergencyId = generateEmergencyId;

console.log("✅ Emergency data initialization module loaded");
