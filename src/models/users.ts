import mongoose, { Schema, Document } from "mongoose";
//import umiqueValidator from "mongoose-unique-validator";
//import bycryp from "bycryp";

import { Usuairos as IUsuario } from '../interfaces';

const userSchema : Schema = new Schema({
    email:{
        type:String,
        required:[true," email requerido"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    userName:{
        type:String,
        required:[true,"username ya existe"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password requerido"],
    },
    userType:{
        tyoe:String,
        enum:[
            'admin',
            'vendedor',
            'user'
        ],
        required:true,
        default:'user'
    },
    createdAt:{
        type:Number,
        required:true,
        default:Date.now()
    },
    updateAt:{
        type:Number,
        required:true,
        default:Date.now()
    },
    activate:{
        type:Boolean,
        required:true,
        default:false
    }
});

export default mongoose.model<IUsuario>('User', userSchema)