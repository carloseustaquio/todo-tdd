import { Router } from "express"
import * as TodoController from "../controllers/todo.controller"

const router = Router()

router.post("/", TodoController.createTodo)
router.get("/", TodoController.getTodos)
router.get("/:id", TodoController.getTodoById)

export default router 
