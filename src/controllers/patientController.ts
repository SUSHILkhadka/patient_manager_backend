import { NextFunction, Response } from 'express';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { InvalidPatientIdInURL } from '../errors/errors';
import * as PatientService from '../services/patientService';

export const createPatient = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { name, email, contact, dob, address, photoUrl, specialAttention } =
    req.body;
  PatientService.createPatient({
    name,
    email,
    contact,
    dob,
    address,
    photoUrl,
    specialAttention: Boolean(specialAttention),
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllPatients = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  PatientService.getAllPatients()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updatePatient = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { name, email, contact, dob, address, photoUrl, specialAttention } =
    req.body;
  const id = +req.params.patientId;
  if (isNaN(id)) {
    return next(InvalidPatientIdInURL);
  }

  PatientService.updatePatient({
    name,
    email,
    contact,
    dob,
    address,
    photoUrl,
    specialAttention: Boolean(specialAttention),
    patientId: +id,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deletePatient = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const id = +req.params.patientId;
  if (isNaN(id)) {
    return next(InvalidPatientIdInURL);
  }
  PatientService.deletePatient(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
