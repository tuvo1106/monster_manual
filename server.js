const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const app = require("./app")

const { MONGO_CONNECTION_STR, MONGO_PSW, PORT } = process.env
const mongoDB = MONGO_CONNECTION_STR.replace("<PASSWORD>", MONGO_PSW)

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected.".blue)
  })

const port = PORT
app.listen(port, () => {
  console.log(`App running on port ${port}`.red.bold)
})
