import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
router.post('/', userController.getUserByEmail);
export default router;
