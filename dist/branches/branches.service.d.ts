import { Repository } from 'typeorm';
import { Branch } from '../entities/branch.entity';
export declare class BranchesService {
    private repo;
    constructor(repo: Repository<Branch>);
    findAllActive(): Promise<Branch[]>;
    findAll(): Promise<Branch[]>;
    findOne(id: string): Promise<Branch>;
    create(data: Partial<Branch>): Promise<Branch>;
    update(id: string, data: Partial<Branch>): Promise<Branch>;
    remove(id: string): Promise<void>;
}
