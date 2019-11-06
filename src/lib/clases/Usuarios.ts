import {Usuairos as IUsuarios} from '../../interfaces/'

export default class Usuario{
    private email: IUsuarios["email"];
    private password: IUsuarios["password"];
    private userType: IUsuarios["userType"];
    private createdAt : IUsuarios["createdAt"];
    private updatedAt : IUsuarios["updatedAt"];

    constructor(body:IUsuarios){
        const { email,password,userType } = body;
        this.email = email;
        this.password = password
        this.createdAt = Date.now();
        this.userType = userType;
        this.updatedAt = Date.now();
    }
    listUsuario(){
        
    }
    getUsuario(){
        
    }
    postUsuario(){
    }
    updateUsuario(){

    }
    deleteUsuario(){

    }
}