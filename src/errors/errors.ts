import { StatusCodes } from 'http-status-codes';
import CustomError from '../misc/CustomError';

export const InvalidPatientIdInURLError = new CustomError(
  'Invalid Patient id in url',
  StatusCodes.BAD_REQUEST
);
export const InvalidAllergyIdInURLError = new CustomError(
  'Invalid Allergy id in url',
  StatusCodes.BAD_REQUEST
);

export const InvalidRefreshTokenError = new CustomError(
  'Invalid refresh token',
  StatusCodes.UNAUTHORIZED
);

export const InvalidAccessTokenError = new CustomError(
  'Invalid access token',
  StatusCodes.UNAUTHORIZED
);

export const EmailIsRequiredError = new CustomError(
  'Email is required',
  StatusCodes.BAD_REQUEST
);

export const InvalidCredentialsError = new CustomError(
  'Invalid credentials',
  StatusCodes.BAD_REQUEST
);

export const PatientNotFoundError = new CustomError(
  "patient doesn't exist to operate",
  StatusCodes.NOT_FOUND
);
export const EmptyPatientListError = new CustomError(
  'patient list is empty',
  StatusCodes.NOT_FOUND
);

export const AllergyNotFoundError = new CustomError(
  "allergy doesn't exist to operate",
  StatusCodes.NOT_FOUND
);
export const EmptyAllergyListError = new CustomError(
  'allergy list is empty',
  StatusCodes.NOT_FOUND
);
