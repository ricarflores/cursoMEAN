import {Request, Response } from "express"
import {Server as Main} from "../interfaces/"
import { 
    getUsuario,
    postUsuario,
    updateUsuario,
    deleteUsuario,
    listUsuario 
} from '../lib/controler';

export default class Routes{
    constructor(private app:Main["app"],private socket: Main['socket']){

    }
    appRoutes(){
        this.app.get("/",(req: Request,res:Response)=>res.status(200).send(":V"))
    }
    socketRoutes(){

    }
    routesCongif(){
        this.appRoutes()
    }
}