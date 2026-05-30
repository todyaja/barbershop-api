import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSlot } from '../entities/time-slot.entity';

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(TimeSlot)
    private repo: Repository<TimeSlot>,
  ) {}

  findAvailable(barberId: string, date: string) {
    return this.repo.find({
      where: { barber_id: barberId, date, is_available: true },
      order: { time: 'ASC' },
    });
  }

  findByBarber(barberId: string, startDate: string, endDate: string) {
    return this.repo.createQueryBuilder('ts')
      .where('ts.barber_id = :barberId', { barberId })
      .andWhere('ts.date >= :startDate', { startDate })
      .andWhere('ts.date <= :endDate', { endDate })
      .orderBy('ts.date', 'ASC')
      .addOrderBy('ts.time', 'ASC')
      .getMany();
  }

  create(data: Partial<TimeSlot>) {
    const slot = this.repo.create(data);
    return this.repo.save(slot);
  }

  async update(id: string, data: Partial<TimeSlot>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async book(id: string, bookingId: string) {
    await this.repo.update(id, { is_available: false, booking_id: bookingId });
    return this.repo.findOneOrFail({ where: { id } });
  }

  async release(barberId: string, date: string, time: string) {
    const slot = await this.repo.findOneOrFail({ where: { barber_id: barberId, date, time } });
    slot.is_available = true;
    slot.booking_id = null as any;
    return this.repo.save(slot);
  }
}
