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
  const err = new Error(`Can't find ${req.originalUrl} on this server!`)
  err.status = "fail"
  err.statusCode = 404
  next(err)
})

// global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

// start server
module.exports = app
