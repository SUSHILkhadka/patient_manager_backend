export interface ITokens<T> {
  data?: T | T[];
  accessToken?: string;
  refreshToken?: string;
  message: string;
}
export type ITokensAfterLogout = Omit<ITokens<any>, 'accessToken'>;
