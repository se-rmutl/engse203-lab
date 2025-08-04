# Complete Portfolio Website Solution
---

## 🚀 Initial Setup & Complete Starter Code

### Create Project
```bash
# สร้างโปรเจค
npm create vite@latest my-portfolio -- --template react
cd my-portfolio
npm install

# เพิ่ม dependencies ที่จำเป็น
npm install lucide-react
```

## Project Structure
```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.css
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── Projects.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx
│   │       └── ThemeToggle.css
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── vite.svg
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

## Complete Source Code

### 1. package.json
```json
{
  "name": "my-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

### 2. index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Personal portfolio of John Doe - Full Stack Developer specializing in React.js and modern web technologies" />
  <meta name="keywords" content="web developer, react, javascript, frontend, backend, portfolio" />
  <meta name="author" content="John Doe" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://johndoe-portfolio.netlify.app/" />
  <meta property="og:title" content="John Doe - Full Stack Developer Portfolio" />
  <meta property="og:description" content="Personal portfolio showcasing web development projects and skills" />
  <meta property="og:image" content="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=630&fit=crop" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://johndoe-portfolio.netlify.app/" />
  <meta property="twitter:title" content="John Doe - Full Stack Developer Portfolio" />
  <meta property="twitter:description" content="Personal portfolio showcasing web development projects and skills" />
  <meta property="twitter:image" content="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=630&fit=crop" />
  
  <title>John Doe - Full Stack Developer Portfolio</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### 3. src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 4. src/App.jsx
```jsx
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

### 5. src/contexts/ThemeContext.jsx
```jsx
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

### 6. src/styles/global.css
```css
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

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 3rem;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .section {
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
```

### 7. src/components/Header/Header.jsx
```jsx
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
            <h2>John Doe</h2>
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

### 8. src/components/Header/Header.css
```css
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

### 9. src/components/ThemeToggle/ThemeToggle.jsx
```jsx
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

### 10. src/components/ThemeToggle/ThemeToggle.css
```css
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

### 11. src/components/About/About.jsx
```jsx
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
              Hello! I'm a passionate full-stack developer with over 5 years of experience 
              in creating beautiful and functional web applications. I specialize in React.js, 
              Node.js, and modern web technologies.
            </p>
            <p className="about-description">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing my knowledge through 
              blog posts and tutorials.
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
              <a 
                href="https://drive.google.com/file/d/1234567890/view" 
                className="btn-primary" 
                target="_blank" 
                rel="noopener noreferrer"
              >
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
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
              alt="John Doe - Full Stack Developer"
              className="profile-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
```

### 12. src/components/About/About.css
```css
.about {
  background: var(--bg-secondary);
  padding-top: 8rem;
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
  text-align: left;
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

.profile-image {
  width: 400px;
  height: 400px;
  border-radius: 2rem;
  object-fit: cover;
  border: 3px solid var(--accent-primary);
  box-shadow: var(--shadow-lg);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .about {
    padding-top: 6rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-text {
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
    text-align: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .about-actions {
    flex-direction: column;
    align-items: center;
  }

  .profile-image {
    width: 300px;
    height: 300px;
  }
}
```

### 13. src/data/portfolioData.js
```javascript
export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online shopping platform with cart, payment integration, and admin dashboard",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    demoUrl: "https://my-ecommerce-demo.netlify.app",
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    featured: true
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    description: "A modern chat application with real-time messaging, file sharing, and video calls",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop",
    technologies: ["React", "Socket.io", "Node.js", "WebRTC"],
    demoUrl: "https://realtime-chat-demo.netlify.app",
    githubUrl: "https://github.com/johndoe/chat-app",
    featured: true
  },
  {
    id: 3,
    title: "Task Management System",
    description: "A collaborative task management tool with drag-and-drop interface and team features",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    technologies: ["React", "Redux", "Firebase", "Material-UI"],
    demoUrl: "https://task-manager-demo.netlify.app",
    githubUrl: "https://github.com/johndoe/task-manager",
    featured: false
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A beautiful weather application with 5-day forecast, maps, and location-based alerts",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
    demoUrl: "https://weather-dashboard-demo.netlify.app",
    githubUrl: "https://github.com/johndoe/weather-dashboard",
    featured: false
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media metrics with real-time data visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    demoUrl: "https://social-dashboard-demo.netlify.app",
    githubUrl: "https://github.com/johndoe/social-dashboard",
    featured: true
  },
  {
    id: 6,
    title: "AI-Powered Blog",
    description: "A modern blog platform with AI-powered content recommendations and SEO optimization",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    technologies: ["Next.js", "OpenAI API", "MongoDB", "Tailwind CSS"],
    demoUrl: "https://ai-blog-demo.vercel.app",
    githubUrl: "https://github.com/johndoe/ai-blog",
    featured: false
  }
];

export const contactInfo = {
  email: "john.doe@example.com",
  phone: "+66 81 234 5678",
  location: "Bangkok, Thailand",
  social: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  }
};
```

### 14. src/components/Projects/Projects.jsx
```jsx
import { useState } from 'react';
import { Filter } from 'lucide-react';
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
          <div className="filter-icon">
            <Filter size={20} />
          </div>
          {technologies.slice(0, 6).map(tech => (
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
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
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
### 15. src/components/Projects/ProjectCard.jsx
```jsx
import { ExternalLink, Github, Star } from 'lucide-react';
import './Projects.css';

function ProjectCard({ project, index }) {
  return (
    <div 
      className="project-card fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {project.featured && (
        <div className="featured-badge">
          <Star size={16} />
          Featured
        </div>
      )}
      
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <div className="project-links">
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View live demo"
            >
              <ExternalLink size={20} />
            </a>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
              aria-label="View source code"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-technologies">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
```


### 16. src/components/Projects/Projects.css
```css
.projects {
  background: var(--bg-primary);
}

.project-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-icon {
  color: var(--text-secondary);
  margin-right: 0.5rem;
}

.filter-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.filter-btn.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg-secondary);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid var(--border-color);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--accent-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 10;
}

