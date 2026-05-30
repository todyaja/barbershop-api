import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private repo: Repository<Schedule>,
  ) {}

  findByBarber(barberId: string) {
    return this.repo.find({ where: { barber_id: barberId }, order: { day_of_week: 'ASC' } });
  }

  findByBarberAndDay(barberId: string, dayOfWeek: number) {
    return this.repo.findOneOrFail({ where: { barber_id: barberId, day_of_week: dayOfWeek } });
  }

  create(data: Partial<Schedule>) {
    const schedule = this.repo.create(data);
    return this.repo.save(schedule);
  }

  async update(id: string, data: Partial<Schedule>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
