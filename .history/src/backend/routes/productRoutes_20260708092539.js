const express = require("express")
const router = express.Router()
const { getProducts, getProductById, createProduct, getrelatedProducts, updateProduct, deleteProduct } = require("../controller/productController")
const { protect, admin } = require("../middleware/authMiddleware")
const multer = require('multer')
const path = require('path')

// ensure uploads directory exists and use disk storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'uploads'))
	},
	filename: function (req, file, cb) {
		const unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, unique + path.extname(file.originalname))
	}
})

const upload = multer({ storage })

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', protect, admin, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.post('/:id/upload-image', protect, admin, upload.single('image'), require('../controller/productController').uploadProductImage)
router.delete('/:id', protect, admin, deleteProduct)
router.post('/related', getrelatedProducts)

module.exports = router