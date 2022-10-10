import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validate } from '../middlewares/validate';
import editUserSchema from '../validation/schemas/editUserSchema';

const router = Router();
router.get('/', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/',validate(editUserSchema), userController.updateUser);
router.delete('/', userController.deleteUser);
export default router;
