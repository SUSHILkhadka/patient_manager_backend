import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validate } from '../middlewares/validate';
import registerSchema from '../validation/schemas/registerSchema';

const router = Router();
router.post('/', validate(registerSchema), userController.createUser);
export default router;
