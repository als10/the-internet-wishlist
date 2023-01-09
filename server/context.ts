import { NextApiRequest, NextApiResponse } from 'next';
import deserializeUser from './middleware/deserializeUser';
import { User } from './model/user.model';

export type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
  user?: User;
};

async function context({ req, res }: Context) {
  return deserializeUser(req, res)
    .then((user) => ({ req, res, user }))
    .catch(() => ({ req, res }));
}

export default context;
