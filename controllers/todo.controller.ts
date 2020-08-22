import { Request, Response } from "express"
import TodoModel from "../model/todo.model"
import { NextFunction } from "express"

export const createTodo = (req: Request, res: Response) => {
  const createdModel = TodoModel.create(req.body)
  res.status(201).json(createdModel)
}