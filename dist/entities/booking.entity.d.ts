import { User } from './user.entity';
import { Barber } from './barber.entity';
import { Service } from './service.entity';
import { Branch } from './branch.entity';
export declare class Booking {
    id: string;
    customer_id: string;
    customer: User;
    barber_id: string;
    barber: Barber;
    service_id: string;
    service: Service;
    branch_id: string;
    branch: Branch;
    date: string;
    time: string;
    status: string;
    notes: string;
    special_request: string;
    total_price: number;
    promo_used: boolean;
    promo_discount: number;
    created_at: Date;
    updated_at: Date;
}
