import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Fan } from '../../domain/entities/fan.entity';
import { FanEventConnection } from '../../domain/entities/fan-event-connection.entity';
import { FanArtist } from '../../domain/entities/fan-artist.entity';

export function getDataSourceOptions(
  configService: ConfigService,
): DataSourceOptions & SeederOptions {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: configService.get<number>('DB_PORT') || 5433,
    username: configService.get<string>('DB_USER') || 'fans_user',
    password: configService.get<string>('DB_PASSWORD') || 'Admin123',
    database: configService.get<string>('DB_NAME') || 'fans_db',
    entities: [Fan, FanEventConnection, FanArtist],
    seeds: ['dist/src/infrastructure/database/seeders/**/*{.ts,.js}'],
    factories: ['dist/src/infrastructure/database/factories/**/*{.ts,.js}'],
    synchronize: true,
  };
}

const configService = new ConfigService();
const dataSourceOptions = getDataSourceOptions(configService);

export const AppDataSource = new DataSource(dataSourceOptions);
