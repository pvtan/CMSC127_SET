'use strict';

const body_parser	= require('body-parser');
const express		= require('express');
const session		= require('express-session');
const config		= require(__dirname + '/config/config'); //gets all the constants
const redis			= require('redis');
const redisStore	= require('connect-redis')(session);
const client		= redis.createClient();

const app = express();

//configure express app
app.set('case sensitive routing', true);
//removes something from request header. default value is true. can be left true
app.set('x-powered-by', false); 

//middleware functions - things that a request passes through before responses are sent
app.use(session({
	secret: config.COOKIE_SECRET, //can be set to any string. more j3j3 the better
	resave: false, //to prevent race conditions. race condition in short is bad.
	saveUninitialized: true, //allows creation of an empty and unmodified session
	cookie: {maxAge: 60 * 1000 * 60 * 2 }, //when the session will be expired. equals 2 hours
	store: new redisStore({ //stores the session to redis. uses default local settings of redis
		host: 'localhost',
		port: 6379,
		client: client
	})
}))

app.use(express.static(__dirname + '/../front-end'));
app.use(require('method-override')());
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.use(require(__dirname + '/config/router')(express.Router()));

app.listen(5000);
console.log('App is listening on port 5000');
