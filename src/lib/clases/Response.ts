import {Usuarios as IUsuarios, UsuarioResponse, Error} from '../../interfaces'
export default class Response{
    private usuario : IUsuarios | IUsuarios[] | null | {};
    private method : string;
    private errors : Error[]|any|null;
    private statusCode : number;
    private error: boolean;
    constructor(usuario:IUsuarios | IUsuarios[] | null | {}, method: string, errors?:Error[]){
        this.usuario = usuario;
        this.method = method;
        this.error = (!this.usuario && errors) ? true: false;
        this.errors = (errors) ? errors : null;
        this.statusCode = this.setCode();
    }
    getStatusCode(){
        return this.statusCode;
    }
    data():UsuarioResponse{
        return{
            code:this.statusCode,
            error:this.error,
            data:this.usuario,
            message:this.message()
        }
    }
    message(){
        if(this.errors) return this.errors
        else return (this.method==="GET")
                    ? this.getMessage()
                    : (this.method==="POST")
                        ? this.postMessage()
                        : (this.method==="PUT")
                            ? this.putMessage()
                            : (this.method==="DELETE")
                                ? this.deleteMessage()
                                : 405
    }
    getMessage(){
        return (Array.isArray(this.usuario))
            ? "Usuario obtenido con exito"
            : (this.statusCode !== 404)
                ? "Personaje Obtenido con exito"
                : "No se encontro al usuairo"
    }
    postMessage(){
        return (this.statusCode === 201)
            ? "Usuario añadido correctamente"
            : "Error al ingresar el personaje"
    }
    putMessage(){
        return (this.statusCode===200)
            ? "Usuario Acrtualizado Correctamente"
            : "Ocurrio un problema al actualizar el usuario"
    }
    deleteMessage(){
        return (this.statusCode === 200)
            ? "El usuario fue eliminado Correctamente"
            : "Ocurrio un problema al eliminar el usuario"
    }
    setCode(){
        return (this.method==="GET")
                ? this.getCode()
                : (this.method==="POST")
                    ? this.postCode()
                    : (this.method==="PUT")
                        ? this.putCode()
                        : (this.method==="DELETE")
                        ? this.deleteCode()
                        : 405
    }
    getCode():number{
        return ((Array.isArray(this.usuario)) || (this.usuario && Object.entries(this.usuario).length >=1) && (!this.errors))
                ? 200
                : (this.usuario && Object.entries(this.usuario).length < 1 && !this.error)
                    ? 404
                    : 500
    }
    postCode():number{
        return ((Array.isArray(this.usuario)) || (this.usuario && Object.entries(this.usuario).length >=1) && (!this.errors))
                ? 201
                : 409
    }
    putCode():number{
        return ((Array.isArray(this.usuario)) || (this.usuario && Object.entries(this.usuario).length >=1) && (!this.errors))
                ? 200
                : (this.usuario && Object.entries(this.usuario).length < 1 && !this.error)
                    ? 404
                    : 500
    }
    deleteCode():number{
        return (this.error)
            ? 500
            : (!this.error && !this.usuario)
                ? 404
                : 200
    }
}