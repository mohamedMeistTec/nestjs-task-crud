import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'e-Ejx.]NtEQNgc.z',
    database: 'taskd',
    "entities": ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
}