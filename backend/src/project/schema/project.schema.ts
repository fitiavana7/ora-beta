import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import UserSchema from 'src/user/schema/user.schema';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: false,
})
export class Project {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  ownerId : string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  titre : string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  description : string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  type : string;

  @Prop({ required: false, type: [UserSchema], default: [] })
  membres ;

}

const ProjectSchema = SchemaFactory.createForClass(Project);
export default ProjectSchema;
