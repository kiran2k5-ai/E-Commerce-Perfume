require(dotenv).config()
console.log("Server started")
const connectdb = require("./config/db")
connectdb()