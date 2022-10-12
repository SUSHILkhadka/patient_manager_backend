import { Router } from 'express';
import authenticate from '../middlewares/authenticate';
import allergyRouter from './allergyRouter';
import checkEmailRouter from './checkEmailRouter';
import loginRouter from './loginRouter';
import logoutRouter from './logoutRouter';
import patientRouter from './patientRouter';
import registerRouter from './registerRouter';
import tokenRouter from './tokenRouter';
import uploadRouter from './uploadRouter';
import userRouter from './userRouter';

const router = Router();
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/token', tokenRouter);
router.use('/logout', logoutRouter);
router.use('/checkEmail', checkEmailRouter);

router.use(authenticate);
router.use('/user', userRouter);
router.use('/patient', patientRouter);
router.use('/allergy', allergyRouter);
router.use('/upload', uploadRouter);

export default router;
