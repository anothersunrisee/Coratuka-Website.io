// ========================================
// OCEAN CHALLENGE & REWARDS MANAGER HANDLER
// Complete CRUD operations with overlay management
// ========================================

console.log("📦 Loading challenge-handler.js...");

// ========================================
// GLOBAL STATE
// ========================================
let allChallenges = [];
let allRewards = [];
let allSubmissions = [];
let filteredSubmissions = [];
let currentEditingItem = null;
let currentTab = "challenges";

// ========================================
// CATEGORY & DIFFICULTY CONFIGURATIONS
// ========================================
const CATEGORY_COLORS = {
  cleanup: {
    bg: "bg-success",
    text: "text-success",
    hex: "#47b881",
    emoji: "🏖️",
  },
  wildlife: {
    bg: "bg-primary",
    text: "text-primary",
    hex: "#15C5CE",
    emoji: "🐢",
  },
  lifestyle: { bg: "bg-info", text: "text-info", hex: "#3b82f6", emoji: "♻️" },
  education: {
    bg: "bg-warning",
    text: "text-warning",
    hex: "#ffad0d",
    emoji: "📚",
  },
  community: {
    bg: "bg-secondary",
    text: "text-secondary",
    hex: "#FF8156",
    emoji: "💙",
  },
  action: {
    bg: "bg-primary",
    text: "text-primary",
    hex: "#15C5CE",
    emoji: "🪸",
  },
};

const DIFFICULTY_CONFIG = {
  easy: { label: "Mudah", color: "text-success", emoji: "🟢" },
  medium: { label: "Sedang", color: "text-warning", emoji: "🟡" },
  hard: { label: "Sulit", color: "text-danger", emoji: "🔴" },
};

const REWARD_CATEGORIES = {
  merchandise: { label: "Merchandise", emoji: "🎁" },
  "eco-product": { label: "Eco Product", emoji: "🌱" },
  digital: { label: "Digital", emoji: "💻" },
  equipment: { label: "Equipment", emoji: "🧰" },
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎯 DOM Ready - Initializing Challenge Manager...");

  // Check access
  if (!checkConservatorAccess()) {
    console.log("❌ Access denied");
    return;
  }

  // Load conservator info
  loadConservatorInfo();

  // Load all data
  loadAllData();

  // Build form fields
  buildChallengeFormFields();
  buildRewardFormFields();

  // Setup multi-tab sync if available
  if (typeof setupMultiTabSync === "function") {
    setupMultiTabSync(() => loadAllData());
  }

  console.log("✅ Challenge Manager initialized");
});

// ========================================
// ACCESS & USER MANAGEMENT
// ========================================
function checkConservatorAccess() {
  return true; // For development
}

function loadConservatorInfo() {
  const user = getCurrentConservator();
  const nameEl = document.getElementById("conservator-name");
  if (nameEl && user) {
    nameEl.textContent = user.name || "Conservator";
  } else if (nameEl) {
    nameEl.textContent = "Conservator Admin";
  }
}

function getCurrentConservator() {
  return {
    name: "Conservator Admin",
    email: "conservator@coratuka.org",
    role: "conservator",
  };
}

// ========================================
// LOCAL STORAGE UTILITIES
// ========================================
function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
    return null;
  }
}

function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    return false;
  }
}

// ========================================
// LOAD ALL DATA
// ========================================
function loadAllData() {
  console.log("📊 Loading challenge & rewards data...");

  allChallenges = loadFromLocalStorage("oceanChallenges") || [];
  allRewards = loadFromLocalStorage("oceanRewards") || [];
  allSubmissions = loadFromLocalStorage("challengeSubmissions") || [];

  // Initialize if empty
  if (allChallenges.length === 0 || allRewards.length === 0) {
    console.log("⚠️ Data empty, initializing...");
    if (typeof initializeChallengeData === "function") {
      initializeChallengeData();
      allChallenges = loadFromLocalStorage("oceanChallenges") || [];
      allRewards = loadFromLocalStorage("oceanRewards") || [];
      allSubmissions = loadFromLocalStorage("challengeSubmissions") || [];
    }
  }

  console.log(`✅ Loaded ${allChallenges.length} challenges`);
  console.log(`✅ Loaded ${allRewards.length} rewards`);
  console.log(`✅ Loaded ${allSubmissions.length} submissions`);

  updateStatistics();
  renderCurrentTab();
}

