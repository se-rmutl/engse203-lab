# Pre-LAB 04 Checkpoint Snapshots

แต่ละโฟลเดอร์เก็บ `src/` หลังจบ checkpoint นั้น ใช้เพื่อเปรียบเทียบหรือ restore เมื่อได้รับอนุญาตจากผู้สอน

```bash
cp -R checkpoints/CP03/src/. ~/projects/engse203-prelab04/src/
```

จาก working copy ให้รัน:

```bash
npm run dev
npm run build
```

| Snapshot | แนวคิดล่าสุด |
|---|---|
| CP00 | Vite + JSX first success |
| CP01 | Functional Components + Props |
| CP02 | List rendering + stable key |
| CP03 | useState + derived data + filter |
| CP04 | Controlled Form + validation + add |
| CP05 | callback delete + conditional rendering |
| CP06 | responsive/accessibility |
| CP07 | verified final checkpoint |

> Snapshot เป็น safety net ไม่ใช่ทางลัด ผู้เรียนต้องอธิบาย data flow และ code change ของ checkpoint ที่ restore ได้

