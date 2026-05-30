import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { PromoReward } from '../entities/promo-reward.entity';
import { PromoCredit } from '../entities/promo-credit.entity';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(PromoReward)
    private rewardsRepo: Repository<PromoReward>,
    @InjectRepository(PromoCredit)
    private creditsRepo: Repository<PromoCredit>,
  ) {}

  getRewardsByUser(userId: string) {
    return this.rewardsRepo.find({
      where: { user_id: userId, is_used: false },
      order: { expires_at: 'ASC' },
    });
  }

  createReward(data: Partial<PromoReward>) {
    const reward = this.rewardsRepo.create(data);
    return this.rewardsRepo.save(reward);
  }

  async markRewardAsUsed(id: string) {
    await this.rewardsRepo.update(id, { is_used: true, used_at: new Date() });
    return this.rewardsRepo.findOneOrFail({ where: { id } });
  }

  async getExpiringRewards(days: number = 7) {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    return this.rewardsRepo.createQueryBuilder('r')
      .leftJoinAndSelect('r.user', 'user')
      .where('r.is_used = false')
      .andWhere('r.expires_at >= :now', { now })
      .andWhere('r.expires_at <= :future', { future })
      .getMany();
  }

  getCreditsByUser(userId: string) {
    return this.creditsRepo.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async grantCredits(userId: string, credits: number, note?: string, grantedBy?: string) {
    const credit = this.creditsRepo.create({ user_id: userId, credits, note, granted_by: grantedBy });
    return this.creditsRepo.save(credit);
  }

  async getTotalCredits(userId: string): Promise<number> {
    const result = await this.creditsRepo.createQueryBuilder('c')
      .select('SUM(c.credits)', 'total')
      .where('c.user_id = :userId', { userId })
      .getRawOne();
    return parseInt(result?.total || '0');
  }
}
