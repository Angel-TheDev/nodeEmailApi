require("dotenv").config();

const nodemail = require('nodemailer');
const keys = require('./keys');
const express = require('express');

const app = express();

// no longer needed as express has its own parser now
// const bodyParser = require('body-parser')
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;
console.log(keys);
app.get("/", function (req, res) {
    res.send('<h1>welcome to the interwebs</h1>');
});

app.post('/email', function(req,res){
    console.log(req.body);

    const name = req.body.name;
    const contact = `${req.body.email ? req.body.email : 'no email'}\n${req.body.phone ? req.body.phone : 'no number'}`;
    const message = `${req.body.message}\nContact Info\n${name}\n${contact}`;

    const transporter = nodemail.createTransport({
        service: 'gmail',
        auth: {
          user: keys.gmail.id,
          pass: keys.gmail.secret
        }
      });
      
      var mailOptions = {
        from: 'angeldavisdevelopment@gmail.com',
        to: 'AngelDavis.dev@gmail.com',
        subject: 'Message from portfolio from ' + name,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.json(true)
})

app.listen(PORT, function () {
    console.log('listening at http://localhost:3000');


})















