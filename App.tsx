import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Phone, ExternalLink, 
  Terminal, Shield, Cpu, Code, Database, Globe, 
  Award, BookOpen, Layers, Zap, MapPin, Download, ChevronDown,
  Camera, PenTool, Layout, Lock, Cloud, Server, Wifi, Search, CheckCircle2,
  FileText, Smartphone, X, User
} from 'lucide-react';

import { Project, SkillGroup, Publication, Certification, Achievement } from './types';

// --- DATA CONSTANTS ---

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Technical Skills",
    items: [
      "Cyber Security", "Cloud Technologies", 
      "Python", "Core Java", "C", "Git & GitHub", 
      "Linux Basics", "Networking", "UI/UX Principles",
      "Adobe Photoshop", "Figma", "Flutter (Beginner)"
    ]
  },
  {
    category: "Soft Skills",
    items: [
      "Team Collaboration", "Problem Solving", "Adaptability", 
      "Creativity", "Communication"
    ]
  }
];

const PROJECTS: Project[] = [
  {
    title: "MALCURE",
    category: "Cyber Security Research",
    description: [
      "Smart Malware Response Using CVE Intelligence."
    ],
    features: [
      "Automated vulnerability scanning",
      "Intelligence mapping",
      "CVSS scoring & Zero-day detection",
      "Auto-remediation workflows"
    ],
    tech: ["Python", "CVE API", "Automation", "Security"],
    color: "from-red-500 to-orange-500",
    icon: <Shield className="w-8 h-8" />,
    github: "https://github.com/padalingam4648-atman/Malcure"
  },
  {
    title: "FARMER APP",
    category: "Mobile Application",
    description: [
      "Smart Agricultural Assistance Mobile App."
    ],
    features: [
      "Real-time weather data",
      "Store locator & Gov schemes",
      "Clean, farmer-friendly UI",
      "Flutter + Firebase Architecture"
    ],
    tech: ["Flutter", "Firebase", "Dart", "UI/UX"],
    color: "from-green-400 to-emerald-600",
    icon: <Smartphone className="w-8 h-8" />,
    github: "https://github.com/padalingam4648-atman/Farmer-connect"
  },
  {
    title: "SECURE CLOUD",
    category: "Cloud Security",
    description: [
      "Securing Cloud Storage Using Homomorphic Encryption."
    ],
    features: [
      "Privacy-preserving encrypted computation",
      "Prevents data exposure",
      "Enhances trust in cloud platforms",
      "Advanced encryption algorithms"
    ],
    tech: ["Cryptography", "Cloud", "Research", "Algorithms"],
    color: "from-blue-400 to-cyber-secondary",
    icon: <Lock className="w-8 h-8" />,
    github: "https://github.com/padalingam4648-atman/Securing-Data-Encryption-Using-the-Homomorphic-Encryption"
  },
  {
    title: "MOBI-LOCATOR",
    category: "Android Security",
    description: [
      "Remote Device Security & Tracking Platform."
    ],
    features: [
      "SMS-triggered alarm & location tracking",
      "Remote device lock via SMS",
      "SIM card change monitoring",
      "Offline operation - no internet needed"
    ],
    tech: ["Android", "Kotlin", "SMS", "GPS"],
    color: "from-purple-500 to-pink-500",
    icon: <Smartphone className="w-8 h-8" />,
    github: "https://github.com/padalingam4648-atman/Mobi-Locator"
  },
  {
    title: "LUDO GAME",
    category: "Mobile Game",
    description: [
      "Classic Ludo Board Game - Mankatha Edition."
    ],
    features: [
      "Multiplayer gameplay",
      "Traditional Ludo rules",
      "Smooth animations",
      "Built with Flutter framework"
    ],
    tech: ["Flutter", "Dart", "Game Dev", "UI/UX"],
    color: "from-yellow-400 to-orange-500",
    icon: <Layout className="w-8 h-8" />,
    github: "https://github.com/padalingam4648-atman/Ludo---Mankatha"
  }
];

const PUBLICATIONS: Publication[] = [
  { 
    title: "Malcure: Smart Malware Response System Using CVE Intelligence", 
    journal: "House of Bhola Research Papers", 
    issn: "e-ISSN: 3048-5169" 
  },
  { 
    title: "Agri and Business Development Platform", 
    journal: "IJRPR", 
    issn: "ISSN: 2582-7421" 
  },
  { 
    title: "Securing Cloud Storage Using Homomorphic Encryption", 
    journal: "IJSREM", 
    issn: "ISSN: 2582-3930" 
  }
];

