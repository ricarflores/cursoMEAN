import {Request, Response } from "express";
import Usuarios from './clases/Usuarios';
import {Response as R} from './clases/';
import {Types} from 'mongoose'


const getUsuario = (req:Request, res:Response):void =>{

}
const deleteUser = (req:Request, res:Response):void =>{
    console.log("delete");
    let id = Types.ObjectId(req.params.id)
    let user:Usuarios = new Usuarios(req.body);
    user.delete(id)
        .then((u)=>{
            const response = new R(u, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err)=>{
            const response = new R(null, req.method,err);
            res.status(response.getStatusCode()).json(response.data())
        })
}
const listUsuario = (req:Request, res:Response):void =>{
    let user:Usuarios = new Usuarios(req.body);
    user.Get()
        .then((u)=>{
            const response = new R(u, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err)=>{
            const response = new R(null, req.method, err);
            res.status(response.getStatusCode()).json(response.data())
        })
}
const getUser = (req:Request, res:Response):void =>{
    console.log("get");
    let id = Types.ObjectId(req.params.id)
    let user:Usuarios = new Usuarios(req.body);
    user.Get(id)
        .then((u)=>{
            const response = new R(u, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err)=>{
            const response = new R(null, req.method,err);
            res.status(response.getStatusCode()).json(response.data())
        })
}
const putUser = (req:Request, res:Response):void =>
{
    let user:Usuarios = new Usuarios(req.body);
    console.log("get");
    let id =Types.ObjectId(req.params.id)
    user.put(id)
        .then((u:any)=>{
            const response = new R(u, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err:any)=>{
            const response = new R(null, req.method,err);
            res.status(response.getStatusCode()).json(response.data())
        })
}
const postUser = (req:Request, res:Response):void =>{
    console.log("post");
    let user:Usuarios = new Usuarios(req.body)
    user.post()
        .then((u:any)=>{
            if(u && u._id){
                const response = new R(u,req.method)
                /*
                { emial, username } = u,
                mail = new Mail(email,username)
                mail.sendEmail()
                console.log("mail: ",u)
                */
               res.status(response.getStatusCode()).json(response.data())

            }
        })
        .catch((e:any)=>
        {
            const response = new R(null,req.method,e)
            res.status(response.getStatusCode()).json(response.data())
        }) 
}
const login = (req:Request, res:Response):void =>{
    let user:Usuarios = new Usuarios(req.body)
    user.Login(req.params.email)
        .then((user)=>{
            //console.log(user.token)
            const response  = new R(user,req.method)
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err)=>{
            const response  = new R({},req.method,err)
            res.status(response.getStatusCode()).json(response.data())
        })
}
 
export{
    getUsuario,
    listUsuario,
    postUser,
    putUser,
    getUser,
    deleteUser,
    login
}