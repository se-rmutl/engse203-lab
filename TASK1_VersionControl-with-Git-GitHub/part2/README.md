## Part 2:  GitHub Workflow & Team Collaboration - [ทำเป็นทีม] 🚀 (60 คะแนน)
- Lab สำหรับนักศึกษา Software Engineer 2 คน เพื่อฝึกฝน GitHub Workflow และ Collaboration ตั้งแต่พื้นฐานจนถึงระดับกลาง โดยใช้โปรเจกต์ Mini-Ecommerce 
- Lab นี้จะจำลองสถานการณ์จริงที่นักพัฒนา 2 คนต้องร่วมกันแก้ไขปัญหาและปรับปรุงโปรเจกต์ที่มีอยู่เดิมให้ดีขึ้น (จาก Version 1 ไปสู่ Version 2)

### วัตถุประสงค์:

* เข้าใจและสามารถประยุกต์ใช้ GitHub Flow ในการทำงานร่วมกับผู้อื่น

* ฝึกฝนการใช้ Git commands ที่จำเป็นสำหรับการทำงานเป็นทีม (branch, commit, push, pull, merge)

* เรียนรู้กระบวนการ Pull Request (PR) และ Code Review

* ฝึกทักษะการแก้ไข Merge Conflict ที่อาจเกิดขึ้นในการทำงานจริง

### สถานการณ์จำลอง:
เรามีโปรเจกต์ Mini-Ecommerce (Version 1) ที่มีฟีเจอร์พื้นฐานแต่ยังพบปัญหาหลายอย่าง นักศึกษา 2 คนจะได้รับบทบาทเป็นนักพัฒนาเพื่อแก้ไขปัญหานี้

* Dev A (Frontend/UX Developer): รับผิดชอบการปรับปรุงหน้าตา (UI/UX), จัดการ Loading States และเพิ่มระบบ Notification

* Dev B (Backend/Logic Developer): รับผิดชอบการปรับปรุงประสิทธิภาพระบบค้นหาและเพิ่มการ Validation ข้อมูล

### Version 1: The Initial Project (โค้ดเริ่มต้น)
นี่คือโค้ดของโปรเจกต์ตั้งต้นที่ยังมีปัญหาอยู่

### โครงสร้างไฟล์:
```
mini-ecommerce/
├── index.html
├── js/
│   ├── main.js
│   └── products.json
├── css/
│   └── style.css
└── README.md
```

#### ไฟล์พื้นฐาน
ไฟล์ `index.html`:
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini E-Commerce</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>My Simple Store</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="ค้นหาสินค้า...">
        </div>
    </header>
    <main id="product-list">
        </main>
    <script src="js/main.js"></script>
