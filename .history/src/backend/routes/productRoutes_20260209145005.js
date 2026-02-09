const express = require("express")
const router = express.Router()
const {getProducts,getProductById,create} = require("../controller/productController")

router.get('/',getProducts)
router.get('/:id',getProductById)
router.post('/create',createProduct)

module.exports = router