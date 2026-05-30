import { Repository } from 'typeorm';
import { TimeSlot } from '../entities/time-slot.entity';
export declare class TimeSlotsService {
    private repo;
    constructor(repo: Repository<TimeSlot>);
    findAvailable(barberId: string, date: string): Promise<TimeSlot[]>;
    findByBarber(barberId: string, startDate: string, endDate: string): Promise<TimeSlot[]>;
    create(data: Partial<TimeSlot>): Promise<TimeSlot>;
    update(id: string, data: Partial<TimeSlot>): Promise<TimeSlot>;
    book(id: string, bookingId: string): Promise<TimeSlot>;
    release(barberId: string, date: string, time: string): Promise<TimeSlot>;
}
