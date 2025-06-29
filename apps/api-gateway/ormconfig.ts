import path from 'path';
import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envConfig = dotenv.config({
  path: path.resolve(
    __dirname,
    `.env.` + (process.env.NODE_ENV || 'development'),
  ),
});

function env(key: string): string | undefined {
  return envConfig.parsed?.[key] || process.env[key];
}

const baseConfig = {
  type: env('DB_DIALECT'),
  database: env('DB_DATABASE'),
  entities: [path.resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/**/*.ts')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: path.resolve('src/database/migrations'),
  },
};

const config =
  process.env.NODE_ENV !== 'test'
    ? {
        host: env('DB_HOST'),
        port: env('DB_PORT'),
        username: env('DB_USERNAME'),
        password: env('DB_PASSWORD'),
        synchronize: false,
        ...baseConfig,
      }
    : {
        dropSchema: true,
        synchronize: true,
        ...baseConfig,
      };

module.exports = config;
