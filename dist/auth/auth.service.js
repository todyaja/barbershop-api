"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entities/user.entity");
let AuthService = class AuthService {
    constructor(usersRepo, jwtService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
    }
    async sendOtp(phone) {
        let user = await this.usersRepo.findOne({ where: { phone } });
        if (!user) {
            user = this.usersRepo.create({ phone, name: phone, role: 'customer' });
            user = await this.usersRepo.save(user);
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        user.otp_code = code;
        user.otp_expires_at = expiresAt;
        await this.usersRepo.save(user);
        return { message: 'OTP sent', phone: user.phone };
    }
    async verifyOtp(phone, code) {
        const user = await this.usersRepo.findOne({ where: { phone } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        if (user.otp_code !== code)
            throw new common_1.UnauthorizedException('Invalid OTP');
        if (user.otp_expires_at && new Date() > new Date(user.otp_expires_at)) {
            throw new common_1.UnauthorizedException('OTP expired');
        }
        user.otp_code = null;
        user.otp_expires_at = null;
        await this.usersRepo.save(user);
        const payload = { sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                avatarUrl: user.avatar_url,
                role: user.role,
            },
        };
    }
    async getProfile(userId) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return {
            id: user.id,
            phone: user.phone,
            name: user.name,
            avatarUrl: user.avatar_url,
            role: user.role,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map