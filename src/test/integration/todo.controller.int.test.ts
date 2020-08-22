import request from "supertest"
import { app } from "../../app"
import newTodo from "../mock-data/new-todo.json"

const endpointUrl = "/todos/"

describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newTodo)
    expect(response.status).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)
  })

  it("should return error 500 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "Missing done property" })
      expect(response.status).toBe(500)
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required."
      })
    })
})