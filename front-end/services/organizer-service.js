'use strict';

(() => {
	angular.module('app')
			.factory('OrganizerService', OrganizerService);
			
    OrganizerService.$inject = ['$window', '$http', '$q'];
			
    const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function OrganizerService($window, $http, $q) {
        const service = {
            insert_organizer: insert_organizer,
            retrieve_organizer: retrieve_organizer,
            retrieve_profile: retrieve_profile,
            update_organizer: update_organizer,
            remove_organizer: remove_organizer
        }
        
        return service;

        function insert_organizer(newOrganizer) {
            let deferred = $q.defer();
            console.log(newOrganizer);
            $http({
                method: 'POST',
                data: $.param(newOrganizer),
                url: '/addOrganizer',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        function retrieve_organizer() {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/getOrganizer'
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function retrieve_profile(data) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { "name": data },
                url: '/getProfile',
                headers: headers
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function update_organizer(org) {
            console.log(org);
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                params: org,
                url: '/updateOrganizer',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        function remove_organizer(orgToDelete) {
            let deferred = $q.defer();
            
            $http({
                method: 'DELETE',
                params: { "name": orgToDelete },
                url: '/deleteOrganizer',
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
