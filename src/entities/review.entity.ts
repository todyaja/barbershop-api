import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { User } from './user.entity';
import { Barber } from './barber.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  booking_id: string;

  @ManyToOne(() => Booking, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ nullable: true })
  customer_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column({ nullable: true })
  barber_id: string;

  @ManyToOne(() => Barber, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
