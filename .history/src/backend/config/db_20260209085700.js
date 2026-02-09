const mongoose = require("mongoose")

const connectdb = await() => {
    try{
        const conn = await mongoose.connect()
    }
}