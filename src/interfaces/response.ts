import { Usuairos } from "./"
interface UsuarioResponse{
    code:number;
    error:boolean;
    data:Usuairos | Usuairos[] | null | {};
    message: Error[] | string;
}

interface Error{
    message:string;
    name:string;
    properties:{
        message:string;
        type:string;
        path:string;
        value:string;
    };
    kidn:string;
    path:string;
    value:string;
}
export{
    UsuarioResponse,
    Error
}