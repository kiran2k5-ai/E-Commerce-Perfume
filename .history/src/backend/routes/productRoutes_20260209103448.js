const express = require("express")
const router = express.Router()
const {getroduct} = require("../controller/productController")

router.get('/',getproduct)

module.exports = router