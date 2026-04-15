// =====================================================
//  SASTRA COLLEGE PLACEMENT PORTAL — script.js
//  Shared logic for dashboard.html and company.html
// =====================================================

// ===== DEFAULT SEED JOBS =====
const DEFAULT_JOBS = [
  {
    id: 1, title: 'Software Engineer', type: 'IT',
    company: 'Tata Consultancy Services', emoji: '🔵',
    role: 'Backend Development', salary: '7.5', exp: 'Fresher',
    location: 'Chennai', skills: ['Java', 'Spring Boot', 'SQL', 'REST APIs'],
    openings: 50, applicants: 24, desc: 'TCS is hiring fresh graduates for software development roles.',
    postedAt: '2025-07-01'
  },
  {
    id: 2, title: 'Data Analyst', type: 'IT',
    company: 'Infosys', emoji: '🟣',
    role: 'Data & Analytics', salary: '6.5', exp: 'Fresher',
    location: 'Bangalore', skills: ['Python', 'SQL', 'Tableau', 'Excel'],
    openings: 30, applicants: 41, desc: 'Analyse large datasets and generate actionable business insights.',
    postedAt: '2025-07-03'
  },
  {
    id: 3, title: 'Cloud DevOps Engineer', type: 'IT',
    company: 'Wipro', emoji: '🟡',
    role: 'Cloud & Infrastructure', salary: '9.0', exp: '0–1 years',
    location: 'Hyderabad', skills: ['AWS', 'Docker', 'Kubernetes', 'Linux'],
    openings: 15, applicants: 19, desc: 'Manage CI/CD pipelines and cloud infrastructure on AWS.',
    postedAt: '2025-07-05'
  },
  {
    id: 4, title: 'Full Stack Developer', type: 'IT',
    company: 'Zoho Corporation', emoji: '🟠',
    role: 'Product Engineering', salary: '8.0', exp: 'Fresher',
    location: 'Chennai', skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    openings: 20, applicants: 56, desc: 'Build full-stack features for Zoho\'s SaaS product suite.',
    postedAt: '2025-07-06'
  },
  {
    id: 5, title: 'Operations Manager', type: 'Non-IT',
    company: 'Amazon India', emoji: '🔶',
    role: 'Supply Chain & Ops', salary: '8.5', exp: 'Fresher',
    location: 'Chennai', skills: ['Logistics', 'Excel', 'Communication', 'Team Leadership'],
    openings: 12, applicants: 33, desc: 'Oversee day-to-day warehouse operations and coordinate with vendors.',
    postedAt: '2025-07-04'
  },
  {
    id: 6, title: 'HR Business Partner', type: 'Non-IT',
    company: 'Deloitte', emoji: '🟢',
    role: 'Human Resources', salary: '7.0', exp: 'Fresher',
    location: 'Mumbai', skills: ['HR Analytics', 'Communication', 'Conflict Resolution'],
    openings: 8, applicants: 21, desc: 'Partner with business units to align HR strategies with goals.',
    postedAt: '2025-07-02'
  },
  {
    id: 7, title: 'ML Engineer', type: 'IT',
    company: 'Google India', emoji: '🔴',
    role: 'AI / Machine Learning', salary: '18.0', exp: '0–1 years',
    location: 'Hyderabad', skills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics'],
    openings: 5, applicants: 89, desc: 'Develop and deploy ML models for Google products at scale.',
    postedAt: '2025-07-07'
  },
  {
    id: 8, title: 'Finance Analyst', type: 'Non-IT',
    company: 'HDFC Bank', emoji: '🔷',
    role: 'Corporate Finance', salary: '6.0', exp: 'Fresher',
    location: 'Chennai', skills: ['Financial Modelling', 'Excel', 'SAP', 'Accounting'],
    openings: 18, applicants: 14, desc: 'Prepare financial reports and support budgeting and forecasting.',
    postedAt: '2025-07-05'
  },
  {
    id: 9, title: 'Cybersecurity Analyst', type: 'IT',
    company: 'HCL Technologies', emoji: '🟤',
    role: 'Security Operations', salary: '10.5', exp: '0–1 years',
    location: 'Noida', skills: ['Network Security', 'SIEM', 'Penetration Testing', 'Linux'],
    openings: 10, applicants: 37, desc: 'Monitor security incidents and respond to threats in the SOC.',
    postedAt: '2025-07-08'
  },
  {
    id: 10, title: 'Product Manager', type: 'IT',
    company: 'Freshworks', emoji: '🌿',
    role: 'Product Management', salary: '15.0', exp: '0–1 years',
    location: 'Chennai', skills: ['Roadmapping', 'Agile', 'User Research', 'Jira'],
    openings: 3, applicants: 62, desc: 'Define and prioritise product features for Freshworks CRM suite.',
    postedAt: '2025-07-09'
  },
  {
    id: 11, title: 'Sales Executive', type: 'Non-IT',
    company: 'Asian Paints', emoji: '🎨',
    role: 'B2B Sales', salary: '5.5', exp: 'Fresher',
    location: 'Coimbatore', skills: ['Sales', 'CRM', 'Negotiation', 'Communication'],
    openings: 25, applicants: 9, desc: 'Drive B2B sales for dealer and distributor network in Tamil Nadu.',
    postedAt: '2025-07-03'
  },
  {
    id: 12, title: 'Embedded Systems Engineer', type: 'IT',
    company: 'Bosch India', emoji: '⚙️',
    role: 'Firmware Engineering', salary: '9.5', exp: '0–1 years',
    location: 'Coimbatore', skills: ['C', 'C++', 'RTOS', 'CAN Bus', 'Microcontrollers'],
    openings: 7, applicants: 28, desc: 'Develop firmware for automotive ECU and ADAS modules.',
    postedAt: '2025-07-06'
  },
];

