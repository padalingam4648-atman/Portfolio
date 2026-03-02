# Padalingam S - Portfolio

A modern, cyber-themed portfolio website showcasing projects, skills, and achievements in Cyber Security, Automation, and Creative Design.

## 🌟 Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - Built with Framer Motion for fluid transitions
- **Project Showcase** - Displays major projects and mini projects with GitHub links
- **Interactive Resume** - View resume in a modal popup
- **Contact Section** - Easy ways to get in touch via email and social media
- **Dark Theme** - Sleek cyber-security inspired design

## 🚀 Live Projects

### Major Projects
1. **MALCURE** - Smart Malware Response Using CVE Intelligence
2. **FARMER APP** - Smart Agricultural Assistance Mobile App
3. **SECURE CLOUD** - Cloud Storage Security with Homomorphic Encryption

### Mini Projects
1. **MOBI-LOCATOR** - Remote Device Security & Tracking Platform
2. **LUDO GAME** - Classic Ludo Board Game (Mankatha Edition)

## 🛠️ Tech Stack & How They're Used

### Core Technologies

- **React 19.2.1** - Component-based UI library
  - Used for building reusable components (Navbar, Hero, Projects, Contact, etc.)
  - Manages state with `useState` hook for interactive features (resume modal, navigation)
  - Handles side effects with `useEffect` for scroll detection and animations

- **TypeScript** - Type-safe JavaScript
  - Provides type definitions for props, state, and data structures
  - Ensures code reliability with compile-time error checking
  - Defines interfaces in `types.ts` for Project, SkillGroup, Publication, etc.

- **Vite 6.2.0** - Build tool and development server
  - Lightning-fast hot module replacement (HMR) during development
  - Optimized production builds with code splitting
  - Serves the app at `http://localhost:3000/` in development mode

### Animation & Interactivity

- **Framer Motion 12.23.26** - Animation library
  - `motion` components for smooth page transitions and scroll animations
  - `useScroll` hook for scroll progress bar at the top
  - `useSpring` for smooth scroll-based animations
  - `useTransform` for parallax effects in the Hero section
  - `AnimatePresence` for modal enter/exit animations
  - Variants system for staggered animations in project cards

### UI Components & Icons

- **Lucide React 0.559.0** - Icon library
  - Provides 40+ icons used throughout the portfolio:
    - Navigation: `Github`, `Linkedin`, `Mail`, `Phone`
    - Projects: `Shield`, `Smartphone`, `Lock`, `Layout`, `Terminal`
    - Skills: `Cpu`, `Zap`, `PenTool`, `Code`
    - UI: `ChevronDown`, `X`, `Download`, `FileText`, `CheckCircle2`
  - Lightweight, customizable SVG icons with consistent styling

### Styling Approach

- **Custom CSS with Tailwind-like Utilities**
  - CSS custom properties (variables) for theming in `index.css`:
    - `--cyber-primary`: #00f0ff (cyan) - Main accent color
    - `--cyber-secondary`: #0066ff (blue) - Secondary accent
    - `--cyber-accent`: #ff00ff (pink) - Tertiary accent
    - `--cyber-black`: #0a0e1a - Dark background
  - Utility classes for spacing, colors, and layouts
  - Glass morphism effects with `backdrop-blur` and transparency
  - Gradient backgrounds and animated blobs for visual depth

### Key Features Implementation

#### 1. Scroll Progress Bar
```typescript
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
});
```
- Tracks scroll position and displays progress at the top

#### 2. Parallax Hero Section
```typescript
const y1 = useTransform(scrollY, [0, 500], [0, 200]);
const y2 = useTransform(scrollY, [0, 500], [0, -150]);
```
- Creates depth with different scroll speeds for background elements

#### 3. Smooth Section Navigation
```typescript
const handleScroll = (e, id) => {
  const element = document.getElementById(id);
  const offsetPosition = elementPosition + window.scrollY - navHeight;
  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
};
```
- Smooth scrolling to sections with navbar offset compensation

#### 4. Interactive Project Cards
- Hover effects with `whileHover={{ y: -10 }}`
- Staggered animations with `staggerChildren: 0.1`
- Gradient borders that change on hover
- GitHub links that open in new tabs

#### 5. Resume Modal
- Full-screen overlay with backdrop blur
- Scrollable content with professional resume layout
- Close button with smooth exit animation
- Triggered by button click in Hero section

#### 6. Responsive Design
- Mobile-first approach with breakpoints:
  - `md:` - Tablets (768px+)
  - `lg:` - Desktops (1024px+)
- Flexible grid layouts that adapt to screen size
- Hidden navigation on mobile, visible on desktop
- Responsive typography scaling

### Performance Optimizations

1. **Code Splitting** - Vite automatically splits code for faster loading
2. **Lazy Loading** - Components render only when in viewport
3. **Optimized Images** - SVG icons for scalability without quality loss
4. **Minimal Dependencies** - Only essential libraries included
5. **Tree Shaking** - Unused code removed in production build

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (LTS version) - [Download here](https://nodejs.org/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Step 1: Clone or Download the Project
```bash
git clone <your-repo-url>
cd portfolio
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000/`

### Step 4: Build for Production
```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Step 5: Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── App.tsx           # Main application component
│   ├── types.ts          # TypeScript type definitions
│   ├── index.tsx         # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## 🎨 Customization

### Update Personal Information
Edit the data constants in `App.tsx`:
- `PROJECTS` - Add/edit your projects
- `SKILL_GROUPS` - Update your skills
- `PUBLICATIONS` - Add your publications
- `CERTIFICATIONS` - List your certifications

### Update Contact Information
- Email: Update in the Contact section and Resume modal
- LinkedIn: Update the link in the Contact section
- GitHub: Update the link in the Contact section

### Change Colors
The color scheme uses CSS custom properties defined in `index.css`:
- `--cyber-primary`: Main accent color (cyan)
- `--cyber-secondary`: Secondary accent (blue)
- `--cyber-accent`: Tertiary accent (pink)
- `--cyber-black`: Background color

## 📧 Contact

- **Email**: padalingam4648@gmail.com
- **LinkedIn**: [Padalingam S](https://www.linkedin.com/in/padalingam-4648s4648)
- **GitHub**: [padalingam4648-atman](https://github.com/padalingam4648-atman)
- **Location**: Coimbatore, Tamil Nadu, India

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

- Built with React, TypeScript, and Vite
- Icons by Lucide React
- Animations by Framer Motion
- Fonts: Outfit, Space Grotesk, Fira Code (Google Fonts)
