import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TimerDocument = Timer & Document;

@Schema({
  timestamps: true,
})
export class Timer {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  timer: string;
  @Prop({ required: false, type: mongoose.Schema.Types.String })
  type: string;
  @Prop({
    required: false,
    type: mongoose.Schema.Types.Number,
  })
  timestamp: number;  
}

export const TimerSchema = SchemaFactory.createForClass(Timer);