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
        const prod = await product.findById(req.params.id)
        if(!product){
            res.send("No data found in this id")
        }
        res.json(prod)
    }
    catch(error){
            res.status(500).send("Error")
    }
}

const createProduct = async(req,res) =>{
    try{
        const prod = new product(req.body)
        const savedProduct = await prod.save()
        res.send(201).send("Data have been successfully created")
    }
    catch(error){
        res.send(400).send(error)
    }
}

const getrelatedProducts = async(req,res) => {
    const {category,id} = req.body
    try{
        const prod = Product.find({category:{category},})
    }
}
module.exports = { getProducts, getProductById, createProduct }
