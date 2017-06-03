USE EVENT_RESERVATION_SYSTEM;

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