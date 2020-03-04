const express = require("express")

const {
  getAllMonsters,
  getMonster,
  createMonster,
  updateMonster,
  deleteMonster,
  checkName
} = require("./../controllers/monsterController")

const router = express.Router()

// param middleware
router.param("name", checkName)

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
