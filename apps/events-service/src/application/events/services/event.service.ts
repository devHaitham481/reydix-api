import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventResponseDto } from '../dto/event-reponse.dto';
import { Event } from 'src/domain/entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async findOneWithArtists(id: string): Promise<EventResponseDto> {
    const event = await this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventArtists', 'eventArtist')
      .leftJoinAndSelect('eventArtist.artist', 'artist')
      .where('event.id = :id', { id })
      .getOne();

    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    const eventResponse: EventResponseDto = {
      id: event.id,
      name: event.name,
      date: event.date,
      venue: event.venue,
      artists: event.eventArtists.map((ea) => ({
        id: ea.artist.id,
        name: ea.artist.name,
      })),
    };

    return eventResponse;
  }
}
