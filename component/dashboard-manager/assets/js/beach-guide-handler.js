// ========================================
// BEACH QR GUIDE MANAGER HANDLER
// Manage 6 QR guide topics content
// ========================================

// Global state
let qrContent = {};
let currentEditingTopic = null;

// QR Topics definition (matches qr-content.json)
const QR_TOPICS = [
  { id: "sampah", title: "Tempat Sampah Pantai", icon: "🗑️", mascot: "coco" },
  { id: "penyu", title: "Konservasi Penyu Laut", icon: "🐢", mascot: "tuka" },
  {
    id: "terumbu",
    title: "Ekosistem Terumbu Karang",
    icon: "🪸",
    mascot: "cora",
  },
  {
    id: "bleaching",
    title: "Pemutihan Karang (Coral Bleaching)",
    icon: "🌡️",
    mascot: "cora",
  },
  { id: "rambu", title: "Rambu & Zona Pantai", icon: "⚠️", mascot: "coco" },
  { id: "jajan", title: "Area Jajanan Pantai", icon: "🍴", mascot: "coco" },
];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  // Check access
  if (!checkConservatorAccess()) {
    return;
  }

  // Load conservator info
  loadConservatorInfo();

  // Load data
  loadAllData();

  // Setup multi-tab sync
  setupMultiTabSync(() => {
    loadAllData();
  });
});

// ========================================
// LOAD CONSERVATOR INFO
// ========================================
function loadConservatorInfo() {
  const user = getCurrentConservator();
  const nameEl = document.getElementById("conservator-name");
  if (nameEl && user) {
    nameEl.textContent = user.name || "Conservator";
  }
}

// ========================================
// LOAD ALL DATA
// ========================================
function loadAllData() {
  qrContent = loadFromLocalStorage("beachQRContent") || {};

  // Initialize with default structure if empty
  if (Object.keys(qrContent).length === 0) {
    initializeDefaultContent();
  }

  // Update UI
  updateStatistics();
  renderTopics();
}

// ========================================
// INITIALIZE DEFAULT CONTENT
// ========================================
function initializeDefaultContent() {
  // Create default structure matching qr-content.json
  QR_TOPICS.forEach((topic) => {
    qrContent[topic.id] = {
      title: topic.title,
      icon: topic.icon,
      mascot: topic.mascot,
      cardImage: "",
      media: {
        type: "image",
        url: "",
      },
      why: {
        title: "Mengapa Penting?",
        content: "Add content here...",
      },
      actions: {
        title: "Apa yang Bisa Kamu Lakukan?",
        list: ["Action 1", "Action 2", "Action 3"],
      },
      fact: {
        title: "Fakta Lokal",
        content: "Add interesting local fact...",
      },
      appreciation: "Thank you message here...",
      scans: 0,
      lastUpdated: new Date().toISOString(),
    };
  });

  saveToLocalStorage("beachQRContent", qrContent);
}

// ========================================
// UPDATE STATISTICS
// ========================================
function updateStatistics() {
  // Total topics
  const totalEl = document.getElementById("stat-total-topics");
  if (totalEl) {
    totalEl.textContent = QR_TOPICS.length;
  }

  // Total scans
  const totalScans = Object.values(qrContent).reduce(
    (sum, topic) => sum + (topic.scans || 0),
    0
  );
  const scansEl = document.getElementById("stat-total-scans");
  if (scansEl) {
    scansEl.textContent = totalScans;
  }

  // Most popular
  const popular = Object.entries(qrContent).sort(
    (a, b) => (b[1].scans || 0) - (a[1].scans || 0)
  )[0];

  const popularEl = document.getElementById("stat-popular-topic");
  if (popularEl) {
    if (popular && popular[1].scans > 0) {
      popularEl.textContent = popular[1].title || "-";
    } else {
      popularEl.textContent = "-";
    }
  }
}

