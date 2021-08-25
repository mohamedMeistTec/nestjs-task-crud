/*
https://docs.nestjs.com/controllers#controllers
*/

import { ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';
 
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    // @Get('listAll')
    // getAllTasks() {
    //     return this.tasksService.getAllTasks();
    // }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     // console.log('query', filterDto);
    //     return this.tasksService.getTasksByFilter(filterDto);
    // }

    @Get('/find/entityId=:id')
    getTaskById(@Param('id',ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(
    //     @Body() createTaskDto: CreateTaskDto
    // ): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }
    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ): Task {
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
    // @Delete('/delete/:id')
    // deleteTask(@Param('id') id: string) {
    //     return this.tasksService.deleteTask(id);
    // }

    /**
     * 
     * @param body 
     * 
     * this for creating task with just body 
        @Post()
        createTask(@Body() body){
    console.log('body',body);
        }
    
     */
}
