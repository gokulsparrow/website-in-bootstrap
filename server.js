const express = require('express');
const nodemailer = require('nodemailer');



const app = express();
const path = require('path');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


app.use(express.static(path.join(__dirname, '/public')));

app.post('/name', (request, response, next) => {
	// send name here
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "selvatamilml", // this should be YOUR GMAIL account
			pass: "mlselvam" // this should be your password
		}
    });

    var textBody = `FROM: ${request.body.name} Occupation: ${request.body.occupation} MESSAGE: ${request.body.message}`;
	var htmlBody = `<h2>Mail From Contact Form</h2><p>from:${request.body.name}</p><p>message:${request.body.message}</p>
		<p>occupation:${request.body.occupation}</p>
		<p>dob:${request.body.dob}</p>
		<p>mobile:${request.body.mobile}</P>`;
	var mail = {
		from: "selvatamilml@gmail.com", // sender address
		to: "selvatamilml@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
		subject: "Mail From Contact Form", // Subject line
		text: textBody,
		html: htmlBody
    };
    
    transporter.sendMail(mail, function (err, info) {
		if(err) {
			console.log(err);
			response.json({ message: "message not sent: an error occured; check the server's console log" });
		}
		else {
			response.json({ message: `message sent: sucessfuly` });
		}
	});
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/', 'index.html'));
});



app.listen(PORT, () => console.log('Server is starting on PORT. ', 8080));