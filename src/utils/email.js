import nodemailer from "nodemailer"

async function sendEmail({ to = [], subject, html, attachments = [] } = {}) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: `"Assignment 8" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
    });
    if (info.rejected.length) {
        return false
    } else {
        return true
    }
}
export default sendEmail