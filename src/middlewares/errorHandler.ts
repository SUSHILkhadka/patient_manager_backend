import { NextFunction, Request, Response } from 'express';
import logger from '../misc/Logger';
import CustomError from '../misc/CustomError';

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  res.status(err.statusCode || 500);
  res.json({
    message: err.message,
  });
};

export default errorHandler;
