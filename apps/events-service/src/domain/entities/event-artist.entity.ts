import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm'; // Import PrimaryColumn
import { Event } from './event.entity';
import { Artist } from './artist.entity';

@Entity('event_artists')
export class EventArtist {
  @PrimaryColumn({ type: 'uuid' })
  eventId: string;

  @PrimaryColumn({ type: 'uuid' })
  artistId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Event, (event) => event.eventArtists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => Artist, (artist) => artist.eventArtists, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}