// =====================================================
//  LOCAL STORAGE HELPERS
// =====================================================
function getPostings() {
  const stored = localStorage.getItem('sastra_job_postings');
  if (!stored) {
    // Seed default jobs on first run
    savePostings(DEFAULT_JOBS);
    return DEFAULT_JOBS;
  }
  return JSON.parse(stored);
}

function savePostings(postings) {
  localStorage.setItem('sastra_job_postings', JSON.stringify(postings));
}

function getApplications() {
  return JSON.parse(localStorage.getItem('sastra_applications') || '[]');
}

function saveApplications(apps) {
  localStorage.setItem('sastra_applications', JSON.stringify(apps));
}

// =====================================================
//  UTILITY
// =====================================================
function getCompanyEmoji(type) {
  const emojis = { IT: '💻', 'Non-IT': '🏭', Finance: '💰' };
  return emojis[type] || '🏢';
}

function showToast(message, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function toggleSwitch(el) {
  el.classList.toggle('on');
}

function logout() {
  localStorage.removeItem('sastra_user_type');
  window.location.href = 'index.html';
}

// =====================================================
//  SIDEBAR
// =====================================================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const isMobile = window.innerWidth <= 900;

  if (isMobile) {
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
  } else {
    sidebar.classList.toggle('collapsed');
    const main = document.getElementById('mainContent');
    if (main) main.classList.toggle('expanded', sidebar.classList.contains('collapsed'));
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
}

// =====================================================
//  PAGE NAVIGATION (STUDENT DASHBOARD)
// =====================================================
function showPage(pageId) {
  const pages    = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item');

  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active');

  // Update header
  const titleMap = {
    dashboard: ['Dashboard', 'Overview of your placement journey'],
    jobs:      ['Job Listings', 'Browse all available opportunities'],
    profile:   ['My Profile', 'Your academic & professional snapshot'],
    resume:    ['Resume Upload', 'Upload your latest CV'],
    settings:  ['Settings', 'Manage your preferences'],
    it:        ['IT Jobs', 'Software and technology roles'],
    nonit:     ['Non-IT Jobs', 'Operations, finance and more'],
  };

  const [title, sub] = titleMap[pageId] || ['Dashboard', ''];
  const hTitle = document.getElementById('headerTitle');
  const hSub   = document.getElementById('headerSub');
  if (hTitle) hTitle.textContent = title;
  if (hSub)   hSub.textContent   = sub;

  // Close mobile sidebar
  closeSidebar();
}

// =====================================================
//  PROFILE DROPDOWN
// =====================================================
function toggleDropdown() {
  const dd = document.getElementById('profileDropdown');
  if (dd) dd.classList.toggle('open');
}

function closeDropdown() {
  const dd = document.getElementById('profileDropdown');
  if (dd) dd.classList.remove('open');
}

document.addEventListener('click', (e) => {
  const wrapper = document.querySelector('.profile-wrapper');
  if (wrapper && !wrapper.contains(e.target)) closeDropdown();
});

// =====================================================
//  JOB FILTERING
// =====================================================
let currentFilter = 'all';
let searchQuery   = '';

function filterJobs(category) {
  currentFilter = category;

  // Update tab UI
  ['all', 'IT', 'Non-IT'].forEach(t => {
    const tab = document.getElementById('tab-' + t);
    if (tab) tab.classList.toggle('active', t === category);
  });

  renderAllJobs();
}

function filterDashboardJobs(category, el) {
  document.querySelectorAll('#page-dashboard .filter-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');

  const jobs   = getPostings();
  const filtered = category === 'all' ? jobs : jobs.filter(j => j.type === category);
  renderJobCards('dashboardJobsGrid', filtered.slice(0, 6));
}

function searchJobs(query) {
  searchQuery = query.toLowerCase();
  renderAllJobs();
}

function renderAllJobs() {
  const jobs = getPostings();
  const filtered = jobs.filter(j => {
    const matchType = currentFilter === 'all' || j.type === currentFilter;
    const matchQ    = !searchQuery ||
      j.title.toLowerCase().includes(searchQuery) ||
      j.company.toLowerCase().includes(searchQuery) ||
      (j.skills || []).some(s => s.toLowerCase().includes(searchQuery));
    return matchType && matchQ;
  });
  renderJobCards('allJobsGrid', filtered);
}

function renderJobCards(containerId, jobs) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!jobs.length) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <div class="empty-icon">🔍</div>
      <h4>No jobs found</h4>
      <p>Try a different filter or check back later.</p>
    </div>`;
    return;
  }

  container.innerHTML = jobs.map(job => `
    <div class="job-card" data-type="${job.type}" data-id="${job.id}">
      <div class="job-card-header">
        <div class="company-logo">${job.emoji || getCompanyEmoji(job.type)}</div>
        <span class="job-type-badge badge-${job.type === 'IT' ? 'it' : 'non-it'}">${job.type}</span>
      </div>
      <h4>${job.title}</h4>
      <div class="company-name">🏢 ${job.company}</div>
      <div class="job-meta">
        <span class="meta-chip"><span class="chip-icon">📍</span>${job.location || 'On-site'}</span>
        <span class="meta-chip"><span class="chip-icon">🎓</span>${job.exp || 'Fresher'}</span>
        <span class="meta-chip"><span class="chip-icon">💼</span>${job.openings || 1} Openings</span>
      </div>
      <div class="job-skills">
        ${(job.skills || []).slice(0, 4).map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
      <div class="job-card-footer">
        <div class="salary">₹${job.salary} <span>LPA</span></div>
        <button class="apply-btn" onclick="openApplyModal(${JSON.stringify(job).replace(/"/g,'&quot;')})">Apply Now</button>
      </div>
    </div>
  `).join('');
}

// =====================================================
//  APPLY FOR JOB
// =====================================================
let currentJob = null;

function openApplyModal(job) {
  currentJob = job;
  const details = document.getElementById('applyJobDetails');
  if (details) {
    details.innerHTML = `
      <div style="padding:16px; border-radius:var(--radius-sm); box-shadow:inset 3px 3px 7px var(--dark-shadow), inset -3px -3px 7px var(--light-shadow);">
        <h4 style="font-weight:700; color:var(--text-primary); margin-bottom:4px;">${job.title}</h4>
        <p style="font-size:0.82rem; color:var(--text-secondary);">${job.company} • ${job.location} • ₹${job.salary} LPA</p>
      </div>
    `;
  }
  const modal = document.getElementById('applyModal');
  if (modal) modal.classList.add('open');
}

function closeApplyModal() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.classList.remove('open');
  currentJob = null;
}

function submitApplication(e) {
  e.preventDefault();
  if (!currentJob) return;

  const apps = getApplications();
  const already = apps.find(a => a.jobId === currentJob.id);
  if (already) {
    showToast('You have already applied to this role!', 'error');
    closeApplyModal();
    return;
  }

  apps.push({ jobId: currentJob.id, jobTitle: currentJob.title, company: currentJob.company, appliedAt: new Date().toLocaleDateString() });
  saveApplications(apps);

  // Increment applicant count
  const postings = getPostings();
  const idx = postings.findIndex(p => p.id === currentJob.id);
  if (idx !== -1) { postings[idx].applicants = (postings[idx].applicants || 0) + 1; savePostings(postings); }

  closeApplyModal();
  showToast(`Application sent to ${currentJob.company}! 🎉`, 'success');
  updateDashboardStats();
}

// ===== Close modals on overlay click =====
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    currentJob = null;
  }
});

// =====================================================
//  EDIT PROFILE MODAL
// =====================================================
function openEditModal() {
  const student = JSON.parse(localStorage.getItem('sastra_student') || '{}');
  const nameEl   = document.getElementById('editName');
  const deptEl   = document.getElementById('editDept');
  const skillsEl = document.getElementById('editSkills');
  if (nameEl)   nameEl.value   = student.name   || '';
  if (deptEl)   deptEl.value   = student.dept   || '';
  if (skillsEl) skillsEl.value = (student.skills || []).join(', ');

  const modal = document.getElementById('editModal');
  if (modal) modal.classList.add('open');
}

function closeEditModal() {
  const modal = document.getElementById('editModal');
  if (modal) modal.classList.remove('open');
}

function saveProfile(e) {
  e.preventDefault();
  const student   = JSON.parse(localStorage.getItem('sastra_student') || '{}');
  const nameEl    = document.getElementById('editName');
  const deptEl    = document.getElementById('editDept');
  const skillsEl  = document.getElementById('editSkills');

  if (nameEl)   student.name   = nameEl.value.trim();
  if (deptEl)   student.dept   = deptEl.value.trim();
  if (skillsEl) student.skills = skillsEl.value.split(',').map(s => s.trim()).filter(Boolean);

  localStorage.setItem('sastra_student', JSON.stringify(student));
  closeEditModal();
  renderStudentProfile();
  showToast('Profile updated! ✓', 'success');
}

// =====================================================
//  RESUME UPLOAD
// =====================================================
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('uploadArea').classList.add('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  document.getElementById('uploadArea').classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) processFile(file);
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type)) { showToast('Please upload a PDF or Word document.', 'error'); return; }
  if (file.size > 5 * 1024 * 1024) { showToast('File size must be under 5MB.', 'error'); return; }

  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  localStorage.setItem('sastra_resume', JSON.stringify({ name: file.name, size: sizeMB, uploadedAt: new Date().toLocaleDateString() }));

  document.getElementById('resumeFileName').textContent  = file.name;
  document.getElementById('resumeFileSize').textContent  = `${sizeMB} MB • Uploaded ${new Date().toLocaleDateString()}`;
  document.getElementById('resumePreview').style.display = 'block';
  document.getElementById('uploadArea').style.display    = 'none';

  showToast('Resume uploaded successfully! 🎉', 'success');

  // Update profile score
  const student = JSON.parse(localStorage.getItem('sastra_student') || '{}');
  student.resumeUploaded = true;
  localStorage.setItem('sastra_student', JSON.stringify(student));
  updateDashboardStats();
}

function removeResume() {
  localStorage.removeItem('sastra_resume');
  document.getElementById('resumePreview').style.display = 'none';
  document.getElementById('uploadArea').style.display    = 'block';
  document.getElementById('resumeInput').value           = '';
  showToast('Resume removed.', 'info');
}

// =====================================================
//  STUDENT PROFILE RENDER
// =====================================================
function renderStudentProfile() {
  const student = JSON.parse(localStorage.getItem('sastra_student') || '{}');

  const initial = student.name ? student.name[0].toUpperCase() : 'S';

  // Sidebar & header avatars
  const sidebarInit = document.getElementById('sidebarInitial');
  const headerAv    = document.getElementById('headerAvatar');
  const dropName    = document.getElementById('dropName');
  const dropEmail   = document.getElementById('dropEmail');

  if (sidebarInit) sidebarInit.textContent = initial;
  if (headerAv)    headerAv.textContent    = initial;
  if (dropName)    dropName.textContent    = student.name || 'Student';
  if (dropEmail)   dropEmail.textContent   = student.email || '';

  // Sidebar user card
  const sbName = document.getElementById('sidebarName');
  const sbDept = document.getElementById('sidebarDept');
  if (sbName) sbName.textContent = student.name || 'Student';
  if (sbDept) sbDept.textContent = student.dept || 'Department';

  // Profile page
  const profAv   = document.getElementById('profileAvatarBig');
  const profName = document.getElementById('profileFullName');
  const profDept = document.getElementById('profileDept');
  const profEmail= document.getElementById('profileEmail');
  const profRoll = document.getElementById('profileRoll');

  if (profAv)    profAv.textContent    = initial;
  if (profName)  profName.textContent  = student.name || 'Student Name';
  if (profDept)  profDept.textContent  = student.dept || 'Department';
  if (profEmail) profEmail.textContent = student.email || '—';
  if (profRoll)  profRoll.textContent  = student.rollNo || '—';

  // Skills
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    const skills = student.skills || [];
    skillsGrid.innerHTML = skills.length
      ? skills.map(s => `<div class="skill-chip">${s}</div>`).join('')
      : '<p style="color:var(--text-muted); font-size:0.85rem;">No skills added yet. Edit profile to add skills.</p>';
  }

  // Projects
  const projectsList = document.getElementById('projectsList');
  if (projectsList) {
    const projects = student.projects || [];
    projectsList.innerHTML = projects.length
      ? projects.map(p => `
        <div class="project-item">
          <h5>${p.title}</h5>
          <p>${p.desc}</p>
          <div class="project-tags">${(p.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        </div>
      `).join('')
      : '<p style="color:var(--text-muted); font-size:0.85rem;">No projects added yet.</p>';
  }

  // Profile stats
  const apps = getApplications();
  const ps_s = document.getElementById('ps-skills');
  const ps_p = document.getElementById('ps-projects');
  const ps_a = document.getElementById('ps-applied');
  if (ps_s) ps_s.textContent = (student.skills || []).length;
  if (ps_p) ps_p.textContent = (student.projects || []).length;
  if (ps_a) ps_a.textContent = apps.length;
}

// =====================================================
//  DASHBOARD STATS
// =====================================================
function updateDashboardStats() {
  const jobs    = getPostings();
  const apps    = getApplications();
  const student = JSON.parse(localStorage.getItem('sastra_student') || '{}');
  const resume  = localStorage.getItem('sastra_resume');

  const itCount    = jobs.filter(j => j.type === 'IT').length;
  const nonItCount = jobs.filter(j => j.type === 'Non-IT').length;

  const totalEl    = document.getElementById('totalJobsCount');
  const companiesEl= document.getElementById('companiesCount');
  const appliedEl  = document.getElementById('appliedCount');
  const scoreEl    = document.getElementById('profileScore');
  const itBadge    = document.getElementById('it-count');
  const nonItBadge = document.getElementById('nonit-count');

  if (totalEl)     totalEl.textContent     = jobs.length;
  if (companiesEl) companiesEl.textContent = new Set(jobs.map(j => j.company)).size;
  if (appliedEl)   appliedEl.textContent   = apps.length;
  if (itBadge)     itBadge.textContent     = itCount;
  if (nonItBadge)  nonItBadge.textContent  = nonItCount;

  // Profile completion score
  let score = 40;
  if (student.name)              score += 15;
  if (student.dept)              score += 10;
  if ((student.skills || []).length >= 3) score += 15;
  if ((student.projects || []).length >= 1) score += 10;
  if (resume)                    score += 10;
  if (scoreEl) scoreEl.textContent = Math.min(score, 100) + '%';
}

// =====================================================
//  RESUME PREVIEW RESTORE
// =====================================================
function restoreResume() {
  const stored = localStorage.getItem('sastra_resume');
  if (stored) {
    const r = JSON.parse(stored);
    const fn   = document.getElementById('resumeFileName');
    const fs   = document.getElementById('resumeFileSize');
    const prev = document.getElementById('resumePreview');
    const area = document.getElementById('uploadArea');
    if (fn)   fn.textContent   = r.name;
    if (fs)   fs.textContent   = `${r.size} MB • Uploaded ${r.uploadedAt}`;
    if (prev) prev.style.display = 'block';
    if (area) area.style.display = 'none';
  }
}

// =====================================================
//  STUDENT DASHBOARD INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  // Only run student dashboard logic if we're on dashboard.html
  if (!document.getElementById('page-dashboard')) return;

  const userType = localStorage.getItem('sastra_user_type');
  if (userType !== 'student') {
    window.location.href = 'index.html';
    return;
  }

  renderStudentProfile();
  updateDashboardStats();

  // Render dashboard preview jobs
  const jobs = getPostings();
  renderJobCards('dashboardJobsGrid', jobs.slice(0, 6));

  // Render all jobs page
  renderJobCards('allJobsGrid', jobs);

  // Restore resume
  restoreResume();
});
