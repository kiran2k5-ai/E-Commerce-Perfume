const express = require("express")
const router = express.Router()
const {getProducts,getProductById} = require("../controller/productController")

router.get('/',getProducts)
rout

module.exports = router