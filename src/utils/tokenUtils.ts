import jwt from 'jsonwebtoken';
import { EXPIRY_TIME } from '../constants/common';
import { IDataAtToken } from '../domains/IDataAtToken';

export const getAccessToken = (tokenDataToBeEncrypted: IDataAtToken) => {
  const accessToken = jwt.sign(tokenDataToBeEncrypted, process.env.JWT_SECRET as string, {
    expiresIn: EXPIRY_TIME,
  });
  return accessToken;
};

export const getRefreshToken = (tokenDataToBeEncrypted: IDataAtToken) => {
  const refreshToken = jwt.sign(tokenDataToBeEncrypted, process.env.JWT_TOKEN_SECRET as string);
  return refreshToken;
};

export const decryptedTokenDataFromAccessToken = (accessToken: string) => {
  const { id, name, email, expiryDateForRefreshToken } = jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string
  ) as IDataAtToken;
  return {
    id,
    name,
    email,
    expiryDateForRefreshToken,
  };
};

export const decryptTokenDataFromRefreshToken = (refreshToken: string): IDataAtToken => {
  const { id, name, email, expiryDateForRefreshToken } = jwt.verify(
    refreshToken,
    process.env.JWT_TOKEN_SECRET as string
  ) as IDataAtToken;
  return {
    id,
    name,
    email,
    expiryDateForRefreshToken,
  };
};
