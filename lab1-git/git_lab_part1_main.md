# Part 1: Git Fundamentals & Local Development

## 🎯 Learning Objectives
หลังจากจบ Lab นี้ นักเรียนจะสามารถ:
- สร้างและจัดการ Git repository
- ใช้งาน Git commands พื้นฐาน
- เชื่อมต่อ local repository กับ GitHub
- ทำงานกับ branches และ merging
- ใช้งาน Git GUI tools

## 📋 Prerequisites
- Git installed on your machine
- GitHub account
- Text editor (VS Code recommended)
- Terminal/Command Prompt access

## 🕐 Time Required
**3-4 hours** (including exercises)

---

## Lab 1.1: Git Setup & Configuration (30 minutes)

### Task 1.1.1: Install and Configure Git
**Instructions:**
1. Verify Git installation
2. Configure user information
3. Set up basic preferences

**Steps to Follow:**

```bash
# Check Git version
git --version

# Configure global user information
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Set default editor (optional)
git config --global core.editor "code --wait"

# View all configurations
git config --list
```

**📝 Record your results:**
- Git version: ________________
- User name configured: ________________
- Email configured: ________________

### Task 1.1.2: Create GitHub Account & SSH Setup
**Instructions:**
1. Create GitHub account (if not already have)
2. Generate SSH key
3. Add SSH key to GitHub

**Steps to Follow:**

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519

# Display public key to copy
cat ~/.ssh/id_ed25519.pub
```

**📝 Record your results:**
- GitHub username: ________________
- SSH key generated: ✅/❌
- SSH key added to GitHub: ✅/❌

**Test SSH connection:**
```bash
ssh -T git@github.com
```

---

## Lab 1.2: Repository Creation & Basic Operations (45 minutes)

### Task 1.2.1: Create Local Repository
**Instructions:**
Create a portfolio website project from scratch

**Steps to Follow:**

```bash
# Create project directory
mkdir my-portfolio
cd my-portfolio

# Initialize Git repository
git init

# Check repository status
git status
```

**📝 Record your results:**
- Repository created: ✅/❌
- Initial status output: ________________

### Task 1.2.2: Create Project Structure
**Instructions:**
Create a basic website structure with the following files:

```
my-portfolio/
├── index.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── profile.jpg (placeholder)
└── README.md
```

**Create index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Welcome to My Portfolio</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>About Me</h2>
            <p>I am a passionate developer learning Git and GitHub.</p>
        </section>
    </main>
    <script src="js/script.js"></script>
</body>
</html>
```

**Create about.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About - My Portfolio</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>About Me</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>My Background</h2>
            <p>I am currently learning version control with Git and GitHub.</p>
        </section>
    </main>
</body>
</html>
```

**Create css/style.css:**
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

header {
    background: #4CAF50;
    color: white;
    padding: 1rem;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
}

main {
    padding: 2rem;
}

section {
    margin-bottom: 2rem;
}
```

**Create js/script.js:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded!');
});
```

**Create README.md:**
```markdown
# My Portfolio Website

A simple portfolio website built while learning Git and GitHub.

## Features
- Home page
- About page
- Responsive design
- Clean CSS styling

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Git & GitHub

## How to Run
1. Clone the repository
2. Open index.html in your browser
```

**📝 Record your results:**
- All files created: ✅/❌
- Website opens correctly: ✅/❌

### Task 1.2.3: First Commit
**Instructions:**
Add all files and create your first commit

**Steps to Follow:**

```bash
# Check current status
git status

# Add all files to staging area
git add .

# Check status again
git status

# Create first commit
git commit -m "Initial commit: Add basic portfolio structure"

# View commit history
git log --oneline
```

**📝 Record your results:**
- Files added to staging: ✅/❌
- First commit created: ✅/❌
- Commit hash: ________________

---

## Lab 1.3: GitHub Integration (45 minutes)

### Task 1.3.1: Create GitHub Repository
**Instructions:**
1. Go to GitHub.com
2. Click "New repository"
3. Name: "my-portfolio"
4. Description: "My portfolio website built with HTML, CSS, and JavaScript"
5. Public repository
6. **Do not** initialize with README, .gitignore, or license

**📝 Record your results:**
- Repository created on GitHub: ✅/❌
- Repository URL: ________________

### Task 1.3.2: Connect Local to Remote
**Instructions:**
Connect your local repository to GitHub

**Steps to Follow:**

```bash
# Add remote repository
git remote add origin git@github.com:YOUR_USERNAME/my-portfolio.git

# Verify remote connection
git remote -v

# Push to GitHub
git push -u origin main

# Check that files appeared on GitHub
```

**📝 Record your results:**
- Remote added successfully: ✅/❌
- Push to GitHub successful: ✅/❌
- Files visible on GitHub: ✅/❌

### Task 1.3.3: Make Changes and Push
**Instructions:**
Make a change to your website and push it to GitHub

**Steps to Follow:**

1. Edit `index.html` - add a new section:
```html
<section>
    <h2>My Skills</h2>
    <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>Git & GitHub</li>
    </ul>
</section>
```

2. Commit and push the changes:
```bash
# Check what changed
git diff

# Add changes
git add index.html

# Commit changes
git commit -m "Add skills section to homepage"

# Push to GitHub
git push origin main
```

**📝 Record your results:**
- Changes committed: ✅/❌
- Changes pushed to GitHub: ✅/❌
- Changes visible on GitHub: ✅/❌

---

## Lab 1.4: Working with Branches (60 minutes)

### Task 1.4.1: Create and Switch Branches
**Instructions:**
Learn to work with branches for feature development

**Steps to Follow:**

```bash
# View current branches
git branch

# Create new branch for navigation improvement
git checkout -b feature/improve-navigation

