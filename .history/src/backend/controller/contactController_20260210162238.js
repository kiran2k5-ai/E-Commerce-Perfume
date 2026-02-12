const nodemailer = require("nodemailer")

const sendcontactMail = async(req,res) => {
    const {name,email,message} = req.body
    
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            },
        }) 
        await transporter.sendMail({
            from:ema
        })
    }
}