# Personal Portfolio Website - Complete LAB Guide

## React.js Assignment with Git Workflow

---

## 📋 Project Overview

สร้าง Personal Portfolio Website ด้วย React.js โดยใช้ Git workflow ในการพัฒนา feature ทีละส่วน

### 🎯 Learning Objectives

- เรียนรู้ Git workflow และ feature branching
- ฝึกใช้ React Components, Props, State, และ Context API
- เรียนรู้การ Build และ Deploy React Application
- พัฒนาทักษะการออกแบบ UI/UX

### 📊 งานแบ่งตามสัดส่วน

- **50% - Complete Starter Code** (โครงหลัก + Header + About + Theme Switcher)
- **50% - Feature Development** (Projects + Contact + Enhancements)

---

## 🚀 Initial Setup & Complete Starter Code

### Step 1: Create Project

```bash
# สร้างโปรเจค
npm create vite@latest my-portfolio -- --template react
cd my-portfolio
npm install

# เพิ่ม dependencies ที่จำเป็น
npm install lucide-react
```

### Step 2: Complete Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx          ✅ Complete
│   │   └── Header.css          ✅ Complete
│   ├── About/
│   │   ├── About.jsx           ✅ Complete
│   │   └── About.css           ✅ Complete
│   ├── Projects/
│   │   ├── Projects.jsx        🔄 Template only
│   │   ├── ProjectCard.jsx     🔄 Template only
│   │   └── Projects.css        🔄 Basic styles
│   ├── Contact/
│   │   ├── Contact.jsx         🔄 Template only
│   │   └── Contact.css         🔄 Basic styles
│   └── ThemeToggle/
│       ├── ThemeToggle.jsx     ✅ Complete
│       └── ThemeToggle.css     ✅ Complete
├── contexts/
│   └── ThemeContext.jsx        ✅ Complete
├── data/
│   └── portfolioData.js        🔄 Template data
├── styles/
│   └── global.css              ✅ Complete
├── assets/
│   └── images/                 📁 Empty folder
├── App.jsx                     ✅ Complete
└── main.jsx                    ✅ Complete
```

### Step 3: Complete ThemeContext (ให้สมบูรณ์)

```jsx
// src/contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // โหลด theme จาก localStorage
    const saved = localStorage.getItem('portfolio-theme');
    return saved || 'light';
  });

  useEffect(() => {
    // บันทึก theme ลง localStorage
    localStorage.setItem('portfolio-theme', theme);
    // อัพเดท CSS custom properties
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Step 4: Complete Global Styles

```css
/* src/styles/global.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* CSS Variables for Theming */
:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  --accent-primary: #3b82f6;
  --accent-secondary: #1d4ed8;
  --accent-tertiary: #dbeafe;
  --border-color: #e2e8f0;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

:root[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --accent-primary: #60a5fa;
  --accent-secondary: #3b82f6;
  --accent-tertiary: #1e3a8a;
  --border-color: #334155;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3);
}

/* Reset และ Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.App {
  min-height: 100vh;
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  padding: 5rem 0;
}

.btn-primary {
  background: var(--accent-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--accent-primary);
  border: 2px solid var(--accent-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary:hover {
  background: var(--accent-primary);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .section {
    padding: 3rem 0;
  }
}
```

### Step 5: Complete Header Component

```jsx
// src/components/Header/Header.jsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>Your Name</h2>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><button onClick={() => scrollToSection('about')}>About</button></li>
              <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
            </ul>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
```

```css
/* src/components/Header/Header.css */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(var(--bg-primary-rgb), 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo h2 {
  color: var(--accent-primary);
  font-weight: 600;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-list button {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.nav-list button:hover {
  color: var(--accent-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }

  .nav-list button {
    text-align: left;
    padding: 0.5rem 0;
    font-size: 1.1rem;
  }
}
```

### Step 6: Complete ThemeToggle Component

```jsx
// src/components/ThemeToggle/ThemeToggle.jsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}

export default ThemeToggle;
```

```css
/* src/components/ThemeToggle/ThemeToggle.css */
.theme-toggle {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--bg-tertiary);
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}
```

### Step 7: Complete About Component

```jsx
// src/components/About/About.jsx
import { Code, Palette, Zap, Heart } from 'lucide-react';
import './About.css';

function About() {
  const skills = [
    { name: 'Frontend Development', icon: <Code size={24} />, color: '#3b82f6' },
    { name: 'UI/UX Design', icon: <Palette size={24} />, color: '#10b981' },
    { name: 'Performance Optimization', icon: <Zap size={24} />, color: '#f59e0b' },
    { name: 'Problem Solving', icon: <Heart size={24} />, color: '#ef4444' }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-description">
              Hello! I'm a passionate web developer with a love for creating 
              beautiful and functional user experiences. I enjoy turning complex 
              problems into simple, elegant solutions.
            </p>
            <p className="about-description">
              When I'm not coding, you can find me exploring new technologies, 
              reading tech blogs, or working on personal projects that challenge 
              my creativity and technical skills.
            </p>
            
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div 
                    className="skill-icon"
                    style={{ backgroundColor: skill.color + '20', color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <a href="/resume.pdf" className="btn-primary" download>
                Download Resume
              </a>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="about-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <p>Your Photo Here</p>
                <small>Add your profile picture</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
```

```css
/* src/components/About/About.css */
.about {
  background: var(--bg-secondary);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-2px);
}

.skill-icon {
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-name {
  font-weight: 500;
  color: var(--text-primary);
}

.about-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.about-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  border: 3px solid var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.placeholder-content {
  text-align: center;
  color: var(--text-tertiary);
}

.placeholder-content p {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .about-actions {
    flex-direction: column;
    align-items: center;
  }

  .image-placeholder {
    width: 250px;
    height: 250px;
  }
}
```

### Step 8: Complete Main App

```jsx
// src/App.jsx
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header/Header';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './styles/global.css';

function App() {
  useEffect(() => {
    // Smooth scrolling offset for fixed header
    const style = document.createElement('style');
    style.innerHTML = `
      html {
        scroll-padding-top: 80px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main>
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### Step 9: Template Components (สำหรับให้นักศึกษาทำต่อ)

```jsx
// src/components/Projects/Projects.jsx - Template
import './Projects.css';

function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          Here are some of the projects I've worked on recently.
        </p>
        
        {/* TODO: นักศึกษาเพิ่ม project list ที่นี่ */}
        <div className="projects-grid">
          <div className="project-placeholder">
            <p>Add your projects here</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
```

```jsx
// src/components/Contact/Contact.jsx - Template
import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a project in mind? Let's work together!
        </p>
        
        {/* TODO: นักศึกษาเพิ่ม contact form ที่นี่ */}
        <div className="contact-placeholder">
          <p>Add contact form here</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
```

---

## 🌟 Git Workflow Development Process

### Phase 1: Initial Setup และ Repository Creation

```bash
# 1. Initialize Git repository
git init

# 2. Create .gitignore
echo "node_modules/
dist/
.env
.env.local
.DS_Store
*.log" > .gitignore

# 3. Initial commit
git add .
git commit -m "feat: initial project setup with complete starter code

- Complete ThemeContext with localStorage persistence
- Complete Header component with mobile navigation
- Complete About section with skills showcase
- Complete ThemeToggle with smooth animations
- Complete global styles with CSS variables
- Template structure for Projects and Contact components"

# 4. Create GitHub repository และ push
git branch -M main
git remote add origin https://github.com/[username]/portfolio-website.git
git push -u origin main
```

### Phase 2: Feature Development (นักศึกษาทำ)

#### Feature 1: Projects Section

```bash
# สร้าง feature branch
git checkout -b feature/projects-section

# TODO: นักศึกษาพัฒนา Projects component
# - สร้าง projects data structure
# - สร้าง ProjectCard component
# - เพิ่ม project filtering (optional)
# - เพิ่ม project images และ links

# เมื่อเสร็จแล้ว
git add .
git commit -m "feat: implement projects section

- Add projects data structure with sample projects
- Create ProjectCard component with hover effects
- Add project filtering by technology
- Implement responsive grid layout
- Add external links to GitHub and live demos"

git push origin feature/projects-section
```

#### Feature 2: Contact Form

```bash
# สร้าง feature branch
git checkout main
git pull origin main
git checkout -b feature/contact-form

# TODO: นักศึกษาพัฒนา Contact component
# - สร้าง contact form with validation
# - เพิ่ม form submission handling
# - เพิ่ม social media links
# - เพิ่ม contact information

# เมื่อเสร็จแล้ว
git add .
git commit -m "feat: implement contact form with validation

- Add contact form with name, email, message fields
- Implement form validation with error messages
- Add form submission handling with success feedback
- Add social media links (GitHub, LinkedIn, etc.)
- Add contact information section"

git push origin feature/contact-form
```

#### Feature 3: Enhancements และ Polish

```bash
# สร้าง feature branch
git checkout main
git pull origin main
git checkout -b feature/enhancements

# TODO: นักศึกษาเพิ่ม enhancements
# - เพิ่ม animations และ micro-interactions
# - ปรับปรุง responsive design
# - เพิ่ม loading states
# - เพิ่ม SEO meta tags
# - เพิ่ม favicon

# เมื่อเสร็จแล้ว
git add .
git commit -m "feat: add enhancements and polish

- Add smooth animations and micro-interactions
- Improve responsive design for all screen sizes
- Add loading states for better UX
- Implement SEO optimization with meta tags
- Add custom favicon and app icons
- Add scroll-to-top functionality"

git push origin feature/enhancements
```

### Phase 3: Integration และ Final Polish

```bash
# Merge ทุก feature กลับไป main
git checkout main

# Merge feature branches (หรือใช้ GitHub Pull Requests)
git merge feature/projects-section
git merge feature/contact-form  
git merge feature/enhancements

# Final commit
git add .
git commit -m "feat: final integration and polish

- Integrate all features into cohesive portfolio
- Add final touches and bug fixes
- Optimize performance and accessibility
- Update documentation"

git push origin main
```

---

## 🚀 Build และ Deployment Guide

### Step 1: Pre-deployment Preparation

```bash
# 1. ทดสอบ build locally
npm run build

# 2. ทดสอบ preview
npm run preview

# 3. ตรวจสอบ console errors
# เปิด browser dev tools และตรวจสอบ errors

# 4. ตรวจสอบ responsive design
# ทดสอบใน mobile, tablet, desktop
```

### Step 2: Environment Configuration

```javascript
// vite.config.js - ปรับแต่งสำหรับ deployment
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // สำหรับ GitHub Pages ใช้ '/<repository-name>/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // ปิดสำหรับ production
  }
})
```

### Step 3: Deployment Options

#### Option 1: Netlify (แนะนำ - ง่ายที่สุด)

```bash
# Method 1: Drag & Drop
1. Build project: npm run build
2. ไปที่ https://netlify.com
3. Drag folder 'dist' ไปใส่ในหน้า deploy

# Method 2: Git Integration (แนะนำ)
1. Push code ไป GitHub
2. ไปที่ https://netlify.com
3. คลิก "New site from Git"
4. เชื่อมต่อ GitHub account
5. เลือก repository
6. Build settings:
   - Build command: npm run build
   - Publish directory: dist
7. คลิก "Deploy site"

# Auto-deploy setup
# ทุกครั้งที่ push ไป main branch จะ auto-deploy
```

#### Option 2: Vercel

```bash
# Method 1: Vercel CLI
npm i -g vercel
vercel login
vercel --prod

# Method 2: Git Integration
1. ไปที่ https://vercel.com
2. Import from GitHub
3. เลือก repository
4. Deploy (auto-detect React settings)
```

#### Option 3: GitHub Pages

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. เพิ่มใน package.json
{
  "homepage": "https://[username].github.io/[repository-name]",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# 3. Deploy
npm run deploy

# 4. ตั้งค่าใน GitHub repository
# Settings > Pages > Source: gh-pages branch
```

#### Option 4: Firebase Hosting

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login และ initialize
firebase login
firebase init hosting

# 3. Configuration
# Public directory: dist
# Single-page app: Yes
# Overwrite index.html: No

# 4. Build และ deploy
npm run build
firebase deploy
```

### Step 4: Custom Domain Setup (Optional)

```bash
# Netlify
1. Domain settings > Add custom domain
2. Configure DNS records ที่ domain provider

# Vercel  
1. Project settings > Domains
2. Add domain และ configure DNS

# GitHub Pages
1. Settings > Pages > Custom domain
2. Add CNAME record ใน DNS
```

### Step 5: Performance Optimization

```javascript
// src/main.jsx - Add performance monitoring
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Performance measurement
if (process.env.NODE_ENV === 'production') {
  // Web Vitals measurement
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Step 6: SEO Optimization

```html
<!-- public/index.html - Update meta tags -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Personal portfolio of [Your Name] - Web Developer specializing in React.js and modern frontend technologies" />
  <meta name="keywords" content="web developer, react, javascript, frontend, portfolio" />
  <meta name="author" content="Your Name" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-portfolio-url.com/" />
  <meta property="og:title" content="Your Name - Web Developer Portfolio" />
  <meta property="og:description" content="Personal portfolio showcasing web development projects and skills" />
  <meta property="og:image" content="https://your-portfolio-url.com/og-image.jpg" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://your-portfolio-url.com/" />
  <meta property="twitter:title" content="Your Name - Web Developer Portfolio" />
  <meta property="twitter:description" content="Personal portfolio showcasing web development projects and skills" />
  <meta property="twitter:image" content="https://your-portfolio-url.com/og-image.jpg" />
  
  <title>Your Name - Web Developer Portfolio</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 📊 Development Phases และ Timeline

### Phase 1: Setup & Initial Commit (15 นาที)

- [ ] Clone starter code
- [ ] Install dependencies
- [ ] Test run locally
- [ ] Create GitHub repository
- [ ] Initial commit

### Phase 2: Projects Section Development (60 นาที)

- [ ] Create branch `feature/projects-section`
- [ ] Design projects data structure
- [ ] Build ProjectCard component
- [ ] Implement projects grid layout
- [ ] Add hover effects และ animations
- [ ] Test responsive design
- [ ] Commit และ push

**Expected Output:**

```jsx
// src/data/portfolioData.js - ตัวอย่างที่นักศึกษาต้องทำ
export const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A full-featured online store built with React and Node.js",
    image: "/images/ecommerce-project.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    demoUrl: "https://my-ecommerce-demo.netlify.app",
    githubUrl: "https://github.com/username/ecommerce-project",
    featured: true
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather application with location-based forecasts",
    image: "/images/weather-app.jpg",
    technologies: ["React", "OpenWeather API", "CSS3"],
    demoUrl: "https://my-weather-app.netlify.app",
    githubUrl: "https://github.com/username/weather-app",
    featured: false
  },
  // นักศึกษาเพิ่มอย่างน้อย 3 projects
];
```

### Phase 3: Contact Form Development (45 นาที)

- [ ] Create branch `feature/contact-form`
- [ ] Build contact form with validation
- [ ] Add form submission handling
- [ ] Create social media links section
- [ ] Add contact information
- [ ] Test form functionality
- [ ] Commit และ push

**Expected Features:**

- Name, Email, Message fields with validation
- Success/Error messages
- Social media icons with links
- Contact information (email, phone, location)

### Phase 4: Enhancements และ Polish (30 นาที)

- [ ] Create branch `feature/enhancements`
- [ ] Add animations และ micro-interactions
- [ ] Improve responsive design
- [ ] Add loading states
- [ ] Optimize images
- [ ] Add scroll-to-top button
- [ ] Final testing
- [ ] Commit และ push

### Phase 5: Integration และ Deployment (30 นาที)

- [ ] Merge all features to main
- [ ] Final testing
- [ ] Build optimization
- [ ] Deploy to chosen platform
- [ ] Test live website
- [ ] Update README.md

---

## 🎯 Feature Development Guidelines

### Projects Section Requirements

```jsx
// src/components/Projects/Projects.jsx - ตัวอย่างที่ต้องทำ
import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/portfolioData';
import './Projects.css';

function Projects() {
  const [filter, setFilter] = useState('all');
  
  // Get unique technologies for filter
  const technologies = ['all', ...new Set(
    projects.flatMap(project => project.technologies)
  )];
  
  // Filter projects based on selected technology
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.technologies.includes(filter)
      );
  
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          Here are some of the projects I've worked on recently.
        </p>
        
        {/* Filter Buttons */}
        <div className="project-filters">
          {technologies.map(tech => (
            <button
              key={tech}
              className={`filter-btn ${filter === tech ? 'active' : ''}`}
              onClick={() => setFilter(tech)}
            >
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>No projects found for this technology.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
```

### Contact Form Requirements

```jsx
// src/components/Contact/Contact.jsx - ตัวอย่างที่ต้องทำ
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a project in mind? Let's work together!
        </p>
        
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h4>Email</h4>
                <p>your.email@example.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h4>Phone</h4>
                <p>+66 XX XXX XXXX</p>
              </div>
            </div>
            
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h4>Location</h4>
                <p>Bangkok, Thailand</p>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="social-links">
              <h4>Follow Me</h4>
              <div className="social-icons">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
```

---

## 📋 Submission Checklist

### 📂 Required Deliverables

- [ ] **GitHub Repository URL** - Public repository with complete source code
- [ ] **Live Website URL** - Deployed website accessible online
- [ ] **Project Documentation** - README.md with project details

### ✅ Technical Requirements

- [ ] React application runs without errors
- [ ] All components render correctly
- [ ] Theme switcher works in both light/dark modes
- [ ] Projects section displays at least 3 projects
- [ ] Contact form has working validation
- [ ] Website is responsive (mobile, tablet, desktop)
- [ ] Clean, readable code with proper structure
- [ ] Git history shows feature development process

### 🎨 Design Requirements

- [ ] Professional and cohesive visual design
- [ ] Consistent color scheme and typography
- [ ] Smooth animations and transitions
- [ ] Intuitive navigation and user experience
- [ ] Personal branding and content

### 🚀 Deployment Requirements

- [ ] Successfully deployed to free hosting platform
- [ ] Custom domain or subdomain configured
- [ ] Website loads quickly and without errors
- [ ] All images and assets load correctly
- [ ] SEO meta tags implemented

### 📄 Documentation Requirements

```markdown
# Portfolio Website

## Description
Brief description of your portfolio website and its purpose.

## Technologies Used
- React 18
- Vite
- CSS3
- Lucide React Icons
- [Other technologies you added]

## Features
- Responsive design
- Dark/Light theme switcher
- Project showcase with filtering
- Contact form with validation
- Smooth scrolling navigation
- [Additional features you implemented]

## Live Demo
[Your deployed website URL]

## Local Development
```bash
npm install
npm run dev
```

## Deployment

Deployed using [Netlify/Vercel/etc.] with automatic deployments from the main branch.

## Screenshots

[Add screenshots of your website]

## What I Learned

[Brief reflection on what you learned during this project]

```

---

## 🏆 Grading Rubric (100 points)

### Technical Implementation (40 points)
- **React Components & Structure (15 points)**
  - Proper component organization
  - Effective use of props and state
  - Clean component architecture

- **Functionality (15 points)**
  - Theme switcher works correctly
  - Contact form validation functions
  - Navigation and user interactions work
  - No console errors

- **Code Quality (10 points)**
  - Clean, readable code
  - Proper naming conventions
  - Comments where necessary
  - Git commit history shows good practices

### Design & User Experience (25 points)
- **Visual Design (15 points)**
  - Professional appearance
  - Consistent color scheme and typography
  - Good use of spacing and layout
  - Creative and personal branding

- **Responsive Design (10 points)**
  - Works well on mobile devices
  - Tablet compatibility
  - Desktop optimization

### Content & Features (20 points)
- **Personal Content (10 points)**
  - Complete About section with personal information
  - At least 3 meaningful projects
  - Professional contact information

- **Feature Implementation (10 points)**
  - Projects filtering/sorting
  - Form validation and feedback
  - Additional creative features

### Deployment & Documentation (15 points)
- **Successful Deployment (10 points)**
  - Website accessible online
  - All features work in production
  - Fast loading times

- **Documentation (5 points)**
  - Complete README.md
  - Clear project description
  - Setup and deployment instructions

---

## 💡 Enhancement Ideas (Bonus Points)

### Level 1 Enhancements (+5 points each)
- [ ] **Loading Animations** - Skeleton screens or loading spinners
- [ ] **Scroll Animations** - Elements animate as they come into view
- [ ] **Custom Cursor** - Interactive cursor effects
- [ ] **Back to Top Button** - Smooth scroll to top functionality

### Level 2 Enhancements (+10 points each)
- [ ] **Blog Section** - Additional section with blog posts
- [ ] **Skills Progress Bars** - Animated skill level indicators
- [ ] **Timeline Component** - Education/experience timeline
- [ ] **Image Gallery** - Lightbox for project images

### Level 3 Enhancements (+15 points each)
- [ ] **TypeScript Migration** - Convert entire project to TypeScript
- [ ] **Progressive Web App** - Add PWA capabilities
- [ ] **Performance Optimization** - Implement code splitting and lazy loading
- [ ] **Accessibility Compliance** - WCAG 2.1 AA compliance

---

## 🆘 Troubleshooting Guide

### Common Issues และ Solutions

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

#### Deployment Issues

```bash
# Check build output
npm run build
npm run preview

# Verify all imports are correct
# Check that all image paths are correct
# Ensure no console errors
```

#### Git Issues

```bash
# Reset to previous commit
git reset --hard HEAD~1

# Create new branch from main
git checkout main
git pull origin main
git checkout -b feature/new-feature
```

#### Theme Not Working

- Check ThemeContext is wrapped around App
- Verify CSS custom properties are defined
- Check localStorage permissions

---

## 📞 Support และ Resources

### Getting Help

- **Office Hours:** [ระบุเวลาที่สามารถปรึกษาได้]
- **Email:** [อีเมลอาจารย์]
- **Discussion Forum:** [Link ถ้ามี]

### Useful Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Design Inspiration

- [Personal Portfolio Examples](https://dribbble.com/search/portfolio-website)
- [Color Palette Tools](https://coolors.co)
- [Typography Pairing](https://fontpair.co)

---

## 📅 Important Dates

- **Project Release:** [5,6 สิงหาคม 2568]
- **Checkpoint 1:** [วันตรวจ setup และ basic structure]
- **Checkpoint 2:** [วันตรวจ projects section]
- **Final Submission:** [4,5 สิงหาคม 2568] - 23:59 น.

---

## 🌟 Success Tips

1. **Start Early** - อย่าทิ้งงานไว้นาทีสุดท้าย
2. **Test Frequently** - ทดสอบใน browser หลายตัว
3. **Use Git Properly** - Commit บ่อยๆ พร้อม clear messages
4. **Ask for Help** - อย่าติดค้างนาน ถามเมื่อมีปัญหา
5. **Be Creative** - แสดงความคิดสร้างสรรค์และความเป็นตัวตน
6. **Focus on UX** - คิดจากมุมมองผู้ใช้งาน
7. **Test Mobile** - อย่าลืมทดสอบใน mobile device

**Good luck with your portfolio development! 🚀**
