// ========================================
// CORATUKA MANAGER CORE UTILITIES
// Shared functions for all manager modules
// ========================================

// ========================================
// DEVELOPMENT MODE CONFIGURATION
// ========================================
const DEV_MODE = {
  enabled: true, // 🔧 Set to false for production
  autoBypass: true, // Auto-bypass auth check on localhost
  mockUser: {
    id: "dev-conservator-001",
    name: "Dev Conservator",
    email: "dev@coratuka.org",
    role: "conservator",
    phone: "+62812-3456-7890",
    createdAt: new Date().toISOString(),
  },
};

/**
 * Check if running in development environment
 * @returns {boolean}
 */
function isDevelopmentEnvironment() {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "" ||
    hostname === "[::1]" ||
    protocol === "file:"
  );
}

/**
 * Development mode logger
 */
function devLog(message, data = null) {
  if (DEV_MODE.enabled && isDevelopmentEnvironment()) {
    console.log(
      `%c[DEV] ${message}`,
      "background: #15C5CE; color: white; padding: 2px 6px; border-radius: 3px;",
      data || ""
    );
  }
}

// ========================================
// 1. AUTHENTICATION & ACCESS CONTROL (DEV-FRIENDLY)
// ========================================

/**
 * Check if current user has conservator access
 * 🔧 AUTO-BYPASSES authentication when running on localhost
 * @returns {boolean} - true if authorized, false if not
 */
function checkConservatorAccess() {
  // 🔧 DEVELOPMENT MODE: Auto-bypass on localhost
  if (DEV_MODE.enabled && DEV_MODE.autoBypass && isDevelopmentEnvironment()) {
    devLog("🔓 Development mode - Auto-bypassing authentication");

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user || user.role !== "conservator") {
      devLog("👤 Creating mock conservator user");
      localStorage.setItem("loggedInUser", JSON.stringify(DEV_MODE.mockUser));
      user = DEV_MODE.mockUser;
    }

    devLog("✅ Access granted (DEV MODE)", user);
    return true;
  }

  // PRODUCTION MODE: Normal authentication
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    alert("❌ Please login first to access Manager Dashboard.");
    window.location.href = "../../index.html";
    return false;
  }

  if (user.role !== "conservator") {
    alert(
      "❌ Access Denied.\n\nOnly conservators can access this page.\n\nPlease contact administrator to upgrade your account."
    );
    window.location.href = "../../index.html";
    return false;
  }

  return true;
}

/**
 * Get current logged-in conservator info
 * @returns {Object} - user object
 */
function getCurrentConservator() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

/**
 * Get conservator name for display
 * @returns {string} - conservator name
 */
function getCurrentConservatorName() {
  const user = getCurrentConservator();
  return user ? user.name : "Conservator";
}

/**
 * Logout function - clear session and redirect
 */
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("loggedInUser");
    showNotification("Logged out successfully", "success");
    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 500);
  }
}

// ========================================
// 2. NAVIGATION HELPERS
// ========================================

/**
 * Navigate to a specific module
 * @param {string} module - Module name (emergency, classroom, etc)
 * @param {string} query - Optional query string
 */
function navigateToModule(module, query = "") {
  window.location.href = `modules/${module}-manager.html${query}`;
}

/**
 * Go back to dashboard hub
 */
function goBackToDashboard() {
  window.location.href = "../dashboard-manager.html";
}

/**
 * Go back in browser history
 */
function goBack() {
  window.history.back();
}

// ========================================
// 3. LOCALSTORAGE HELPERS
// ========================================

/**
 * Load data from localStorage
 * @param {string} key - localStorage key
 * @returns {Array|Object} - Parsed data or empty array
 */
function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return [];
  }
}

/**
 * Save data to localStorage
 * @param {string} key - localStorage key
 * @param {*} data - Data to save
 */
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Trigger storage event for multi-tab sync
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    showNotification("Failed to save data. Storage might be full.", "error");
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - localStorage key
 */
function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event("storage"));
}

/**
 * Clear all manager data (use with caution!)
 */
