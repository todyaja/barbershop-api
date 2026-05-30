import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingsService } from './bookings.service';
import { Booking } from '../entities/booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private service: BookingsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Query('customerId') customerId?: string,
    @Query('barberId') barberId?: string,
    @Query('status') status?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    return this.service.findAll({
      customerId,
      barberId,
      status,
      dateFrom,
      dateTo,
    });
  }

  @Get('stats')
  @UseGuards(AuthGuard('jwt'))
  getStats() {
    return this.service.getStats();
  }

  @Get('today')
  @UseGuards(AuthGuard('jwt'))
  findTodays() {
    return this.service.findTodays();
  }

  @Get('by-date/:date')
  @UseGuards(AuthGuard('jwt'))
  findByDate(@Param('date') date: string) {
    return this.service.findByDate(date);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Booking>) {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Booking>) {
    return this.service.update(id, data);
  }

  @Put(':id/status')
  @UseGuards(AuthGuard('jwt'))
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
