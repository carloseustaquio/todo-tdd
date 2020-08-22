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

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allTodos = await TodoModel.find({})
    res.status(200).json(allTodos)
  } catch (err) {
    next(err)
  }
}

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const todoModel = await TodoModel.findById(id)

    if (todoModel) {
      return res.status(200).json(todoModel)
    } else {
      return res.status(404).send()
    }

  } catch (err) {
    next(err)
  }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false
    })

    if (updatedTodo) {
      res.status(200).json(updatedTodo)
    } else {
      res.status(404).send()
    }

  } catch (err) {
    next(err)
  }
}
