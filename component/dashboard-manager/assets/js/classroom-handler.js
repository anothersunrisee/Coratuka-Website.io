// ========================================
// OCEAN CLASSROOM MANAGER HANDLER
// Manage batch-based classes, tasks, students, certificates
// ========================================

// Global state
let allClasses = [];
let allStudents = [];
let allTaskSubmissions = [];
let allCertificates = [];
let currentTab = "classes";
let editingClassId = null;

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

  // Load all data
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
  if (user) {
    document.getElementById("conservator-name").textContent =
      user.name || "Conservator";
  }
}

// ========================================
// LOAD ALL DATA
// ========================================
function loadAllData() {
  allClasses = loadFromLocalStorage("oceanClasses") || [];
  allStudents = loadFromLocalStorage("oceanClassStudents") || [];
  allTaskSubmissions = loadFromLocalStorage("oceanTaskSubmissions") || [];
  allCertificates = loadFromLocalStorage("oceanCertificates") || [];

  // Update statistics
  updateStatistics();

  // Render current tab
  renderCurrentTab();
}

// ========================================
// UPDATE STATISTICS
// ========================================
function updateStatistics() {
  // Total classes
  const statClasses = document.getElementById("stat-total-classes");
  if (statClasses) {
    statClasses.textContent = allClasses.length;
  }

  // Total students (unique)
  const uniqueStudents = new Set();
  allStudents.forEach((s) => uniqueStudents.add(s.studentId));
  const statStudents = document.getElementById("stat-total-students");
  if (statStudents) {
    statStudents.textContent = uniqueStudents.size;
  }

  // Pending tasks
  const pendingTasks = allTaskSubmissions.filter(
    (t) => t.status === "pending"
  ).length;
  const statTasks = document.getElementById("stat-pending-tasks");
  if (statTasks) {
    statTasks.textContent = pendingTasks;
  }

  // Certificates issued this month
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const certificatesThisMonth = allCertificates.filter((c) => {
    const certDate = new Date(c.issuedAt);
    return (
      certDate.getMonth() === thisMonth && certDate.getFullYear() === thisYear
    );
  }).length;
  const statCerts = document.getElementById("stat-certificates");
  if (statCerts) {
    statCerts.textContent = certificatesThisMonth;
  }
}

// ========================================
// TAB SWITCHING
// ========================================
function switchTab(tab) {
  currentTab = tab;

  // Update tab buttons
  document.querySelectorAll('[id^="tab-"]').forEach((btn) => {
    btn.classList.remove("tab-active");
    btn.classList.add("text-gray-600");
  });

  const activeTab = document.getElementById(`tab-${tab}`);
  if (activeTab) {
    activeTab.classList.add("tab-active");
    activeTab.classList.remove("text-gray-600");
  }

  // Hide all content
  const classesContent = document.getElementById("classes-content");
  const tasksContent = document.getElementById("tasks-content");
  const studentsContent = document.getElementById("students-content");
  const certificatesContent = document.getElementById("certificates-content");

  if (classesContent) classesContent.classList.add("hidden");
  if (tasksContent) tasksContent.classList.add("hidden");
  if (studentsContent) studentsContent.classList.add("hidden");
  if (certificatesContent) certificatesContent.classList.add("hidden");

  // Show selected content
  const selectedContent = document.getElementById(`${tab}-content`);
  if (selectedContent) {
    selectedContent.classList.remove("hidden");
  }

  // Render content
  renderCurrentTab();
}

// ========================================
// RENDER CURRENT TAB
// ========================================
function renderCurrentTab() {
  switch (currentTab) {
    case "classes":
      renderClasses();
      break;
    case "tasks":
      renderTasks();
      break;
    case "students":
      renderStudents();
      break;
    case "certificates":
      renderCertificates();
      break;
  }
}

