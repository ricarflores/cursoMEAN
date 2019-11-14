import {Usuarios as IUsuarios} from '../../interfaces/'
import { User as MUser } from '../../models/';
import { Types } from 'mongoose';
import { threadId } from 'worker_threads';
import bcrypt from 'bcrypt'
import e from 'cors';
import jwt from 'jsonwebtoken'
import { variables } from './../../config/'

interface IUserInput
{
    email:IUsuarios["email"],
    username:IUsuarios["username"],
    password:IUsuarios["password"],
    userType:IUsuarios["userType"]
}


export default class Usuario
{
    private email: string;
    private password: string;
    private userType: string;
    private username: string;
    private body : IUsuarios;

    constructor(body : IUsuarios){
        const { email, username, password , userType} = body;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.username = username;
        this.body = body;
    }
    Save(data:IUserInput):Promise<IUsuarios|Error[]>{
        const user = new MUser(data)
        console.log("data: ", data);
        return new Promise((resolve,reject)=>{
            user.save((err,u) => {
                if(err){
                    reject(err)
                }
                else{

                    resolve(u)
                }
            })
        })
    }
    Get(id?:Types.ObjectId | string){
        const critera = (id) 
                        ? (typeof id === "string") 
                            ? {"email": id}
                            : {_id:id}
                        : {}

        return MUser.find(critera)
            .then( u => (u && u.length<1) ? {} : (id && u[0]._id) ? u[0]: u)
            .catch(e => e)
    }
    post(): Promise <IUsuarios | Error[]>{
        const data: IUserInput ={
            email:this.email,
            username:this.username,
            password:this.password,
            userType:this.userType
        }
        return new Promise((resolve,reject)=>{
            this.Save(data)
                .then((user) => resolve(user))
                .catch((err) => reject(err))
        })
    }
    put(id:Types.ObjectId){
        return new Promise((resolve,reject)=>{
            this.Get(id)
            .then((user:any)=>{
                console.log("password", user.password);
                user.username = this.username || user.username;
                user.userType = this.userType || user.userType;
                if(this.password) user.password = this.password
                this.Save(user)
                    .then((newUser:any)=> (newUser && newUser._id) ? resolve(newUser) : reject({}))
                    .catch((error:Error[])=> reject(error))
            })
            .catch(e => reject(e))
        })
    }
    delete(id: Types.ObjectId)
    {
        const critera = (id) ? {_id:id} : {}
        return MUser.deleteOne(critera)
            .then(user => user)
            .catch(err =>err)
    }
    generateJWT(user:IUsuarios){
        const token = jwt.sign({user:user},variables.secretKey,{expiresIn:600000});
        
        return token;
        
    }
    Login(value: Types.ObjectId | string){
        return this.Get(value)
            .then((user) =>{
                
                if(user && user._id ){
                    //return bcrypt.compareSync(this.password, user.password)
                    if(bcrypt.compareSync(this.password, user.password))
                    {
                        user['token'] = this.generateJWT(user);
                        return user
                    }
                    else
                        return {}
                }else{
                    return {};
                }
                
            })
            .catch((err:Error[])=>{
                console.log("Errors: ", err)
                return {};
            })
    }
}