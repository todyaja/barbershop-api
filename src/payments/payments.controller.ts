import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { Payment } from '../entities/payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}

  @Get('booking/:bookingId')
  @UseGuards(AuthGuard('jwt'))
  findByBooking(@Param('bookingId') bookingId: string) {
    return this.service.findByBooking(bookingId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Payment>) {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Payment>) {
    return this.service.update(id, data);
  }

  @Put(':id/mark-paid')
  @UseGuards(AuthGuard('jwt'))
  markAsPaid(@Param('id') id: string, @Body('transactionId') transactionId?: string) {
    return this.service.markAsPaid(id, transactionId);
  }
}
