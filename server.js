/*
 * Nii Mante
 * Personal Website server
 */

var apiKeys = require('./api_config.json');
var accountSid = apiKeys.accountSid; 
var accountAuthKey = apiKeys.accountAuthKey;

var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var client = require('twilio')(accountSid, accountAuthKey);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.bodyParser());
app.use(app.router);

app.get('/', function(req, res){
	        console.log('get request at /');
});

app.post('/HackSC', function(req, res){
	        client.messages.create({
	                to: "4105078365",
	                from: "+14435697571",
	                body: "Thanks for the text",
	                media: "www.facebook.com/nmante"
	        }, function (err, message){
			if(err){
				console.log("Error sending message");
			}else{
				console.log(message.sid);
			}
		});
});
app.listen(8124);
console.log('Server running at http://127.0.0.1:8124/');

