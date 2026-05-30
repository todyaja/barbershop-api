import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    findAll(role?: string): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(data: Partial<User>): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}
