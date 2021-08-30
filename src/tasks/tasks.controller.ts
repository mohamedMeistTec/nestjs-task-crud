/*
https://docs.nestjs.com/controllers#controllers
*/

import { ParseIntPipe, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { PaginationDto } from './dto/paginate.dto';
import { TaskPaginateDto } from './dto/task-paginate.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';

import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {
    }
    @Get('listAll')
    getAllTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    ): Promise<TaskPaginateDto> {
        console.log('list from controller ', filterDto)
        return this.tasksService.getTasks(filterDto);
    }
    // @Get('list')
    //     getTaskPagination(@Query() paginationDto:PaginationDto ):Promise<TaskPaginateDto>{

    // paginationDto.limit = Number(paginationDto.limit)
    // paginationDto.page = Number(paginationDto.page)

    //         return this.tasksService.

    //     }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     // console.log('query', filterDto);
    //     return this.tasksService.getTasksByFilter(filterDto);
    // }

    @Get('/find/entityId=:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }
    @Post('/new')
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
    @Delete('/delete/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

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