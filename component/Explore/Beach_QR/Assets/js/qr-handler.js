/**
 * CORATUKA - Beach QR Guide Handler
 * Handles QR content overlay, localStorage tracking, URL parameters, and card rendering
 */

// ============================================
// GLOBAL STATE
// ============================================
let qrData = null;
const STORAGE_KEY = "coratuka_qr_scanned";

// QR Cards Data (for rendering)
const qrCards = [
  { id: "sampah", title: "Tempat Sampah", icon: "🗑️" },
  { id: "penyu", title: "Konservasi Penyu", icon: "🐢" },
  { id: "terumbu", title: "Terumbu Karang", icon: "🪸" },
  { id: "bleaching", title: "Coral Bleaching", icon: "🌡️" },
  { id: "rambu", title: "Rambu Pantai", icon: "⚠️" },
  { id: "jajan", title: "Area Jajanan", icon: "🍴" },
];

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
  // Load QR content data
  await loadQRData();

  // Render QR cards
  renderQRCards();

  // Update scanned counter
  updateScannedCounter();

  // Add scanned badges to cards
  displayScannedBadges();

  // Check URL parameter for direct QR access
  checkURLParameter();

  // Setup event listeners
  setupEventListeners();
});

// ============================================
// LOAD QR DATA FROM JSON
// ============================================
async function loadQRData() {
  try {
    const response = await fetch("./qr-content.json");
    qrData = await response.json();
    console.log("✅ QR Data loaded successfully");
  } catch (error) {
    console.error("❌ Error loading QR data:", error);
    alert("Gagal memuat data QR. Silakan refresh halaman.");
  }
}

// ============================================
// RENDER QR CARDS (BOTH MOBILE & DESKTOP)
// ============================================
function renderQRCards() {
  // Mobile: render to .grid (first one found)
  const mobileContainer = document.querySelector(
    ".lg\\:hidden .grid.grid-cols-1"
  );

  // Desktop: render to #desktop-cards-container
  const desktopContainer = document.getElementById("desktop-cards-container");

  qrCards.forEach((card) => {
    const cardData = qrData?.[card.id];
    if (!cardData) return;

    const cardHTML = createCardHTML(card, cardData);

    // Render to both containers
    if (mobileContainer) {
      mobileContainer.insertAdjacentHTML("beforeend", cardHTML);
    }
    if (desktopContainer) {
      desktopContainer.insertAdjacentHTML("beforeend", cardHTML);
    }
  });
}

// ============================================
// CREATE CARD HTML
// ============================================
function createCardHTML(card, cardData) {
  return `
    <div class="qr-card bg-white rounded-2xl shadow-lg p-6 relative" data-qr="${
      card.id
    }">
      <!-- Card Image with Error Handling -->
      <div class="card-image-container mb-4">
        <img 
          src="${cardData.cardImage}" 
          alt="${card.title}"
          loading="lazy"
          onerror="handleImageError(this, '${card.icon}')"
        />
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-2">${cardData.title}</h3>
      <p class="text-gray-600 text-sm mb-4">${getCardDescription(card.id)}</p>
      
      <div class="flex items-center text-primary font-medium text-sm">
        <span>View Guides</span>
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  `;
}

// ============================================
// HANDLE IMAGE ERROR (FALLBACK TO EMOJI)
// ============================================
function handleImageError(img, emoji) {
  // Hide broken image
  img.style.display = "none";

  // Get parent container
  const container = img.parentElement;

  // Check if fallback already exists
  if (!container.querySelector(".card-emoji-fallback")) {
    // Create emoji fallback
    const emojiDiv = document.createElement("div");
    emojiDiv.className = "card-emoji-fallback";
    emojiDiv.textContent = emoji;
    container.appendChild(emojiDiv);
  }
}

// ============================================
// GET CARD DESCRIPTION
// ============================================
function getCardDescription(qrId) {
  const descriptions = {
    sampah: "Pelajari cara memilah sampah dengan benar di area pantai",
    penyu: "Etika berkunjung di area peneluran penyu laut",
    terumbu: "Kenali ekosistem terumbu karang dan cara melindunginya",
    bleaching: "Pahami fenomena pemutihan karang dan dampaknya",
    rambu: "Kenali rambu keselamatan dan zona di area pantai",
    jajan: "Tips menjaga kebersihan setelah menikmati makanan",
  };
  return descriptions[qrId] || "";
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================
function setupEventListeners() {
  // Click on QR cards (use event delegation)
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".qr-card");
    if (card) {
      const qrId = card.getAttribute("data-qr");
      openOverlay(qrId);
    }
  });

  // Close overlay button
  const closeBtn = document.getElementById("close-overlay");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeOverlay);
  }

  // Close overlay when clicking outside content
  const overlay = document.getElementById("qr-overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeOverlay();
      }
    });
  }

  // Close overlay with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeOverlay();
    }
  });
}

// ============================================
// CHECK URL PARAMETER (FOR PHYSICAL QR SCAN)
// ============================================
function checkURLParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const qrParam = urlParams.get("qr");

  if (qrParam && qrData && qrData[qrParam]) {
    // Automatically open overlay if valid QR parameter
    setTimeout(() => {
      openOverlay(qrParam);
    }, 500);
  }
}

