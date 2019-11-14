'use strict';
import express, { Request, Response, NextFunction} from 'express';
import { Types } from 'mongoose';
import {Response as R} from '../clases/';
const Params = (req: Request,res:Response, next: NextFunction) =>{
    const ObjectId = Types.ObjectId;
    const params = req.params.id;
    let validate = true;

    if(ObjectId.isValid(params))
    {
        next()
    }
    else{
        
        res.status(500).send("Id Incorrecto")
    }
}
const jsonParams = (req: Request,res:Response, next: NextFunction) =>{
    const jwt = req.query;
    console.log(jwt)
    next()
}

export{
    Params,
    jsonParams
}