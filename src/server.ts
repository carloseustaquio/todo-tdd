import { app } from "./app"

const port = 4000

app.listen(port, () => {
  console.log("The server is running on port: " + port)
})
