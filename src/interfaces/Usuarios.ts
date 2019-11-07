import mongoose, {Document} from 'mongoose'
interface Usuarios extends Document{
    email:string;
    userName:string;
    password:string;
    userType:String;
    createdAt:number;
    updatedAt:number;
    active:boolean;
}
export{
    Usuarios
}