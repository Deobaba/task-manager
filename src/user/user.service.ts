/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './interface/user.interface'

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private userModel: Model<User>){}

 async create(createUserDto: CreateUserDto): Promise <User> {
    return  await this.userModel.create(createUserDto)
  }

  async findAll():Promise<User[] | User> {
    return await this.userModel.find()
  }

 async  findOne(id: string): Promise<User> {
    return await this.userModel.findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User>  {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto)
  }

  async remove(id: number) {
    return await this.userModel.findByIdAndDelete(id)
  }

  async findUserByEmail(email:string) {
    return await this.userModel.findOne({email})
  }
}
