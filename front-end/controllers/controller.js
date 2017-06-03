'use strict';

(() => {
	angular.module('app')
		.controller('EventCtrl', EventCtrl)
		
    EventCtrl.$inject = ['$scope', '$window', '$filter', 'EventService'];

    function EventCtrl($scope, $window, $filter, EventService) {
        $scope.currentUser = {};
        $scope.userLogged = "";
        $scope.name_event= "";
        $scope.name_venue= "";
        $scope.pendingEvents = [];
        $scope.approvedEvents = [];
        $scope.cancelledEvents = [];
        $scope.events = [];
        $scope.venues = [];
        $scope.venuesResult = [];
        $scope.eventsResult = [];
        $scope.organizers = [];
        $scope.admins = [];
        $scope.approved = {
            status: "approved"
        }
        $scope.pending = {
            status: "pending"
        }
        $scope.cancelled = {
            status: "cancelled"
        }
        $scope.newAdmin = {
            name: "",
            username: "",
            password: "",
            contact_number: ""
        }
        $scope.newVenue = {
            name: "",
            location: "",
            capacity: "",
            details: "",
            parking_space_capacity: "",
            type: ""
        }
        $scope.newEvent = {
            name: "",
            event_date: "YYYY-MM-DD",
            time_start: "",
            time_end: "",
            dress_code: "",
            theme: "",
            details: "",
            venue: "",
            image: ""
        }
        $scope.newOrganizer = {
            organization: "",
            username: "",
            password: "",
            organization_contact_number: "",
            contact_person: "",
            address: "",
            email_address: "",
            adviser: "",
            adviser_contact_number: ""
        };
        $scope.loginData = {
            username: "",
            password: ""
        }

        $scope.getOrganizers = function() {
            EventService
                .retrieve_organizer()
                .then(function (res){
                    $scope.organizers = res.data;
                    console.log($scope.organizers);
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.getAdmins = function() {
            EventService
                .retrieve_admin()
                .then(function (res){
                    $scope.admins = res.data;
                    console.log($scope.admins);
                }, function(err) {
                    console.log(err);
                })
        }
    
        $scope.getApprovedEvents = function() {
            EventService
                .retrieve_event($scope.approved)
                .then(function (res){
                    $scope.approvedEvents = res.data;
                    console.log($scope.approvedEvents);
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.getPendingEvents = function() {
            EventService
                .retrieve_event($scope.pending)
                .then(function (res){
                    $scope.pendingEvents = res.data;
                    console.log($scope.pendingEvents);
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.getCancelledEvents = function() {
            EventService
                .retrieve_event($scope.cancelled)
                .then(function (res){
                    $scope.cancelledEvents = res.data;
                    console.log($scope.cancelledEvents);
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.getUser = function(statusFlag) {
            EventService
                .get_current_user()
                .then(function(res) {
                    $scope.userLogged = res.name;
                    if(statusFlag == 1) {
                        const data = {
                            name: $scope.userLogged,
                            status: $scope.pending.status
                        }
                        EventService
                            .retrieve_current_events(data)
                            .then(function(res){
                                $scope.pendingEvents = res.data;
                                console.log($scope.pendingEvents);
                            }, function(err) {
                                console.log(err);
                            })
                    } else {
                        const data = {
                            name: $scope.userLogged,
                            status: $scope.approved.status
                        }
                        EventService
                            .retrieve_current_events(data)
                            .then(function(res){
                                $scope.approvedEvents = res.data;
                                console.log($scope.approvedEvents);
                            }, function(err) {
                                console.log(err);
                            })
                    }
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.getCurrentUser = function() {
            EventService
                .get_current_user()
                .then(function (res){
                     $scope.currentUser = res;
                        const query = {
                         "organizer": $scope.currentUser.name,
                         "name": $scope.name_event
                     }
                     console.log(query);
                     EventService
                         .search_event(query)
                         .then(function (res){
                             $scope.eventsResult = res.data;
                             console.log($scope.eventsResult);
                             $('#searchEventModal').openModal();
                         }, function(err) {
                             console.log(err);
                         })
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.getDetails = function() {
            EventService
                .get_current_user()
                .then(function(res) {
                    $scope.currentUser = res;
                    console.log($scope.currentUser);
                    EventService
                        .retrieve_profile($scope.currentUser.name)
                        .then(function(res) {
                            $scope.currentUser = res.data[0];
                            console.log($scope.currentUser);
                        }, function(err) {
                            console.log(err);
                        })
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.getVenues = function() {
            EventService
                .retrieve_venue()
                .then(function (res){
                    $scope.venues = res.data;
                    console.log($scope.venues);
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.searchVenue = function() {
            $scope.name_venue = $('#searchvenue').val();
            console.log($scope.name_venue);
            EventService
                .search_venue($scope.name_venue)
                .then(function (res){
                    $scope.venuesResult = res.data;
                    console.log($scope.venuesResult);
                    $('#searchModal').openModal();
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.closeSearch = function() {
            $('#searchModal').closeModal();
        }

        $scope.closeEventSearch = function() {
            $('#searchEventModal').closeModal();
        }

        $scope.addVenue = function() {
            $scope.clicked = function() {
                EventService
                    .insert_venue($scope.newVenue)
                    .then(function(res) {
                        $scope.venues.push($scope.newVenue);
                    }, function(err) {
                        console.log(err);
                    })
            
            }        
        }

        $scope.addAdmin = function() {
            $scope.clicked = function() {
                EventService
                    .insert_admin($scope.newAdmin)
                    .then(function(res) {
                        $scope.admins.push($scope.newAdmin);
                    }, function(err) {
                        console.log(err);
                    })
            
            }        
        }

        $scope.addOrganizer = function() {
            $scope.clicked = function() {
                if($scope.newOrganizer.username == "" ||
                $scope.newOrganizer.password == "" ||
                $scope.newOrganizer.organization == "" ||
                $scope.newOrganizer.contact_person == "" ||
                $scope.newOrganizer.organization_contact_number == "" ||
                $scope.newOrganizer.address == "" ||
                $scope.newOrganizer.email_address == "" ||
                $scope.newOrganizer.adviser == "" ||
                $scope.newOrganizer.adviser_contact_number == "") {
                    Materialize.toast('Please fill-out all fields correctly!', 3000); 
                } else {
                    $('#sign-upModal').closeModal();
                    EventService
                        .insert_organizer($scope.newOrganizer)
                        .then(function(res) {
                            $scope.organizers.push($scope.newOrganizer);
                            $scope.newOrganizer.username = "";
                            $scope.newOrganizer.password = "";
                            $scope.newOrganizer.organization = "";
                            $scope.newOrganizer.contact_person = "";
                            $scope.newOrganizer.organization_contact_number = "";
                            $scope.newOrganizer.address = "";
                            $scope.newOrganizer.email_address = "";
                            $scope.newOrganizer.adviser = "";
                            $scope.newOrganizer.adviser_contact_number = "";
                        }, function(err) {
                            console.log(err);
                        })
                }
            }
        }

        $scope.checkAvailability = function() {
            $scope.newEvent.event_date = $('.datepicker').val();
            $scope.newEvent.time_start = $('#Start').val();
            $scope.newEvent.time_end = $('#End').val();
            $scope.newEvent.venue = $('.pick option:selected').text();

            if($scope.newEvent.name == "" ||
            $scope.newEvent.event_date == "YYYY-MM-DD" ||
            $scope.newEvent.time_start == "" ||
            $scope.newEvent.time_end == "" ||
            $scope.newEvent.dress_code == "" ||
            $scope.newEvent.theme == "" ||
            $scope.newEvent.details == "" ||
            $scope.newEvent.venue == "") {
                Materialize.toast('Please fill-out all fields correctly!', 3000); 
            } else {
                const data = {
                    time_start: $scope.newEvent.time_start,
                    time_end: $scope.newEvent.time_end,
                    venue: $scope.newEvent.venue,
                    event_date: $scope.newEvent.event_date
                }
                EventService
                    .check_conflict(data)
                    .then(function(res) {
                        console.log(res.data.length);
                        if(res.data.length == 0) { //no conflicts
                            EventService
                                .insert_event($scope.newEvent)
                                .then(function(res) {
                                    console.log($scope.newEvent);
                                    $scope.pendingEvents.push($scope.newEvent);
                                    Materialize.toast('New event added!', 4000); 
                                }, function(err) {
                                    Materialize.toast(err.message, 4000); 
                                })
                        } else {
                            Materialize.toast('Venue at specified date and time is not available', 4000); 
                        }
                    }, function(err) {
                        console.log(err);
                    })
            }
        }
        
        $scope.login = function() {
            console.log("Login Ako");
            $scope.clicked = function() {
                $('#loginModal').closeModal();
                EventService
                    .user_log_in($scope.loginData)
                    .then(function(res) {
                        $scope.currentUser = res.name;
                        console.log($scope.currentUser);
                    }, function(err) {
						alert(err.message);
                        console.log(err);
                    })
            }        
        }

        $scope.openLogin = function() {
            $('#loginModal').openModal();
        }

        $scope.openSignup = function() {
            $('#sign-upModal').openModal();
        }

        $scope.logout = function() {
            $scope.clicked = function() {
                EventService
                    .user_log_out()
                    .then(function(res) {
                    }, function(err) {
                        console.log(err);
                    })
            
            }        
        }

        $scope.approveEvent = function(name) {
            EventService
                .approve_event(name)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    alert(err.message);
                    console.log(err);
                })
        }

        $scope.cancelEvent = function(name) {
            console.log("Cancel Ako");
            EventService
                .cancel_event(name)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    alert(err.message);
                    console.log(err);
                })
        }

        $scope.updateOrganizer = function() {
            console.log($scope.currentUser);
            EventService
                .update_organizer($scope.currentUser)
                .then(function(res) {
                    Materialize.toast('Organizer Updated!', 3000)
                }, function(err) {
                    console.log(err);
                    Materialize.toast(err.message, 3000);
                })
        }

        $scope.updateAdmin = function(admin) {
            console.log(admin);
            EventService
                .update_admin(admin)
                .then(function(res) {
                    Materialize.toast('Admin Updated!', 3000)
                }, function(err) {
                    console.log(err);
                    Materialize.toast(err.message, 3000);
                })
        }

        $scope.updateOrganizerByAdmin = function(org) {
            console.log(org);
            EventService
                .update_organizer(org)
                .then(function(res) {
                    Materialize.toast('Organizer Updated!', 3000)
                }, function(err) {
                    console.log(err);
                    Materialize.toast(err.message, 3000);
                })
        }

        $scope.updateEvent = function(event) {
            event.event_date = $('.datepicker').val();
            event.time_start = $('#TimeStart').val();
            event.time_end = $('#TimeEnd').val();
            console.log(event);
            EventService
                .update_event(event)
                .then(function(res) {
                    Materialize.toast('Event Updated!', 3000)
                }, function(err) {
                    console.log(err);
                    Materialize.toast(err.message, 3000);
                })
        }

        $scope.updateVenue = function(venue) {
            console.log(venue);
            EventService
                .update_venue(venue)
                .then(function(res) {
                    Materialize.toast('Venue Updated!', 3000)
                }, function(err) {
                    console.log(err);
                    Materialize.toast(err.message, 3000);
                })
        }

        $scope.removeVenue = function() {
            $scope.clicked = function(name) {
                EventService
                    .remove_venue(name)
                    .then(function(res) {
                        console.log(res);
                    }, function(err) {
                        alert(err.message);
                        console.log(err);
                    })
            }
        }

        $scope.removeEvent = function() {
            $scope.clicked = function(name) {
                EventService
                    .remove_event(name)
                    .then(function(res) {
                        Materialize.toast("Successfully deleted event!", 3000);
                        console.log(res);
                    }, function(err) {
                        Materialize.toast(err.message, 3000);
                        console.log(err);
                    })
            }
        }

        $scope.removeOrganizer = function() {
            $scope.clicked = function(name) {
                EventService
                    .remove_organizer(name)
                    .then(function(res) {
                        Materialize.toast("Successfully deleted organizer!", 3000);
                        console.log(res);
                    }, function(err) {
                        Materialize.toast(err.message, 3000);
                        console.log(err);
                    })
            }
        }

        $scope.removeAdmin = function(name) {
            console.log(name);
            EventService
                .remove_admin(name)
                .then(function(res) {
                    Materialize.toast("Successfully deleted admin!", 3000);
                    console.log(res);
                }, function(err) {
                    Materialize.toast(err.message, 3000);
                    console.log(err);
                })
        }

        $scope.print = function() {
            var table = document.getElementById('printArea').innerHTML;
            var myWindow = $window.open('', '', 'width=800, height=600');
            myWindow.document.write(table);
            myWindow.print();
        }

        $scope.printOneEvent = function(data) {
            var table = document.getElementById('printedOne').innerHTML;
            var myWindow = $window.open('', '', 'width=800, height=600');
            myWindow.document.write("Name: ", data.name, "\n");
            myWindow.document.write("Time: ", data.time_start, " to ", data.time_end, "\n");
            myWindow.document.write("Theme: ", data.theme, "\n");
            myWindow.document.write("Dress Code: ", data.dress_code, "\n");
            myWindow.document.write("Details: ", data.details, "\n");
            myWindow.document.write("Venue: ", data.venue, "\n");
            myWindow.document.write("Organizer: ", data.organizer, "\n");
            myWindow.print();
        }
    }
})();

