// ==========================================
// CORATUKA - Campaign & Event JavaScript
// Complete functionality for campaign.html & event.html
// ==========================================

// === CONFIGURATION ===
const CONFIG = {
  userDataKey: "coratukaUser",
  registeredCampaignsKey: "registeredCampaigns",
  registeredEventsKey: "registeredEvents",
};

// === DUMMY USER DATA ===
const DUMMY_USER = {
  nama: "Fajar Ahnaf",
  email: "Fajarahnf@email.com",
  phone: "081234567890",
  instansi: "Universitas negeri Yogyakarta",
  usia: 17,
};

// === CAMPAIGN DATA ===
const CAMPAIGN_DATA = {
  "campaign-1": {
    id: "campaign-1",
    title: "Kampanye #SaveOurReef",
    category: "edukasi",
    description:
      "Edukasi pentingnya terumbu karang untuk ekosistem laut dan cara melindunginya melalui berbagai aktivitas awareness online dan offline.",
    emoji: "🪸",
    participants: 234,
    target: 500,
  },
  "campaign-2": {
    id: "campaign-2",
    title: "Bijak Plastik di Pantai",
    category: "kampanye",
    description:
      "Kampanye pengurangan sampah plastik dan promosi penggunaan produk ramah lingkungan di kawasan pesisir.",
    emoji: "♻️",
    participants: 567,
    target: 1000,
  },
  "campaign-3": {
    id: "campaign-3",
    title: "Jaga Penyu Bersama",
    category: "relawan",
    description:
      "Program rekrutmen relawan untuk monitoring dan perlindungan habitat penyu laut sepanjang pesisir Indonesia.",
    emoji: "🐢",
    participants: 89,
    target: 150,
  },
  "campaign-4": {
    id: "campaign-4",
    title: "Laut Sehat, Hidup Sehat",
    category: "edukasi",
    description:
      "Program edukasi tentang hubungan kesehatan laut dengan kesehatan manusia dan pentingnya menjaga ekosistem laut.",
    emoji: "🌊",
    participants: 178,
    target: 300,
  },
  "campaign-5": {
    id: "campaign-5",
    title: "Pantai Bersih Indonesia",
    category: "edukasi",
    description:
      "Campaign edukasi kebersihan pantai yang telah selesai dilaksanakan dengan sukses.",
    emoji: "🌿",
    participants: 450,
    target: 500,
    completed: true,
  },
};

// === EVENT DATA ===
const EVENT_DATA = {
  "event-1": {
    id: "event-1",
    title: "Bersih Pantai Teluk Awur",
    category: "relawan",
    description:
      "Bergabunglah dalam aksi bersih pantai untuk mengangkat sampah plastik dan edukasi wisatawan tentang pentingnya menjaga kebersihan laut.",
    emoji: "🏖️",
    date: "15 November 2025",
    time: "08:00 - 12:00 WIB",
    location: "Pantai Teluk Awur, Jepara",
    participants: 45,
    quota: 50,
  },
  "event-2": {
    id: "event-2",
    title: "Pelepasan Penyu",
    category: "edukasi",
    description:
      "Saksikan langsung pelepasan tukik (anak penyu) ke laut dan pelajari siklus hidup penyu serta tantangan konservasinya.",
    emoji: "🐢",
    date: "20 November 2025",
    time: "17:00 - 19:00 WIB",
    location: "Pantai Sindhu, Bali",
    participants: 23,
    quota: 40,
  },
  "event-3": {
    id: "event-3",
    title: "Workshop Konservasi Terumbu",
    category: "edukasi",
    description:
      "Pelatihan identifikasi dan monitoring kesehatan terumbu karang menggunakan metode ilmiah untuk konservasi.",
    emoji: "🪸",
    date: "25 November 2025",
    time: "09:00 - 16:00 WIB",
    location: "Balai Konservasi, Lombok",
    participants: 18,
    quota: 30,
  },
  "event-4": {
    id: "event-4",
    title: "Penanaman Mangrove",
    category: "kampanye",
    description:
      "Tanam 500 bibit mangrove untuk perlindungan pesisir dan mencegah abrasi pantai.",
    emoji: "🌱",
    date: "30 November 2025",
    time: "07:00 - 11:00 WIB",
    location: "Hutan Mangrove, Surabaya",
    participants: 34,
    quota: 60,
  },
  "event-5": {
    id: "event-5",
    title: "Bersih Pantai Parangtritis",
    category: "relawan",
    description:
      "Event bersih pantai yang telah selesai dilaksanakan dengan sukses.",
    emoji: "🌊",
    date: "01 November 2025",
    time: "08:00 - 12:00 WIB",
    location: "Pantai Parangtritis, Yogyakarta",
    participants: 60,
    quota: 60,
    completed: true,
  },
};

