/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Github, 
  Mail, 
  Phone, 
  MessageCircle,
  Code2, 
  Terminal, 
  Layout, 
  Cpu, 
  Wrench, 
  Lightbulb, 
  Award, 
  ExternalLink,
  ChevronRight,
  Send,
  User,
  BookOpen,
  CheckCircle2,
  Menu,
  X,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LibrarySystem } from './components/LibrarySystem';

// --- Types ---

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

interface Certification {
  title: string;
  issuer: string;
  icon: React.ReactNode;
}

// --- Components ---

const Navbar = ({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <div className="p-1.5 bg-emerald-500 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Code2 size={24} className="text-white" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-white">
            Prajwal
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={toggleDark}
            className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} className="text-zinc-300" /> : <Moon size={20} className="text-zinc-600" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <button 
            onClick={toggleDark} 
            className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 dark:border-zinc-800/50 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center md:text-left">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-4 text-balance"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-600 dark:text-zinc-400 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-20 h-1.5 bg-emerald-500 mt-4 rounded-full mx-auto md:mx-0"></div>
  </div>
);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle');
  const [showLibrarySystem, setShowLibrarySystem] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      skills: [
        { name: "C", icon: <Terminal size={20} />, level: 80 },
        { name: "Python", icon: <Code2 size={20} />, level: 40 },
        { name: "HTML", icon: <Layout size={20} />, level: 90 },
        { name: "CSS", icon: <Layout size={20} />, level: 90 },
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: <Wrench size={20} />, level: 100 },
        { name: "GitHub", icon: <Github size={20} />, level: 100 },
        { name: "Figma", icon: <Layout size={20} />, level: 30 },
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving", icon: <Lightbulb size={20} />, level: 90 },
        { name: "Communication", icon: <CheckCircle2 size={20} />, level: 85 },
        { name: "Leadership", icon: <User size={20} />, level: 80 },
      ]
    }
  ];

  const certifications: Certification[] = [
    { title: "Programming in C", issuer: "Infosys", icon: <Award size={24} /> },
    { title: "Introduction to AI", issuer: "IBM", icon: <Cpu size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500/30">
      <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[60] origin-left"
        style={{ scaleX: 0 }}
        id="scroll-progress"
      />

      {/* Hero Section */}
      <header className="min-h-screen flex items-center section-padding pt-32 lg:pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-balance">
              Hi, I'm <span className="gradient-text">Prajwal Gandhale</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 font-medium">
              A passionate Computer Engineering Student
            </p>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Aspiring web developer with a focus on building clean, efficient, and user-friendly digital experiences. Currently exploring the intersection of design and code.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center group"
              >
                Contact Me
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center space-x-4">
                <a href="https://github.com/PrajwalGandhale" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-full glass hover:text-emerald-500 transition-colors" aria-label="GitHub"><Github size={24} /></a>
                <a href="https://wa.me/919226535865" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-full glass hover:text-emerald-500 transition-colors" aria-label="WhatsApp"><MessageCircle size={24} /></a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-emerald-500 rounded-3xl rotate-6 opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 rounded-3xl -rotate-3 overflow-hidden border-2 border-white dark:border-zinc-700 shadow-2xl">
                <img 
                  src="https://i.ibb.co/h1xpZvHr/1000017742-4.jpg" 
                  alt="Prajwal Gandhale" 
                  className="w-full h-full object-cover contrast-[1.02] saturate-[1.05] brightness-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="section-padding bg-white dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Get to know me better, my education, and my aspirations.">
            About Me
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                I am a dedicated student currently pursuing my <span className="text-zinc-900 dark:text-white font-semibold">Diploma in Computer Science</span> at <a href="https://aissmscoe.com" target="_blank" rel="noopener noreferrer" className="text-emerald-500 font-semibold hover:underline decoration-2 underline-offset-4 transition-all">AISSMS</a>. My journey in technology started with a curiosity about how software works, which has now evolved into a passion for web development.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                My primary goal is to become a proficient <span className="text-zinc-900 dark:text-white font-semibold">Web Developer</span>. I enjoy solving complex problems and turning creative ideas into functional websites. I am constantly learning new technologies to stay updated with the ever-evolving tech landscape.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-6 sm:p-8 rounded-2xl space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500 shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-display font-bold mb-1">Education</h4>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Diploma in Computer Science</p>
                  <p className="text-xs sm:text-sm text-emerald-500 font-medium">
                    <a href="https://aissmscoe.com" target="_blank" rel="noopener noreferrer" className="hover:underline decoration-2 underline-offset-4 transition-all">AISSMS</a>, Pune
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500 shrink-0">
                  <Layout size={24} />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-display font-bold mb-1">Career Goal</h4>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Full Stack Web Developer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="The tools and technologies I use to bring ideas to life.">
            My Skills
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all group"
              >
                <h3 className="text-lg sm:text-xl font-display font-bold mb-6 flex items-center">
                  <span className="w-8 h-1 bg-emerald-500 mr-3 rounded-full"></span>
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-emerald-500 shrink-0">{skill.icon}</span>
                        <span className="text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                      </div>
                      <div className="w-20 sm:w-24 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-white dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Some of the projects I've worked on during my studies.">
            Featured Projects
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl glass"
            >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=100" 
                    alt="Library Management System" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-display font-bold">Student Library Management System</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowLibrarySystem(true)}
                      className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center text-xs font-bold"
                      title="Live Demo"
                    >
                      <Play size={16} className="mr-1" /> Demo
                    </button>
                    <a href="#" className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors"><ExternalLink size={20} /></a>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
                  A comprehensive system built with C language to manage book records, student issues, and returns efficiently.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">C Language</span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">Data Structures</span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">File Handling</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Certifications and recognition I've earned.">
            Achievements
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={cert.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center p-6 glass rounded-2xl space-x-4 sm:space-x-6 hover:border-emerald-500/50 transition-colors"
              >
                <div className="p-3 sm:p-4 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 shrink-0">
                  {cert.icon}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-display font-bold">{cert.title}</h4>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Certified by {cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Have a question or want to work together? Feel free to reach out!">
            Contact Me
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="p-3 sm:p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl shrink-0">
                  <Mail size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-emerald-500 uppercase tracking-wider">Email</p>
                  <a href="mailto:prajwalgandhale2009@gmail.com" className="text-lg sm:text-xl font-medium hover:text-emerald-500 transition-colors break-all">
                    prajwalgandhale2009@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="p-3 sm:p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl shrink-0">
                  <Phone size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-emerald-500 uppercase tracking-wider">Phone</p>
                  <a href="tel:9226535865" className="text-lg sm:text-xl font-medium hover:text-emerald-500 transition-colors">
                    +91 9226535865
                  </a>
                </div>
              </div>

              <div className="pt-4 sm:pt-8">
                <h4 className="text-xl font-display font-bold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/PrajwalGandhale" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:text-emerald-500 transition-all hover:-translate-y-1" aria-label="GitHub"><Github size={24} /></a>
                  <a href="https://wa.me/919226535865" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:text-emerald-500 transition-all hover:-translate-y-1" aria-label="WhatsApp"><MessageCircle size={24} /></a>
                </div>
              </div>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-6 sm:p-8 rounded-3xl space-y-6 relative"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                const whatsappMsg = `*New Message from Portfolio*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
                window.open(`https://wa.me/919226535865?text=${whatsappMsg}`, '_blank');
                
                setFormStatus('sent');
                form.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
              }}
            >
              <AnimatePresence>
                {formStatus === 'sent' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-10 glass rounded-3xl flex flex-col items-center justify-center text-center p-6"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-display font-bold mb-2">Message Prepared!</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Please click "Send" in the WhatsApp window that just opened to finish sending your message.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-6 text-emerald-500 font-bold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 ml-1">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none text-sm sm:text-base"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center group text-sm sm:text-base"
              >
                Send Message
                <Send size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-emerald-500 rounded-lg">
              <Code2 size={20} className="text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-zinc-900 dark:text-white">
              Prajwal
            </span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            © {new Date().getFullYear()} Prajwal Gandhale. All rights reserved.
          </p>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm flex items-center">
            Built with <span className="text-red-500 mx-1">❤️</span> by Prajwal Gandhale
          </p>
        </div>
      </footer>

      {/* Scroll to Top Script */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.onscroll = function() {
          var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var scrolled = (winScroll / height) * 100;
          document.getElementById("scroll-progress").style.scaleX = scrolled / 100;
        };
      `}} />

      {/* Library System Modal */}
      <AnimatePresence>
        {showLibrarySystem && (
          <LibrarySystem onClose={() => setShowLibrarySystem(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
