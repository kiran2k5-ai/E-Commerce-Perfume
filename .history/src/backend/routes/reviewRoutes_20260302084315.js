const express = require("express")
const { createReview, getProductReviews, deleteReview } = require("../controller/reviewController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", protect, createReview)
router.get("/product/:productId", getProductReviews)
router.delete("/:id", protect, deleteReview)

module.exports = router
