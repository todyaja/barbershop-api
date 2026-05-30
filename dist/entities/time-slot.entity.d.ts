import { Barber } from './barber.entity';
import { Booking } from './booking.entity';
export declare class TimeSlot {
    id: string;
    barber_id: string;
    barber: Barber;
    date: string;
    time: string;
    is_available: boolean;
    booking_id: string;
    booking: Booking;
    created_at: Date;
    updated_at: Date;
}
