const express = require("express")
const router = express.Router()
const {getProducts,getProductById,createProduct,getrelatedProducts} = require("../controller/productController")

router.get('/',getProducts)
router.get('/:id',getProductById)
router.post('/',createProduct)
router.post('/related',getrelatedProducts)

module.exports = router