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
@Unique(['fanId', 'eventId']) // Ensures unique combination of fan and event
export class FanEventConnection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  fanId: string; // Foreign key to Fan

  @Column({ type: 'uuid' }) // External reference to Events Service's Event ID
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
