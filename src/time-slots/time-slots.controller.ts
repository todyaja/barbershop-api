import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TimeSlotsService } from './time-slots.service';
import { TimeSlot } from '../entities/time-slot.entity';

@Controller('time-slots')
export class TimeSlotsController {
  constructor(private service: TimeSlotsService) {}

  @Get('available')
  findAvailable(
    @Query('barberId') barberId: string,
    @Query('date') date: string,
  ) {
    return this.service.findAvailable(barberId, date);
  }

  @Get('availability')
  getAvailability(@Query('date') date: string) {
    return this.service.getAvailability(date);
  }

  @Get('barber/:barberId')
  findByBarber(
    @Param('barberId') barberId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.service.findByBarber(barberId, startDate, endDate);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<TimeSlot>) {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<TimeSlot>) {
    return this.service.update(id, data);
  }

  @Put(':id/book')
  @UseGuards(AuthGuard('jwt'))
  book(@Param('id') id: string, @Body('bookingId') bookingId: string) {
    return this.service.book(id, bookingId);
  }

  @Put('release')
  @UseGuards(AuthGuard('jwt'))
  release(@Body() body: { barberId: string; date: string; time: string }) {
    return this.service.release(body.barberId, body.date, body.time);
  }
}
