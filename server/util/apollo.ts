import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-micro';
import resolvers from '../resolver';
import context from '../context';
import authChecker from '../middleware/authChecker';

export default async function createApolloServer(): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    dateScalarMode: 'timestamp',
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    context,
  });

  return server;
}
