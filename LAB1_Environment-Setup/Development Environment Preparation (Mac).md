# การเตรียมสภาพแวดล้อมเพื่อการพัฒนา (Development Environment) สำหรับ MacOS

เอกสารนี้สรุปขั้นตอนการติดตั้งและตั้งค่าเครื่องมือที่จำเป็นสำหรับการเรียนวิชา ENGSE203 Computer Programming for Software Engineer on Local and VM บนระบบปฏิบัติการ MacOS


### 3-tier Architecture Overview

The development environment follows a 3-tier architecture pattern:

**Tier 1 (Frontend)**
- Browser interfaces
- Desktop applications
- Apache/Nginx Web Server

**Tier 2 (Backend)**
- API Services
- Node.js applications
- WebSocket connections
- Agent Notification (Electron.js)

**Tier 3 (Database)**
- Database servers
- MSSQL
- MongoDB

### Development Team Structure

The architecture supports different developer roles:
- **Frontend Developer**: Focuses on user interface and user experience
- **Backend/Full-stack Developer**: Handles server-side logic and APIs
- **Data Engineer/Database Admin**: Manages database design and optimization

---

## PART 1: Web Development Software Installation

### 1. Software Development Environment Tools

| Type | Application | Download Link |
|------|-------------|---------------|
| IDE | VSCode | https://code.visualstudio.com/ |
| Remote Terminal | Terminus | https://termius.com/ |
| FTP | FileZilla | https://filezilla-project.org/ |
| Git | Git-scm | https://git-scm.com/downloads |
| Git GUI | Github Desktop | https://github.com/apps/desktop |

### 2. Front-end Software

| Type | Application | Download Link |
|------|-------------|---------------|
| Web Browser | Chrome | https://www.google.com/intl/en_uk/chrome/ |
| Web Browser | Firefox | https://www.mozilla.org/en-US/firefox/new/ |
| Web Browser | Edge | https://www.microsoft.com/th-th/edge/download |

---

## PART 2: Diagram, Wireframe, UI Design, and Task Management Software

**Note: Register using your university email address**

| Type | Application | Download Link |
|------|-------------|---------------|
| Diagram | draw.io | https://app.diagrams.net/ |
| Wireframe | Moqups | https://moqups.com/ |
| UI Design | Figma | https://www.figma.com/ |
| Task Management | Trello | https://trello.com/ |
| Teamwork collaboration | Miro | https://miro.com/ |
| API development platform | Postman | https://www.postman.com/ |

---

## PART 3: Git - Version Control System

### STEP 1: Local Development Setup

1. **Register/Sign-in** at www.github.com
2. **Study Git fundamentals** using these resources:
   - https://blog.wu.ac.th/archives/1979
   - https://www.borntodev.com/2020/03/30/git-พื้นฐานสุดๆ/
   - https://www.devahoy.com/blog/2015/08/introduction-to-git-and-github
   - https://medium.com/amiearth/git-จากติดตั้งจนเป็นงาน-16cc215c772b

3. **Open Terminal** on Mac and create directory structure:

```bash
# Create class directory
mkdir class
cd class

# Create engse203 directory
mkdir engse203
cd engse203
```

4. **Configure Git** with your information:

```bash
git config --global user.name "your-username"
git config --global user.email "your-email@university.edu"
```

⚠️ **Important**: Don't forget to use double quotes around your name and email!

Example:
```bash
git config --global user.name "tkeatkaew"
git config --global user.email "thanit@emutl.ac.th"
```

5. **Verify configuration**:
```bash
git config --list
```

### STEP 2: Node.js Development Environment Setup

Install NVM (Node Version Manager) to manage different Node.js versions:

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Reload shell configuration
source ~/.nvm/nvm.sh

# Install Node.js version 20
nvm install 20

# Verify installation
node -v
# Should print: v20.19.3

npm -v
# Should print: 10.8.2
```

For more information, visit: https://nodejs.org/en/download/package-manager

### STEP 3: SSH Setup for GitHub Connection

Create SSH key for secure connection to GitHub:

```bash
# Navigate to home directory
cd

# Create .ssh directory
mkdir .ssh
cd .ssh

# Generate SSH key (replace with your email)
ssh-keygen -t ed25519 -C "your-email@university.edu"
```

**⚠️ Important**: When generating the key, name it `id_github` and don't set a passphrase (press Enter twice).

Verify the key files were created:
```bash
pwd
ls
```

You should see two files: `id_github` and `id_github.pub`

Create SSH config file:
```bash
nano config
```

Add the following configuration:
```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github
```

Save the file by pressing `Ctrl+X`, then `Y` to confirm.

Verify files in .ssh directory:
```bash
ls -la
```

View your public key:
```bash
more id_github.pub
```

Copy the entire content of the public key for the next step.

### STEP 4: Add Public Key to GitHub

1. Go to GitHub Settings
2. Select "SSH and GPG Keys"
3. Click "New SSH Key"
4. Paste the content from `id_github.pub`
5. Click "Add SSH Key"

### Create Repository and Clone

1. Go to "Repositories" in GitHub
2. Click "New"
3. Create repository named `engse203-1_68` (make it Public)
4. After creation, copy the SSH URL

### STEP 5: Clone Repository and Initial Setup

```bash
# Navigate to your working directory
cd ~/class/engse203

# Clone the repository (replace with your actual SSH URL)
git clone git@github.com:your-username/engse203-1_68.git

# Navigate into the repository
cd engse203-1_68

# Check repository status
git status
```

### Working with Files

Create your first file:
```bash
nano index.html
```

Add content:
```html
Hello, from engse203-1_68.
```

Check status and add file:
```bash
git status
git add index.html
git status
```

If you need to unstage a file:
```bash
git restore --staged index.html
```

Commit your changes:
```bash
git add index.html
git commit -m "1st index.html file added"
```

Push to GitHub:
```bash
git status
git push
```

### STEP 6: VSCode Integration

Open your project in VSCode:
```bash
code .
```

**Using VSCode for Git operations:**

1. Make changes to `index.html`
2. Go to Source Control panel
3. Add commit message (e.g., "index.html updated")
4. Click "Commit"
5. Click "Sync Changes" to push to GitHub

---

## Summary

After completing this setup, you should be able to:

1. **Use Node.js** in different versions using NVM commands
2. **Connect local development** to GitHub repository (private) via SSH
3. **Connect local development** to Local VM via SSH
4. **Connect Local VM** to GitHub repository via SSH

### Key Commands Reference

**Git Commands:**
```bash
git status          # Check repository status
git add <file>      # Stage files for commit
git commit -m "message"  # Commit changes
git push           # Push to remote repository
git config --list  # View configuration
```

**Node.js Commands:**
```bash
nvm install <version>  # Install Node.js version
nvm use <version>      # Switch Node.js version
node -v               # Check Node.js version
npm -v                # Check npm version
```

**SSH Commands:**
```bash
ssh-keygen -t ed25519 -C "email"  # Generate SSH key
ls ~/.ssh/                        # List SSH keys
more ~/.ssh/id_github.pub         # View public key
```

This setup provides a complete development environment supporting the 3-tier architecture with proper version control and secure connections.