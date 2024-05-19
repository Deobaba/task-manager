/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskSchema } from './schema/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name:'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
