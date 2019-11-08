import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

import { Usuarios as IUsuario } from '../interfaces';
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema : Schema = new Schema({
    email:{
        type:String,
        required:[true," email requerido"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    username:{
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
        type:String,
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
userSchema.plugin(uniqueValidator, {message:"Ya existe"});

userSchema.pre("save", function(next)
{
    let _this: any = this;
    if(_this.password){
        bcrypt.hash(_this.password,10,(err,has)=>{
            if(err) return next(err)
            else{
                _this.password = has
                next()
            }
        })
    } else next()
})

export default mongoose.model<IUsuario>("User", userSchema);