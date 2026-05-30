import { Repository } from 'typeorm';
import { LoyaltyStamp } from '../entities/loyalty-stamp.entity';
export declare class LoyaltyService {
    private repo;
    constructor(repo: Repository<LoyaltyStamp>);
    getByUser(userId: string): Promise<LoyaltyStamp | null>;
    addStamp(userId: string): Promise<LoyaltyStamp>;
    resetStamps(userId: string): Promise<LoyaltyStamp>;
}
