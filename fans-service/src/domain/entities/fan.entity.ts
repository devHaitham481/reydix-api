import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { FanEventConnection } from './fan-event-connection.entity'; // Will create this

@Entity('fans')
export class Fan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ unique: true, length: 255 })
  email: string;

  // Storing preferences directly as array columns, matching DB schema
  @Column('simple-array', { default: [] })
  favoriteGenres: string[];

  @Column('simple-array', { default: [] })
  favoriteArtistIds: string[]; // Stores UUIDs as strings

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FanEventConnection, (connection) => connection.fan)
  eventConnections: FanEventConnection[];
}
