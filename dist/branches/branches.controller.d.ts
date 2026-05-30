import { BranchesService } from './branches.service';
import { Branch } from '../entities/branch.entity';
export declare class BranchesController {
    private service;
    constructor(service: BranchesService);
    findAllActive(): Promise<Branch[]>;
    findAll(): Promise<Branch[]>;
    findOne(id: string): Promise<Branch>;
    create(data: Partial<Branch>): Promise<Branch>;
    update(id: string, data: Partial<Branch>): Promise<Branch>;
    remove(id: string): Promise<void>;
}
