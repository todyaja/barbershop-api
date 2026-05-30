import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
export declare class BookingsService {
    private repo;
    constructor(repo: Repository<Booking>);
    findAll(filters?: {
        customerId?: string;
        barberId?: string;
        status?: string;
        dateFrom?: string;
        dateTo?: string;
    }): Promise<Booking[]>;
    findOne(id: string): Promise<Booking>;
    findTodays(): Promise<Booking[]>;
    findByDate(date: string): Promise<Booking[]>;
    create(data: Partial<Booking>): Promise<Booking>;
    update(id: string, data: Partial<Booking>): Promise<Booking>;
    updateStatus(id: string, status: string): Promise<Booking>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        totalBookings: number;
        totalRevenue: number;
        pendingBookings: number;
        completedBookings: number;
        todaysBookings: number;
    }>;
}
