'use strict';

const db = require(__dirname + '/../lib/mariadb');

exports.addEvent = function(req, res, next) {
    console.log(req.body);
    const event = {
		name: req.body.name,
		event_date: req.body.event_date,
		time_start: req.body.time_start,
		time_end: req.body.time_end,
		dress_code: req.body.dress_code,
		theme: req.body.theme,
		details: req.body.details,
        status: 'pending',
        venue: req.body.venue,
        organizer: req.body.organizer
	};
	
    function addEvent() {
        const queryMessage = 'INSERT INTO EVENT (name, event_date, time_start, time_end, dress_code, theme, details, status, venue, organizer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const request_data = [event.name, event.event_date, event.time_start, event.time_end, event.dress_code, event.theme, event.details, event.status, event.venue, event.organizer];
        
        db.query(queryMessage, request_data, send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    addEvent();
    db.end();
}

exports.getEvent = function(req, res, next) {
    function getEvent() {
        const queryMessage = 'SELECT * FROM EVENT WHERE status = ?';
        db.query(queryMessage, [req.query.status], send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    
    getEvent();
    db.end();
}

exports.getCurrentEvents = function(req, res, next) {
    function getEvent() {
        const queryMessage = 'SELECT * FROM EVENT WHERE organizer = ? AND status = ?';
        db.query(queryMessage, [req.query.name, req.query.status], send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    
    getEvent();
    db.end();
}

exports.searchEvent = function(req, res, next) {
    console.log(req.query);
    function searchEvent() {
        const queryMessage = 'SELECT * FROM EVENT WHERE name like ? and organizer = ?';
        db.query(queryMessage, ["%" + req.query.name + "%", req.query.organizer], send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    
    searchEvent();
    db.end();
}

exports.updateEvent = function(req, res, next) {
    console.log(req.query);
    const event = {
        "name": req.query.name,
        "theme": req.query.theme,
        "time_end": req.query.time_end,
        "time_start": req.query.time_start,
        "details": req.query.details,
        "dress_code": req.query.dress_code,
        "ID": req.query.eventID
    }
    function update_event() {
        const queryMessage = "UPDATE EVENT SET name = ?, theme = ?, time_end = ?, time_start = ?, details = ?, dress_code = ? WHERE eventID = ?";
        db.query(queryMessage, [event.name, event.theme, event.time_end, event.time_start, event.details, event.dress_code, event.ID], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    update_event();
    db.end();
}

exports.deleteEvent = function(req, res, next) {
    function delete_event() {
        const queryMessage = "DELETE FROM EVENT WHERE name = ?";
        db.query(queryMessage, [req.query.name], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    delete_event();
    db.end();
}

exports.approveEvent = function(req, res, next) {
    console.log(req.query);
    const approved = {
	    "status" : "",
	    "name" : ""
	}

    if(req.query.cancel == '0') { 
	    approved.status = 'approved';
	    approved.name = req.query.name;
	} else if(req.query.cancel == '1') {
		approved.status = 'cancelled';
	    approved.name = req.query.name;
	}

	console.log(approved);

    function approve_event() {
        const queryMessage = "UPDATE EVENT SET status = ? WHERE name = ?";
        db.query(queryMessage, [approved.status, approved.name], send_response)
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    approve_event();
    db.end();
}

exports.checkAvailability = function(req, res, next) {
    function available() {
        const queryMessage = 'select * from EVENT where ? > time_start AND time_end > ? AND venue = ? and event_date = ?';
        db.query(queryMessage, [req.query.time_end, req.query.time_start, req.query.venue, req.query.event_date], send_response);
    }

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    }
    
    available();
    db.end();
}