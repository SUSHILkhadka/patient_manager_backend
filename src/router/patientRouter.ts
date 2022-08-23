import { Router } from 'express';
import * as patientController from '../controllers/patientController';

const router = Router();
router.post('/', patientController.createPatient);
router.get('/', patientController.getAllPatients);
router.put('/:patientId', patientController.updatePatient);
router.delete('/:patientId', patientController.deletePatient);
export default router;
