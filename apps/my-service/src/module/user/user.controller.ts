import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { RequireLogin } from '../../lib/custom.decorater';
import { UserService } from './domain/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RequireLogin()
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @RequireLogin()
  @Patch('update')
  update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @RequireLogin()
  @Post('disable')
  disable(@Query('id') id: string) {
    return this.userService.disable(+id);
  }

  @RequireLogin()
  @Post('enable')
  enable(@Query('id') id: string) {
    return this.userService.enable(+id);
  }

  @RequireLogin()
  @Get()
  async findUsers(@Query() params: FindUserDto) {
    const res = await this.userService.findUsers(params);
    return res;
  }

  @RequireLogin()
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser({ id: +id });
  }
}
