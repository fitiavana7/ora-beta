import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: false,
})
class TaskItem {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  titre: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  description: string;

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  assigneeId: string;

}

const TaskItemSchema = SchemaFactory.createForClass(TaskItem);
export default TaskItemSchema
  