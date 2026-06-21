# แนวทางปรับปรุง Course Repository

เอกสารนี้สำหรับผู้สอน ผู้ช่วยสอน หรือผู้ที่ได้รับมอบหมายให้แก้ไขเนื้อหาใน Repository กลางของรายวิชา

## หลักการ

1. ไม่แก้ไขข้อกำหนดคะแนนหรือกำหนดส่งโดยไม่ประกาศให้นักศึกษาทราบ
2. ทุก LAB ใหม่ควรมีอย่างน้อย: จุดประสงค์, สิ่งที่ต้องเตรียม, ผลงานที่ต้องส่ง, เกณฑ์ตรวจ, และ checklist
3. คำสั่งที่ใช้ใน LAB ต้องระบุให้ชัดว่าทำงานบน macOS และ Windows อย่างไร หากแตกต่างกัน
4. หลีกเลี่ยงการวาง secret, token หรือข้อมูลของนักศึกษาใน repository กลาง
5. การเปลี่ยนแปลงเนื้อหาให้ใช้ branch และ pull request เพื่อเก็บประวัติการปรับปรุง

## รูปแบบชื่อ Branch แนะนำ

```text
docs/week-02-lab-instructions
fix/lab-01-command-typo
feature/week-03-starter-files
```

## รูปแบบ Commit แนะนำ

```text
docs: add Week 02 lab instructions
fix: correct Windows command in Lab 01
feat: add starter files for React lab
```
