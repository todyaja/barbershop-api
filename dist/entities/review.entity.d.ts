import { Booking } from './booking.entity';
import { User } from './user.entity';
import { Barber } from './barber.entity';
export declare class Review {
    id: string;
    booking_id: string;
    booking: Booking;
    customer_id: string;
    customer: User;
    barber_id: string;
    barber: Barber;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
}
