/**
 * DEEPANSHU — PORTFOLIO JAVASCRIPT
 * Vanilla, high-performance interactions & AI chatbot logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMetricsCounter();
  initSkillFilters();
  initAiAssistant();
  initProjectModals();
  initContactActions();
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
    'Google Apps Script Web Apps Expert',
    'Tender & Pricing Strategy Analyst',
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
      <div class="message-body"><p>Searching Deepanshu's background...</p></div>
    `;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const answer = generateDeepanshuAnswer(query);
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

  function generateDeepanshuAnswer(q) {
    const lower = q.toLowerCase();

    if (lower.includes('scraping') || lower.includes('selenium') || lower.includes('beautifulsoup') || lower.includes('python')) {
      return "Deepanshu builds end-to-end Python web scraping pipelines utilizing Selenium and BeautifulSoup to extract large-scale tender data, pricing records, and RFPs from government and commercial portals, slashing manual data collection time by over 90%.";
    } else if (lower.includes('app') || lower.includes('script') || lower.includes('google apps script')) {
      return "At Crystal Works, Deepanshu owns the end-to-end delivery of internal web applications built in Google Apps Script. He replaces manual spreadsheet workflows across teams with centralized UI apps, automated data syncing, and scheduled email triggers.";
    } else if (lower.includes('tender') || lower.includes('pricing') || lower.includes('bid')) {
      return "Deepanshu analyzes multi-year historical tender outcomes to uncover which vendors won specific tenders, at what exact margins, and with what pricing strategies, directly empowering executive leadership to submit winning bids.";
    } else if (lower.includes('excel') || lower.includes('vba') || lower.includes('mis') || lower.includes('report')) {
      return "Deepanshu is an expert in Advanced Excel & VBA (certified Microsoft Office Specialist). He automates daily, weekly, and monthly MIS reports using VLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS, Pivot Tables, and custom VBA macros.";
    } else if (lower.includes('experience') || lower.includes('crystal') || lower.includes('sam') || lower.includes('background')) {
      return "Deepanshu is currently Sr. MIS & Data Analyst at Crystal Works (New Delhi). Previously, he was MIS Executive & Jr. Data Analyst at Sam International, interned at Orangus Infotech, and has 4 years of leadership and client-facing business experience.";
    } else if (lower.includes('education') || lower.includes('degree') || lower.includes('mba') || lower.includes('college')) {
      return "Deepanshu is pursuing his MBA in Banking and Finance from IGNOU (2023–Present) and holds a Bachelor of Commerce (B.Com) from Delhi University (2019–2022).";
    } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('available') || lower.includes('email') || lower.includes('phone')) {
      return "Deepanshu is actively available for Data Analyst and Automation roles in New Delhi or Remote! Contact him directly at deepanshu2661@gmail.com, call +91 9310033561, or click the WhatsApp button to chat!";
    } else {
      return `Thanks for inquiring about "${q}". Deepanshu combines hands-on technical automation (Python web scraping, Apps Script, Excel VBA) with strong commercial instincts and executive reporting. Check out his employment history and projects below!`;
    }
  }
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
