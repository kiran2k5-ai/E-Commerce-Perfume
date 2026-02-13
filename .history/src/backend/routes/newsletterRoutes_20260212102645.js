const express = require("express")
const { subscribe, getAllSubscribers } = require("../controller/newsletterController")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/subscribe", subscribe)
router.get("/subscribers", protect, admin, getAllSubscribers)

module.exports = router
