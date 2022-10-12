import { NextFunction, Request, Response } from 'express';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import { EmailIsRequiredError, InvalidAccessTokenError } from '../errors/errors';
import * as UserService from '../services/userService';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  UserService.createUser({ name, email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getUserByEmail = (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  const { email } = req.body;
  if (!email) {
    throw EmailIsRequiredError;
  }
  UserService.getUserByEmail(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateUser = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const { name, password, oldPassword } = req.body;
  const id = req.id;
  const email = req.email;
  if (!id || !email) {
    return next(InvalidAccessTokenError);
  }
  UserService.updateUser({ name, password, id, email }, oldPassword)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deleteUser = (
  req: IRequestWithTokenData,
  res: Response,
  next: NextFunction
) => {
  const id = req.id;
  if (!id) {
    return next(InvalidAccessTokenError);
  }
  UserService.deleteUser(id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
