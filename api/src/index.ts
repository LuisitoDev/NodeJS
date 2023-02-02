import "reflect-metadata"
import {AppDataSource} from "./db"
import app from "./app"

import dotenv from "dotenv"

dotenv.config()

//Inicio de app
async function main () {
    try {
        const port = Number(process.env.PORT) || Number(process.env.CUSTOMIZE_PORT)
        //Inicializar DB
        await AppDataSource.initialize()
        
        app.listen(port)
        console.log("Server is listening on port", port)
    } catch (error) {
        console.error(error)
    }
}

main()