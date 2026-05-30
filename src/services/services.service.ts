import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private repo: Repository<Service>,
  ) {}

  findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  findActive() {
    return this.repo.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.repo.findOneOrFail({ where: { id } });
  }

  create(data: Partial<Service>) {
    const service = this.repo.create(data);
    return this.repo.save(service);
  }

  async update(id: string, data: Partial<Service>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
