import Bull from 'bull';

const redisConfig = {
    host: 'localhost',
    port: 6379
};

const emailQueue = new Bull('emailQueue', { redis: redisConfig });

export default emailQueue;
