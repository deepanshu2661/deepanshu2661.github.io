/**
 * DEEPANSHU | DATA ANALYST & AI AUTOMATION SPECIALIST PORTFOLIO
 * High-performance, vanilla JavaScript for interactive features
 * Includes GovTender IQ: Tender Command Center Interactive Demo Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMetricsCounter();
  initSkillFilters();
  initAiAssistant();
  initProjectModals();
  initCustomizerDrawer();
  initContactActions();
  initMobileMenu();
  initTenderDemo();
  initTenderOpsDemo();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });
}

/* ==========================================================================
   2. HERO TYPING EFFECT (ALIGNED TO DEEPANSHU'S PROFILE)
   ========================================================================== */
function initTypingEffect() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const roles = [
    'Python Web Scraping (Selenium / BeautifulSoup)',
    'AI-Driven Workflow Automation Architect',
    'Google Apps Script & Enterprise Web App Developer',
    'Senior MIS Specialist & Tender Intelligence Analyst'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. ANIMATED METRICS COUNTERS
   ========================================================================== */
function initMetricsCounter() {
  const metricNumbers = document.querySelectorAll('.metric-number');
  if (!metricNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target'));
        animateCount(el, targetVal);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  metricNumbers.forEach(num => observer.observe(num));

  function animateCount(el, target) {
    const duration = 1400;
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   4. SKILL CATEGORY FILTERING
   ========================================================================== */
function initSkillFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE "ASK MY AI CV" RECRUITER ASSISTANT
   ========================================================================== */
function initAiAssistant() {
  const form = document.getElementById('assistant-form');
  const input = document.getElementById('assistant-input');
  const chatBox = document.getElementById('assistant-chat-box');
  const chips = document.querySelectorAll('.chip-btn');

  // Quick chip triggers
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleAssistantQuery(query);
    });
  });

  // Form submit
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    handleAssistantQuery(query);
  });

  function handleAssistantQuery(query) {
    appendMessage('user', query);

    // Bot typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot typing';
    typingIndicator.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-body"><p>Analyzing portfolio knowledge base...</p></div>
    `;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const answer = generateCvAnswer(query);
      appendMessage('bot', answer);
    }, 450);
  }

  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    const avatar = sender === 'bot' ? '🤖' : '👤';
    msg.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-body"><p>${text}</p></div>
    `;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function generateCvAnswer(q) {
    const lower = q.toLowerCase();

    if (lower.includes('command center') || lower.includes('scraping engine')) {
      return "The <strong>Tender Command Center (GovTender IQ)</strong> is Deepanshu's flagship market discovery platform! It features a distributed Python multi-process scraper (Selenium + ProcessPoolExecutor) querying 100+ GeM portal tabs, extracting embedded PDF delivery specs & EMD data via pdfplumber, and serving real-time analytics to a high-contrast Google Apps Script SPA with under 450ms query latency. You can launch the interactive live demo right from the featured project card!";
    } else if (lower.includes('operations') || lower.includes('lifecycle') || lower.includes('tender management') || lower.includes('erp') || lower.includes('handler')) {
      return "<strong>GovTender Operations PRO</strong> is Deepanshu's enterprise tender lifecycle & team workflow platform! It features Role-Based Access Control (GM, Tender Manager, Tender Executive), real-time team workload tracking across bidding specialists, an automated 2-day overdue SLA alert system, daily progress percentage logging (0-100%), and automatic Google Drive month-wise PDF archival synchronized with multi-tab Google Sheets.";
    } else if (lower.includes('tender') || lower.includes('gem')) {
      return "Deepanshu built two complementary enterprise procurement platforms: (1) <strong>GovTender IQ</strong> for automated market opportunity scraping, PDF extraction, and L1 rate intelligence, and (2) <strong>GovTender Operations PRO</strong> for team delegation, daily task logs, overdue alerts, and Google Drive document archival. Both have interactive demos on this portfolio!";
    } else if (lower.includes('scrap') || lower.includes('selenium') || lower.includes('beautifulsoup') || lower.includes('crawler')) {
      return "Deepanshu specializes in high-reliability web scraping using Python, Selenium WebDriver, and BeautifulSoup. He designs systems with Windows keep-awake heartbeats (SetThreadExecutionState), automatic reconnection recovery, anti-bot mitigation, and concurrent PDF document mining.";
    } else if (lower.includes('apps script') || lower.includes('google sheet') || lower.includes('gas') || lower.includes('dashboard')) {
      return "Deepanshu is an expert in Google Apps Script and Google Sheets API automation. He solved Apps Script's 6-minute ceiling and 100KB cache limits using a custom 90KB chunked caching engine and PropertiesService batch accumulation, serving thousands of live records seamlessly.";
    } else if (lower.includes('l1') || lower.includes('l2') || lower.includes('rate') || lower.includes('aoc') || lower.includes('pricing')) {
      return "Deepanshu's systems perform automated competitive rate analysis on past awarded (AOC) bids. The scraper parses GeM's getBidResultView endpoints, cleans vendor entity names, and extracts winning L1/L2/L3 prices and OEM/Make/Model specifications to give estimators an immediate pricing edge.";
    } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('python')) {
      return "Deepanshu's core technical stack includes: Python (Selenium, BeautifulSoup, pdfplumber, Pandas, Requests), Google Apps Script, Google Sheets API, Advanced Excel & VBA Macros, Web Automation, and Data Analytics.";
    } else if (lower.includes('role') || lower.includes('hire') || lower.includes('available') || lower.includes('job')) {
      return "Yes! Deepanshu is actively available for <strong>Data Analyst, Python Web Scraping, and MIS Workflow Automation</strong> roles (Full-time or high-impact contract). He is based in New Delhi and open to remote or hybrid opportunities!";
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('whatsapp')) {
      return "You can reach Deepanshu directly at <strong>deepanshu2661@gmail.com</strong> or phone/WhatsApp at <strong>+91 9310033561</strong> (New Delhi, India).";
    } else if (lower.includes('experience') || lower.includes('years') || lower.includes('background')) {
      return "Deepanshu brings 4+ years of professional experience in enterprise MIS, web scraping, and procurement data pipelines, previously delivering end-to-end automation for large-scale government contractors and commercial supply teams.";
    } else {
      return `Thanks for asking about "${q}". Deepanshu specializes in high-speed web scraping, automated tender intelligence, and serverless Google Apps Script enterprise tools. Explore his featured projects above and try the interactive demos!`;
    }
  }
}

