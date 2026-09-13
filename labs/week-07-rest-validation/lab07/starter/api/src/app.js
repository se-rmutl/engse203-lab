import express from 'express';
import { config } from './config.js';
import requestRoutes from './routes/requestRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  /**
   * TODO W07-A1 (CP10) · เปิด CORS
   *   app.use(cors({ origin: config.corsOrigin }))
   *
   * ⚠ ต้องอยู่บนสุด ก่อน middleware และ route ทั้งหมด
   *   เพราะเบราว์เซอร์จะส่ง preflight request (OPTIONS) มาก่อน
   *   ถ้า CORS อยู่ล่าง preflight จะถูกบล็อกก่อนถึง
   */

  /**
   * TODO W07-A2 (🏠 CP14) · เปลี่ยน logger เองเป็น morgan
   *   dev  → morgan('dev')       อ่านง่าย มีสี
   *   prod → morgan('combined')  ละเอียด เหมาะเก็บ log
   * ใช้ config.isProduction ตัดสิน
   */

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Campus Service API is running', version: '2.0.0' });
  });
  app.use('/api/requests', requestRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
