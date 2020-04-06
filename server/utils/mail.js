const nodemailer = require("nodemailer");

const mailUtil = () => {
    let mailOptions = {
        to: user.profile.email,
        from: process.env.GMAILUN,
        subject: 'Express To Match - Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    },
    smtpTransport;

    const setTransport = () => {
        smtpTransport = nodemailer.createTransport({
            service: 'gmail',//smtp.gmail.com  //in place of service use host...
            auth: {
                user: process.env.GMAILUN,
                pass: process.env.GMAILPW
            }, tls: {
                rejectUnauthorized: false
            }
        });
    };

    const setOptions = (options) => {
        mailOptions = Object.assign({}, mailOptions, options);
    };

    const sendMail = () => {
        return smtpTransport.sendMail(mailOptions, function(err) {
            //req.flash('success', 'An e-mail has been sent to ' + user.profile.email + ' with further instructions.');
            done(err, 'done');
        });
    };

    return {
        setTransport: setTransport,
        setOptions: setOptions,
        sendMail: sendMail
    };
};

module.exports = mailUtil;