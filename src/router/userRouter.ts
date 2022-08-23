import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
router.get('/', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);
export default router;
