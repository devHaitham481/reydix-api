import { DataSource } from 'typeorm';
import { Event } from './domain/entities/event.entity';
import { Artist } from './domain/entities/artist.entity';
import { EventArtist } from './domain/entities/event-artist.entity';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') }); // Load root .env or service-specific

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).hostname
    : 'localhost', // Or events-db in Docker
  port: process.env.DATABASE_URL
    ? parseInt(new URL(process.env.DATABASE_URL).port, 10)
    : 5432,
  username: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).username
    : 'events_user',
  password: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).password
    : 'events_pass',
  database: process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).pathname.substring(1)
    : 'events_db',
  synchronize: false, // TypeORM CLI uses migrations, not sync
  logging: true,
  entities: [Event, Artist, EventArtist],
  migrations: [`${__dirname}/infrastructure/database/migrations/**/*{.ts,.js}`],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Events Data Source initialized!');
  })
  .catch((err) => {
    console.error('Error during Events Data Source initialization', err);
  });