// ==========================================
// === INITIALIZATION ===
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 CORATUKA Campaign/Event System Loading...");

  // Initialize user data
  initializeUserData();

  // Check which page we're on
  const isEventPage = document.getElementById("eventGrid") !== null;
  const isCampaignPage = document.getElementById("campaignGrid") !== null;

  console.log(
    "📄 Page Type:",
    isEventPage ? "EVENT" : isCampaignPage ? "CAMPAIGN" : "UNKNOWN"
  );

  // Initialize dropdown functionality
  initializeDropdowns();

  // Initialize status tabs
  initializeStatusTabs();

  // Initialize filter functionality
  initializeFilters();

  // Initialize modal handlers
  if (isEventPage) {
    initializeEventModals();
    checkRegisteredEvents();
  }

  if (isCampaignPage) {
    initializeCampaignModals();
    checkRegisteredCampaigns();
  }

  // Initialize success popup
  initializeSuccessPopup();

  console.log("✅ System Ready!");
});

// ==========================================
// === USER DATA MANAGEMENT ===
// ==========================================

function initializeUserData() {
  let userData = localStorage.getItem(CONFIG.userDataKey);
  if (!userData) {
    localStorage.setItem(CONFIG.userDataKey, JSON.stringify(DUMMY_USER));
    console.log("👤 User data initialized:", DUMMY_USER);
  } else {
    console.log("👤 User data loaded:", JSON.parse(userData));
  }
}

function getUserData() {
  const userData = localStorage.getItem(CONFIG.userDataKey);
  return userData ? JSON.parse(userData) : DUMMY_USER;
}

function getRegisteredCampaigns() {
  const registered = localStorage.getItem(CONFIG.registeredCampaignsKey);
  return registered ? JSON.parse(registered) : [];
}

function getRegisteredEvents() {
  const registered = localStorage.getItem(CONFIG.registeredEventsKey);
  return registered ? JSON.parse(registered) : [];
}

function registerCampaign(campaignId) {
  let registered = getRegisteredCampaigns();
  if (!registered.includes(campaignId)) {
    registered.push(campaignId);
    localStorage.setItem(
      CONFIG.registeredCampaignsKey,
      JSON.stringify(registered)
    );
    console.log("✅ Campaign registered:", campaignId);
  }
}

function registerEvent(eventId) {
  let registered = getRegisteredEvents();
  if (!registered.includes(eventId)) {
    registered.push(eventId);
    localStorage.setItem(
      CONFIG.registeredEventsKey,
      JSON.stringify(registered)
    );
    console.log("✅ Event registered:", eventId);
  }
}

// ==========================================
// === DROPDOWN FUNCTIONALITY ===
// ==========================================

function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  console.log("🔽 Initializing dropdowns:", dropdowns.length);

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");
    const options = menu.querySelectorAll("button");
    const selectedSpan = toggle.querySelector("span");

    // Toggle dropdown
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll(".dropdown").forEach((d) => {
        if (d !== dropdown) d.classList.remove("active");
      });
      dropdown.classList.toggle("active");
    });

    // Select option
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();

        // Update selected state
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // Update display text
        selectedSpan.textContent = option.textContent;

        // Close dropdown
        dropdown.classList.remove("active");

        // Trigger filter
        applyFilters();
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown")
      .forEach((d) => d.classList.remove("active"));
  });
}

// ==========================================
// === STATUS TABS FUNCTIONALITY ===
// ==========================================

function initializeStatusTabs() {
  const btnTersedia = document.getElementById("statusTersedia");
  const btnTerdaftar = document.getElementById("statusTerdaftar");

  if (!btnTersedia || !btnTerdaftar) return;

  btnTersedia.addEventListener("click", () => {
    btnTersedia.classList.add("active");
    btnTerdaftar.classList.remove("active");
    console.log("📊 Filter: TERSEDIA");
    applyFilters();
  });

  btnTerdaftar.addEventListener("click", () => {
    btnTerdaftar.classList.add("active");
    btnTersedia.classList.remove("active");
    console.log("📊 Filter: TERDAFTAR");
    applyFilters();
  });
}

