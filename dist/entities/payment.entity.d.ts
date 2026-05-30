import { Booking } from './booking.entity';
export declare class Payment {
    id: string;
    booking_id: string;
    booking: Booking;
    amount: number;
    payment_method: string;
    status: string;
    payment_date: Date;
    transaction_id: string;
    created_at: Date;
    updated_at: Date;
}