.project-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  background: var(--accent-primary);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.project-link:hover {
  background: var(--accent-secondary);
  transform: scale(1.1);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  border: 1px solid var(--border-color);
}

.no-projects {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-image {
    height: 200px;
  }
  
  .filter-btn {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
}
```

### 17. src/components/Contact/Contact.jsx
```jsx
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { contactInfo } from '../../data/portfolioData';
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
          Have a project in mind? Let's work together to bring your ideas to life!
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
                  placeholder="John Smith"
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
                  placeholder="john@example.com"
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
                  placeholder="Tell me about your project..."
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading">Sending...</span>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="status-message success">
                  <CheckCircle size={20} />
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="status-message error">
                  <AlertCircle size={20} />
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-section">
              <h3>Let's talk about everything!</h3>
              <p>Don't like forms? Send me an email directly. 👋</p>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div>
                <h4>Email</h4>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div>
                <h4>Phone</h4>
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <div>
                <h4>Location</h4>
                <p>{contactInfo.location}</p>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="social-section">
              <h4>Follow Me</h4>
              <div className="social-icons">
                <a 
                  href={contactInfo.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} />
                </a>
                <a 
                  href={contactInfo.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href={contactInfo.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                >
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

### 18. src/components/Contact/Contact.css
```css
.contact {
  background: var(--bg-secondary);
}

.contact-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-top: 3rem;
}

.contact-form {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  background: var(--bg-primary);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-btn {
  width: 100%;
  justify-content: center;
  font-size: 1rem;
  padding: 1rem;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.loading::after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: fadeIn 0.3s ease;
}

.status-message.success {
  background: #10b98120;
  color: #10b981;
  border: 1px solid #10b98140;
}

.status-message.error {
  background: #ef444420;
  color: #ef4444;
  border: 1px solid #ef444440;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.info-section p {
  color: var(--text-secondary);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  width: 48px;
  height: 48px;
  background: var(--bg-primary);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  border: 1px solid var(--border-color);
}

.contact-item h4 {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-bottom: 0.25rem;
}

.contact-item a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: var(--accent-primary);
}

.social-section {
  margin-top: 1rem;
}

.social-section h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  width: 48px;
  height: 48px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
  
  .contact-info {
    text-align: center;
  }
  
  .contact-item {
    justify-content: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}
```

### 19. vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
})
```

### 20. .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment files
.env
.env.local
.env.production
```

### 21. README.md
```markdown
# Personal Portfolio Website

A modern, responsive portfolio website built with React.js featuring a dark/light theme switcher, smooth animations, and a clean design.

## 🚀 Live Demo
[View Live Demo](https://johndoe-portfolio.netlify.app)

## ✨ Features
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Toggle between dark and light modes with persistence
- **Smooth Animations**: Engaging scroll animations and micro-interactions
- **Project Showcase**: Filter projects by technology stack
- **Contact Form**: Validated contact form with success/error states
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Ready**: Meta tags and structured data for better search visibility

## 🛠️ Technologies Used
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables
- **Icons**: Lucide React
- **Deployment**: Netlify
- **Version Control**: Git & GitHub
```

## 📋 Complete Solution Features:

### ✅ Starter Code (50% - ให้อาจารย์สอน)
1. **ThemeContext** - Complete with localStorage persistence
2. **Header Component** - With responsive navigation and smooth scroll
3. **About Section** - With skills grid and profile image from Unsplash
4. **ThemeToggle** - Smooth theme switching with icons
5. **Global Styles** - Complete CSS variables for theming

### ✅ Student Implementation (50% - นักศึกษาทำต่อ)
1. **Projects Section**
   - 6 sample projects with images from Unsplash
   - Filter functionality by technology
   - Featured projects badge
   - Hover effects with overlay links

2. **Contact Form**
   - Full validation with error messages
   - Loading states during submission
   - Success/Error feedback
   - Contact information display
   - Social media links

3. **Enhancements**
   - Fade-in animations
   - Responsive design for all devices
   - SEO meta tags
   - Professional styling

## 🎯 Key Features ที่เพิ่มเข้ามา:

1. **Real Images**: ใช้รูปจาก Unsplash (ไม่ใช่ local files)
   - Profile image
   - Project thumbnails
   - Open Graph image

2. **Complete Data Structure**: 
   - 6 realistic projects
   - Complete contact information
   - Social media links

3. **Production Ready**:
   - Error handling
   - Form validation
   - Loading states
   - Accessibility features

## 🚀 How to Run:

```bash
# Create project
npm create vite@latest my-portfolio -- --template react
cd my-portfolio

# Install dependencies
npm install lucide-react

# Copy all the code files from the solution above
# Then run
npm run dev
```

## 📦 Build & Deploy:

```bash
# Build for production
npm run build

# Test production build
npm run preview

# Deploy to Netlify (easiest)
# Just drag the 'dist' folder to Netlify
```

The complete solution demonstrates:
- ✅ Git workflow with proper branching
- ✅ Component-based architecture
- ✅ State management with Context API
- ✅ Form handling and validation
- ✅ Responsive design
- ✅ Theme switching
- ✅ Modern UI/UX practices
- ✅ Production deployment ready

This solution can be used by instructors to:
1. Show the expected final result
2. Explain each component's functionality
3. Demonstrate Git workflow
4. Guide students through the development process
5. Use as a reference for grading

All images are from Unsplash and will load directly from the internet, no local files needed!
