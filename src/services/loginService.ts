import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { EXPIRY_TIME, EXPIRY_TIME_REFRESH_TOKEN } from '../constants/common';
import { IDataAtToken } from '../domains/IDataAtToken';
import IRefreshToken from '../domains/IRefreshToken';
import { ITokens } from '../domains/ITokens';
import { InvalidCredentialsError, InvalidRefreshToken } from '../errors/errors';
import logger from '../misc/Logger';
import RefreshTokenModel from '../models/refreshTokenModel';
import { default as User, default as UserModel } from '../models/userModel';
dotenv.config();
/**
 *
 * @param email valid email as string
 * @param password valid password as string
 * @returns compares password hash and given password, if correct, returns access token and refresh token
 */
export const login = async (
  email: string,
  password: string
): Promise<ITokens<User>> => {
  logger.info('logging in');
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    throw InvalidCredentialsError;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw InvalidCredentialsError;
  }

  //valid user
  const tokenDataToBeEncrypted = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const accessToken = jwt.sign(
    tokenDataToBeEncrypted,
    process.env.JWT_SECRET as string,
    {
      expiresIn: EXPIRY_TIME,
    }
  );

  const expiryDateForRefreshToken = Date.now() + EXPIRY_TIME_REFRESH_TOKEN;

  const refreshToken = jwt.sign(
    { ...tokenDataToBeEncrypted, expiryDateForRefreshToken },
    process.env.JWT_TOKEN_SECRET as string
  );

  //adding new refresh token to database
  await RefreshTokenModel.createRefreshToken({
    refreshToken,
    id: user.id,
    expiresAt: expiryDateForRefreshToken,
  });

  logger.info('logged in successfully');
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    message: 'login successfully',
  };
};

/**
 *
 * @param refreshToken valid refreshtoken for getting new accesstoken after access toekn is expired
 * @returns new access token with new expiry time
 */

export const getAccessToken = async (
  refreshToken: string
): Promise<ITokens<IDataAtToken>> => {
  logger.info('getting new access token');
  const refreshTokenFromDb = (await RefreshTokenModel.getRefreshTokenByToken(
    refreshToken
  )) as IRefreshToken;

  if (!refreshTokenFromDb || +refreshTokenFromDb.expiresAt < Date.now()) {
    await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
    throw InvalidRefreshToken;
  }

  try {
    const dataAtToken = (await jwt.verify(
      refreshToken,
      process.env.JWT_TOKEN_SECRET as string
    )) as IDataAtToken;
    const { id, name, email } = dataAtToken;
    const newAccessToken = jwt.sign(
      { id, name, email },
      process.env.JWT_SECRET as string,
      { expiresIn: EXPIRY_TIME }
    );

    logger.info('got new access token sucessfully');
    return {
      data: dataAtToken,
      accessToken: newAccessToken,
      message: 'got new accessToken successfully',
    };
  } catch {
    throw InvalidRefreshToken;
  }
};

/**
 *
 * @param refreshToken current refresh token as string
 * @returns deletes refresh token from database and return deleted token
 */
export const logout = async (
  refreshToken: string
): Promise<ITokens<IRefreshToken>> => {
  logger.info('logging out');
  await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
  logger.info('logged out successfully');

  return {
    message: 'deleted above refresh token successfully',
  };
};
