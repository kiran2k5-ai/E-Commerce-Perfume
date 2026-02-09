const mongoose = require("mongoose")

const connectdb = ()=>{
    try{
        const conn = await mongoose.connect()
    }
}