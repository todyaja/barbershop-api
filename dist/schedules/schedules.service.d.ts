import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
export declare class SchedulesService {
    private repo;
    constructor(repo: Repository<Schedule>);
    findByBarber(barberId: string): Promise<Schedule[]>;
    findByBarberAndDay(barberId: string, dayOfWeek: number): Promise<Schedule>;
    create(data: Partial<Schedule>): Promise<Schedule>;
    update(id: string, data: Partial<Schedule>): Promise<Schedule>;
    remove(id: string): Promise<void>;
}
