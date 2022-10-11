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

export const InvalidRefreshToken = new CustomError(
  'Invalid refresh token',
  StatusCodes.UNAUTHORIZED
);

export const InvalidAccessToken = new CustomError(
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
