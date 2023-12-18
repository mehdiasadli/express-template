import { connect, set } from 'mongoose';
import env from './env.config';

export default async () => {
  const url = env.DATABASE_URL;

  if (env.NODE_ENV !== 'production') {
    set('debug', true);
  }

  await connect(url);
};
