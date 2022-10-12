import { IPatient, IPatientToInsert } from '../domains/IPatient';
import { ISuccess } from '../domains/ISuccess';
import { EmptyPatientListError, PatientNotFoundError } from '../errors/errors';
import logger from '../misc/Logger';
import PatientModel from '../models/patientModel';

export const createPatient = async (
  patientToInsert: IPatientToInsert
): Promise<ISuccess<IPatient>> => {
  logger.info('creating new patient');
  const patient = await PatientModel.createPatient(patientToInsert);
  logger.info('created new patient successfully');
  return {
    data: patient,
    message: 'new patient created successfully',
  };
};
export const getAllPatients = async (): Promise<ISuccess<IPatient[]>> => {
  logger.info('fetching all patients ');

  const patients = await PatientModel.getAllPatients();
  if (!patients.length) {
    throw EmptyPatientListError;
  }
  logger.info('patients list fetched successfully ');
  return {
    data: patients,
    message: 'patient list fetched successfully',
  };
};

export const updatePatient = async (
  patient: IPatient
): Promise<ISuccess<IPatient>> => {
  logger.info('updating patient by patient id' + patient.patientId);
  const updatedPatient = await PatientModel.updatePatient(patient);
  if (!updatedPatient) {
    throw PatientNotFoundError;
  }
  logger.info('updated patient by patientId ');
  return {
    data: updatedPatient,
    message: 'updated patient by patientId',
  };
};

export const deletePatient = async (
  patientId: number
): Promise<ISuccess<IPatient>> => {
  logger.info('updating patient by patientId');
  const patient = await PatientModel.deletePatient(patientId);
  if (!patient) {
    throw PatientNotFoundError;
  }
  logger.info('deleted patient by patientId');
  return {
    data: patient,
    message: 'deleted patient by patientId',
  };
};
