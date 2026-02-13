const express = require("express")
const { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus } = require("../controller/orderController")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", protect, createOrder)
router.get("/myorders", protect, getMyOrders)
router.get("/all", protect, admin, getAllOrders)
router.get("/:id", protect, getOrderById)
router.put("/:id/status", protect, admin, updateOrderStatus)

module.exports = router
