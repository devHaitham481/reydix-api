import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Event } from '../../domain/entities/event.entity';
import { EventArtist } from '../../domain/entities/event-artist.entity';
import { Artist } from '../../domain/entities/artist.entity';

export function getDataSourceOptions(
  configService: ConfigService,
): DataSourceOptions & SeederOptions {
  const databaseUrl = configService.get<string>('DATABASE_URL');

  if (databaseUrl) {
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [Event, EventArtist, Artist],
      seeds: ['dist/infrastructure/database/seeders/**/*{.ts,.js}'],
      factories: ['dist/infrastructure/database/factories/**/*{.ts,.js}'],
      synchronize: true,
    };
  }

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: configService.get<number>('DB_PORT') || 5432,
    username: configService.get<string>('DB_USER') || 'events_user',
    password: configService.get<string>('DB_PASSWORD') || 'Admin123',
    database: configService.get<string>('DB_NAME') || 'events_db',
    entities: [Event, EventArtist, Artist],
    seeds: ['dist/infrastructure/database/seeders/**/*{.ts,.js}'],
    factories: ['dist/infrastructure/database/factories/**/*{.ts,.js}'],
    synchronize: true,
  };
}

const configService = new ConfigService();
const dataSourceOptions = getDataSourceOptions(configService);

export const AppDataSource = new DataSource(dataSourceOptions);