// ==========================================
// === FILTER FUNCTIONALITY ===
// ==========================================

function initializeFilters() {
  // Initial filter application
  applyFilters();
}

function applyFilters() {
  const isEventPage = document.getElementById("eventGrid") !== null;
  const cards = document.querySelectorAll(
    isEventPage ? ".event-card" : ".campaign-card"
  );
  const noResults = document.getElementById("noResults");

  // Get active filter values
  const kategoriDropdown = document.getElementById("dropdownKategori");
  const waktuDropdown = document.getElementById("dropdownWaktu");
  const selectedKategori =
    kategoriDropdown?.querySelector(".selected")?.getAttribute("data-value") ||
    "semua";
  const selectedWaktu =
    waktuDropdown?.querySelector(".selected")?.getAttribute("data-value") ||
    "semua";

  // Get active status
  const statusTersedia = document.getElementById("statusTersedia");
  const activeStatus = statusTersedia?.classList.contains("active")
    ? "tersedia"
    : "terdaftar";

  let visibleCount = 0;

  cards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    const cardTime = card.getAttribute("data-time");
    const cardStatus = card.getAttribute("data-status");

    // Check if card matches all filters
    const matchesKategori =
      selectedKategori === "semua" || cardCategory === selectedKategori;
    const matchesWaktu =
      selectedWaktu === "semua" || cardTime === selectedWaktu;
    const matchesStatus = cardStatus === activeStatus;

    if (matchesKategori && matchesWaktu && matchesStatus) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  console.log("🔍 Filter applied - Visible cards:", visibleCount);

  // Show/hide no results
  if (visibleCount === 0) {
    noResults?.classList.remove("hidden");
  } else {
    noResults?.classList.add("hidden");
  }
}

// ==========================================
// === CAMPAIGN MODAL FUNCTIONALITY ===
// ==========================================

function initializeCampaignModals() {
  const campaignCards = document.querySelectorAll(".campaign-card");
  const modal = document.getElementById("campaignModal");
  const closeBtn = document.getElementById("closeCampaignModal");
  const form = document.getElementById("campaignRegistrationForm");

  console.log(
    "🎪 Initializing campaign modals:",
    campaignCards.length,
    "cards"
  );

  // Card click handlers
  campaignCards.forEach((card) => {
    // Register button click
    const registerBtn = card.querySelector(".campaign-register-btn");
    if (registerBtn) {
      registerBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const campaignId = card.getAttribute("data-campaign-id");
        openCampaignModal(campaignId);
      });
    }

    // Certificate button click
    const certBtn = card.querySelector(".certificate-btn");
    if (certBtn) {
      certBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        openCertificateModal();
      });
    }

    // Detail button click
    const detailBtn = card.querySelector(".detail-btn");
    if (detailBtn) {
      detailBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        openDetailModal();
      });
    }
  });

  // Close modal handlers
  closeBtn?.addEventListener("click", () => modal?.classList.add("hidden"));
  modal?.addEventListener("click", function (e) {
    if (e.target === this) this.classList.add("hidden");
  });

  // Form submission
  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const campaignId = modal.getAttribute("data-current-campaign");
    handleCampaignRegistration(campaignId);
  });

  // Detail modal close
  const detailModal = document.getElementById("detailModal");
  const closeDetailBtn = document.getElementById("closeDetailModal");
  closeDetailBtn?.addEventListener("click", () =>
    detailModal?.classList.add("hidden")
  );
  detailModal?.addEventListener("click", function (e) {
    if (e.target === this) this.classList.add("hidden");
  });

  // Certificate modal close
  const certModal = document.getElementById("certificateModal");
  const closeCertBtn = document.getElementById("closeCertificateModal");
  closeCertBtn?.addEventListener("click", () =>
    certModal?.classList.add("hidden")
  );
  certModal?.addEventListener("click", function (e) {
    if (e.target === this) this.classList.add("hidden");
  });
}

