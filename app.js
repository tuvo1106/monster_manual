const express = require("express")
const colors = require("colors")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")

const AppError = require("./utils/appError")
const monsterRouter = require("./routes/monsterRoutes")
const userRouter = require("./routes/userRoutes")
const globalErrorHandler = require("./controllers/errorController")

const app = express()

// rate limit of 100 requests per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour."
})
app.use("/api", limiter)

// helmet for headers
app.use(helmet())

// logging middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
app.use(express.json())

// serve static files
app.use(express.static(`${__dirname}/public/`))

// routes
app.use("/api/v1/monsters", monsterRouter)
app.use("/api/v1/users", userRouter)

// undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// global error handling middleware
app.use(globalErrorHandler)

// start server
module.exports = app
