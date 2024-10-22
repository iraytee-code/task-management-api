import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksRepository } from "./tasks.repository";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { DataSource } from "typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, ConfigModule],
  providers: [
    {
      provide: TasksRepository,
      useFactory: (dataSource: DataSource) => new TasksRepository(dataSource),
      inject: [DataSource],
    },
    TasksService,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
