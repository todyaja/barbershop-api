import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReviewsService } from './reviews.service';
import { Review } from '../entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  @Get()
  findAll(@Query('barberId') barberId?: string) {
    return this.service.findAll(barberId);
  }

  @Get('booking/:bookingId')
  findByBooking(@Param('bookingId') bookingId: string) {
    return this.service.findByBooking(bookingId);
  }

  @Get('barber/:barberId/rating')
  getAverageRating(@Param('barberId') barberId: string) {
    return this.service.getAverageRating(barberId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Review>) {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Review>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
