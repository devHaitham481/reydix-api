import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EventArtist } from './event-artist.entity';
// import { Artist } from './artist.entity'; // Artist is not directly part of Event entity, only via EventArtist

@Entity('events') // Good practice to explicitly name the table
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  venue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EventArtist, (eventArtist) => eventArtist.event)
  eventArtists: EventArtist[];
}
