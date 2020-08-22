import { Request, Response } from "express"
import TodoModel from "../model/todo.model"

export const createTodo = async (req: Request, res: Response) => {
  const createdModel = await TodoModel.create(req.body)
  res.status(201).json(createdModel)
}