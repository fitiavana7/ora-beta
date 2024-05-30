import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: false,
})
class Membres {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  mail: string;
}

const MembresSchema = SchemaFactory.createForClass(Membres);
export default MembresSchema;
  