// ========================================
// UPDATE STATISTICS
// ========================================
function updateStatistics() {
  const totalEl = document.getElementById("stat-total-challenges");
  const activeEl = document.getElementById("stat-active");
  const pendingEl = document.getElementById("stat-pending");
  const rewardsEl = document.getElementById("stat-rewards");

  if (totalEl) totalEl.textContent = allChallenges.length;

  const activeChallenges = allChallenges.filter(
    (c) => c.status === "active"
  ).length;
  if (activeEl) activeEl.textContent = activeChallenges;

  const pendingSubmissions = allSubmissions.filter(
    (s) => s.status === "submitted"
  ).length;
  if (pendingEl) pendingEl.textContent = pendingSubmissions;

  if (rewardsEl) rewardsEl.textContent = allRewards.length;
}

// ========================================
// TAB SWITCHING
// ========================================
function switchTab(tabName) {
  currentTab = tabName;
  console.log(`🔄 Switching to tab: ${tabName}`);

  ["challenges", "submissions", "rewards"].forEach((tab) => {
    const btn = document.getElementById(`tab-${tab}`);
    const content = document.getElementById(`${tab}-content`);

    if (tab === tabName) {
      btn?.classList.add("active");
      btn?.classList.remove("text-gray-600");
      content?.classList.remove("hidden");
    } else {
      btn?.classList.remove("active");
      btn?.classList.add("text-gray-600");
      content?.classList.add("hidden");
    }
  });

  renderCurrentTab();
}

// ========================================
// RENDER CURRENT TAB
// ========================================
function renderCurrentTab() {
  switch (currentTab) {
    case "challenges":
      renderChallenges();
      break;
    case "submissions":
      applySubmissionFilters();
      break;
    case "rewards":
      renderRewards();
      break;
  }
}

// ========================================
// RENDER CHALLENGES
// ========================================
function renderChallenges() {
  const grid = document.getElementById("challenges-grid");
  if (!grid) {
    console.error("❌ challenges-grid element not found");
    return;
  }

  if (allChallenges.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <span class="text-6xl mb-4 block">🎯</span>
        <p class="text-gray-600 mb-4">Belum ada challenge</p>
        <button
          onclick="openCreateChallengeModal()"
          class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Buat Challenge Pertama
        </button>
      </div>
    `;
    return;
  }

  const html = allChallenges
    .map((challenge) => {
      const categoryColor =
        CATEGORY_COLORS[challenge.category] || CATEGORY_COLORS.cleanup;
      const difficulty =
        DIFFICULTY_CONFIG[challenge.difficulty] || DIFFICULTY_CONFIG.easy;
      const progressPercent = Math.round(
        (challenge.currentParticipants / challenge.maxParticipants) * 100
      );
      const slotsLeft =
        challenge.maxParticipants - challenge.currentParticipants;

      return `
      <div class="bg-white rounded-xl shadow-sm overflow-hidden challenge-card">
        <!-- Image -->
        <div class="relative h-48 overflow-hidden">
          <img
            src="${challenge.image}"
            alt="${challenge.title}"
            class="w-full h-full object-cover"
            onerror="this.src='https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop'"
          />
          <!-- Status Badge -->
          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 rounded-full text-xs font-medium ${
              challenge.status === "active"
                ? "bg-success text-white"
                : "bg-gray-400 text-white"
            }">
              ${challenge.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
          <!-- Category Badge -->
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-white ${
              categoryColor.text
            }">
              ${categoryColor.emoji} ${challenge.categoryLabel}
            </span>
          </div>
          <!-- Difficulty Badge -->
          <div class="absolute bottom-3 left-3">
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-white ${
              difficulty.color
            }">
              ${difficulty.emoji} ${difficulty.label}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5">
          <h3 class="text-lg font-bold text-ink mb-2 line-clamp-1">${
            challenge.title
          }</h3>
          <p class="text-sm text-gray-600 mb-3 line-clamp-2">${
            challenge.description
          }</p>

          <!-- Points & Participants -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="font-bold text-warning">+${
                challenge.points
              } Poin</span>
            </div>
            <div class="text-xs text-gray-500">
              <span class="font-semibold ${
                slotsLeft < 20 ? "text-danger" : ""
              }">${slotsLeft}/${challenge.maxParticipants}</span> tersisa
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-3">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>Participants</span>
              <span>${progressPercent}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="${
                categoryColor.bg
              } h-2 rounded-full" style="width: ${progressPercent}%"></div>
            </div>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="line-clamp-1">${challenge.location}</span>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <button
              onclick="viewChallengeDetail('${challenge.id}')"
              class="flex-1 px-4 py-2 bg-tertiary hover:bg-opacity-80 rounded-lg font-medium transition-all text-sm"
            >
              View Details
            </button>
            <button
              onclick="editChallenge('${challenge.id}')"
              class="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-all"
              title="Edit"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onclick="deleteChallenge('${challenge.id}')"
              class="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Delete"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  grid.innerHTML = html;
  console.log(`✅ Rendered ${allChallenges.length} challenges`);
}

