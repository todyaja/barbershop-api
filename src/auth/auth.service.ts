import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async sendOtp(phone: string) {
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

  async verifyOtp(phone: string, code: string) {
    const user = await this.usersRepo.findOne({ where: { phone } });
    if (!user) throw new UnauthorizedException('User not found');

    if (user.otp_code !== code) throw new UnauthorizedException('Invalid OTP');
    if (user.otp_expires_at && new Date() > new Date(user.otp_expires_at)) {
      throw new UnauthorizedException('OTP expired');
    }

    user.otp_code = null as any;
    user.otp_expires_at = null as any;
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

  async getProfile(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      avatarUrl: user.avatar_url,
      role: user.role,
    };
  }
}
