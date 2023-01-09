import 'reflect-metadata';
import createApolloServer from '../../server/util/apollo';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../server/util/cors';
import { connectMongo } from '../../server/util/mongo';
import runMiddleware from '../../server/middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  await connectMongo();

  const server = await createApolloServer();
  await server.start();
  await server.createHandler({ path: '/api/graphql' })(req, res);
}
