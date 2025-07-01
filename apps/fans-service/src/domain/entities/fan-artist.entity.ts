import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Fan } from './fan.entity';

@Entity('fan_artists')
export class FanArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  fanId: string;

  @Column({ type: 'uuid' })
  artistId: string;

  @CreateDateColumn()
  followedAt: Date;

  @ManyToOne(() => Fan, (fan) => fan.fanArtists)
  @JoinColumn({ name: 'fanId' })
  fan: Fan;
}

