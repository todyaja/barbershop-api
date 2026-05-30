import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SchedulesService } from './schedules.service';
import { Schedule } from '../entities/schedule.entity';

@Controller('schedules')
export class SchedulesController {
  constructor(private service: SchedulesService) {}

  @Get('barber/:barberId')
  findByBarber(@Param('barberId') barberId: string) {
    return this.service.findByBarber(barberId);
  }

  @Get('barber/:barberId/day/:day')
  findByBarberAndDay(
    @Param('barberId') barberId: string,
    @Param('day') day: string,
  ) {
    return this.service.findByBarberAndDay(barberId, parseInt(day));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Schedule>) {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Schedule>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
