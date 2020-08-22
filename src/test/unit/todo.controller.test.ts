import * as TodoController from "../../controllers/todo.controller"
import TodoModel from "../../model/todo.model"
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http"
// mock data
import newTodo from "../mock-data/new-todo.json"
import allTodos from "../mock-data/all-todos.json"
import savedTodo from "../mock-data/saved-todo.json"

TodoModel.create = jest.fn() // Mock/Spy Function
TodoModel.find = jest.fn()
TodoModel.findById = jest.fn()
TodoModel.findByIdAndUpdate = jest.fn()

let req: MockRequest<any>, res: MockResponse<any>, next: jest.Mock
const todoId = "5f412adc87d61749601f6536"

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe("TodoController.update", () => {
  it("should have a updateTodo function", () => {
    expect(typeof TodoController.updateTodo).toBe("function")
  })

  it("should call TodoModel.findByIdAndUpdate", async () => {
    req.params.id = todoId
    req.body = newTodo
    await TodoController.updateTodo(req, res, next)
    expect(TodoModel.findByIdAndUpdate)
      .toHaveBeenCalledWith(todoId, newTodo, {
        new: true,
        useFindAndModify: false
      })
  })

  it("should return a response with json data and status code 200", async () => {
    req.params.id = todoId
    req.body = newTodo;
    (TodoModel.findByIdAndUpdate as jest.Mock).mockReturnValue(newTodo)
    await TodoController.updateTodo(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })

  it("should handle errors in updateTodo", async () => {
    const errorMessage = { message: "Error finding" }
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.findByIdAndUpdate as jest.Mock).mockReturnValue(rejectedPromise);
    await TodoController.updateTodo(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it("should return 404 id item can't be found", async () => {
    (TodoModel.findByIdAndUpdate as jest.Mock).mockReturnValue(null)
    await TodoController.updateTodo(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })

})

describe("TodoController.getTodoById", () => {
  it("should have a getTodoByIdFunction", () => {
    expect(typeof TodoController.getTodoById).toBe("function")
  })

  it("should call TodoModel.getById(id) with id parameter", async () => {
    req.params.id = todoId
    await TodoController.getTodoById(req, res, next)
    expect(TodoModel.findById).toBeCalledWith(todoId)
  })

  it("should return response with todo", async () => {
    (TodoModel.findById as jest.Mock).mockReturnValue(savedTodo)
    await TodoController.getTodoById(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(savedTodo)
  })

  it("should handle errors in getTodoById", async () => {
    const errorMessage = { message: "Error finding" }
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.findById as jest.Mock).mockReturnValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })

  it("should return 404 when item doesn't exist", async () => {
    (TodoModel.findById as jest.Mock).mockReturnValue(null)
    await TodoController.getTodoById(req, res, next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled()).toBeTruthy()
  })
})

describe("TodoController.getTodos", () => {
  it("should hava a getTodo function", () => {
    expect(typeof TodoController.getTodos).toBe("function")
  })

  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodos(req, res, next)
    expect(TodoModel.find).toBeCalled()
  })

  it("should return response with all todos", async () => {
    (TodoModel.find as jest.Mock).mockReturnValue(allTodos)
    await TodoController.getTodos(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res._getJSONData()).toStrictEqual(allTodos)
  })

  it("should handle errors in getTodos", async () => {
    const errorMessage = { message: "Error finding" }
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.find as jest.Mock).mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next)
    expect(next).toHaveBeenCalledWith(errorMessage)
  })
})

describe("TodoController.createTodo", () => {

  beforeEach(() => {
    req.body = newTodo
  })

  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function")
  })

  it("should call TodoModel.create", () => {
    TodoController.createTodo(req, res, next)
    expect(TodoModel.create).toBeCalledWith(newTodo)
  })

  it("should return 201 response code", async () => {
    await TodoController.createTodo(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it("should return json body in response", async () => {
    (TodoModel.create as jest.Mock).mockReturnValue(newTodo)
    await TodoController.createTodo(req, res, next)
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })

  it("should handle errors", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.create as jest.Mock).mockReturnValue(rejectedPromise)
    await TodoController.createTodo(res, res, next)
    expect(next).toBeCalledWith(errorMessage)
  })
})