import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventArtist } from './domain/entities/event-artist.entity';
import { Artist } from './domain/entities/artist.entity';
import { Event } from './domain/entities/event.entity';
import { EventsModule } from './application/events/events.module';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { ConfigModule } from '@nestjs/config'; // <-- Make sure this is imported

dotenv.config({ path: resolve(__dirname, '../.env') });

console.log('REACHED', process.env);
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
      entities: [Event, Artist, EventArtist],
      synchronize: true,
      autoLoadEntities: true,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
