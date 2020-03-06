const express = require("express")
const colors = require("colors")
const morgan = require("morgan")

const monsterRouter = require("./routes/monsterRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

// middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
app.use(express.json())

// serve static files
app.use(express.static(`${__dirname}/public/`))

// routes
app.use("/api/v1/monsters", monsterRouter)
app.use("/api/v1/users", userRouter)

// undefined routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`
  })
})

// start server
module.exports = app
