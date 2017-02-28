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
	date_created TIMESTAMP
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
	organizer VARCHAR(50),
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

DELIMITER //
	CREATE TRIGGER Insert_organizer
	AFTER INSERT ON ORGANIZER FOR EACH ROW

	BEGIN
	INSERT INTO ALL_USERS (name, username, password, acct_type)
	VALUES(New.organization, NEW.username, NEW.password, "organizer");
	END; //

DELIMITER //
	CREATE TRIGGER Insert_admin
	AFTER INSERT ON ADMIN FOR EACH ROW

	BEGIN
	INSERT INTO ALL_USERS (name, username, password, acct_type)
	VALUES(NEW.name, NEW.username, NEW.password, "admin");
	END; //

DELIMITER //
	CREATE TRIGGER Delete_admin
	AFTER DELETE ON ADMIN FOR EACH ROW

	BEGIN
	DELETE FROM ALL_USERS where username = OLD.username;
	END; //

DELIMITER //
	CREATE TRIGGER Before_delete_organizer
	BEFORE DELETE ON ORGANIZER FOR EACH ROW

	BEGIN
	UPDATE EVENT SET organizer = NULL where organizer = OLD.organization;
	END; //

DELIMITER //
	CREATE TRIGGER After_delete_organizer
	AFTER DELETE ON ORGANIZER FOR EACH ROW

	BEGIN
	DELETE FROM ALL_USERS where username = OLD.username;
	END; //

INSERT INTO ADMIN VALUES(1, 'Drew Thirty', 'panginoondthirty', '1234', '2947102475', NULL);
INSERT INTO ADMIN VALUES(2, 'Lei Lalima', 'llalima', 'llalima', '0375027402', NULL);
INSERT INTO ADMIN VALUES(3, 'Rick Dorgon', 'rdorgon', 'rdorgon', '0193846583', NULL);
INSERT INTO ADMIN VALUES(4, 'Tony Milliones', 'tmilliones', 'tmilliones', '9375920485', NULL);

