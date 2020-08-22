import { Router } from "express"
import * as TodoController from "../controllers/todo.controller"

const router = Router()

router.post("/", TodoController.createTodo)

export default router 
