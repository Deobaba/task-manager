/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './schema/task.schema';
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
