const express = require("express")
const { subscribe, getAllSubscribers, deleteSubscriber, sendEmail } = require("../controller/newsletterController")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/subscribe", subscribe)
router.get("/subscribers", protect, admin, getAllSubscribers)
router.delete('/subscribers/:id', protect, admin, deleteSubscriber)
router.post('/subscribers/send', protect, admin, sendEmail)

module.exports = router