# Verify you're on the new branch
git branch

# Alternative way to create and switch
git switch -c feature/contact-page
git switch feature/improve-navigation
```

**📝 Record your results:**
- New branch created: ✅/❌
- Successfully switched branches: ✅/❌
- Current branch: ________________

### Task 1.4.2: Develop Feature in Branch
**Instructions:**
Improve the navigation in your feature branch

**Steps to Follow:**

1. Edit `css/style.css` - improve navigation styling:
```css
nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

nav a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
```

2. Commit the changes:
```bash
# Add and commit changes
git add css/style.css
git commit -m "Improve navigation styling with hover effects"

# Push feature branch to GitHub
git push origin feature/improve-navigation
```

**📝 Record your results:**
- Feature developed in branch: ✅/❌
- Changes committed: ✅/❌
- Feature branch pushed to GitHub: ✅/❌

### Task 1.4.3: Merge Feature Branch
**Instructions:**
Merge your feature branch back to main

**Steps to Follow:**

```bash
# Switch back to main branch
git checkout main

# Merge feature branch
git merge feature/improve-navigation

# Push updated main branch
git push origin main

# Delete feature branch (optional)
git branch -d feature/improve-navigation
git push origin --delete feature/improve-navigation
```

**📝 Record your results:**
- Switched to main branch: ✅/❌
- Feature merged successfully: ✅/❌
- Main branch pushed to GitHub: ✅/❌

---

## Lab 1.5: Git Tools & GUI (30 minutes)

### Task 1.5.1: Using GitHub Desktop
**Instructions:**
If you have GitHub Desktop installed, try these tasks:

1. Open GitHub Desktop
2. Clone your repository (if not already cloned)
3. Make a change to any file
4. Use GitHub Desktop to commit and push
5. Create a new branch using the GUI
6. Switch between branches

**📝 Record your results:**
- GitHub Desktop used successfully: ✅/❌
- Committed using GUI: ✅/❌
- Branch created using GUI: ✅/❌

### Task 1.5.2: Using VS Code Git Integration
**Instructions:**
Use VS Code's built-in Git features:

1. Open your project in VS Code
2. Make a change to any file
3. Use the Source Control panel to:
   - Stage changes
   - Write commit message
   - Commit changes
   - Push to GitHub

**📝 Record your results:**
- VS Code Git integration used: ✅/❌
- Committed using VS Code: ✅/❌
- Pushed using VS Code: ✅/❌

---

## Lab 1.6: Git Commands Practice (45 minutes)

### Task 1.6.1: History and Logging
**Instructions:**
Practice viewing Git history and logs

**Steps to Follow:**

```bash
# View commit history
git log

# View compact history
git log --oneline

# View history with graph
git log --graph --oneline --all

# View changes in last commit
git show HEAD

# View specific commit
git show <commit-hash>
```

**📝 Record your results:**
- Total commits in history: ________________
- Latest commit message: ________________
- First commit hash: ________________

### Task 1.6.2: Differences and Status
**Instructions:**
Practice checking differences and repository status

**Steps to Follow:**

1. Make a change to `README.md` (don't commit yet)
2. Run these commands:

```bash
# Check repository status
git status

# View differences
git diff

# View differences of specific file
git diff README.md

# Add file to staging
git add README.md

# View staged differences
git diff --cached

# Reset file from staging
git reset HEAD README.md
```

**📝 Record your results:**
- Status command output: ________________
- Differences shown correctly: ✅/❌
- File staged and unstaged: ✅/❌

### Task 1.6.3: Undoing Changes
**Instructions:**
Practice undoing changes safely

**Steps to Follow:**

```bash
# Make a change to index.html
# Add some text anywhere

# Undo changes to file (before adding)
git checkout -- index.html

# Make another change and add it
git add index.html

# Unstage the change
git reset HEAD index.html

# Verify file is back to original state
git status
```

**📝 Record your results:**
- Successfully undid unstaged changes: ✅/❌
- Successfully unstaged changes: ✅/❌
- Repository clean: ✅/❌

---

## 📊 Part 1 Summary

### What You've Accomplished:
- ✅ Set up Git and GitHub
- ✅ Created a portfolio website project
- ✅ Connected local repository to GitHub
- ✅ Worked with branches and merging
- ✅ Used Git GUI tools
- ✅ Practiced essential Git commands

### Key Commands Mastered:
```bash
git init, git clone
git add, git commit, git push, git pull
git branch, git checkout, git merge
git status, git log, git diff
git reset, git checkout --
```

### Files Created:
- Portfolio website with HTML, CSS, JavaScript
- README.md with project documentation
- Proper Git repository with history

### Ready for Part 2?
You should now be comfortable with:
- Basic Git workflow
- Repository management
- Branch operations
- GitHub integration
- Git GUI tools

**Continue to Part 2 for team collaboration and advanced workflows!**

---

## 🔧 Troubleshooting

### Common Issues and Solutions:

**Issue: SSH connection failed**
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Add to GitHub settings
```

**Issue: Permission denied (publickey)**
```bash
# Check SSH agent
ssh-add -l
# Add key to agent
ssh-add ~/.ssh/id_ed25519
```

**Issue: Push rejected**
```bash
# Pull latest changes first
git pull origin main
# Then push
git push origin main
```

**Issue: Merge conflict**
```bash
# View conflicted files
git status
# Edit files to resolve conflicts
# Add resolved files
git add .
# Complete merge
git commit
```

---

## 📚 Additional Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Desktop Documentation](https://docs.github.com/en/desktop)
- [VS Code Git Integration](https://code.visualstudio.com/docs/editor/versioncontrol)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

**Next**: Continue to [Part 2: Team Collaboration & Advanced Workflow](./part2-team-collaboration.md)