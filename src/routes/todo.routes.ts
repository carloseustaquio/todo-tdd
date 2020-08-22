import { Router } from "express"
import * as TodoController from "../controllers/todo.controller"

const router = Router()

router.post("/", TodoController.createTodo)
router.get("/", TodoController.getTodo)

export default router 