/* ==========================================================================
   6. PROJECT ARCHITECTURE MODAL
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalTarget = document.getElementById('modal-content-target');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetails = {
    tender: {
      title: "GovTender IQ: GeM Automation & Tender Command Center",
      category: "Enterprise Python Web Scraping & Serverless Cloud Dashboard",
      problem: "Procurement teams manually browsed 100+ GeM portal tabs across central ministries, states, and defense forces—spending 35+ hours weekly with delayed bid notifications and zero competitive intelligence on awarded L1/L2/L3 vendor rates.",
      solution: "Architected an autonomous 4-stage ecosystem: (1) Headless multi-process Selenium scrapers traversing pagination and dynamic AJAX widgets, (2) pdfplumber document mining back-calculating EMD and true project budgets, (3) Chunked Google Apps Script backend overcoming execution limits, and (4) High-speed SPA with live tickers, parametric filters, and instantaneous PDF generation.",
      architecture: [
        "Distributed Python Pipeline: ProcessPoolExecutor running isolated Chrome sessions with Windows API SetThreadExecutionState sleep prevention & exponential network retry loops.",
        "Document Intelligence: pdfplumber mining embedded tables for Delivery Cities, MSE reservation, and formulaic budget back-calculation (2% standard, 3% PROV branches).",
        "AOC Financial & Tech Evaluation: Concurrent scraping of getBidResultView endpoints, normalizing seller identities, and parsing Make/Model/Brand specs.",
        "High-Performance Apps Script Backend: Split-cache architecture (90KB chunking to bypass 100KB limits) serving 1,000+ cached rows to client in <450ms.",
        "Interactive Web App: Soracom/Inter UI, live ticker marquee, multi-select location filters, and high-contrast printable audit reports."
      ],
      impact: "100+ ministries synced daily, 40+ hours/week saved, zero missed bid deadlines, and 100% data fidelity with strict NDA white-labeling."
    },
    'tender-code': {
      title: "GovTender IQ: Technical Architecture & Pipeline Specification",
      category: "Source Code & Systems Engineering Breakdown",
      problem: "GeM enforces strict session timeouts, dynamically generated select2 DOM structures, and SPA pagination that frequently drops filter parameters upon reloads.",
      solution: "Implemented defensive web automation patterns with dual-pass verification, memory-safe process pools, and custom Google Apps Script micro-chunking.",
      architecture: [
        "Fault-Tolerant Automation: Native DOM event dispatching, stale element recovery loops, and automatic form constraint stripping for flawless search triggering.",
        "Adaptive Memory & Worker Management: Isolated temporary user-data-dir profiles per Chrome instance to prevent profile lock deadlocks.",
        "AOC Rate Intelligence: Two-tier evaluation parser mapping technical offered items against financial qualifying rankings (L1, L2, L3) to expose competitor pricing trends.",
        "Zero-Latency Cache Layer: Stored pre-aggregated state/ministry/category indices in PropertiesService with background time-driven cron refreshing."
      ],
      impact: "Processed 10,000+ tenders per run with 99.8% uptime and flawless operational resilience against portal UI alterations."
    },
    'tender-ops': {
      title: "GovTender Operations PRO: GeM Tender Lifecycle & Team Workflow ERP",
      category: "Enterprise Operations Management & Workflow Automation",
      problem: "Once tenders were identified, bidding teams struggled with manual delegation across spreadsheets, untracked submission bottlenecks, missing tender PDFs, and costly missed deadlines without automated SLA escalation.",
      solution: "Engineered an executive operational portal with Role-Based Access Control (GM, Tender Manager, Tender Executive), visual team workload distribution, automated overdue SLA alerts, Google Drive month-wise PDF archiving, and two-way Google Sheets database synchronization.",
      architecture: [
        "Role-Based Access Control (RBAC): Multi-tier authentication securing executive reports and admin tools while empowering team specialists to update daily task progress.",
        "Visual Workload & SLA Engine: Real-time calculation of active assignments per handler, average completion percentages, and automated overdue flags (highlighting tenders past deadline).",
        "Automated Two-Way Sheet Sync: Hourly triggers and manual push synchronizing 'Current Bids' into archived fiscal month sections ('MONTH WISE REPORT') with data validation rules.",
        "Google Drive Cloud PDF Storage: Automated month-wise directory creation ('GeM Bid PDFs/JUN 2026') with universal view permission linking directly into sheet records.",
        "Daily Task Logging & Audit Trail: Granular progress tracking (0-100% slider) logging timestamps, employee names, and task descriptions to an immutable 'Daily Log' sheet."
      ],
      impact: "Eliminated missed bidding deadlines, cut internal status meetings by 75%, and created a complete historical audit trail across 100+ high-value tenders."
    },
    'tender-ops-code': {
      title: "GovTender Operations PRO: Backend Architecture & Apps Script Specification",
      category: "Serverless Architecture & Cloud Sheet Database Engine",
      problem: "Google Apps Script imposes strict 6-minute execution quotas, single-threaded lock limits, and Drive upload memory boundaries when managing large enterprise bidding volumes.",
      solution: "Implemented an event-driven serverless architecture leveraging CacheService session tokens, PropertiesService hashed security, LockService concurrency guards, and ContentService REST endpoints for external scraper integration.",
      architecture: [
        "LockService Concurrency Control: Protected multi-user simultaneous task writes with waitLock(20000) mutexes preventing row collision and formula corruption.",
        "Chunked Drive Upload Pipeline: Base64 decoding stream writing tender copies directly to month-specific Drive folders and returning public preview URLs.",
        "REST API Endpoint: Custom doGet/doPost endpoints enabling desktop automation bots (gem_sync) to query pending bids needing PDFs and attach downloaded documents automatically.",
        "Dynamic Fiscal Partitioning: Regex-driven header detection ('STATUS OF ONGOING BIDS [JUN 2026]') partitioning thousands of rows without performance degradation."
      ],
      impact: "Seamlessly handles 500+ monthly bids, 4+ concurrent staff members, and real-time executive reporting with zero server infrastructure overhead."
    },
    rag: {
      title: "Autonomous Multi-Agent RAG & Neural Knowledge Graph",
      category: "Generative AI & Agentic Reasoning",
      problem: "Enterprise documentation was fragmented across millions of unstructured files, leading to hallucination-prone outputs from generic LLMs.",
      solution: "Engineered an agentic retrieval pipeline with query decomposition, hybrid dense-sparse search (SPLADE + OpenAI Ada), and cross-encoder reranking.",
      architecture: [
        "Ingestion: Chunking with recursive character splitting & metadata tagging.",
        "Vector Storage: Pinecone serverless index with 1536-dimensional embeddings.",
        "Agent Loop: LangGraph state machine coordinating research, verification, and citation agents.",
        "Serving: Containerized FastAPI service on Kubernetes with streaming SSE."
      ],
      impact: "94.6% answer faithfulness benchmarked with RAGAS, 140ms median latency, serving 15,000+ daily employee inquiries."
    },
    vision: {
      title: "Real-Time Edge Computer Vision & Telemetry",
      category: "Deep Learning & Edge Optimization",
      problem: "Industrial assembly lines required microsecond defect detection without relying on unstable cloud network latency.",
      solution: "Trained customized YOLOv11 architectures, quantized to INT8 with TensorRT, and deployed directly to NVIDIA Jetson AGX edge units.",
      architecture: [
        "Dataset: 45,000 annotated micro-component surface imagery.",
        "Optimization: Quantization-Aware Training (QAT) in PyTorch, compiled with TensorRT.",
        "Edge Telemetry: MQTT broker publishing inference telemetry and frame heatmaps.",
        "Monitoring: Prometheus and Grafana for real-time drift & false positive tracking."
      ],
      impact: "64 FPS continuous throughput, 99.4% mAP@50, reducing factory defect pass-through rate by 68%."
    },
    fraud: {
      title: "High-Throughput Fraud Detection & Risk Engine",
      category: "Predictive Analytics & MLOps",
      problem: "E-commerce platform suffered fraudulent card testing attacks causing chargeback penalties and degraded user trust.",
      solution: "Built a two-tiered real-time prediction service combining an ultra-fast rules cache with an ensemble of LightGBM and graph anomaly features.",
      architecture: [
        "Streaming: Apache Kafka message ingestion with 3,200 events/sec.",
        "Feature Store: Google BigQuery feature tables synchronized with Redis in-memory cache.",
        "Ensemble: LightGBM classification model + Isolation Forest unsupervised outlier score.",
        "CI/CD: Automated retraining triggered by MLflow data drift alerts."
      ],
      impact: "Prevented $1.4M in fraudulent transactions in first 9 months, achieving an AUC-ROC of 0.982."
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (!data) return;

      modalTarget.innerHTML = `
        <span class="section-tag">${data.category}</span>
        <h2 style="font-size: 1.55rem; margin: 0.5rem 0 1rem; color: var(--text-primary); font-family: 'Plus Jakarta Sans', sans-serif;">${data.title}</h2>
        
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.3rem;">The Challenge:</h4>
          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${data.problem}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.3rem;">Engineered Solution:</h4>
          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${data.solution}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">System Architecture:</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.88rem; line-height: 1.7;">
            ${data.architecture.map(step => `<li>${step}</li>`).join('')}
          </ul>
        </div>

        <div style="background: var(--bg-tertiary); padding: 1rem 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <strong style="color: var(--accent-green); font-size: 0.9rem;">Verified Business Impact:</strong>
          <p style="color: var(--text-primary); font-size: 0.9rem; margin-top: 0.3rem; line-height: 1.5;">${data.impact}</p>
        </div>
      `;

      modal.classList.add('open');
    });
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('open'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

/* ==========================================================================
   7. PROFILE CUSTOMIZER DRAWER (DEEPANSHU DEFAULTS)
   ========================================================================== */
function initCustomizerDrawer() {
  const triggerBtn = document.getElementById('edit-profile-btn');
  const drawer = document.getElementById('customizer-drawer');
  const closeBtn = document.getElementById('close-drawer-btn');
  const saveBtn = document.getElementById('save-profile-btn');
  const resetBtn = document.getElementById('reset-profile-btn');

  // Input fields
  const nameInput = document.getElementById('edit-name');
  const roleInput = document.getElementById('edit-role');
  const emailInput = document.getElementById('edit-email');
  const locationInput = document.getElementById('edit-location');
  const githubInput = document.getElementById('edit-github');
  const linkedinInput = document.getElementById('edit-linkedin');
  const bioInput = document.getElementById('edit-bio');

  // Load saved profile data if present
  const savedData = localStorage.getItem('portfolio-custom-profile');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      applyProfileData(parsed);
      populateInputs(parsed);
    } catch (e) {
      console.error(e);
    }
  }

  triggerBtn?.addEventListener('click', () => drawer.classList.add('open'));
  closeBtn?.addEventListener('click', () => drawer.classList.remove('open'));

  saveBtn?.addEventListener('click', () => {
    const data = {
      name: nameInput.value.trim() || 'Deepanshu',
      role: roleInput.value.trim() || 'Data Analyst & Web Scraping Specialist',
      email: emailInput.value.trim() || 'deepanshu2661@gmail.com',
      location: locationInput.value.trim() || 'New Delhi, India',
      github: githubInput.value.trim() || 'https://deepanshu2661.github.io',
      linkedin: linkedinInput.value.trim() || 'https://linkedin.com',
      bio: bioInput.value.trim()
    };

    applyProfileData(data);
    localStorage.setItem('portfolio-custom-profile', JSON.stringify(data));
    drawer.classList.remove('open');
    showToast('Profile updated & saved locally!');
  });

  resetBtn?.addEventListener('click', () => {
    localStorage.removeItem('portfolio-custom-profile');
    location.reload();
  });

  function applyProfileData(data) {
    if (data.name) {
      const profileName = document.getElementById('profile-name');
      const navBrand = document.getElementById('nav-brand-name');
      if (profileName) profileName.textContent = data.name;
      if (navBrand) navBrand.textContent = data.name;
    }
    if (data.bio) {
      const bioEl = document.getElementById('profile-bio');
      if (bioEl) bioEl.textContent = data.bio;
    }
    if (data.email) {
      const emailVal = document.getElementById('contact-email-val');
      const emailLink = document.getElementById('direct-email-link');
      const copyBtn = document.getElementById('copy-email-btn');
      if (emailVal) emailVal.textContent = data.email;
      if (emailLink) emailLink.href = `mailto:${data.email}`;
      if (copyBtn) copyBtn.setAttribute('data-email', data.email);
    }
    if (data.location) {
      const locVal = document.getElementById('contact-location-val');
      if (locVal) locVal.textContent = data.location;
    }
    if (data.github) {
      const gh = document.getElementById('link-github');
      if (gh) gh.href = data.github;
    }
    if (data.linkedin) {
      const li = document.getElementById('link-linkedin');
      if (li) li.href = data.linkedin;
    }
  }

  function populateInputs(data) {
    if (data.name) nameInput.value = data.name;
    if (data.role) roleInput.value = data.role;
    if (data.email) emailInput.value = data.email;
    if (data.location) locationInput.value = data.location;
    if (data.github) githubInput.value = data.github;
    if (data.linkedin) linkedinInput.value = data.linkedin;
    if (data.bio) bioInput.value = data.bio;
  }
}

/* ==========================================================================
   8. CONTACT, COPY EMAIL & PRINT RESUME ACTIONS
   ========================================================================== */
