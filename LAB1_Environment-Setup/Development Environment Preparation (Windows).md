# การเตรียมสภาพแวดล้อมเพื่อการพัฒนา (Development Environment) สำหรับ Windows

เอกสารนี้สรุปขั้นตอนการติดตั้งและตั้งค่าเครื่องมือที่จำเป็นสำหรับการเรียนวิชา ENGSE203 Computer Programming for Software Engineer บนระบบปฏิบัติการ Windows

---

## PART 1: การติดตั้งโปรแกรมสำหรับ Web Development

### 1. เครื่องมือพื้นฐาน (Development Environment Tools)

| ประเภท             | โปรแกรม         | ลิงก์ดาวน์โหลด                               |
| ------------------- | --------------- | --------------------------------------------- |
| IDE                 | VSCode          | [https://code.visualstudio.com/](https://code.visualstudio.com/) |
| Remote Terminal     | Terminus        | [https://termius.com/](https://termius.com/)       |
| FTP                 | FileZilla       | [https://filezilla-project.org/](https://filezilla-project.org/) |
| Git                 | Git-scm         | [https://git-scm.com/downloads](https://git-scm.com/downloads) |
| Git GUI             | Github Desktop  | [https://github.com/apps/desktop](https://github.com/apps/desktop) |

### 2. โปรแกรมสำหรับ Front-end

| ประเภท     | โปรแกรม  | ลิงก์ดาวน์โหลด                                    |
| ----------- | ------- | ------------------------------------------------- |
| Web Browser | Chrome  | [https://www.google.com/intl/en_uk/chrome/](https://www.google.com/intl/en_uk/chrome/) |
|             | Firefox | [https://www.mozilla.org/en-US/firefox/new/](https://www.mozilla.org/en-US/firefox/new/) |
|             | Edge    | [https://www.microsoft.com/th-th/edge/download](https://www.microsoft.com/th-th/edge/download) |

### 3. การติดตั้ง WSL (สำหรับ Windows)

จำเป็นต้องติดตั้ง **Ubuntu 24.04** เพื่อใช้ตลอดการเรียนการสอน

1.  เปิด **Windows PowerShell** ด้วยสิทธิ์ **Run as Administrator**
2.  รันคำสั่งต่อไปนี้เพื่อติดตั้ง Ubuntu 24.04:
    ```powershell
    wsl --install -d Ubuntu-24.04
    ```
3.  หลังจากติดตั้ง ระบบจะให้สร้างผู้ใช้ใหม่ ให้สร้าง user ชื่อ **labadmin** และตั้งรหัสผ่านให้เรียบร้อย

---

## PART 2: โปรแกรมสำหรับ Diagram, Wireframe, UI Design และ Task Management

**ข้อแนะนำ:** สมัครใช้งานโปรแกรมต่างๆ โดยใช้อีเมลของมหาวิทยาลัย

| ประเภท                    | โปรแกรม    | ลิงก์                                   |
| ------------------------- | --------- | --------------------------------------- |
| Diagram                   | draw.io   | [https://app.diagrams.net/](https://app.diagrams.net/) |
| Wireframe                 | Moqups    | [https://moqups.com/](https://moqups.com/)     |
| UI Design                 | Figma     | [https://www.figma.com/](https://www.figma.com/)       |
| Task Management           | Trello    | [https://trello.com/](https://trello.com/)     |
| Teamwork collaboration    | Miro      | [https://miro.com/](https://miro.com/)         |
| API development platform  | Postman   | [https://www.postman.com/](https://www.postman.com/)   |

---

## PART 3: การตั้งค่า Git (Version Control System)

### STEP 1: การตั้งค่า Git บนเครื่อง (Local)

1.  **ลงทะเบียน GitHub:** สมัครใช้งานที่ [www.github.com](https://www.github.com)
2.  **ติดตั้ง Git:** หากยังไม่มี ให้ดาวน์โหลดจาก [https://git-scm.com/download](https://git-scm.com/download)
3.  **(สำหรับผู้ใช้ Ubuntu/WSL)** สามารถติดตั้ง Git ด้วยคำสั่ง:
    ```bash
    sudo apt-get install git
    ```
4.  **ตั้งค่า Git:** เปิด Terminal (ในที่นี้คือ Ubuntu-24.04) และตั้งค่าชื่อผู้ใช้และอีเมล (ค่าใน `""` จะแตกต่างกันไปในแต่ละคน)
    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"
    ```
    **ตัวอย่าง:**
    ```bash
    git config --global user.name "tkeatkaew"
    git config --global user.email "thanit@rmutl.ac.th"
    ```
5.  **ตรวจสอบการตั้งค่า:**
    ```bash
    git config --list
    ```
6.  **สร้าง Directory สำหรับงาน:**
    ```bash
    mkdir class
    cd class
    mkdir engse203
    cd engse203
    ```

### STEP 2: การตั้งค่าสภาพแวดล้อมบน Ubuntu (WSL)

1.  **ติดตั้ง NVM (Node Version Manager):** เพื่อให้สามารถจัดการเวอร์ชันของ Node.js ได้
    ```bash
    curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh) | bash
    source ~/.bashrc 
    ```
2.  **ติดตั้ง Node.js:** ติดตั้งเวอร์ชัน 20
    ```bash
    nvm install 20
    ```
3.  **ตรวจสอบเวอร์ชัน:**
    ```bash
    node -v  # ควรแสดงเวอร์ชัน 20.x.x
    npm -v   # ควรแสดงเวอร์ชัน 10.x.x
    ```

### STEP 3: การตั้งค่า GitHub ด้วย SSH Key

1.  **สร้าง SSH Key:** (แก้ไขอีเมลให้เป็นของตนเอง)
    ```bash
    ssh-keygen -t ed25519 -C "your.email@example.com"
    ```
    * เมื่อถูกถาม `Enter file in which to save the key`: ให้พิมพ์ `id_github`
    * เมื่อถูกถาม `Enter passphrase`: ให้กด Enter 2 ครั้ง (ไม่ต้องใส่รหัสผ่าน)

2.  **จัดการไฟล์ SSH Key:**
    * ตรวจสอบว่ามีไฟล์ `id_github` และ `id_github.pub` ถูกสร้างขึ้น
    * สร้างโฟลเดอร์ `.ssh` และย้ายไฟล์เข้าไป:
        ```bash
        mkdir ~/.ssh
        mv id_github* ~/.ssh/
        ```

3.  **สร้างไฟล์ Config สำหรับ SSH:**
    * เข้าไปที่โฟลเดอร์ `.ssh` และสร้างไฟล์ `config`:
        ```bash
        cd ~/.ssh
        nano config
        ```
    * เพิ่มเนื้อหา 4 บรรทัดนี้ลงในไฟล์ `config`:
        ```
        Host github.com
          HostName github.com
          User git
          IdentityFile ~/.ssh/id_github
        ```
    * บันทึกไฟล์โดยกด `Ctrl+X` แล้วกด `Y` และ `Enter`

4.  **คัดลอก Public Key:**
    * แสดงเนื้อหาของ Public Key และคัดลอกทั้งหมดไว้
        ```bash
        cat ~/.ssh/id_github.pub
        ```

5.  **เพิ่ม Public Key ใน GitHub:**
    * ไปที่ `GitHub Settings > SSH and GPG Keys`
    * กด `New SSH key`
    * ตั้งชื่อ `Title` และวาง Public Key ที่คัดลอกมาลงในช่อง `Key`
    * กด `Add SSH key`

6.  **สร้าง Repository และ Clone:**
    * บน GitHub, สร้าง Repository ใหม่ (เช่น `engse203-1_68`) และตั้งค่าเป็น **Public**
    * เลือก Clone ด้วย **SSH** และคัดลอก URL มา
    * ใน Terminal บนเครื่อง, กลับไปที่โฟลเดอร์ `engse203` แล้วทำการ Clone:
        ```bash
        git clone git@github.com:YourUsername/engse203-1_68.git
        ```
    * เข้าไปในโปรเจกต์ที่เพิ่ง Clone มา:
        ```bash
        cd engse203-1_68
        ```

7.  **ทดสอบการ Add, Commit, Push:**
    * สร้างไฟล์ใหม่:
        ```bash
        nano index.html 
        ```
        (ใส่ข้อความ "Hello, from engse203-1_68.")
    * ตรวจสอบสถานะ:
        ```bash
        git status
        ```
    * เพิ่มไฟล์เข้าสู่ Staging Area:
        ```bash
        git add index.html
        ```
    * Commit การเปลี่ยนแปลง:
        ```bash
        git commit -m "1st index.html file added"
        ```
    * Push การเปลี่ยนแปลงขึ้นไปยัง GitHub:
        ```bash
        git push
        ```

### STEP 4: การเชื่อมต่อ VSCode กับ Git Account

1.  **เปิดโปรเจกต์ใน VSCode:** ใน Terminal ที่อยู่ในโฟลเดอร์โปรเจกต์ ให้รันคำสั่ง:
    ```bash
    code .
    ```
2.  **ติดตั้ง Extension:**
    * ไปที่เมนู `Extensions` (ไอคอนสี่เหลี่ยมด้านซ้าย)
    * ค้นหา `WSL` และติดตั้ง Extension ของ Microsoft
3.  **ใช้งานผ่าน VSCode:**
    * แก้ไขไฟล์ `index.html` ผ่าน VSCode
    * ไปที่เมนู `Source Control` (ไอคอนรูปกิ่งไม้)
    * ใส่ข้อความ Commit ในช่อง Message (เช่น "index.html updated")
    * กด `Commit`
    * กด `Sync Changes` เพื่อ Push การเปลี่ยนแปลงขึ้น GitHub

---

## สรุปผลลัพธ์ที่ต้องทำได้

หลังจากทำตามขั้นตอนทั้งหมดแล้ว จะต้องสามารถ:
1.  ใช้ Node.js ในเวอร์ชันที่ต้องการผ่านคำสั่ง `nvm`
2.  เชื่อมต่อสภาพแวดล้อมบนเครื่อง (Local) กับ GitHub Repository (Private/Public) ผ่าน SSH ได้
3.  เชื่อมต่อสภาพแวดล้อมบนเครื่อง (Local) กับ VM (WSL) ผ่าน SSH ได้
4.  เชื่อมต่อ VM (WSL) กับ GitHub Repository ผ่าน SSH ได้
````