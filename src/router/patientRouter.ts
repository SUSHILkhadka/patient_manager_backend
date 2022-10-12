import { Router } from 'express';
import * as patientController from '../controllers/patientController';
import { validate } from '../middlewares/validate';
import patientSchema from '../validation/schemas/patientSchema';

const router = Router();
router.post('/',validate(patientSchema), patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.put('/:patientId', patientController.updatePatient);
router.delete('/:patientId', patientController.deletePatient);

export default router;
