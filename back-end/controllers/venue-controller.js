'use strict';

const db = require(__dirname + '/../lib/mariadb');

exports.insertVenue = function(req, res, next) {
    const venue = {
		name: req.body.name,
		location: req.body.location,
		capacity: req.body.capacity,
		parking_space_capacity: req.body.parking_space_capacity,
		type: req.body.type,
		details: req.body.details
	};
	
    function addVenue() {
        const queryMessage = 'INSERT INTO VENUE (name, location, capacity, parking_space_capacity, type, details) VALUES (?, ?, ?, ?, ?, ?)';
        
        const request_data = [venue.name, venue.location, venue.capacity, venue.parking_space_capacity, venue.type, venue.details];
        
        db.query(queryMessage, request_data, send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    addVenue();
    db.end();
}

exports.getVenue = function(req, res, next) {
    function getVenue() {
        const queryMessage = 'SELECT * FROM VENUE';
        db.query(queryMessage, send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    getVenue();
    db.end();
}

exports.searchVenue = function(req, res, next) {
    console.log(req.query);
    function searchVenue() {
        const queryMessage = 'SELECT * FROM VENUE where name like ?';
        db.query(queryMessage, ["%" + req.query.name + "%"], send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    searchVenue();
    db.end();
}

exports.updateVenue = function(req, res, next) {
    console.log(req.query);
    const venue = {
        "name":req.query.name,
        "location":req.query.location,
        "capacity":req.query.capacity,
        "parking_space_capacity":req.query.parking_space_capacity,
        "type":req.query.type,
        "details":req.query.details,
        "ID":req.query.venueID
    }

    function update_venue() {
        const queryMessage = "UPDATE VENUE SET name = ?, location = ?, capacity = ?, parking_space_capacity = ?, type = ?, details = ? WHERE venueID = ?";
        db.query(queryMessage, [venue.name, venue.location, venue.capacity, venue.parking_space_capacity, venue.type, venue.details, venue.ID], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    update_venue();
    db.end();
}

exports.deleteVenue = function(req, res, next) {
    function delete_venue() {
        const queryMessage = "DELETE FROM VENUE WHERE name = ?";
        db.query(queryMessage, [req.query.name], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    delete_venue();
    db.end();
}