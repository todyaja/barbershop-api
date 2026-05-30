import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyStamp } from '../entities/loyalty-stamp.entity';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(LoyaltyStamp)
    private repo: Repository<LoyaltyStamp>,
  ) {}

  async getByUser(userId: string): Promise<LoyaltyStamp | null> {
    return this.repo.findOne({ where: { user_id: userId } });
  }

  async addStamp(userId: string): Promise<LoyaltyStamp> {
    let stamp = await this.repo.findOne({ where: { user_id: userId } });
    if (!stamp) {
      stamp = this.repo.create({ user_id: userId, stamp_count: 1 });
      return this.repo.save(stamp);
    }
    stamp.stamp_count = Math.min(stamp.stamp_count + 1, 7);
    stamp.last_updated_at = new Date();
    return this.repo.save(stamp);
  }

  async resetStamps(userId: string): Promise<LoyaltyStamp> {
    let stamp = await this.repo.findOne({ where: { user_id: userId } });
    if (!stamp) {
      stamp = this.repo.create({ user_id: userId, stamp_count: 0 });
      return this.repo.save(stamp);
    }
    stamp.stamp_count = 0;
    stamp.last_updated_at = new Date();
    return this.repo.save(stamp);
  }
}
