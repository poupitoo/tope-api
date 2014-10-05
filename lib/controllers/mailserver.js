'use strict';


console.log('[mailServer] launching mailServer');
var nodemailer = require('nodemailer');


// Create a SMTP transport object
var transport = nodemailer.createTransport("SMTP", {
        //service: 'Gmail', // use well known service.
                            // If you are using @gmail.com address, then you don't
                            // even have to define the service name
        auth: {
            user: "societegenerale.tope@gmail.com",
            pass: "societegenerale.tope00"
        }
    });

console.log('SMTP Configured');





function sendMail(req,res) {
    console.log('[mailServer.js]');

    var userEmail = req.params.userEmail;

// Message object
var message = {

    // sender info
    from: 'Societe Generale <newsletter@digitas.fr>',

    // Comma separated list of recipients
    //to: '"Receiver Name" <nodemailer@disposebox.com>',
    to: '"Receiver Name" <'+userEmail+'>',

    // Subject of the message
    subject: "[SoGE 3.0] Infos Pratiques", //

    headers: {
        'X-Laziness-level': 1000
    },

    // plaintext body
    text: 'Merci de vous être inscrits au service de la Société Générale, un conseiller prendra contact.',

    // HTML body
    /*
    html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
         '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@node"/></p>',
    */
    //html:content.toString(),
    html:'Here is another text',
};

    console.log('[mailServer.js] Sending Mail to: '+userEmail);

    transport.sendMail(message, function(error){
        if(error){
            console.log('[mailServer.js] Error occured');
            console.log(error.message);
            res.status(500).json({error:1});
            return;
        }
        console.log('[mailServer.js] Message sent successfully!');
        res.send(200);
        // if you don't want to use this transport object anymore, uncomment following line
        //transport.close(); // close the connection pool
    });
}

exports.sendMail=sendMail;