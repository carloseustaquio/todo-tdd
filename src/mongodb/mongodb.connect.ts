import mongoose from "mongoose"

async function connect() {
  try {
    await mongoose.connect(`${process.env.DB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

export { connect }