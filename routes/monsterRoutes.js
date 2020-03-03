const express = require("express")

const {
  getAllMonsters,
  getMonster,
  createMonster,
  updateMonster,
  deleteMonster
} = require("./../controllers/monsterController")

const router = express.Router()

router
  .route("/")
  .get(getAllMonsters)
  .post(createMonster)

router
  .route("/:name")
  .get(getMonster)
  .patch(updateMonster)
  .delete(deleteMonster)

module.exports = router
