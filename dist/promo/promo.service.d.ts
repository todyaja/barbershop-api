import { Repository } from 'typeorm';
import { PromoReward } from '../entities/promo-reward.entity';
import { PromoCredit } from '../entities/promo-credit.entity';
export declare class PromoService {
    private rewardsRepo;
    private creditsRepo;
    constructor(rewardsRepo: Repository<PromoReward>, creditsRepo: Repository<PromoCredit>);
    getRewardsByUser(userId: string): Promise<PromoReward[]>;
    createReward(data: Partial<PromoReward>): Promise<PromoReward>;
    markRewardAsUsed(id: string): Promise<PromoReward>;
    getExpiringRewards(days?: number): Promise<PromoReward[]>;
    getCreditsByUser(userId: string): Promise<PromoCredit[]>;
    grantCredits(userId: string, credits: number, note?: string, grantedBy?: string): Promise<PromoCredit>;
    getTotalCredits(userId: string): Promise<number>;
}
