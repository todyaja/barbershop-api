import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PromoService } from './promo.service';
import { PromoReward } from '../entities/promo-reward.entity';

@Controller('promo')
export class PromoController {
  constructor(private service: PromoService) {}

  @Get('rewards/:userId')
  @UseGuards(AuthGuard('jwt'))
  getRewardsByUser(@Param('userId') userId: string) {
    return this.service.getRewardsByUser(userId);
  }

  @Post('rewards')
  @UseGuards(AuthGuard('jwt'))
  createReward(@Body() data: Partial<PromoReward>) {
    return this.service.createReward(data);
  }

  @Post('rewards/:id/use')
  @UseGuards(AuthGuard('jwt'))
  markRewardAsUsed(@Param('id') id: string) {
    return this.service.markRewardAsUsed(id);
  }

  @Get('rewards/expiring')
  @UseGuards(AuthGuard('jwt'))
  getExpiringRewards(@Query('days') days?: string) {
    return this.service.getExpiringRewards(days ? parseInt(days) : 7);
  }

  @Get('credits/:userId')
  @UseGuards(AuthGuard('jwt'))
  getCreditsByUser(@Param('userId') userId: string) {
    return this.service.getCreditsByUser(userId);
  }

  @Get('credits/:userId/total')
  @UseGuards(AuthGuard('jwt'))
  getTotalCredits(@Param('userId') userId: string) {
    return this.service.getTotalCredits(userId);
  }

  @Post('credits')
  @UseGuards(AuthGuard('jwt'))
  grantCredits(
    @Body()
    body: {
      userId: string;
      credits: number;
      note?: string;
      grantedBy?: string;
    },
  ) {
    return this.service.grantCredits(
      body.userId,
      body.credits,
      body.note,
      body.grantedBy,
    );
  }
}
