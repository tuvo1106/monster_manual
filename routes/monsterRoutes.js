const express = require("express")

const {
  getAllMonsters,
  getMonster,
  createMonster,
  updateMonster,
  deleteMonster,
  checkName,
  checkBody
} = require("./../controllers/monsterController")

const router = express.Router()

// param middleware
router.param("name", checkName)

router
  .route("/")
  .get(getAllMonsters)
  .post(checkBody, createMonster)

router
  .route("/:name")
  .get(getMonster)
  .patch(updateMonster)
  .delete(deleteMonster)

module.exports = router
