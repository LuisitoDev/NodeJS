
import {ExceptionHandler, handleException} from "../libs/ExceptionHandler"
import { Request, Response, NextFunction} from 'express'
import * as userQry from "../sql/user.queries"
import { Console } from "console"

import fs from "fs"

import dotenv from "dotenv"

dotenv.config()

// export const validateDuplicateEmailAdmin = async (req: Request, res: Response,next: NextFunction) => {
//     try {
//         const email = req.body.email
//         const emailDuplicate = await adminQry.findByEmail(email);

//         if (emailDuplicate)
//             throw new ExceptionHandler("The email already exists")

//         next()
//     }catch(exception){
//         return handleException(req, res, exception);
//     }
// }


// export const validateDuplicateEmailUser = async (req: Request, res: Response,next: NextFunction) => {
//     try {
//         const email = req.body.email
//         const emailDuplicate = await userQry.findByEmail(email);

//         if (emailDuplicate)
//             throw new ExceptionHandler("The email already exists")

//         next()
//     }catch(exception){
//         return handleException(req, res, exception);
//     }
// }

//TODO: NOT WORKING
export const validateDuplicateEmailPasswordNullUser = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const email = req.body.email
        const emailDuplicate = await userQry.signIn(email, "");

        if (emailDuplicate !== null)
            throw new ExceptionHandler("The email already exists")

        next()
    }catch(exception){
        return handleException(req, res, exception);
    }
}


export const validateDuplicateEmailAndPasswordUser = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const emailDuplicate = await userQry.signIn(email, password);

        if (emailDuplicate !== null)
            throw new ExceptionHandler("The email already exists")

        next()
    }catch(exception){
        return handleException(req, res, exception);
    }
}



// export const validateLastPassword = async (req: Request, res: Response,next: NextFunction) => {
//     try {
//         const id_user = req.id_user
//         const lastPassword = req.body.lastPassword
        
//         const userFound = await userQry.findByIdPassword(id_user, lastPassword);

//         if (userFound.length == 0)
//             throw new ExceptionHandler("The last password does not match")

//         next()
//     }catch(exception){
//         return handleException(req, res, exception);
//     }
// }

export const validateUserExists = async (req: Request, res: Response,next: NextFunction)  => {
    try {
        const userId = req.params.userId

        const userFound = await userQry.findById(userId)

        if (!userFound) 
            throw new ExceptionHandler("No User found")

        next()
    }catch(exception){
        return handleException(req, res, exception);
    }
}

