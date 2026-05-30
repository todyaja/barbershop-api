import { ServicesService } from './services.service';
import { Service } from '../entities/service.entity';
export declare class ServicesController {
    private service;
    constructor(service: ServicesService);
    findActive(): Promise<Service[]>;
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service>;
    create(data: Partial<Service>): Promise<Service>;
    update(id: string, data: Partial<Service>): Promise<Service>;
    remove(id: string): Promise<void>;
}