// ========================================
// RENDER CLASSES
// ========================================
function renderClasses() {
  const grid = document.getElementById("classes-grid");

  if (!grid) {
    console.warn("classes-grid element not found");
    return;
  }

  if (allClasses.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <span class="text-6xl mb-4 block">🎓</span>
        <p class="text-gray-600 mb-4">No classes yet</p>
        <button
          onclick="openClassModal()"
          class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          Create First Class
        </button>
      </div>
    `;
    return;
  }

  const html = allClasses
    .map((cls) => {
      const enrolledStudents = allStudents.filter(
        (s) => s.classId === cls.id
      ).length;
      const progressPercentage = Math.round(
        (enrolledStudents / cls.maxStudents) * 100
      );
      const mascotEmoji = getMascotEmoji(cls.mascot);

      return `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div class="relative h-40 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
            ${
              cls.thumbnail
                ? `<img src="${cls.thumbnail}" alt="${cls.title}" class="w-full h-full object-cover" />`
                : `<span class="text-6xl">${mascotEmoji}</span>`
            }
          </div>
          
          <div class="p-5">
            <h3 class="text-lg font-bold text-ink mb-1">${cls.title}</h3>
            <p class="text-sm font-semibold text-gray-700 mb-2">${cls.theme}</p>
            <p class="text-sm text-gray-600 mb-4 line-clamp-2">${
              cls.description
            }</p>
            
            <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>${enrolledStudents}/${cls.maxStudents}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>${formatDate(cls.startDate)}</span>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex justify-between text-xs text-gray-600 mb-1">
                <span>Enrollment</span>
                <span>${progressPercentage}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-primary h-2 rounded-full" style="width: ${progressPercentage}%"></div>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                onclick="viewClassDetails('${cls.id}')"
                class="flex-1 px-4 py-2 bg-tertiary hover:bg-opacity-80 rounded-lg font-medium transition-all"
              >
                View Details
              </button>
              <button
                onclick="editClass('${cls.id}')"
                class="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onclick="deleteClass('${cls.id}')"
                class="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
}

// ========================================
// RENDER TASKS
// ========================================
function renderTasks() {
  const list = document.getElementById("tasks-list");

  if (!list) {
    console.warn("tasks-list element not found");
    return;
  }

  const filterStatus =
    document.getElementById("filter-task-status")?.value || "all";

  let filtered = allTaskSubmissions;
  if (filterStatus !== "all") {
    filtered = filtered.filter((t) => t.status === filterStatus);
  }

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="text-center py-12">
        <span class="text-6xl mb-4 block">📝</span>
        <p class="text-gray-600">No task submissions found</p>
      </div>
    `;
    return;
  }

  const html = filtered
    .map((task) => {
      const classInfo = allClasses.find((c) => c.id === task.classId);
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        revision: "bg-orange-100 text-orange-800",
      };

      return `
        <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h4 class="font-semibold text-ink mb-1">${task.taskTitle}</h4>
              <p class="text-sm text-gray-600">${
                classInfo ? classInfo.title : "Unknown Class"
              }</p>
              <p class="text-sm text-gray-500">Student: ${task.studentName}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[task.status]
            }">${
        task.status.charAt(0).toUpperCase() + task.status.slice(1)
      }</span>
          </div>

          <p class="text-sm text-gray-700 mb-3 line-clamp-2">${task.content}</p>

          <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span>Submitted: ${timeAgo(task.submittedAt)}</span>
            ${
              task.attachments.length > 0
                ? `<span>📎 ${task.attachments.length} file(s)</span>`
                : ""
            }
          </div>

          <div class="flex gap-2">
            <button
              onclick="reviewTaskSubmission('${task.id}')"
              class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
            >
              Review
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  list.innerHTML = html;
}

