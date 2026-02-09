const express = require("express")
const router = express.Router()
const {getProduct} = require("../controller/productController")

router.get('/',getproduct)

module.exports = router