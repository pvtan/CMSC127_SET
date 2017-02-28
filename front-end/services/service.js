'use strict';

(() => {
	angular.module('app')
			.factory('EventService', EventService);
			
    EventService.$inject = ['$window', '$http', '$q'];
			
    const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function EventService($window, $http, $q) {
		const retrieve_venue = function() {
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
		
        const retrieve_event = function(event) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: event,
                url: '/getEvent',
                headers: headers
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        const retrieve_current_events = function(event) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: event,
                url: '/getCurrentEvents',
                headers: headers
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        const retrieve_organizer = function() {
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

        const retrieve_admin = function() {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/getAdmin'
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        const retrieve_profile = function(data) {
            const profile = {
                "name": data
            }
            console.log(profile);
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: profile,
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

        const search_event = function(data) {
            console.log(data);
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: data,
                url: '/searchEvent',
                headers: headers
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        const search_venue = function(data) {
            const venue = {
                "name": data
            }
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: venue,
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

        const check_conflict = function(data) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: data,
                url: '/checkAvailability',
                headers: headers
            })
            .then((res) => {
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

		const insert_venue = function(newVenue) {
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

        const insert_event = function(newEvent) {
            let deferred = $q.defer();
            $http({
                method: 'POST',
                data: $.param(newEvent),
                url: '/addEvent',
                headers: headers
            })
            .then(function(res){ //when success
                $window.location.href = '/#/home';
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const insert_admin = function(newAdmin) {
            let deferred = $q.defer();
            $http({
                method: 'POST',
                params: newAdmin,
                url: '/addAdmin',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const insert_organizer = function(newOrganizer) {
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

        const get_current_user = function() {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/getCurrentUser',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }
        	
		const user_log_in = function(loginData) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: loginData,
                url: '/userLogin',
                headers: headers
            })
            .then(function(res){ //when success
                if(res.data.acct_type == "admin") {
                    $window.location.href = '/#/homeadmin';
                } else if(res.data.acct_type == "organizer") {
                    $window.location.href = '/#/home';
                }
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }
        
        const user_log_out = function() {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/logout',
                headers: headers
            })
            .then(function(res){ //when success
                $window.location.href = '/';
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const approve_event = function(eventToApprove) {
            let event = {
                "name": eventToApprove,
                "cancel": 0
            }
            let deferred = $q.defer();
            $http({
                method: 'PUT',
                params: event,
                url: '/approveEvent',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const cancel_event = function(eventToCancel) {
            let event = {
                "name": eventToCancel,
                "cancel": 1
            }
            console.log(event);
            let deferred = $q.defer();
            $http({
                method: 'PUT',
                params: event,
                url: '/approveEvent',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const update_organizer = function(org) {
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

        const update_admin = function(admin) {
            console.log(admin);
            let deferred = $q.defer();
            $http({
                method: 'PUT',
                params: admin,
                url: '/updateAdmin',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const update_event = function(event) {
            console.log(event);
            let deferred = $q.defer();
            $http({
                method: 'PUT',
                params: event,
                url: '/updateEvent',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const update_venue = function(venue) {
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

        const remove_venue = function(venueToDelete) {
            let venue = {
                "name": venueToDelete
            }
            let deferred = $q.defer();
            $http({
                method: 'DELETE',
                params: venue,
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

        const remove_event = function(eventToDelete) {
            let event = {
                "name": eventToDelete
            }
            let deferred = $q.defer();
            $http({
                method: 'DELETE',
                params: event,
                url: '/deleteEvent',
                headers: headers
            })
            .then(function(res){ 
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

        const remove_organizer = function(orgToDelete) {
            let org = {
                "name": orgToDelete
            }
            let deferred = $q.defer();
            $http({
                method: 'DELETE',
                params: org,
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
		
        const remove_admin = function(adminToDelete) {
            console.log(adminToDelete);
            let admin = {
                "name": adminToDelete
            }
            let deferred = $q.defer();
            $http({
                method: 'DELETE',
                params: admin,
                url: '/deleteAdmin',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            })

            return deferred.promise;
        }

		let service = {};
        service.retrieve_event = retrieve_event;
        service.retrieve_venue = retrieve_venue;
        service.retrieve_organizer = retrieve_organizer;
        service.retrieve_admin = retrieve_admin;
        service.retrieve_current_events = retrieve_current_events;
        service.retrieve_profile = retrieve_profile;
        service.search_event = search_event;
        service.search_venue = search_venue;
        service.check_conflict = check_conflict;
        service.insert_venue = insert_venue;
        service.insert_event = insert_event;
        service.insert_admin = insert_admin;
        service.insert_organizer = insert_organizer;
        service.get_current_user = get_current_user;
        service.user_log_in = user_log_in;
        service.user_log_out = user_log_out;
        service.approve_event = approve_event;
        service.cancel_event = cancel_event;
        service.update_organizer = update_organizer;
        service.update_admin = update_admin;
        service.update_event = update_event;
        service.update_venue = update_venue;
        service.remove_venue = remove_venue;
        service.remove_event = remove_event;
        service.remove_organizer = remove_organizer;
        service.remove_admin = remove_admin;
        return service;
	}
})();
