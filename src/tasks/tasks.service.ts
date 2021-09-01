/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { User } from 'src/auth/user.entity';
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

    async getTaskById(id: number, user: User): Promise<Task> {
        console.log('userrr', user);
        try {
            const existTask = await this.taskRepository.findOne({ where: { id, userId: user.id } });
            if (!existTask) {
                throw new NotFoundException('task not found');
            }
            return existTask;
        } catch (error) {
            console.log('error', error);
        }

    }
    // getTaskById(id: string): Task {
    //     const existTask = this.tasks.find(value => value.id === id);
    //     if (!existTask) {
    //         throw new NotFoundException('task not found');
    //     }
    //     return existTask;
    // }
    async getTasks(filter: GetTasksFilterDto, user: User): Promise<TaskPaginateDto> {
 
        return this.taskRepository.getTasks(filter, user);
    }

    // getPaginateTask(){
    //     return this.taskRepository.getTasks()
    // }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);

    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id });
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
    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        try {
            const task = await this.getTaskById(id, user);
            console.log('task ', task)
            task.status = status;
            await task.save();
            return task;
        } catch (error) {
            throw new NotFoundException('error');
        }

    }
    // deleteTask(id: string) {
    //     // // you can use this line or the second line to delte task by id 

    //     // return this.tasks.splice(this.tasks.findIndex(value => value.id === id ),1) ? 'true' : 'false';
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id === found.id);
    // }
}
