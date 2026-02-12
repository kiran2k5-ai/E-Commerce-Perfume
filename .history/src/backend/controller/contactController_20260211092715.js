const nodemailer = require("nodemailer")

const sendcontactMail = async(req,res) => {
    const {name,email,message} = req.body
    
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user : ki,
                pass : process.env.EMAIL_PASS
            },
        }) 
        await transporter.sendMail({
            from:email,
            to:ki,
            subject : "New Contact Message",
            html : `<p>${name}</p>
            <p>${name}</p>
            <p>${name}</p>`
        })
        res.status(200).send("E-mail sent ssuccessfully")
    }
    catch(error){
        res.status(500).send("Email not send")
    }
}

module.exports = {sendcontactMail}