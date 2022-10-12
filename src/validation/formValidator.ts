import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import CustomError from '../misc/CustomError';

/**
 * inputs: is input object which is to be validated
 * schema: is yup object schema with constraints for validation defined
 * throws error
 */
const formValidator = (
  inputs: any,
  schema: yup.ObjectSchema<any>
): string[] => {
  try {
    schema.validateSync(inputs, {
      abortEarly: false,
    });
    return [];
  } catch (err: any) {
    let allCombinedError = '';
    for (let i = 0; i < err.inner.length; i++) {
      allCombinedError += err.inner[i].message;
      if (i < err.inner.length - 1) allCombinedError += ', ';
      else allCombinedError += '.';
    }
    throw new CustomError(allCombinedError, StatusCodes.BAD_REQUEST);
  }
};

export const keyValueValidator = async (
  key: string,
  value: any,
  schema: yup.ObjectSchema<any>
) => {
  try {
    schema.validateSyncAt(key, { [key]: value });
  } catch (e: string | any) {
    throw new CustomError(e, StatusCodes.BAD_REQUEST);
  }
};

export default formValidator;