</body>
</html>
```

ไฟล์ `css/style.css`:
```css
body { font-family: sans-serif; margin: 0; background-color: #f4f4f4; }
header { background: #333; color: #fff; padding: 1rem; text-align: center; }
input[type="text"] { width: 60%; padding: 8px; }
main {justify-content: center; padding: 1rem; }
.product-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px;
    padding: 15px;
    width: 200px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.product-card img { max-width: 100%; height: auto; }
.product-card h3 { font-size: 1.1em; }
.product-card p { color: #888; }
```

ไฟล์ `js/products.json:`:
```JSON
[
    {"id": 1, "name": "Classic T-Shirt", "price": 499, "image": "https://placehold.co/150/FF0000/FFFFFF?text=T-Shirt"},
    {"id": 2, "name": "Running Shoes", "price": 1200, "image": "https://placehold.co/150/0000FF/FFFFFF?text=Shoes"},
    {"id": 3, "name": "Smart Watch", "price": 3500, "image": "https://placehold.co/150/00FF00/FFFFFF?text=Watch"},
    {"id": 4, "name": "Denim Jeans", "price": 990, "image": "https://placehold.co/150/FFFF00/000000?text=Jeans"}
]
```

ไฟล์ `js/main.js:`:
```JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    let allProducts = [];

    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Inefficient Search
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => {
            // Simple search, not very efficient
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });
});
```
### ขั้นตอนการทำ Lab (GitHub Workflow)
### ส่วนที่ 1: Setup & Branching (15 นาที)
1. สร้าง Repository (โดย Dev A):

   * Dev A ไปที่ GitHub และสร้าง repository ใหม่ชื่อ `mini-ecommerce-collaboration`.

   * เพิ่มโค้ด Version 1 ทั้งหมดเข้าไปในเครื่องของตัวเอง, ทำ `git init`, `git add .`, `git commit -m "Initial project version 1"`

   * ไปที่ `Settings > Collaborators` และเชิญ Dev B เข้ามาในโปรเจกต์

2. เข้าร่วมโปรเจกต์ (โดย Dev B):

   * Dev B รับคำเชิญและ `git clone` repository ลงมาที่เครื่องของตัวเอง

3. สร้าง Feature Branches:

   * นักพัฒนาทั้งสองคนต้องสร้าง branch ของตัวเองจาก `main` เพื่อทำงานในส่วนของตนเอง

   * Dev A (ใน Terminal): `git checkout -b feature/ui-ux-improvements`

   * Dev B (ใน Terminal): `git checkout -b feature/search-and-validation`

### ส่วนที่ 2: Development & Pull Request (45 นาที)
ตอนนี้ทั้งสองคนจะทำงานบน branch ของตัวเองพร้อมกัน

#### งานของ Dev A (Branch: `feature/ui-ux-improvements`): 🎨

1. เพิ่ม Loading State: ใน `index.html` เพิ่ม `<div id="loader" class="loader">Loading...</div> `และใน `main.js`ให้แสดง loader นี้ก่อน fetch ข้อมูล และซ่อนเมื่อข้อมูลแสดงผลเสร็จแล้ว

2. ปรับปรุง UI/UX: ใน` style.css` เพิ่ม transition ให้ `.product-card` เพื่อให้เกิด animation ที่ smooth เวลา hover (`transform: scale(1.05);`)
3. ปรับปรุง UI/UX: ใน` style.css` ให้สามารถแสดงผล แบบ responsive - Fixed grid columns เพื่อให้แสดงผลที่สวยงานและแปรผันตามขนาดหน้าจอ โดยแก้ไขที่  `#product-list` โดยต้องเพิ่ม `display: flex; flex-wrap: wrap;`

4. ปรับปรุงไฟล์สินค้า ให้มีรูปและราคาที่ต้องมีเครื่องหมาย comma(,) สำหรับแยกหลักการแสดงผลค่าเงินให้อ่านง่ายเช่น `12600 บาท` เปลี่ยนเป็น `12,600 บาท`
   
ไฟล์ `js/products.json:` ใหม่:
```JSON
[
    {"id": 1, "name": "Classic T-Shirt", "price": 499, "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"},
    {"id": 2, "name": "Running Shoes", "price": 1200, "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"},
    {"id": 3, "name": "Smart Watch", "price": 3500, "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80"},
    {"id": 4, "name": "Denim Jeans", "price": 990, "image": "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500&q=80"},
    {"id": 5, "name": "Leather Backpack", "price": 1850, "image": "https://images.unsplash.com/photo-1561126135-b7a5dfadace6?q=80&w=500"},
    {"id": 6, "name": "Sunglasses", "price": 750, "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80"}
]
```
5. Commit & Push: เมื่อแก้ไขเสร็จ `git add .`, `git commit -m "feat: Add loading state and improve card UI"` และ `git push origin feature/ui-ux-improvements`

#### งานของ Dev B (Branch: `feature/search-and-validation`): 🔧

1. ปรับปรุงการค้นหา: ใน `main.js` ปรับปรุง logic การค้นหาให้ดีขึ้น เช่น ตัดช่องว่างที่ไม่จำเป็นออก (`trim()`) ก่อนค้นหา

