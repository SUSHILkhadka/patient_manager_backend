import { NextFunction, Request, Response } from 'express';
import { AnyObjectSchema } from 'yup';
import formValidator from '../validation/formValidator';

export const validate =
  (schema: AnyObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    formValidator(req.body, schema);
    next();
  };