const CERTIFICATIONS: Certification[] = [
  { name: "Digital Skills – User Experience", issuer: "Accenture", icon: <Layout className="w-4 h-4"/> },
  { name: "Master ChatGPT", issuer: "UniAthena", icon: <Zap className="w-4 h-4"/> },
  { name: "Introduction to Cyber Security", issuer: "Simplilearn", icon: <Shield className="w-4 h-4"/> },
  { name: "Digital Skills – AI", issuer: "Accenture", icon: <Cpu className="w-4 h-4"/> },
  { name: "Introduction to CISSP Security Assessment", issuer: "Simplilearn", icon: <CheckCircle2 className="w-4 h-4"/> },
  { name: "OWASP Meetup", issuer: "Coimbatore", icon: <Globe className="w-4 h-4"/> },
  { name: "Communication Skills", issuer: "TCS ION", icon: <MessageIcon className="w-4 h-4"/> }
];

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// --- ANIMATION VARIANTS ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

// --- COMPONENTS ---

const ResumeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white text-gray-900 w-full max-w-4xl max-h-full rounded-xl shadow-2xl overflow-hidden flex flex-col relative z-10"
      >
        {/* Header / Toolbar */}
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" />
            <h2 className="font-display font-bold text-sm md:text-lg tracking-tight text-gray-700">RESUME_PADALINGAM_S.pdf</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-12 font-sans space-y-8 bg-white">
            {/* Resume Content */}
            {/* Header */}
            <div className="text-center border-b-2 border-gray-900 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-3">Padalingam S</h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-medium text-gray-600">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> padalingam4648@gmail.com</span>
                    <span className="hidden md:inline">|</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> Coimbatore, Tamilnadu</span>
                    <span className="hidden md:inline">|</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3"/> Cyber Security & Design</span>
                </div>
            </div>

            {/* Education */}
            <section>
                <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">Education</h3>
                <div className="space-y-4">
                    <div className="flex justify-between md:flex-row flex-col gap-1">
                        <div>
                            <h4 className="font-bold text-gray-900">Sri Shakthi Institute of Engineering and Technology</h4>
                            <p className="text-sm text-gray-700">B.E. Computer Science Engineering (Cyber Security)</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="font-medium text-gray-900">Sep 2023 - Sep 2027</p>
                            <p className="text-sm text-gray-600">CGPA: 7.3/10</p>
                        </div>
                    </div>
                     <div className="flex justify-between md:flex-row flex-col gap-1">
                        <div>
                            <h4 className="font-bold text-gray-900">S.N.Ramasamy Raja Higher Secondary School</h4>
                            <p className="text-sm text-gray-700">HSC</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="font-medium text-gray-900">June 2022 - Apr 2023</p>
                            <p className="text-sm text-gray-600">Grade: 84.6%</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Skills */}
            <section>
                <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">Skills</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-gray-800">
                    <li><span className="font-bold text-gray-900">Programming Languages:</span> Python, Core Java, C</li>
                    <li><span className="font-bold text-gray-900">Tools & Tech:</span> GitHub, Linux, Adobe Photoshop, Figma, Flutter</li>
                    <li><span className="font-bold text-gray-900">Soft Skills:</span> Team collaboration, Problem solving, Adaptability</li>
                </ul>
            </section>

            {/* Projects */}
             <section>
                <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">Projects</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-base text-gray-900 mb-1">Malcure – Smart Malware Response Using CVE Intelligence</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            <li>Built an automated system that scans entire environments for vulnerabilities and maps findings to relevant CVEs.</li>
                            <li>Added capabilities to detect potential zero-day issues and prioritize all risks using CVSS.</li>
                            <li>Created automated remediation workflows that deploy patches, update configurations, and generate full audit logs with post-fix verification.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-base text-gray-900 mb-1">Farmer App</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            <li>Developed a Flutter-based mobile application providing farmers with essential agricultural information, including real-time weather updates.</li>
                            <li>Integrated a nearby agriculture store locator and government scheme information.</li>
                            <li>Designed a clean, easy-to-use interface suitable for farmers with minimal technical experience.</li>
                        </ul>
                    </div>
                </div>
            </section>

             {/* Certifications */}
             <section>
                <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">Certifications</h3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div>
                        <h5 className="font-bold text-gray-900 mb-1">Accenture</h5>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Digital Skills: User Experience</li>
                            <li>Digital Skills: Artificial Intelligence</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-gray-900 mb-1">Simplilearn</h5>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Introduction to CISSP Security Assessment & Testing</li>
                            <li>Security Operations</li>
                        </ul>
                    </div>
                     <div>
                        <h5 className="font-bold text-gray-900 mb-1">Uniathena</h5>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>MasterChatGPT</li>
                        </ul>
                    </div>
                     <div>
                        <h5 className="font-bold text-gray-900 mb-1">TCS iON</h5>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Communication Skills</li>
                        </ul>
                    </div>
                </div>
            </section>
             <section>
                <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wide">Interest in Other Fields</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-gray-800">
                    <li>Graphic Design</li>
                    <li>UI-UX Design</li>
                </ul>
            </section>
        </div>
      </motion.div>
    </div>
  )
}

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    const navHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navHeight;
  
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

