import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from '../entities/time-slot.entity';
import { Booking } from '../entities/booking.entity';
import { Barber } from '../entities/barber.entity';
import { TimeSlotsService } from './time-slots.service';
import { TimeSlotsController } from './time-slots.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot, Booking, Barber])],
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService],
  exports: [TimeSlotsService],
})
export class TimeSlotsModule {}
