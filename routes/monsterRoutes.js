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
  .route("/:id")
  // add question mark to make it optional /:id?
  .get(getMonster)
  .patch(updateMonster)
  .delete(deleteMonster)

module.exports = router
