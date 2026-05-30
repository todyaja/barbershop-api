import { Repository } from 'typeorm';
import { Barber } from '../entities/barber.entity';
export declare class BarbersService {
    private repo;
    constructor(repo: Repository<Barber>);
    findAll(): Promise<Barber[]>;
    findActive(): Promise<Barber[]>;
    findOne(id: string): Promise<Barber>;
    findByUserId(userId: string): Promise<Barber>;
    create(data: Partial<Barber>): Promise<Barber>;
    update(id: string, data: Partial<Barber>): Promise<Barber>;
    remove(id: string): Promise<void>;
}
