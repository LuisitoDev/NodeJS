import {validationResult, matchedData} from 'express-validator'
import {Request, Response, NextFunction} from 'express'
import fs from "fs"

export const messagesFields = {
    notSendedField : 'This field was not sended',
    emptyField : 'This field is empty',
    invalidDate : 'This date is invalid',
    invalidPhone : 'This phone is invalid',
    dateHasExpired : 'This date has expired',
    invalidField : 'This field is invalid',
    fieldMustBeNumeric : 'This field must be numeric',
    fieldGreaterThanZero : 'The field must be greater than zero',
    mustBeNumericAndPositive : 'This field must be numeric and must be greater than zero',
    invalidEmail : 'Invalid email address'
}


export const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        console.log(errors);
        return res.status(422).jsonp(errors.array());
    }

    //TODO: REVISAR ESTO:
    const bodyData = matchedData(req, {locations:['body'], includeOptionals:true});

    req.body = bodyData;

    next();
}

