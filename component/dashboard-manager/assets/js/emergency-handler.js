// ========================================
// EMERGENCY RESCUE MANAGER HANDLER
// Manage emergency rescue reports
// ========================================

// Global state
let allReports = [];
let filteredReports = [];
let currentDetailReport = null;

// Animal emoji mapping
const ANIMAL_EMOJIS = {
  "sea-turtle": "🐢",
  dolphin: "🐬",
  shark: "🦈",
  "manta-ray": "🦋",
  whale: "🐋",
  other: "🐠",
};

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
  allReports = loadFromLocalStorage("emergencyReports") || [];

  // Initialize if empty
  if (allReports.length === 0) {
    initializeEmergencyData();
    allReports = loadFromLocalStorage("emergencyReports") || [];
  }

  // Update UI
  updateStatistics();
  applyFilters();
}

// ========================================
// UPDATE STATISTICS
// ========================================
function updateStatistics() {
  const totalEl = document.getElementById("stat-total");
  const pendingEl = document.getElementById("stat-pending");
  const progressEl = document.getElementById("stat-progress");
  const resolvedEl = document.getElementById("stat-resolved");

  if (totalEl) totalEl.textContent = allReports.length;

  const pending = allReports.filter((r) => r.status === "pending").length;
  const inProgress = allReports.filter(
    (r) => r.status === "in-progress"
  ).length;
  const resolved = allReports.filter((r) => r.status === "resolved").length;

  if (pendingEl) pendingEl.textContent = pending;
  if (progressEl) progressEl.textContent = inProgress;
  if (resolvedEl) resolvedEl.textContent = resolved;
}

// ========================================
// APPLY FILTERS
// ========================================
function applyFilters() {
  const statusFilter = document.getElementById("filter-status")?.value || "all";
  const priorityFilter =
    document.getElementById("filter-priority")?.value || "all";
  const animalFilter = document.getElementById("filter-animal")?.value || "all";
  const searchQuery =
    document.getElementById("search-input")?.value.toLowerCase() || "";

  filteredReports = allReports.filter((report) => {
    // Status filter
    if (statusFilter !== "all" && report.status !== statusFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== "all" && report.priority !== priorityFilter) {
      return false;
    }

    // Animal filter
    if (animalFilter !== "all" && report.animalType !== animalFilter) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const searchText = [
        report.id,
        report.reporterName,
        report.location?.text,
        report.animalTypeLabel,
        report.description,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchText.includes(searchQuery)) {
        return false;
      }
    }

    return true;
  });

  // Sort by timestamp (newest first)
  filteredReports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  renderReports();
}

