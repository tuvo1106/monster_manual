const express = require("express")

const {
  getAllMonsters,
  getMonster,
  createMonster,
  updateMonster,
  deleteMonster
} = require("./../controllers/monsterController")
const { protect } = require("../controllers/authController")

const router = express.Router()

router
  .route("/")
  .get(getAllMonsters)
  .post(protect, createMonster)

router
  .route("/:id")
  // add question mark to make it optional /:id?
  .get(getMonster)
  .patch(protect, updateMonster)
  .delete(protect, deleteMonster)

module.exports = router
