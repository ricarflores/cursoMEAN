import {Usuairos as IUsuarios} from '../../interfaces/'

export default class Usuario{
    private email: IUsuarios["email"];
    private password: IUsuarios["password"];
    private userType: IUsuarios["userType"];
    private createdAt : IUsuarios["createdAt"];
    private updatedAt : IUsuarios["updatedAt"];
    private userName: IUsuarios["userName"];
    constructor(body:IUsuarios){
        const { email, userName, password , userType, createdAt , updatedAt } = body;
        this.email = email;
        this.password = password
        this.createdAt = createdAt;
        this.userType = userType;
        this.updatedAt = updatedAt;
        this.userName = userName;
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