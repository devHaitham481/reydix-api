import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Fan } from './fan.entity';

@Entity('fan_event_connections')
@Unique(['fanId', 'eventId'])
export class FanEventConnection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  fanId: string;

  @Column({ type: 'uuid' })
  eventId: string;

  @Column({
    type: 'varchar',
    length: 20,
    enum: ['interested', 'attending', 'attended'],
  })
  connectionType: 'interested' | 'attending' | 'attended';

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Fan, (fan) => fan.eventConnections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fan_id' })
  fan: Fan;
}
