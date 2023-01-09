import jwt, { SignOptions } from 'jsonwebtoken';
import { PRIVATE_KEY, PUBLIC_KEY } from './config';

export const signJwt = (
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: SignOptions,
) => {
  const privateKey = Buffer.from(PRIVATE_KEY(keyName), 'base64').toString(
    'ascii',
  );

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export function verifyJwt<T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
): T | null {
  const publicKey = Buffer.from(PUBLIC_KEY(keyName), 'base64').toString(
    'ascii',
  );

  try {
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as T;
  } catch (error) {
    return null;
  }
}
