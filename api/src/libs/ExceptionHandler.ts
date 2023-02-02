import { Request, Response } from 'express'
import { writeLog } from "./log"
import * as message from "./statusResponse"

class ExceptionHandler{

    message;
    codeError;

    constructor (message: String, codeError = 403){
        this.message = message;
        this.codeError = codeError;
    }

    getMessage(){
        return this.message;
    }

    getCodeError(){
        return this.codeError;
    }
    
}

const handleException = async (req: Request, res: Response, exception: any) => {
    let messageError;
    let codeError = 403;
    if (exception instanceof ExceptionHandler) {
        messageError = exception.getMessage();
        codeError = exception.getCodeError();
    } else {
        writeLog(exception);
        console.log(exception);
        messageError = "An error has ocurred";
    }

    if(req.queryRunner){
        await req.queryRunner.rollbackTransaction();
    }

    return res.status(codeError).json({status: message.statusResponse.ERROR, message:messageError})
}

export { ExceptionHandler, handleException };

