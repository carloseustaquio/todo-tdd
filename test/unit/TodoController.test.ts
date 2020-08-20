import * as TodoController from "../../controllers/todo.controller"

describe("TodoController.createTodo", () => {
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function")
  })
})