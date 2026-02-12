const express = require("express")
const router = express.Router()
const {getProducts,getProductById,createProduct} = require("../controller/productController")

router.get('/',getProducts)
router.get('/:id',getProductById)
router.post('/',createProduct)
router.post('/cart')

module.exports = router