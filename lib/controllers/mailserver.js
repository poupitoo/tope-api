'use strict';


console.log('[mailServer] launching mailServer');
var nodemailer = require('nodemailer');

var database = require("./database/driver");
var db =database.connect();


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



function sendMailToUser(userId) {

	console.log('[mailServer.js]');
  
  db.collection('users').find({"userId":parseInt(userId)}).toArray(function(err, rest) {

    if (err){
      res.status(500).json({error:3});
    }else{
      console.log("Server response"+ JSON.stringify(rest));


		// Message object
		var message = {
		    // sender info
		    from: 'Societe Generale <newsletter@digitas.fr>',

		    // Comma separated list of recipients
		    to: '"Receiver Name" <'+rest[0].email+'>',

		    // Subject of the message
		    subject: "[SoGE 3.0] Infos Pratiques", //

		    headers: {
		        'X-Laziness-level': 1000
		    },
		    text: 'Merci de vous être inscrits au service de la Société Générale, un conseiller prendra contact.',
		    html:"Bonjour " + rest[0].name + rest[0].surname +","+"Tope vous remercie d'avoir assisté à la présentation"+
            "Nous remercions la société générale, BeMyApp et tous les autres participants pour ce super week-end "+
            "N'hésitez pas à visiter notre page Facebook :
            Vous pouvez nous contacter par mail å : appli.tope@gmail.com",
		};

		    console.log('[mailServer.js] Sending Mail to: '+rest[0].email);

		    transport.sendMail(message, function(error){
		        if(error){
		            console.log('[mailServer.js] Error occured');
		            console.log(error.message);
		        }
		        console.log('[mailServer.js] Message sent successfully!');
		    });

    }

  });

}









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
exports.sendMailToUser=sendMailToUser;