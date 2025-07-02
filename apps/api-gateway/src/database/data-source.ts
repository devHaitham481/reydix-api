import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from '@/auth/user.entity';

export function getDataSourceOptions(
  configService: ConfigService,
): DataSourceOptions & SeederOptions {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: configService.get<number>('DB_PORT') || 5434,
    username: configService.get<string>('DB_USER') || 'reydix_user',
    password: configService.get<string>('DB_PASSWORD') || 'Admin123',
    database: configService.get<string>('DB_NAME') || 'reydix_db',
    entities: [User],
    seeds: ['dist/src/database/seeds/**/*{.ts,.js}'],
    factories: ['dist/database/factories/**/*{.ts,.js}'],
    synchronize: true,
  };
}

const configService = new ConfigService();
const dataSourceOptions = getDataSourceOptions(configService);

export const AppDataSource = new DataSource(dataSourceOptions);
