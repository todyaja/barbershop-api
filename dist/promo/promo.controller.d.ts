import { PromoService } from './promo.service';
import { PromoReward } from '../entities/promo-reward.entity';
export declare class PromoController {
    private service;
    constructor(service: PromoService);
    getRewardsByUser(userId: string): Promise<PromoReward[]>;
    createReward(data: Partial<PromoReward>): Promise<PromoReward>;
    markRewardAsUsed(id: string): Promise<PromoReward>;
    getExpiringRewards(days?: string): Promise<PromoReward[]>;
    getCreditsByUser(userId: string): Promise<import("../entities").PromoCredit[]>;
    getTotalCredits(userId: string): Promise<number>;
    grantCredits(body: {
        userId: string;
        credits: number;
        note?: string;
        grantedBy?: string;
    }): Promise<import("../entities").PromoCredit>;
}
