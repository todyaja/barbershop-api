import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoyaltyService } from './loyalty.service';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private service: LoyaltyService) {}

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  getByUser(@Param('userId') userId: string) {
    return this.service.getByUser(userId);
  }

  @Post(':userId/stamp')
  @UseGuards(AuthGuard('jwt'))
  addStamp(@Param('userId') userId: string) {
    return this.service.addStamp(userId);
  }

  @Post(':userId/reset')
  @UseGuards(AuthGuard('jwt'))
  resetStamps(@Param('userId') userId: string) {
    return this.service.resetStamps(userId);
  }
}
