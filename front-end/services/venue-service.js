'use strict';

(() => {
	angular.module('app')
			.factory('VenueService', VenueService);
			
    VenueService.$inject = ['$window', '$http', '$q'];
			
    const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function VenueService($window, $http, $q) {
        const service = {
            insert_venue: insert_venue,
            retrieve_venue: retrieve_venue,
            search_venue: search_venue,
            update_venue: update_venue,
            remove_venue: remove_venue
        }; 

        return service;

        function insert_venue(newVenue) {
            let deferred = $q.defer();
            $http({
                method: 'POST',
                data: $.param(newVenue),
                url: '/insertVenue',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

		function retrieve_venue() {
			let deferred = $q.defer();
			$http({
				method: 'GET',
				url: '/getVenue'
			})
			.then((res) => {
				deferred.resolve(res);
			}, (err) => {
				deferred.reject(err);
			});

			return deferred.promise;
		}

        function search_venue(data) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "name": data },
                url: '/searchVenue',
                headers: headers
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function update_venue(venue) {
            console.log(venue);
            let deferred = $q.defer();
            $http({
                method: 'PUT',
                params: venue,
                url: '/updateVenue',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        function remove_venue(venueToDelete) {
            let deferred = $q.defer();

            $http({
                method: 'DELETE',
                params: { "name": venueToDelete },
                url: '/deleteVenue',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }
	}
})();
