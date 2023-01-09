import Cors from 'cors';
import { MiddlewareFunction } from '../middleware';

export default Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  origin: [
    'https://studio.apollographql.com',
    'http://localhost:8000',
    'http://localhost:3000',
  ],
}) as MiddlewareFunction;