function initContactActions() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  copyEmailBtn?.addEventListener('click', () => {
    const email = copyEmailBtn.getAttribute('data-email') || 'deepanshu2661@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  });

  const printBtn = document.getElementById('cv-print-btn');
  const heroDownloadBtn = document.getElementById('hero-download-cv');

  function triggerPrint() {
    showToast('Opening clean print dialog (Save as PDF)...');
    setTimeout(() => {
      window.print();
    }, 400);
  }

  printBtn?.addEventListener('click', triggerPrint);
  heroDownloadBtn?.addEventListener('click', triggerPrint);

  const contactForm = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    feedback.textContent = `Thank you ${name}! Opening your default email client to send to Deepanshu...`;
    feedback.className = 'form-feedback success';

    setTimeout(() => {
      window.location.href = `mailto:deepanshu2661@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    }, 1000);
  });
}

/* ==========================================================================
   9. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   11. GOVTENDER IQ: TENDER COMMAND CENTER INTERACTIVE SIMULATION ENGINE
   ========================================================================== */
function initTenderDemo() {
  // Modal containers
  const demoModal = document.getElementById('tender-demo-modal');
  const launchBtn = document.getElementById('launch-tender-demo-btn');
  const closeBtn = document.getElementById('tcc-close-modal-btn');

  if (!demoModal) return;

  // Open & Close Handlers
  launchBtn?.addEventListener('click', () => {
    demoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    tccShowModeView();
    tccRenderTicker();
    showToast('Tender Command Center demo launched (Anonymized Data)');
  });

  closeBtn?.addEventListener('click', () => {
    demoModal.classList.remove('open');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('open')) {
      const submodal = document.querySelector('.tcc-submodal-overlay.open');
      if (submodal) {
        submodal.classList.remove('open');
      } else {
        demoModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // SANITIZED REPOSITORY DATASET (CONFIDENTIALITY PRESERVED)
  window.TCC_DATA = [
    {
      bidNo: 'GEM/2026/B/8102104',
      item: 'Next-Generation High Definition IP CCTV Surveillance System with NVR',
      category: 'CCTV & Surveillance',
      qty: '120 Nos',
      department: 'Border Security Force (BSF)',
      branch: 'JAMMU_AND_KASHMIR',
      state: 'Jammu & Kashmir',
      start: '2026-10-02',
      end: '2026-10-18',
      daysLeft: 13,
      status: 'Live',
      emd: 96000,
      value: 4800000,
      mse: 'NO',
      location: '180001, Jammu & Kashmir Frontier BSF Camp, Paloura',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8094520',
      item: 'Prefab shelters with PUF panel (7.62m x 13.27m) for Extreme Altitude',
      category: 'Prefab Shelters',
      qty: '24 Units',
      department: 'Assam Rifles',
      branch: 'MANIPUR',
      state: 'Manipur',
      start: '2026-09-28',
      end: '2026-10-08',
      daysLeft: 3,
      status: 'Live',
      emd: 240000,
      value: 8000000,
      mse: 'NO',
      location: '795001, HQ Inspector General Assam Rifles (South), Imphal',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8081290',
      item: 'Commercial 250 kVA Silent DG Set with Soundproof Acoustic Enclosure',
      category: 'DG Sets & Power Generation',
      qty: '8 Sets',
      department: 'Airports Authority of India',
      branch: 'ASSAM',
      state: 'Assam',
      start: '2026-10-01',
      end: '2026-10-14',
      daysLeft: 9,
      status: 'Live',
      emd: 130000,
      value: 6500000,
      mse: 'YES',
      location: '781015, LGBI International Airport, Guwahati',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8074129',
      item: 'Grid-Interactive Solar PV Plant 100 kW with 2V Tubular Battery Bank',
      category: 'Solar PV Systems',
      qty: '3 Plants',
      department: 'Defence Research and Development Organisation (DRDO)',
      branch: 'DELHI',
      state: 'Delhi',
      start: '2026-09-25',
      end: '2026-10-07',
      daysLeft: 2,
      status: 'Live',
      emd: 225000,
      value: 11250000,
      mse: 'NO',
      location: '110054, DRDO Metcalfe House Complex, Civil Lines, Delhi',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8065412',
      item: 'Heavy Duty 5-Ton Diesel Industrial Forklift with Pneumatic Tyres',
      category: 'Cranes & Forklifts',
      qty: '6 Nos',
      department: 'GAIL (India) Limited',
      branch: 'MADHYA_PRADESH',
      state: 'Madhya Pradesh',
      start: '2026-09-30',
      end: '2026-10-21',
      daysLeft: 16,
      status: 'Live',
      emd: 168000,
      value: 8400000,
      mse: 'YES',
      location: '473110, GAIL Gas Complex, Vijaipur, Guna',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8051280',
      item: 'Punched Tape Concertina Coil (PTCC) & Galvanised Steel Barbed Wire',
      category: 'Perimeter Security & Fencing',
      qty: '15000 Mtrs',
      department: 'Central Reserve Police Force (CRPF)',
      branch: 'CHHATTISGARH',
      state: 'Chhattisgarh',
      start: '2026-10-03',
      end: '2026-10-15',
      daysLeft: 10,
      status: 'Live',
      emd: 95000,
      value: 4750000,
      mse: 'NO',
      location: '494001, CRPF Sector HQ, Jagdalpur, Bastar',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8041920',
      item: 'Commercial Reverse Osmosis (RO) Water Treatment Plant 5000 LPH',
      category: 'Water Treatment Plants (RO/WTP)',
      qty: '4 Units',
      department: 'All India Institute of Medical Sciences (AIIMS)',
      branch: 'UTTAR_PRADESH',
      state: 'Uttar Pradesh',
      start: '2026-09-29',
      end: '2026-10-06',
      daysLeft: 1,
      status: 'Live',
      emd: 72000,
      value: 3600000,
      mse: 'YES',
      location: '273015, AIIMS Medical College Campus, Gorakhpur',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8038910',
      item: 'Rugged Body Worn Audio-Video Camera with GPS & 4G Live Telemetry',
      category: 'CCTV & Surveillance',
      qty: '300 Nos',
      department: 'Delhi Police',
      branch: 'DELHI',
      state: 'Delhi',
      start: '2026-10-01',
      end: '2026-10-19',
      daysLeft: 14,
      status: 'Live',
      emd: 180000,
      value: 9000000,
      mse: 'NO',
      location: '110002, Police Headquarters, Jai Singh Road, New Delhi',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8029145',
      item: 'High-Tension XLPE Underground Power Cables 11kV Grade 3-Core 300 sq.mm',
      category: 'Cables & Electrical',
      qty: '8000 Mtrs',
      department: 'Border Road Organisation',
      branch: 'LADAKH',
      state: 'Ladakh',
      start: '2026-09-27',
      end: '2026-10-08',
      daysLeft: 3,
      status: 'Live',
      emd: 280000,
      value: 14000000,
      mse: 'NO',
      location: '194101, Project HIMANK, Leh-Ladakh Base Camp',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    {
      bidNo: 'GEM/2026/B/8017654',
      item: 'Commercial Kitchen Induction Range & Automated Chapati Making Machines',
      category: 'Commercial Kitchen & Appliances',
      qty: '12 Systems',
      department: 'Indo-Tibetan Border Police (ITBP)',
      branch: 'UTTARAKHAND',
      state: 'Uttarakhand',
      start: '2026-10-02',
      end: '2026-10-22',
      daysLeft: 17,
      status: 'Live',
      emd: 85000,
      value: 4250000,
      mse: 'YES',
      location: '249001, ITBP 8th Battalion Camp, Gauchar, Chamoli',
      l1Name: '', l1Rate: '', l1Brand: '',
      l2Name: '', l2Rate: '', l3Name: '', l3Rate: '',
      statusOfBid: 'Live', statusView: '-'
    },
    // PAST AWARDED (AOC) / RESULT TENDERS WITH L1/L2/L3 INTELLIGENCE
    {
      bidNo: 'GEM/2026/B/7981120',
      item: 'Industrial Skid Steer Loader with Hydraulic Breaker Attachment',
      category: 'Cranes & Forklifts',
      qty: '5 Units',
      department: 'Indian Army',
      branch: 'PUNJAB',
      state: 'Punjab',
      start: '2026-08-10',
      end: '2026-08-25',
      daysLeft: -41,
      status: 'Expire',
      emd: 150000,
      value: 7500000,
      mse: 'NO',
      location: '143001, Cantonment Board Station, Amritsar',
      l1Name: 'JCB Construction Equipment India Pvt Ltd',
      l1Rate: '₹68,40,000',
      l1Brand: 'Make: JCB / Model: Robot 135 HD',
      l2Name: 'Action Construction Equipment Ltd',
      l2Rate: '₹71,20,000',
      l3Name: 'BEML Earth Movers Consortium',
      l3Rate: '₹74,50,000',
      statusOfBid: 'Bid Awarded (AOC)',
      statusView: '28-Aug-2026'
    },
    {
      bidNo: 'GEM/2026/B/7954432',
      item: 'Uncooled Handheld Thermal Imaging Sight (HHTI) with Laser Range Finder',
      category: 'Defense & Surveillance Optics',
      qty: '40 Nos',
      department: 'National Security Guard (NSG)',
      branch: 'HARYANA',
      state: 'Haryana',
      start: '2026-08-05',
      end: '2026-08-20',
      daysLeft: -46,
      status: 'Expire',
      emd: 360000,
      value: 18000000,
      mse: 'NO',
      location: '122051, NSG Garrison Complex, Manesar, Gurugram',
      l1Name: 'Bharat Electronics Limited (BEL)',
      l1Rate: '₹1,56,80,000',
      l1Brand: 'Make: BEL Optronics / Model: TI-EyeSight Mk3',
      l2Name: 'Tata Advanced Systems Limited',
      l2Rate: '₹1,64,00,000',
      l3Name: 'Zen Technologies Defence Corp',
      l3Rate: '₹1,72,50,000',
      statusOfBid: 'Bid Awarded (AOC)',
      statusView: '24-Aug-2026'
    },
    {
      bidNo: 'GEM/2026/B/7921890',
      item: 'Heavy Duty Sewer Suction and Jetting Machine mounted on 16T Truck Chassis',
      category: 'Municipal & Sanitation Equipment',
      qty: '4 Nos',
      department: 'Municipal Corporation of Greater Mumbai',
      branch: 'MAHARASHTRA',
      state: 'Maharashtra',
      start: '2026-07-20',
      end: '2026-08-10',
      daysLeft: -56,
      status: 'Expire',
      emd: 190000,
      value: 9500000,
      mse: 'YES',
      location: '400001, MCGM Engineering Depot, Worli, Mumbai',
      l1Name: 'CleanTech Engineering Utilities LLP',
      l1Rate: '₹84,50,000',
      l1Brand: 'Make: Ashok Leyland / Model: SuperJet 9000',
      l2Name: 'TPS Infrastructure Ltd',
      l2Rate: '₹89,20,000',
      l3Name: 'Maniar & Company Sanitation',
      l3Rate: '₹93,80,000',
      statusOfBid: 'Bid Awarded (AOC)',
      statusView: '15-Aug-2026'
    },
    {
      bidNo: 'GEM/2026/B/7892341',
      item: 'Commercial LED Street Light Fixtures 120W Pressure Die-Cast Aluminum',
      category: 'Cables & Electrical',
      qty: '1200 Sets',
      department: 'Navodaya Vidyalaya Samiti',
      branch: 'RAJASTHAN',
      state: 'Rajasthan',
      start: '2026-08-12',
      end: '2026-08-28',
      daysLeft: -38,
      status: 'Expire',
      emd: 65000,
      value: 3250000,
      mse: 'YES',
      location: '302001, NVS Regional Office, Bajaj Nagar, Jaipur',
      l1Name: 'Havells India Lighting Division',
      l1Rate: '₹27,80,000',
      l1Brand: 'Make: Havells / Model: Endura CityLux 120',
      l2Name: 'Surya Roshni Limited',
      l2Rate: '₹29,40,000',
      l3Name: 'Bajaj Electricals Ltd',
      l3Rate: '₹31,00,000',
      statusOfBid: 'Bid Awarded (AOC)',
      statusView: '01-Sep-2026'
    },
    {
      bidNo: 'GEM/2026/B/7864321',
      item: 'Automated Micro-UAV Surveillance Drone Quadcopter with Encrypted Link',
      category: 'Defense & Surveillance Optics',
      qty: '10 Systems',
      department: 'National Investigation Agency (NIA)',
      branch: 'DELHI',
      state: 'Delhi',
      start: '2026-08-15',
      end: '2026-09-02',
      daysLeft: -33,
      status: 'Expire',
      emd: 250000,
      value: 12500000,
      mse: 'NO',
      location: '110003, NIA Headquarters, CGO Complex, Lodhi Road, New Delhi',
      l1Name: 'ideaForge Technology Limited',
      l1Rate: '₹1,09,50,000',
      l1Brand: 'Make: ideaForge / Model: SWITCH Recon UAV',
      l2Name: 'Garuda Aerospace Pvt Ltd',
      l2Rate: '₹1,18,00,000',
      l3Name: 'Asteria Aerospace Limited',
      l3Rate: '₹1,24,00,000',
      statusOfBid: 'Bid Awarded (AOC)',
      statusView: '08-Sep-2026'
    }
  ];

  // Active navigation & filter state
  window.tccActiveScope = { type: 'all', key: 'ALL' };
  window.tccActiveChip = null;
  window.tccSortKey = 'start';
  window.tccSortDir = -1; // Newest first

  // RENDER TICKER BAR
  window.tccRenderTicker = function() {
    const tickerTrack = document.getElementById('tccTickerMove');
    const branchFilter = document.getElementById('tccTickerBranchFilter')?.value || '';
    const sortVal = document.getElementById('tccTickerSort')?.value || 'newest';

    if (!tickerTrack) return;

    // Populate branch select once if needed
    const branchSelect = document.getElementById('tccTickerBranchFilter');
    if (branchSelect && branchSelect.options.length <= 1) {
      const branches = [...new Set(window.TCC_DATA.map(d => d.state))].sort();
      branches.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b;
        opt.textContent = b;
        branchSelect.appendChild(opt);
      });
    }

    let items = window.TCC_DATA.slice();
    if (branchFilter) {
      items = items.filter(d => d.state === branchFilter);
    }

    if (sortVal === 'valueHigh') {
      items.sort((a, b) => b.value - a.value);
    } else if (sortVal === 'valueLow') {
      items.sort((a, b) => a.value - b.value);
    } else {
      items.sort((a, b) => new Date(b.start) - new Date(a.start));
    }

    const html = items.map((t, idx) => `
      <span onclick="tccOpenDetailByBid('${t.bidNo}')" title="Click for details">
        <b>${t.department}</b> &middot; ${t.bidNo} &middot; ${(t.item.length > 45 ? t.item.slice(0, 45) + '…' : t.item)} &middot; ₹${(t.value / 100000).toFixed(1)}L
      </span>
    `).join('');

    tickerTrack.innerHTML = html + html; // duplicate for seamless marquee loop
  };

  // GLOBAL SEARCH (MODE VIEW)
  window.tccOnGlobalSearch = function() {
    const input = document.getElementById('tccGlobalSearchInput');
    const dropdown = document.getElementById('tccGlobalSearchDropdown');
    if (!input || !dropdown) return;

    const q = input.value.trim().toLowerCase();
    if (!q) {
      dropdown.style.display = 'none';
      return;
    }

    const matches = [];
    window.TCC_DATA.forEach((item, idx) => {
      const hay = `${item.bidNo} ${item.item} ${item.department} ${item.state} ${item.category}`.toLowerCase();
      if (hay.includes(q)) {
        matches.push(item);
      }
    });

    if (!matches.length) {
      dropdown.innerHTML = `<div class="tcc-search-opt" style="cursor:default; color:#888;">No matching tenders found</div>`;
      dropdown.style.display = 'block';
      return;
    }

    dropdown.innerHTML = matches.slice(0, 8).map(m => `
      <div class="tcc-search-opt" onclick="tccOpenDetailByBid('${m.bidNo}')">
        <div>
          <strong style="color:var(--tcc-navy); font-size:0.85rem;">${m.bidNo}</strong>
          <div style="font-size:0.82rem; color:#444;">${m.item.slice(0, 60)}${m.item.length > 60 ? '...' : ''}</div>
        </div>
        <span style="font-size:0.75rem; color:#888; font-weight:600;">${m.department.slice(0, 20)}</span>
      </div>
    `).join('');
    dropdown.style.display = 'block';
  };

  document.addEventListener('click', (e) => {
    const searchWrap = document.getElementById('tccGlobalSearchDropdown');
    const searchInput = document.getElementById('tccGlobalSearchInput');
    if (searchWrap && !searchWrap.contains(e.target) && e.target !== searchInput) {
      searchWrap.style.display = 'none';
    }
  });

  // NAVIGATION MODES
  window.tccShowModeView = function() {
    document.querySelectorAll('.tcc-view-panel').forEach(p => p.style.display = 'none');
    document.getElementById('tccModeView').style.display = 'block';
  };

  window.tccShowStates = function() {
    document.querySelectorAll('.tcc-view-panel').forEach(p => p.style.display = 'none');
    const stateView = document.getElementById('tccStateView');
    stateView.style.display = 'block';

    const grid = document.getElementById('tccStateGrid');
    const stateMap = {};
    window.TCC_DATA.forEach(d => {
      stateMap[d.state] = stateMap[d.state] || { live: 0, urgent: 0, items: [] };
      if (d.status === 'Live') {
        stateMap[d.state].live++;
        if (d.daysLeft <= 3 && d.daysLeft >= 0) stateMap[d.state].urgent++;
      }
      stateMap[d.state].items.push(d);
    });

    const states = Object.keys(stateMap).sort();
    grid.innerHTML = states.map((st, i) => {
      const data = stateMap[st];
      return `
        <div class="tcc-branch-card" onclick="tccOpenTable('state', '${st}')">
          <span class="tcc-card-arrow">&#8594;</span>
          <div class="tcc-bname">${i + 1}. ${st}</div>
          <div class="tcc-bcount">${data.live}</div>
          <div class="tcc-blabel">Live Bids &middot; ${data.urgent} closing &le;3d</div>
          <div style="font-size:0.75rem; margin-top:8px; opacity:0.8;">Sample: ${data.items[0]?.department || 'Defense'}</div>
        </div>
      `;
    }).join('');
  };

  window.tccShowDepts = function() {
    document.querySelectorAll('.tcc-view-panel').forEach(p => p.style.display = 'none');
    const deptView = document.getElementById('tccDeptView');
    deptView.style.display = 'block';

    const grid = document.getElementById('tccDeptGrid');
    const deptMap = {};
    window.TCC_DATA.forEach(d => {
      deptMap[d.department] = deptMap[d.department] || { live: 0, urgent: 0, total: 0 };
      deptMap[d.department].total++;
      if (d.status === 'Live') {
        deptMap[d.department].live++;
        if (d.daysLeft <= 3 && d.daysLeft >= 0) deptMap[d.department].urgent++;
      }
    });

    const depts = Object.keys(deptMap).sort();
    grid.innerHTML = depts.map((dp, i) => {
      const data = deptMap[dp];
      return `
        <div class="tcc-branch-card" onclick="tccOpenTable('dept', '${dp}')">
          <span class="tcc-card-arrow">&#8594;</span>
          <div class="tcc-bname">${dp}</div>
          <div class="tcc-bcount">${data.live}</div>
          <div class="tcc-blabel">Live Tenders &middot; ${data.urgent} closing &le;3d</div>
          <div style="font-size:0.75rem; margin-top:8px; opacity:0.8;">${data.total} Total Bids Tracked</div>
        </div>
      `;
    }).join('');
  };

  window.tccShowCategories = function() {
    document.querySelectorAll('.tcc-view-panel').forEach(p => p.style.display = 'none');
    const catView = document.getElementById('tccCategoryView');
    catView.style.display = 'block';

    const grid = document.getElementById('tccCatGrid');
    const catMap = {};
    window.TCC_DATA.forEach(d => {
      catMap[d.category] = catMap[d.category] || { count: 0, live: 0 };
      catMap[d.category].count++;
      if (d.status === 'Live') catMap[d.category].live++;
    });

    const cats = Object.keys(catMap).sort();
    grid.innerHTML = cats.map(cat => {
      const c = catMap[cat];
      return `
        <div class="tcc-branch-card" onclick="tccOpenTable('category', '${cat}')">
          <span class="tcc-card-arrow">&#8594;</span>
          <div class="tcc-bname">${cat}</div>
          <div class="tcc-bcount">${c.live}</div>
          <div class="tcc-blabel">Live Procurement Tenders</div>
          <div style="font-size:0.75rem; margin-top:8px; opacity:0.8;">Automated Taxonomy Mapping</div>
        </div>
      `;
    }).join('');
  };

  window.tccShowOthers = function() {
    document.querySelectorAll('.tcc-view-panel').forEach(p => p.style.display = 'none');
    const othersView = document.getElementById('tccOthersView');
    othersView.style.display = 'block';

    const grid = document.getElementById('tccOthersGrid');
    const othersList = ['GAIL (India) Limited', 'Airports Authority of India', 'All India Institute of Medical Sciences (AIIMS)', 'Navodaya Vidyalaya Samiti'];
    grid.innerHTML = othersList.map(name => {
      const bids = window.TCC_DATA.filter(d => d.department.includes(name) || name.includes(d.department));
      return `
        <div class="tcc-branch-card" onclick="tccOpenTable('dept', '${name}')">
          <span class="tcc-card-arrow">&#8594;</span>
          <div class="tcc-bname">${name}</div>
          <div class="tcc-bcount">${bids.length}</div>
          <div class="tcc-blabel">Active / Tracked PSUs</div>
          <div style="font-size:0.75rem; margin-top:8px; opacity:0.8;">Special Public Sector Undertaking</div>
        </div>
      `;
    }).join('');
  };

  window.tccShowResults = function() {
    document.querySelectorAll('.tcc-view-panel').forEach(p => p.style.display = 'none');
    const resView = document.getElementById('tccResultsView');
    resView.style.display = 'block';

    const grid = document.getElementById('tccResultsGrid');
    const awarded = window.TCC_DATA.filter(d => d.l1Name && d.l1Rate);

    grid.innerHTML = awarded.map(d => `
      <div class="tcc-branch-card" onclick="tccOpenDetailByBid('${d.bidNo}')" style="min-height:190px;">
        <span class="tcc-card-arrow">&#8594;</span>
        <div class="tcc-bname">${d.bidNo}</div>
        <div style="font-size:0.82rem; font-weight:700; color:var(--tcc-teal); margin-top:4px;">${d.category}</div>
        <div style="margin-top:10px; font-size:0.85rem; line-height:1.4;">
          <strong>L1 Winner:</strong> ${d.l1Name}<br>
          <strong>Awarded Rate:</strong> <span style="color:#C5221F; font-weight:800;">${d.l1Rate}</span><br>
          <small style="color:#666;">${d.l1Brand || 'OEM Specs verified'}</small>
        </div>
      </div>
    `).join('');
  };

  // GRID FILTER HELPER
  window.tccFilterGrid = function(gridId, inputId) {
    const q = document.getElementById(inputId)?.value.trim().toLowerCase();
    const cards = document.querySelectorAll(`#${gridId} .tcc-branch-card`);
    cards.forEach(c => {
      const text = c.textContent.toLowerCase();
      c.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
    });
  };

  // OPEN TABLE VIEW
  window.tccOpenTable = function(scopeType, scopeKey) {
    window.tccActiveScope = { type: scopeType, key: scopeKey };
    document.querySelectorAll('.tcc-view-panel').forEach(p => p.style.display = 'none');
    const detailView = document.getElementById('tccDetailView');
    detailView.style.display = 'block';

    const titleEl = document.getElementById('tccDetailTitle');
    if (scopeKey === 'ALL') {
      titleEl.textContent = `All Tenders Listing (${scopeType.toUpperCase()})`;
    } else {
      titleEl.textContent = `Tenders Listing — ${scopeKey}`;
    }

    tccApplyFilters();
  };

  window.tccBackFromDetailView = function() {
    const { type } = window.tccActiveScope;
    if (type === 'state') tccShowStates();
    else if (type === 'dept') tccShowDepts();
    else if (type === 'category') tccShowCategories();
    else if (type === 'others') tccShowOthers();
    else if (type === 'results') tccShowResults();
    else tccShowModeView();
  };

  window.tccQuickLiveFilter = function() {
    tccOpenTable('all', 'ALL');
    document.getElementById('tccFilterDays').value = '3';
    document.getElementById('tccFilterStatus').value = 'Live';
    tccApplyFilters();
  };

  // TABLE FILTERING & SORTING
  window.tccApplyFilters = function() {
    const searchVal = document.getElementById('tccFilterSearch')?.value.trim().toLowerCase() || '';
    const statusVal = document.getElementById('tccFilterStatus')?.value || 'all';
    const daysVal = document.getElementById('tccFilterDays')?.value || 'all';
    const minVal = parseFloat(document.getElementById('tccFilterValue')?.value || '0');
    const mseVal = document.getElementById('tccFilterMse')?.value || 'all';

    let list = window.TCC_DATA.slice();
    const { type, key } = window.tccActiveScope;

    // Scope filtering
    if (key !== 'ALL') {
      if (type === 'state') list = list.filter(d => d.state === key || d.branch === key);
      else if (type === 'dept') list = list.filter(d => d.department.includes(key) || key.includes(d.department));
      else if (type === 'category') list = list.filter(d => d.category === key);
      else if (type === 'others') list = list.filter(d => d.department.includes(key) || key.includes(d.department));
      else if (type === 'results') list = list.filter(d => d.l1Name && d.l1Rate);
    }

    // Input search
    if (searchVal) {
      list = list.filter(d => {
        const full = `${d.bidNo} ${d.item} ${d.department} ${d.state} ${d.location}`.toLowerCase();
        return full.includes(searchVal);
      });
    }

    // Status filter
    if (statusVal !== 'all') {
      list = list.filter(d => d.status === statusVal);
    }

    // Days Left filter
    if (daysVal !== 'all') {
      const maxDays = parseInt(daysVal, 10);
      list = list.filter(d => d.daysLeft >= 0 && d.daysLeft <= maxDays);
    }

    // Min Value filter
    if (minVal > 0) {
      list = list.filter(d => d.value >= minVal);
    }

    // MSE filter
    if (mseVal !== 'all') {
      list = list.filter(d => d.mse === mseVal);
    }

    // Quick Chip filters
    if (window.tccActiveChip === 'urgent') {
      list = list.filter(d => d.daysLeft >= 0 && d.daysLeft <= 3);
    } else if (window.tccActiveChip === 'week') {
      list = list.filter(d => d.daysLeft >= 0 && d.daysLeft <= 7);
    } else if (window.tccActiveChip === 'live') {
      list = list.filter(d => d.status === 'Live');
    } else if (window.tccActiveChip === 'highval') {
      list = list.filter(d => d.value >= 1000000);
    }

    // Sort list
    list.sort((a, b) => {
      let valA = a[window.tccSortKey];
      let valB = b[window.tccSortKey];

      if (window.tccSortKey === 'start' || window.tccSortKey === 'end') {
        valA = new Date(valA || '1970-01-01');
        valB = new Date(valB || '1970-01-01');
      }

      if (typeof valA === 'string') {
        return valA.localeCompare(valB) * window.tccSortDir;
      }
      return (valA - valB) * window.tccSortDir;
    });

    window.tccRenderTable(list);
  };

  window.tccToggleChip = function(chipKey) {
    const chips = document.querySelectorAll('.tcc-chip');
    if (window.tccActiveChip === chipKey) {
      window.tccActiveChip = null;
      chips.forEach(c => c.classList.remove('active'));
    } else {
      window.tccActiveChip = chipKey;
      chips.forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-chip') === chipKey);
      });
    }
    tccApplyFilters();
  };

  window.tccResetFilters = function() {
    document.getElementById('tccFilterSearch').value = '';
    document.getElementById('tccFilterStatus').value = 'all';
    document.getElementById('tccFilterDays').value = 'all';
    document.getElementById('tccFilterValue').value = '0';
    document.getElementById('tccFilterMse').value = 'all';
    window.tccActiveChip = null;
    document.querySelectorAll('.tcc-chip').forEach(c => c.classList.remove('active'));
    tccApplyFilters();
  };

  window.tccSortTable = function(colKey) {
    if (window.tccSortKey === colKey) {
      window.tccSortDir = window.tccSortDir * -1;
    } else {
      window.tccSortKey = colKey;
      window.tccSortDir = 1;
    }
    tccApplyFilters();
  };

  window.tccRenderTable = function(rows) {
    const tbody = document.getElementById('tccTableBody');
    const emptyState = document.getElementById('tccEmptyState');
    const countEl = document.getElementById('tccResultsCount');

    if (!tbody) return;

    countEl.textContent = `${rows.length} result${rows.length === 1 ? '' : 's'}`;

    if (!rows.length) {
      tbody.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    tbody.innerHTML = rows.map((r, i) => {
      const daysClass = r.daysLeft <= 3 && r.daysLeft >= 0 ? 'days-crit' : (r.daysLeft <= 7 && r.daysLeft >= 0 ? 'days-warn' : 'days-ok');
      const daysText = r.daysLeft < 0 ? 'Closed' : `${r.daysLeft}d`;
      const statusBadge = r.status === 'Live' ? '<span class="tcc-badge badge-live">Live</span>' : '<span class="tcc-badge badge-expire">Awarded</span>';

      return `
        <tr class="tcc-row" onclick="tccOpenDetailByBid('${r.bidNo}')">
          <td style="font-weight:700; color:#888;">${i + 1}</td>
          <td class="tcc-bid-col">${r.bidNo}</td>
          <td class="tcc-item-col" title="${r.item}">
            ${r.item}
            <div style="font-size:0.75rem; color:var(--tcc-teal); font-weight:700; text-transform:uppercase; margin-top:2px;">${r.category}</div>
          </td>
          <td class="tcc-num-col">${r.qty}</td>
          <td>${r.department}</td>
          <td>${r.state}</td>
          <td class="tcc-num-col">${r.start}</td>
          <td class="tcc-num-col">${r.end}</td>
          <td><span class="tcc-days-pill ${daysClass}">${daysText}</span></td>
          <td>${statusBadge}</td>
          <td class="tcc-num-col">₹${r.emd.toLocaleString('en-IN')}</td>
          <td class="tcc-num-col" style="font-weight:800; color:var(--tcc-navy);">₹${r.value.toLocaleString('en-IN')}</td>
          <td>${r.mse}</td>
          <td class="tcc-loc-col" title="${r.location}">${r.location}</td>
        </tr>
      `;
    }).join('');
  };

  // DETAIL MODAL (ROW CLICK)
  window.tccOpenDetailByBid = function(bidNo) {
    const tender = window.TCC_DATA.find(d => d.bidNo === bidNo);
    if (!tender) return;

    document.getElementById('tccModalBidNo').textContent = tender.bidNo;
    document.getElementById('tccModalItemTitle').textContent = tender.item;
    document.getElementById('tccModalValue').textContent = `₹${tender.value.toLocaleString('en-IN')}`;
    document.getElementById('tccModalEmd').textContent = tender.emd ? `₹${tender.emd.toLocaleString('en-IN')}` : 'N/A';
    document.getElementById('tccModalQty').textContent = tender.qty;
    document.getElementById('tccModalDays').textContent = tender.daysLeft >= 0 ? `${tender.daysLeft} Days` : 'Closed / Awarded';
    document.getElementById('tccModalDept').textContent = tender.department;
    document.getElementById('tccModalBranch').textContent = tender.branch;
    document.getElementById('tccModalDates').textContent = `${tender.start} to ${tender.end}`;
    document.getElementById('tccModalMse').textContent = tender.mse;
    document.getElementById('tccModalLocation').textContent = tender.location;

    const resultsRow = document.getElementById('tccResultsRow');
    const resultsVal = document.getElementById('tccModalResultsVal');
    if (tender.l1Name && tender.l1Rate) {
      resultsRow.style.display = 'flex';
      resultsVal.innerHTML = `<strong>${tender.l1Name}</strong> (${tender.l1Rate}) &middot; <small>${tender.l1Brand || 'Verified Specs'}</small>`;
    } else {
      resultsRow.style.display = 'none';
    }

    document.getElementById('tccDetailModalOverlay').classList.add('open');
  };

  window.tccCloseDetailModal = function() {
    document.getElementById('tccDetailModalOverlay').classList.remove('open');
  };

  // PDF EXPORT PREVIEW
  window.tccOpenPdfModal = function() {
    document.getElementById('tccPdfModalOverlay').classList.add('open');
  };

  window.tccClosePdfModal = function() {
    document.getElementById('tccPdfModalOverlay').classList.remove('open');
  };

  window.tccGeneratePdf = function(sortMode) {
    tccClosePdfModal();
    let exportRows = window.TCC_DATA.slice();

    if (sortMode === 'value') {
      exportRows.sort((a, b) => b.value - a.value);
    } else if (sortMode === 'dept') {
      exportRows.sort((a, b) => a.department.localeCompare(b.department));
    } else {
      exportRows.sort((a, b) => new Date(b.start) - new Date(a.start));
    }

    const reportDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const liveCount = exportRows.filter(r => r.status === 'Live').length;

    const rowsHtml = exportRows.map((r, i) => `
      <tr>
        <td style="text-align:center;">${i + 1}</td>
        <td style="font-family:monospace; font-weight:bold; font-size:10px;">${r.bidNo}</td>
        <td><strong>${r.item}</strong><br><small style="color:#0E7C7B;">${r.category}</small></td>
        <td style="text-align:center;">${r.qty}</td>
        <td>${r.department}</td>
        <td>${r.state}</td>
        <td style="text-align:center;">${r.start}</td>
        <td style="text-align:center;">${r.end}</td>
        <td style="text-align:center; font-weight:bold; color:${r.status === 'Live' ? '#177A43' : '#C5221F'};">${r.status}</td>
        <td style="text-align:right; font-family:monospace;">₹${r.emd.toLocaleString('en-IN')}</td>
        <td style="text-align:right; font-family:monospace; font-weight:bold;">₹${r.value.toLocaleString('en-IN')}</td>
        <td style="font-size:10px;">${r.location}</td>
      </tr>
    `).join('');

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Please allow popups to preview the printable PDF report.');
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>GovTender IQ — Executive Tender Audit Report</title>
        <meta charset="UTF-8">
        <style>
          @page { size: A4 landscape; margin: 8mm; }
          body { font-family: Arial, sans-serif; color: #1B2A4A; margin: 0; padding: 10px; }
          .hdr { border-bottom: 3px solid #1B2A4A; padding-bottom: 8px; margin-bottom: 12px; display:flex; justify-content:space-between; align-items:flex-end; }
          .hdr h1 { margin: 0; font-size: 20px; font-weight: 800; color: #1B2A4A; }
          .hdr .meta { font-size: 12px; color: #64708A; }
          .live-badge { background: #EAF7F1; color: #177A43; font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 11px; }
          table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
          th { background: #1B2A4A; color: #fff; padding: 6px; text-align: left; font-size: 10px; text-transform: uppercase; }
          td { padding: 5px 6px; border: 1px solid #D5DCEA; vertical-align: top; }
          tr:nth-child(even) td { background: #F6F7FA; }
          .foot { margin-top: 14px; font-size: 11px; color: #888; text-align: right; }
          .noprint { text-align: center; margin-bottom: 14px; }
          .noprint button { background: #0E7C7B; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; }
          @media print { .noprint { display: none; } }
        </style>
      </head>
      <body>
        <div class="noprint">
          <button onclick="window.print()">🖨️ Print or Save as PDF</button>
        </div>
        <div class="hdr">
          <div>
            <h1>GovTender IQ — Executive Procurement & Bid Audit Report</h1>
            <div class="meta">Sorted: ${sortMode.toUpperCase()} &middot; Generated: ${reportDate} &middot; Total Tracked: ${exportRows.length} &middot; <span class="live-badge">${liveCount} LIVE BIDS</span></div>
          </div>
          <div style="text-align:right; font-size:11px; color:#64708A;">
            <strong>Confidentiality Status:</strong> Public Data Sanitized<br>
            <strong>System:</strong> Tender Command Center
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Bid Number</th>
              <th>Item / Equipment Category</th>
              <th>Qty</th>
              <th>Department</th>
              <th>Location</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>EMD (₹)</th>
              <th>Tender Value (₹)</th>
              <th>Delivery Site</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>

        <div class="foot">
          GovTender IQ &middot; Autonomous Procurement & GeM Intelligence Platform &middot; Confidential Client Implementation
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
  };
}

/* ==========================================================================
   12. GOVTENDER OPERATIONS PRO: BID LIFECYCLE & TEAM WORKFLOW SIMULATION
   ========================================================================== */
function initTenderOpsDemo() {
  const opsModal = document.getElementById('tender-ops-modal');
  const launchBtn = document.getElementById('launch-tender-ops-btn');
  const closeBtn = document.getElementById('ops-close-modal-btn');

  if (!opsModal) return;

  // Open & Close Handlers
  launchBtn?.addEventListener('click', () => {
    opsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    opsInitData();
    showToast('GovTender Operations PRO launched (Team Workflow & SLA Demo)');
  });

  closeBtn?.addEventListener('click', () => {
    opsModal.classList.remove('open');
    document.body.style.overflow = '';
  });

  // DATASET: Active Bids across Team Handlers (19 Active Bids, 2 Overdue)
  window.OPS_BIDS = [
    {
      bidNo: 'GEM/2026/B/8016838',
      item: 'Truck Mounted Suction Machine (V2) (Q2)',
      branch: 'Municipal Corporation (MAHARASHTRA)',
      qty: '2 Nos',
      end: '2026-10-03',
      val: '₹48,00,000',
      emd: '₹96,000',
      from: 'L89',
      by: 'BISWA',
      status: 'WORKING',
      progress: 35,
      month: 'SEP 2026',
      overdue: true,
      overdueDays: 2,
      workDone: '[03-Oct 14:20] Biswajit (35%): Chassis dimension specs verified with OEM engineer.',
      pending: '1. OEM authorization letter pending.\n2. Final price schedule review.'
    },
    {
      bidNo: 'GEM/2026/B/8017278',
      item: 'Truck Mounted Suction Machine (V2) (Q2) – 1500 L Tank',
      branch: 'Urban Development Dept (GUJARAT)',
      qty: '4 Nos',
      end: '2026-10-03',
      val: '₹72,00,000',
      emd: '₹1,44,000',
      from: 'Q0',
      by: 'Jatin',
      status: 'WORKING',
      progress: 40,
      month: 'SEP 2026',
      overdue: true,
      overdueDays: 2,
      workDone: '[03-Oct 15:45] Jatin (40%): Commercial eligibility check completed. EMD format prepared.',
      pending: '1. Awaiting management signoff on bank guarantee.\n2. Clarification on delivery timeline.'
    },
    {
      bidNo: 'GEM/2026/B/7495565',
      item: 'FIRE ENTRY SUITE Extreme Temperature Grade',
      branch: 'Assam Rifles (MANIPUR)',
      qty: '172 Units',
      end: '01-06-2026 12:00',
      val: '₹15,41,48,100',
      emd: '₹4,62,443',
      from: 'L89',
      by: 'BISWA',
      status: 'SUBMITTED',
      progress: 100,
      month: 'JUN 2026',
      overdue: false,
      workDone: '[01-Jun 11:30] Biswajit (100%): Technical & Financial envelope successfully uploaded and locked.',
      pending: 'None (Bid Submitted & Acknowledged)'
    },
    {
      bidNo: 'GEM/2026/B/7541934',
      item: 'Machinery Items - Hydraulic Heavy Drill Units',
      branch: 'Assam Rifles (ASSAM)',
      qty: '72 Sets',
      end: '08-06-2026 15:00',
      val: '₹72,00,000',
      emd: '₹6,94,290',
      from: 'L89',
      by: 'Jatin',
      status: 'SUBMITTED',
      progress: 100,
      month: 'JUN 2026',
      overdue: false,
      workDone: '[08-Jun 14:10] Jatin (100%): Submitted on GeM. Confirmation receipt archived in Drive.',
      pending: 'None (Bid Submitted)'
    },
    {
      bidNo: 'GEM/2026/B/7542500',
      item: 'Specialized Industrial Engineering Plant & Accessories',
      branch: 'Assam Rifles (NAGALAND)',
      qty: '77 Units',
      end: '08-06-2026 16:30',
      val: '₹68,00,000',
      emd: '₹6,48,120',
      from: 'L89',
      by: 'BISWA',
      status: 'IN_PROGRESS',
      progress: 70,
      month: 'JUN 2026',
      overdue: false,
      workDone: '[07-Jun 17:00] Biswajit (70%): OEM technical compliance checklist verified and uploaded to portal.',
      pending: '1. Commercial bid encryption key validation.'
    },
    {
      bidNo: 'GEM/2026/B/7551708',
      item: 'Air Curtain Heavy Commercial Grade (Q2)',
      branch: 'Assam Rifles (MEGHALAYA)',
      qty: '48 Nos',
      end: '09-06-2026 14:00',
      val: '₹20,00,000',
      emd: '₹60,000',
      from: 'Q0',
      by: 'Jatin',
      status: 'SUBMITTED',
      progress: 100,
      month: 'JUN 2026',
      overdue: false,
      workDone: '[09-Jun 13:15] Jatin (100%): Final submission completed with verified GST registration.',
      pending: 'None (Bid Submitted)'
    },
    {
      bidNo: 'GEM/2026/B/7821900',
      item: 'Specialised Tactical Body Armor & Plates',
      branch: 'Indian Army (JAMMU_AND_KASHMIR)',
      qty: '255 Sets',
      end: '06-07-2026 18:00',
      val: '₹64,00,000',
      emd: '₹1,92,000',
      from: 'L89',
      by: 'ADITYA',
      status: 'IN_PROGRESS',
      progress: 65,
      month: 'JUL 2026',
      overdue: false,
      workDone: '[05-Jul 16:20] Aditya (65%): Ballistic test certificates compiled. Technical compliance sheet ready.',
      pending: '1. OEM authorization letter signature from Bangalore unit.'
    },
    {
      bidNo: 'GEM/2026/B/7834510',
      item: 'Disaster Rescue Boats & Flood Inflatable Craft',
      branch: 'HQ NDRF, New Delhi (DELHI)',
      qty: '5000 Mtrs/Units',
      end: '09-07-2026 15:00',
      val: '₹1,05,00,000',
      emd: '₹3,15,000',
      from: 'L89',
      by: 'BISWA',
      status: 'SUBMITTED',
      progress: 100,
      month: 'JUL 2026',
      overdue: false,
      workDone: '[09-Jul 14:40] Biswajit (100%): EMD exemption applied under MSE quota. All 4 annexures uploaded.',
      pending: 'None (Bid Submitted)'
    },
    {
      bidNo: 'GEM/2026/B/8109920',
      item: 'High Altitude Mountaineering Gear & Extreme Survival Kits',
      branch: '29 PARA (SF), Indian Army (UTTARAKHAND)',
      qty: '32 Units',
      end: '04-09-2026 17:00',
      val: '₹10,50,00,000',
      emd: '₹24,00,000',
      from: 'L89',
      by: 'Dilpreet',
      status: 'SUBMITTED',
      progress: 100,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[04-Sep 15:20] Dilpreet (100%): High value tender (10.5 Cr) submitted with bank guarantee verification.',
      pending: 'None (Bid Submitted)'
    },
    {
      bidNo: 'GEM/2026/B/8122340',
      item: 'Commercial RO Water Purification Plant 5000 LPH',
      branch: 'AIIMS Medical College (UTTAR_PRADESH)',
      qty: '6 Units',
      end: '18-09-2026',
      val: '₹54,00,000',
      emd: '₹1,08,000',
      from: 'L89',
      by: 'Dilpreet',
      status: 'IN_PROGRESS',
      progress: 75,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[16-Sep 11:30] Dilpreet (75%): Water quality test report analysis completed. BOQ pricing approved.',
      pending: '1. Final submission pending MD signoff.'
    },
    {
      bidNo: 'GEM/2026/B/8133500',
      item: 'CCTV Video Analytics & NVR Server Array 128-Channel',
      branch: 'Delhi Police HQ (DELHI)',
      qty: '80 Sets',
      end: '22-09-2026',
      val: '₹76,00,000',
      emd: '₹1,52,000',
      from: 'Q0',
      by: 'ADITYA',
      status: 'IN_PROGRESS',
      progress: 60,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[20-Sep 14:15] Aditya (60%): BOQ item specifications cross-checked against GeM catalogue.',
      pending: '1. OEM MAC address documentation.\n2. Server delivery timeline verification.'
    },
    {
      bidNo: 'GEM/2026/B/8144210',
      item: 'Modular Prefab Shelters with High-Density PUF Panel',
      branch: 'ITBP Frontier Base (LADAKH)',
      qty: '15 Sets',
      end: '25-09-2026',
      val: '₹95,00,000',
      emd: '₹1,90,000',
      from: 'L89',
      by: 'Dilpreet',
      status: 'IN_PROGRESS',
      progress: 80,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[23-Sep 16:30] Dilpreet (80%): Insulation R-value certificates and structural drawings submitted.',
      pending: '1. Logistics freight cost validation for Leh transit.'
    },
    {
      bidNo: 'GEM/2026/B/8155980',
      item: 'Industrial Silent DG Set 250 kVA Soundproof Enclosure',
      branch: 'Airports Authority of India (ASSAM)',
      qty: '4 Nos',
      end: '28-09-2026',
      val: '₹42,00,000',
      emd: '₹84,000',
      from: 'Q0',
      by: 'ADITYA',
      status: 'WORKING',
      progress: 45,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[26-Sep 10:45] Aditya (45%): Emission compliance certificates (CPCB-IV) gathered.',
      pending: '1. Site installation cost estimation from Guwahati team.'
    },
    {
      bidNo: 'GEM/2026/B/8166740',
      item: 'High-Tension XLPE Underground Power Cables 11kV Grade',
      branch: 'Border Road Organisation (ARUNACHAL_PRADESH)',
      qty: '6000 Mtrs',
      end: '30-09-2026',
      val: '₹88,00,000',
      emd: '₹1,76,000',
      from: 'L89',
      by: 'BISWA',
      status: 'WORKING',
      progress: 50,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[28-Sep 12:15] Biswajit (50%): Conductor copper purity certification verified from test lab.',
      pending: '1. Armored reel transportation clearance.'
    },
    {
      bidNo: 'GEM/2026/B/8177430',
      item: 'Commercial Heavy Forklifts 5T Diesel Pneumatic',
      branch: 'GAIL India Gas Complex (MADHYA_PRADESH)',
      qty: '3 Nos',
      end: '02-10-2026',
      val: '₹38,00,000',
      emd: '₹76,00,000',
      from: 'L89',
      by: 'Dilpreet',
      status: 'SUBMITTED',
      progress: 100,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[02-Oct 11:00] Dilpreet (100%): Technical documentation & load capacity curves verified. Submitted.',
      pending: 'None (Bid Submitted)'
    },
    {
      bidNo: 'GEM/2026/B/8188120',
      item: 'Solar Street Light Fixtures 120W Integrated Lithium Battery',
      branch: 'Navodaya Vidyalaya Samiti (RAJASTHAN)',
      qty: '800 Sets',
      end: '05-10-2026',
      val: '₹28,00,000',
      emd: '₹56,000',
      from: 'Q0',
      by: 'ADITYA',
      status: 'WORKING',
      progress: 40,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[02-Oct 09:30] Aditya (40%): MNRE lab efficiency certificates verified.',
      pending: '1. Warranty bond schedule drafting.'
    },
    {
      bidNo: 'GEM/2026/B/8199340',
      item: 'Commercial Kitchen Automatic Steam Cookers 150L',
      branch: 'Central Reserve Police Force (CHHATTISGARH)',
      qty: '10 Systems',
      end: '08-10-2026',
      val: '₹35,00,000',
      emd: '₹70,000',
      from: 'L89',
      by: 'BISWA',
      status: 'WORKING',
      progress: 40,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[01-Oct 16:00] Biswajit (40%): Stainless steel grade SS304 test reports checked.',
      pending: '1. Commercial bid preparation.'
    },
    {
      bidNo: 'GEM/2026/B/8200110',
      item: 'Uncooled Handheld Thermal Imagers with Rangefinder',
      branch: 'National Security Guard (HARYANA)',
      qty: '12 Nos',
      end: '12-10-2026',
      val: '₹62,00,000',
      emd: '₹1,24,000',
      from: 'L89',
      by: 'ADITYA',
      status: 'WORKING',
      progress: 30,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[02-Oct 14:10] Aditya (30%): Optical magnification parameters analyzed.',
      pending: '1. OEM declaration from defense partner.'
    },
    {
      bidNo: 'GEM/2026/B/8211090',
      item: 'Automated Perimeter Electric Fence Energizer System',
      branch: 'BSF Sector HQ (PUNJAB)',
      qty: '4000 Mtrs',
      end: '15-10-2026',
      val: '₹46,00,000',
      emd: '₹92,000',
      from: 'L89',
      by: 'Dilpreet',
      status: 'WORKING',
      progress: 20,
      month: 'SEP 2026',
      overdue: false,
      workDone: '[02-Oct 17:30] Dilpreet (20%): Tender document read and qualification criteria checklist compiled.',
      pending: '1. Site inspection report review.\n2. EMD bank guarantee preparation.'
    }
  ];

  // REAL-TIME FEED OF TASKS LOGGED TODAY
  window.OPS_ACTIVITIES = [
    { time: '11:22', who: 'Biswajit', bid: 'GEM/2026/B/8166740', task: 'OEM technical compliance checklist verified and uploaded to portal', pct: 50 },
    { time: '10:45', who: 'Dilpreet', bid: 'GEM/2026/B/8177430', task: 'Technical documentation & load capacity curves verified. Submitted.', pct: 100 },
    { time: '10:10', who: 'Aditya', bid: 'GEM/2026/B/8133500', task: 'BOQ item specifications cross-checked against GeM catalogue', pct: 60 },
    { time: '09:30', who: 'Jatin', bid: 'GEM/2026/B/8017278', task: 'Commercial eligibility check completed. EMD format prepared.', pct: 40 },
    { time: '09:05', who: 'Biswajit', bid: 'GEM/2026/B/8016838', task: 'Chassis dimension specs verified with OEM engineer.', pct: 35 },
    { time: '08:40', who: 'Dilpreet', bid: 'GEM/2026/B/8144210', task: 'Insulation R-value certificates and structural drawings submitted.', pct: 80 },
    { time: '08:15', who: 'Aditya', bid: 'GEM/2026/B/8188120', task: 'MNRE lab efficiency certificates verified.', pct: 40 },
    { time: '07:50', who: 'Dilpreet', bid: 'GEM/2026/B/8211090', task: 'Tender document read and qualification criteria checklist compiled.', pct: 20 }
  ];

  window.opsSelectedHandler = null;
  window.opsCurrentView = 'cards';

  // INITIALIZE DATA VIEW
  window.opsInitData = function() {
    opsUpdateKpis();
    opsRenderActivityFeed();
    opsApplyFilters();
  };

  window.opsShowHomeView = function() {
    opsClearHandlerScope();
    document.querySelector('.ops-body-scroll').scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to executive dashboard overview');
  };

  // OVERDUE TOGGLE
  window.opsToggleOverdueList = function() {
    const list = document.getElementById('opsOverdueList');
    const btn = document.getElementById('opsOverdueToggleBtn');
    if (!list || !btn) return;
    const isHidden = list.style.display === 'none';
    list.style.display = isHidden ? 'flex' : 'none';
    btn.textContent = isHidden ? 'Hide' : 'Show';
  };

  // HANDLER WORKLOAD BAR FILTER
  window.opsFilterByHandler = function(handlerName) {
    window.opsSelectedHandler = handlerName;
    const banner = document.getElementById('opsActiveHandlerScope');
    const nameEl = document.getElementById('opsScopeHandlerName');
    if (banner && nameEl) {
      nameEl.textContent = handlerName;
      banner.style.display = 'flex';
    }
    opsApplyFilters();
    // Scroll down to content area
    document.getElementById('opsContentArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.opsClearHandlerScope = function() {
    window.opsSelectedHandler = null;
    const banner = document.getElementById('opsActiveHandlerScope');
    if (banner) banner.style.display = 'none';
    opsApplyFilters();
  };

  // SWITCH CARDS VS TABLE VIEW
  window.opsSwitchView = function(viewMode) {
    window.opsCurrentView = viewMode;
    const cardsBtn = document.getElementById('opsViewCardsBtn');
    const tableBtn = document.getElementById('opsViewTableBtn');
    const cardsGrid = document.getElementById('opsCardsGrid');
    const tableCont = document.getElementById('opsTableContainer');

    if (viewMode === 'cards') {
      cardsBtn.classList.add('active');
      tableBtn.classList.remove('active');
      cardsGrid.style.display = 'grid';
      tableCont.style.display = 'none';
    } else {
      tableBtn.classList.add('active');
      cardsBtn.classList.remove('active');
      cardsGrid.style.display = 'none';
      tableCont.style.display = 'block';
    }
    opsApplyFilters();
  };

  // APPLY SEARCH & FILTERS
  window.opsApplyFilters = function() {
    const searchVal = document.getElementById('opsSearchInput')?.value.trim().toLowerCase() || '';
    const monthVal = document.getElementById('opsMonthFilter')?.value || 'ALL';
    const statusVal = document.getElementById('opsStatusFilter')?.value || 'ALL';

    let list = window.OPS_BIDS.slice();

    if (window.opsSelectedHandler) {
      list = list.filter(b => b.by.toLowerCase() === window.opsSelectedHandler.toLowerCase());
    }

    if (monthVal !== 'ALL') {
      list = list.filter(b => b.month === monthVal);
    }

    if (statusVal !== 'ALL') {
      list = list.filter(b => b.status === statusVal);
    }

    if (searchVal) {
      list = list.filter(b => {
        const full = `${b.bidNo} ${b.item} ${b.branch} ${b.by}`.toLowerCase();
        return full.includes(searchVal);
      });
    }

    opsRenderCards(list);
    opsRenderTable(list);
  };

  // RENDER CARDS VIEW
  window.opsRenderCards = function(list) {
    const grid = document.getElementById('opsCardsGrid');
    if (!grid) return;

    if (!list.length) {
      grid.innerHTML = '<div style="grid-column:1/-1; padding:40px; text-align:center; color:#64748B;">No bids match the selected filters.</div>';
      return;
    }

    const PASTEL_COLORS = [
      '#eef2ff', '#fdf2f8', '#f0fdfa', '#fffbeb', '#faf5ff', '#f0f9ff'
    ];

    grid.innerHTML = list.map((b, i) => {
      const bg = PASTEL_COLORS[i % PASTEL_COLORS.length];
      const statusClass = b.status === 'SUBMITTED' ? 'status-submitted' : (b.status === 'IN_PROGRESS' ? 'status-progress' : (b.status === 'WORKING' ? 'status-working' : 'status-cancel'));
      const overdueBadge = b.overdue ? '<span class="ops-overdue-tag" style="margin-left:6px;">⚠️ 2d Overdue</span>' : '';

      return `
        <div class="ops-bid-card" style="background:${bg};">
          <div class="ops-c-top">
            <div style="flex:1; min-width:0;">
              <span class="ops-c-bid">${b.bidNo}</span>${overdueBadge}
              <div class="ops-c-item">${b.item}</div>
              <span class="ops-c-branch">🏢 ${b.branch}</span>
            </div>
            <span class="ops-badge-status ${statusClass}">${b.status}</span>
          </div>

          <!-- Progress Bar -->
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.74rem; font-weight:700; color:#475569; margin-bottom:4px;">
              <span>Progress: ${b.progress}%</span>
              <span>End: ${b.end}</span>
            </div>
            <div style="height:6px; background:rgba(0,0,0,0.08); border-radius:99px; overflow:hidden;">
              <div style="height:100%; width:${b.progress}%; background:linear-gradient(90deg, #10B981, #06B6D4); border-radius:99px;"></div>
            </div>
          </div>

          <div class="ops-c-grid">
            <div><span>Tender Value</span><strong>${b.val}</strong></div>
            <div><span>EMD Amount</span><strong>${b.emd}</strong></div>
            <div><span>Quantity</span><strong>${b.qty}</strong></div>
            <div><span>Handler</span><strong>👤 ${b.by}</strong></div>
          </div>

          ${b.workDone ? `<div class="ops-notes-work"><strong>⚡ Work Done:</strong><br>${b.workDone}</div>` : ''}
          ${b.pending && b.pending !== '-' ? `<div class="ops-notes-pend"><strong>⚠️ Pending Work:</strong><br>${b.pending}</div>` : ''}

          <div class="ops-card-actions">
            <button class="ops-btn ops-btn-subtle" style="font-size:0.75rem;" onclick="opsSimulateViewPdf('${b.bidNo}')">📄 Tender Copy</button>
            <button class="ops-btn ops-btn-primary" style="font-size:0.75rem;" onclick="opsOpenDailyTaskModal('${b.bidNo}')">📑 Add Task / Update %</button>
          </div>
        </div>
      `;
    }).join('');
  };

  // RENDER TABLE VIEW
  window.opsRenderTable = function(list) {
    const tbody = document.getElementById('opsTableBody');
    if (!tbody) return;

    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="12" style="text-align:center; padding:30px; color:#888;">No bids found.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map((b, i) => {
      const statusClass = b.status === 'SUBMITTED' ? 'status-submitted' : (b.status === 'IN_PROGRESS' ? 'status-progress' : (b.status === 'WORKING' ? 'status-working' : 'status-cancel'));
      return `
        <tr>
          <td style="font-weight:700; color:#888;">${i + 1}</td>
          <td style="font-family:'JetBrains Mono',monospace; font-weight:700; color:#4F46E5;">${b.bidNo}</td>
          <td><strong>${b.item}</strong></td>
          <td>${b.branch}</td>
          <td>${b.qty}</td>
          <td style="${b.overdue ? 'color:#dc2626; font-weight:800;' : ''}">${b.end}</td>
          <td style="font-family:'JetBrains Mono',monospace; font-weight:700;">${b.val}</td>
          <td style="font-family:'JetBrains Mono',monospace;">${b.emd}</td>
          <td><strong>${b.by}</strong></td>
          <td><span class="ops-badge-status ${statusClass}">${b.status}</span></td>
          <td><strong style="color:#059669;">${b.progress}%</strong></td>
          <td>
            <button class="ops-btn-action" style="background:#4F46E5;" onclick="opsOpenDailyTaskModal('${b.bidNo}')">Update</button>
          </td>
        </tr>
      `;
    }).join('');
  };

  // RENDER ACTIVITY FEED
  window.opsRenderActivityFeed = function() {
    const container = document.getElementById('opsActivityList');
    const pill = document.getElementById('opsActivityCountPill');
    if (!container) return;

    pill.textContent = `${window.OPS_ACTIVITIES.length} tasks logged today`;

    container.innerHTML = window.OPS_ACTIVITIES.map(a => `
      <div class="ops-act-row">
        <span class="ops-act-time">🕐 ${a.time}</span>
        <span class="ops-act-who">${a.who}</span>
        <span class="ops-act-bid">${a.bid}</span>
        <span class="ops-act-task" title="${a.task}">${a.task}</span>
        <span class="ops-act-pct">${a.pct}%</span>
      </div>
    `).join('');
  };

  // UPDATE KPIS
  window.opsUpdateKpis = function() {
    const total = window.OPS_BIDS.length;
    const overdue = window.OPS_BIDS.filter(b => b.overdue).length;
    const avg = Math.round(window.OPS_BIDS.reduce((s, b) => s + b.progress, 0) / total);
    const urgent = window.OPS_BIDS.filter(b => !b.overdue && b.progress < 100).length;

    document.getElementById('opsKpiActive').textContent = total;
    document.getElementById('opsKpiOverdue').textContent = overdue;
    document.getElementById('opsKpiAvg').textContent = `${avg}%`;
  };

  // DAILY TASK MODAL
  window.opsOpenDailyTaskModal = function(bidNo) {
    const tender = window.OPS_BIDS.find(b => b.bidNo === bidNo);
    if (!tender) return;

    document.getElementById('opsDailyBidInput').value = tender.bidNo;
    document.getElementById('opsDailyItemInput').value = `${tender.item} (${tender.branch})`;
    document.getElementById('opsDailyPctRange').value = tender.progress;
    document.getElementById('opsDailyPctVal').textContent = `${tender.progress}%`;
    document.getElementById('opsDailyTaskRemarks').value = '';

    document.getElementById('opsDailyModalOverlay').classList.add('open');
  };

  window.opsCloseDailyTaskModal = function() {
    document.getElementById('opsDailyModalOverlay').classList.remove('open');
  };

  window.opsSubmitDailyTask = function(e) {
    e.preventDefault();
    const bidNo = document.getElementById('opsDailyBidInput').value;
    const newPct = parseInt(document.getElementById('opsDailyPctRange').value, 10);
    const remarks = document.getElementById('opsDailyTaskRemarks').value.trim();

    const tender = window.OPS_BIDS.find(b => b.bidNo === bidNo);
    if (tender) {
      tender.progress = newPct;
      if (newPct === 100) tender.status = 'SUBMITTED';

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      tender.workDone = `[Today ${timeStr}] ${tender.by} (${newPct}%): ${remarks}\n` + (tender.workDone || '');

      // Add to activities feed
      window.OPS_ACTIVITIES.unshift({
        time: timeStr,
        who: tender.by,
        bid: tender.bidNo,
        task: remarks,
        pct: newPct
      });

      opsUpdateKpis();
      opsRenderActivityFeed();
      opsApplyFilters();
      opsCloseDailyTaskModal();
      showToast(`✅ Progress updated to ${newPct}% & logged to Daily Sheet!`, 'success');
    }
  };

  // NEW BID REPORT MODAL
  window.opsOpenNewBidModal = function() {
    document.getElementById('opsNewBidModalOverlay').classList.add('open');
  };

  window.opsCloseNewBidModal = function() {
    document.getElementById('opsNewBidModalOverlay').classList.remove('open');
  };

  window.opsSubmitNewBid = function(e) {
    e.preventDefault();
    const bidNo = document.getElementById('opsNewBidNo').value.trim();
    const item = document.getElementById('opsNewItem').value.trim();
    const branch = document.getElementById('opsNewBranch').value.trim();
    const qty = document.getElementById('opsNewQty').value.trim() || '1 Unit';
    const val = document.getElementById('opsNewVal').value.trim() || '₹50,00,000';
    const emd = document.getElementById('opsNewEmd').value.trim() || '₹1,00,000';
    const handler = document.getElementById('opsNewHandler').value;
    const month = document.getElementById('opsNewMonth').value;

    const newBid = {
      bidNo: bidNo,
      item: item,
      branch: branch,
      qty: qty,
      end: '2026-10-25',
      val: val,
      emd: emd,
      from: 'L89',
      by: handler,
      status: 'WORKING',
      progress: 0,
      month: month,
      overdue: false,
      workDone: 'New tender report submitted & assigned to handler.',
      pending: '1. Checklist preparation.'
    };

    window.OPS_BIDS.unshift(newBid);
    opsUpdateKpis();
    opsApplyFilters();
    opsCloseNewBidModal();
    showToast(`✅ New bid ${bidNo} inserted & synced to Month Sheet!`, 'success');
  };

  // SIMULATE PDF VIEW
  window.opsSimulateViewPdf = function(bidNo) {
    showToast(`📄 Fetching Drive PDF for ${bidNo}... Opening tender copy.`);
    window.open('https://bidplus.gem.gov.in', '_blank');
  };

  // ADMIN & PASSWORD DEMO MODALS
  window.opsOpenAdminModal = function() {
    showToast('🛡️ Admin Tools: Hourly auto-sync active & PDF reports generator ready.');
  };

  window.opsOpenPasswordModal = function() {
    showToast('🔑 Role Security: Hashed password verification & SHA-256 session token active.');
  };
}

