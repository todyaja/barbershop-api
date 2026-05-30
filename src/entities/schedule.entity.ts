import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Barber } from './barber.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barber_id: string;

  @ManyToOne(() => Barber, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column()
  day_of_week: number;

  @Column()
  open_time: string;

  @Column()
  close_time: string;

  @Column({ default: false })
  is_closed: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
