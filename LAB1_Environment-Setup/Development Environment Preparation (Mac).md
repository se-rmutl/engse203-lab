# การเตรียมสภาพแวดล้อมเพื่อการพัฒนา (Development Environment) สำหรับ macOS

[cite_start]เอกสารนี้สรุปขั้นตอนการติดตั้งและตั้งค่าเครื่องมือที่จำเป็นสำหรับวิชา ENGSE203 Computer Programming for Software Engineer บนระบบปฏิบัติการ macOS [cite: 358, 359]

---

## [cite_start]PART 1: การติดตั้งโปรแกรมสำหรับ Web Development [cite: 398]

### [cite_start]1. เครื่องมือพื้นฐาน (Development Environment Tools) [cite: 399]

| ประเภท | โปรแกรม | ลิงก์ดาวน์โหลด |
| --- | --- | --- |
| IDE | VSCode | [cite_start][https://code.visualstudio.com/](https://code.visualstudio.com/) [cite: 400] |
| Remote Terminal | Terminus | [cite_start][https://termius.com/](https://termius.com/) [cite: 400] |
| FTP | FileZilla | [cite_start][https://filezilla-project.org/](https://filezilla-project.org/) [cite: 400] |
| Git | Git-scm | [cite_start][https://git-scm.com/downloads](https://git-scm.com/downloads) [cite: 400] |
| Git GUI | Github Desktop | [cite_start][https://github.com/apps/desktop](https://github.com/apps/desktop) [cite: 400] |

### [cite_start]2. โปรแกรมสำหรับ Front-end [cite: 401]

| ประเภท | โปรแกรม | ลิงก์ดาวน์โหลด |
| --- | --- | --- |
| Web Browser | Chrome | [cite_start][https://www.google.com/intl/en_uk/chrome/](https://www.google.com/intl/en_uk/chrome/) [cite: 402] |
| | Firefox | [cite_start][https://www.mozilla.org/en-US/firefox/new/](https://www.mozilla.org/en-US/firefox/new/) [cite: 402] |
| | Edge | [cite_start][https://www.microsoft.com/th-th/edge/download](https://www.microsoft.com/th-th/edge/download) [cite: 402] |

---

## [cite_start]PART 2: โปรแกรมสำหรับ Diagram, Wireframe, UI Design และ Task Management [cite: 405]

[cite_start]**ข้อแนะนำ:** ควรใช้อีเมลของมหาวิทยาลัยในการสมัครใช้งาน [cite: 406]

| ประเภท | โปรแกรม | ลิงก์ |
| --- | --- | --- |
| Diagram | draw.io | [cite_start][https://app.diagrams.net/](https://app.diagrams.net/) [cite: 407] |
| Wireframe | Moqups | [cite_start][https://moqups.com/](https://moqups.com/) [cite: 407] |
| UI Design | Figma | [cite_start][https://www.figma.com/](https://www.figma.com/) [cite: 407] |
| Task Management | Trello | [cite_start][https://trello.com/](https://trello.com/) [cite: 407] |
| Teamwork collaboration | Miro | [cite_start][https://miro.com/](https://miro.com/) [cite: 407] |
| API development platform | Postman | [cite_start][https://www.postman.com/](https://www.postman.com/) [cite: 407] |

---

## [cite_start]PART 3: การตั้งค่า Git และสภาพแวดล้อมการพัฒนา [cite: 409]

### [cite_start]STEP 1: การตั้งค่า Git บนเครื่อง (Local Development) [cite: 410]

1.  [cite_start]**ลงทะเบียน GitHub:** สมัครใช้งานที่ [www.github.com](https://www.github.com) [cite: 410]
2.  [cite_start]**ตั้งค่า Git:** เปิดแอป Terminal และตั้งค่าชื่อผู้ใช้และอีเมล [cite: 449] [cite_start]อย่าลืมใส่เครื่องหมายคำพูด `"` ครอบชื่อและอีเมล [cite: 452]
    ```bash
    git config --global user.name "ชื่อที่จะใช้"
    git config --global user.email "อีเมลที่จะใช้"
    ```
    [cite_start]**ตัวอย่าง:** [cite: 453]
    ```bash
    git config --global user.name "tkeatkaew"
    git config --global user.email "thanit@emutl.ac.th"
    ```
3.  [cite_start]**ตรวจสอบการตั้งค่า:** [cite: 456]
    ```bash
    git config --list
    ```
4.  [cite_start]**สร้าง Directory สำหรับงาน:** [cite: 416]
    ```bash
    mkdir class
    cd class
    mkdir engse203
    cd engse203
    ```

### [cite_start]STEP 2: การตั้งค่า Node.js (Node Development Environment) [cite: 465]

1.  [cite_start]**ติดตั้ง NVM (Node Version Manager):** ใช้สำหรับจัดการและเปลี่ยนเวอร์ชันของ Node.js [cite: 466]
    ```bash
    curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh) | bash
    source ~/.bashrc
    ```
2.  [cite_start]**ติดตั้ง Node.js:** ติดตั้งเวอร์ชัน 20 [cite: 471]
    ```bash
    nvm install 20
    ```
3.  **ตรวจสอบเวอร์ชัน:**
    ```bash
    [cite_start]node -v  # ควรแสดงเวอร์ชัน v20.x.x [cite: 472, 473]
    [cite_start]npm -v   # ควรแสดงเวอร์ชัน 10.x.x [cite: 474, 475]
    ```

### [cite_start]STEP 3: การตั้งค่าการเชื่อมต่อ GitHub ด้วย SSH [cite: 477]

1.  [cite_start]**สร้าง SSH Key:** (แก้ไขอีเมลให้เป็นของตนเอง) [cite: 477]
    ```bash
    cd ~/.ssh
    ssh-keygen -t ed25519 -C "your.email@example.com"
    ```
    * [cite_start]เมื่อระบบถาม `Enter file in which to save the key`: ให้พิมพ์ **id_github** [cite: 483]
    * [cite_start]เมื่อระบบถาม `Enter passphrase`: ให้กด Enter 2 ครั้ง (ไม่ต้องใส่รหัสผ่าน) [cite: 484]

2.  **สร้างไฟล์ Config สำหรับ SSH:**
    * [cite_start]ในโฟลเดอร์ `.ssh` ให้สร้างไฟล์ชื่อ `config` [cite: 512]
        ```bash
        nano config
        ```
    * [cite_start]เพิ่มเนื้อหา 4 บรรทัดนี้ลงไปในไฟล์ [cite: 514] [cite_start]แล้วบันทึก (กด `Ctrl+X` แล้วกด `Y` และ `Enter`) [cite: 520]
        ```
        Host github.com
          HostName github.com
          User git
          IdentityFile ~/.ssh/id_github
        ```

3.  **คัดลอก Public Key:**
    * [cite_start]แสดงเนื้อหาของ Public Key และคัดลอกข้อความทั้งหมดเก็บไว้ [cite: 523, 524, 525]
        ```bash
        cat id_github.pub
        ```

### [cite_start]STEP 4: การตั้งค่าบนเว็บไซต์ GitHub [cite: 557]

1.  **เพิ่ม Public Key:**
    * [cite_start]ไปที่ `GitHub Settings > SSH and GPG Keys` [cite: 559, 561]
    * [cite_start]กด `New SSH key` [cite: 561]
    * [cite_start]ตั้งชื่อในช่อง `Title` และนำ Public Key ที่คัดลอกไว้มาวางในช่อง `Key` จากนั้นกด `Add SSH Key` [cite: 562]

2.  **สร้าง Repository:**
    * [cite_start]ไปที่หน้า Repositories แล้วกด `New` [cite: 588]
    * [cite_start]สร้าง Repository ชื่อ **engse203-1_68** และตั้งค่าเป็น **Public** [cite: 601, 603]

3.  **Clone Repository:**
    * [cite_start]ไปยัง Directory ที่ต้องการ (เช่น `class/engse203`) [cite: 687]
    * [cite_start]คัดลอก URL แบบ **SSH** จากหน้า Repository ของคุณ [cite: 659]
    * [cite_start]ใช้คำสั่ง `git clone` ใน Terminal [cite: 688]
        ```bash
        git clone git@github.com:YourUsername/engse203-1_68.git
        ```
    * [cite_start]เข้าไปยังโฟลเดอร์ของโปรเจกต์ที่เพิ่ง clone มา [cite: 705, 706]
        ```bash
        cd engse203-1_68
        ```

### [cite_start]STEP 5: การใช้งาน Git และ VSCode [cite: 714]

1.  **ทดสอบ Git Workflow:**
    * [cite_start]สร้างไฟล์ใหม่: `nano index.html` (ใส่ข้อความ "Hello, from engse203-1_68.") [cite: 711]
    * [cite_start]ตรวจสอบสถานะ: `git status` [cite: 709]
    * [cite_start]เพิ่มไฟล์เข้า Staging Area: `git add index.html` [cite: 711]
    * [cite_start]Commit การเปลี่ยนแปลง: `git commit -m "1st index.html file added"` [cite: 711]
    * [cite_start]Push ขึ้น GitHub: `git push` [cite: 712]

2.  **เปิดโปรเจกต์ใน VSCode:**
    * ใน Terminal ที่อยู่ในโฟลเดอร์โปรเจกต์ ให้รันคำสั่ง:
        ```bash
        code .
        ```

3.  **ใช้งานผ่าน Source Control:**
    * [cite_start]เมื่อแก้ไขไฟล์ใน VSCode ให้ไปที่เมนู `Source Control` (ไอคอนรูปกิ่งไม้) [cite: 715]
    * [cite_start]ใส่ข้อความ Commit ในช่อง Message แล้วกด `Commit` [cite: 715]
    * [cite_start]กด `Sync Changes` เพื่อ Push การเปลี่ยนแปลงขึ้น GitHub [cite: 716]

---

## สรุปผลลัพธ์ที่ต้องทำได้

[cite_start]หลังจากทำตามขั้นตอนทั้งหมดแล้ว จะต้องสามารถ: [cite: 716]
* [cite_start]ใช้ Node.js ในเวอร์ชันที่ต้องการผ่าน `nvm` [cite: 716]
* [cite_start]เชื่อมต่อ Local Development กับ GitHub Repository ผ่าน SSH ได้ [cite: 716]
* [cite_start]เชื่อมต่อ Local Development กับ Local VM ผ่าน SSH ได้ [cite: 716]
* [cite_start]เชื่อมต่อ Local VM กับ GitHub Repository ผ่าน SSH ได้ [cite: 717]