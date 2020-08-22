import * as TodoController from "../../controllers/todo.controller"
import TodoModel from "../../model/todo.model"
import httpMocks, { MockRequest, MockResponse } from "node-mocks-http"
// mock data
import newTodo from "../mock-data/new-todo.json"

TodoModel.create = jest.fn() // Mock/Spy Function

let req: MockRequest<any>, res: MockResponse<any>

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
})

describe("TodoController.createTodo", () => {

  beforeEach(() => {
    req.body = newTodo
  })

  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function")
  })

  it("should call TodoModel.create", () => {
    TodoController.createTodo(req, res)
    expect(TodoModel.create).toBeCalledWith(newTodo)
  })

  it("should return 201 response code", async () => {
    await TodoController.createTodo(req, res)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it("should return json body in response", async () => {
    (TodoModel.create as jest.Mock).mockReturnValue(newTodo)
    await TodoController.createTodo(req, res)
    expect(res._getJSONData()).toStrictEqual(newTodo)
  })
})