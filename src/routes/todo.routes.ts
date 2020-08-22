import { Router } from "express"
import * as TodoController from "../controllers/todo.controller"

const router = Router()

router.post("/", TodoController.createTodo)
router.get("/", TodoController.getTodos)
router.get("/:id", TodoController.getTodoById)
router.put("/:id", TodoController.updateTodo)

export default router 
