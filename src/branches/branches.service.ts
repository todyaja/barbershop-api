import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../entities/branch.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private repo: Repository<Branch>,
  ) {}

  findAllActive() {
    return this.repo.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }

  findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  findOne(id: string) {
    return this.repo.findOneOrFail({ where: { id } });
  }

  create(data: Partial<Branch>) {
    const branch = this.repo.create(data);
    return this.repo.save(branch);
  }

  async update(id: string, data: Partial<Branch>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
