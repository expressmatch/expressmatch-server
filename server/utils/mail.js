const nodemailer = require("nodemailer");
const config = require('../config/config');

const mailUtil = () => {
    let mailOptions, smtpTransport;

    const setTransport = () => {
        smtpTransport = nodemailer.createTransport({
            service: 'gmail',//smtp.gmail.com  //in place of service use host...
            auth: {
                user: config.NOREPLY_GMAILUN,
                pass: config.NOREPLY_GMAILPW
            }, tls: {
                rejectUnauthorized: false
            }
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