import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Artist } from './artist.entity';

@Entity('event_artists')
export class EventArtist {
  @PrimaryColumn({ type: 'uuid' })
  eventId: string;

  @PrimaryColumn({ type: 'uuid' })
  artistId: string;

  @ManyToOne(() => Event, (event) => event.eventArtists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Artist, (artist) => artist.eventArtists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @CreateDateColumn()
  createdAt: Date;
}
