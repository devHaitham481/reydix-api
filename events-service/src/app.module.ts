import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventArtist } from './domain/entities/event-artist.entity';
import { Artist } from './domain/entities/artist.entity';
import { Event } from './domain/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'events-db',
      port: 5432,
      username: 'events_user',
      password: 'Admin123',
      database: 'events_db',
      entities: [Event, Artist, EventArtist],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