2. เพิ่ม Validation (จำลอง): เพิ่มเงื่อนไขใน `main.js` ว่าถ้า `searchInput.value` ว่างเปล่า ให้แสดงสินค้าทั้งหมดแทนที่จะแสดงรายการว่าง

3. Commit & Push: เมื่อแก้ไขเสร็จ `git add .`, `git commit -m "fix: Improve search logic and handle empty input"` และ `git push origin feature/search-and-validation`


### ส่วนที่ 3: Code Review และ Merge (30 นาที)
1. Dev A สร้าง Pull Request (PR):

   * Dev A เข้าไปที่ GitHub และสร้าง Pull Request (PR) จาก branch `feature/ui-ux-improvements` ไปยัง `main`

   * ในช่อง PR description ให้อธิบายว่าได้ทำอะไรไปบ้าง และ assign Dev B เป็น `Reviewer`

2. Dev B ทำ Code Review:

   * Dev B จะได้รับการแจ้งเตือน ให้เข้าไปดูโค้ดใน PR

   * Dev B ลองแสดงความเห็นในโค้ด เช่น "ตรงนี้เพิ่ม comment อธิบายหน่อยได้ไหม?" หรือ "อนิเมชั่นเร็วไปนิดนึง"

   * Dev A แก้ไขตาม comment, commit และ push เพิ่มเข้าไปใน branch เดิม (PR จะอัปเดตอัตโนมัติ)

เมื่อพอใจแล้ว Dev B กด Approve

3. Merge PR แรก:

   * Dev A กด Merge Pull Request และลบ branch `feature/ui-ux-improvements` ทิ้ง


### ส่วนที่ 4: Handling Merge Conflict (ระดับกลาง - 30 นาที)
1. Dev B สร้าง Pull Request ที่สอง:

   * Dev B สร้าง PR จาก branch `feature/search-and-validation `ไปยัง `main`

   * อุ๊ปส์! GitHub จะแจ้งเตือนว่า "Can't automatically merge" เพราะตอนนี้ `main` มีโค้ดใหม่จาก Dev A แล้ว (โดยเฉพาะไฟล์ `main.js`) ทำให้เกิด Merge Conflict

2. แก้ไข Conflict (โดย Dev B):

   * Dev B ต้องดึงโค้ดล่าสุดของ `main` มาที่เครื่องก่อน:

```bash
# สลับไปที่ main branch และดึงข้อมูลล่าสุด
git checkout main
git pull origin main
```

สลับกลับไปที่ branch ของตัวเองและทำการ rebase (หรือ merge ก็ได้ แต่ rebase ทำให้ประวัติสวยงามกว่า):
```bash
git checkout feature/search-and-validation
git rebase main
```
   * Git จะแจ้งว่ามี conflict ในไฟล์ js/main.js

   * เปิดไฟล์ js/main.js ใน VS Code จะเห็นส่วนที่ conflict แสดงแบบนี้:
```bash
<<<<<<< HEAD
// โค้ดที่มาจาก main (ของ Dev A)
=======
// โค้ดของ Dev B
>>>>>>> feature/search-and-validation
```
   * Dev B ต้องแก้ไขโค้ดตรงนี้โดยเลือกว่าจะเก็บส่วนไหนไว้ หรือรวมโค้ดทั้งสองส่วนเข้าด้วยกันอย่างถูกต้อง แล้วลบ `<<<<<<<,` `=======,` `>>>>>>>` ทิ้ง

   * เมื่อแก้ไขเสร็จ ให้ `git add js/main.js` แล้วรัน `git rebase --continue`

   * Push โค้ดที่แก้ไขแล้วขึ้นไปใหม่ (ต้องใช้ force push):
`git push --force-with-lease origin feature/search-and-validation`

3. Merge PR ที่สอง:

   * ตอนนี้ PR ของ Dev B ใน GitHub จะไม่มี conflict แล้ว

   * Dev A เข้าไป Review, Approve และ Merge PR ของ Dev B

