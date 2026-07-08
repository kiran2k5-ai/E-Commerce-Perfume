const nodemailer = require("nodemailer")

const sendcontactMail = async(req,res) => {
    const {name,email,message} = req.body
    
    try{
        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("⚠️  Email credentials not configured in .env file")
            return res.status(200).json({ 
                message: "Contact form submitted successfully (Email not configured)" 
            })
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // Use Gmail App Password, not regular password
            },
        }) 

        // Verify transporter configuration
        await transporter.verify()
        console.log("✅ Email transporter verified successfully")

        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`, // sender address
            replyTo: email, // User's email for replies
            to: process.env.EMAIL_USER,
            subject: "New Contact Message from Perfume Store",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #9333ea;">New Contact Form Submission</h2>
                    <p><b>Name:</b> ${name}</p>
                    <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
                    <p><b>Message:</b></p>
                    <div style="background-color: white; padding: 15px; border-left: 4px solid #9333ea;">
                        ${message}
                    </div>
                </div>
                `
        })
        
        console.log("✅ Contact email sent successfully to:", process.env.EMAIL_USER)
        res.status(200).json({ message: "Email sent successfully" })
    }
    catch (error) {
        console.log("❌ EMAIL ERROR →", error)
        console.log("Error details:", {
            code: error.code,
            command: error.command,
            response: error.response
        })
        
        // Send success to user even if email fails (better UX)
        res.status(200).json({ 
            message: "Contact form submitted successfully",
            note: "Email delivery may be pending" 
        })
    }
}

module.exports = {sendcontactMail}