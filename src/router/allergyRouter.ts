import { Router } from 'express';
import * as allergyController from '../controllers/allergyController';
import { validate } from '../middlewares/validate';
import allerygySchema from '../validation/schemas/allergySchema';

const router = Router();
router.post('/', validate(allerygySchema), allergyController.addAllergy);
router.get('/:patientId', allergyController.getAllAllergiesByPatientId);
router.put('/:allergyId',validate(allerygySchema), allergyController.updateAllergy);
router.delete('/:allergyId', allergyController.deleteAllergy);
export default router;
