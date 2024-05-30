import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Track, TrackSchema } from './schema/track.schema';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import TrackGateway from 'src/gateway/track.gateway';
import { TaskService } from 'src/task/task.service';
import TaskSchema, { Task } from 'src/task/schema/task.schema';

@Module({
  controllers: [TrackController],
  providers: [TrackService , TrackGateway , TaskService],
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  exports: [TrackService],
})
export class TrackModule {}
