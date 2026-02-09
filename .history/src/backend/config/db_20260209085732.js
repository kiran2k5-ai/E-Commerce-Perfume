const mongoose = require("mongoose")

const connectdb = async() => {
    try{
        const conn = await mongoose.connect(process.env)
    }
}