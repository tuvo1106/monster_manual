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
  const token = signToken(newUser._id)
  res.status(201).json({
    status: "success",
    token,
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
