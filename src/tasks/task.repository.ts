import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { PaginationDto } from "./dto/paginate.dto";
import { TaskPaginateDto } from "./dto/task-paginate.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.enum";
@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, desc } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.desc = desc;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }
    async getTasks(filter: GetTasksFilterDto): Promise<TaskPaginateDto> {

        console.log('list from repository', filter)
        const { status, search } = filter;
        const query = this.createQueryBuilder('task');
        if (search) {
            query.andWhere('task.title LIKE :search OR task.desc LIKE :search', { search: `%${search}%` })
        }
        if (status) {
            query.andWhere('task.status = :status ', { status });
        }
        const tasks = await query.getMany();
        return { totalItems: 0, data: tasks };
    }

    getPaginateTaskDto(paginationDto: PaginationDto) {
        const query = this.createQueryBuilder('task');
        if (paginationDto) {

        }

    }
}