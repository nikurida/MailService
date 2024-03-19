import Bull from 'bull';
import { redisConfig } from './redisConfig';

const queue = new Bull('emailQueue', { redis: redisConfig });

export default queue;
