const Product = require("../model/products")

const getProducts = async (req, res) => {
    try {
        const products = await product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getProducts }
