import { BookingsService } from './bookings.service';
import { Booking } from '../entities/booking.entity';
export declare class BookingsController {
    private service;
    constructor(service: BookingsService);
    findAll(customerId?: string, barberId?: string, status?: string, dateFrom?: string, dateTo?: string): Promise<Booking[]>;
    getStats(): Promise<{
        totalBookings: number;
        totalRevenue: number;
        pendingBookings: number;
        completedBookings: number;
        todaysBookings: number;
    }>;
    findTodays(): Promise<Booking[]>;
    findByDate(date: string): Promise<Booking[]>;
    findOne(id: string): Promise<Booking>;
    create(data: Partial<Booking>): Promise<Booking>;
    update(id: string, data: Partial<Booking>): Promise<Booking>;
    updateStatus(id: string, status: string): Promise<Booking>;
    remove(id: string): Promise<void>;
}
