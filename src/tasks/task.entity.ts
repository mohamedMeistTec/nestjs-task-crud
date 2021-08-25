import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.enum";
 @Entity()
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