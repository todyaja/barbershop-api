import { BarbersService } from './barbers.service';
import { Barber } from '../entities/barber.entity';
export declare class BarbersController {
    private service;
    constructor(service: BarbersService);
    findActive(): Promise<Barber[]>;
    findAll(): Promise<Barber[]>;
    findOne(id: string): Promise<Barber>;
    findByUserId(userId: string): Promise<Barber>;
    create(data: Partial<Barber>): Promise<Barber>;
    update(id: string, data: Partial<Barber>): Promise<Barber>;
    remove(id: string): Promise<void>;
}
