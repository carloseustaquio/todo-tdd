import express, { Request, Response, NextFunction } from 'express'
import { config as dotEnvConfig } from "dotenv"
import todoRoutes from "./routes/todo.routes"
import * as mongodb from "./mongodb/mongodb.connect"

// configure envaironment variables
dotEnvConfig()

mongodb.connect()

const app = express()

app.use(express.json())

app.use("/todos", todoRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

export { app }