const SectionTitle = ({ children, subtitle }: { children?: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16 md:mb-24 text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block mb-2"
    >
      <span className="py-1 px-3 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary text-xs font-mono tracking-[0.2em] uppercase">
        {subtitle}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight glow-text"
    >
      {children}
    </motion.h2>
    <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-cyber-secondary to-transparent mx-auto rounded-full" />
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-40 px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-cyber-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyber-primary to-cyber-secondary rounded flex items-center justify-center text-black font-bold text-sm">P</div>
          <span>PADA<span className="text-cyber-primary">LINGAM</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono text-gray-400 tracking-widest">
          {['ABOUT', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleScroll(e, item.toLowerCase())}
              className="hover:text-cyber-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-cyber-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <motion.div 
          style={{ y: y1, x: -100 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-secondary/20 rounded-full blur-[128px] animate-pulse" 
        />
        <motion.div 
          style={{ y: y2, x: 100 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyber-primary/10 rounded-full blur-[128px] animate-blob" 
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-accent"></span>
            </span>
            <span className="text-xs font-mono text-gray-300 tracking-widest uppercase">Available for Hire</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-bold text-white leading-tight mb-6 tracking-tight"
        >
          CYBER SECURITY <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-secondary">
            & CREATIVE DESIGN
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-cyber-muted text-lg md:text-xl max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          I am <strong className="text-white">Padalingam S</strong>. An aspiring Cyber Security Engineer specializing in Prompt Engineering, Automation Tools, Digital Products, Python Scripting, and Cyber Security.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={onOpenResume}
            className="px-8 py-4 bg-cyber-primary text-cyber-black font-bold font-display rounded hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center gap-2 group"
          >
            <FileText className="w-5 h-5" />
            VIEW RESUME
          </button>
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, 'contact')}
            className="px-8 py-4 glass-panel text-white font-display font-bold rounded hover:bg-white/10 transition-all flex items-center gap-2"
          >
            CONTACT ME
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ChevronDown className="w-8 h-8 opacity-50" />
      </motion.div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-32 relative">
    <div className="max-w-6xl mx-auto px-6">
      <SectionTitle subtitle="Biography">ABOUT ME</SectionTitle>
      
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyber-primary/20 transition-all" />
            
            <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight">
              Crafting Secure, <span className="text-cyber-primary">Automated</span> & Intelligent Solutions
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I am currently pursuing my <strong>B.E. in Computer Science and Engineering</strong> (2023–2027) at Sri Shakthi Institute of Engineering and Technology with a CGPA of <strong>7.44</strong>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              My expertise bridges the gap between <strong>Cyber Security</strong> and <strong>Creative Design</strong>. I don't just secure systems; I design the interfaces that make security accessible. From automated Python scripts to pixel-perfect Figma prototypes, I enjoy solving real-world vulnerabilities and crafting visually appealing digital products.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {['Prompt Engineering', 'Cyber Security', 'Automation Tools', 'Python Scripts', 'UI/UX'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyber-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats / Visuals */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <motion.div variants={scaleIn} className="glass-panel p-6 rounded-2xl text-center hover:border-cyber-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto bg-cyber-primary/20 rounded-full flex items-center justify-center mb-4 text-cyber-primary">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white">Security</h4>
            <p className="text-xs text-gray-500 mt-1">Vulnerability Assessment</p>
          </motion.div>

          <motion.div variants={scaleIn} className="glass-panel p-6 rounded-2xl text-center hover:border-cyber-secondary/50 transition-colors">
            <div className="w-12 h-12 mx-auto bg-cyber-secondary/20 rounded-full flex items-center justify-center mb-4 text-cyber-secondary">
              <PenTool className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white">Design</h4>
            <p className="text-xs text-gray-500 mt-1">UI/UX & Branding</p>
          </motion.div>

          <motion.div variants={scaleIn} className="glass-panel p-6 rounded-2xl text-center hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-500">
              <Terminal className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white">Automation</h4>
            <p className="text-xs text-gray-500 mt-1">Python Scripts & Tools</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-32 bg-black/40 relative">
    <div className="max-w-6xl mx-auto px-6">
      <SectionTitle subtitle="Expertise">SKILLS & ARSENAL</SectionTitle>
      
      <div className="grid md:grid-cols-2 gap-12">
        {SKILL_GROUPS.map((group, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-bold text-white flex items-center gap-3 tracking-tight">
              {idx === 0 ? <Cpu className="text-cyber-primary"/> : <Zap className="text-cyber-accent"/>}
              {group.category}
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {group.items.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-sm text-gray-300 font-mono flex items-center gap-2 cursor-default transition-all"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-cyber-secondary' : 'bg-cyber-accent'}`} />
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => {
  const mainProjects = PROJECTS.slice(0, 3);
  const miniProjects = PROJECTS.slice(3);

  return (
    <section id="projects" className="py-32 relative">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-r from-cyber-secondary/5 via-cyber-primary/5 to-cyber-secondary/5 -skew-y-6 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Innovation">FEATURED PROJECTS</SectionTitle>
        
        {/* Main Projects */}
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-display font-bold text-white mb-8 flex items-center gap-3"
          >
            <div className="w-2 h-8 bg-gradient-to-b from-cyber-primary to-cyber-secondary rounded-full" />
            Major Projects
          </motion.h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {mainProjects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full border border-white/10 hover:border-cyber-primary/50 transition-all duration-300 shadow-lg hover:shadow-cyber-primary/20"
              >
                {/* Card Header */}
                <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-lg text-white group-hover:text-cyber-primary transition-colors border border-white/10">
                      {project.icon}
                    </div>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">{project.title}</h3>
                  
                  <div className="mb-6 space-y-2">
                    {project.description.map((desc, i) => (
                      <p key={i} className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                    ))}
                  </div>

                  <div className="space-y-2 mb-8 flex-1">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-cyber-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-bold text-gray-400 bg-black/50 px-3 py-1.5 rounded-md border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-cyber-primary hover:text-black text-white rounded-lg border border-white/20 hover:border-cyber-primary transition-all font-mono text-sm font-bold w-full justify-center"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mini Projects */}
        {miniProjects.length > 0 && (
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-display font-bold text-white mb-8 flex items-center gap-3"
            >
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
              Mini Projects
            </motion.h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {miniProjects.map((project, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full border border-white/10 hover:border-cyber-primary/50 transition-all duration-300 shadow-lg hover:shadow-cyber-primary/20"
                >
                  {/* Card Header */}
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white/5 rounded-lg text-white group-hover:text-cyber-primary transition-colors border border-white/10">
                        {project.icon}
                      </div>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">{project.title}</h3>
                    
                    <div className="mb-6 space-y-2">
                      {project.description.map((desc, i) => (
                        <p key={i} className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                      ))}
                    </div>

                    <div className="space-y-2 mb-8 flex-1">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-cyber-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs font-bold text-gray-400 bg-black/50 px-3 py-1.5 rounded-md border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-cyber-primary hover:text-black text-white rounded-lg border border-white/20 hover:border-cyber-primary transition-all font-mono text-sm font-bold w-full justify-center"
                      >
                        <Github className="w-4 h-4" />
                        View on GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Publications = () => (
  <section className="py-24 bg-cyber-black relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <SectionTitle subtitle="Research">PUBLICATIONS</SectionTitle>
      
      <div className="grid gap-6">
        {PUBLICATIONS.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 md:p-8 rounded-xl border-l-4 border-cyber-accent flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/5 transition-all group"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-cyber-accent" />
                <span className="text-xs font-mono text-cyber-accent uppercase tracking-wider">Research Paper</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyber-primary transition-colors mb-1 tracking-tight">
                {pub.title}
              </h3>
              <p className="text-gray-400 text-sm">{pub.journal}</p>
            </div>
            {pub.issn && (
              <span className="text-xs font-mono text-gray-500 border border-white/10 px-3 py-1 rounded bg-black/30 whitespace-nowrap">
                {pub.issn}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Certifications = () => (
  <section className="py-24 relative">
    <div className="max-w-6xl mx-auto px-6">
      <SectionTitle subtitle="Credentials">CERTIFICATIONS</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel p-4 rounded-lg flex items-center gap-4 hover:bg-white/10 transition-colors border border-white/5"
          >
            <div className="w-10 h-10 rounded-lg bg-cyber-secondary/20 flex items-center justify-center text-cyber-secondary shrink-0">
              {cert.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight mb-1">{cert.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{cert.issuer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ExtraCurricular = () => (
  <section className="py-24 bg-black/30">
    <div className="max-w-6xl mx-auto px-6">
      <SectionTitle subtitle="Beyond Code">ACTIVITIES & EXPERIENCE</SectionTitle>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Education */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3 tracking-tight">
            <BookOpen className="text-cyber-primary" /> EDUCATION
          </h3>
          <div className="space-y-8 pl-4 border-l border-white/10 relative">
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-cyber-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
              <h4 className="text-xl font-bold text-white">B.E CSE (Cyber Security)</h4>
              <p className="text-cyber-primary text-sm mb-2">Sri Shakthi Institute of Engineering and Technology</p>
              <p className="text-gray-400 text-sm">2023 – 2027 | CGPA: 7.44</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-600" />
              <h4 className="text-xl font-bold text-white">HSC</h4>
              <p className="text-gray-500 text-sm mb-2">State Board</p>
              <p className="text-gray-400 text-sm">Completed 2023 | 84.6%</p>
            </div>
          </div>
        </motion.div>

        {/* Guild Work & Achievements */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3 tracking-tight">
            <Camera className="text-cyber-secondary" /> MEDIA & EVENTS
          </h3>
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border-l-2 border-cyber-secondary">
              <h4 className="font-bold text-white mb-1">Media Guild Club</h4>
              <p className="text-sm text-gray-400 mb-2">Designer & Photographer</p>
              <p className="text-xs text-gray-500">Created posters, branding visuals, and covered event photography.</p>
            </div>
            
            <div className="glass-panel p-6 rounded-xl border-l-2 border-cyber-accent">
              <h4 className="font-bold text-white mb-1">KALAM 2025</h4>
              <p className="text-sm text-gray-400 mb-2">Workshop Co-Conductor</p>
              <p className="text-xs text-gray-500">Taught graphic design basics, color theory, and typography to participants.</p>
            </div>

            <div className="glass-panel p-6 rounded-xl border-l-2 border-pink-500">
              <h4 className="font-bold text-white mb-1">Velan Thiruvizha</h4>
              <p className="text-sm text-gray-400 mb-2">Official Photographer & Designer</p>
              <p className="text-xs text-gray-500">Managed event branding and captured official moments.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <SectionTitle subtitle="Collaboration">GET IN TOUCH</SectionTitle>
      
      <div className="glass-panel p-10 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyber-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 tracking-tight">
          Let's Build Something <span className="text-cyber-primary">Secure</span> & <span className="text-cyber-secondary">Creative</span>
        </h3>
        
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          I am available for freelance projects and full-time opportunities in Cyber Security, Automation, and UI/UX Design.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
          <a href="mailto:padalingam4648@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-full hover:bg-cyber-primary hover:text-black transition-all border border-white/10 w-full md:w-auto justify-center group">
            <Mail className="w-5 h-5" />
            <span className="font-mono text-sm">padalingam4648@gmail.com</span>
          </a>
        </div>

        <div className="flex justify-center gap-8">
          <a href="https://www.linkedin.com/in/padalingam-4648s4648" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-[#0077b5] hover:text-white hover:scale-110 transition-all border border-white/5">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://github.com/padalingam4648-atman" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-black hover:text-white hover:scale-110 transition-all border border-white/5">
            <Github className="w-6 h-6" />
          </a>
          <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
            <MapPin className="w-4 h-4" />
            South India (Open to Relocate)
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 text-center bg-black border-t border-white/5 relative z-10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-500 text-sm">&copy; 2025 Padalingam S. All rights reserved.</p>
      <div className="flex items-center gap-4 text-xs font-mono text-gray-600">
        <span>REACT</span>
        <span>TAILWIND</span>
        <span>FRAMER MOTION</span>
        <span>GEMINI AI</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-cyber-black text-slate-200 selection:bg-cyber-primary selection:text-black min-h-screen relative font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-secondary via-cyber-primary to-cyber-accent z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Certifications />
        <ExtraCurricular />
        <Contact />
      </main>
      <Footer />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}