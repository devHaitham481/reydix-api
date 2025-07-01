import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { FanEventConnection } from './fan-event-connection.entity';
import { FanArtist } from './fan-artist.entity';

@Entity('fans')
export class Fan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FanEventConnection, (connection) => connection.fan)
  eventConnections: FanEventConnection[];

  @OneToMany(() => FanArtist, (fanArtist) => fanArtist.fan)
  fanArtists: FanArtist[];
}
