import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model";

export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    @Column()
    desc: string;
    @Column()
    status: TaskStatus;
}