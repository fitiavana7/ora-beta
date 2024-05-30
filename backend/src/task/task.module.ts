import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import TaskGateway from 'src/gateway/task.gateway';
import TaskSchema, { Task } from './schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  providers: [TaskService , TaskGateway],
  controllers: [TaskController] ,
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  exports: [TaskService],
})
export class TaskModule {}
