import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { X, Send, Bot, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RESUME_CONTEXT = `
You are an AI assistant for Padalingam S's portfolio website. Your name is "Padalingam AI".
Answer questions based strictly on the following resume context. Be professional, enthusiastic, and concise.

Name: Padalingam S
Role: Aspiring Cyber Security Engineer, Prompt Engineer, Creative Designer, Python Learner.
Education: B.E Computer Science and Engineering (2023–2027) at Sri Shakthi Institute of Engineering and Technology (CGPA: 7.44).
Location: Coimbatore / Tenkasi, India. Open to relocation in South India.
Contact: padalingam7788@gmail.com

Specializations: Prompt Engineering, Cyber Security, Cloud Infrastructure, Digital Products, Automation, UI/UX Design.

Skills:
- Technical: Cyber Security, Cloud Technologies, Python, Core Java, C, Git & GitHub, Linux Basics, Networking, UI/UX Principles.
- Tools: Adobe Photoshop, Figma, Flutter (Beginner).
- Soft Skills: Team Collaboration, Problem Solving, Adaptability, Creativity, Communication.
- Languages: Tamil, English.

Projects:
1. MALCURE: Smart Malware Response Using CVE Intelligence. Automated vulnerability scanning, CVSS scoring, zero-day detection, patch deployment.
2. FARMER APP: Smart Agricultural Assistance. Flutter + Firebase, real-time weather, store locator, gov schemes.
3. Securing Cloud Storage Using Homomorphic Encryption. Privacy-preserving encrypted computation research.

Publications:
- Malcure: Smart Malware Response System (House of Bhola)
- Agri and Business Development Platform (IJRPR)
- Securing Cloud Storage Using Homomorphic Encryption (IJSREM)

Certifications:
- Digital Skills – User Experience (Accenture)
- Master ChatGPT (UniAthena)
- Introduction to Cyber Security (Simplilearn)
- Digital Skills – AI (Accenture)
- Introduction to CISSP Security Assessment (Simplilearn)
- OWASP Meetup – Coimbatore
- TCS ION Communication Skills

Extra-Curricular:
- Media Guild Club designer & photographer.
- KALAM 2025: Graphic Design Workshop Co-Conductor.
- Velan Thiruvizha: Official Photographer & Poster Designer.

Achievements: Co-conducted graphic design workshops, official event photographer/branding lead.
`;

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hi! I'm Padalingam's AI assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Helper to get API key safely across environments (Vite Local vs Sandbox)
  const getApiKey = () => {
    try {
      // Check for Vite environment variable
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) {
        // @ts-ignore
        return import.meta.env.VITE_API_KEY;
      }
    } catch (e) {
      // Ignore errors if import.meta is not available
    }
    
    // Check for standard process.env (Sandbox / Node)
    try {
      if (typeof process !== 'undefined' && process.env?.API_KEY) {
        return process.env.API_KEY;
      }
    } catch (e) {
      // Ignore ReferenceError if process is not defined
    }
    
    return "";
  };

  const initChat = () => {
    const apiKey = getApiKey();
    if (!apiKey) return;

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: RESUME_CONTEXT,
        },
      });
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  };

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      initChat();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const apiKey = getApiKey();
    if (!input.trim() || !apiKey) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      if (!chatRef.current) initChat();
      
      if (chatRef.current) {
        const result: GenerateContentResponse = await chatRef.current.sendMessage({ message: userMsg });
        setMessages(prev => [...prev, { role: 'model', text: result.text || "I'm having trouble thinking right now." }]);
      } else {
         setMessages(prev => [...prev, { role: 'model', text: "API Key not configured. Please add VITE_API_KEY to your .env file." }]);
      }
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white shadow-[0_0_20px_rgba(0,240,255,0.5)] border border-white/20 group"
      >
        <Sparkles className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] z-50 glass-panel rounded-2xl flex flex-col overflow-hidden border border-cyber-primary/30 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyber-primary" />
                <h3 className="font-display font-bold text-white tracking-tight text-sm">Padalingam AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyber-primary text-cyber-black font-medium rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyber-primary" />
                    <span className="text-xs text-gray-400">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/60 backdrop-blur-md">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Padalingam..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-primary/50 transition-colors placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="p-3 bg-cyber-primary text-cyber-black rounded-xl hover:bg-white hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};