import { User } from './user.entity';
export declare class LoyaltyStamp {
    id: string;
    user_id: string;
    user: User;
    stamp_count: number;
    last_updated_at: Date;
}
