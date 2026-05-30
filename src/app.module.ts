import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BranchesModule } from './branches/branches.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { BarbersModule } from './barbers/barbers.module';
import { BookingsModule } from './bookings/bookings.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { PromoModule } from './promo/promo.module';
import {
  Branch, User, Service, Barber, Booking, Schedule,
  TimeSlot, Payment, Review, LoyaltyStamp, PromoReward, PromoCredit,
} from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [
          Branch, User, Service, Barber, Booking, Schedule,
          TimeSlot, Payment, Review, LoyaltyStamp, PromoReward, PromoCredit,
        ],
        synchronize: true,
      }),
    }),
    AuthModule,
    BranchesModule,
    UsersModule,
    ServicesModule,
    BarbersModule,
    BookingsModule,
    SchedulesModule,
    TimeSlotsModule,
    PaymentsModule,
    ReviewsModule,
    LoyaltyModule,
    PromoModule,
  ],
})
export class AppModule {}
