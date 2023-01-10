import { ApolloError, ForbiddenError } from 'apollo-server-errors';
import bcrypt from 'bcryptjs';
import { signJwt, verifyJwt } from '../util/jwt';
import { UserModel } from '../model';
import { LoginInput } from '../schema/login.schema';
import { User } from '../model/user.model';
import {
  accessTokenCookieOptions,
  accessTokenExpiresIn,
  refreshTokenCookieOptions,
  refreshTokenExpiresIn,
} from '../util/config';
import redisClient from '../util/redis';
import { setCookie } from 'cookies-next';
import { Context } from '../context';

export default class LoginService {
  signTokens(user: User) {
    const userId = user._id.toString();
    const access_token = signJwt({ userId }, 'accessTokenPrivateKey', {
      expiresIn: `${accessTokenExpiresIn}m`,
    });

    const refresh_token = signJwt({ userId }, 'refreshTokenPrivateKey', {
      expiresIn: `${refreshTokenExpiresIn}m`,
    });

    redisClient.set(userId, JSON.stringify(user), {
      EX: refreshTokenExpiresIn * 60,
    });

    return { access_token, refresh_token };
  }

  async login(input: LoginInput, { req, res }: Context) {
    console.log(`Logging into ${input.username}...`);

    const user = await UserModel.find().findByUsername(input.username).lean();
    if (!user) {
      throw new ApolloError('Username not found!');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new ApolloError('Incorrect password!');
    }

    const { access_token, refresh_token } = this.signTokens(user);
    setCookie('access_token', access_token, {
      req,
      res,
      ...accessTokenCookieOptions,
    });
    setCookie('refresh_token', refresh_token, {
      req,
      res,
      ...refreshTokenCookieOptions,
    });
    setCookie('logged_in', 'true', {
      req,
      res,
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    console.log('Login successful!');
    return user;
  }

  async refreshAccessToken({ req, res }: Context) {
    const { refresh_token } = req.cookies;
    if (!refresh_token)
      throw new ForbiddenError('Could not refresh access token');

    const decoded = verifyJwt<{ userId: string }>(
      refresh_token,
      'refreshTokenPublicKey',
    );
    if (!decoded) throw new ForbiddenError('Could not refresh access token');

    const session = await redisClient.get(decoded.userId);
    if (!session) throw new ForbiddenError('User session has expired');

    const userId = JSON.parse(session)._id;
    const user = await UserModel.findById(userId).lean();
    if (!user) {
      throw new ForbiddenError('Could not refresh access token');
    }

    const access_token = signJwt(
      { userId: user._id },
      'accessTokenPrivateKey',
      { expiresIn: `${accessTokenExpiresIn}m` },
    );

    setCookie('access_token', access_token, {
      req,
      res,
      ...accessTokenCookieOptions,
    });
    setCookie('logged_in', 'true', {
      req,
      res,
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return access_token;
  }

  async logout({ req, res, user }: Context) {
    if (!user) return false;

    const userId = user._id;
    await redisClient.del(String(userId));

    setCookie('access_token', '', { req, res, maxAge: -1 });
    setCookie('refresh_token', '', { req, res, maxAge: -1 });
    setCookie('logged_in', '', { req, res, maxAge: -1 });

    return true;
  }
}
