/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { TaskSchema } from './schema/task.schema';
import {Task} from './interface/task.interface'

@Injectable()
export class TaskService {

  constructor(@InjectModel('Task') private taskModel: Model<Task>){}

  
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto)
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id,updateTaskDto)
  }

  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
