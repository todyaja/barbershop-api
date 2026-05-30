import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Barber } from './barber.entity';
import { Booking } from './booking.entity';

@Entity('time_slots')
@Unique(['barber_id', 'date', 'time'])
export class TimeSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barber_id: string;

  @ManyToOne(() => Barber, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ type: 'date' })
  date: string;

  @Column()
  time: string;

  @Column({ default: true })
  is_available: boolean;

  @Column({ nullable: true })
  booking_id: string;

  @ManyToOne(() => Booking, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
