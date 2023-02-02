import {Usuario} from "../models/Usuario"
import {comparePassword} from "../libs/Encryptation"

export const signIn = async (nickname: string, password: string) => {
    const userSelect = await Usuario.createQueryBuilder('usuario')
    .where('usuario.nickname = :nickname', {nickname: nickname})
    .andWhere('usuario.password is not null')
    .andWhere('usuario.active = true')
    .addSelect("usuario.password")
    .getOne();

    if (userSelect === null)
        return null;

    if (await comparePassword(password, userSelect.password))
        return userSelect;
    else
        return null;

}


export const findAll = async () => {
    
    const userSelect = await Usuario.createQueryBuilder('usuario')
    .leftJoinAndSelect('usuario.nivel', 'nivel')
    .andWhere('usuario.active = true')
    .getMany();

    return userSelect;
}

export const findById = async (id: any) => {
    
    const userSelect = await Usuario.createQueryBuilder('usuario')
    .where('usuario.id = :id', {id: id})
    .getOne();

    return userSelect;
}


export const createUser = async (nombre : string, appellido_paterno : string, appellido_materno : string, nickname : string, password : string, id_nivel : any, req: Express.Request) => {
    const userModel = new Usuario();
    userModel.nombre = nombre;
    userModel.appellido_paterno = appellido_paterno;
    userModel.appellido_materno = appellido_materno;
    userModel.nickname = nickname;
    userModel.password = password;
    userModel.nivel = id_nivel;

    const userCreated = await req.queryRunner?.manager.save(userModel)
    
    return userCreated;
}

export const updateUser = async (id: number, nombre : string, appellido_paterno : string, appellido_materno : string, id_nivel : any, req: Express.Request) => {
    const userModel = new Usuario();
    userModel.id = id;
    userModel.nombre = nombre;
    userModel.appellido_paterno = appellido_paterno;
    userModel.appellido_materno = appellido_materno;
    userModel.nivel = id_nivel;

    const userCreated = await req.queryRunner?.manager.save(userModel)
    
    return userCreated;
}


export const findByIdPassword = async (id_user: any, password: any) => {
    const userSelect = await Usuario.find({
        where: [
            {  
                id: id_user,
                password: password
            }
        ],
    })

    return userSelect;
}



export const deleteUser = async (id: number, req: Express.Request) => {
    const userModel = new Usuario();
    userModel.id = id;
    userModel.active = false;

    const userCreated = await req.queryRunner?.manager.save(userModel)
    
    return userCreated;
}