// ========================================
// RENDER STUDENTS
// ========================================
function renderStudents() {
  const list = document.getElementById("students-list");

  if (!list) {
    console.warn("students-list element not found");
    return;
  }

  const searchQuery =
    document.getElementById("search-students")?.value.toLowerCase() || "";
  const filterClass = document.getElementById("filter-class")?.value || "all";

  // Update class filter dropdown
  const classFilter = document.getElementById("filter-class");
  if (classFilter) {
    classFilter.innerHTML = '<option value="all">All Classes</option>';
    allClasses.forEach((cls) => {
      classFilter.innerHTML += `<option value="${cls.id}">${cls.title}</option>`;
    });
    classFilter.value = filterClass;
  }

  // Filter students
  let filtered = allStudents;
  if (searchQuery) {
    filtered = filtered.filter(
      (s) =>
        s.studentName.toLowerCase().includes(searchQuery) ||
        s.studentEmail.toLowerCase().includes(searchQuery)
    );
  }
  if (filterClass !== "all") {
    filtered = filtered.filter((s) => s.classId === filterClass);
  }

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="text-center py-12">
        <span class="text-6xl mb-4 block">👥</span>
        <p class="text-gray-600">No students found</p>
      </div>
    `;
    return;
  }

  const html = filtered
    .map((student) => {
      const classInfo = allClasses.find((c) => c.id === student.classId);
      const completedTasks = allTaskSubmissions.filter(
        (t) => t.studentId === student.studentId && t.status === "approved"
      ).length;

      return `
        <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-ink">${student.studentName}</h4>
                <p class="text-sm text-gray-600">${student.studentEmail}</p>
                <p class="text-sm text-gray-500">${
                  classInfo ? classInfo.title : "Unknown Class"
                }</p>
              </div>
            </div>

            <div class="text-right">
              <p class="text-sm font-medium text-gray-700">Progress</p>
              <p class="text-2xl font-bold text-primary">${
                student.progressPercentage || 0
              }%</p>
              <p class="text-xs text-gray-500">${completedTasks} tasks completed</p>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t flex gap-2">
            <button
              onclick="viewStudentProgress('${student.studentId}')"
              class="flex-1 px-4 py-2 bg-tertiary hover:bg-opacity-80 rounded-lg font-medium transition-all"
            >
              View Progress
            </button>
            <button
              onclick="removeStudent('${student.id}')"
              class="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              Remove
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  list.innerHTML = html;
}

