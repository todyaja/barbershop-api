import { LoyaltyService } from './loyalty.service';
export declare class LoyaltyController {
    private service;
    constructor(service: LoyaltyService);
    getByUser(userId: string): Promise<import("../entities").LoyaltyStamp | null>;
    addStamp(userId: string): Promise<import("../entities").LoyaltyStamp>;
    resetStamps(userId: string): Promise<import("../entities").LoyaltyStamp>;
}
