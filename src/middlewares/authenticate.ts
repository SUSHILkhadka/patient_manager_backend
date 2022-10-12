import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IDataAtToken } from '../domains/IDataAtToken';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { InvalidAccessTokenError } from '../errors/errors';

/**
 *
 * @param req user Request with access token in header
 * @param res Response
 * @param next NextFunction
 * @returns next function if access token is valid and adds token data to request.
 */
const authenticate = async (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next(InvalidAccessTokenError);
  }
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const dataAtToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as IDataAtToken;
    req.id = dataAtToken.id;
    req.email = dataAtToken.email;
    return next();
  } catch {
    return next(InvalidAccessTokenError);
  }
};
export default authenticate;
