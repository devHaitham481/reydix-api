import { DataSource } from 'typeorm';
import { User } from './auth/user.entity';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') }); // Load root .env or service-specific

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', // Or fans-db in Docker
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'fans_user',
  password: process.env.DB_PASSWORD || 'fans_pass',
  database: process.env.DB_NAME || 'fans_db',
  synchronize: false, // TypeORM CLI uses migrations, not sync
  logging: true,
  entities: [User],
  migrations: [`${__dirname}/infrastructure/database/migrations/**/*{.ts,.js}`],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('API Gateway Data Source initialized!');
  })
  .catch((err) => {
    console.error('Error during API Gateway Data Source initialization', err);
  });
