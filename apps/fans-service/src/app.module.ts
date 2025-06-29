import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fan } from './domain/entities/fan.entity';
import { FanEventConnection } from './domain/entities/fan-event-connection.entity';
import { ConfigModule } from '@nestjs/config'; // <-- Make sure this is imported

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'], // Prioritize .env.development
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL.split('@')[1].split(':')[0], // Extract host from DATABASE_URL
      port: parseInt(process.env.DATABASE_URL.split(':')[3].split('/')[0], 10), // Extract port
      username: process.env.DATABASE_URL.split('://')[1].split(':')[0], // Extract username
      password: process.env.DATABASE_URL.split(':')[2].split('@')[0], // Extract password
      database: process.env.DATABASE_URL.split('/')[3], // Extract database name
      entities: [Fan, FanEventConnection],
      synchronize: true, //TODO: set to false in production
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
