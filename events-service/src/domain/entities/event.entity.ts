import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EventArtist } from './event-artist.entity'; // Will create this join entity

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ length: 255 })
  venue: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Many-to-many relationship with Artist through EventArtist join table
  @OneToMany(() => EventArtist, (eventArtist) => eventArtist.event)
  eventArtists: EventArtist[];
}