function openCampaignModal(campaignId) {
  const campaign = CAMPAIGN_DATA[campaignId];
  if (!campaign) return;

  console.log("📖 Opening campaign modal:", campaignId);

  const modal = document.getElementById("campaignModal");
  if (!modal) {
    console.error("❌ Campaign modal not found!");
    return;
  }

  modal.setAttribute("data-current-campaign", campaignId);

  // Update modal hero with emoji and badge
  const heroImage = document.getElementById("modalHeroImage");
  if (heroImage) {
    const badgeClass = `badge-${campaign.category}`;
    const categoryName = getCategoryName(campaign.category);
    heroImage.innerHTML = `
      <span class="text-7xl">${campaign.emoji}</span>
      <span class="badge ${badgeClass} absolute top-3 right-3">${categoryName}</span>
    `;
  }

  // Update modal content
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalParticipants = document.getElementById("modalParticipants");
  const modalTarget = document.getElementById("modalTarget");

  if (modalTitle) modalTitle.textContent = campaign.title;
  if (modalDescription) modalDescription.textContent = campaign.description;
  if (modalParticipants) modalParticipants.textContent = campaign.participants;
  if (modalTarget) modalTarget.textContent = campaign.target;

  // Autofill form
  autofillForm();

  // Show modal
  modal.classList.remove("hidden");
}

function handleCampaignRegistration(campaignId) {
  console.log("📝 Handling campaign registration:", campaignId);

  // Validate form
  const form = document.getElementById("campaignRegistrationForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Register campaign
  registerCampaign(campaignId);

  // Move card from "tersedia" to "terdaftar"
  moveCampaignCardToTerdaftar(campaignId);

  // Close modal
  document.getElementById("campaignModal").classList.add("hidden");

  // Show success popup
  showSuccessPopup("Campaign");

  // Re-apply filters to show updated state
  applyFilters();
}

function moveCampaignCardToTerdaftar(campaignId) {
  const card = document.querySelector(`[data-campaign-id="${campaignId}"]`);
  if (!card) return;

  console.log("🔄 Moving card to Terdaftar:", campaignId);

  // Change card status
  card.setAttribute("data-status", "terdaftar");

  // Update button to show "Terdaftar"
  const registerBtn = card.querySelector(".campaign-register-btn");
  if (registerBtn) {
    registerBtn.textContent = "✓ Terdaftar";
    registerBtn.disabled = true;
    registerBtn.classList.remove("bg-tertiary", "hover:bg-btn-hover");
    registerBtn.classList.add("bg-gray-400", "cursor-not-allowed");
  }

  // Add certificate and detail buttons if completed
  const isCompleted = card.getAttribute("data-completed") === "true";
  if (isCompleted) {
    addCompletedButtons(card);
  }
}

function addCompletedButtons(card) {
  const buttonContainer = card.querySelector(".p-5");
  const registerBtn = card.querySelector(".campaign-register-btn");

  if (registerBtn && buttonContainer) {
    // Create certificate button
    const certBtn = document.createElement("button");
    certBtn.className =
      "certificate-btn w-full bg-tertiary hover:bg-btn-hover text-ink font-semibold py-2.5 rounded-lg transition-colors mb-2";
    certBtn.textContent = "Lihat Sertifikat";
    certBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCertificateModal();
    });

    // Create detail button
    const detailBtn = document.createElement("button");
    detailBtn.className =
      "detail-btn w-full bg-gray-100 hover:bg-gray-200 text-ink font-medium py-2.5 rounded-lg transition-colors";
    detailBtn.textContent = "Lihat Detail";
    detailBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openDetailModal();
    });

    // Replace register button
    registerBtn.replaceWith(certBtn);
    buttonContainer.appendChild(detailBtn);
  }
}

function checkRegisteredCampaigns() {
  const registered = getRegisteredCampaigns();
  console.log("✅ Checking registered campaigns:", registered);
  registered.forEach((id) => moveCampaignCardToTerdaftar(id));
}

// ==========================================
// === EVENT MODAL FUNCTIONALITY ===
// ==========================================

