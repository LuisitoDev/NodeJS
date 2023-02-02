import {body, param, check, validationResult, checkSchema} from 'express-validator'
import {validationHandler, messagesFields} from './validationHandler'
import {validateDuplicateEmailPasswordNullUser, validateUserExists, validateDuplicateEmailAndPasswordUser} from '../validateObjects'



export const signIn = [
    body('email')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField)
        .isEmail().withMessage(messagesFields.invalidEmail),
    body('password')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField),
    validationHandler
];


export const signUp = [
    body('email')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField).bail()
        .isEmail().withMessage(messagesFields.invalidEmail),
    body('username')
        .notEmpty().withMessage(messagesFields.emptyField).bail(),
    body('password')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField).bail()
        ,
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$.%^&*])(?=.{8,})/).withMessage('The password is not strong enough'),
    body('name')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField),
    validationHandler,

    validateDuplicateEmailAndPasswordUser
];



export const getUser = [
    param('userId')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField),
    validationHandler,

    validateUserExists
];

export const updateUser = [
    body('name')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField),
    body('phone')
        .exists().withMessage(messagesFields.emptyField).bail()
        .notEmpty().withMessage(messagesFields.emptyField).bail()
        .isMobilePhone('en-US').withMessage(messagesFields.invalidPhone),
    validationHandler    
]

