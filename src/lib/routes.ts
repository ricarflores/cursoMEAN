import {Request, Response } from "express"
import {Server as Main} from "../interfaces/"
import { 
    getUsuario,
    listUsuario,
    postUser,
    putUser,
    getUser,
    deleteUser,
    login
} from '../lib/controler';
import { Params } from '../lib/midlewares/params'
export default class Routes{
    constructor(private app:Main["app"],private socket: Main['socket']){

    }
    appRoutes(){
        //this.app.get("/v1/", (req:Request, res:Response) => res.status(200).send(":v"))
        this.app.get("/v1/",listUsuario)
        this.app.get("/v1/:id",Params,getUser)
        this.app.post("/v1/", postUser)
        this.app.put("/v1/:id",Params,putUser)
        this.app.delete("/v1/:id",Params,deleteUser)
        this.app.post("/v1/:email/login", login)
    }
    socketRoutes(){

    }
    routesCongif(){
        this.appRoutes()
    }
}