function initializeEventModals() {
  const eventCards = document.querySelectorAll(".event-card");
  const modal = document.getElementById("eventModal");
  const closeBtn = document.getElementById("closeEventModal");
  const form = document.getElementById("eventRegistrationForm");

  console.log("🎪 Initializing event modals:", eventCards.length, "cards");

  // Card click handlers
  eventCards.forEach((card) => {
    // Register button click
    const registerBtn = card.querySelector(".event-register-btn");
    if (registerBtn) {
      registerBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const eventId = card.getAttribute("data-event-id");
        openEventModal(eventId);
      });
    }

    // Certificate button click
    const certBtn = card.querySelector(".certificate-btn");
    if (certBtn) {
      certBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        openCertificateModal();
      });
    }

    // Detail button click
    const detailBtn = card.querySelector(".detail-btn");
    if (detailBtn) {
      detailBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        openDetailModal();
      });
    }
  });

  // Close modal handlers
  closeBtn?.addEventListener("click", () => modal?.classList.add("hidden"));
  modal?.addEventListener("click", function (e) {
    if (e.target === this) this.classList.add("hidden");
  });

  // Form submission
  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const eventId = modal.getAttribute("data-current-event");
    handleEventRegistration(eventId);
  });

  // Detail modal close
  const detailModal = document.getElementById("detailModal");
  const closeDetailBtn = document.getElementById("closeDetailModal");
  closeDetailBtn?.addEventListener("click", () =>
    detailModal?.classList.add("hidden")
  );
  detailModal?.addEventListener("click", function (e) {
    if (e.target === this) this.classList.add("hidden");
  });

  // Certificate modal close
  const certModal = document.getElementById("certificateModal");
  const closeCertBtn = document.getElementById("closeCertificateModal");
  closeCertBtn?.addEventListener("click", () =>
    certModal?.classList.add("hidden")
  );
  certModal?.addEventListener("click", function (e) {
    if (e.target === this) this.classList.add("hidden");
  });
}

function openEventModal(eventId) {
  const event = EVENT_DATA[eventId];
  if (!event) return;

  console.log("📖 Opening event modal:", eventId);

  const modal = document.getElementById("eventModal");
  if (!modal) {
    console.error("❌ Event modal not found!");
    return;
  }

  modal.setAttribute("data-current-event", eventId);

  // Update modal hero with emoji and badge
  const heroImage = document.getElementById("modalHeroImage");
  if (heroImage) {
    const badgeClass = `badge-${event.category}`;
    const categoryName = getCategoryName(event.category);
    heroImage.innerHTML = `
      <span class="text-7xl">${event.emoji}</span>
      <span class="badge ${badgeClass} absolute top-3 right-3">${categoryName}</span>
    `;
  }

  // Update modal content
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalDate = document.getElementById("modalDate");
  const modalTime = document.getElementById("modalTime");
  const modalLocation = document.getElementById("modalLocation");
  const modalQuota = document.getElementById("modalQuota");

  if (modalTitle) modalTitle.textContent = event.title;
  if (modalDescription) modalDescription.textContent = event.description;
  if (modalDate) modalDate.textContent = event.date;
  if (modalTime) modalTime.textContent = event.time;
  if (modalLocation) modalLocation.textContent = event.location;
  if (modalQuota)
    modalQuota.textContent = `${event.participants}/${event.quota} Peserta`;

  // Autofill form
  autofillForm();

  // Show modal
  modal.classList.remove("hidden");
}

