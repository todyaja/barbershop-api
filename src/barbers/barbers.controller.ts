import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BarbersService } from './barbers.service';
import { Barber } from '../entities/barber.entity';

@Controller('barbers')
export class BarbersController {
  constructor(private service: BarbersService) {}

  @Get()
  findActive() {
    return this.service.findActive();
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('by-user/:userId')
  @UseGuards(AuthGuard('jwt'))
  findByUserId(@Param('userId') userId: string) {
    return this.service.findByUserId(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Partial<Barber>) {
    return this.service.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: Partial<Barber>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
