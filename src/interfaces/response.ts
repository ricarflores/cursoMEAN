import { Usuarios } from "./"
interface UsuarioResponse{
    code:number;
    error:boolean;
    data:Usuarios | Usuarios[] | null | {};
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