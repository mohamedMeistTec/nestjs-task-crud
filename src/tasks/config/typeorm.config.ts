import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'e-Ejx.]NtEQNgc.z',
    database: 'taskd',
    entities: [__dirname+ '/../**/*.entity.ts'],
    synchronize: true,
}