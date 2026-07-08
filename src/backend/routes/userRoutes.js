const express = require("express")
const { getAllUsers, updateUserRole, deleteUser } = require("../controller/userController")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, admin, getAllUsers)
router.put("/:id/role", protect, admin, updateUserRole)
router.delete("/:id", protect, admin, deleteUser)

module.exports = router