function handleEventRegistration(eventId) {
  console.log("📝 Handling event registration:", eventId);

  // Validate form
  const form = document.getElementById("eventRegistrationForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Register event
  registerEvent(eventId);

  // Move card from "tersedia" to "terdaftar"
  moveEventCardToTerdaftar(eventId);

  // Close modal
  document.getElementById("eventModal").classList.add("hidden");

  // Show success popup
  showSuccessPopup("Event");

  // Re-apply filters to show updated state
  applyFilters();
}

function moveEventCardToTerdaftar(eventId) {
  const card = document.querySelector(`[data-event-id="${eventId}"]`);
  if (!card) return;

  console.log("🔄 Moving card to Terdaftar:", eventId);

  // Change card status
  card.setAttribute("data-status", "terdaftar");

  // Update button to show "Terdaftar"
  const registerBtn = card.querySelector(".event-register-btn");
  if (registerBtn) {
    registerBtn.textContent = "✓ Terdaftar";
    registerBtn.disabled = true;
    registerBtn.classList.remove("bg-tertiary", "hover:bg-btn-hover");
    registerBtn.classList.add("bg-gray-400", "cursor-not-allowed");
  }

  // Add certificate and detail buttons if completed
  const isCompleted = card.getAttribute("data-completed") === "true";
  if (isCompleted) {
    addCompletedButtonsEvent(card);
  }
}

function addCompletedButtonsEvent(card) {
  const buttonContainer = card.querySelector(".p-5");
  const registerBtn = card.querySelector(".event-register-btn");

  if (registerBtn && buttonContainer) {
    // Create certificate button
    const certBtn = document.createElement("button");
    certBtn.className =
      "certificate-btn w-full bg-tertiary hover:bg-btn-hover text-ink font-semibold py-2.5 rounded-lg transition-colors mb-2";
    certBtn.textContent = "Lihat Sertifikat";
    certBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCertificateModal();
    });

    // Create detail button
    const detailBtn = document.createElement("button");
    detailBtn.className =
      "detail-btn w-full bg-gray-100 hover:bg-gray-200 text-ink font-medium py-2.5 rounded-lg transition-colors";
    detailBtn.textContent = "Lihat Detail";
    detailBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openDetailModal();
    });

    // Replace register button
    registerBtn.replaceWith(certBtn);
    buttonContainer.appendChild(detailBtn);
  }
}

function checkRegisteredEvents() {
  const registered = getRegisteredEvents();
  console.log("✅ Checking registered events:", registered);
  registered.forEach((id) => moveEventCardToTerdaftar(id));
}

// ==========================================
// === DETAIL MODAL ===
// ==========================================

function openDetailModal() {
  const detailModal = document.getElementById("detailModal");
  if (detailModal) {
    console.log("📊 Opening detail modal");
    detailModal.classList.remove("hidden");
  }
}

// ==========================================
// === CERTIFICATE MODAL ===
// ==========================================

function openCertificateModal() {
  const certModal = document.getElementById("certificateModal");
  if (certModal) {
    console.log("🏆 Opening certificate modal");
    certModal.classList.remove("hidden");
  }
}

// ==========================================
// === FORM AUTOFILL ===
// ==========================================

function autofillForm() {
  const userData = getUserData();

  const formNama = document.getElementById("formNama");
  const formEmail = document.getElementById("formEmail");
  const formPhone = document.getElementById("formPhone");
  const formUsia = document.getElementById("formUsia");
  const formInstansi = document.getElementById("formInstansi");

  if (formNama) formNama.value = userData.nama;
  if (formEmail) formEmail.value = userData.email;
  if (formPhone) formPhone.value = userData.phone;
  if (formUsia) formUsia.value = userData.usia;
  if (formInstansi) formInstansi.value = userData.instansi;

  console.log("📝 Form autofilled with user data");
}

// ==========================================
// === SUCCESS POPUP ===
// ==========================================

function initializeSuccessPopup() {
  const closeBtn = document.getElementById("closeSuccessPopup");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("successPopup")?.classList.add("hidden");
    });
  }
}

function showSuccessPopup(type) {
  const popup = document.getElementById("successPopup");
  console.log("🎉 Showing success popup:", type);
  popup?.classList.remove("hidden");

  // Auto-hide after 5 seconds
  setTimeout(() => {
    popup?.classList.add("hidden");
  }, 5000);
}

// ==========================================
// === HELPER FUNCTIONS ===
// ==========================================

function getCategoryName(category) {
  const categories = {
    relawan: "Relawan",
    edukasi: "Edukasi",
    kampanye: "Kampanye Alam",
  };
  return categories[category] || category;
}

// ==========================================
// === DEBUG HELPERS ===
// ==========================================

// Reset all registrations (untuk testing)
function resetAllRegistrations() {
  localStorage.removeItem(CONFIG.registeredCampaignsKey);
  localStorage.removeItem(CONFIG.registeredEventsKey);
  console.log("🔄 All registrations cleared!");
  location.reload();
}

// Check current registrations
function checkRegistrations() {
  console.log("📋 Registered Campaigns:", getRegisteredCampaigns());
  console.log("📋 Registered Events:", getRegisteredEvents());
}

// Make debug functions available globally
window.coratuka = {
  resetAllRegistrations,
  checkRegistrations,
  getUserData,
  getRegisteredCampaigns,
  getRegisteredEvents,
};

console.log("🎯 Debug helpers available: window.coratuka");
