import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        TasksController,],
    providers: [
        TasksService,],
})
export class TasksModule { }
