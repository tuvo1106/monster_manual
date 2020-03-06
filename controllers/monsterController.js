const Monster = require("../models/monsterModel")
const APIFeatures = require("../utils/apiFeatures")
const catchAsync = require("../utils/catchAsync")

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
  res.status(200).json({ status: "success", data: monster })
})

exports.deleteMonster = catchAsync(async (req, res, next) => {
  await Monster.findByIdAndDelete(req.params.id)
  res.status(204).json({ status: "success", data: null })
})