// ========================================
// VIEW CHALLENGE DETAIL (OVERLAY)
// ========================================
function viewChallengeDetail(id) {
  const challenge = allChallenges.find((c) => c.id === id);
  if (!challenge) {
    showNotification("Challenge tidak ditemukan", "error");
    return;
  }

  const categoryColor =
    CATEGORY_COLORS[challenge.category] || CATEGORY_COLORS.cleanup;
  const difficulty =
    DIFFICULTY_CONFIG[challenge.difficulty] || DIFFICULTY_CONFIG.easy;

  const detailContent = `
    <div class="space-y-6">
      <!-- Image -->
      <div class="relative h-64 rounded-xl overflow-hidden">
        <img
          src="${challenge.image}"
          alt="${challenge.title}"
          class="w-full h-full object-cover"
        />
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 rounded-full text-sm font-medium bg-white ${
            categoryColor.text
          }">
            ${categoryColor.emoji} ${challenge.categoryLabel}
          </span>
        </div>
        <div class="absolute top-4 right-4">
          <span class="px-3 py-1 rounded-full text-sm font-medium ${
            challenge.status === "active"
              ? "bg-success text-white"
              : "bg-gray-400 text-white"
          }">
            ${challenge.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <!-- Title & Description -->
      <div>
        <h2 class="text-2xl font-bold text-ink mb-2">${challenge.title}</h2>
        <p class="text-gray-600">${challenge.description}</p>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Points</p>
          <p class="text-2xl font-bold text-warning">+${challenge.points}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Difficulty</p>
          <p class="text-lg font-bold ${difficulty.color}">${
    difficulty.emoji
  } ${difficulty.label}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Duration</p>
          <p class="text-lg font-bold text-ink">${challenge.duration}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Participants</p>
          <p class="text-lg font-bold text-ink">${
            challenge.currentParticipants
          }/${challenge.maxParticipants}</p>
        </div>
      </div>

      <!-- Location -->
      <div class="bg-primary bg-opacity-5 rounded-lg p-4">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 mb-1">Location</p>
            <p class="font-medium text-ink">${challenge.location}</p>
          </div>
        </div>
      </div>

      <!-- Requirements -->
      <div>
        <h3 class="font-bold text-ink mb-3">Requirements</h3>
        <ul class="space-y-2">
          ${challenge.requirements
            .map(
              (req) => `
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-success mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">${req}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p class="text-sm text-gray-600 mb-1">Created</p>
          <p class="text-sm font-medium">${new Date(
            challenge.createdAt
          ).toLocaleDateString("id-ID")}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-1">Expires</p>
          <p class="text-sm font-medium">${new Date(
            challenge.expiresAt
          ).toLocaleDateString("id-ID")}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-4 border-t">
        <button
          onclick="editChallenge('${challenge.id}')"
          class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Edit Challenge
        </button>
        <button
          onclick="deleteChallenge('${challenge.id}')"
          class="px-6 py-3 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  `;

  document.getElementById("detail-title").textContent = "Challenge Details";
  document.getElementById("detail-content").innerHTML = detailContent;
  openDetailPanel();
}

