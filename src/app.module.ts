import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './tasks/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,],
})
export class AppModule { }
