import nodemailer from 'nodemailer';
import 'dotenv/config';
import { MailtrapClient } from "mailtrap"
export const sendEmail  =async (randomPasswor,email) =>{
    let transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    // Nastavení e-mailové zprávy
    let mailOptions = {
        from: 'diosabesteam@gmail.com',
        to: `${email}`,
        subject: 'Testovací e-mail z Node.js',
        text: 'Pokud vidíte tento e-mail, test byl úspěšný!',
        html: ' <div style="padding: 30px; max-width: 600px;margin: 0 auto;background-color: #f7f7f7; font-family: Arial, sans-serif"> <p>Dear,</p> <p>We have received a request to reset your password. Please use the following <span style="font-weight: bold">temporary password</span> to access your account: <span class="highlight">'+randomPasswor+'</span>.</p> <p>For your security, this password is valid for 30 minutes only. Once you have logged in, we kindly ask you to update your password at your earliest convenience.</p></div>'

    };

    // Odešlete e-mail
    let info = await transporter.sendMail(mailOptions);

    console.log('E-mail odeslán: %s', info.messageId);

}

/*
const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    service:'gmail',
   // secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: '',
        pass: ''

    }
});
console.log(process.env.EMAILPSW)
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "diosabesteam@gmail.com", // sender address
        to: "dana@hlavacova.de", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

}

main().catch(console.error);
*/