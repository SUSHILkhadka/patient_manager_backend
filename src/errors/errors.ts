import { StatusCodes } from 'http-status-codes';
import CustomError from '../middlewares/CustomError';

export const InvalidPatientIdInURL = new CustomError(
  'Invalid Patient id in url',
  StatusCodes.BAD_REQUEST
);
export const InvalidAllergyIdInURL = new CustomError(
  'Invalid Allergy id in url',
  StatusCodes.BAD_REQUEST
);