// ========================================
// RENDER SUBMISSIONS
// ========================================
function applySubmissionFilters() {
  const list = document.getElementById("submissions-list");
  if (!list) {
    console.error("❌ submissions-list element not found");
    return;
  }

  const statusFilter =
    document.getElementById("filter-submission-status")?.value || "all";
  const searchQuery =
    document.getElementById("search-submissions")?.value.toLowerCase() || "";

  // Apply filters
  filteredSubmissions = allSubmissions.filter((submission) => {
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;
    const matchesSearch =
      submission.userName.toLowerCase().includes(searchQuery) ||
      submission.challengeTitle.toLowerCase().includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  if (filteredSubmissions.length === 0) {
    list.innerHTML = `
      <div class="text-center py-12">
        <span class="text-6xl mb-4 block">📝</span>
        <p class="text-gray-600">Tidak ada submission</p>
        <p class="text-sm text-gray-500 mt-2">Submission dari user akan muncul di sini</p>
      </div>
    `;
    return;
  }

  const html = filteredSubmissions
    .map((submission) => {
      const challenge = allChallenges.find(
        (c) => c.id === submission.challengeId
      );
      const categoryColor = challenge
        ? CATEGORY_COLORS[challenge.category] || CATEGORY_COLORS.cleanup
        : CATEGORY_COLORS.cleanup;

      let statusBadge = "";
      if (submission.status === "submitted") {
        statusBadge =
          '<span class="px-3 py-1 bg-warning text-white rounded-full text-xs font-medium">⏳ Pending</span>';
      } else if (submission.status === "approved") {
        statusBadge =
          '<span class="px-3 py-1 bg-success text-white rounded-full text-xs font-medium">✅ Approved</span>';
      } else if (submission.status === "rejected") {
        statusBadge =
          '<span class="px-3 py-1 bg-danger text-white rounded-full text-xs font-medium">❌ Rejected</span>';
      }

      return `
      <div class="bg-white rounded-xl p-5 shadow-sm">
        <div class="flex gap-4">
          <!-- Submission Image -->
          <div class="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src="${submission.proofImage}"
              alt="Proof"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Submission Info -->
          <div class="flex-1">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-bold text-ink">${submission.challengeTitle}</h3>
                <p class="text-sm text-gray-600">by ${submission.userName}</p>
              </div>
              ${statusBadge}
            </div>

            <p class="text-sm text-gray-700 mb-3">${
              submission.notes || "No notes provided"
            }</p>

            <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                ${new Date(submission.submittedAt).toLocaleDateString("id-ID")}
              </div>
              <div class="flex items-center gap-1">
                <span class="${categoryColor.text}">${categoryColor.emoji} ${
        challenge?.categoryLabel || "Unknown"
      }</span>
              </div>
            </div>

            <!-- Actions -->
            ${
              submission.status === "submitted"
                ? `
            <div class="flex gap-2">
              <button
                onclick="approveSubmission('${submission.id}')"
                class="px-4 py-2 bg-success text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
              >
                ✅ Approve
              </button>
              <button
                onclick="rejectSubmission('${submission.id}')"
                class="px-4 py-2 bg-danger text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
              >
                ❌ Reject
              </button>
            </div>
            `
                : submission.status === "approved"
                ? `<p class="text-sm text-success">Approved on ${new Date(
                    submission.reviewedAt
                  ).toLocaleDateString("id-ID")}</p>`
                : `<p class="text-sm text-danger">Rejected: ${
                    submission.rejectionReason || "No reason provided"
                  }</p>`
            }
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  list.innerHTML = html;
  console.log(`✅ Rendered ${filteredSubmissions.length} submissions`);
}

// ========================================
// APPROVE/REJECT SUBMISSIONS
// ========================================
function approveSubmission(id) {
  const submission = allSubmissions.find((s) => s.id === id);
  if (!submission) return;

  submission.status = "approved";
  submission.reviewedAt = new Date().toISOString();
  submission.reviewedBy = getCurrentConservator().name;

  // Award points to user
  const challenge = allChallenges.find((c) => c.id === submission.challengeId);
  if (challenge) {
    const userProfile = loadFromLocalStorage("userProfile") || {
      totalPoints: 0,
      completedChallenges: 0,
    };
    userProfile.totalPoints += challenge.points;
    userProfile.completedChallenges += 1;
    saveToLocalStorage("userProfile", userProfile);
  }

  saveToLocalStorage("challengeSubmissions", allSubmissions);
  showNotification("Submission approved! User points updated.", "success");
  loadAllData();
}

function rejectSubmission(id) {
  const reason = prompt("Reason for rejection (optional):");
  const submission = allSubmissions.find((s) => s.id === id);
  if (!submission) return;

  submission.status = "rejected";
  submission.reviewedAt = new Date().toISOString();
  submission.reviewedBy = getCurrentConservator().name;
  submission.rejectionReason = reason || "Did not meet requirements";

  saveToLocalStorage("challengeSubmissions", allSubmissions);
  showNotification("Submission rejected", "success");
  loadAllData();
}

// ========================================
// RENDER REWARDS
// ========================================
function renderRewards() {
  const grid = document.getElementById("rewards-grid");
  if (!grid) {
    console.error("❌ rewards-grid element not found");
    return;
  }

  if (allRewards.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <span class="text-6xl mb-4 block">🎁</span>
        <p class="text-gray-600 mb-4">Belum ada reward</p>
        <button
          onclick="openCreateRewardModal()"
          class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Buat Reward Pertama
        </button>
      </div>
    `;
    return;
  }

  const html = allRewards
    .map((reward) => {
      const category =
        REWARD_CATEGORIES[reward.category] || REWARD_CATEGORIES.merchandise;
      const stockPercent = Math.round(
        ((reward.stock - reward.claimed) / reward.stock) * 100
      );
      const isLowStock = stockPercent < 20;

      return `
      <div class="bg-white rounded-xl shadow-sm overflow-hidden reward-card">
        <!-- Image -->
        <div class="relative h-48 overflow-hidden bg-gray-100">
          <img
            src="${reward.image}"
            alt="${reward.title}"
            class="w-full h-full object-cover"
            onerror="this.src='https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=400&fit=crop'"
          />
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 bg-white rounded-full text-xs font-medium text-ink">
              ${category.emoji} ${category.label}
            </span>
          </div>
          ${
            isLowStock
              ? `
          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 bg-danger text-white rounded-full text-xs font-medium">
              ⚠️ Low Stock
            </span>
          </div>
          `
              : ""
          }
        </div>

        <!-- Content -->
        <div class="p-5">
          <h3 class="text-lg font-bold text-ink mb-2 line-clamp-1">${
            reward.title
          }</h3>
          <p class="text-sm text-gray-600 mb-3 line-clamp-2">${
            reward.description
          }</p>

          <!-- Points -->
          <div class="flex items-center gap-2 mb-3">
            <svg class="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="font-bold text-warning">${
              reward.pointsCost
            } Poin</span>
          </div>

          <!-- Stock -->
          <div class="mb-4">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>Stock</span>
              <span>${reward.stock - reward.claimed}/${
        reward.stock
      } tersisa</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="${
                isLowStock ? "bg-danger" : "bg-success"
              } h-2 rounded-full" style="width: ${stockPercent}%"></div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <button
              onclick="viewRewardDetail('${reward.id}')"
              class="flex-1 px-4 py-2 bg-tertiary hover:bg-opacity-80 rounded-lg font-medium transition-all text-sm"
            >
              View Details
            </button>
            <button
              onclick="editReward('${reward.id}')"
              class="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-all"
              title="Edit"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onclick="deleteReward('${reward.id}')"
              class="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Delete"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  grid.innerHTML = html;
  console.log(`✅ Rendered ${allRewards.length} rewards`);
}

// ========================================
// VIEW REWARD DETAIL
// ========================================
function viewRewardDetail(id) {
  const reward = allRewards.find((r) => r.id === id);
  if (!reward) {
    showNotification("Reward tidak ditemukan", "error");
    return;
  }

  const category =
    REWARD_CATEGORIES[reward.category] || REWARD_CATEGORIES.merchandise;

  const detailContent = `
    <div class="space-y-6">
      <!-- Image -->
      <div class="relative h-64 rounded-xl overflow-hidden bg-gray-100">
        <img
          src="${reward.image}"
          alt="${reward.title}"
          class="w-full h-full object-cover"
        />
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 bg-white rounded-full text-sm font-medium text-ink">
            ${category.emoji} ${category.label}
          </span>
        </div>
      </div>

      <!-- Title & Description -->
      <div>
        <h2 class="text-2xl font-bold text-ink mb-2">${reward.title}</h2>
        <p class="text-gray-600">${reward.description}</p>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Points Cost</p>
          <p class="text-2xl font-bold text-warning">${reward.pointsCost}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Stock</p>
          <p class="text-2xl font-bold text-ink">${
            reward.stock - reward.claimed
          }/${reward.stock}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Claimed</p>
          <p class="text-2xl font-bold text-primary">${reward.claimed}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-600 mb-1">Availability</p>
          <p class="text-lg font-bold ${
            reward.isAvailable ? "text-success" : "text-danger"
          }">
            ${reward.isAvailable ? "✅ Available" : "❌ Unavailable"}
          </p>
        </div>
      </div>

      <!-- Features -->
      <div>
        <h3 class="font-bold text-ink mb-3">Features</h3>
        <ul class="space-y-2">
          ${reward.features
            .map(
              (feature) => `
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-success mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">${feature}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>

      <!-- Dates -->
      ${
        reward.expiryDate
          ? `
      <div class="bg-warning bg-opacity-10 rounded-lg p-4">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-warning mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-sm text-gray-600 mb-1">Expires On</p>
            <p class="font-medium text-ink">${new Date(
              reward.expiryDate
            ).toLocaleDateString("id-ID")}</p>
          </div>
        </div>
      </div>
      `
          : ""
      }

      <!-- Actions -->
      <div class="flex gap-3 pt-4 border-t">
        <button
          onclick="editReward('${reward.id}')"
          class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Edit Reward
        </button>
        <button
          onclick="deleteReward('${reward.id}')"
          class="px-6 py-3 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  `;

  document.getElementById("detail-title").textContent = "Reward Details";
  document.getElementById("detail-content").innerHTML = detailContent;
  openDetailPanel();
}

// ========================================
// DETAIL PANEL MANAGEMENT
// ========================================
function openDetailPanel() {
  document.getElementById("detail-overlay").classList.add("active");
  document.getElementById("detail-panel").classList.add("active");
}

function closeDetailPanel() {
  document.getElementById("detail-overlay").classList.remove("active");
  document.getElementById("detail-panel").classList.remove("active");
}

// ========================================
// BUILD CHALLENGE FORM FIELDS
// ========================================
function buildChallengeFormFields() {
  const container = document.getElementById("challenge-form-fields");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Challenge Title *</label>
        <input
          type="text"
          id="challenge-title"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g. Bersihkan Pantai 15 Menit"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          id="challenge-description"
          required
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe the challenge..."
        ></textarea>
      </div>

      <!-- Category & Difficulty -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            id="challenge-category"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="cleanup">🏖️ Cleanup</option>
            <option value="wildlife">🐢 Wildlife</option>
            <option value="lifestyle">♻️ Lifestyle</option>
            <option value="education">📚 Education</option>
            <option value="community">💙 Community</option>
            <option value="action">🪸 Action</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
          <select
            id="challenge-difficulty"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="easy">🟢 Mudah</option>
            <option value="medium">🟡 Sedang</option>
            <option value="hard">🔴 Sulit</option>
          </select>
        </div>
      </div>

      <!-- Points & Duration -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Points *</label>
          <input
            type="number"
            id="challenge-points"
            required
            min="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="50"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
          <input
            type="text"
            id="challenge-duration"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 15 menit"
          />
        </div>
      </div>

      <!-- Max Participants & Location -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Max Participants *</label>
          <input
            type="number"
            id="challenge-max-participants"
            required
            min="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="100"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            id="challenge-location"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Pantai Parangtritis"
          />
        </div>
      </div>

      <!-- Image URL -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
        <input
          type="url"
          id="challenge-image"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <!-- Requirements -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
        <textarea
          id="challenge-requirements"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter each requirement on a new line"
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">One requirement per line</p>
      </div>

      <!-- Expires At -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
        <input
          type="date"
          id="challenge-expires"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          id="challenge-status"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  `;
}

// ========================================
// BUILD REWARD FORM FIELDS
// ========================================
function buildRewardFormFields() {
  const container = document.getElementById("reward-form-fields");
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Reward Title *</label>
        <input
          type="text"
          id="reward-title"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g. Eco Tote Bag CORATUKA"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          id="reward-description"
          required
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe the reward..."
        ></textarea>
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
        <select
          id="reward-category"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="merchandise">🎁 Merchandise</option>
          <option value="eco-product">🌱 Eco Product</option>
          <option value="digital">💻 Digital</option>
          <option value="equipment">🧰 Equipment</option>
        </select>
      </div>

      <!-- Points Cost & Stock -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Points Cost *</label>
          <input
            type="number"
            id="reward-points"
            required
            min="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
          <input
            type="number"
            id="reward-stock"
            required
            min="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="50"
          />
        </div>
      </div>

      <!-- Image URL -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
        <input
          type="url"
          id="reward-image"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="/test/img/rewards/tote-bag.jpg"
        />
      </div>

      <!-- Features -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Features</label>
        <textarea
          id="reward-features"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter each feature on a new line"
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">One feature per line</p>
      </div>

      <!-- Expiry Date (Optional) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
        <input
          type="date"
          id="reward-expires"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Availability -->
      <div>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            id="reward-available"
            checked
            class="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
          />
          <span class="text-sm font-medium text-gray-700">Available for redemption</span>
        </label>
      </div>
    </div>
  `;
}

// ========================================
// OPEN CREATE/EDIT CHALLENGE MODAL
// ========================================
function openCreateChallengeModal() {
  currentEditingItem = null;
  document.getElementById("challenge-modal-title").textContent =
    "Create Challenge";
  document.getElementById("challenge-form").reset();

  // Set default expiry date (30 days from now)
  const expiryInput = document.getElementById("challenge-expires");
  if (expiryInput) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    expiryInput.value = futureDate.toISOString().split("T")[0];
  }

  document.getElementById("challenge-modal").classList.add("active");
}

function editChallenge(id) {
  const challenge = allChallenges.find((c) => c.id === id);
  if (!challenge) {
    showNotification("Challenge tidak ditemukan", "error");
    return;
  }

  currentEditingItem = challenge;
  document.getElementById("challenge-modal-title").textContent =
    "Edit Challenge";

  // Fill form with challenge data
  document.getElementById("challenge-id").value = challenge.id;
  document.getElementById("challenge-title").value = challenge.title;
  document.getElementById("challenge-description").value =
    challenge.description;
  document.getElementById("challenge-category").value = challenge.category;
  document.getElementById("challenge-difficulty").value = challenge.difficulty;
  document.getElementById("challenge-points").value = challenge.points;
  document.getElementById("challenge-duration").value = challenge.duration;
  document.getElementById("challenge-max-participants").value =
    challenge.maxParticipants;
  document.getElementById("challenge-location").value = challenge.location;
  document.getElementById("challenge-image").value = challenge.image;
  document.getElementById("challenge-requirements").value =
    challenge.requirements.join("\n");
  document.getElementById("challenge-expires").value =
    challenge.expiresAt.split("T")[0];
  document.getElementById("challenge-status").value = challenge.status;

  document.getElementById("challenge-modal").classList.add("active");
  closeDetailPanel();
}

function closeChallengeModal() {
  document.getElementById("challenge-modal").classList.remove("active");
  currentEditingItem = null;
}

// ========================================
// SAVE CHALLENGE
// ========================================
function saveChallenge(event) {
  event.preventDefault();

  const formData = {
    title: document.getElementById("challenge-title").value,
    description: document.getElementById("challenge-description").value,
    category: document.getElementById("challenge-category").value,
    difficulty: document.getElementById("challenge-difficulty").value,
    points: parseInt(document.getElementById("challenge-points").value),
    duration: document.getElementById("challenge-duration").value,
    maxParticipants: parseInt(
      document.getElementById("challenge-max-participants").value
    ),
    location: document.getElementById("challenge-location").value,
    image: document.getElementById("challenge-image").value,
    expiresAt: new Date(
      document.getElementById("challenge-expires").value
    ).toISOString(),
    status: document.getElementById("challenge-status").value,
    requirements: document
      .getElementById("challenge-requirements")
      .value.split("\n")
      .filter((r) => r.trim()),
  };

  // Add category label and color
  const categoryConfig = {
    cleanup: { label: "🏖️ Cleanup", color: "success" },
    wildlife: { label: "🐢 Wildlife", color: "primary" },
    lifestyle: { label: "♻️ Lifestyle", color: "info" },
    education: { label: "📚 Education", color: "warning" },
    community: { label: "💙 Community", color: "secondary" },
    action: { label: "🪸 Action", color: "primary" },
  };

  formData.categoryLabel = categoryConfig[formData.category].label;
  formData.categoryColor = categoryConfig[formData.category].color;

  if (currentEditingItem) {
    // Edit existing challenge
    const index = allChallenges.findIndex(
      (c) => c.id === currentEditingItem.id
    );
    if (index !== -1) {
      allChallenges[index] = {
        ...currentEditingItem,
        ...formData,
      };
      showNotification("Challenge updated successfully!", "success");
    }
  } else {
    // Create new challenge
    const newChallenge = {
      id: `ch-${Date.now()}`,
      ...formData,
      currentParticipants: 0,
      createdAt: new Date().toISOString(),
    };
    allChallenges.push(newChallenge);
    showNotification("Challenge created successfully!", "success");
  }

  saveToLocalStorage("oceanChallenges", allChallenges);
  closeChallengeModal();
  loadAllData();
}

// ========================================
// DELETE CHALLENGE
// ========================================
function deleteChallenge(id) {
  if (!confirm("Are you sure you want to delete this challenge?")) return;

  allChallenges = allChallenges.filter((c) => c.id !== id);
  saveToLocalStorage("oceanChallenges", allChallenges);
  showNotification("Challenge deleted successfully!", "success");
  closeDetailPanel();
  loadAllData();
}

// ========================================
// OPEN CREATE/EDIT REWARD MODAL
// ========================================
function openCreateRewardModal() {
  currentEditingItem = null;
  document.getElementById("reward-modal-title").textContent = "Create Reward";
  document.getElementById("reward-form").reset();
  document.getElementById("reward-available").checked = true;
  document.getElementById("reward-modal").classList.add("active");
}

function editReward(id) {
  const reward = allRewards.find((r) => r.id === id);
  if (!reward) {
    showNotification("Reward tidak ditemukan", "error");
    return;
  }

  currentEditingItem = reward;
  document.getElementById("reward-modal-title").textContent = "Edit Reward";

  // Fill form with reward data
  document.getElementById("reward-id").value = reward.id;
  document.getElementById("reward-title").value = reward.title;
  document.getElementById("reward-description").value = reward.description;
  document.getElementById("reward-category").value = reward.category;
  document.getElementById("reward-points").value = reward.pointsCost;
  document.getElementById("reward-stock").value = reward.stock;
  document.getElementById("reward-image").value = reward.image;
  document.getElementById("reward-features").value = reward.features.join("\n");
  if (reward.expiryDate) {
    document.getElementById("reward-expires").value =
      reward.expiryDate.split("T")[0];
  }
  document.getElementById("reward-available").checked = reward.isAvailable;

  document.getElementById("reward-modal").classList.add("active");
  closeDetailPanel();
}

function closeRewardModal() {
  document.getElementById("reward-modal").classList.remove("active");
  currentEditingItem = null;
}

// ========================================
// SAVE REWARD
// ========================================
function saveReward(event) {
  event.preventDefault();

  const formData = {
    title: document.getElementById("reward-title").value,
    description: document.getElementById("reward-description").value,
    category: document.getElementById("reward-category").value,
    pointsCost: parseInt(document.getElementById("reward-points").value),
    stock: parseInt(document.getElementById("reward-stock").value),
    image: document.getElementById("reward-image").value,
    isAvailable: document.getElementById("reward-available").checked,
    features: document
      .getElementById("reward-features")
      .value.split("\n")
      .filter((f) => f.trim()),
  };

  const expiryDate = document.getElementById("reward-expires").value;
  if (expiryDate) {
    formData.expiryDate = new Date(expiryDate).toISOString();
  } else {
    formData.expiryDate = null;
  }

  // Add category label
  const categoryConfig = {
    merchandise: "🎁 Merchandise",
    "eco-product": "🌱 Eco Product",
    digital: "💻 Digital",
    equipment: "🧰 Equipment",
  };
  formData.categoryLabel = categoryConfig[formData.category];

  // Get badge emoji
  const badgeConfig = {
    merchandise: "👜",
    "eco-product": "🥤",
    digital: "📖",
    equipment: "🧤",
  };
  formData.badge = badgeConfig[formData.category];

  if (currentEditingItem) {
    // Edit existing reward
    const index = allRewards.findIndex((r) => r.id === currentEditingItem.id);
    if (index !== -1) {
      allRewards[index] = {
        ...currentEditingItem,
        ...formData,
      };
      showNotification("Reward updated successfully!", "success");
    }
  } else {
    // Create new reward
    const newReward = {
      id: `rw-${Date.now()}`,
      ...formData,
      claimed: 0,
      createdAt: new Date().toISOString(),
    };
    allRewards.push(newReward);
    showNotification("Reward created successfully!", "success");
  }

  saveToLocalStorage("oceanRewards", allRewards);
  closeRewardModal();
  loadAllData();
}

// ========================================
// DELETE REWARD
// ========================================
function deleteReward(id) {
  if (!confirm("Are you sure you want to delete this reward?")) return;

  allRewards = allRewards.filter((r) => r.id !== id);
  saveToLocalStorage("oceanRewards", allRewards);
  showNotification("Reward deleted successfully!", "success");
  closeDetailPanel();
  loadAllData();
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = "info") {
  console.log(`[${type.toUpperCase()}] ${message}`);

  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all ${
    type === "success"
      ? "bg-success text-white"
      : type === "error"
      ? "bg-danger text-white"
      : "bg-primary text-white"
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// NAVIGATION
// ========================================
function goBackToDashboard() {
  window.history.back();
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "../index.html";
  }
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
window.switchTab = switchTab;
window.openCreateChallengeModal = openCreateChallengeModal;
window.editChallenge = editChallenge;
window.deleteChallenge = deleteChallenge;
window.viewChallengeDetail = viewChallengeDetail;
window.closeChallengeModal = closeChallengeModal;
window.saveChallenge = saveChallenge;
window.openCreateRewardModal = openCreateRewardModal;
window.editReward = editReward;
window.deleteReward = deleteReward;
window.viewRewardDetail = viewRewardDetail;
window.closeRewardModal = closeRewardModal;
window.saveReward = saveReward;
window.applySubmissionFilters = applySubmissionFilters;
window.approveSubmission = approveSubmission;
window.rejectSubmission = rejectSubmission;
window.openDetailPanel = openDetailPanel;
window.closeDetailPanel = closeDetailPanel;
window.goBackToDashboard = goBackToDashboard;
window.logout = logout;

console.log("✅ Ocean Challenge Manager Handler loaded");
