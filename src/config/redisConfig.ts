interface redisConfig {
    host: string;
    port: number;
}

export const redisConfig: redisConfig = {
    host: process.env.REDIS_HOST!,
    port: +process.env.REDIS_PORT!
};