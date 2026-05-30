import { SchedulesService } from './schedules.service';
import { Schedule } from '../entities/schedule.entity';
export declare class SchedulesController {
    private service;
    constructor(service: SchedulesService);
    findByBarber(barberId: string): Promise<Schedule[]>;
    findByBarberAndDay(barberId: string, day: string): Promise<Schedule>;
    create(data: Partial<Schedule>): Promise<Schedule>;
    update(id: string, data: Partial<Schedule>): Promise<Schedule>;
    remove(id: string): Promise<void>;
}
