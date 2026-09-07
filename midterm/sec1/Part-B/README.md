# ENGSE203 สอบกลางภาค — ภาคปฏิบัติ (Campus Service Request)

แอปเดียวกับที่ทำใน LAB · ทำงานทีละ **checkpoint** และ **commit ทุกครั้งที่ผ่าน checkpoint**

## เริ่มต้น
```bash
npm ci
npm run dev      # เปิดที่ http://localhost:5173
```

## งาน (รวม 40 คะแนน · 180 นาที)
| งาน | คะแนน | สรุป |
|---|---:|---|
| B1 Debug | 12 | หา/แก้บั๊ก 6 จุด + กรอก `B1_BUGS.md` |
| B2 Search | 10 | เพิ่มช่องค้นหาใน Dashboard |
| B3 Persist | 10 | ปุ่ม "ทำเสร็จ" เปลี่ยนสถานะแล้วรอด refresh |
| B4 Component | 8 | สร้าง `PriorityBadge` แล้วใช้ใน `RequestCard` |

## กติกา (อ่านให้ครบ)
- ใช้ AI/เอกสาร/เว็บได้ — แต่ **commit ทุก checkpoint** และกรอก `AI_USAGE.md`
- ทุกคนถูกสัมภาษณ์ (oral) จากโค้ดที่ส่ง — อธิบายไม่ได้ คะแนนถูกทบทวน
- ห้ามแก้ไฟล์ที่เขียนว่า "ให้มาแล้ว — ห้ามแก้" (`services/`)
- ก่อนหมดเวลา: `npm run build` ต้องผ่าน + push + เปิด Pull Request + ติด tag + แจ้งผู้สอน

## ทำงานทีละ checkpoint (workflow)
```
อ่านโจทย์ → ทำนายผล → แก้ทีละจุด → npm run dev แล้วสังเกต → ผ่านแล้ว commit
```

## การส่งงาน — ต้องครบทั้ง 3 อย่าง

การส่ง = **โค้ด (commit)** + **ผลรัน (build/deploy)** + **Pull Request + tag**

```bash
npm run build                       # 1) ต้องขึ้น "✓ built" ไม่มี error
git add -A
git commit -m "final: all tasks + build passes"
git push                            # 2) push โค้ดทั้งหมด

# 3) เปิด Pull Request บน GitHub (branch ของคุณ -> main)

git tag midterm-submission-v1       # 4) ติด tag เวอร์ชันที่ส่ง
git push origin midterm-submission-v1
```

เมื่อ push ระบบจะ build + deploy อัตโนมัติ (GitHub Actions) รอ 1–2 นาที
แล้วเปิด **หน้า submission** (GitHub Pages ของ repo คุณ) ตรวจว่าปุ่มใช้ได้:

- **View Result** → แอปที่ deploy แล้ว
- **Source** → โค้ดใน repo
- **Pull Request** → PR ที่เปิดไว้

อย่าลืมกรอก **ชื่อ–นามสกุล / รหัสนักศึกษา / Sec** ในหน้า submission

## เช็คลิสต์ก่อนแจ้งเสร็จ

- [ ] B1 แก้ครบ 6 จุด + `B1_BUGS.md` กรอกครบ
- [ ] B2 ค้นหาทำงานครบ 4 checkpoint
- [ ] B3 ปุ่มทำเสร็จ persist + รอด refresh (F5 แล้วยังอยู่)
- [ ] B4 `PriorityBadge` + ใช้ใน `RequestCard`
- [ ] `npm run build` ผ่าน
- [ ] `AI_USAGE.md` กรอกครบ
- [ ] push + Pull Request + tag `midterm-submission-v1`
- [ ] แจ้งผู้สอนว่าพร้อม oral
