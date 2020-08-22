import mongoose from "mongoose"

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://SuperTestUser:supertestuser1@cluster0.ca6kf.gcp.mongodb.net/todo-tdd?retryWrites=true&w=majority"
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// export default client

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://SuperTestUser:supertestuser1@cluster0.ca6kf.gcp.mongodb.net/todo-tdd?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

export { connect }