// ========================================
// RENDER TOPICS
// ========================================
function renderTopics() {
  const grid = document.getElementById("topics-grid");

  if (!grid) {
    console.warn("topics-grid element not found");
    return;
  }

  const html = QR_TOPICS.map((topic) => {
    const content = qrContent[topic.id] || {};
    const scans = content.scans || 0;
    const hasImage = content.cardImage && content.cardImage.trim() !== "";

    return `
      <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <!-- Topic Icon & Image -->
        <div class="relative h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
          ${
            hasImage
              ? `<img src="${content.cardImage}" alt="${topic.title}" class="w-full h-full object-cover" />`
              : `<span class="text-6xl">${topic.icon}</span>`
          }
          <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
            📱 ${scans} scans
          </div>
        </div>

        <!-- Content -->
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-2xl">${topic.icon}</span>
            <h3 class="text-lg font-bold text-ink flex-1">${topic.title}</h3>
          </div>
          
          <div class="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span class="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
              ${getMascotName(topic.mascot)}
            </span>
          </div>

          <div class="text-sm text-gray-600 mb-4">
            <p class="line-clamp-2">${
              content.why?.content || "No content yet"
            }</p>
          </div>

          <div class="flex gap-2">
            <button
              onclick="openEditModal('${topic.id}')"
              class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
            >
              Edit Content
            </button>
            <button
              onclick="previewTopic('${topic.id}')"
              class="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-all"
              title="Preview"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  grid.innerHTML = html;
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function getMascotName(mascotId) {
  const mascots = {
    tuka: "🐢 Tuka",
    cora: "🪸 Cora",
    coco: "🏖️ Coco",
  };
  return mascots[mascotId] || mascotId;
}

// ========================================
// OPEN EDIT MODAL
// ========================================
function openEditModal(topicId) {
  currentEditingTopic = topicId;
  const topic = QR_TOPICS.find((t) => t.id === topicId);
  const content = qrContent[topicId] || {};

  // Set modal title
  const modalTitle = document.getElementById("modal-title");
  if (modalTitle) {
    modalTitle.textContent = `Edit Content: ${topic.title}`;
  }

  // Set read-only display fields
  const iconDisplay = document.getElementById("topic-icon-display");
  const titleDisplay = document.getElementById("topic-title-display");
  const mascotDisplay = document.getElementById("topic-mascot-display");

  if (iconDisplay) iconDisplay.textContent = topic.icon;
  if (titleDisplay) titleDisplay.textContent = topic.title;
  if (mascotDisplay) mascotDisplay.textContent = getMascotName(topic.mascot);

  // Set form values
  document.getElementById("topic-id").value = topicId;
  document.getElementById("card-image").value = content.cardImage || "";
  document.getElementById("media-type").value = content.media?.type || "image";
  document.getElementById("media-url").value = content.media?.url || "";
  document.getElementById("why-content").value = content.why?.content || "";

  // Actions list (join array with newlines)
  const actionsList = content.actions?.list || [];
  document.getElementById("actions-list").value = actionsList.join("\n");

  document.getElementById("fact-content").value = content.fact?.content || "";
  document.getElementById("appreciation").value = content.appreciation || "";

  // Open modal
  safeOpenModal("content-modal");
}

// ========================================
// CLOSE MODAL
// ========================================
function closeContentModal() {
  safeCloseModal("content-modal");
  currentEditingTopic = null;
}

// ========================================
// SAVE CONTENT
// ========================================
function saveContent(event) {
  event.preventDefault();

  const topicId = document.getElementById("topic-id").value;
  if (!topicId) return;

  // Get form values
  const cardImage = document.getElementById("card-image").value.trim();
  const mediaType = document.getElementById("media-type").value;
  const mediaUrl = document.getElementById("media-url").value.trim();
  const whyContent = document.getElementById("why-content").value.trim();
  const actionsText = document.getElementById("actions-list").value.trim();
  const factContent = document.getElementById("fact-content").value.trim();
  const appreciation = document.getElementById("appreciation").value.trim();

  // Parse actions (split by newline and filter empty)
  const actionsList = actionsText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Update content
  if (!qrContent[topicId]) {
    qrContent[topicId] = {};
  }

  const topic = QR_TOPICS.find((t) => t.id === topicId);

  qrContent[topicId] = {
    ...qrContent[topicId],
    title: topic.title,
    icon: topic.icon,
    mascot: topic.mascot,
    cardImage: cardImage,
    media: {
      type: mediaType,
      url: mediaUrl,
    },
    why: {
      title: "Mengapa Penting?",
      content: whyContent,
    },
    actions: {
      title: "Apa yang Bisa Kamu Lakukan?",
      list: actionsList,
    },
    fact: {
      title: "Fakta Lokal",
      content: factContent,
    },
    appreciation: appreciation,
    lastUpdated: new Date().toISOString(),
  };

  // Save to localStorage
  saveToLocalStorage("beachQRContent", qrContent);

  // Close modal
  closeContentModal();

  // Reload data
  loadAllData();

  // Show success
  showNotification("Content updated successfully!", "success");
}

// ========================================
// PREVIEW TOPIC
// ========================================
function previewTopic(topicId) {
  const content = qrContent[topicId];
  if (!content) {
    showNotification("No content to preview", "warning");
    return;
  }

  // Show preview in console or new tab
  const previewData = JSON.stringify(content, null, 2);
  console.log(`Preview for ${topicId}:`, content);

  // Or open in new window
  const previewWindow = window.open("", "_blank");
  previewWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Preview: ${content.title}</title>
        <style>
          body { font-family: system-ui; padding: 2rem; max-width: 800px; margin: 0 auto; }
          pre { background: #f5f5f5; padding: 1rem; border-radius: 8px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>Preview: ${content.title}</h1>
        <p><strong>Icon:</strong> ${content.icon}</p>
        <p><strong>Mascot:</strong> ${getMascotName(content.mascot)}</p>
        <hr>
        <pre>${previewData}</pre>
      </body>
    </html>
  `);
}

// ========================================
// EXPORT ALL DATA
// ========================================
function exportAllData() {
  if (Object.keys(qrContent).length === 0) {
    showNotification("No data to export", "warning");
    return;
  }

  const dataStr = JSON.stringify(qrContent, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `beach-qr-content-${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();

  URL.revokeObjectURL(url);
  showNotification("Data exported successfully!", "success");
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
window.openEditModal = openEditModal;
window.closeContentModal = closeContentModal;
window.saveContent = saveContent;
window.previewTopic = previewTopic;
window.exportAllData = exportAllData;

console.log("✅ Beach QR Guide Manager Handler loaded");
