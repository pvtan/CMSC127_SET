'use strict';

(() => {
	angular.module('app')
		.controller('EventCtrl', EventCtrl)
		
    EventCtrl.$inject = ['$scope', '$window', '$filter', 'EventService', 'UserService'];

    function EventCtrl($scope, $window, $filter, EventService, UserService) {
        $scope.newEvent = {
            name: "",
            event_date: "2017-01-01",
            time_start: undefined,
            time_end: undefined,
            dress_code: undefined,
            theme: undefined,
            details: undefined,
            venue: undefined,
            image: undefined
        }
        $scope.pendingEvents = [];
        $scope.approvedEvents = [];
        $scope.cancelledEvents = [];
    
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
                            UserService
                                .get_current_user()
                                .then(function(res){
                                    $scope.newEvent.organizer = res.name;
                                    EventService
                                    .insert_event($scope.newEvent)
                                    .then(function(res) {
                                        console.log($scope.newEvent);
                                        $scope.pendingEvents.push($scope.newEvent);
                                        Materialize.toast('Successfully added new event!', 4000); 
                                    }, function(err) {
                                        Materialize.toast('Failed to add new event.', 4000); 
                                    })
                                }, function(err){

                                })
                        } else {
                            Materialize.toast('Venue at specified date and time is not available', 4000); 
                        }
                    }, function(err) {
                        Materialize.toast('Failed to add new event.', 4000);
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
            EventService
                .cancel_event(name)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    alert(err.message);
                    console.log(err);
                })
        }

        $scope.updateEvent = function(event) {
            event.event_date = $('.datepicker').val();
            event.time_start = $('#TimeStart').val();
            event.time_end = $('#TimeEnd').val();
            EventService
                .update_event(event)
                .then(function(res) {
                    Materialize.toast('Successfully updated event!', 3000);
                }, function(err) {
                    console.log(err);
                    Materialize.toast('Failed to update event!', 3000);
                })
        }

        $scope.removeEvent = function(a) {
            EventService
                .remove_event(a.name)
                .then(function(res) {
                    Materialize.toast('Successfully deleted event!', 3000);
                    $scope.getCancelledEvents();
                    $scope.getApprovedEvents();
                    $scope.getPendingEvents();
                }, function(err) {
                    Materialize.toast('Failed to delete event!', 3000);
                })
        }
    }
})();

