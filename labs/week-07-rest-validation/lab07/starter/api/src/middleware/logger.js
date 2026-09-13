/** บันทึกทุกคำขอลง terminal — ทำให้เห็นว่ามีอะไรเข้ามาบ้าง */
export function logger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
}
