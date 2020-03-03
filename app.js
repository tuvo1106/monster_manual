const fs = require("fs")
const express = require("express")
const colors = require("colors")

const app = express()
app.use(express.json())

const monsters = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/bestiary.json`)
)

app.get("/api/v1/monsters", (req, res) => {
  res
    .status(200)
    .json({ status: "success", results: monsters.length, data: monsters })
})

app.get("/api/v1/monsters/:name", (req, res) => {
  // req.params is where id is stored
  // add question mark to make it optional /:id?
  monster = monsters.find(e => e.name === req.params.name)
  res.status(200).json({ status: "success", data: monster })
})

app.post("/api/v1/monsters", (req, res) => {
  res.status(201).json({ status: "success" })
})

const port = 3000
app.listen(port, () => {
  console.log(`App running on ${port}`.yellow.bold)
})
