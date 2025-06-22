import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EventArtist } from './event-artist.entity'; // Will create this join entity

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column('simple-array') // Stores array as string, or use custom array type
  genres: string[];

  @Column({ type: 'text', nullable: true })
  biography?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Many-to-many relationship with Event through EventArtist join table
  @OneToMany(() => EventArtist, (eventArtist) => eventArtist.artist)
  eventArtists: EventArtist[];
}
