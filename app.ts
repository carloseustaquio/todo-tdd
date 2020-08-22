import express from 'express'
import todoRoutes from "./routes/todo.routes"
// import mongodbClient from "./mongodb/mongodb.connect"
import * as mongodb from "./mongodb/mongodb.connect"


// mongodbClient.connect()
mongodb.connect()

const app = express()

app.use(express.json())

app.use("/todos", todoRoutes)

app.get("/", (req, res) => {
  res.json("Hello World!")
})

export { app }