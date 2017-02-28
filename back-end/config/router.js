'use strict'

const controller = require(__dirname + '/../controllers/controller')

module.exports = function(router) {
	router.post("/addEvent", controller.addEvent);
    router.get("/getEvent", controller.getEvent);
    router.get("/getCurrentEvents", controller.getCurrentEvents);
    router.delete("/deleteEvent", controller.deleteEvent);
    router.get("/searchEvent", controller.searchEvent);
    router.put("/updateEvent", controller.updateEvent);
    router.put("/approveEvent", controller.approveEvent);
 
    router.post("/insertVenue", controller.insertVenue);
    router.get("/getVenue", controller.getVenue);
    router.delete("/deleteVenue", controller.deleteVenue);
    router.get("/searchVenue", controller.searchVenue);
    router.put("/updateVenue", controller.updateVenue);

    router.post("/addOrganizer", controller.addOrganizer);
	router.get("/getOrganizer", controller.getOrganizer);  
    router.delete("/deleteOrganizer", controller.deleteOrganizer);
    router.put("/updateOrganizer", controller.updateOrganizer)

    router.get("/userLogin", controller.userLogin);
    router.get("/logout", controller.logout);

    router.get("/getAdmin", controller.getAdmin);
    router.post("/addAdmin", controller.addAdmin);
    router.delete("/deleteAdmin", controller.deleteAdmin);
    router.put("/updateAdmin", controller.updateAdmin);

    router.get("/checkAvailability", controller.checkAvailability);
    router.get("/getCurrentUser", controller.getCurrentUser);
    router.get("/getProfile", controller.getProfile);
	return router;
}
