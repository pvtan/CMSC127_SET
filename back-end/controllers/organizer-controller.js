'use strict';

const db = require(__dirname + '/../lib/mariadb');

exports.addOrganizer = function(req, res, next) {
    console.log(req.body);
    const organizer = {
        organization: req.body.organization,
        username: req.body.username,
        password: req.body.password,
        organization_contact_number: req.body.organization_contact_number,
        contact_person: req.body.contact_person,
        address: req.body.address,
        email_address: req.body.email_address,
        adviser: req.body.adviser,
        adviser_contact_number: req.body.adviser_contact_number
    };
    
    function addOrganizer() {
        const queryMessage = 'INSERT INTO ORGANIZER (organization, username, password, organization_contact_number, contact_person, address, email_address, adviser, adviser_contact_number, date_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)';
        
        const request_data = [organizer.organization, organizer.username, organizer.password, organizer.organization_contact_number, organizer.contact_person, organizer.address, organizer.email_address, organizer.adviser, organizer.adviser_contact_number];
        
        db.query(queryMessage, request_data, send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }

    addOrganizer();
    db.end();
}

exports.getOrganizer = function(req, res, next) {
    function getOrganizers() {
        const queryMessage = 'SELECT * FROM ORGANIZER';
        db.query(queryMessage, send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    getOrganizers();
    db.end();
}

exports.getProfile = function(req, res, next) {
    console.log(req.query);
    function getUser() {
        const queryMessage = 'SELECT * FROM ORGANIZER where organization = ?';
        db.query(queryMessage, [req.query.name], send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    getUser();
    db.end();
}

exports.updateOrganizer = function(req, res, next) {
    console.log(req.query);
    const org = {
        "organization":req.query.organization,
        "username":req.query.username,
        "password":req.query.password,
        "contact_no":req.query.organization_contact_number,
        "contact_person":req.query.contact_person,
        "address":req.query.address,
        "email":req.query.email_address,
        "adviser":req.query.adviser,
        "adviser_contact_no":req.query.adviser_contact_number,
        "ID":req.query.organizerID
    }

    function update_org() {
        const queryMessage = 
        "UPDATE ORGANIZER SET organization = ?, username = ?, password = ?, organization_contact_number = ?, contact_person = ?, address = ?, email_address = ?, adviser = ?, adviser_contact_number = ? WHERE organizerID = ?";
        db.query(queryMessage, [org.organization, org.username, org.password, org.contact_no, org.contact_person,
        org.address,
        org.email,
        org.adviser,
        org.adviser_contact_no,
        org.ID], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    update_org();
    db.end();
}

exports.deleteOrganizer = function(req, res, next) {
    console.log(req.query);
    function delete_organizer() {
        const queryMessage = "DELETE FROM ORGANIZER WHERE username = ?";
        db.query(queryMessage, [req.query.name], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    delete_organizer();
    db.end();
}