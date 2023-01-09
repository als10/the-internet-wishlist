import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasCookie, getCookie } from 'cookies-next';
import { verifyJwt } from '../util/jwt';
import redisClient from '../util/redis';
import { UserModel } from '../model';
import { User } from '../model/user.model';

export default async function deserializeUser(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<User> {
  console.log('deserializeUser called');

  let access_token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer ')
  ) {
    access_token = req.headers.authorization.split(' ')[1];
  } else if (hasCookie('access_token', { req, res })) {
    access_token = getCookie('access_token', { req, res });
  }
  if (!access_token) throw new AuthenticationError('No access token found');

  const decoded = verifyJwt<{ userId: string }>(
    String(access_token),
    'accessTokenPublicKey',
  );
  if (!decoded) throw new AuthenticationError('Invalid access token');

  const session = await redisClient.get(decoded.userId);
  if (!session) throw new ForbiddenError('Session has expired');

  const userId = JSON.parse(session)._id;
  console.log(`User ID: ${userId}`);

  const user = await UserModel.findById(userId).lean();
  if (!user) {
    throw new ForbiddenError(
      'The user belonging to this token no logger exist',
    );
  }
  return user;
}
