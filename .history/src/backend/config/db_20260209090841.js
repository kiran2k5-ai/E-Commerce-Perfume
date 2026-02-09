const mongoose = require("mongoose")
require("dotenv").config()
const connectdb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB)
        console.log("Data base connected successfully")
    }
    catch(error){
        console.log(error)
    }
}

// module.exports = connectdb;
connectdb()