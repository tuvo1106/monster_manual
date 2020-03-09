const express = require("express")
const {
  getAllUsers,
  getUser,
  deleteUser
} = require("../controllers/userController")
const { signUp, login, protect } = require("../controllers/authController")


const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)

router.route("/").get(getAllUsers)

router
  .route("/:id")
  .get(getUser)
  .delete(protect, deleteUser)

module.exports = router