// ========================================
// RENDER REPORTS
// ========================================
function renderReports() {
  const grid = document.getElementById("reports-grid");
  const countEl = document.getElementById("report-count");

  if (!grid) {
    console.warn("reports-grid element not found");
    return;
  }

  // Update count
  if (countEl) {
    countEl.textContent = `${filteredReports.length} report${
      filteredReports.length !== 1 ? "s" : ""
    }`;
  }

  // Empty state
  if (filteredReports.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <span class="text-6xl mb-4 block">🚨</span>
        <p class="text-gray-600 mb-2">No reports found</p>
        <p class="text-sm text-gray-500">Try adjusting your filters</p>
      </div>
    `;
    return;
  }

  // Render report cards
  const html = filteredReports
    .map((report) => {
      const statusClass = `status-${report.status}`;
      const priorityClass = `priority-${report.priority}`;
      const emoji = ANIMAL_EMOJIS[report.animalType] || "🐠";
      const timeAgoStr = timeAgo(report.timestamp);

      return `
      <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer" onclick="viewReportDetail('${
        report.id
      }')">
        <!-- Priority Badge -->
        <div class="px-4 pt-4 pb-2 flex items-center justify-between">
          <span class="px-2 py-1 rounded text-xs font-semibold ${priorityClass}">
            ${report.priority.toUpperCase()}
          </span>
          <span class="text-xs text-gray-500">${timeAgoStr}</span>
        </div>

        <!-- Content -->
        <div class="px-4 pb-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-2xl">${emoji}</span>
            <h3 class="font-bold text-ink text-sm">${report.id}</h3>
          </div>

          <div class="space-y-1 mb-3">
            <p class="text-sm font-semibold text-gray-900">${
              report.animalTypeLabel
            } - ${report.conditionLabel}</p>
            <p class="text-xs text-gray-600 line-clamp-2">${
              report.description
            }</p>
            <p class="text-xs text-gray-500">📍 ${
              report.location?.text || "Unknown location"
            }</p>
            <p class="text-xs text-gray-500">👤 ${report.reporterName}</p>
          </div>

          <!-- Status Badge -->
          <div class="flex items-center justify-between">
            <span class="px-2 py-1 rounded text-xs font-medium ${statusClass}">
              ${getStatusLabel(report.status)}
            </span>
            ${
              report.photos && report.photos.length > 0
                ? `<span class="text-xs text-gray-500">📷 ${report.photos.length}</span>`
                : ""
            }
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  grid.innerHTML = html;
}

// ========================================
// VIEW REPORT DETAIL
// ========================================
function viewReportDetail(reportId) {
  const report = allReports.find((r) => r.id === reportId);
  if (!report) {
    showNotification("Report not found", "error");
    return;
  }

  currentDetailReport = report;

  // Build detail HTML
  const detailHTML = buildDetailHTML(report);

  // Inject into panel
  const detailContent = document.getElementById("detail-content");
  if (detailContent) {
    detailContent.innerHTML = detailHTML;
  }

  // Show panel
  openDetailPanel();
}

// ========================================
// BUILD DETAIL HTML
// ========================================
function buildDetailHTML(report) {
  const emoji = ANIMAL_EMOJIS[report.animalType] || "🐠";
  const statusClass = `status-${report.status}`;
  const priorityClass = `priority-${report.priority}`;
  const timeStr = formatTimestamp(report.timestamp);

  // Photos HTML
  let photosHTML = "";
  if (report.photos && report.photos.length > 0) {
    photosHTML = `
      <div class="mb-6">
        <h4 class="font-semibold text-gray-900 mb-3">📷 Photos (${
          report.photos.length
        })</h4>
        <div class="grid grid-cols-2 gap-3">
          ${report.photos
            .map(
              (photo) => `
            <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img src="${photo}" alt="Evidence photo" class="w-full h-full object-cover" onerror="this.src='/test/img/reporting/placeholder.jpg'" />
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // Status history timeline
  const timelineHTML = report.statusHistory
    ? report.statusHistory
        .slice()
        .reverse()
        .map((update) => {
          const updateTime = timeAgo(update.timestamp);
          return `
        <div class="flex gap-3">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-primary"></div>
            <div class="w-0.5 h-full bg-gray-200"></div>
          </div>
          <div class="flex-1 pb-4">
            <p class="font-semibold text-sm text-gray-900">${update.title}</p>
            <p class="text-xs text-gray-600 mb-1">${update.note}</p>
            <p class="text-xs text-gray-500">${updateTime} • by ${
            update.updatedBy || "System"
          }</p>
          </div>
        </div>
      `;
        })
        .join("")
    : '<p class="text-sm text-gray-500">No status history</p>';

  return `
    <!-- Report Header -->
    <div class="mb-6 pb-6 border-b">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-4xl">${emoji}</span>
        <div>
          <h3 class="text-xl font-bold text-gray-900">${report.id}</h3>
          <p class="text-sm text-gray-600">${timeStr}</p>
        </div>
      </div>
      
      <div class="flex gap-2 mb-3">
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
          ${getStatusLabel(report.status)}
        </span>
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${priorityClass}">
          ${report.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>

    <!-- Reporter Info -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-900 mb-3">👤 Reporter Information</h4>
      <div class="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
        <p><span class="text-gray-600">Name:</span> <span class="font-medium">${
          report.reporterName
        }</span></p>
        <p><span class="text-gray-600">Phone:</span> <span class="font-medium">${
          report.reporterPhone
        }</span></p>
        <p><span class="text-gray-600">Email:</span> <span class="font-medium">${
          report.reporterEmail
        }</span></p>
      </div>
    </div>

    <!-- Animal Info -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-900 mb-3">${emoji} Animal Information</h4>
      <div class="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
        <p><span class="text-gray-600">Type:</span> <span class="font-medium">${
          report.animalTypeLabel
        }</span></p>
        <p><span class="text-gray-600">Condition:</span> <span class="font-medium">${
          report.conditionLabel
        }</span></p>
        <p class="text-gray-700 pt-2">${report.description}</p>
      </div>
    </div>

    <!-- Location -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-900 mb-3">📍 Location</h4>
      <div class="bg-gray-50 rounded-lg p-4 text-sm">
        <p class="font-medium text-gray-700">${
          report.location?.text || "Location not specified"
        }</p>
        ${
          report.location?.coords
            ? `<p class="text-xs text-gray-500 mt-1">Coordinates: ${report.location.coords.lat}, ${report.location.coords.lng}</p>`
            : ""
        }
      </div>
    </div>

    <!-- Photos -->
    ${photosHTML}

    <!-- Status Timeline -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-900 mb-3">📋 Status Timeline</h4>
      <div class="space-y-2">
        ${timelineHTML}
      </div>
    </div>

    <!-- Handler Actions -->
    <div class="bg-blue-50 rounded-lg p-4">
      <h4 class="font-semibold text-gray-900 mb-3">🛠️ Handler Actions</h4>
      
      <!-- Assigned To -->
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
        <input 
          type="text" 
          id="detail-assigned-to"
          value="${report.assignedTo || ""}"
          placeholder="Enter handler name"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      <!-- Handler Notes -->
      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">Handler Notes</label>
        <textarea 
          id="detail-handler-notes"
          rows="3"
          placeholder="Add notes about this case..."
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >${report.handlerNotes || ""}</textarea>
      </div>

      <!-- Update Status -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
        <select 
          id="detail-new-status"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="">-- Select New Status --</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="block text-sm font-medium text-gray-700 mb-1">Status Update Note</label>
        <textarea 
          id="detail-status-note"
          rows="2"
          placeholder="Add note about this status change..."
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        ></textarea>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <button 
          onclick="saveReportUpdates('${report.id}')"
          class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
        >
          Save Changes
        </button>
        <button 
          onclick="deleteReport('${report.id}')"
          class="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  `;
}

// ========================================
// SAVE REPORT UPDATES
// ========================================
function saveReportUpdates(reportId) {
  const assignedTo = document.getElementById("detail-assigned-to")?.value || "";
  const handlerNotes =
    document.getElementById("detail-handler-notes")?.value || "";
  const newStatus = document.getElementById("detail-new-status")?.value;
  const statusNote = document.getElementById("detail-status-note")?.value || "";

  const reportIndex = allReports.findIndex((r) => r.id === reportId);
  if (reportIndex === -1) {
    showNotification("Report not found", "error");
    return;
  }

  const report = allReports[reportIndex];
  const conservator = getCurrentConservator();

  // Update basic fields
  report.assignedTo = assignedTo;
  report.handlerNotes = handlerNotes;

  // Update status if changed
  if (newStatus && newStatus !== report.status) {
    const oldStatus = report.status;
    report.status = newStatus;

    // Add to status history
    if (!report.statusHistory) {
      report.statusHistory = [];
    }

    report.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      title: getStatusChangeTitle(oldStatus, newStatus),
      note: statusNote || `Status changed from ${oldStatus} to ${newStatus}`,
      updatedBy: conservator?.name || "Conservator",
    });
  }

  // Save to localStorage
  allReports[reportIndex] = report;
  saveToLocalStorage("emergencyReports", allReports);

  // Reload data
  loadAllData();

  // Update detail panel
  viewReportDetail(reportId);

  showNotification("Report updated successfully!", "success");
}

