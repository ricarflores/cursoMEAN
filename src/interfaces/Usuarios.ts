import mongoose, {Document} from 'mongoose'
interface Usuarios extends Document{
    email:string;
    username:string;
    password:string;
    userType:string;
    createdAt:number;
    updatedAt:number;
    active:boolean;
    token?:any;
}
export{
    Usuarios
}