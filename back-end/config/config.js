'use strict'; //prevents bad syntax in js. read more http://www.w3schools.com/js/js_strict.asp

const path 	= require('path');

const config = {
	PORT: 5000,
	IP: '127.0.0.1',

	ASSETS_DIR: path.normalize(__dirname + '/../front-end'),

	DATABASE_CREDENTIALS: {
		host: 'localhost',
		user: 'root',
		password: '20224popola',
		database: 'EVENT_RESERVATION_SYSTEM'
	},

	COOKIE_SECRET: '4B1GS3CR3T'
}

module.exports = config;
