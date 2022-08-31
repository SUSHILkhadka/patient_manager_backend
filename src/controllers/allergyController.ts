import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import CustomError from '../middlewares/CustomError';
import * as AllergyService from '../services/allergyService';
import { stringValidator } from '../utils/stringValidation';

export const addAllergy = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { name, patientId } = req.body;
  const userId = req.id;
  if (!userId) {
    return next(new CustomError('id of user in token data is required', StatusCodes.BAD_REQUEST));
  }
  if (!stringValidator(name)) {
    console.log('asdf');
    return next(new CustomError("name cann't be empty", StatusCodes.BAD_REQUEST));
  }
  AllergyService.addAllergy({
    name,
    patientId,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllAllergiesByPatientId = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const userId = req.id;
  if (!userId) {
    return next(new CustomError('id of user in token data is required', StatusCodes.BAD_REQUEST));
  }
  const patientId = req.params.patientId;
  AllergyService.getAllAllergiesByPatientId(+patientId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateAllergy = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { name, patientId } = req.body;
  const userId = req.id;
  const id = req.params.allergyId;
  if (!userId || !id) {
    return next(new CustomError('id of user in token data is required', StatusCodes.BAD_REQUEST));
  }
  if (!stringValidator(name)) {
    return next(new CustomError("name cann't be empty", StatusCodes.BAD_REQUEST));
  }
  AllergyService.updateAllergy({
    name,
    patientId,
    id: +id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deleteAllergy = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const userId = req.id;
  const id = req.params.allergyId;
  if (!userId || !id) {
    return next(new CustomError('id of user in token data is required', StatusCodes.BAD_REQUEST));
  }
  AllergyService.deleteAllergy(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
