import request from "supertest"
import { app } from "../../app"
import newTodo from "../mock-data/new-todo.json"

const endpointUrl = "/todos/"

let firstTodo: any, newTodoId: any;
const testData = { title: "Make integration tests for PUT", done: true }
const nonExistingTodoId = "5f412adc87daa749771f6536"

describe(endpointUrl, () => {
  test("GET " + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body[0].title).toBeDefined()
    expect(response.body[0].done).toBeDefined()
    firstTodo = response.body[0]
  })

  test("GET by Id " + endpointUrl + ":id", async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id)
    expect(response.status).toBe(200)
    expect(response.body.title).toBe(firstTodo.title)
    expect(response.body.done).toBe(firstTodo.done)
  })

  test("GET todo by Id doesn't exist " + endpointUrl + ":id", async () => {
    const response = await request(app).get(endpointUrl + nonExistingTodoId)
    expect(response.status).toBe(404)
  })

  it("POST " + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newTodo)
    expect(response.status).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)
    newTodoId = response.body._id
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

  it("PUT " + endpointUrl, async () => {
    const res = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe(testData.title)
    expect(res.body.done).toBe(testData.done)
  })

  test("PUT todo by Id doesn't exist " + endpointUrl + ":id", async () => {
    const response = await request(app).put(endpointUrl + nonExistingTodoId)
    expect(response.status).toBe(404)
  })

  it("DELETE todo by id" + endpointUrl, async () => {
    const res = await request(app)
      .delete(endpointUrl + newTodoId)
      .send()
    expect(res.status).toBe(200)
    expect(res.body.title).toBe(testData.title)
    expect(res.body.done).toBe(testData.done)
  })

  it("should return 404 if todo doesn't exist" + endpointUrl, async () => {
    const res = await request(app)
      .delete(endpointUrl + nonExistingTodoId)
      .send()
    expect(res.status).toBe(404)
  })
})