// ============================================
// OPEN OVERLAY WITH QR CONTENT
// ============================================
function openOverlay(qrId) {
  if (!qrData || !qrData[qrId]) {
    console.error("Invalid QR ID:", qrId);
    return;
  }

  const content = qrData[qrId];
  const overlayBody = document.getElementById("overlay-body");

  // Build media HTML based on type
  const mediaHTML = buildMediaHTML(content.media);

  // Build overlay HTML
  overlayBody.innerHTML = `
    <!-- Media Section (Image or Video) -->
    <div class="mb-6">
      ${mediaHTML}
    </div>
    
    <!-- Title -->
    <div class="text-center mb-6">
      <div class="text-5xl mb-3">${content.icon}</div>
      <h2 class="text-3xl font-bold text-gray-900">${content.title}</h2>
    </div>
    
    <!-- Why Important Section -->
    <div class="mb-6 bg-primary-50 rounded-xl p-5">
      <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span class="text-xl">📍</span>
        ${content.why.title}
      </h3>
      <p class="text-gray-700 leading-relaxed">${content.why.content}</p>
    </div>
    
    <!-- Actions Section -->
    <div class="mb-6 bg-green-50 rounded-xl p-5">
      <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span class="text-xl">✅</span>
        ${content.actions.title}
      </h3>
      <ul class="space-y-2">
        ${content.actions.list
          .map(
            (action) => `
          <li class="flex gap-3 text-gray-700">
            <span class="text-green-600 font-bold flex-shrink-0">•</span>
            <span class="leading-relaxed">${action}</span>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
    
    <!-- Fact Section -->
    <div class="mb-6 bg-amber-50 rounded-xl p-5">
      <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span class="text-xl">💡</span>
        ${content.fact.title}
      </h3>
      <p class="text-gray-700 leading-relaxed">${content.fact.content}</p>
    </div>
    
    <!-- Appreciation Message -->
    <div class="mb-6 bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl p-5 text-center">
      <p class="text-gray-800 font-medium">${content.appreciation}</p>
    </div>
    
    <!-- CTA Button -->
    <div class="text-center">
      <a href="../../../../../Index.html" class="inline-block bg-primary hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg hover:shadow-xl">
        Learn more in Coratuka →
      </a>
    </div>
  `;

  // Show overlay
  const overlay = document.getElementById("qr-overlay");
  overlay.classList.add("active");

  // Disable body scroll
  document.body.style.overflow = "hidden";

  // Track to localStorage
  trackScannedQR(qrId);

  // Update counter and badges
  updateScannedCounter();
  displayScannedBadges();
}

// ============================================
// BUILD MEDIA HTML (IMAGE OR VIDEO)
// ============================================
function buildMediaHTML(media) {
  if (!media || !media.type || !media.url) {
    return ""; // No media
  }

  if (media.type === "video") {
    // Check if it's a YouTube URL
    if (media.url.includes("youtube.com") || media.url.includes("youtu.be")) {
      return `
        <div class="media-container">
          <iframe 
            src="${media.url}" 
            title="Video Content"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `;
    } else {
      // Regular video file
      return `
        <div class="media-container">
          <video controls>
            <source src="${media.url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;
    }
  } else if (media.type === "image") {
    return `
      <div class="media-container" style="padding-bottom: 66.67%;"> <!-- 3:2 aspect ratio -->
        <img 
          src="${media.url}" 
          alt="Content Media"
          onerror="this.parentElement.style.display='none';"
        />
      </div>
    `;
  }

  return "";
}

// ============================================
// CLOSE OVERLAY
// ============================================
function closeOverlay() {
  const overlay = document.getElementById("qr-overlay");
  overlay.classList.remove("active");

  // Enable body scroll
  document.body.style.overflow = "auto";

  // Remove URL parameter if exists
  const url = new URL(window.location);
  url.searchParams.delete("qr");
  window.history.replaceState({}, "", url);
}

// ============================================
// LOCALSTORAGE TRACKING
// ============================================
function trackScannedQR(qrId) {
  // Get existing scanned QRs
  let scannedQRs = getScannedQRs();

  // Add new QR if not already tracked
  if (!scannedQRs.includes(qrId)) {
    scannedQRs.push(qrId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scannedQRs));
    console.log("✅ QR tracked:", qrId);
  }
}

function getScannedQRs() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function updateScannedCounter() {
  const scannedQRs = getScannedQRs();
  const counter = document.getElementById("scanned-count");
  if (counter) {
    counter.textContent = scannedQRs.length;
  }
}

function displayScannedBadges() {
  const scannedQRs = getScannedQRs();

  scannedQRs.forEach((qrId) => {
    const cards = document.querySelectorAll(`.qr-card[data-qr="${qrId}"]`);
    cards.forEach((card) => {
      if (!card.querySelector(".scanned-badge")) {
        const badge = document.createElement("div");
        badge.className = "scanned-badge";
        badge.textContent = "✓ Terpindai";
        card.appendChild(badge);
      }
    });
  });
}

// ============================================
// UTILITY: RESET TRACKING (FOR TESTING)
// ============================================
// Uncomment this in browser console to reset:
// window.resetQRTracking = function() {
//     localStorage.removeItem('coratuka_qr_scanned');
//     location.reload();
// }
