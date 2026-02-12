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
            from:email,
            to:process.env.EMAIL_USER,
            subject : "New Contact Message",
            html: `
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
                `

        })
        res.status(200).send("E-mail sent ssuccessfully")
    }
    catch (error) {
  console.log("FULL EMAIL ERROR →", error)
  res.status(500).json({ error: error.message })
}

}

module.exports = {sendcontactMail}