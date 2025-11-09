// ========================================
// CORATUKA - CAMPAIGN & EVENT MANAGER HANDLER
// FIXED VERSION - Tab switching issue resolved
// ========================================

// Global state
let allCampaigns = [];
let allEvents = [];
let currentTab = "campaigns";
let selectedEventId = null;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Campaign & Event Manager Loading...");

  // Check access
  if (!checkConservatorAccess()) {
    return;
  }

  // Load conservator info
  loadConservatorInfo();

  // Load all data
  loadAllData();

  // Setup multi-tab sync
  setupMultiTabSync(() => {
    loadAllData();
  });

  console.log("✅ Manager System Ready!");
});

// ========================================
// LOAD CONSERVATOR INFO
// ========================================
function loadConservatorInfo() {
  const user = getCurrentConservator();
  if (user) {
    const nameEl = document.getElementById("conservator-name");
    if (nameEl) nameEl.textContent = user.name || "Conservator";
  }
}

// ========================================
// LOAD ALL DATA
// ========================================
function loadAllData() {
  try {
    // Load campaigns
    allCampaigns = loadFromLocalStorage("coratukaCampaigns") || [];
    if (!Array.isArray(allCampaigns)) allCampaigns = [];

    // Load events
    allEvents = loadFromLocalStorage("campaignEvents") || [];
    if (!Array.isArray(allEvents)) allEvents = [];

    console.log(
      "📊 Data loaded:",
      allCampaigns.length,
      "campaigns,",
      allEvents.length,
      "events"
    );

    // Update statistics
    updateStatistics();

    // Reload current tab content
    if (currentTab === "campaigns") {
      loadCampaigns();
    } else if (currentTab === "events") {
      loadEvents();
    } else if (currentTab === "registrants") {
      populateEventSelectors();
      if (selectedEventId) loadRegistrants();
    } else if (currentTab === "attendance") {
      populateEventSelectors();
      if (selectedEventId) loadAttendance();
    } else if (currentTab === "statistics") {
      loadStatistics();
    }
  } catch (error) {
    console.error("❌ Error loading data:", error);
  }
}

// ========================================
// UPDATE STATISTICS
// ========================================
function updateStatistics() {
  try {
    // Total campaigns + events
    const totalItems = allCampaigns.length + allEvents.length;
    const statTotal = document.getElementById("stat-total");
    if (statTotal) statTotal.textContent = totalItems;

    // Upcoming events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = allEvents.filter((e) => {
      if (!e.date) return false;
      const eventDate = new Date(e.date);
      return eventDate >= today && e.status === "open";
    });
    const statUpcoming = document.getElementById("stat-upcoming");
    if (statUpcoming) statUpcoming.textContent = upcoming.length;

    // Total registrants
    let totalRegistrants = 0;
    allCampaigns.forEach((c) => {
      if (c.registrants) totalRegistrants += c.registrants.length;
    });
    allEvents.forEach((e) => {
      if (e.registrants) totalRegistrants += e.registrants.length;
    });
    const statRegistrants = document.getElementById("stat-registrants");
    if (statRegistrants) statRegistrants.textContent = totalRegistrants;

    // Average attendance
    let completedEvents = allEvents.filter((e) => e.status === "completed");
    let totalAttended = 0;
    let totalRegistered = 0;
    completedEvents.forEach((event) => {
      if (event.registrants) {
        totalRegistered += event.registrants.length;
        totalAttended += event.registrants.filter(
          (r) => r.attended === true
        ).length;
      }
    });
    const avgAttendance =
      totalRegistered > 0
        ? Math.round((totalAttended / totalRegistered) * 100)
        : 0;
    const statAttendance = document.getElementById("stat-attendance");
    if (statAttendance) statAttendance.textContent = `${avgAttendance}%`;

    // Completed
    const completedCampaigns = allCampaigns.filter(
      (c) => c.status === "completed"
    );
    const totalCompleted = completedCampaigns.length + completedEvents.length;
    const statCompleted = document.getElementById("stat-completed");
    if (statCompleted) statCompleted.textContent = totalCompleted;
  } catch (error) {
    console.error("❌ Error updating statistics:", error);
  }
}

