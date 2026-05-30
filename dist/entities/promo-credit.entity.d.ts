import { User } from './user.entity';
export declare class PromoCredit {
    id: string;
    user_id: string;
    user: User;
    credits: number;
    note: string;
    granted_by: string;
    grantedByUser: User;
    created_at: Date;
}
