DROP DATABASE IF EXISTS EVENT_RESERVATION_SYSTEM;
CREATE DATABASE IF NOT EXISTS EVENT_RESERVATION_SYSTEM;
USE EVENT_RESERVATION_SYSTEM;

CREATE TABLE ORGANIZER (
	organizerID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	organization VARCHAR(50) NOT NULL UNIQUE KEY,
	username VARCHAR(20) NOT NULL UNIQUE KEY,
	password VARCHAR(15) NOT NULL,
	organization_contact_number VARCHAR(11) NOT NULL, 
	contact_person VARCHAR(50) NOT NULL,
	address VARCHAR(100) NOT NULL,
	email_address VARCHAR(100) NOT NULL,
	adviser VARCHAR(50) NOT NULL,
	adviser_contact_number VARCHAR(11) NOT NULL,
	date_created DATE NOT NULL
);


CREATE TABLE ADMIN (
	adminID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	username VARCHAR(20) NOT NULL UNIQUE KEY,
	password VARCHAR(15) NOT NULL,
	contact_number VARCHAR(15) NOT NULL,
	date_created DATE NOT NULL
);

CREATE TABLE ALL_USERS (
	name VARCHAR(50),
	username VARCHAR(20) NOT NULL PRIMARY KEY,
	password VARCHAR(15) NOT NULL,
	acct_type VARCHAR(9) NOT NULL
);

CREATE TABLE VENUE (
	venueID INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE KEY,
	location VARCHAR(50),
	capacity INT,
	parking_space_capacity INT,
	type VARCHAR(50),
	details VARCHAR(100)
);

CREATE TABLE EVENT (
	eventID INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	event_date DATE,
	time_start TIME,
	time_end TIME,
	dress_code VARCHAR(20),
	theme VARCHAR(20),
	details VARCHAR(100),
	status ENUM('pending', 'approved', 'cancelled'),
	venue VARCHAR(50),
	organizer VARCHAR(50) NOT NULL,
	foreign key(venue) references VENUE(name),
	foreign key(organizer) references ORGANIZER(organization)
);

CREATE TABLE EVENT_PARTICIPANT (
	participant VARCHAR(50),
	eventID INT AUTO_INCREMENT UNIQUE KEY,
	primary key(participant, eventID),
	constraint EVENT_eventID_fk foreign key(eventID) references EVENT(eventID)
);

CREATE TABLE EVENT_GUEST (
	guest VARCHAR(50),
	eventID INT AUTO_INCREMENT UNIQUE KEY,
	primary key(guest, eventID),
	constraint EVENT1_eventID_fk foreign key(eventID) references EVENT(eventID)
);

CREATE TABLE EVENT_SPONSOR (
	sponsor VARCHAR(50),
	eventID INT AUTO_INCREMENT UNIQUE KEY,
	primary key(sponsor, eventID),
	constraint EVENT2_eventID_fk foreign key(eventID) references EVENT(eventID)
);

CREATE TABLE VENUE_UTILITIES (
	utilities VARCHAR(50),
	venueID INT AUTO_INCREMENT UNIQUE KEY,
	primary key(utilities, venueID),
	constraint VENUE3_venueID_fk foreign key(venueID) references VENUE(venueID)
);

CREATE TABLE O_ADDS_E (
	organizerID INT NOT NULL UNIQUE KEY,
	eventID INT AUTO_INCREMENT UNIQUE KEY,
	primary key(organizerID, eventID),
	constraint foreign key(organizerID) references ORGANIZER(organizerID),
	constraint foreign key(eventID) references EVENT(eventID)
) engine = innodb;

CREATE TABLE A_MANAGES_V (
	adminID INT NOT NULL UNIQUE KEY,
	venueID INT AUTO_INCREMENT UNIQUE KEY,
	primary key(adminID, venueID),
	constraint ADMIN_adminID_fk foreign key(adminID) references ADMIN(adminID),
	constraint VENUE_venueID_fk foreign key(venueID) references VENUE(venueID)
) engine = innodb;

CREATE TABLE A_MANAGES_O (
	adminID INT NOT NULL UNIQUE KEY,
	organizerID INT NOT NULL UNIQUE KEY,
	primary key(adminID, organizerID),
	constraint ADMIN1_adminID_fk foreign key(adminID) references ADMIN(adminID),
	constraint ORGANIZER1_organizerID_fk foreign key(organizerID) references ORGANIZER(organizerID)
) engine = innodb;

CREATE TABLE E_IS_BEING_HELD_AT (
	eventID INT UNIQUE KEY,
	venueID INT UNIQUE KEY,
	primary key(eventID, venueID),
	constraint EVENT3_eventID_fk foreign key(eventID) references EVENT(eventID),
	constraint VENUE4_venueID_fk foreign key(venueID) references VENUE(venueID)
);