// ========================================
// TAB SWITCHING - FIXED
// ========================================
function switchTab(tabName) {
  try {
    console.log("🔄 Switching to tab:", tabName);
    currentTab = tabName;

    // FIXED: Use correct selector .tab-button
    const allTabButtons = document.querySelectorAll(".tab-button");
    allTabButtons.forEach((btn) => btn.classList.remove("active"));

    const targetBtn = document.getElementById(`tab-${tabName}`);
    if (targetBtn) {
      targetBtn.classList.add("active");
      console.log("✅ Activated button:", tabName);
    }

    // FIXED: Use correct content IDs
    const allTabContents = document.querySelectorAll(".tab-content");
    allTabContents.forEach((content) => content.classList.remove("active"));

    const targetContent = document.getElementById(`${tabName}-content`);
    if (targetContent) {
      targetContent.classList.add("active");
      console.log("✅ Showing content:", tabName);
    }

    // Load tab data
    switch (tabName) {
      case "campaigns":
        loadCampaigns();
        break;
      case "events":
        loadEvents();
        break;
      case "registrants":
        populateEventSelectors();
        break;
      case "attendance":
        populateEventSelectors();
        break;
      case "statistics":
        loadStatistics();
        break;
    }
    console.log("✅ Tab switched successfully");
  } catch (error) {
    console.error("❌ Error in switchTab:", error);
  }
}

// Make switchTab available globally
window.switchTab = switchTab;

