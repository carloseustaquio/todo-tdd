import { Request, Response, NextFunction } from "express"
import TodoModel from "../model/todo.model"

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdModel = await TodoModel.create(req.body)
    res.status(201).json(createdModel)
  } catch (err) {
    next(err)
  }
}

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allTodos = await TodoModel.find({})
    res.status(200).json(allTodos)
  } catch (err) {
    next(err)
  }
}