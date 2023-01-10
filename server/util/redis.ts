import { createClient } from 'redis';
import { REDIS_URL } from './config';

const redisClient = createClient({
  url: REDIS_URL,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (_) {
    console.log(
      'An error occurred while connecting to Redis. Will try again in 5 seconds.',
    );
    setInterval(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on('connect', () => {
  console.log('? Redis connected successfully!');
});

redisClient.on('error', (err) => console.error(err));

export default redisClient;
