/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsString , IsBoolean} from "class-validator";
export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsBoolean()
    @IsNotEmpty()
    readonly done: boolean;

    @IsNotEmpty()
    user: string


}
