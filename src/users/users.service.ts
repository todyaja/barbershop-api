import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({ order: { created_at: 'DESC' } });
  }

  findOne(id: string) {
    return this.repo.findOneOrFail({ where: { id } });
  }

  findByPhone(phone: string) {
    return this.repo.findOne({ where: { phone } });
  }

  getCustomers() {
    return this.repo.find({
      where: { role: 'customer' },
      order: { name: 'ASC' },
    });
  }

  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: string, data: Partial<User>) {
    await this.repo.update(id, data);
    return this.repo.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
