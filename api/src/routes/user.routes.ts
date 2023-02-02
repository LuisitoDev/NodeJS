import {Router} from "express"
const router = Router ()

//Middlewares necesarios
import { authJWT, validationModels } from "../middlewares/index"
const vUser = validationModels.validateUser

//Controladores necesarios
import * as userController from "../controllers/user.controller"
import * as transactions from "../middlewares/transactions"

//Endpoints
router.get("/", userController.getAllUsers)

router.post("/signin", userController.signIn)

router.post("/signup", transactions.startSession, userController.createUser, transactions.endSession)

router.put("/", transactions.startSession, userController.updateUser, transactions.endSession)

router.delete("/", transactions.startSession, userController.deleteUser, transactions.endSession)


export default router