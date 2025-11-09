// ========================================
// MODAL FIX - Universal Modal Management
// Fixes auto-open and close button issues
// ========================================

/**
 * Initialize all modals on page load
 * Ensures modals are closed by default and close buttons work
 */
function initializeModals() {
  // Get all modal overlays
  const modals = document.querySelectorAll(
    ".modal-overlay, .validation-modal, .detail-panel"
  );

  modals.forEach((modal) => {
    // Ensure modal is closed by default
    modal.classList.remove("active");

    // Find close buttons within modal
    const closeButtons = modal.querySelectorAll(
      '.modal-close, [onclick*="close"]'
    );

    closeButtons.forEach((btn) => {
      // Add click handler if not already present
      if (!btn.hasAttribute("data-close-initialized")) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          modal.classList.remove("active");

          // Also hide overlay if exists
          const overlay = document.querySelector(".detail-overlay");
          if (overlay) {
            overlay.classList.remove("active");
          }

          // Re-enable body scroll
          document.body.style.overflow = "";
        });
        btn.setAttribute("data-close-initialized", "true");
      }
    });

    // Close on overlay click (outside modal content)
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");

        const overlay = document.querySelector(".detail-overlay");
        if (overlay) {
          overlay.classList.remove("active");
        }

        document.body.style.overflow = "";
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");

        const overlay = document.querySelector(".detail-overlay");
        if (overlay) {
          overlay.classList.remove("active");
        }

        document.body.style.overflow = "";
      }
    });
  });

  // Ensure overlay is hidden
  const overlays = document.querySelectorAll(".modal-overlay, .detail-overlay");
  overlays.forEach((overlay) => {
    overlay.classList.remove("active");
  });

  console.log(`✅ Initialized ${modals.length} modals`);
}

/**
 * Safe modal opener - prevents auto-open bugs
 * @param {string} modalId - Modal element ID
 */
function safeOpenModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.warn(`Modal ${modalId} not found`);
    return;
  }

  // Close any other open modals first
  document
    .querySelectorAll(
      ".modal-overlay.active, .validation-modal.active, .detail-panel.active"
    )
    .forEach((m) => {
      if (m.id !== modalId) {
        m.classList.remove("active");
      }
    });

  // Open target modal
  modal.classList.add("active");

  // Disable body scroll
  document.body.style.overflow = "hidden";
}

/**
 * Safe modal closer
 * @param {string} modalId - Modal element ID
 */
function safeCloseModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove("active");

  // Also close overlay if exists
  const overlay = document.querySelector(".detail-overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }

  // Re-enable body scroll
  document.body.style.overflow = "";
}

/**
 * Close all modals
 */
function closeAllModals() {
  document
    .querySelectorAll(".modal-overlay, .validation-modal, .detail-panel")
    .forEach((modal) => {
      modal.classList.remove("active");
    });

  document.querySelectorAll(".detail-overlay").forEach((overlay) => {
    overlay.classList.remove("active");
  });

  document.body.style.overflow = "";
}

// ========================================
// AUTO-INITIALIZE ON DOM READY
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeModals);
} else {
  // DOM already loaded
  initializeModals();
}

// Also initialize after a short delay (catches dynamically added modals)
setTimeout(initializeModals, 500);

// ========================================
// EXPORT TO WINDOW
// ========================================
window.initializeModals = initializeModals;
window.safeOpenModal = safeOpenModal;
window.safeCloseModal = safeCloseModal;
window.closeAllModals = closeAllModals;

console.log("✅ Modal Fix loaded - All modals closed by default");
