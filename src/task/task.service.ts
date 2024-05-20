/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schema/task.schema';
// import {Task} from './interface/task.interface'

@Injectable()
export class TaskService {

  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  
 async  create(createTaskDto: CreateTaskDto, userId) {
    return  await this.taskModel.create({title:createTaskDto.title, description: createTaskDto.description, user: userId})
  }

  async findAll() {
    return await this.taskModel.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
   const task = await  this.taskModel.findByIdAndUpdate(id,updateTaskDto)
   await task.save()
   return task 
  }

 async remove(id: string): Promise <Task> {
  
    return await this.taskModel.findByIdAndDelete(id)
  }



}
