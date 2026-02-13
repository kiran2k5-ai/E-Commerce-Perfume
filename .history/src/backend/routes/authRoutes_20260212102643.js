const express = require("express")
const { register, login, getProfile, updateProfile } = require("../controller/authController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/profile", protect, getProfile)
router.put("/profile", protect, updateProfile)

module.exports = router
