import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ default: 'customer' })
  role: string;

  @Column({ nullable: true })
  otp_code: string;

  @Column({ type: 'timestamptz', nullable: true })
  otp_expires_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