// ========================================
// RENDER CERTIFICATES
// ========================================
function renderCertificates() {
  const list = document.getElementById("certificates-list");

  if (!list) {
    console.warn("certificates-list element not found");
    return;
  }

  if (allCertificates.length === 0) {
    list.innerHTML = `
      <div class="text-center py-12">
        <span class="text-6xl mb-4 block">📜</span>
        <p class="text-gray-600">No certificates issued yet</p>
      </div>
    `;
    return;
  }

  const html = allCertificates
    .map((cert) => {
      const classInfo = allClasses.find((c) => c.id === cert.classId);

      return `
        <div class="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1">
              <span class="text-4xl">📜</span>
              <div>
                <h4 class="font-semibold text-ink">${cert.studentName}</h4>
                <p class="text-sm text-gray-600">${
                  classInfo ? classInfo.title : "Unknown Class"
                }</p>
                <p class="text-xs text-gray-500">Issued: ${formatTimestamp(
                  cert.issuedAt
                )}</p>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                onclick="viewCertificate('${cert.id}')"
                class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
              >
                View
              </button>
              <button
                onclick="downloadCertificate('${cert.id}')"
                class="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-all"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  list.innerHTML = html;
}

// ========================================
// CLASS MODAL FUNCTIONS
// ========================================
function openClassModal(classId = null) {
  editingClassId = classId;

  // Reset form
  document.getElementById("class-form").reset();

  if (classId) {
    // Edit mode
    document.getElementById("class-modal-title").textContent = "Edit Class";
    const classData = allClasses.find((c) => c.id === classId);
    if (classData) {
      document.getElementById("class-id").value = classData.id;
      document.getElementById("class-title").value = classData.title;
      document.getElementById("class-theme").value = classData.theme;
      document.getElementById("class-description").value =
        classData.description;
      document.getElementById("class-mascot").value = classData.mascot;
      document.getElementById("class-location").value = classData.location;
      document.getElementById("class-start-date").value = classData.startDate;
      document.getElementById("class-end-date").value = classData.endDate;
      document.getElementById("class-max-students").value =
        classData.maxStudents;
      document.getElementById("class-code").value = classData.classCode;
      document.getElementById("class-thumbnail").value =
        classData.thumbnail || "";
    }
  } else {
    // Create mode
    document.getElementById("class-modal-title").textContent =
      "Create New Class";
    generateClassCode();
  }

  safeOpenModal("class-modal");
}

function closeClassModal() {
  safeCloseModal("class-modal");
  editingClassId = null;
}

function generateClassCode() {
  const mascots = ["TURTLE", "CORAL", "COASTAL"];
  const randomMascot = mascots[Math.floor(Math.random() * mascots.length)];
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  document.getElementById("class-code").value = `${randomMascot}${randomNum}`;
}

// ========================================
// SAVE CLASS
// ========================================
function saveClass(event) {
  event.preventDefault();

  const classData = {
    id: document.getElementById("class-id").value || generateId("CLASS"),
    title: document.getElementById("class-title").value.trim(),
    theme: document.getElementById("class-theme").value.trim(),
    description: document.getElementById("class-description").value.trim(),
    mascot: document.getElementById("class-mascot").value,
    location: document.getElementById("class-location").value.trim(),
    startDate: document.getElementById("class-start-date").value,
    endDate: document.getElementById("class-end-date").value,
    maxStudents: parseInt(document.getElementById("class-max-students").value),
    classCode: document.getElementById("class-code").value.trim().toUpperCase(),
    thumbnail: document.getElementById("class-thumbnail").value.trim(),
    createdAt: editingClassId
      ? allClasses.find((c) => c.id === editingClassId).createdAt
      : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: getCurrentConservatorName(),
  };

  if (editingClassId) {
    // Update existing
    const index = allClasses.findIndex((c) => c.id === editingClassId);
    allClasses[index] = classData;
    showNotification("Class updated successfully", "success");
  } else {
    // Create new
    allClasses.push(classData);
    showNotification("Class created successfully", "success");
  }

  saveToLocalStorage("oceanClasses", allClasses);
  closeClassModal();
  loadAllData();
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function getMascotEmoji(mascot) {
  const emojis = {
    tuka: "🐢",
    cora: "🪸",
    coco: "🏖️",
  };
  return emojis[mascot] || "🎓";
}

function filterClasses() {
  renderClasses();
}

function filterTasks() {
  renderTasks();
}

function filterStudents() {
  renderStudents();
}

function viewClassDetails(classId) {
  showNotification("Class details view coming soon", "info");
}

function editClass(classId) {
  openClassModal(classId);
}

function deleteClass(classId) {
  const classData = allClasses.find((c) => c.id === classId);
  if (confirm(`Are you sure you want to delete "${classData.title}"?`)) {
    allClasses = allClasses.filter((c) => c.id !== classId);
    saveToLocalStorage("oceanClasses", allClasses);
    showNotification("Class deleted successfully", "success");
    loadAllData();
  }
}

function reviewTaskSubmission(taskId) {
  showNotification("Task review feature coming soon", "info");
}

function viewStudentProgress(studentId) {
  showNotification("Student progress view coming soon", "info");
}

function removeStudent(enrollmentId) {
  if (confirm("Are you sure you want to remove this student from the class?")) {
    allStudents = allStudents.filter((s) => s.id !== enrollmentId);
    saveToLocalStorage("oceanClassStudents", allStudents);
    showNotification("Student removed successfully", "success");
    loadAllData();
  }
}

function viewCertificate(certId) {
  showNotification("Certificate view coming soon", "info");
}

function downloadCertificate(certId) {
  showNotification("Certificate download feature coming soon", "info");
}

// ========================================
// EXPORT FUNCTIONS
// ========================================
window.switchTab = switchTab;
window.openClassModal = openClassModal;
window.closeClassModal = closeClassModal;
window.generateClassCode = generateClassCode;
window.saveClass = saveClass;
window.filterClasses = filterClasses;
window.filterTasks = filterTasks;
window.filterStudents = filterStudents;
window.viewClassDetails = viewClassDetails;
window.editClass = editClass;
window.deleteClass = deleteClass;
window.reviewTaskSubmission = reviewTaskSubmission;
window.viewStudentProgress = viewStudentProgress;
window.removeStudent = removeStudent;
window.viewCertificate = viewCertificate;
window.downloadCertificate = downloadCertificate;

console.log("✅ Ocean Classroom Manager Handler loaded");
