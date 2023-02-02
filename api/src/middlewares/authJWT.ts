import { Request, Response, NextFunction} from "express"
import { getDecryptedToken } from "../libs/tokenManager"
import {ExceptionHandler, handleException} from "../libs/ExceptionHandler"
import * as userQry from "../sql/user.queries"

export const verifyTokenUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["x-access-token"]
        
        if (!token) 
            throw new ExceptionHandler("No x-access-token provided")
        
        const decoded :any = getDecryptedToken(token) 

        const emailUser = decoded.data.email
        const passwordUser = decoded.data.password
        
        console.log(decoded.data)

        const userSelect = await userQry.signIn(emailUser, passwordUser);

        if (userSelect === null)
            throw new ExceptionHandler("Incorrect User Token", 404)

        req.id = userSelect.id

        next() 
    } catch (exception) {
        return handleException(req, res, exception);
    }

}
