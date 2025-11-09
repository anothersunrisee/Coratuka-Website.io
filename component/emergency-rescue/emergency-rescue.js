/**
 * Emergency Rescue JavaScript Module
 * Handles form submission, localStorage management, and tracking modals
 * CORATUKA - Marine Conservation Platform
 */

// ========================================
// CONSTANTS & CONFIG
// ========================================

const STORAGE_KEY = "coratuka_emergency_reports";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "video/mp4",
];

// Dummy location for demo
const DUMMY_LOCATION = {
  text: "X8J5+R85, Pantai, Parangtritis, Kec. Kretek, Kabupaten Bantul, Daerah Istimewa Yogyakarta",
  coords: { lat: -8.0167, lng: 110.2667 },
};

// ========================================
// STATE MANAGEMENT
// ========================================

let currentPhotoData = null;
let currentLocation = null;
let reports = [];

// ========================================
// INITIALIZATION
// ========================================

/**
 * Load reports from localStorage
 */
function loadReports() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    reports = stored ? JSON.parse(stored) : [];

    // Add demo reports if empty (for testing)
    if (reports.length === 0) {
      reports = getDemoReports();
      saveReports();
    }

    renderReports();
  } catch (e) {
    console.error("Error loading reports:", e);
    reports = [];
  }
}

/**
 * Save reports to localStorage
 */
function saveReports() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {
    console.error("Error saving reports:", e);
    showError(
      "Gagal menyimpan laporan. Pastikan browser mendukung localStorage."
    );
  }
}

/**
 * Get demo reports for initial state
 */
function getDemoReports() {
  const now = new Date().toISOString();
  return [
    {
      id:
        "ER-2024-" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0"),
      title: "Penyu terjerat jaring nelayan di Pantai Pelangi",
      location: {
        text: "Pantai Pelangi, Bantul",
        coords: { lat: -8.0167, lng: 110.2667 },
      },
      photo: "../../img/reporting/test.jpg",
      status: "completed",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updates: [
        {
          status: "received",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          title: "Report Received",
          note: "Laporan telah masuk sistem dan sedang ditinjau tim konservasi",
          author: null,
        },
        {
          status: "processing",
          timestamp: new Date(Date.now() - 82800000).toISOString(),
          title: "Team Heading to Location",
          note: "Tim konservasi sedang menuju lokasi.",
          author: "kak Danu (Tim Konservator)",
        },
        {
          status: "completed",
          timestamp: new Date(Date.now() - 79200000).toISOString(),
          title: "Handling Complete",
          note: "Penyu berhasil diselamatkan dan kembali berenang bebas. tidak ada luka berat maupun ringan. Kondisi stabil.",
          author: "Kak danu (Tim Konservator)",
          completionPhoto: "../../img/reporting/success.jpg",
        },
      ],
    },
  ];
}

/**
 * Render reports to the grid
 */
function renderReports() {
  const emptyState = document.getElementById("emptyState");
  const reportsGrid = document.getElementById("reportsGrid");
  const reportCount = document.getElementById("reportCount");

  if (!reportsGrid || !emptyState) return;

  if (reports.length === 0) {
    emptyState.classList.remove("hidden");
    reportsGrid.classList.add("hidden");
    if (reportCount) reportCount.textContent = "0";
    return;
  }

  emptyState.classList.add("hidden");
  reportsGrid.classList.remove("hidden");
  if (reportCount) reportCount.textContent = reports.length;

  reportsGrid.innerHTML = reports
    .map((report) => createReportCard(report))
    .join("");
}

/**
 * Create HTML for a single report card - UPDATED with border box
 */
function createReportCard(report) {
  const statusConfig = getStatusConfig(report.status);
  const timeAgo = getTimeAgo(report.timestamp);

  return `
    <article 
      onclick="openTracking('${report.id}')"
      class="group cursor-pointer overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition hover:shadow-xl hover:scale-[1.02] hover:border-primary-300"
    >
      <div class="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src="${report.photo}" 
          alt="${report.title}"
          class="h-full w-full object-cover transition group-hover:scale-110"
          onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'%3E%3Crect fill=\\'%2315C5CE\\' width=\\'400\\' height=\\'300\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'48\\' fill=\\'white\\'%3E🐢%3C/text%3E%3C/svg%3E';"
        />
        <div class="absolute top-3 right-3">
          <span class="inline-flex items-center gap-1.5 rounded-full ${statusConfig.bg} px-3 py-1.5 text-xs font-bold ${statusConfig.text}">
            <span class="h-2 w-2 rounded-full ${statusConfig.dot}"></span>
            ${statusConfig.label}
          </span>
        </div>
      </div>
      <div class="p-4 space-y-2">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-bold text-slate-900 line-clamp-2">${report.title}</h3>
        </div>
        <p class="text-xs text-slate-500 font-mono">#${report.id}</p>
        <div class="flex items-center gap-1.5 text-xs text-slate-600">
          <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="line-clamp-1">${report.location.text}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-slate-500">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>${timeAgo}</span>
        </div>
        <button class="mt-2 w-full rounded-lg bg-tertiary px-4 py-2 text-sm font-bold text-slate-800 transition hover:scale-105 hover:bg-yellow-400">
          See Details →
        </button>
      </div>
    </article>
  `;
}

