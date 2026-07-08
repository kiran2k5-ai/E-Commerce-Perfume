const express = require("express")
const router = express.Router()
const { getProducts, getProductById, createProduct, getrelatedProducts, updateProduct, deleteProduct } = require("../controller/productController")
const { protect, admin } = require("../middleware/authMiddleware")

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.post('/related', getrelatedProducts)

module.exports = router