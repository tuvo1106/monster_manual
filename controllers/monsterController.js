const fs = require("fs")

const monsters = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/bestiary.json`)
)

exports.getAllMonsters = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: monsters.length, data: monsters })
}

exports.getMonster = (req, res) => {
  // add question mark to make it optional /:name?
  monster = monsters.find(e => e.name === req.params.name)
  res.status(200).json({ status: "success", data: monster })
}

exports.createMonster = (req, res) => {
  res.status(201).json({ status: "success" })
}

exports.updateMonster = (req, res) => {
  res.status(200).json({ status: "success", data: "modified" })
}

exports.deleteMonster = (req, res) => {
  res.status(204).json({ status: "success", data: null })
}
