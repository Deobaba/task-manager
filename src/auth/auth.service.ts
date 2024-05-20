/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {LoginDto} from './dto/loginDto'
import {verifyPassword} from '../utils/passwordUtils'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,  private jwtService: JwtService) {}

  async signIn(loginDetails : LoginDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(loginDetails.email)
    if (!user) {
      throw new UnauthorizedException();
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