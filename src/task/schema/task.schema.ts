/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose ,{ Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({default: false})
  done : boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string; // Or whatever type you use for user IDs
}

export const TaskSchema = SchemaFactory.createForClass(Task);