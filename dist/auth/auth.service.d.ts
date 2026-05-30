import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService);
    sendOtp(phone: string): Promise<{
        message: string;
        phone: string;
    }>;
    verifyOtp(phone: string, code: string): Promise<{
        access_token: string;
        user: {
            id: string;
            phone: string;
            name: string;
            avatarUrl: string;
            role: string;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        phone: string;
        name: string;
        avatarUrl: string;
        role: string;
    }>;
}
