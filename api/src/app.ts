import express from "express"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"

import userRoutes from "./routes/user.routes"
import nivelRoutes from "./routes/nivel.routes"

//Inicio de endpoint
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({ 
  limit: '50mb',
  extended: true
})); 

//Rutas
app.use("/api/usuario", userRoutes)
app.use("/api/nivel", nivelRoutes)

export default app;