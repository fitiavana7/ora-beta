import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import TaskItemSchema from './task-item.schema';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: false,
})
export class Task {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  projectId : string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  titre : string;

  @Prop({ required: false, type: [TaskItemSchema] , default : [] })
  tasks ;

}

const TaskSchema = SchemaFactory.createForClass(Task);
export default TaskSchema;
