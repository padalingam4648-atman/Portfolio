# PADALINGAM S — AI Engineer & Generative AI Portfolio

A unique, premium, light-theme personal portfolio website engineered with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

Built with a custom visual identity: warm pearl/off-white background, delicate GPU-accelerated aurora background blobs, high-fidelity glassmorphism, interactive 60fps neural network canvas, 3D tilt project cards, deep-dive modal, and fully responsive layouts.

---

## 🚀 Live Demo & Preview

To run the portfolio locally:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🎨 Design Identity & Architecture

- **Color System:** Light theme with warm pearl `#F8F9FC` base, subtle dot grid overlay, and vibrant `blue -> indigo -> violet` accents.
- **Glassmorphism:** Multi-layered frosted glass panels (`bg-white/55`, `backdrop-blur-xl`, `border-white/80`, layered depth shadows, and top-edge specular highlights).
- **Interactive Neural Network Canvas:** Lightweight, hardware-accelerated canvas simulating cognitive node graphs with pulsing synapses that interact with mouse proximity (pauses automatically off-screen to preserve 0% idle CPU).
- **Project Cards with 3D Tilt:** Real-time physics tilt on mouse move with code-generated SVG technical visual representations.
- **Deep-Dive Modals:** Detailed architecture pipelines, engineering challenges, tech chips, and live/source links.
- **Accessible & Responsive:** Mobile glass drawer, keyboard trap/escape listeners, semantic HTML tags, and full `prefers-reduced-motion` compliance.

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   └── resume.pdf                 # Replace with your actual PDF resume
├── src/
│   ├── assets/                    # Static assets & icons
│   ├── components/                # Modular UI components
│   │   ├── Navbar.jsx             # Floating pill glass navbar with scrollspy & mobile drawer
│   │   ├── Hero.jsx               # Hero with rotating roles, badge, CTAs, and NeuralCanvas
│   │   ├── About.jsx              # Mission statement, focus areas & glass interest chips
│   │   ├── Skills.jsx             # Categorized glass cards with skill badges (no progress bars)
│   │   ├── Projects.jsx           # 3D tilt project cards with category filter
│   │   ├── ProjectModal.jsx       # Architecture deep-dive modal with Esc listener
│   │   ├── Experience.jsx         # Vertical glass timeline with internship highlight
│   │   ├── Education.jsx          # Editable degree, institution, and coursework
│   │   ├── Certifications.jsx     # Credential glass cards with verification links
│   │   ├── Contact.jsx            # Form with client validation, Formspree & mailto fallback
│   │   ├── Footer.jsx             # Social links, copyright, and smooth Back-to-Top
│   │   └── ui/
│   │       ├── AuroraBackground.jsx # Soft ambient gradient drift
│   │       ├── GlassCard.jsx        # Reusable glassmorphic container
│   │       ├── NeuralCanvas.jsx     # Interactive AI synapse canvas visual
│   │       ├── ProjectThumbnails.jsx # Bespoke SVG visuals for each project
│   │       ├── ScrollProgress.jsx   # Top window scroll indicator
│   │       └── SectionHeading.jsx   # Typography hierarchy & gradient headers
│   ├── data/                      # 💡 ALL CONTENT IS MANAGED HERE
│   │   ├── personalInfo.js        # Name, title, intro, contacts, focus areas
│   │   ├── projects.js            # Featured projects, stack, architecture, links
│   │   ├── skills.js              # Skill categories and proficiencies
│   │   ├── experience.js          # Internships and career milestones
│   │   ├── education.js           # Degrees, coursework, institutions
│   │   └── certifications.js      # Credentials, IDs, and certificates
│   ├── hooks/
│   │   ├── useReducedMotion.js    # Detects OS reduced motion settings
│   │   └── useScrollSpy.js        # Active section tracking for navbar
│   ├── App.jsx                    # Root composition
│   ├── index.css                  # Tailwind styles & glass utility classes
│   └── main.jsx                   # React 18 bootstrap
├── .env.example                   # Form submission environment variables
├── index.html                     # SEO metadata, Open Graph, fonts
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ✏️ How to Edit Content & Replace Placeholders

All content is decoupled from code into clean JavaScript files in `src/data/`:

1. **Personal Information & Links:**
   - Edit [`src/data/personalInfo.js`](file:///c:/Users/PADALINGAM/Downloads/Portfolio/src/data/personalInfo.js)
   - Replace placeholders like `[ADD]` in email, LinkedIn, and location.
2. **Resume PDF:**
   - Place your official PDF resume into [`public/resume.pdf`](file:///c:/Users/PADALINGAM/Downloads/Portfolio/public/resume.pdf).
3. **Projects:**
   - Edit [`src/data/projects.js`](file:///c:/Users/PADALINGAM/Downloads/Portfolio/src/data/projects.js)
   - Update repository URLs or live demo links.
4. **Experience:**
   - Edit [`src/data/experience.js`](file:///c:/Users/PADALINGAM/Downloads/Portfolio/src/data/experience.js)
   - Add dates, role titles, and specific bullet points for Aivar Innovations.
5. **Education & Certifications:**
   - Edit [`src/data/education.js`](file:///c:/Users/PADALINGAM/Downloads/Portfolio/src/data/education.js) and [`src/data/certifications.js`](file:///c:/Users/PADALINGAM/Downloads/Portfolio/src/data/certifications.js).

---

## 📬 Contact Form Setup

The contact form is configured to work in two convenient modes:

1. **Formspree (Recommended):**
   - Create a free form at [formspree.io](https://formspree.io)
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id`
2. **Mailto Fallback:**
   - Even without an API key, the form automatically falls back to an instant `mailto:` link that opens the user's default email client with the subject and body pre-filled.

---

## 🌐 Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio"
   git branch -M main
   git remote add origin https://github.com/padalingam4648-atman/portfolio.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel auto-detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables if using Formspree (`VITE_FORMSPREE_ENDPOINT`).
5. Click **Deploy**.

### Deploying to Netlify
1. Connect your GitHub repository at [Netlify](https://netlify.com).
2. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Click **Deploy Site**.

