/**
 * DEEPANSHU — PORTFOLIO JAVASCRIPT
 * Vanilla, high-performance interactions, intelligent AI recruiter chatbot & GeM scraper simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMetricsCounter();
  initSkillFilters();
  initAiAssistant();
  initScraperSimulator();
  initProjectModals();
  initContactActions();
  initReviewSubmissions();
  initMobileMenu();
});

/* ==========================================================================
   1. THEME SWITCHER
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('deepanshu-theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('deepanshu-theme', newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });
}

/* ==========================================================================
   2. HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const roles = [
    'Data Analyst & MIS Specialist',
    'Python Web Scraping (Selenium / BS4)',
    'GeM Tender & Bid Strategy Analyst',
    'Google Apps Script Web Apps Expert',
    'Advanced Excel & VBA Specialist'
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
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
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
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE "ASK DEEPANSHU'S AI CV" RECRUITER ASSISTANT
   ========================================================================== */
function initAiAssistant() {
  const form = document.getElementById('assistant-form');
  const input = document.getElementById('assistant-input');
  const chatBox = document.getElementById('assistant-chat-box');
  const chips = document.querySelectorAll('.chip-btn');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleAssistantQuery(query);
    });
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    handleAssistantQuery(query);
  });

  function handleAssistantQuery(query) {
    appendMessage('user', query);

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot typing';
    typingIndicator.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-body"><p>Analyzing Deepanshu's background...</p></div>
    `;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const answer = generateDeepanshuAnswer(query);
      appendMessage('bot', answer);
    }, 400);
  }

  function appendMessage(sender, textOrHtml) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    const avatar = sender === 'bot' ? '🤖' : '👤';
    msg.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-body">${textOrHtml.startsWith('<') ? textOrHtml : `<p>${textOrHtml}</p>`}</div>
    `;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function generateDeepanshuAnswer(q) {
    const lower = q.toLowerCase();

    // 1. Immediate Opportunities / Notice Period / Available / Join / Location / Delhi
    if (lower.includes('immediate') || lower.includes('opportunit') || lower.includes('open') || lower.includes('join') || lower.includes('notice') || lower.includes('available') || lower.includes('hire') || lower.includes('relocation') || lower.includes('delhi')) {
      return `<p><strong>Yes, absolutely!</strong> Deepanshu is actively available and <strong>ready to join immediately</strong> for Data Analyst, Web Scraping Specialist, and AI Automation roles in <strong>New Delhi or Remote</strong>.</p>
      <p style="margin-top: 0.4rem;">He brings a practical business lens with 4 years of leadership experience, plus deep production expertise in Python web scraping, Google Apps Script web apps, and Advanced Excel/VBA.</p>
      <div class="chat-action-row">
        <a href="https://wa.me/919310033561" target="_blank" class="chat-action-btn">💬 Chat on WhatsApp</a>
        <a href="tel:+919310033561" class="chat-action-btn">📞 Call +91 9310033561</a>
        <a href="mailto:deepanshu2661@gmail.com" class="chat-action-btn">✉️ Email Deepanshu</a>
      </div>`;
    }

    // 2. GeM Portal / Government Tender Scraping / PDF Extraction
    if (lower.includes('gem') || lower.includes('pdf') || lower.includes('portal') || lower.includes('crawl')) {
      return `<p>Deepanshu specializes in scraping <strong>GeM (Government e-Marketplace)</strong> and complex procurement portals:</p>
      <ul style="padding-left: 1.2rem; margin: 0.4rem 0; font-size: 0.88rem; line-height: 1.6;">
        <li>Automates extraction of live tenders, RFPs, EMD amounts, and technical specifications.</li>
        <li>Parses PDF bid documents and vendor catalogs using Python headless Selenium & BeautifulSoup.</li>
        <li>Eliminates over 90% of manual data collection time, syncing daily updates directly into Google Sheets.</li>
      </ul>
      <p>Scroll down to the <strong>Live Scraper Demo</strong> right below to test it yourself!</p>`;
    }

    // 3. Crystal Works Experience
    if (lower.includes('crystal') || lower.includes('achieve') || lower.includes('current role')) {
      return `<p>At <strong>Crystal Works</strong> (08/2026 – Present), Deepanshu serves as <strong>Sr. MIS & Data Analyst (Web Scraping & AI Automation)</strong>:</p>
      <ul style="padding-left: 1.2rem; margin: 0.4rem 0; font-size: 0.88rem; line-height: 1.6;">
        <li><strong>Python Web Scraping:</strong> Built automated Selenium/BS4 pipelines extracting government and commercial tender data.</li>
        <li><strong>Bid Pricing Strategy:</strong> Analyzes historical winning tender data to pinpoint competitor margins and optimize bid prices.</li>
        <li><strong>Google Apps Script:</strong> Replaced slow spreadsheet processes across teams with dedicated internal web apps.</li>
        <li><strong>Executive Reporting:</strong> Designs interactive UI/UX dashboards and prepares daily/monthly MIS reports.</li>
      </ul>`;
    }

    // 4. Web Scraping & Python
    if (lower.includes('scraping') || lower.includes('selenium') || lower.includes('beautifulsoup') || lower.includes('python')) {
      return `<p>Deepanshu's Python scraping stack centers on <strong>Selenium</strong> (for dynamic JavaScript-heavy portals) and <strong>BeautifulSoup / Requests</strong> (for fast DOM parsing). He manages headless Chrome instances, session cookies, pagination loops, data normalization via Pandas, and automated error retries.</p>`;
    }

    // 5. Google Apps Script & Internal Web Apps
    if (lower.includes('app') || lower.includes('script') || lower.includes('google apps script') || lower.includes('sheet')) {
      return `<p>Deepanshu builds full internal web applications in <strong>Google Apps Script</strong> using HTML/CSS frontends, client-server \`google.script.run\` APIs, and Google Sheets as scalable databases. This includes automated data syncing, scheduled triggers, and automated email dispatches.</p>`;
    }

    // 6. Tender Analysis & Pricing Strategy
    if (lower.includes('tender') || lower.includes('pricing') || lower.includes('bid') || lower.includes('strategy')) {
      return `<p>Deepanshu turns raw tender award data into commercial leverage. By examining historical winning bids (L1 rates), competitor price spreads, and discount patterns, he gives executive leadership exact margin benchmarks to submit competitive yet profitable bids.</p>`;
    }

    // 7. Advanced Excel & VBA
    if (lower.includes('excel') || lower.includes('vba') || lower.includes('macro') || lower.includes('mis') || lower.includes('formula')) {
      return `<p>Deepanshu is a certified <strong>Microsoft Office Specialist in Advanced Excel 2016</strong>. His expertise includes VLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS, Pivot Tables, Power Query, and custom VBA macros that automate recurring weekly and monthly reporting.</p>`;
    }

    // 8. Sam International
    if (lower.includes('sam') || lower.includes('internat')) {
      return `<p>At <strong>Sam International</strong> (Karol Bagh, New Delhi), Deepanshu worked as MIS Executive & Jr. Data Analyst, applying web scraping fundamentals, writing Excel VBA scripts, and developing Google Apps Script solutions for automated data syncing and scheduled reporting.</p>`;
    }

    // 9. Hospitality / Management Lens
    if (lower.includes('hospitality') || lower.includes('palm') || lower.includes('manager') || lower.includes('hotel') || lower.includes('rhombus')) {
      return `<p>Before diving into data, Deepanshu gained <strong>4 years of real-world leadership</strong> as Night Manager at Hotel Palm Greens and Account Executive at Rhombus Enterprises. This makes him exceptional at stakeholder management, business operations, and crisis resolution under pressure.</p>`;
    }

    // 10. Education & Certifications
    if (lower.includes('education') || lower.includes('degree') || lower.includes('mba') || lower.includes('college') || lower.includes('certif') || lower.includes('course')) {
      return `<p><strong>Academic Qualifications & Certifications:</strong></p>
      <ul style="padding-left: 1.2rem; margin: 0.4rem 0; font-size: 0.88rem; line-height: 1.6;">
        <li><strong>MBA (Banking & Finance):</strong> IGNOU (2023 – Present)</li>
        <li><strong>B.Com:</strong> Delhi University (2019 – 2022)</li>
        <li><strong>Certified Python Data Analyst:</strong> Teckstack Institute (03/2025)</li>
        <li><strong>Microsoft Advanced Excel 2016:</strong> Microsoft Office Specialist</li>
        <li><strong>Digital Marketing:</strong> Google Digital (07/2023)</li>
      </ul>`;
    }

    // 11. Contact & Phone
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('call') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('number')) {
      return `<p>Direct contact details for Deepanshu:</p>
      <p style="margin: 0.3rem 0;">• <strong>Phone / WhatsApp:</strong> +91 9310033561<br>• <strong>Email:</strong> deepanshu2661@gmail.com<br>• <strong>Location:</strong> New Delhi, India</p>
      <div class="chat-action-row">
        <a href="https://wa.me/919310033561" target="_blank" class="chat-action-btn">💬 Chat on WhatsApp</a>
        <a href="tel:+919310033561" class="chat-action-btn">📞 Call Now</a>
      </div>`;
    }

    // Default intelligent response
    return `<p>Thanks for asking! Deepanshu combines <strong>Python web scraping (Selenium/BS4)</strong>, <strong>Google Apps Script web apps</strong>, and <strong>Advanced Excel/VBA</strong> with 4 years of business leadership.</p>
    <p style="margin-top: 0.4rem;">You can explore his verified projects, test the live scraper simulator below, or reach out directly at <strong>+91 9310033561</strong>!</p>`;
  }
}

