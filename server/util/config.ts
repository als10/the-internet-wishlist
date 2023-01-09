import { OptionsType } from 'cookies-next/lib/types';

export const isInProduction = process.env.NODE_ENV === 'production';

// function chooseValueByNodeEnv<T>(development: T, production: T): T {
//   return isInProduction ? production : development;
// }

// const dbUsername = process.env.DB_USERNAME;
// const dbPassword = process.env.DB_PASSWORD;
// const dbName = chooseValueByNodeEnv(
//   process.env.DB_NAME_DEVELOPMENT,
//   process.env.DB_NAME_PRODUCTION,
// );

// export const DB_URI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.5gxwiyz.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const DB_URI = process.env.MONGODB_LOCAL_URI as string;

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;

const REFRESH_TOKEN_PRIVATE_KEY = process.env
  .REFRESH_TOKEN_PRIVATE_KEY as string;
const REFRESH_TOKEN_PUBLIC_KEY = process.env.REFRESH_TOKEN_PUBLIC_KEY as string;

export const PUBLIC_KEY = (
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
) => {
  switch (keyName) {
    case 'accessTokenPublicKey':
      return ACCESS_TOKEN_PUBLIC_KEY;
    case 'refreshTokenPublicKey':
      return REFRESH_TOKEN_PUBLIC_KEY;
  }
};

export const PRIVATE_KEY = (
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
) => {
  switch (keyName) {
    case 'accessTokenPrivateKey':
      return ACCESS_TOKEN_PRIVATE_KEY;
    case 'refreshTokenPrivateKey':
      return REFRESH_TOKEN_PRIVATE_KEY;
  }
};

export const PORT = Number(process.env.PORT);

// Cookie options
export const accessTokenExpiresIn = 15;
export const refreshTokenExpiresIn = 60;

const cookieOptions: OptionsType = {
  httpOnly: true,
  sameSite: 'lax',
  secure: isInProduction,
};

export const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: accessTokenExpiresIn * 60,
  expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000),
};

export const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: refreshTokenExpiresIn * 60,
  expires: new Date(Date.now() + refreshTokenExpiresIn * 60 * 1000),
};
