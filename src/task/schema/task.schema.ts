/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';




export const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});


