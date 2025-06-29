import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/event.service';
import { Artist } from 'src/domain/entities/artist.entity';
import { EventArtist } from 'src/domain/entities/event-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Artist, EventArtist])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService, TypeOrmModule],
})
export class EventsModule {}
