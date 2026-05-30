import { AuthService } from './auth.service';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    sendOtp(dto: SendOtpDto): Promise<{
        message: string;
        phone: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        access_token: string;
        user: {
            id: string;
            phone: string;
            name: string;
            avatarUrl: string;
            role: string;
        };
    }>;
    getProfile(req: any): Promise<{
        id: string;
        phone: string;
        name: string;
        avatarUrl: string;
        role: string;
    }>;
}
