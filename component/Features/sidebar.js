/**
 * CoraTuka Sidebar Component
 * Reusable sidebar with dynamic loading and navigation
 */

// Flag to prevent multiple initializations
let sidebarInitialized = false;

// ========================================
// Load Sidebar Component
// ========================================
async function loadSidebar() {
  if (sidebarInitialized) return;

  try {
    const res = await fetch("../Features/sidebar.html");
    const html = await res.text();

    document.body.insertAdjacentHTML("beforeend", html);

    await new Promise((r) => setTimeout(r, 10)); // ✅ ensure DOM built first
    initSidebar();

    sidebarInitialized = true;
    console.log("Sidebar loaded completely ✅");
  } catch (err) {
    console.error("Failed loading sidebar:", err);
  }
}

// ========================================
// Initialize Sidebar
// ========================================
function initSidebar() {
  console.log("Initializing sidebar...");

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    // Set active navigation based on current page
    setActiveNav();

    // Load user data
    loadUserData();

    // Set up event listeners (only once)
    setupSidebarEvents();

    console.log("Sidebar initialized successfully");
  }, 100);
}

// ========================================
// Set Active Navigation
// ========================================
function setActiveNav() {
  const currentPage =
    window.location.pathname.split("/").pop().replace(".html", "") || "index";

  console.log("Current page:", currentPage);

  // Remove all active classes
  const navLinks = document.querySelectorAll(".nav-link");
  console.log("Found nav links:", navLinks.length);

  navLinks.forEach((link) => {
    link.classList.remove("bg-slate-900", "text-white");
    link.classList.add("text-slate-700");
  });

  // Add active class to current page
  const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
  if (activeLink) {
    console.log("Setting active:", currentPage);
    activeLink.classList.remove(
      "text-slate-700",
      "hover:bg-slate-100",
      "hover:text-slate-900"
    );
    activeLink.classList.add("bg-slate-900", "text-white");
  } else {
    console.log("No active link found for:", currentPage);
  }
}

// ========================================
// Load User Data
// ========================================
function loadUserData() {
  // Try to get user data from session or local storage
  const userDataStr =
    sessionStorage.getItem("coratuka_user") ||
    sessionStorage.getItem("new_user") ||
    localStorage.getItem("coratuka_user");

  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      console.log("User data loaded:", userData);

      // Update user info in sidebar
      const nameElement = document.getElementById("sidebarUserName");
      const roleElement = document.getElementById("sidebarUserRole");
      const avatarElement = document.getElementById("userAvatar");

      if (nameElement && userData.name) {
        nameElement.textContent = userData.name;
      }

      if (roleElement && userData.role) {
        roleElement.textContent = userData.role;
      }

      if (avatarElement && userData.name) {
        // Set avatar initial
        avatarElement.textContent = userData.name.charAt(0).toUpperCase();
      }

      // Show Dashboard Manager link if role is Conservator
      const dashboardLink = document.getElementById("dashboardLink");
      if (
        dashboardLink &&
        (userData.role === "Conservator" || userData.role === "Tim Konservator")
      ) {
        dashboardLink.classList.remove("hidden");
        dashboardLink.classList.add("flex");
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  } else {
    console.log("No user data found in storage");
  }
}

// ========================================
// Setup Sidebar Event Listeners
// ========================================
function setupSidebarEvents() {
  // Remove any existing listeners by using a flag
  if (window.sidebarEventsSetup) {
    console.log("Sidebar events already setup");
    return;
  }

  // Close sidebar on Escape key
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      closeSidebar();
    }
  };

  document.addEventListener("keydown", escapeHandler);
  window.sidebarEventsSetup = true;
  console.log("Sidebar events setup complete");
}

// ========================================
// Open Sidebar
// ========================================
function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");

  console.log("Opening sidebar...", {
    sidebar: !!sidebar,
    backdrop: !!backdrop,
  });

  if (sidebar && backdrop) {
    sidebar.classList.remove("-translate-x-full");
    backdrop.classList.remove("hidden");

    // Prevent body scroll when sidebar is open
    document.body.style.overflow = "hidden";
    console.log("Sidebar opened");
  } else {
    console.error("Sidebar elements not found!");
  }
}

// ========================================
// Close Sidebar
// ========================================
function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");

  if (sidebar && backdrop) {
    sidebar.classList.add("-translate-x-full");
    backdrop.classList.add("hidden");

    // Re-enable body scroll
    document.body.style.overflow = "";
    console.log("Sidebar closed");
  }
}

// ========================================
// Logout Handler
// ========================================
function handleLogout() {
  if (confirm("Apakah Anda yakin ingin logout?")) {
    // Clear all storage
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to login
    window.location.href = "../../Index.html";
  }
}

// ========================================
// Initialize on Page Load
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadSidebar);
} else {
  // DOM already loaded
  loadSidebar();
}

// ========================================
// Export functions for external use
// ========================================
window.sidebarAPI = {
  open: openSidebar,
  close: closeSidebar,
  reload: loadSidebar,
  loadUserData: loadUserData,
};
