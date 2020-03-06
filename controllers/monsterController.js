const Monster = require("../models/monsterModel")
const APIFeatures = require("../utils/apiFeatures")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

exports.getAllMonsters = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Monster.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const monsters = await features.query
  res
    .status(200)
    .json({ status: "success", results: monsters.length, data: monsters })
})

exports.getMonster = catchAsync(async (req, res, next) => {
  const monster = await Monster.findById(req.params.id)
  if (!monster) return next(new AppError("No tour found with this ID.", 404))
  res.status(200).json({ status: "success", data: monster })
})

exports.createMonster = catchAsync(async (req, res, next) => {
  const newMonster = await Monster.create(req.body)
  res.status(201).json({ status: "success", data: newMonster })
})

exports.updateMonster = catchAsync(async (req, res, next) => {
  const monster = await Monster.findByIdAndUpdate(req.params.id, req.body, {
    // return new document
    new: true
  })
  if (!monster) return next(new AppError("No tour found with this ID.", 404))
  res.status(200).json({ status: "success", data: monster })
})

exports.deleteMonster = catchAsync(async (req, res, next) => {
  const monster = await Monster.findByIdAndDelete(req.params.id)
  if (!monster) return next(new AppError("No tour found with this ID.", 404))
  res.status(204).json({ status: "success", data: null })
})
