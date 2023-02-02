import {Nivel} from "../models/Nivel"



export const findAll = async () => {
    
    const nivelSelect = await Nivel.createQueryBuilder('nivel')
    .leftJoinAndSelect('nivel.usuarios', 'usuario')
    .where('nivel.active = true')
    .getMany();

    return nivelSelect;
}

export const findById = async (id: any) => {
    
    const nivelSelect = await Nivel.createQueryBuilder('nivel')
    .where('nivel.id = :id', {id: id})
    .getOne();

    return nivelSelect;
}


export const createNivel = async (nombre : string, req: Express.Request) => {
    const nivelModel = new Nivel();
    nivelModel.nombre = nombre;

    const nivelCreated = await req.queryRunner?.manager.save(nivelModel)
    
    return nivelCreated;
}

export const updateNivel = async (id: number, nombre : string, req: Express.Request) => {
    const nivelModel = new Nivel();
    nivelModel.id = id;
    nivelModel.nombre = nombre;

    const nivelCreated = await req.queryRunner?.manager.save(nivelModel)
    
    return nivelCreated;
}


export const deleteNivel = async (id: number, req: Express.Request) => {
    const nivelModel = new Nivel();
    nivelModel.id = id;
    nivelModel.active = false;

    const nivelCreated = await req.queryRunner?.manager.save(nivelModel)
    
    return nivelCreated;
}