// ========================================
// CAMPAIGNS TAB
// ========================================
function loadCampaigns() {
  console.log("📢 Loading campaigns...");
  const grid = document.getElementById("campaigns-grid");
  if (!grid) return;

  const filterValue =
    document.getElementById("campaign-filter")?.value || "all";
  const sortValue = document.getElementById("campaign-sort")?.value || "newest";

  // Filter campaigns
  let filteredCampaigns = [...allCampaigns];
  if (filterValue !== "all") {
    filteredCampaigns = filteredCampaigns.filter(
      (c) => c.status === filterValue
    );
  }

  // Sort campaigns
  switch (sortValue) {
    case "newest":
      filteredCampaigns.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      break;
    case "popular":
      filteredCampaigns.sort(
        (a, b) => (b.participants || 0) - (a.participants || 0)
      );
      break;
    case "progress":
      filteredCampaigns.sort((a, b) => {
        const progressA = ((a.participants || 0) / (a.target || 1)) * 100;
        const progressB = ((b.participants || 0) / (b.target || 1)) * 100;
        return progressB - progressA;
      });
      break;
  }

  if (filteredCampaigns.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-400">
        <div class="text-6xl mb-3">📢</div>
        <p class="text-sm mb-4">No campaigns found</p>
        <button onclick="openCampaignModal()" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium">Create First Campaign</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredCampaigns
    .map((campaign) => {
      const statusBadge = getStatusBadge(campaign.status);
      const categoryBadge = getCategoryBadge(campaign.category);
      const progress =
        ((campaign.participants || 0) / (campaign.target || 1)) * 100;
      const progressColor =
        progress >= 80
          ? "bg-green-600"
          : progress >= 50
          ? "bg-yellow-600"
          : "bg-blue-600";

      return `
      <div class="campaign-card bg-white rounded-xl overflow-hidden">
        <div class="card-image-container">
          ${
            campaign.image
              ? `<img src="${campaign.image}" alt="${campaign.title}" class="w-full aspect-video object-cover" />`
              : `<div class="w-full aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                 <span class="text-5xl">${campaign.emoji || "📢"}</span>
               </div>`
          }
          <div class="card-image-overlay">
            <button onclick="viewCampaignDetails('${
              campaign.id
            }')" class="overlay-button px-6 py-3 bg-white text-ink rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="mb-3">
            <div class="flex items-center gap-2 mb-2">${statusBadge}${categoryBadge}</div>
            <h3 class="font-bold text-gray-900 mb-1 line-clamp-2">${
              campaign.title
            }</h3>
            <p class="text-xs text-gray-600 line-clamp-2">${
              campaign.description || ""
            }</p>
          </div>
          <div class="space-y-2 text-sm mb-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">👥 Participants</span>
              <span class="font-bold text-ink">${campaign.participants || 0}/${
        campaign.target || 0
      }</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="${progressColor} h-2 rounded-full transition-all" style="width: ${Math.min(
        progress,
        100
      )}%"></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">⏱️ Duration</span>
              <span class="font-medium text-ink">${
                campaign.duration || "N/A"
              }</span>
            </div>
          </div>
          <div class="flex gap-2 pt-3 border-t border-gray-100">
            <button onclick="openCampaignModal('${
              campaign.id
            }')" class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium text-sm">✏️ Edit</button>
            <button onclick="deleteCampaign('${
              campaign.id
            }')" class="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  console.log("✅ Campaigns loaded:", filteredCampaigns.length);
}

function openCampaignModal(campaignId = null) {
  const modal = document.getElementById("campaign-modal");
  const title = document.getElementById("campaign-modal-title");
  const form = document.getElementById("campaign-form");
  if (!modal) return;

  form.reset();
  const preview = document.getElementById("campaign-image-preview");
  if (preview) preview.classList.add("hidden");

  if (campaignId) {
    const campaign = allCampaigns.find((c) => c.id === campaignId);
    if (!campaign) return;
    title.textContent = "Edit Campaign";
    document.getElementById("campaign-id").value = campaign.id;
    document.getElementById("campaign-title").value = campaign.title;
    document.getElementById("campaign-description").value =
      campaign.description || "";
    document.getElementById("campaign-emoji").value = campaign.emoji || "";
    document.getElementById("campaign-category").value =
      campaign.category || "edukasi";
    document.getElementById("campaign-target").value = campaign.target || 100;
    document.getElementById("campaign-duration").value =
      campaign.duration || "";
    document.getElementById("campaign-status").value =
      campaign.status || "open";
    if (campaign.image && preview) {
      preview.src = campaign.image;
      preview.classList.remove("hidden");
    }
  } else {
    title.textContent = "Create New Campaign";
    document.getElementById("campaign-id").value = "";
  }

  modal.classList.add("active");
}

function closeCampaignModal() {
  const modal = document.getElementById("campaign-modal");
  if (modal) modal.classList.remove("active");
}

function saveCampaign() {
  const form = document.getElementById("campaign-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const campaignId = document.getElementById("campaign-id").value;
  const isEdit = campaignId !== "";

  const campaignData = {
    id: isEdit ? campaignId : "campaign-" + Date.now(),
    title: document.getElementById("campaign-title").value,
    description: document.getElementById("campaign-description").value,
    emoji: document.getElementById("campaign-emoji").value,
    category: document.getElementById("campaign-category").value,
    target: parseInt(document.getElementById("campaign-target").value),
    duration: document.getElementById("campaign-duration").value,
    status: document.getElementById("campaign-status").value,
    participants: 0,
    registrants: [],
    createdAt: isEdit
      ? allCampaigns.find((c) => c.id === campaignId)?.createdAt
      : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const preview = document.getElementById("campaign-image-preview");
  if (preview && !preview.classList.contains("hidden")) {
    campaignData.image = preview.src;
  } else if (isEdit) {
    const existing = allCampaigns.find((c) => c.id === campaignId);
    if (existing?.image) campaignData.image = existing.image;
  }

  if (isEdit) {
    const index = allCampaigns.findIndex((c) => c.id === campaignId);
    if (index !== -1) {
      campaignData.participants = allCampaigns[index].participants;
      campaignData.registrants = allCampaigns[index].registrants;
      allCampaigns[index] = campaignData;
    }
  } else {
    allCampaigns.push(campaignData);
  }

  saveToLocalStorage("coratukaCampaigns", allCampaigns);
  closeCampaignModal();
  showNotification(
    isEdit ? "Campaign updated successfully" : "Campaign created successfully",
    "success"
  );
  loadAllData();
}

function deleteCampaign(campaignId) {
  if (!confirm("Are you sure you want to delete this campaign?")) return;
  allCampaigns = allCampaigns.filter((c) => c.id !== campaignId);
  saveToLocalStorage("coratukaCampaigns", allCampaigns);
  showNotification("Campaign deleted successfully", "success");
  loadAllData();
}

function viewCampaignDetails(campaignId) {
  const campaign = allCampaigns.find((c) => c.id === campaignId);
  if (!campaign) return;
  alert(
    `Campaign: ${campaign.title}\n\nParticipants: ${campaign.participants}/${campaign.target}\nStatus: ${campaign.status}\nDuration: ${campaign.duration}`
  );
}

// ========================================
// EVENTS TAB
// ========================================
function loadEvents() {
  console.log("📅 Loading events...");
  const grid = document.getElementById("events-grid");
  if (!grid) return;

  const filterValue = document.getElementById("event-filter")?.value || "all";
  const sortValue = document.getElementById("event-sort")?.value || "newest";

  let filteredEvents = [...allEvents];
  if (filterValue !== "all") {
    filteredEvents = filteredEvents.filter((e) => e.status === filterValue);
  }

  switch (sortValue) {
    case "newest":
      filteredEvents.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      break;
    case "date-asc":
      filteredEvents.sort(
        (a, b) => new Date(a.date || 0) - new Date(b.date || 0)
      );
      break;
    case "popular":
      filteredEvents.sort(
        (a, b) => (b.registrants?.length || 0) - (a.registrants?.length || 0)
      );
      break;
  }

  if (filteredEvents.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-400">
        <div class="text-6xl mb-3">📅</div>
        <p class="text-sm mb-4">No events found</p>
        <button onclick="openEventModal()" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium">Create First Event</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredEvents
    .map((event) => {
      const statusBadge = getStatusBadge(event.status);
      const categoryBadge = getCategoryBadge(event.category);
      const registrantCount = event.registrants?.length || 0;
      const maxParticipants = event.maxParticipants || 0;
      const fillPercent =
        maxParticipants > 0
          ? Math.round((registrantCount / maxParticipants) * 100)
          : 0;

      return `
      <div class="event-card bg-white rounded-xl overflow-hidden">
        <div class="card-image-container">
          ${
            event.image
              ? `<img src="${event.image}" alt="${event.title}" class="w-full aspect-video object-cover" />`
              : `<div class="w-full aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                 <span class="text-5xl">${event.emoji || "📅"}</span>
               </div>`
          }
          <div class="card-image-overlay">
            <button onclick="viewEventDetails('${
              event.id
            }')" class="overlay-button px-6 py-3 bg-white text-ink rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </button>
          </div>
        </div>
        <div class="p-4">
          <div class="mb-3">
            <div class="flex items-center gap-2 mb-2">
              ${statusBadge}${categoryBadge}
              ${
                event.isFeatured
                  ? '<span class="badge bg-yellow-100 text-yellow-800">⭐ Featured</span>'
                  : ""
              }
            </div>
            <h3 class="font-bold text-gray-900 mb-1 line-clamp-2">${
              event.title
            }</h3>
            <p class="text-xs text-gray-600 line-clamp-2">${
              event.description || ""
            }</p>
          </div>
          <div class="space-y-2 text-sm mb-4">
            <div class="flex items-center gap-2">
              <span class="text-gray-600">📅</span>
              <span class="font-medium text-ink">${formatDate(
                event.date
              )}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600">⏰</span>
              <span class="text-gray-600">${event.time || "TBA"}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600">📍</span>
              <span class="text-gray-600 line-clamp-1">${
                event.location || "TBA"
              }</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">👥 Registrants</span>
              <span class="font-bold text-ink">${registrantCount}/${maxParticipants}</span>
            </div>
            ${
              fillPercent > 0
                ? `<div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-primary-600 h-2 rounded-full" style="width: ${fillPercent}%"></div></div>`
                : ""
            }
          </div>
          <div class="flex gap-2 pt-3 border-t border-gray-100">
            <button onclick="openEventModal('${
              event.id
            }')" class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium text-sm">✏️ Edit</button>
            <button onclick="deleteEvent('${
              event.id
            }')" class="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  console.log("✅ Events loaded:", filteredEvents.length);
}