// ========================================
// DELETE REPORT
// ========================================
function deleteReport(reportId) {
  if (
    !confirm(
      "Are you sure you want to delete this report? This action cannot be undone."
    )
  ) {
    return;
  }

  allReports = allReports.filter((r) => r.id !== reportId);
  saveToLocalStorage("emergencyReports", allReports);

  closeDetailPanel();
  loadAllData();

  showNotification("Report deleted", "success");
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function getStatusLabel(status) {
  const labels = {
    pending: "Pending",
    "in-progress": "In Progress",
    resolved: "Resolved",
  };
  return labels[status] || status;
}

function getStatusChangeTitle(oldStatus, newStatus) {
  if (newStatus === "in-progress") {
    return "Response Team Dispatched";
  } else if (newStatus === "resolved") {
    return "Case Resolved";
  }
  return "Status Updated";
}

// ========================================
// DETAIL PANEL CONTROLS
// ========================================
function openDetailPanel() {
  const panel = document.getElementById("detail-panel");
  const overlay = document.getElementById("detail-overlay");

  if (panel) panel.classList.add("active");
  if (overlay) overlay.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeDetailPanel() {
  const panel = document.getElementById("detail-panel");
  const overlay = document.getElementById("detail-overlay");

  if (panel) panel.classList.remove("active");
  if (overlay) overlay.classList.remove("active");

  document.body.style.overflow = "auto";

  currentDetailReport = null;
}

// ========================================
// REFRESH DATA
// ========================================
function refreshData() {
  loadAllData();
  showNotification("Data refreshed", "success");
}

// ========================================
// EXPORT TO CSV
// ========================================
function exportToCSV() {
  if (filteredReports.length === 0) {
    showNotification("No data to export", "warning");
    return;
  }

  const headers = [
    "ID",
    "Timestamp",
    "Reporter Name",
    "Reporter Phone",
    "Reporter Email",
    "Animal Type",
    "Condition",
    "Location",
    "Status",
    "Priority",
    "Assigned To",
    "Description",
  ];

  const rows = filteredReports.map((report) => [
    report.id,
    report.timestamp,
    report.reporterName,
    report.reporterPhone,
    report.reporterEmail,
    report.animalTypeLabel,
    report.conditionLabel,
    report.location?.text || "",
    report.status,
    report.priority,
    report.assignedTo || "",
    `"${report.description.replace(/"/g, '""')}"`,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `emergency-reports-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  link.click();

  URL.revokeObjectURL(url);

  showNotification("Data exported successfully!", "success");
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
window.viewReportDetail = viewReportDetail;
window.saveReportUpdates = saveReportUpdates;
window.deleteReport = deleteReport;
window.applyFilters = applyFilters;
window.refreshData = refreshData;
window.exportToCSV = exportToCSV;
window.closeDetailPanel = closeDetailPanel;

console.log("✅ Emergency Rescue Manager Handler loaded");