INSERT INTO ORGANIZER VALUES(1, 'Carter I. Dillon', 'Gareth', '6454', '8372955685', 'Dayanara Lopez', 'P.O. Box 214, 8743 Lectus. Street', 'aliquet.lobortis.nisi@Cumsociisnatoque.com', 'Jenna Hamilton', '4635235454', '2017-05-24');
INSERT INTO ORGANIZER VALUES(2, 'Kasimir T. Oconnor', 'Donovan', '5666', '3523412467', 'Nora Aunor', 'P.O. Box 718, 7509 Ante. Av.', 'libero.dui.nec@tristiqueaceleifend.com', 'Jake Lopez', '4241074194', '2016-03-21'); 
INSERT INTO ORGANIZER VALUES(3, 'Tamara N. Chaney', 'Gannon', '9069', '3524975068', 'Vilma Santos', '323 Erat. Street', 'Nulla@loremlorem.co.uk', 'Nicole Bulambao', '6532557790', '2016-08-26');
INSERT INTO ORGANIZER VALUES(4, 'Quentin Q. Fitzpatrick', 'Hamilton', '1507', '4524235732', 'Christopher De Leon', '564-4040 Eget Ave', 'suscipit@vulputate.net', 'Mila Abad', '0297966204', '2016-12-28');
INSERT INTO ORGANIZER VALUES(5, 'George K. Jarvis', 'Acton', '8799', '4623578690', 'Coco Martin', 'Ap #354-5230 Sed Av.', 'dolor.Nulla.semper@faucibusut.ca', 'Nilo Glorioso', '0230846912', '2016-03-26'); 
INSERT INTO ORGANIZER VALUES(6, 'Tatiana B. David', 'Ivory', '2458', '4668986542', 'Andrea Torres', 'Ap #334-8024 Ultrices St.', 'Etiam@estmollisnon.ca', 'Randy Artugue', '0167123253', '2016-11-12');
INSERT INTO ORGANIZER VALUES(7, 'Wade A. Hughes', 'Zenia', '8897', '2465324157', 'Manny Pangilinan', 'Ap #629-7610 Mauris Rd.', 'fringilla.Donec.feugiat@cubiliaCurae.com', 'Ruby Jane', '0728529761', '2017-05-02'); 
INSERT INTO ORGANIZER VALUES(8, 'Haley Q. Gray', 'Whilemina', '1165', '2412134657', 'Jano Gibbs', 'P.O. Box 427, 7273 Aliquam Avenue', 'leo.Cras@quisturpis.net', 'Marivic Partosa', '0720322380', '2016-01-05');
INSERT INTO ORGANIZER VALUES(9, 'Emmanuel F. Witt', 'Macaulay', '3015', '7645246788', 'Manuel Roxas', 'Ap #107-8383 Lectus. Road', 'eros.turpis@vulputate.ca', 'Nino Anuran', '0436572677', '2017-06-14'); 
INSERT INTO ORGANIZER VALUES(10, 'Leo I. Coffey', 'Lacota', '1544', '3445468634', 'Angelica Panganiban', 'Ap #379-8230 Erat. Road', 'facilisis.non@sodalesnisi.ca', 'Marvin Montoya', '0347874163', '2017-02-15'); 
INSERT INTO ORGANIZER VALUES(11, 'Carol N. Massey', 'Lacy', '1196', '4635242446', 'Joey Marquez', 'P.O. Box 942, 6373 Diam Ave', 'Fusce.aliquam@etrutrumeu.ca', 'Darla Santos', '0251575320', '2017-07-26');
INSERT INTO ORGANIZER VALUES(12, 'Flynn X. Ramsey', 'Alana', '9394', '4647687956', 'Angelito Ancheta', 'Ap #431-1235 Dictum St.', 'Pellentesque.habitant.morbi@fringillaporttitorvulputate.org', 'Gemma Parcon', '0679082926', '2016-06-23'); 
INSERT INTO ORGANIZER VALUES(13, 'Melodie Z. Wood', 'Amethyst', '8725', '5735245778', 'Neri Aurellano', 'P.O. Box 713, 2215 Dictum Rd.', 'ipsum.Suspendisse.non@arcuvel.ca', 'Danica Zabala', '0550246607', '2016-12-31');
INSERT INTO ORGANIZER VALUES(14, 'Ryan F. Schwartz', 'Selma', '3981', '3456687945', 'Rebecca Santos', 'P.O. Box 691, 9689 Ut, Rd.', 'non.justo.Proin@nibh.co.uk', 'Roderick Vergara', '0669186317', '2016-06-04');
INSERT INTO ORGANIZER VALUES(15, 'Channing Y. Gallegos', 'Elizabeth', '3447', '3557784534', 'Emily Pino', 'P.O. Box 733, 7251 Congue Street', 'Proin@arcueuodio.org', 'Angelica Cruz', '0307374854', '2015-10-29'); 
INSERT INTO ORGANIZER VALUES(16, 'Zephr N. Barton', 'Inez', '5078', '4354574524', 'Salvacion Adona', '445-8884 Eget Street', 'imperdiet@nonhendrerit.ca', 'Carolina Santos', '0208809552', '2016-01-21');
INSERT INTO ORGANIZER VALUES(17, 'Maxine E. Kemp', 'Keaton', '9332', '57685674534', 'Julieta Dimailig', 'Ap #138-5255 Donec Road', 'penatibus.et.magnis@ornarefacilisiseget.ca', 'Aubrey Traigo', '0113389971', '2016-01-06'); 
INSERT INTO ORGANIZER VALUES(18, 'John H. Case', 'Alma', '1987', '4667453456', 'Noland Castro', '8786 Varius Av.', 'purus@orciquislectus.co.uk', 'Juan Dela Cruz', '0618688762', '2017-01-11');
INSERT INTO ORGANIZER VALUES(19, 'Rebecca A. Colon', 'Edward', '9362', '4535577989', 'Joel Castres', '8789 Purus, Ave', 'dolor.Quisque.tincidunt@eueratsemper.net', 'Kim Ago', '0399094892', '2017-02-25');
INSERT INTO ORGANIZER VALUES(20, 'Armand B. Peterson', 'Pandora', '4283', '4352445578', 'Kimberly Santos', '500-3419 Enim. St.', 'justo@Nuncpulvinararcu.co.uk', 'Allan Madarico', '0117576606', '2016-10-07'); 

INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1000, 'DevCom LH', 'UPLB', 218, 23, 'Lecture Hall', 'et magnis dis parturient');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1001, 'CEM FH', 'UPLB', 129, 65, 'Function Hall', 'dictum placerat, augue. Sed molestie.');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1002, 'CHE LH', 'UPLB', 103, 43, 'Lecture Hall', 'suscipit, est ac facilisis facilisis,');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1003, 'Physci LHA', 'UPLB', 334, 45, 'Lecture Hall', 'leo, in lobortis tellus justo sit');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1004, 'Physci LHB', 'UPLB', 410, 34, 'Lecture Hall', 'diam. Proin dolor. Nulla semper tellus id nunc');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1005, 'Physci LHC', 'UPLB', 155, 67, 'Lecture Hall', 'risus. Nunc ac sem ut dolor dapibus gravida. Aliquam');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1006, 'ICS LH3', 'UPLB', 297, 24, 'Lecture Hall', 'dictum ultricies ligula. Nullam enim. Sed nulla ante, iaculis');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1007, 'ICS LH4', 'UPLB', 157, 45, 'Lecture Hall', 'Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1008, 'ICS MH', 'UPLB', 470, 46, 'Mega Hall', 'malesuada vel, convallis in, cursus');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1009, 'IBS LH', 'UPLB', 141, 35, 'Lecture Hall', 'orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1010, 'CPS LH', 'UPLB', 423, 45, 'Lecture Hall', 'Nullam vitae diam. Proin dolor. Nulla semper tellus');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1011, 'CPC Audi', 'UPLB', 413, 46, 'Auditorium', 'justo. Proin non massa non ante bibendum ullamcorper. Duis');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1012, 'EE Audi', 'UPLB', 388, 45, 'Auditorium', 'ut dolor dapibus gravida. Aliquam');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1013, 'CEAT LH', 'UPLB', 246, 35, 'Lecture Hall', 'quis urna. Nunc quis arcu');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1014, 'ASCLH', 'UPLB', 398, 35, 'Lecture Hall', 'Phasellus dapibus quam quis diam. Pellentesque habitant morbi
tristique senectus');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1015, 'ASLH', 'UPLB', 317, 35, 'Lecture Hall', 'consectetuer adipiscing elit. Etiam laoreet, libero et tristique');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1016, 'CAS MPH1', 'UPLB', 200, 65, 'Multi-Purpose Hall', 'Integer id magna et ipsum cursus vestibulum. Mauris');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1017, 'CAS MPH2', 'UPLB', 200, 67, 'Multi-Purpose Hall', 'eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus.
Donec est.');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1018, 'DL Umali Hall', 'UPLB', 465, 45, 'Hall', 'ullamcorper viverra. Maecenas iaculis aliquet diam. Sed diam');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1019, 'SEARCA', 'UPLB', 412, 56, 'Building', 'lorem eu metus. In lorem. Donec elementum, lorem');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1020, 'MCBLH', 'UPLB', 376, 45, 'Lecture Hall', 'sed sem egestas blandit. Nam nulla magna, malesuada vel,');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1021, 'SU Ballroom Hall', 'UPLB', 180, 23, 'Hall', 'Ut tincidunt vehicula risus. Nulla eget metus');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1022, 'Seniors Social Garden', 'UPLB', 500, 46, 'Garden', 'sem, vitae aliquam eros turpis non enim.');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1023, 'Baker Hall', 'UPLB', 1000, 45, 'Hall', 'risus quis diam luctus lobortis. Class aptent taciti sociosqu ad');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1024, 'Grand Stand', 'UPLB', 1000, 35, 'Grand Stand', 'eu eros. Nam consequat dolor vitae dolor. Donec fringilla.');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1025, 'FT LH', 'UPLB', 492, 56, 'Lecture Hall', 'rutrum magna. Cras convallis convallis dolor. Quisque tincidunt
pede ac');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1026, 'Agro LH', 'UPLB', 200, 56, 'Lecture Hall', 'erat eget ipsum. Suspendisse sagittis. Nullam vitae');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1027, 'MPLH', 'UPLB', 300, 45, 'Lecture Hall', 'convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1028, 'SU Bldg', 'UPLB', 100, 35, 'Building', 'ante dictum cursus. Nunc mauris');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1029, 'Physci Parking Lot', 'UPLB', 500, 45, 'Parking Lot', 'eu, eleifend nec, malesuada ut, sem.');
INSERT INTO VENUE(venueID, name, location, capacity, parking_space_capacity, type, details) VALUES(1030, 'NCAS Audi', 'UPLB', 300, 56, 'Auditorium', 'eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed');