function openEventModal(eventId = null) {
  const modal = document.getElementById("event-modal");
  const title = document.getElementById("event-modal-title");
  const form = document.getElementById("event-form");
  if (!modal) return;

  form.reset();
  const preview = document.getElementById("event-image-preview");
  if (preview) preview.classList.add("hidden");
  const featured = document.getElementById("event-featured");
  if (featured) featured.checked = false;

  if (eventId) {
    const event = allEvents.find((e) => e.id === eventId);
    if (!event) return;
    title.textContent = "Edit Event";
    document.getElementById("event-id").value = event.id;
    document.getElementById("event-title").value = event.title;
    document.getElementById("event-description").value =
      event.description || "";
    document.getElementById("event-date").value = event.date || "";
    document.getElementById("event-time").value = event.time || "";
    document.getElementById("event-location").value = event.location || "";
    document.getElementById("event-max-participants").value =
      event.maxParticipants || 50;
    document.getElementById("event-status").value = event.status || "open";
    document.getElementById("event-contact").value = event.contact || "";
    if (featured) featured.checked = event.isFeatured || false;
    if (event.image && preview) {
      preview.src = event.image;
      preview.classList.remove("hidden");
    }
  } else {
    title.textContent = "Create New Event";
    document.getElementById("event-id").value = "";
  }

  modal.classList.add("active");
}

