import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Fan } from './domain/entities/fan.entity';
import { FanEventConnection } from './domain/entities/fan-event-connection.entity';

dotenv.config({ path: resolve(__dirname, '../../.env') }); // Load root .env or service-specific

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).hostname
    : 'localhost', // Or fans-db in Docker
  port: process.env.DATABASE_URL
    ? parseInt(new URL(process.env.DATABASE_URL).port, 10)
    : 5432,
  username: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).username
    : 'fans_user',
  password: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).password
    : 'fans_pass',
  database: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).pathname.substring(1)
    : 'fans_db',
  synchronize: false, // TypeORM CLI uses migrations, not sync
  logging: true,
  entities: [Fan, FanEventConnection],
  migrations: [`${__dirname}/infrastructure/database/migrations/**/*{.ts,.js}`],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Fans Data Source initialized!');
  })
  .catch((err) => {
    console.error('Error during Fans Data Source initialization', err);
  });
