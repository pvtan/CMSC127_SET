var Client = require('mariasql');
var config = require(__dirname + '/../config/config');

module.exports = new Client({
    host: config.DATABASE_CREDENTIALS.host,
    user: config.DATABASE_CREDENTIALS.user,
    password: config.DATABASE_CREDENTIALS.password,
    db: config.DATABASE_CREDENTIALS.database
});
