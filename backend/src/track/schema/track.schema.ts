import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TimerSchema } from './timer.schema';

export type TrackDocument = Track & Document;

@Schema({
  timestamps: true,
})
export class Track {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: string;
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  taskId: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  groupId: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  projectId: string;
  @Prop({ required: false, type: mongoose.Schema.Types.String , default : ''})
  taskTitle: string;
  @Prop({ required: false, type: mongoose.Schema.Types.String , default : '' })
  description: string;
  @Prop({ required: false, type: mongoose.Schema.Types.Number, default: 0 })
  timer: number;
  @Prop({ required: false, type: [TimerSchema]})
  step_timers;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
