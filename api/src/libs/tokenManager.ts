import jwt from "jsonwebtoken"

import dotenv from "dotenv"
import { ExceptionHandler } from "./ExceptionHandler";

dotenv.config()

export const generateEncryptedToken = (dataParam: any) => {
    const secret: any = process.env.SECRET;
    
    return jwt.sign({ data: dataParam }, secret, { expiresIn: process.env.EXPIRE_TOKEN_TIME })
}

export const getDecryptedToken = (token: any) => {
    try{
        const secret: any = process.env.SECRET;

        return jwt.verify(token, secret)
    }
    catch(exeption : any){
        if (exeption.message == "jwt expired")
            throw new ExceptionHandler("El token ha expirado")
        else
            throw exeption
    }
}