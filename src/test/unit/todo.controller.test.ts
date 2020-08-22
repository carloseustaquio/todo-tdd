import * as TodoController from "../../controllers/todo.controller"
import TodoModel from "../../model/todo.model"
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http"
// mock data
import newTodo from "../mock-data/new-todo.json"
import allTodos from "../mock-data/all-todos.json"

TodoModel.create = jest.fn() as jest.Mock // Mock/Spy Function
TodoModel.find = jest.fn() as jest.Mock

let req: MockRequest<any>, res: MockResponse<any>, next: jest.Mock

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe("TodoController.getTodos", () => {

  it("should hava a getTodo function", () => {
    // Test done just to follow the course, 
    // TypeScript automatically test this for me!
    expect(typeof TodoController.getTodo).toBe("function")
  })

  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodo(req, res, next)
    expect(TodoModel.find).toBeCalled()
  })

  it("should return response with status 200", async () => {
    await TodoController.getTodo(req, res, next)
    expect(res.statusCode).toBe(200)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it("should return response with all todos", async () => {
    (TodoModel.find as jest.Mock).mockReturnValue(allTodos)
    await TodoController.getTodo(req, res, next)
    expect(res._getJSONData()).toStrictEqual(allTodos)
  })

  it("should handle errors in getTodos", async () => {
    const errorMessage = { message: "Error finding" }
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.find as jest.Mock).mockReturnValue(rejectedPromise);
    await TodoController.getTodo(req, res, next)
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