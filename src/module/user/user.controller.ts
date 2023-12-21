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
import { UserService } from 'src/module/user/domain/user.service';
import { FindUserDto } from './dto/find-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('update')
  update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('disable')
  disable(@Query('id') id: string) {
    return this.userService.disable(+id);
  }

  @Post('enable')
  enable(@Query('id') id: string) {
    return this.userService.enable(+id);
  }

  @Get()
  async findUsers(@Query() params: FindUserDto) {
    const res = await this.userService.findUsers(params);
    console.log(res);
    return res;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(+id);
  }
}
