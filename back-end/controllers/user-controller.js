'use strict';

const db = require(__dirname + '/../lib/mariadb');

exports.getCurrentUser = function(req, res, next) {
    return res.send(req.session.user);
}

exports.userLogin = function(req, res, next) {
    const data = {
        username: req.query.username,
        password: req.query.password
    };
    function login() {
        const queryMessage = 'SELECT name, username, password, acct_type FROM ALL_USERS where username = ? and password = ?';
        db.query(queryMessage, [data.username, data.password], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        } else if(!result.length) {
			return res.status(404).send({message: 'Wrong username or password.'});
		} else {
			req.session.user = {
				name: result[0].name,
				username: result[0].username,
				password: result[0].password
			}
			return res.send(result[0]);
		}
    }

    login();
    db.end();
}

exports.logout = function(req, res, next) {
	function start() {
		req.session.destroy();
		return res.send({message: 'Logout success!'});
	}

	start();
}