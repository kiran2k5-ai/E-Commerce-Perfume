const Product = require("../model/products")

const getproduct = async(req,res) => {
    const product = await Product.find()
    res.
}