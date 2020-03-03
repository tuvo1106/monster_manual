const fs = require("fs")
const express = require("express")
const colors = require("colors")

const app = express()
app.use(express.json())

const monsters = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/bestiary.json`)
)

const getAllMonsters = (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: monsters.length, data: monsters })
}

const getMonster = (req, res) => {
  // req.params is where id is stored
  // add question mark to make it optional /:id?
  monster = monsters.find(e => e.name === req.params.name)
  res.status(200).json({ status: "success", data: monster })
}

const createMonster = (req, res) => {
  res.status(201).json({ status: "success" })
}

const updateMonster = (req, res) => {
  res.status(200).json({ status: "success", data: "modified" })
}

const deleteMonster = (req, res) => {
  res.status(204).json({ status: "success", data: null })
}

app
  .route("/api/v1/monsters")
  .get(getAllMonsters)
  .post(createMonster)

app
  .route("/api/v1/monsters/:name")
  .get(getMonster)
  .patch(updateMonster)
  .delete(deleteMonster)

const port = 3000
app.listen(port, () => {
  console.log(`App running on ${port}`.yellow.bold)
})
