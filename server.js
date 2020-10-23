const express = require('express');
const nodemailer = require('nodemailer');



const app = express();
const path = require('path');

const PORT = 8080;


// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// const log = function (request, response ,next) {
// 	console.log(`${new Date()}: ${request.protocol}://${request.get('host')}${request.originalUrl}`);
// 	console.log(request.body); // make sure JSON middleware is loaded first
// 	next();
// }
// app.use(log);

app.use(express.static(path.join(__dirname, '/public')));

app.post('/name', (request, response, next) => {
	// send name here
	console.log(request.body);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "gokulsparrowking", // this should be YOUR GMAIL account
			pass: "gokulgk007" // this should be your password
		}
    });

    var textBody = `FROM: ${request.body.name} Occupation: ${request.body.occupation} MESSAGE: ${request.body.message}`;
	var htmlBody = `<h2>Mail From Contact Form</h2><p>from:${request.body.name}</p><p>message:${request.body.message}</p>
		<p>occupation:${request.body.occupation}</p>
		<p>mobile:${request.body.mobile}</P>`;
	var mail = {
		from: "gokulsparrowking@gmail.com", // sender address
		to: "gokulgk008@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
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
			response.json({ message: `message sent: ${info.messageId}` });
		}
	});
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/', 'index.html'));
});



app.listen(PORT, () => console.log('Server is starting on PORT. ', 8080));