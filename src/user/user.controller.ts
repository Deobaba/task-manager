/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {verifyPassword} from '../utils/passwordUtils'
import { LoginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('login')
 async login(@Body() loginDetails: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDetails.email)

    if (!user) {
      return {message: 'Invalid credentials'}
    }

    const isMatch = await verifyPassword(loginDetails.password, user.password)

    if(!isMatch){
      return {message: 'Invalid credentials'}
    }


    const payload = {email: user.email, id: user.id, name:user.name}

    return {
      token: this.jwtService.sign(payload),
      message: 'login successful'
    }


  }
}
