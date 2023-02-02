import { Request, Response, NextFunction} from 'express'
import {ExceptionHandler, handleException} from "../libs/ExceptionHandler"
import {AppDataSource} from "../db"
import fs from "fs"

import dotenv from "dotenv"

dotenv.config()

export const startSession = async (req: Request, res: Response,next: NextFunction) => {
    
    const queryRunner = AppDataSource.createQueryRunner()
    try {
        await queryRunner.startTransaction()
        
        req.queryRunner = queryRunner;

    }catch(exception){
        return handleException(req, res, exception)
    }
    
    next();
}

export const endSession = async (req: Request, res: Response,next: NextFunction) => {
    try {
        await req.queryRunner?.commitTransaction()
    }catch(exception) {
        return handleException(req, res, exception)
    }
        
    await req.queryRunner?.release()
    next();
}   
