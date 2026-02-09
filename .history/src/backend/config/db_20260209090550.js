const mongoose = require("mongoose")
console.log()
const connectdb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB)
        console.log("Data base connected successfully")
    }
    catch(error){
        console.log(error)
    }
}

module.exports = connectdb;