function closeEventModal() {
  const modal = document.getElementById("event-modal");
  if (modal) modal.classList.remove("active");
}

function saveEvent() {
  const form = document.getElementById("event-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const eventId = document.getElementById("event-id").value;
  const isEdit = eventId !== "";

  const eventData = {
    id: isEdit ? eventId : "event-" + Date.now(),
    title: document.getElementById("event-title").value,
    description: document.getElementById("event-description").value,
    date: document.getElementById("event-date").value,
    time: document.getElementById("event-time").value,
    location: document.getElementById("event-location").value,
    maxParticipants: parseInt(
      document.getElementById("event-max-participants").value
    ),
    status: document.getElementById("event-status").value,
    contact: document.getElementById("event-contact").value,
    isFeatured: document.getElementById("event-featured").checked,
    category: "relawan",
    emoji: "📅",
    participants: 0,
    registrants: [],
    createdAt: isEdit
      ? allEvents.find((e) => e.id === eventId)?.createdAt
      : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const preview = document.getElementById("event-image-preview");
  if (preview && !preview.classList.contains("hidden")) {
    eventData.image = preview.src;
  } else if (isEdit) {
    const existing = allEvents.find((e) => e.id === eventId);
    if (existing?.image) eventData.image = existing.image;
  }

  if (isEdit) {
    const index = allEvents.findIndex((e) => e.id === eventId);
    if (index !== -1) {
      eventData.participants = allEvents[index].participants;
      eventData.registrants = allEvents[index].registrants;
      eventData.category = allEvents[index].category;
      eventData.emoji = allEvents[index].emoji;
      allEvents[index] = eventData;
    }
  } else {
    allEvents.push(eventData);
  }

  saveToLocalStorage("campaignEvents", allEvents);
  closeEventModal();
  showNotification(
    isEdit ? "Event updated successfully" : "Event created successfully",
    "success"
  );
  loadAllData();
}

function deleteEvent(eventId) {
  if (!confirm("Are you sure you want to delete this event?")) return;
  allEvents = allEvents.filter((e) => e.id !== eventId);
  saveToLocalStorage("campaignEvents", allEvents);
  showNotification("Event deleted successfully", "success");
  loadAllData();
}

function viewEventDetails(eventId) {
  const event = allEvents.find((e) => e.id === eventId);
  if (!event) return;
  const registrantCount = event.registrants?.length || 0;
  alert(
    `Event: ${event.title}\n\nDate: ${formatDate(event.date)}\nTime: ${
      event.time
    }\nLocation: ${event.location}\nRegistrants: ${registrantCount}/${
      event.maxParticipants
    }\nStatus: ${event.status}`
  );
}

// ========================================
// IMAGE PREVIEW
// ========================================
function previewCampaignImage(input) {
  const preview = document.getElementById("campaign-image-preview");
  if (!preview || !input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.classList.remove("hidden");
  };
  reader.readAsDataURL(input.files[0]);
}

function previewEventImage(input) {
  const preview = document.getElementById("event-image-preview");
  if (!preview || !input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.classList.remove("hidden");
  };
  reader.readAsDataURL(input.files[0]);
}

// ========================================
// REGISTRANTS TAB
// ========================================
function populateEventSelectors() {
  const selectors = [
    document.getElementById("registrant-event-select"),
    document.getElementById("attendance-event-select"),
  ];
  selectors.forEach((select) => {
    if (!select) return;
    select.innerHTML = `<option value="">-- Select Event --</option>${allEvents
      .map(
        (e) =>
          `<option value="${e.id}">${e.title} (${formatDate(e.date)})</option>`
      )
      .join("")}`;
  });
}

function loadRegistrants() {
  const eventId =
    selectedEventId ||
    document.getElementById("registrant-event-select")?.value;
  const list = document.getElementById("registrants-list");
  if (!list) return;

  if (!eventId) {
    list.innerHTML = `<div class="text-center py-12 text-gray-400"><div class="text-6xl mb-3">👥</div><p class="text-sm">Please select an event to view registrants</p></div>`;
    return;
  }

  selectedEventId = eventId;
  const event = allEvents.find((e) => e.id === eventId);
  if (!event) return;

  const registrants = event.registrants || [];
  if (registrants.length === 0) {
    list.innerHTML = `<div class="text-center py-12 text-gray-400"><div class="text-6xl mb-3">👥</div><p class="text-sm">No registrants for this event</p></div>`;
    return;
  }

  list.innerHTML = `
    <div class="mb-4 flex items-center justify-between">
      <p class="text-sm text-gray-600">Total Registrants: <span class="font-bold text-ink">${
        registrants.length
      }</span></p>
      <button onclick="exportRegistrants()" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ink rounded-lg transition-colors font-medium text-sm">📥 Export CSV</button>
    </div>
    <div class="space-y-2">
      ${registrants
        .map(
          (reg) => `
        <div class="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-4">
            <div class="registrant-avatar">${getInitials(
              reg.userName || "?"
            )}</div>
            <div class="flex-1">
              <p class="font-medium text-gray-900">${
                reg.userName || "Anonymous"
              }</p>
              <p class="text-xs text-gray-600">${reg.userEmail || ""}</p>
              <p class="text-xs text-gray-600">${reg.userPhone || ""}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-600">Registered</p>
              <p class="text-xs font-medium text-ink">${formatDateTime(
                reg.registeredAt
              )}</p>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function exportRegistrants() {
  if (!selectedEventId) return;
  const event = allEvents.find((e) => e.id === selectedEventId);
  if (!event || !event.registrants) return;

  let csv = "Name,Email,Phone,Registered At\n";
  event.registrants.forEach((reg) => {
    csv += `"${reg.userName || ""}","${reg.userEmail || ""}","${
      reg.userPhone || ""
    }","${formatDateTime(reg.registeredAt)}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `registrants-${event.title.replace(/\s+/g, "-")}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
  showNotification("Registrants exported successfully", "success");
}

// ========================================
// ATTENDANCE TAB
// ========================================
function loadAttendance() {
  const eventId =
    selectedEventId ||
    document.getElementById("attendance-event-select")?.value;
  const list = document.getElementById("attendance-list");
  if (!list) return;

  if (!eventId) {
    list.innerHTML = `<div class="text-center py-12 text-gray-400"><div class="text-6xl mb-3">✅</div><p class="text-sm">Please select an event to manage attendance</p></div>`;
    return;
  }

  selectedEventId = eventId;
  const event = allEvents.find((e) => e.id === eventId);
  if (!event) return;

  const registrants = event.registrants || [];
  if (registrants.length === 0) {
    list.innerHTML = `<div class="text-center py-12 text-gray-400"><div class="text-6xl mb-3">👥</div><p class="text-sm">No registrants for this event</p></div>`;
    return;
  }

  const attendedCount = registrants.filter((r) => r.attended === true).length;
  const absentCount = registrants.filter((r) => r.attended === false).length;
  const notMarkedCount = registrants.filter(
    (r) => r.attended === undefined
  ).length;
  const attendanceRate =
    registrants.length > 0
      ? Math.round((attendedCount / registrants.length) * 100)
      : 0;

  list.innerHTML = `
    <div class="mb-6 grid grid-cols-3 gap-4">
      <div class="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
        <p class="text-2xl font-bold text-green-600">${attendedCount}</p>
        <p class="text-xs text-green-700">Attended</p>
      </div>
      <div class="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-center">
        <p class="text-2xl font-bold text-red-600">${absentCount}</p>
        <p class="text-xs text-red-700">Absent</p>
      </div>
      <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 text-center">
        <p class="text-2xl font-bold text-yellow-600">${notMarkedCount}</p>
        <p class="text-xs text-yellow-700">Not Marked</p>
      </div>
    </div>
    <div class="mb-4 flex items-center justify-between">
      <p class="text-sm text-gray-600">Attendance Rate: <span class="font-bold text-green-600">${attendanceRate}%</span></p>
      <div class="flex gap-2">
        <button onclick="markAllAttendance(true)" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ink rounded-lg transition-colors font-medium text-sm">✓ Mark All Present</button>
        <button onclick="markAllAttendance(false)" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ink rounded-lg transition-colors font-medium text-sm">✗ Mark All Absent</button>
      </div>
    </div>
    <div class="space-y-2">
      ${registrants
        .map(
          (reg, idx) => `
        <div class="bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center gap-4">
          <input type="checkbox" id="attendance-${idx}" class="attendance-check" ${
            reg.attended === true ? "checked" : ""
          } onchange="toggleAttendance(${idx})" />
          <label for="attendance-${idx}" class="flex-1 cursor-pointer">
            <p class="font-medium text-gray-900">${
              reg.userName || "Anonymous"
            }</p>
            <p class="text-xs text-gray-600">${reg.userEmail || ""}</p>
          </label>
          ${
            reg.attended === true
              ? '<span class="badge badge-completed">Present</span>'
              : reg.attended === false
              ? '<span class="badge badge-closed">Absent</span>'
              : '<span class="badge badge-pending">Not Marked</span>'
          }
        </div>
      `
        )
        .join("")}
    </div>
    <div class="mt-6 flex justify-end">
      <button onclick="saveAttendance()" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium">💾 Save Attendance</button>
    </div>
  `;
}

function toggleAttendance(index) {
  const event = allEvents.find((e) => e.id === selectedEventId);
  if (!event || !event.registrants) return;
  const checkbox = document.getElementById(`attendance-${index}`);
  if (checkbox) event.registrants[index].attended = checkbox.checked;
}

function markAllAttendance(attended) {
  const event = allEvents.find((e) => e.id === selectedEventId);
  if (!event || !event.registrants) return;
  event.registrants.forEach((reg, idx) => {
    reg.attended = attended;
    const checkbox = document.getElementById(`attendance-${idx}`);
    if (checkbox) checkbox.checked = attended;
  });
  loadAttendance();
}

function saveAttendance() {
  if (!selectedEventId) return;
  saveToLocalStorage("campaignEvents", allEvents);
  showNotification("Attendance saved successfully", "success");
  loadAllData();
}

// ========================================
// STATISTICS TAB
// ========================================
function loadStatistics() {
  console.log("📊 Loading statistics...");

  const popularEvents = [...allEvents]
    .sort((a, b) => (b.registrants?.length || 0) - (a.registrants?.length || 0))
    .slice(0, 5);
  const popularList = document.getElementById("popular-events-list");
  if (popularList) {
    popularList.innerHTML =
      popularEvents.length > 0
        ? popularEvents
            .map(
              (e, idx) => `
      <div class="flex items-center gap-3">
        <span class="text-2xl font-bold text-gray-400">#${idx + 1}</span>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">${e.title}</p>
          <p class="text-xs text-gray-600">${
            e.registrants?.length || 0
          } registrants</p>
        </div>
      </div>
    `
            )
            .join("")
        : '<p class="text-sm text-gray-500">No data available</p>';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = allEvents
    .filter((e) => {
      if (!e.date) return false;
      const eventDate = new Date(e.date);
      return eventDate >= today && e.status === "open";
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const upcomingList = document.getElementById("upcoming-events-list");
  if (upcomingList) {
    upcomingList.innerHTML =
      upcomingEvents.length > 0
        ? upcomingEvents
            .map(
              (e) => `
      <div class="flex items-start gap-3">
        <div class="text-sm text-gray-600">📅 ${formatDate(e.date)}</div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">${e.title}</p>
          <p class="text-xs text-gray-600">${e.location || "TBA"}</p>
        </div>
      </div>
    `
            )
            .join("")
        : '<p class="text-sm text-gray-500">No upcoming events</p>';
  }

  let totalRegistrations = 0;
  let totalCapacity = 0;
  allEvents.forEach((e) => {
    totalRegistrations += e.registrants?.length || 0;
    totalCapacity += e.maxParticipants || 0;
  });
  const avgPerEvent =
    allEvents.length > 0
      ? Math.round(totalRegistrations / allEvents.length)
      : 0;
  const capacityFill =
    totalCapacity > 0
      ? Math.round((totalRegistrations / totalCapacity) * 100)
      : 0;

  const totalRegsEl = document.getElementById("total-registrations");
  const avgPerEventEl = document.getElementById("avg-per-event");
  const capacityFillEl = document.getElementById("capacity-fill");
  if (totalRegsEl) totalRegsEl.textContent = totalRegistrations;
  if (avgPerEventEl) avgPerEventEl.textContent = avgPerEvent;
  if (capacityFillEl) capacityFillEl.textContent = `${capacityFill}%`;

  let totalAttended = 0;
  let totalRegistered = 0;
  const completedEvents = allEvents.filter((e) => e.status === "completed");
  completedEvents.forEach((e) => {
    if (e.registrants) {
      totalRegistered += e.registrants.length;
      totalAttended += e.registrants.filter((r) => r.attended === true).length;
    }
  });
  const overallAttendance =
    totalRegistered > 0
      ? Math.round((totalAttended / totalRegistered) * 100)
      : 0;

  const overallAttEl = document.getElementById("overall-attendance");
  const totalAttEl = document.getElementById("total-attended");
  const eventsCompEl = document.getElementById("events-completed");
  if (overallAttEl) overallAttEl.textContent = `${overallAttendance}%`;
  if (totalAttEl) totalAttEl.textContent = totalAttended;
  if (eventsCompEl) eventsCompEl.textContent = completedEvents.length;

  console.log("✅ Statistics loaded");
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function getStatusBadge(status) {
  const badges = {
    open: '<span class="badge badge-open">Open</span>',
    closed: '<span class="badge badge-closed">Closed</span>',
    completed: '<span class="badge badge-completed">Completed</span>',
    cancelled: '<span class="badge badge-rejected">Cancelled</span>',
  };
  return badges[status] || "";
}

function getCategoryBadge(category) {
  const badges = {
    relawan: '<span class="badge badge-open">Relawan</span>',
    edukasi: '<span class="badge badge-completed">Edukasi</span>',
    kampanye: '<span class="badge badge-pending">Kampanye</span>',
  };
  return badges[category] || "";
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return "N/A";
  }
}

function formatDateTime(dateString) {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "N/A";
  }
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

console.log("✅ Campaign & Event Handler loaded successfully");
