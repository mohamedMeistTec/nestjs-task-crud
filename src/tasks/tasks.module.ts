import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([
        TaskRepository,
    ]),
        AuthModule,
    ],
    controllers: [
        TasksController,],
    providers: [
        TasksService,],
})
export class TasksModule { }
