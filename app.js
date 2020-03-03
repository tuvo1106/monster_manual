const express = require("express")
const colors = require("colors")
const morgan = require("morgan")

const monsterRouter = require("./routes/monsterRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

// middleware
app.use(morgan("dev"))
app.use(express.json())

// routes
app.use("/api/v1/monsters", monsterRouter)
app.use("/api/v1/users", userRouter)

// start server
module.exports = app
