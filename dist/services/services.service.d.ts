import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
export declare class ServicesService {
    private repo;
    constructor(repo: Repository<Service>);
    findAll(): Promise<Service[]>;
    findActive(): Promise<Service[]>;
    findOne(id: string): Promise<Service>;
    create(data: Partial<Service>): Promise<Service>;
    update(id: string, data: Partial<Service>): Promise<Service>;
    remove(id: string): Promise<void>;
}
