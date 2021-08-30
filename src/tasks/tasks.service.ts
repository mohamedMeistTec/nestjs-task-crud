/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskPaginateDto } from './dto/task-paginate.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {

    }



    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    // getTasksByFilter(filterDto: GetTasksFilterDto) {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.desc.includes(search) ||
    //             task.title.includes(search)
    //         )
    //     }
    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const existTask = await this.taskRepository.findOne(id)
        if (!existTask) {
            throw new NotFoundException('task not found');
        }
        return existTask;
    }
    // getTaskById(id: string): Task {
    //     const existTask = this.tasks.find(value => value.id === id);
    //     if (!existTask) {
    //         throw new NotFoundException('task not found');
    //     }
    //     return existTask;
    // }
    async getTasks(filter:GetTasksFilterDto): Promise<TaskPaginateDto> {
        
        console.log('list from service',filter)
        return this.taskRepository.getTasks(filter);
    }

    // getPaginateTask(){
    //     return this.taskRepository.getTasks()
    // }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);

    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('task not found');
        }
    }
    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, desc } = createTaskDto;
    //     const task: Task = {
    //         id,
    //         title,
    //         desc,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return task;
    }
    // deleteTask(id: string) {
    //     // // you can use this line or the second line to delte task by id 

    //     // return this.tasks.splice(this.tasks.findIndex(value => value.id === id ),1) ? 'true' : 'false';
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id === found.id);
    // }
}
