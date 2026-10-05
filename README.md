# 🚀 Mohit — Data Scientist & AI / Machine Learning Engineer Digital CV Portfolio

An ultra-modern, high-performance digital CV and interactive portfolio tailored for **Data Science & AI / ML Engineering**. Designed specifically for 100% zero-configuration deployment to **GitHub Pages**, **Vercel**, or **Netlify**.

---

## 🌟 Key Highlights & Features

- **High-Tech Aesthetic**: Deep OLED dark theme with ambient neural glow, glassmorphism cards, and interactive micro-animations.
- **Interactive "Ask My AI Resume"**: Simulated recruiter chatbot allowing hiring managers to query your skills, RAG architecture, experience, and certifications in real-time.
- **Live CV Customizer**: Click the floating `Customize CV` button on the bottom right to edit your name, role, email, bio, and social links with instant live updates and local persistence.
- **Deep-Dive Architecture Modals**: Click "View Architecture" on featured projects (Multi-Agent RAG, Real-Time Edge Computer Vision, Fraud Detection Engine) to reveal technical specifications.
- **ATS-Compliant PDF Resume Print**: Dedicated `@media print` engine that transforms the digital portfolio into a clean, 1-page paper/PDF resume when you click **"CV PDF"**.
- **Dynamic Typing & Counters**: Live animated role ticker and smooth scrolling metrics counter.
- **Zero-Build Architecture**: 100% pure HTML5, Vanilla CSS, and JavaScript. Zero npm/bundler dependencies required.

---

## 🌐 How to Publish to the Internet (Not Localhost!)

### 🥇 Option 1: GitHub Pages (Recommended — Free & Permanent)

You get a free URL like: `https://<your-github-username>.github.io`

#### Easiest Method (Direct in Browser, 2 Minutes):
1. Sign in to your [GitHub account](https://github.com).
2. Click **New Repository** (or visit [github.com/new](https://github.com/new)).
3. Name your repository:
   - For a primary profile portfolio: `<your-username>.github.io` (e.g., `mohit.github.io`).
   - Or any project name like `my-ai-portfolio`.
4. Set the repository to **Public** and click **Create repository**.
5. On the next screen, click the link that says **"uploading an existing file"**.
6. Open your local project folder:
   `C:\Users\mohit\.gemini\antigravity-ide\scratch\ai-ml-portfolio`
7. Drag and drop all the files (`index.html`, `styles.css`, `script.js`, and the `assets` folder) directly into the GitHub upload area.
8. Click **Commit changes**.
9. In your repository, go to **Settings** → **Pages** (in the left sidebar).
10. Under **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
11. Refresh after 60 seconds — your digital portfolio is **LIVE ON THE WEB**! 🎉

---

### ⚡ Option 2: Netlify Drop (Instant 10 Seconds — No Setup)

1. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the whole `ai-ml-portfolio` folder right onto the drop zone.
3. Your portfolio gets a live public URL (e.g. `https://mohit-ai-portfolio.netlify.app`) immediately!

---

### 🛠️ Option 3: Deploy via Git CLI

If you want to use the Git command line, install Git on Windows using:
```powershell
winget install --id Git.Git -e --source winget
```
Then run:
```bash
git init
git add .
git commit -m "Launch AI Engineer Digital CV Portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
Then enable GitHub Pages under **Repository Settings > Pages**.

---

## 📁 File Structure

```
ai-ml-portfolio/
├── index.html              # Main semantic HTML structure
├── styles.css              # Cyber-slate dark/light glassmorphism styles & print rules
├── script.js               # Interactive AI chat, modals, customizer, animations
├── assets/
│   ├── profile.jpg         # Professional AI engineer portrait
│   ├── rag-system.jpg      # Neural graph & vector database visualization
│   └── cv-vision.jpg       # Real-time computer vision dashboard visualization
└── README.md               # Publishing guide and documentation
```

---

## ✏️ How to Personalize Your CV Information

You can personalize your details in two ways:
1. **Directly on the web page**: Click the floating `Customize CV` button on the bottom right, update your details, and hit **Apply Changes**.
2. **In `index.html`**: Open `index.html` in your editor and replace placeholder text, links, and email with your real credentials.
