const product = require("../model/products")

const getProducts = async (req, res) => {
    try {
        const prod = await product.find()
        res.json(prod)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductByI
module.exports = { getProducts }
