import { User } from './user.entity';
export declare class PromoReward {
    id: string;
    user_id: string;
    user: User;
    type: string;
    value: number;
    is_used: boolean;
    used_at: Date;
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
}
