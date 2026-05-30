import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barber } from '../entities/barber.entity';

@Injectable()
export class BarbersService {
  constructor(
    @InjectRepository(Barber)
    private repo: Repository<Barber>,
  ) {}

  findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  findActive() {
    return this.repo.find({ where: { is_active: true }, order: { name: 'ASC' } });
  }

  findOne(id: string) {
    return this.repo.findOneOrFail({ where: { id } });
  }

  findByUserId(userId: string) {
    return this.repo.findOneOrFail({ where: { user_id: userId } });
  }

  create(data: Partial<Barber>) {
    const barber = this.repo.create(data);
    return this.repo.save(barber);
  }

  async update(id: string, data: Partial<Barber>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