function clearAllManagerData() {
  if (
    confirm(
      "⚠️ WARNING: This will delete ALL manager data!\n\nThis action cannot be undone. Are you absolutely sure?"
    )
  ) {
    const keysToKeep = ["loggedInUser"]; // Keep user session
    const allKeys = Object.keys(localStorage);

    allKeys.forEach((key) => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    showNotification("All manager data cleared", "success");
    setTimeout(() => location.reload(), 1000);
  }
}

// ========================================
// 4. DATE & TIME UTILITIES
// ========================================

/**
 * Format ISO timestamp to readable format
 * @param {string} isoString - ISO format timestamp
 * @returns {string} - Formatted date string
 */
function formatTimestamp(isoString) {
  if (!isoString) return "-";

  try {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString("id-ID", options).replace(",", " •");
  } catch (error) {
    return isoString;
  }
}

/**
 * Format date only (no time)
 * @param {string} isoString - ISO format timestamp
 * @returns {string} - Formatted date string
 */
function formatDate(isoString) {
  if (!isoString) return "-";

  try {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("id-ID", options);
  } catch (error) {
    return isoString;
  }
}

/**
 * Calculate time ago from timestamp
 * @param {string} timestamp - ISO format timestamp
 * @returns {string} - Time ago string (e.g., "2 hours ago")
 */
function timeAgo(timestamp) {
  if (!timestamp) return "Unknown";

  try {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    return formatDate(timestamp);
  } catch (error) {
    return "Unknown";
  }
}

/**
 * Check if date is in the future
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {boolean}
 */
function isUpcoming(dateString) {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

/**
 * Check if date is in the past
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {boolean}
 */
function isPast(dateString) {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

// ========================================
// 5. DATA MANIPULATION HELPERS
// ========================================

/**
 * Generate unique ID
 * @param {string} prefix - ID prefix (e.g., 'ER', 'CLASS', 'CHLG')
 * @returns {string} - Generated ID
 */
function generateId(prefix = "ID") {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generate emergency report ID
 * @returns {string} - ID in format ER-YYYYMMDD-XXX
 */
function generateEmergencyReportId() {
  const date = new Date();
  const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
  const reports = loadFromLocalStorage("emergencyReports");
  const todayReports = reports.filter((r) => r.id && r.id.includes(dateStr));
  const nextNum = (todayReports.length + 1).toString().padStart(3, "0");
  return `ER-${dateStr}-${nextNum}`;
}

/**
 * Sort array by property
 * @param {Array} array - Array to sort
 * @param {string} property - Property to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} - Sorted array
 */
function sortBy(array, property, order = "desc") {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];

    if (order === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
}

/**
 * Filter array by multiple conditions
 * @param {Array} array - Array to filter
 * @param {Object} filters - Filter conditions
 * @returns {Array} - Filtered array
 */
function filterBy(array, filters) {
  return array.filter((item) => {
    for (let key in filters) {
      if (
        filters[key] !== null &&
        filters[key] !== "" &&
        filters[key] !== "all"
      ) {
        if (item[key] !== filters[key]) {
          return false;
        }
      }
    }
    return true;
  });
}

// ========================================
// 6. EXPORT UTILITIES
// ========================================

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of objects
 * @returns {string} - CSV string
 */
function convertArrayToCSV(data) {
  if (!data || data.length === 0) return "";

  // Get headers
  const headers = Object.keys(data[0]);
  const headerRow = headers.join(",");

  // Get rows
  const rows = data.map((obj) => {
    return headers
      .map((header) => {
        let value = obj[header];
        // Handle null/undefined
        if (value === null || value === undefined) value = "";
        // Escape quotes and wrap in quotes if contains comma/newline
        value = String(value).replace(/"/g, '""');
        if (
          value.includes(",") ||
          value.includes("\n") ||
          value.includes('"')
        ) {
          value = `"${value}"`;
        }
        return value;
      })
      .join(",");
  });

  return [headerRow, ...rows].join("\n");
}

/**
 * Download CSV file
 * @param {string} csv - CSV string
 * @param {string} filename - Filename (without .csv)
 */
function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showNotification(`File ${filename}.csv downloaded successfully`, "success");
}

/**
 * Export data to CSV
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Filename (without .csv)
 */
function exportToCSV(data, filename) {
  if (!data || data.length === 0) {
    showNotification("No data to export", "warning");
    return;
  }

  const csv = convertArrayToCSV(data);
  downloadCSV(csv, filename);
}

// ========================================
// 7. NOTIFICATION SYSTEM
// ========================================

/**
 * Show toast notification
 * @param {string} message - Notification message
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {number} duration - Duration in ms (default 3000)
 */
function showNotification(message, type = "success", duration = 3000) {
  // Remove existing notification
  const existing = document.getElementById("toast-notification");
  if (existing) existing.remove();

  // Create notification element
  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.className = `fixed top-4 right-4 z-[9999] px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 max-w-sm`;

  // Set color based on type
  const colors = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };
  toast.className += ` ${colors[type] || colors.info}`;

  // Add icon based on type
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-2xl">${icons[type] || icons.info}</span>
      <p class="font-medium">${message}</p>
    </div>
  `;

  document.body.appendChild(toast);

  // Slide in animation
  setTimeout(() => {
    toast.style.transform = "translateX(0)";
  }, 10);

  // Auto remove after duration
  setTimeout(() => {
    toast.style.transform = "translateX(400px)";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ========================================
// 8. IMAGE HANDLING
// ========================================

/**
 * Convert file to base64
 * @param {File} file - File object
 * @returns {Promise<string>} - Base64 string
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Compress and convert image to base64
 * @param {File} file - Image file
 * @param {number} maxWidth - Max width in pixels
 * @param {number} quality - Quality 0-1
 * @returns {Promise<string>} - Compressed base64 string
 */
function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const base64 = canvas.toDataURL("image/jpeg", quality);
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ========================================
// 9. FORM VALIDATION HELPERS
// ========================================

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number (Indonesian format)
 * @param {string} phone - Phone number
 * @returns {boolean}
 */
function isValidPhone(phone) {
  const regex = /^(\+62|62|0)[0-9]{9,12}$/;
  return regex.test(phone.replace(/\s|-/g, ""));
}

/**
 * Validate required fields in form
 * @param {Object} data - Form data object
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - {valid: boolean, errors: Array}
 */
function validateForm(data, requiredFields) {
  const errors = [];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].toString().trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}

// ========================================
// 10. SEARCH & FILTER HELPERS
// ========================================

/**
 * Search array by query string (searches all string properties)
 * @param {Array} array - Array to search
 * @param {string} query - Search query
 * @returns {Array} - Filtered array
 */
function searchArray(array, query) {
  if (!query || query.trim() === "") return array;

  const lowerQuery = query.toLowerCase();

  return array.filter((item) => {
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerQuery);
      }
      return false;
    });
  });
}

// ========================================
// 11. MULTI-TAB SYNC
// ========================================

/**
 * Setup multi-tab synchronization listener
 * Call this in each manager module to enable real-time sync
 */
function setupMultiTabSync(reloadCallback) {
  window.addEventListener("storage", (e) => {
    // Check if changed key is manager-related
    const managerKeys = [
      "emergencyReports",
      "oceanClassrooms",
      "oceanChallenges",
      "oceanRewards",
      "campaignEvents",
      "beachQRContent",
    ];

    if (managerKeys.includes(e.key)) {
      console.log(`Storage updated: ${e.key}. Reloading...`);
      if (typeof reloadCallback === "function") {
        reloadCallback();
      } else {
        location.reload();
      }
    }
  });
}

// ========================================
// 12. DEBUGGING HELPERS
// ========================================

/**
 * Console log with timestamp (for debugging)
 * @param {string} message - Log message
 * @param {*} data - Optional data to log
 */
function debugLog(message, data = null) {
  if (localStorage.getItem("debugMode") === "true") {
    console.log(`[${new Date().toISOString()}] ${message}`, data || "");
  }
}

/**
 * Toggle debug mode
 */
function toggleDebugMode() {
  const current = localStorage.getItem("debugMode") === "true";
  localStorage.setItem("debugMode", !current);
  console.log(`Debug mode: ${!current ? "ON" : "OFF"}`);
}

// ========================================
// 13. DEVELOPMENT MODE HELPERS
// ========================================

/**
 * Generate sample emergency reports (DEV ONLY)
 * @param {number} count - Number of reports to generate
 */
function generateSampleReports(count = 10) {
  if (!isDevelopmentEnvironment()) {
    console.warn("⚠️ This function only works in development");
    return;
  }

  const animalTypes = ["sea-turtle", "dolphin", "shark", "manta-ray", "whale"];
  const conditions = ["stranded", "injured", "entangled", "sick", "dead"];
  const locations = [
    { address: "Pantai Marina, Semarang", lat: -6.9932, lng: 110.4203 },
    { address: "Pantai Maron, Semarang", lat: -6.9845, lng: 110.4156 },
    { address: "Pantai Tirang, Semarang", lat: -6.9956, lng: 110.4289 },
  ];

  const reports = [];
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    );
    reports.push({
      id: generateId("ER"),
      timestamp: timestamp.toISOString(),
      reporterName: `Test User ${i + 1}`,
      reporterPhone: `0812345678${String(i).padStart(2, "0")}`,
      reporterEmail: `test${i + 1}@example.com`,
      location: locations[Math.floor(Math.random() * locations.length)],
      animalType: animalTypes[Math.floor(Math.random() * animalTypes.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      description: `Sample emergency report ${i + 1}. This is test data.`,
      photos: [],
      status: ["pending", "in-progress", "resolved"][
        Math.floor(Math.random() * 3)
      ],
      priority: ["urgent", "high", "medium", "low"][
        Math.floor(Math.random() * 4)
      ],
    });
  }

  saveToLocalStorage("emergencyReports", reports);
  devLog(`✅ Generated ${count} sample reports`);
  showNotification(`Generated ${count} sample reports`, "success");
}

/**
 * Clear all manager data (DEV ONLY)
 */
function devClearAllData() {
  if (!isDevelopmentEnvironment()) {
    console.warn("⚠️ This function only works in development");
    return;
  }

  if (confirm("⚠️ This will clear ALL localStorage data. Continue?")) {
    localStorage.clear();
    devLog("🗑️ All data cleared");
    showNotification("All data cleared", "info");
    location.reload();
  }
}

/**
 * Show development helper panel (DEV ONLY)
 */
function showDevPanel() {
  if (!isDevelopmentEnvironment() || document.getElementById("dev-panel"))
    return;

  const panel = document.createElement("div");
  panel.id = "dev-panel";
  panel.innerHTML = `
    <div style="position: fixed; bottom: 20px; right: 20px; background: #15C5CE; color: white; padding: 12px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 10000; font-family: Inter, sans-serif; font-size: 12px; min-width: 200px;">
      <div style="font-weight: bold; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
        <span>🔧 DEV MODE</span>
        <button onclick="document.getElementById('dev-panel').remove()" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 18px; line-height: 1;">×</button>
      </div>
      <button onclick="generateSampleReports(10)" style="display: block; width: 100%; padding: 6px; margin: 4px 0; background: white; color: #15C5CE; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600;">
        Generate Sample Reports
      </button>
      <button onclick="devClearAllData()" style="display: block; width: 100%; padding: 6px; margin: 4px 0; background: #EF4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600;">
        Clear All Data
      </button>
      <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 10px; color: rgba(255,255,255,0.8);">
        <div>User: ${DEV_MODE.mockUser.name}</div>
        <div>Role: conservator</div>
      </div>
    </div>
  `;
  document.body.appendChild(panel);
}

// ========================================
// INITIALIZATION MESSAGE
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  if (DEV_MODE.enabled && isDevelopmentEnvironment()) {
    console.log(
      "%c💡 DEV MODE ACTIVE",
      "background: #15C5CE; color: white; padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: bold;"
    );
    console.log(
      "%cPress Ctrl+Shift+D to open dev panel",
      "color: #15C5CE; font-size: 12px;"
    );

    // Keyboard shortcut: Ctrl+Shift+D
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        showDevPanel();
      }
    });
  }
});

console.log("✅ CORATUKA Manager Core loaded successfully");
if (isDevelopmentEnvironment()) {
  console.log(
    "💡 Dev helpers: generateSampleReports(n), devClearAllData(), showDevPanel()"
  );
}
