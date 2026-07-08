const express = require("express")
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controller/wishlistController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", protect, addToWishlist)
router.delete("/:productId", protect, removeFromWishlist)
router.get("/", protect, getWishlist)

module.exports = router
