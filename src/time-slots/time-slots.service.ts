import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeSlot } from '../entities/time-slot.entity';
import { Booking } from '../entities/booking.entity';
import { Barber } from '../entities/barber.entity';

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(TimeSlot)
    private repo: Repository<TimeSlot>,
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Barber)
    private barberRepo: Repository<Barber>,
  ) {}

  findAvailable(barberId: string, date: string) {
    return this.repo.find({
      where: { barber_id: barberId, date, is_available: true },
      order: { time: 'ASC' },
    });
  }

  findByBarber(barberId: string, startDate: string, endDate: string) {
    return this.repo
      .createQueryBuilder('ts')
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
    const slot = await this.repo.findOneOrFail({
      where: { barber_id: barberId, date, time },
    });
    slot.is_available = true;
    slot.booking_id = null as any;
    return this.repo.save(slot);
  }

  async getAvailability(date: string) {
    const barbers = await this.barberRepo.find({ where: { is_active: true } });
    const totalBarbers = barbers.length;

    if (totalBarbers === 0) {
      return this.generateTimeSlots(date, 0);
    }

    const bookings = await this.bookingRepo
      .createQueryBuilder('b')
      .where('b.date = :date', { date })
      .andWhere('b.status IN (:...statuses)', {
        statuses: ['pending', 'confirmed'],
      })
      .getMany();

    const bookedByTime = new Map<string, Set<string>>();
    for (const booking of bookings) {
      if (!booking.barber_id) continue;
      if (!bookedByTime.has(booking.time)) {
        bookedByTime.set(booking.time, new Set());
      }
      bookedByTime.get(booking.time)!.add(booking.barber_id);
    }

    const slots: {
      time: string;
      available: boolean;
      availableBarbers: number;
    }[] = [];
    for (let h = 9; h <= 20; h++) {
      for (const m of ['00', '30']) {
        const time = `${h.toString().padStart(2, '0')}:${m}`;
        const bookedBarbers = bookedByTime.get(time)?.size || 0;
        const availableBarbers = totalBarbers - bookedBarbers;
        slots.push({
          time,
          available: availableBarbers > 0,
          availableBarbers,
        });
      }
    }

    return slots;
  }

  private generateTimeSlots(date: string, availableBarbers: number) {
    const slots: {
      time: string;
      available: boolean;
      availableBarbers: number;
    }[] = [];
    for (let h = 9; h <= 20; h++) {
      for (const m of ['00', '30']) {
        const time = `${h.toString().padStart(2, '0')}:${m}`;
        slots.push({ time, available: availableBarbers > 0, availableBarbers });
      }
    }
    return slots;
  }
}
