const Monster = require("../models/monsterModel")

exports.getAllMonsters = async (req, res) => {
  try {
    // passing in req.query will apply filter, however we want to
    // exclude certain fields for pagination, sorting, limiting, etc...
    const queryObj = {
      ...req.query
    }
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach(e => delete queryObj[e])

    // advanced filtering for [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    const query = Monster.find(JSON.parse(queryStr))
    const monsters = await query
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
