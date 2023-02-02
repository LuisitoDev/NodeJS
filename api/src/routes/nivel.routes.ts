import {Router} from "express"
const router = Router ()

//Middlewares necesarios
import { authJWT, validationModels } from "../middlewares/index"
const vUser = validationModels.validateUser

//Controladores necesarios
import * as nivelController from "../controllers/nivel.controller"
import * as transactions from "../middlewares/transactions"

//Endpoints
router.get("/", nivelController.getNiveles)

router.post("/", transactions.startSession, nivelController.createNivel, transactions.endSession)

router.put("/", transactions.startSession, nivelController.updateNivel, transactions.endSession)

router.delete("/", transactions.startSession, nivelController.deleteNivel, transactions.endSession)

export default router