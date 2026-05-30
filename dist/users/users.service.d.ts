import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByPhone(phone: string): Promise<User | null>;
    getCustomers(): Promise<User[]>;
    create(data: Partial<User>): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}
