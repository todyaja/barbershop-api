import { User } from './user.entity';
export declare class Barber {
    id: string;
    user_id: string;
    user: User;
    name: string;
    email: string;
    phone: string;
    avatar_url: string;
    bio: string;
    specialties: string[];
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}
