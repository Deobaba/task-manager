/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { hashPassword } from 'src/utils/passwordUtils';


export const UserSchema = new mongoose.Schema({

    name: String,
    email:{
        type: String,
        unique: true
    },
    password: String,

})



// use a method on TaskSchema that hash password before saving
UserSchema.pre('save', async function(next) {
    // const task = this;
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});