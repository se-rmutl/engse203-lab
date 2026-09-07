import { Router } from 'express';
import * as controller from '../controllers/requestController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

/**
 * TODO W06-R1 (CP02, CP04, CP05) · ประกาศ route ทั้งหมด
 *
 *   GET    /              → controller.listRequests
 *   POST   /              → validateRequest แล้วต่อด้วย controller.createRequest
 *   GET    /:id           → controller.getRequest
 *   PUT    /:id           → controller.updateRequestStatus     (⭐ Challenge)
 *   DELETE /:id           → controller.deleteRequest
 *
 * ⚠ route ที่เจาะจง (path คงที่) ต้องเขียนก่อน route ที่มี :id เสมอ
 * คำใบ้: ใส่ middleware คั่นได้ เช่น router.post('/', validateRequest, controller.createRequest)
 */

export default router;
