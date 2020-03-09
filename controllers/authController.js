const { promisify } = require("util")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d"
  })
}

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm
  })
  // disabling token on signUp
  // const token = signToken(newUser._id)
  res.status(201).json({
    status: "success",
    // token,
    data: {
      user: newUser
    }
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400))
  }
  // check if user exists && password is correct
  // need to select psw because it is hidden by default
  const user = await User.findOne({ email }).select("+password")

  // calling instance method
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401))
  }
  // if everything is ok, send token to client
  const token = signToken(user._id)
  res.status(201).json({
    status: "success",
    token
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  // get token and check if it exists
  let token
  const auth = req.headers.authorization
  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1]
  }
  // else if (req.cookies.jwt) {
  //   token = req.cookies.jwt
  // }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    )
  }
  // validate token into decoded payload
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // check if user still exists
  const user = await User.findById(decoded.id)
  if (!user) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    )
  }
  next()
})
