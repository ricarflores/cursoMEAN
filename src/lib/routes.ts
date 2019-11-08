import {Request, Response } from "express"
import {Server as Main} from "../interfaces/"
import { 
    getUsuario,
    listUsuario,
    postUser,
    putUser,
    getUser,
    deleteUser
} from '../lib/controler';
import { Params } from '../lib/midlewares/params'
export default class Routes{
    constructor(private app:Main["app"],private socket: Main['socket']){

    }
    appRoutes(){
        this.app.get("/",listUsuario)
        this.app.get("/:id",Params,getUser)
        this.app.post("/", postUser)
        this.app.put("/:id",Params,putUser)
        this.app.delete("/:id",Params,deleteUser)
    }
    socketRoutes(){

    }
    routesCongif(){
        this.appRoutes()
    }
}