import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    /*host: "smtp.forwardemail.net",
    port: 465,*/
    service:'gmail',
   // secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'diosabesteam@gmail.com',
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