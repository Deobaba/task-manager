/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  UseGuards,NotFoundException, ForbiddenException  
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';



@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto ,@Request() req) {

    const userId = req.user.id
    return this.taskService.create(createTaskDto,userId);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.user.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to access this task');
    }
    return task;
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    const userId = req.user.id
    const task = await this.taskService.findOne(id)

    if (!task) {
      throw new NotFoundException('Task not found');}

    if (task.user.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    return await this.taskService.update(id, updateTaskDto);


  }

  @Delete(':id')
 async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    const task = await this.taskService.findOne(id)
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.user.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this task');
    }
    
    return await this.taskService.remove(id);
  }

  @Get('task-done/:id')
  async taskDone (@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    const task = await this.taskService.findOne(id)
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.user.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to update this task');
    }
    
    return await this.taskService.taskDone(id)
  }


}