/* ==========================================================================
   INTERACTIVE GeM & TENDER SCRAPER SIMULATOR
   ========================================================================== */
function initScraperSimulator() {
  const runBtn = document.getElementById('run-scraper-btn');
  const select = document.getElementById('tender-select');
  const terminal = document.getElementById('scraper-terminal');
  const results = document.getElementById('scraper-results');
  if (!runBtn || !select || !terminal || !results) return;

  const tenderData = {
    'gem-laptops': {
      title: 'GeM Portal: Ministry IT Hardware & Laptops Supply',
      tenderId: 'GeM/2026/B/84920',
      category: 'Electronics & IT Systems',
      estCost: '₹54,00,000',
      vendorsFound: 14,
      avgL1Bid: '₹47,60,000 (-11.8% vs Est.)',
      recommendedBid: '₹47,20,000',
      winProb: '91%',
      marginEst: '18.4% Net Margin',
      logs: [
        'Connecting to GeM portal endpoint: https://bidplus.gem.gov.in/all-bids...',
        'Bypassing Cloudflare challenge & setting cookie session headers...',
        'Navigating to Tender GeM/2026/B/84920 [Ministry of Electronics & IT]...',
        'Parsing RFP Specification PDF & Technical Criteria tables...',
        'BeautifulSoup extracted 14 competing vendor quotation histories.',
        'Pandas statistical distribution: L1 winning margin median = -11.8%.',
        'Auto-sync complete: Records dispatched to Crystal Works MIS Database.'
      ]
    },
    'cpwd-facility': {
      title: 'CPWD: Integrated Facility Operations & Support',
      tenderId: 'CPWD/DEL/2026/041',
      category: 'Operations & Facility Management',
      estCost: '₹38,50,000',
      vendorsFound: 9,
      avgL1Bid: '₹34,10,000 (-11.4% vs Est.)',
      recommendedBid: '₹33,85,000',
      winProb: '88%',
      marginEst: '16.2% Net Margin',
      logs: [
        'Initiating Selenium headless crawler for Central PWD Portal...',
        'Fetching Tender Notice CPWD/DEL/2026/041 [New Delhi Zone]...',
        'Parsing Eligibility Clause, EMD (₹77,000), and Pre-Qualification docs...',
        'Analyzing past 3 years award prices for Facility Management in Delhi...',
        'Competitive density: 9 active vendors identified.',
        'Optimal bid pricing strategy calculated via Regression Model.',
        'Generated automated executive summary email via Google Apps Script.'
      ]
    },
    'railway-cctv': {
      title: 'Indian Railways: CCTV Surveillance & Analytics Integration',
      tenderId: 'NR/S&T/2026/118',
      category: 'Security & Signal Telecom',
      estCost: '₹72,00,000',
      vendorsFound: 18,
      avgL1Bid: '₹63,50,000 (-11.8% vs Est.)',
      recommendedBid: '₹62,90,000',
      winProb: '94%',
      marginEst: '21.5% Net Margin',
      logs: [
        'Targeting IREPS (Indian Railways e-Procurement System)...',
        'Authenticating session token & querying Northern Railway S&T wing...',
        'Scraping Bill of Quantities (BOQ) with 48 individual line items...',
        'Extracting OEM authorization requirements and vendor penalty rules...',
        'Parsed historical L1 rates across 5 past zonal railway contracts.',
        'Strategy model recommends ₹62,90,000 quotation for peak win probability.',
        'Clean CSV dataset compiled & saved to cloud drive.'
      ]
    }
  };

  runBtn.addEventListener('click', () => {
    const selectedKey = select.value;
    const data = tenderData[selectedKey] || tenderData['gem-laptops'];

    runBtn.disabled = true;
    runBtn.innerHTML = `<span>Scraping Portal...</span>`;

    terminal.innerHTML = `<p class="term-line term-warn">> Initializing Python 3.12 (Selenium + Requests + BeautifulSoup)...</p>`;

    let step = 0;
    const interval = setInterval(() => {
      if (step < data.logs.length) {
        const line = document.createElement('p');
        line.className = 'term-line';
        line.textContent = `> ${data.logs[step]}`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        step++;
      } else {
        clearInterval(interval);
        const done = document.createElement('p');
        done.className = 'term-line term-success';
        done.textContent = `✔ Pipeline executed in 1.84s — 100% Data Integrity Verified!`;
        terminal.appendChild(done);
        terminal.scrollTop = terminal.scrollHeight;

        // Render Results Card
        results.innerHTML = `
          <div class="intel-card">
            <span class="intel-tag">✔ AUTOMATED BID INTELLIGENCE REPORT</span>
            <h4 class="intel-title">${data.title}</h4>
            <div class="intel-stat-grid">
              <div class="intel-stat-item">
                <small>Tender ID</small>
                <strong>${data.tenderId}</strong>
              </div>
              <div class="intel-stat-item">
                <small>Est. Project Cost</small>
                <strong>${data.estCost}</strong>
              </div>
              <div class="intel-stat-item">
                <small>Competitor Bids Scraped</small>
                <strong style="color: var(--accent-cyan);">${data.vendorsFound} Vendors</strong>
              </div>
              <div class="intel-stat-item">
                <small>Historical L1 Average</small>
                <strong>${data.avgL1Bid}</strong>
              </div>
            </div>
            <div class="strategy-banner">
              🎯 <strong>Deepanshu's Recommended Bid:</strong> ${data.recommendedBid} 
              <br><small style="color: var(--text-primary);">Win Probability: ${data.winProb} • Projected: ${data.marginEst}</small>
            </div>
          </div>
        `;

        runBtn.disabled = false;
        runBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>Run Python Scraper</span>
        `;
        showToast('Tender extraction & bid calculation complete!');
      }
    }, 280);
  });
}

/* ==========================================================================
   6. PROJECT ARCHITECTURE MODALS
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalTarget = document.getElementById('modal-content-target');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetails = {
    tender: {
      title: "Government & Portal Tender Scraping Pipeline",
      category: "Python Web Scraping & Automated Data Harvesting",
      problem: "Procurement teams previously spent hours manually clicking through government tender boards, leading to delayed bid responses and missed deadlines.",
      solution: "Engineered headless automated Python scraping agents using Selenium and BeautifulSoup to navigate paginated portal directories, handle session cookies, and extract structured tender specs into clean databases.",
      workflow: [
        "Automated Headless Crawler: Scheduled scripts scanning target portals every morning.",
        "HTML Parsing & Extraction: BeautifulSoup parsing tender IDs, submission deadlines, earnest money deposits (EMD), and category codes.",
        "Data Normalization: Pandas cleaning, deduplication, and currency normalization.",
        "Instant Alerting: Automated notifications sent to procurement officers for high-value tenders."
      ],
      impact: "Reduced tender collection time by >90% while tracking hundreds of public procurement notices daily with zero missed opportunities."
    },
    appsscript: {
      title: "Enterprise Internal Web App & Workflow Automation",
      category: "Google Apps Script & Full-Stack Internal Tooling",
      problem: "Multiple departments at Crystal Works relied on disconnected, cumbersome Excel and Google Sheets that suffered from version conflicts, accidental formula overwrites, and manual email follow-ups.",
      solution: "Designed and deployed custom internal web apps using Google Apps Script HTML Service and JavaScript, backed by Google Sheets and drive storage.",
      workflow: [
        "Responsive UI: Tailored forms with live validation preventing invalid data submissions.",
        "Backend Script Engine: Apps Script processing business logic, permission rules, and approvals.",
        "Automated Syncing: Cross-workbook data propagation without manual copy-pasting.",
        "Scheduled Triggers: Automated daily MIS email dispatch and executive progress summaries."
      ],
      impact: "Completely eliminated spreadsheet chaos across internal teams, saving 15+ hours of manual compilation each week."
    },
    pricing: {
      title: "Competitor Bidding & Tender Pricing Intelligence",
      category: "Strategic Analytics & Bid Pricing Optimization",
      problem: "Bidding teams were estimating bid prices without deep statistical visibility into competitor historical margins and winning spreads.",
      solution: "Aggregated years of past tender awarding records, calculated win/loss ratios, analyzed competitor pricing trends, and built dynamic pricing simulations.",
      workflow: [
        "Historical Data Extraction: Scraped award notices and pricing summaries from completed bids.",
        "Quantitative Margin Analysis: Calculated minimum, median, and winning bids grouped by item category.",
        "Interactive Dashboards: Built executive decision models in Advanced Excel and Power BI.",
        "Bid Strategy Formulation: Provided data-backed recommendation ranges for upcoming bids."
      ],
      impact: "Directly guided pricing strategy for major contracts, improving tender win probabilities and preserving profitability margins."
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (!data) return;

      modalTarget.innerHTML = `
        <span class="section-tag">${data.category}</span>
        <h2 style="font-size: 1.55rem; margin: 0.5rem 0 1rem; color: var(--text-primary);">${data.title}</h2>
        
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.3rem;">The Business Challenge:</h4>
          <p style="color: var(--text-secondary); font-size: 0.92rem;">${data.problem}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.3rem;">The Engineered Solution:</h4>
          <p style="color: var(--text-secondary); font-size: 0.92rem;">${data.solution}</p>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Pipeline & Workflow:</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.88rem; line-height: 1.7;">
            ${data.workflow.map(step => `<li>${step}</li>`).join('')}
          </ul>
        </div>

        <div style="background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <strong style="color: var(--accent-green); font-size: 0.9rem;">Verified Business Impact:</strong>
          <p style="color: var(--text-primary); font-size: 0.9rem; margin-top: 0.3rem;">${data.impact}</p>
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
   7. CONTACT, COPY & PRINT ACTIONS
   ========================================================================== */
function initContactActions() {
  const printBtn = document.getElementById('cv-print-btn');
  const heroDownloadBtn = document.getElementById('hero-download-cv');

  function triggerPrint() {
    showToast('Opening ATS-friendly print preview (Save as PDF)...');
    setTimeout(() => {
      window.print();
    }, 350);
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

    feedback.textContent = `Thank you ${name}! Opening your email client to send this message to Deepanshu...`;
    feedback.className = 'form-feedback success';

    setTimeout(() => {
      window.location.href = `mailto:deepanshu2661@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    }, 1000);
  });
}

/* ==========================================================================
   8. MOBILE MENU
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
   9. TOAST UTILITY
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
   10. REVIEWS & ENDORSEMENTS SYSTEM
   ========================================================================== */
function initReviewSubmissions() {
  const openBtn = document.getElementById('open-review-modal-btn');
  const modal = document.getElementById('review-modal');
  const closeBtn = document.getElementById('review-modal-close');
  const form = document.getElementById('submit-review-form');
  const reviewsGrid = document.getElementById('reviews-grid');

  if (!openBtn || !modal || !form || !reviewsGrid) return;

  // Load saved user reviews from localStorage
  const savedReviews = localStorage.getItem('deepanshu-user-reviews');
  if (savedReviews) {
    try {
      const parsed = JSON.parse(savedReviews);
      parsed.forEach(r => prependReviewCard(r, false));
    } catch (e) {
      console.error(e);
    }
  }

  openBtn.addEventListener('click', () => modal.classList.add('open'));
  closeBtn?.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('review-author').value.trim();
    const role = document.getElementById('review-role').value.trim();
    const rating = document.getElementById('review-rating').value;
    const content = document.getElementById('review-content').value.trim();

    if (!author || !role || !content) return;

    const reviewObj = {
      author,
      role,
      rating,
      content,
      date: new Date().toLocaleDateString()
    };

    prependReviewCard(reviewObj, true);

    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem('deepanshu-user-reviews') || '[]');
    } catch (e) {
      stored = [];
    }
    stored.push(reviewObj);
    localStorage.setItem('deepanshu-user-reviews', JSON.stringify(stored));

    form.reset();
    modal.classList.remove('open');
    showToast('Thank you! Your recommendation is now published live.');
  });

  function prependReviewCard(r, animate) {
    const initials = r.author
      .split(' ')
      .map(w => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'EX';

    const card = document.createElement('div');
    card.className = 'review-card glass-card';
    if (animate) {
      card.style.animation = 'fadeIn 0.5s ease';
      card.style.borderColor = 'var(--accent-cyan)';
    }

    card.innerHTML = `
      <div class="review-stars">${r.rating}</div>
      <p class="review-text">"${r.content}"</p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">${initials}</div>
        <div>
          <strong class="reviewer-name">${r.author}</strong>
          <span class="reviewer-org">${r.role}</span>
        </div>
      </div>
    `;

    reviewsGrid.prepend(card);
  }
}

