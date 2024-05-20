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
    return this.userModel.find()
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User>  {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto)
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id)
  }

  findUserByEmail(email:string) {
    return this.userModel.findOne({email})
  }
}
