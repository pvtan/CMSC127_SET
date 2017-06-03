'use strict';

(() => {
	angular.module('app')
		.controller('OrganizerCtrl', OrganizerCtrl)
		
    OrganizerCtrl.$inject = ['$scope', '$window', '$filter', 'OrganizerService', 'UserService'];

    function OrganizerCtrl($scope, $window, $filter, OrganizerService) {
        $scope.organizers = [];
        //$scope.currentUser = {};
        $scope.newOrganizer = {
            organization: undefined,
            username: undefined,
            password: undefined,
            organization_contact_number: undefined,
            contact_person: undefined,
            address: undefined,
            email_address: undefined,
            adviser: undefined,
            adviser_contact_number: undefined
        };

        $scope.getOrganizers = function() {
            OrganizerService
                .retrieve_organizer()
                .then(function (res){
                    $scope.organizers = res.data;
                    console.log($scope.organizers);
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.addOrganizer = function() {
            $scope.clicked = function() {
                console.log($scope.newOrganizer);
                if(!$scope.newOrganizer.username ||
                !$scope.newOrganizer.password ||
                !$scope.newOrganizer.organization ||
                !$scope.newOrganizer.contact_person ||
                !$scope.newOrganizer.organization_contact_number ||
                !$scope.newOrganizer.address ||
                !$scope.newOrganizer.email_address ||
                !$scope.newOrganizer.adviser ||
                !$scope.newOrganizer.adviser_contact_number) {
                    Materialize.toast('Please fill-out all fields correctly!', 3000); 
                } else {
                    $('#sign-upModal').closeModal();
                    OrganizerService
                        .insert_organizer($scope.newOrganizer)
                        .then(function(res) {
                            $scope.organizers.push($scope.newOrganizer);
                            $scope.newOrganizer.username = undefined;
                            $scope.newOrganizer.password = undefined;
                            $scope.newOrganizer.organization = undefined;
                            $scope.newOrganizer.contact_person = undefined;
                            $scope.newOrganizer.organization_contact_number = undefined;
                            $scope.newOrganizer.address = undefined;
                            $scope.newOrganizer.email_address = undefined;
                            $scope.newOrganizer.adviser = undefined;
                            $scope.newOrganizer.adviser_contact_number = undefined;
                        }, function(err) {
                            Materialize.toast('Failed to create new organizer.', 3000); 
                        })
                }
            }
        }

        $scope.getDetails = function() {
            UserService
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

        $scope.updateOrganizer = function() {
            console.log($scope.currentUser);
            OrganizerService
                .update_organizer($scope.currentUser)
                .then(function(res) {
                    Materialize.toast('Successfully updated organizer!', 3000)
                }, function(err) {
                    Materialize.toast("Failed to update organizer.", 3000);
                })
        }

        $scope.updateOrganizerByAdmin = function(org) {
            console.log(org);
            OrganizerService
                .update_organizer(org)
                .then(function(res) {
                    Materialize.toast('Successfully updated organizer!', 3000)
                }, function(err) {
                    Materialize.toast("Failed to update organizer.", 3000);
                })
        }

        $scope.removeOrganizer = function() {
            $scope.clicked = function(name) {
                OrganizerService
                    .remove_organizer(name)
                    .then(function(res) {
                        Materialize.toast("Successfully deleted organizer!", 3000);
                    }, function(err) {
                        Materialize.toast("Failed to delete organizer.", 3000);
                    })
            }
        }
    }
})();

