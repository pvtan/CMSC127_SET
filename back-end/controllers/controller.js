'use strict';

const db = require(__dirname + '/../lib/mariadb');

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

exports.getCurrentUser = function(req, res, next) {
    return res.send(req.session.user);
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
        const queryMessage = 'INSERT INTO ORGANIZER (organization, username, password, organization_contact_number, contact_person, address, email_address, adviser, adviser_contact_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
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
        venue: req.body.venue
	};
	
    function addEvent() {
        const queryMessage = 'INSERT INTO EVENT (name, event_date, time_start, time_end, dress_code, theme, details, status, venue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const request_data = [event.name, event.event_date, event.time_start, event.time_end, event.dress_code, event.theme, event.details, event.status, event.venue];
        
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

    /*organization,
    username,
    password
    contact_np
    contact_person
    address
    email
    adviser
    adviser_contact_number*/

    function send_response(err, result, args, last_query) {
        if(err) {
            return res.status(500).send({message: "Error performing query."});
        }
        return res.send(result);
    }

    update_org();
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