/*
 * Nii Mante
 * Personal Website server
 */

var apiKeys = require('./api_config.json');
var niiAccessToken = apiKeys.personalAccessToken; 
var accountAuthKey = apiKeys.accountAuthKey;

//Node Modules
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
//var client = require('twilio')(accountSid, accountAuthKey);
var io = require('socket.io').listen(8125);
var nginx = require('./configure-nginx.js');

//Nii REST Api Modules
var apiRoot = './api';
var baseRoute = '';
var _blogPosts = require(apiRoot + '/blogPosts');
var _projects = require(apiRoot + '/projects');

//REST Api schema
var Schema = mongoose.Schema;
//Essentially what each chat will look like

var BlogPostSchema = new Schema({
	title : { type : String, required : true },
    	author : { type : String, default : "Nii Mante" },
    	hidden : { type : Boolean, default : true },	
    	text : { type : String, required : true }
});

var ProjectSchema = new Schema({
	projectId : { type : Schema.Types.ObjectId, required : true },
	text : { type : String, required : true },    
});

var BlogPostModel = mongoose.model('BlogPost', BlogPostSchema);
var ProjectModel = mongoose.model('Project', ProjectSchema);

//connect to our Mongodb instance via mongoose
//db.events.ensureIndex( { "username" : 1, "date" : -1 } )
mongoose.connect('mongodb://127.0.0.1/personal_website');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.bodyParser());
app.use(app.router);

app.get('/', function(req, res){
	console.log('get request at /');
	console.log('Configure this for webpage');
});

//This is the route from our twilio dashboard
//It is just /HackSC for now, but I could make it anything
//
//Eventually, will need to have multiple number for each chat
//Each number will act as a middle man between the chat
/*app.post('/blog', function(req, res){
	//Will create a new message for the chat called 'Hacker Friends'
	//Create message, and send that message to all sms people and http people
        
	var message = new BlogPostModel({
		blogPostId : ObjectID(req.body.From),
	    	text : req.body.body,
	    	chatId : "531c98ac9801523f2d531345"
	});	

	message.save(function(err){
		if(!err){
			var chat = ChatModel.find({ _id : message.paths('chatId')});
			chat.paths('messages').push(message);
			chat.paths('userIds').push(message.paths('userId'));
			chat.paths('phoneNumbers').push(req.body.From);
			chat.save(function(err){
				if(!err){
					console.log(
						"Saved messages and users to chats");
					io.sockets.emit('send:message', message);
						//Send to texter
					for (var i = 0; i < chat.paths('phoneNumbers').length; 
						i++){
						client.messages.create({
							to: chat.paths('phoneNumbers')[i],
							from: "+14435697571",
							body: message.text
						}, function (err, message){
							if(err){
								console.log("Error sending message");
							}else{
								console.log(message.sid);
							}
						});


					}
				}else{
					console.log(err);
				}
			});

		}else{
			console.log(err);
		}
	});	

});*/


/* 
 * Worry about deletes for the api later 
 */

/* Chats */
//Create a new chat
app.post('/HackSC/chats', function (req, res){
	var user = UserModel.findById(req.body.creatorId);
	var chat;
	chat = new ChatModel({
		name : req.body.name,
		creatorId : req.body.creatorId
	});	
	chat.save(function (err) {
		if(!err){
			console.log("Created chat with name: " + req.body.name);
			user.paths('chats').push(chat);
			user.save(function(err){
				if(!err){
					console.log("Added Chat");
				}else{
					console.log(err);
				}
			});
		}else{
			console.log(err);
		}

	});
	return res.jsonp(chat);
});

