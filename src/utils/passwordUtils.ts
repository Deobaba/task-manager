/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';



export const hashPassword = async(password) =>{

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds)

    return hash

}

export const verifyPassword = async(password: string, hash : string)=>{
    
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch
}