/**
 * Get status configuration (color, label, etc.)
 */
function getStatusConfig(status) {
  const configs = {
    pending: {
      label: "Not yet handled",
      bg: "bg-danger/10",
      text: "text-danger",
      dot: "bg-danger",
      timeline: "bg-danger",
    },
    processing: {
      label: "In Progress",
      bg: "bg-warning/10",
      text: "text-warning",
      dot: "bg-warning",
      timeline: "bg-warning",
    },
    completed: {
      label: "Success",
      bg: "bg-success/10",
      text: "text-success",
      dot: "bg-success",
      timeline: "bg-success",
    },
  };
  return configs[status] || configs.pending;
}

/**
 * Get relative time string (e.g., "2 jam yang lalu")
 */
function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;

  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Generate unique report ID
 */
function generateReportId() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ER-${year}-${random}`;
}

// ========================================
// MODAL MANAGEMENT
// ========================================

/**
 * Open report form modal
 */
function openReportForm() {
  const modal = document.getElementById("reportFormModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";

    // Reset form
    const form = document.getElementById("emergencyReportForm");
    if (form) form.reset();
    currentPhotoData = null;
    currentLocation = null;
    hideError();
    resetPhotoPreview();
  }
}

/**
 * Close report form modal
 */
function closeReportForm() {
  const modal = document.getElementById("reportFormModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

/**
 * Open success modal
 */
function openSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";

    // Reload reports to show new one
    loadReports();

    // Auto-close after 5 seconds
    setTimeout(() => {
      closeSuccessModal();
    }, 5000);
  }
}

/**
 * Close success modal
 */
function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

/**
 * Open tracking modal
 */
function openTracking(reportId) {
  const report = reports.find((r) => r.id === reportId);
  if (!report) return;

  const modal = document.getElementById("trackingModal");
  if (!modal) return;

  // Populate modal with report data
  document.getElementById("trackingPhoto").src = report.photo;
  document.getElementById("trackingTitle").textContent = report.title;
  document.getElementById("trackingId").textContent = `#${report.id}`;
  document.getElementById("trackingLocation").textContent =
    report.location.text;
  document.getElementById("trackingTime").textContent = formatDateTime(
    report.timestamp
  );

  const statusConfig = getStatusConfig(report.status);
  const statusEl = document.getElementById("trackingStatus");
  statusEl.className = `inline-flex items-center gap-2 rounded-full ${statusConfig.bg} px-4 py-2`;
  statusEl.innerHTML = `
    <span class="h-2 w-2 rounded-full ${statusConfig.dot}"></span>
    <span class="text-sm font-bold ${statusConfig.text}">${statusConfig.label}</span>
  `;

  // Render timeline
  renderTimeline(report.updates, statusConfig);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

/**
 * Close tracking modal
 */
function closeTracking() {
  const modal = document.getElementById("trackingModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
}

/**
 * Render timeline in tracking modal - UPDATED to show completion photo
 */
function renderTimeline(updates, statusConfig) {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  timeline.innerHTML = updates
    .map((update, index) => {
      const isLast = index === updates.length - 1;
      const updateStatusConfig = getStatusConfig(update.status);

      return `
      <div class="relative pl-8">
        <div class="absolute left-0 top-1.5 h-5 w-5 rounded-full ${
          updateStatusConfig.timeline
        } flex items-center justify-center">
          <div class="h-2 w-2 rounded-full bg-white"></div>
        </div>
        ${
          !isLast
            ? `<div class="absolute left-2.5 top-6 h-full w-0.5 bg-slate-200"></div>`
            : ""
        }
        <div class="pb-6">
          <h5 class="font-bold text-slate-900 text-sm">${update.title}</h5>
          <p class="text-xs text-slate-500 mt-1">${formatDateTime(
            update.timestamp
          )}</p>
          ${
            update.note
              ? `<p class="text-sm text-slate-700 mt-2">${update.note}</p>`
              : ""
          }
          ${
            update.author
              ? `<p class="text-xs text-slate-500 mt-2 italic">— ${update.author}</p>`
              : ""
          }
          ${
            update.completionPhoto
              ? `
            <div class="mt-3">
              <img src="${update.completionPhoto}" alt="Completion" class="rounded-lg w-full max-h-48 object-cover" onerror="this.style.display='none';" />
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
    })
    .join("");
}

/**
 * Format date time to Indonesian locale
 */
function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ========================================
// FORM HANDLING
// ========================================

/**
 * Handle photo upload
 */
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    showError("Format file tidak didukung. Gunakan JPG, PNG, atau MP4.");
    return;
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    showError("Ukuran file terlalu besar. Maksimal 5MB.");
    return;
  }

  // Read file as base64
  const reader = new FileReader();
  reader.onload = function (e) {
    currentPhotoData = e.target.result;
    showPhotoPreview(e.target.result);
    hideError();
  };
  reader.onerror = function () {
    showError("Gagal membaca file. Coba lagi.");
  };
  reader.readAsDataURL(file);
}

