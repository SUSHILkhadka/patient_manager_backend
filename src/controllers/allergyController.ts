import { NextFunction, Response } from 'express';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { InvalidAllergyIdInURLError } from '../errors/errors';
import * as AllergyService from '../services/allergyService';

export const addAllergy = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { name, patientId } = req.body;

  AllergyService.addAllergy({
    name,
    patientId,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllAllergiesByPatientId = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const patientId = req.params.patientId;
  AllergyService.getAllAllergiesByPatientId(+patientId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateAllergy = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { name, patientId } = req.body;
  const id = +req.params.allergyId;
  if (isNaN(id)) {
    return next(InvalidAllergyIdInURLError);
  }

  AllergyService.updateAllergy({
    name,
    patientId,
    id: +id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deleteAllergy = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.allergyId;
  if (isNaN(id)) {
    return next(InvalidAllergyIdInURLError);
  }
  AllergyService.deleteAllergy(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
