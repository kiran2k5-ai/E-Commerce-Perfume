const product = require("../model/products")

const getProducts = async (req, res) => {
    try {
        const prod = await product.find()
        res.json(prod)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async(req,res) => {
    try{
        const prod = await product.findById
    }
}
module.exports = { getProducts }