**Lab เสร็จสมบูรณ์!** 🎉 
ทั้งสองคนได้ทำงานร่วมกันเพื่ออัปเกรดโปรเจกต์จาก Version 1 เป็น Version 2 ได้สำเร็จ

### การส่งงาน Part 2

#### Deliverables:
1. **Working Website**: เว็บไซต์ที่ทำงานได้สมบูรณ์
2. **Repository**: GitHub repository พร้อม proper structure
3. **Documentation**: README.md ที่อธิบายโปรเจกต์
4. **Git History**: Commit history ที่เป็นระเบียบ
5. **Pull Requests**: อย่างน้อย 2 PRs พร้อม reviews
6. **Team Report**: รายงานการทำงานเป็นทีม (2-3 หน้า)

#### Team Report ต้องมี:
- การแบ่งหน้าที่ความรับผิดชอบ
- ปัญหาที่พบและวิธีแก้ไข
- การใช้งาน Git commands และ workflow
- บทเรียนที่ได้รับจากการทำงานเป็นทีม
- ความคิดเห็นเกี่ยวกับ Version Control

---

## Rubric การให้คะแนน ของ Part 2: Advanced Workflow (60 คะแนน)

| หัวข้อ | ดีเยี่ยม (13-15) | ดี (10-12) | ปานกลาง (7-9) | ต้องปรับปรุง (1-6) |
|--------|-----------------|------------|----------------|-------------------|
| **Team Collaboration** (15 คะแนน) | ทำงานเป็นทีมได้ดีมาก มีการแบ่งงานชัดเจน | ทำงานเป็นทีมได้ดี | ทำงานเป็นทีมได้ปานกลาง | ทำงานเป็นทีมได้น้อย |
| **Git Workflow** (15 คะแนน) | ใช้ workflow ซับซ้อนได้ถูกต้อง | ใช้ workflow ได้ดี | ใช้ workflow ได้พอใช้ | ใช้ workflow ไม่ถูกต้อง |
| **Code Review** (15 คะแนน) | Review ละเอียด มีคอมเมนต์ที่เป็นประโยชน์ | Review ดี มีคอมเมนต์บางส่วน | Review ได้ แต่ไม่ละเอียด | Review ไม่เพียงพอ |
| **Final Product** (15 คะแนน) | เว็บไซต์สมบูรณ์ ทำงานได้ดีมาก | เว็บไซต์ทำงานได้ดี | เว็บไซต์ทำงานได้บางส่วน | เว็บไซต์ไม่สมบูรณ์ |

### คะแนนพิเศษ (Bonus 10 คะแนน)
- การใช้ Advanced Git features (rebase, cherry-pick, stash)
- Documentation ที่ดีเยี่ยม
- การใช้ GitHub Actions หรือ automation tools
- การแก้ไข merge conflicts ได้ดี
- การนำเสนอที่โดดเด่น

### หมายเหตุ:
- ทุกคนในทีมจะได้คะแนนเท่ากันใน Part 2
- หากมีสมาชิกไม่มีส่วนร่วม จะได้คะแนนลดลง
- ต้องส่งงานตรงเวลาเท่านั้น
- สามารถใช้ ChatGPT หรือ AI tools ได้ แต่ต้องระบุในรายงาน

---

## Resources & References

### Git Commands Reference
```bash
# พื้นฐาน
git init
git clone <url>
git add <file>
git commit -m "message"
git push
git pull

# Branching
git branch
git checkout -b <branch>
git merge <branch>
git branch -d <branch>

# Remote
git remote add origin <url>
git remote -v
git push -u origin <branch>

# Advanced
git rebase
git cherry-pick
git stash
git tag
```

### GitHub Features
- Issues and Project boards
- Pull Requests and Code Review
- GitHub Actions
- Branch protection rules
- Collaborative features

### Best Practices
- เขียน commit messages ที่ชัดเจน
- ใช้ branch naming convention
- ทำ regular commits
- Review code ก่อน merge
- เขียน documentation ที่ดี
