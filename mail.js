const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


const auth = {
    auth: {
        api_key: '',
        domain: ''
    }
};

const transport = nodemailer.createTransport(mailGun(auth));

const mailOptions = {
    from: 'yygygyg@hj.com',
    to: 'gygygy@gy.com',
    subject: 'gygygyy',
    text: 'uhugutft'
};

transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
        console.log('errr occur');
    } else {
        console.log('message send');
    }
});