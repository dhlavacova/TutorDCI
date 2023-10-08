import nodemailer from 'nodemailer';
import 'dotenv/config';


// Nastavení e-mailového klienta pro mailgrap;
/*export const sendEmail  =async (randomPasswor,email) =>{
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

}*/

export const sendEmail  =async (randomPasswor,email) =>{
    let transporter = nodemailer.createTransport({
        debug:true,
        logger:true,
        host: 'mail.gmx.net',
        port: 465,
        secure:true,
        auth: {
            user: process.env.GMX_EMAIL,
            pass: process.env.GMX_PASSWORD
        }
    });

    // Nastavení e-mailové zprávy
    let mailOptions = {
        from: 'diosabesteam@gmx.de',
        to: `${email}`,
        subject: 'Forget password von D&OS',
        text: 'Pokud vidíte tento e-mail, test byl úspěšný!',
        html: ' <div style="padding: 30px; max-width: 600px;margin: 0 auto;background-color: #f7f7f7; font-family: Arial, sans-serif"> <p>Dear,</p> <p>We have received a request to reset your password. Please use the following <span style="font-weight: bold">temporary password</span> to access your account: <span class="highlight">'+randomPasswor+'</span>.</p> <p>For your security, this password is valid for 30 minutes only. Once you have logged in, we kindly ask you to update your password at your earliest convenience.</p><p>Your D&OS team</p></div>'

    };
try{
    // Odešlete e-mail
    let info = await transporter.sendMail(mailOptions);

    console.log('E-mail odeslán: %s', info.messageId);
}catch (e) {
    console.error('Error sending email:', e);
    return false;
}

}