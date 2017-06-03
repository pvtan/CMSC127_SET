'use strict';

(() => {
	angular.module('app')
		.controller('VenueCtrl', VenueCtrl)
		
    VenueCtrl.$inject = ['$scope', '$window', '$filter', 'VenueService'];

    function VenueCtrl($scope, $window, $filter, VenueService) {
        // $scope.newVenue = {
        //     name: undefined,
        //     location: undefined,
        //     capacity: undefined,
        //     details: undefined,
        //     parking_space_capacity: undefined,
        //     type: undefined
        // }
        $scope.venues = [];

        $scope.getVenues = function() {
            VenueService
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
            VenueService
                .search_venue($scope.name_venue)
                .then(function (res){
                    $scope.venuesResult = res.data;
                    console.log($scope.venuesResult);
                    $('#searchModal').openModal();
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.addVenue = function() {
            $scope.clicked = function() {
                VenueService
                    .insert_venue($scope.newVenue)
                    .then(function(res) {
                        Materialize.toast('Successfully added new venue!', 3000);
                        $scope.venues.push($scope.newVenue);
                    }, function(err) {
                        Materialize.toast('Failed to add new venue.', 3000);
                    })
            
            }        
        }

        $scope.updateVenue = function(venue) {
            console.log(venue);
            VenueService
                .update_venue(venue)
                .then(function(res) {
                    Materialize.toast('Successfully updated venue!', 3000);
                }, function(err) {
                    Materialize.toast('Failed to update new venue.', 3000);
                })
        }

        $scope.removeVenue = function() {
            $scope.clicked = function(name) {
                VenueService
                    .remove_venue(name)
                    .then(function(res) {
                        Materialize.toast('Successfully removed venue!', 3000);
                    }, function(err) {
                        Materialize.toast('Failed to remove new venue.', 3000);
                    })
            }
        }    
    }
})();

