const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const Monster = require("../models/monsterModel")

const { MONGO_CONNECTION_STR, MONGO_PSW } = process.env
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

// read JSON, file will be hidden in production
const monsters = JSON.parse(
  fs.readFileSync(`${__dirname}/bestiary.json`, "utf-8")
)

// import data into DB
const importData = async () => {
  try {
    await Monster.create(monsters)
    console.log("Data sucessfully loaded.")
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// delete all data from DB
const deleteData = async () => {
  try {
    await Monster.deleteMany()
    console.log("Data sucessfully deleted.")
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// waits until mongoose is connected before executing import or delete
mongoose.connection.once("open", () => {
  const argv = process.argv[2]
  if (argv === "--import") {
    importData()
  } else if (argv === "--delete") {
    deleteData()
  }
})
