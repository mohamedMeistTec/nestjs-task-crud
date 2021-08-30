import { Task } from "../task.entity";

export class TaskPaginateDto {
    totalItems: number
    data: Task[]
}