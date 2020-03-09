const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
  res
    .status(200)
    .json({ status: "success", results: users.length, data: users })
})

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) return next(new AppError("No user found with this ID.", 404))
  res.status(200).json({ status: "success", data: user })
})

exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  res.status(204).json({ status: "success", data: null })
}
