'use strict'

const admin_controller = require(__dirname + '/../controllers/admin-controller');
const event_controller = require(__dirname + '/../controllers/event-controller');
const organizer_controller = require(__dirname + '/../controllers/organizer-controller');
const user_controller = require(__dirname + '/../controllers/user-controller');
const venue_controller = require(__dirname + '/../controllers/venue-controller');

module.exports = function(router) {
	router.post("/addEvent", event_controller.addEvent);
    router.get("/getEvent", event_controller.getEvent);
    router.get("/getCurrentEvents", event_controller.getCurrentEvents);
    router.get("/searchEvent", event_controller.searchEvent);
    router.put("/updateEvent", event_controller.updateEvent);
    router.delete("/deleteEvent", event_controller.deleteEvent);
    router.put("/approveEvent", event_controller.approveEvent);
    router.get("/checkAvailability", event_controller.checkAvailability);
 
    router.post("/insertVenue", venue_controller.insertVenue);
    router.get("/getVenue", venue_controller.getVenue);
    router.get("/searchVenue", venue_controller.searchVenue);
    router.put("/updateVenue", venue_controller.updateVenue);
    router.delete("/deleteVenue", venue_controller.deleteVenue);

    router.post("/addOrganizer", organizer_controller.addOrganizer);
	router.get("/getOrganizer", organizer_controller.getOrganizer);  
    router.get("/getProfile", organizer_controller.getProfile);
    router.put("/updateOrganizer", organizer_controller.updateOrganizer)
    router.delete("/deleteOrganizer", organizer_controller.deleteOrganizer);

    router.get("/getCurrentUser", user_controller.getCurrentUser);
    router.get("/userLogin", user_controller.userLogin);
    router.get("/logout", user_controller.logout);

    router.post("/addAdmin", admin_controller.addAdmin);
    router.get("/getAdmin", admin_controller.getAdmin);
    router.put("/updateAdmin", admin_controller.updateAdmin);
    router.delete("/deleteAdmin", admin_controller.deleteAdmin);

	return router;
}
