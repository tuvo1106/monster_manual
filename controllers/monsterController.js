const Monster = require("../models/monsterModel")

exports.getAllMonsters = async (req, res) => {
  try {
    // passing in req.query will apply filter, however we want to
    // exclude certain fields for pagination, sorting, limiting, etc...
    const queryObj = { ...req.query }
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach(e => delete queryObj[e])

    // advanced filtering for [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    let query = Monster.find(JSON.parse(queryStr))

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ")
      query = query.sort(sortBy)
    } else {
      // default sort
      query = query.sort("name")
    }

    // field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ")
      query = query.select(fields)
    } else {
      // - = exclude
      query = query.select("-__v")
    }

    // pagination
    // n * 1 converts String to Integer
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const skip = (page - 1) * limit
    // page=3&limit=10, 1-10, page 1, 11-20, page 2...
    query = query.skip(skip).limit(limit)

    if (req.query.page) {
      const numMonsters = await Monster.countDocuments()
      if (skip >= numMonsters) throw new Error("This page does not exist")
    }

    // execute query
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
