const mongoose = require("mongoose")

const connectdb = qwait()=>{
    try{
        const conn = await mongoose.connect()
    }
}