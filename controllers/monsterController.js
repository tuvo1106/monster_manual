const Monster = require("../models/monsterModel")
const APIFeatures = require("../utils/apiFeatures")

exports.getAllMonsters = async (req, res) => {
  try {
    const features = new APIFeatures(Monster.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const monsters = await features.query
    res
      .status(200)
      .json({ status: "success", results: monsters.length, data: monsters })
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err
    })
  }
}

exports.getMonster = async (req, res) => {
  try {
    const monster = await Monster.findById(req.params.id)
    res.status(200).json({ status: "success", data: monster })
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err
    })
  }
}

exports.createMonster = async (req, res) => {
  try {
    const newMonster = await Monster.create(req.body)
    res.status(201).json({ status: "success", data: newMonster })
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err
    })
  }
}

exports.updateMonster = async (req, res) => {
  try {
    const monster = await Monster.findByIdAndUpdate(req.params.id, req.body, {
      // return new document
      new: true
    })
    res.status(200).json({ status: "success", data: monster })
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err
    })
  }
}

exports.deleteMonster = async (req, res) => {
  try {
    await Monster.findByIdAndDelete(req.params.id)
    res.status(204).json({ status: "success", data: null })
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err
    })
  }
}