INSERT INTO EVENT VALUES(100, 'Advanced Building Skills Conference', '2017-03-09', '06:00:00', '09:00:00', 'Semi-formal', 'Conference', 'nec luctus felis purus ac tellus.', 'pending', 'NCAS Audi', 'Carter I. Dillon');
INSERT INTO EVENT VALUES(101, 'Pharmaceutical Market Access Seminar', '2017-01-11', '11:00:00', '17:00:00', 'Semi-formal', 'Seminar', 'commodo tincidunt nibh. Phasellus nulla. Integer', 'pending', 'NCAS Audi', 'Carter I. Dillon');
INSERT INTO EVENT VALUES(102, 'Operators Conference', '2017-01-06', '07:00:00', '17:00:00', 'Semi-formal', 'Conference', 'Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac', 'pending', 'NCAS Audi', 'Kasimir T. Oconnor');
INSERT INTO EVENT VALUES(103, 'World ADC Training', '2015-11-18', '12:00:00', '17:00:00', 'Semi-formal', 'Training', 'diam. Duis mi enim, condimentum eget,', 'pending', 'Physci Parking Lot', 'Kasimir T. Oconnor');
INSERT INTO EVENT VALUES(104, 'The structure of clinical trials seminar', '2017-05-31', '09:00:00', '16:00:00', 'Casual', 'Seminar', 'ut aliquam', 'pending', 'Physci Parking Lot', 'Tamara N. Chaney'); 
INSERT INTO EVENT VALUES(105, 'FILTECH 2016', '2016-04-12', '06:00:00', '13:00:00', 'Semi-formal', 'Conference', 'ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in', 'pending', 'Physci Parking Lot', 'Tamara N. Chaney');
INSERT INTO EVENT VALUES(106, 'Concert for a Cause', '2016-08-27', '11:00:00', '22:00:00', 'Casual', 'Concert', 'venenatis lacus. Etiam bibendum', 'pending', 'SU Bldg', 'Zephr N. Barton');
INSERT INTO EVENT VALUES(107, 'GC Convention', '2015-12-24', '08:00:00', '19:00:00', 'Casual', 'Convention', 'Nam interdum', 'pending', 'SU Bldg', 'Zephr N. Barton');
INSERT INTO EVENT VALUES(108, 'Pharma Expo', '2017-04-11', '16:00:00', '22:00:00', 'Semi-formal', 'Expo', 'ridiculus mus. Aenean eget magna. Suspendisse tristique neque', 'pending', 'SU Bldg', 'Zephr N. Barton');
INSERT INTO EVENT VALUES(109, 'Job Expo', '2017-06-17', '11:00:00', '21:00:00', 'Semi-formal', 'Expo', 'nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer', 'pending', 'SU Bldg', 'Zephr N. Barton');
INSERT INTO EVENT VALUES(110, 'CONNECT 2016', '2016-11-16', '12:00:00', '14:00:00', 'Smart Casual', 'Forum', 'at', 'pending', 'MPLH', 'Zephr N. Barton');
INSERT INTO EVENT VALUES(111, 'Hum3 Concert', '2016-10-20', '12:00:00', '14:00:00', 'Casual', 'Concert', 'ornare sagittis felis. Donec', 'pending', 'MPLH', 'Melodie Z. Wood');
INSERT INTO EVENT VALUES(112, 'The 10th National Scientist Forum', '2016-01-24', '12:00:00', '14:00:00', 'Smart Casual', 'Forum', 'Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis. Nulla', 'pending', 'MPLH', 'Melodie Z. Wood'); 
INSERT INTO EVENT VALUES(113, 'A Day with the President', '2017-06-22', '11:00:00', '22:00:00', 'Formal', 'Talk', 'Sed id risus', 'pending', 'Agro LH', 'Melodie Z. Wood');
INSERT INTO EVENT VALUES(114, 'Miss Bulalacao', '2017-02-13', '16:00:00', '22:00:00', 'Casual', 'Film Showing', 'magnis dis parturient montes, nascetur', 'pending', 'Agro LH', 'Armand B. Peterson'); 
INSERT INTO EVENT VALUES(115, 'Ed Sheeran Live in UPLB!', '2017-04-10', '10:00:00', '13:00:00', 'Casual', 'Concert', 'cursus purus. Nullam scelerisque neque sed sem egestas blandit.', 'pending', 'Agro LH', 'Armand B. Peterson'); 
INSERT INTO EVENT VALUES(116, 'Daniel Padilla Live in UPLB!', '2017-03-21', '17:00:00', '19:00:00', 'Casual', 'Concert', 'bibendum. Donec felis', 'pending', 'FT LH', 'Armand B. Peterson'); 
INSERT INTO EVENT VALUES(117, '7th International Workshop on Advances in Nanoscience', '2016-11-10', '14:00:00', '21:00:00', 'Casual', 'Workshop', 'adipiscing, enim mi tempor lorem', 'pending', 'FT LH', 'Leo I. Coffey'); 
INSERT INTO EVENT VALUES(118, 'The Symposium', '2016-01-10', '11:00:00', '19:00:00', 'Casual', 'Symposium', 'quis arcu vel quam dignissim pharetra. Nam ac nulla.', 'pending', 'FT LH', 'Leo I. Coffey');
INSERT INTO EVENT VALUES(119, 'A Seminar on Big Data Analysis', '2016-05-28', '14:00:00', '22:00:00', 'Semi-formal', 'Seminar', 'eu, euismod ac, fermentum vel, pmmauris. Integer sem', 'pending', 'Grand Stand','Leo I. Coffey');
INSERT INTO EVENT VALUES(120, 'TED TALK 1', '2016-12-03', '14:00:00', '16:00:00', 'Casual', 'Talk', 'habitant morbi tristique senectus et netus', 'pending', 'Grand Stand', 'Wade A. Hughes'); 
INSERT INTO EVENT VALUES(121, 'TED TALK 2', '2016-12-03', '16:00:00', '18:00:00', 'Casual', 'Talk', 'lorem, luctus ut, pellentesque eget, dictum placerat,', 'pending', 'Grand Stand', 'Wade A. Hughes');
INSERT INTO EVENT VALUES(122, 'Cytokines Lecture Series 2016', '2016-12-09', '08:00:00', '11:00:00', 'Casual', 'Lecture', 'felis ullamcorper viverra. Maecenas iaculis aliquet', 'pending', 'Grand Stand', 'Wade A. Hughes'); 
INSERT INTO EVENT VALUES(123, 'Cytokines Lecture Series 2016', '2016-12-09', '13:00:00', '16:00:00', 'Casual', 'Lecture', 'augue, eu tempor erat', 'pending', 'Seniors Social Garden', 'Emmanuel F. Witt'); 
INSERT INTO EVENT VALUES(124, 'IEEE Conference on Cognitive Infocommunications', '2016-04-14', '10:00:00', '17:00:00', 'Semi-formal', 'Conference', 'nisl sem, consequat nec, mollis vitae,', 'pending', 'Seniors Social Garden', 'Emmanuel F. Witt'); 
INSERT INTO EVENT VALUES(125, 'Green Urbanism', '2017-05-23', '08:00:00', '14:00:00', 'Casual', 'Seminar', 'et arcu', 'pending', 'Seniors Social Garden', 'Emmanuel F. Witt'); 
INSERT INTO EVENT VALUES(126, 'Syensaya Exhibit', '2016-05-04', '06:00:00', '14:00:00', 'Casual', 'Exhibit', 'magna. Sed eu eros.', 'pending', 'Seniors Social Garden', 'George K. Jarvis'); 
INSERT INTO EVENT VALUES(127, 'Organic Agriculture Seminar', '2016-03-11', '11:00:00', '22:00:00', 'Casual', 'Seminar', 'lacus. Mauris', 'pending', 'Seniors Social Garden', 'George K. Jarvis'); 
INSERT INTO EVENT VALUES(128, 'Streetdance', '2017-09-30', '12:00:00', '18:00:00', 'Casual', 'Contest', 'concert eu dolor egestas rhoncus. Proin nisl sem, consequat nec, mollis', 'pending', 'Baker Hall', 'George K. Jarvis');
INSERT INTO EVENT VALUES(129, 'Star in Carillion Quarter Finals', '2016-11-09', '07:00:00', '15:00:00', 'Casual', 'Contest', 'et magnis dis parturient', 'pending', 'Baker Hall', 'Quentin Q. Fitzpatrick');
INSERT INTO EVENT VALUES(130, 'PalaCASan 2016: Finals', '2016-11-29', '08:00:00', '17:00:00', 'Sports Attire', 'Sportsfest', 'mattis. Cras eget nisi dictum augue', 'approved', 'Baker Hall', 'Quentin Q. Fitzpatrick');