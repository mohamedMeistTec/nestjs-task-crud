/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
    getTasksByFilter(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task =>
                task.desc.includes(search) ||
                task.title.includes(search)
            )
        }
        return tasks;
    }
    getTaskById(id: string): Task {
        const existTask = this.tasks.find(value => value.id === id);
        if (!existTask) {
            throw new NotFoundException('task not found');
        }
        return existTask;
    }
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, desc } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            desc,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }
    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
    deleteTask(id: string) {
        // // you can use this line or the second line to delte task by id 

        // return this.tasks.splice(this.tasks.findIndex(value => value.id === id ),1) ? 'true' : 'false';
        this.tasks = this.tasks.filter(task => task.id === id);
    }
}
