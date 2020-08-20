import express from 'express'
const app = express()

app.get("/", (req, res) => {
  res.json("Hello World!")
})

app.listen(4000, () => {
  console.log("The server is running!")
})