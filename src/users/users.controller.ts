import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getProduct() {
    return this, this.usersService.findAll();
  }

  //GET

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  //PUT

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.usersService.update(+id, payload);
  }

  //DELETE

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
