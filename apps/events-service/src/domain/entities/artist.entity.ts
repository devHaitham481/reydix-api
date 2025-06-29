import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EventArtist } from './event-artist.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('simple-array', { nullable: false }) // Changed to nullable: false to match PRD
  genres: string[];

  @Column({ type: 'text', nullable: true })
  biography: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EventArtist, (eventArtist) => eventArtist.artist)
  eventArtists: EventArtist[];
}
