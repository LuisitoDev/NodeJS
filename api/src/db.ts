import {DataSource} from 'typeorm'
import {Usuario} from "./models/Usuario"
import {Nivel} from "./models/Nivel"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "project",
    entities: [Usuario, Nivel],
    logging: false,
    synchronize: true
})