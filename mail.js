const nodemailer = require("nodemailer");
const fs = require('fs');
require('dotenv').config();

function otp(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
        ans +=
            arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}

async function mail(rec) {
    const otpv = otp(6, '0123456789');
    const file = fs.readFileSync(__dirname + '/template.html')
    const data = file.toString().replace('OTPR', otpv);
    const html = Buffer.from(data, 'utf8');
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST_PRIMARY,
        port: process.env.SMTP_PORT_PRIMARY,
        auth: {
            user: process.env.SMTP_USER_PRIMARY,
            pass: process.env.SMTP_PASS_PRIMARY
        },
    });
    const to = await rec
    let info = await transporter.sendMail({
        from: `${process.env.SMTP_FROM_PRIMARY}`,
        to: to, 
        subject: "OTP VERIFICATION for AVISHEK.CO.IN", 
        text: "EMAIL AUTH", 
        html: html
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return otpv;
}
module.exports = mail;

