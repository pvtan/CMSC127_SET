'use strict';

const db = require(__dirname + '/../lib/mariadb');

exports.addAdmin = function(req, res, next) {
    const admin = {
        name: req.query.name,
        username: req.query.username,
        password: req.query.password,
        contact_number: req.query.contact_number
    };
    
    function addAdmin() {
        const queryMessage = 'INSERT INTO ADMIN (name, username, password, contact_number) VALUES (?, ?, ?, ?)';
        
        const request_data = [admin.name, admin.username, admin.password, admin.contact_number];
        
        db.query(queryMessage, request_data, send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    addAdmin();
    db.end();
}

exports.getAdmin = function(req, res, next) {
    function getAdmin() {
        const queryMessage = 'SELECT * FROM ADMIN';
        db.query(queryMessage, send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    getAdmin();
    db.end();
}

exports.updateAdmin = function(req, res, next) {
    console.log(req.query);
    const admin = {
        "name": req.query.name,
        "username": req.query.username,
        "password": req.query.password,
        "contact_number": req.query.contact_number,
        "ID": req.query.adminID
    }
    function update_admin() {
        const queryMessage = "UPDATE ADMIN SET name = ?, username = ?, password = ?, contact_number = ? WHERE adminID = ?";
        db.query(queryMessage, [admin.name, admin.username, admin.password, admin.contact_number, admin.ID], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    update_admin();
    db.end();
}

exports.deleteAdmin = function(req, res, next) {
    console.log(req.query);
    function delete_admin() {
        const queryMessage = "DELETE FROM ADMIN WHERE username = ?";
        db.query(queryMessage, [req.query.name], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    delete_admin();
    db.end();
}