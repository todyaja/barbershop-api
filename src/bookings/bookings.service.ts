import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,
  ) {}

  findAll(filters?: {
    customerId?: string;
    barberId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const qb = this.repo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.barber', 'barber')
      .leftJoinAndSelect('booking.service', 'service')
      .leftJoinAndSelect('booking.branch', 'branch')
      .orderBy('booking.date', 'DESC')
      .addOrderBy('booking.time', 'ASC');

    if (filters?.customerId)
      qb.andWhere('booking.customer_id = :customerId', {
        customerId: filters.customerId,
      });
    if (filters?.barberId)
      qb.andWhere('booking.barber_id = :barberId', {
        barberId: filters.barberId,
      });
    if (filters?.status)
      qb.andWhere('booking.status = :status', { status: filters.status });
    if (filters?.dateFrom)
      qb.andWhere('booking.date >= :dateFrom', { dateFrom: filters.dateFrom });
    if (filters?.dateTo)
      qb.andWhere('booking.date <= :dateTo', { dateTo: filters.dateTo });

    return qb.getMany();
  }

  findOne(id: string) {
    return this.repo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.barber', 'barber')
      .leftJoinAndSelect('booking.service', 'service')
      .leftJoinAndSelect('booking.branch', 'branch')
      .where('booking.id = :id', { id })
      .getOneOrFail();
  }

  findTodays() {
    const today = new Date().toISOString().split('T')[0];
    return this.repo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.barber', 'barber')
      .leftJoinAndSelect('booking.service', 'service')
      .leftJoinAndSelect('booking.branch', 'branch')
      .where('booking.date = :today', { today })
      .orderBy('booking.time', 'ASC')
      .getMany();
  }

  findByDate(date: string) {
    return this.repo
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.barber', 'barber')
      .leftJoinAndSelect('booking.service', 'service')
      .leftJoinAndSelect('booking.branch', 'branch')
      .where('booking.date = :date', { date })
      .orderBy('booking.time', 'ASC')
      .getMany();
  }

  create(data: Partial<Booking>) {
    const booking = this.repo.create(data);
    return this.repo.save(booking);
  }

  async update(id: string, data: Partial<Booking>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async updateStatus(id: string, status: string) {
    await this.repo.update(id, { status });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }

  async getStats() {
    const today = new Date().toISOString().split('T')[0];

    const totalBookings = await this.repo.count();
    const pendingBookings = await this.repo.count({
      where: { status: 'pending' },
    });
    const completedBookings = await this.repo.count({
      where: { status: 'completed' },
    });
    const todaysBookings = await this.repo
      .createQueryBuilder('b')
      .where('b.date = :today', { today })
      .getCount();

    const revenueResult = await this.repo
      .createQueryBuilder('b')
      .select('SUM(b.total_price)', 'revenue')
      .where('b.status = :status', { status: 'completed' })
      .getRawOne();

    return {
      totalBookings,
      totalRevenue: parseFloat(revenueResult?.revenue || '0'),
      pendingBookings,
      completedBookings,
      todaysBookings,
    };
  }
}
