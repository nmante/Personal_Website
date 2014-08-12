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
// var nginx = require('./configure-nginx.js');

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

});

app.listen(process.env.PORT || 3000);