/**
 * Show photo preview
 */
function showPhotoPreview(dataUrl) {
  const placeholder = document.getElementById("uploadPlaceholder");
  const preview = document.getElementById("photoPreview");
  const previewImage = document.getElementById("previewImage");

  if (placeholder && preview && previewImage) {
    placeholder.classList.add("hidden");
    preview.classList.remove("hidden");
    previewImage.src = dataUrl;
  }
}

/**
 * Remove photo
 */
function removePhoto(event) {
  event.stopPropagation();
  event.preventDefault();

  currentPhotoData = null;
  resetPhotoPreview();
  const photoInput = document.getElementById("photoInput");
  if (photoInput) photoInput.value = "";
}

/**
 * Reset photo preview
 */
function resetPhotoPreview() {
  const placeholder = document.getElementById("uploadPlaceholder");
  const preview = document.getElementById("photoPreview");

  if (placeholder && preview) {
    placeholder.classList.remove("hidden");
    preview.classList.add("hidden");
  }
}

/**
 * Detect location (dummy for demo)
 */
function detectLocation() {
  const btn = document.getElementById("detectLocationBtn");
  const btnText = document.getElementById("detectBtnText");
  const locationInput = document.getElementById("locationText");
  const latInput = document.getElementById("locationLat");
  const lngInput = document.getElementById("locationLng");

  if (!btn || !btnText || !locationInput) return;

  // Show loading state
  btn.disabled = true;
  btnText.textContent = "Mendeteksi lokasi...";

  // Simulate GPS detection (dummy)
  setTimeout(() => {
    currentLocation = DUMMY_LOCATION;
    locationInput.value = DUMMY_LOCATION.text;
    if (latInput) latInput.value = DUMMY_LOCATION.coords.lat;
    if (lngInput) lngInput.value = DUMMY_LOCATION.coords.lng;

    btn.disabled = false;
    btnText.textContent = "✓ Lokasi Terdeteksi";
    btn.classList.remove("border-primary", "bg-primary-50", "text-primary");
    btn.classList.add("border-success", "bg-success/10", "text-success");

    hideError();
  }, 1500);
}

/**
 * Handle form submission
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emergencyReportForm");
  if (!form) return;

  // Character counter for title
  const titleInput = document.getElementById("reportTitle");
  const charCount = document.getElementById("titleCharCount");
  if (titleInput && charCount) {
    titleInput.addEventListener("input", () => {
      charCount.textContent = `${titleInput.value.length}/100`;
    });
  }

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate form
    const title = document.getElementById("reportTitle").value.trim();
    const location = document.getElementById("locationText").value.trim();
    const lat = document.getElementById("locationLat").value;
    const lng = document.getElementById("locationLng").value;

    if (!title) {
      showError("Judul laporan wajib diisi");
      return;
    }

    if (!location) {
      showError("Lokasi wajib diisi");
      return;
    }

    if (!currentPhotoData) {
      showError("Foto/video wajib diunggah");
      return;
    }

    // Create new report
    const newReport = {
      id: generateReportId(),
      title,
      location: {
        text: location,
        coords:
          lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null,
      },
      photo: currentPhotoData,
      status: "pending",
      timestamp: new Date().toISOString(),
      updates: [
        {
          status: "received",
          timestamp: new Date().toISOString(),
          title: "Laporan Diterima",
          note: "Laporan telah masuk sistem dan sedang ditinjau tim konservasi",
          author: null,
        },
      ],
    };

    // Save report
    reports.unshift(newReport);
    saveReports();

    // Close form and show success
    closeReportForm();
    openSuccessModal();
  });
});

/**
 * Show error message
 */
function showError(message) {
  const errorEl = document.getElementById("formErrors");
  const errorMsg = document.getElementById("errorMessage");

  if (errorEl && errorMsg) {
    errorMsg.textContent = message;
    errorEl.classList.remove("hidden");

    // Scroll to error
    errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/**
 * Hide error message
 */
function hideError() {
  const errorEl = document.getElementById("formErrors");
  if (errorEl) {
    errorEl.classList.add("hidden");
  }
}

/**
 * Check if user is logged in
 */
function checkUserLogin() {
  const userDataStr =
    sessionStorage.getItem("coratuka_user") ||
    sessionStorage.getItem("new_user") ||
    localStorage.getItem("coratuka_user");

  return !!userDataStr;
}

/**
 * Redirect to login page
 */
function goToLogin() {
  window.location.href = "/test/component/login/login.html";
}

// ========================================
// GLOBAL SCOPE EXPORTS
// ========================================

// Make functions available globally
window.openReportForm = openReportForm;
window.closeReportForm = closeReportForm;
window.openSuccessModal = openSuccessModal;
window.closeSuccessModal = closeSuccessModal;
window.openTracking = openTracking;
window.closeTracking = closeTracking;
window.handlePhotoUpload = handlePhotoUpload;
window.removePhoto = removePhoto;
window.detectLocation = detectLocation;
window.loadReports = loadReports;
window.goToLogin = goToLogin;

console.log("✅ Emergency Rescue module loaded successfully");
