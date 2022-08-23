import StatusCodes from 'http-status-codes';
import { ISuccess } from '../domains/ISuccess';
import PatientModel from '../models/PatientModel';
import logger from '../misc/Logger';
import CustomError from '../middlewares/CustomError';
import { IPatient, IPatientToInsert } from '../domains/IPatient';

export const createPatient = async (patientToInsert: IPatientToInsert): Promise<ISuccess<IPatient>> => {

  logger.info('creating new patient' );
  const patient = await PatientModel.createPatient(patientToInsert);
  logger.info('created new patient successfully');
  return {
    data: patient,
    message: 'new patient created successfully',
  };
};
export const getAllPatients= async (): Promise<ISuccess<IPatient[]>> => {
  logger.info('fetching all patients ');

  const patients = await PatientModel.getAllPatients();
  if (!patients.length) {
    throw new CustomError("Patients list is empty", StatusCodes.NOT_FOUND);
  }
  logger.info('patients list fetched successfully ');
  return {
    data: patients,
    message: 'patient list fetched successfully',
  };
};

export const updatePatient = async (patient: IPatient): Promise<ISuccess<IPatient>> => {
  logger.info('updating patient by patient id');
  const updatedPatient = await PatientModel.updatePatient(patient);
  if (!updatedPatient) {
    throw new CustomError("Patient  doesn't exist to edit", StatusCodes.NOT_FOUND);
  }
  logger.info('updated patient by patientId ');
  return {
    data: updatedPatient,
    message: 'updated patient by patientId',
  };
};

export const deletePatient = async (patientId: number): Promise<ISuccess<IPatient>> => {
  logger.info('updating patient by patientId');
  const patient = await PatientModel.deletePatient(patientId);
  if (!patient) {
    throw new CustomError('Couldnot delete the requested patient', StatusCodes.NOT_FOUND);
  }
  logger.info('deleted patient by patientId');
  return {
    data: patient,
    message: 'deleted patient by patientId',
  };
};

