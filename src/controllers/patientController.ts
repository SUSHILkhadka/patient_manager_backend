import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IRequestWithTokenData } from "../domains/IRequestWithTokenData";
import CustomError from "../middlewares/CustomError";
import * as PatientService from "../services/patientService";

export const createPatient = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    contact,
    dob,
    address,
    photoUrl,
    specialAttention,
    allergies,
  } = req.body;
  const userId = req.id;
  if (!userId) {
    return next(
      new CustomError(
        "id of user in token data is required",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  PatientService.createPatient({
    name,
    email,
    contact,
    dob,
    address,
    photoUrl,
    specialAttention,
    allergies,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAllPatients = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const userId = req.id;
  if (!userId) {
    return next(
      new CustomError(
        "id of user in token data is required",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  PatientService.getAllPatients()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const updatePatient = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const {   name,
    email,
    contact,
    dob,
    address,
    photoUrl,
    specialAttention,
    allergies} = req.body;
  const userId = req.id;
  const id = req.params.patientId;
  if (!userId || !id) {
    return next(
      new CustomError(
        "id of user in token data is required",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  PatientService.updatePatient({   name,
    email,
    contact,
    dob,
    address,
    photoUrl,
    specialAttention,
    allergies,patientId:+id})
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deletePatient = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const userId = req.id;
  const id = req.params.patientId;
  if (!userId || !id) {
    return next(
      new CustomError(
        "id of user in token data is required",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  PatientService.deletePatient(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
