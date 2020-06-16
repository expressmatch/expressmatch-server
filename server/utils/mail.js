const nodemailer = require("nodemailer");
const config = require('../config/config');

const mailUtil = () => {
    let mailOptions, smtpTransport;

    const setTransport = () => {
        smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',//smtp.gmail.com  //in place of service use host...
            port: 465,
            secure: true,
            auth: {
                user: config.NOREPLY_GMAILUN,
                pass: config.NOREPLY_GMAILPW
            }, tls: {
                rejectUnauthorized: false
            },
            debug: true
        });
    };

    const setOptions = (options) => {
        // mailOptions = {
        //     to: options.to,
        //     from: options.from,
        //     subject: options.subject,
        //     text: options.text,
        //     template: options.template
        // };
        mailOptions = Object.assign({}, options);
    };

    const sendMail = () => {
        return new Promise((resolve, reject) => {
            smtpTransport.sendMail(mailOptions, function(err) {
                smtpTransport.close();

                if(err){
                    reject('Error during sending mail');
                    console.error(err);
                }
                resolve('Mail Sent Successfully');
            });
        });
    };

    setTransport();

    return {
        setOptions: setOptions,
        sendMail: sendMail
    };
};

module.exports = mailUtil;