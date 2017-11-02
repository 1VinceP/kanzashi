require('dotenv').config();
const nodemailer = require('nodemailer');





module.exports = {
    sendEmail: (req, res) => {

        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587, // port for secure SMTP
            tls: {
               ciphers:'SSLv3'
            },
            auth: {
                user: process.env.emailuser,
                pass: process.env.emailpass
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `"Appointment Request" <vincentpalmerdev@outlook.com>`, // sender address
            to: "taylormckay68@gmail.com", // list of receivers
            subject: 'Requested Appointment', // Subject line
            text: "message", // plain text body
            // html: `<b>${ req.body.body }</b>` // html body
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.send(error)
            }
            // console.log('Message %s send: %s', info.messageId, info.response);
            res.status(200).send(info);
        });

    }
    
}