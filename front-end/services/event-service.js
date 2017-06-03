'use strict';

(() => {
	angular.module('app')
			.factory('EventService', EventService);
			
    EventService.$inject = ['$window', '$http', '$q'];
			
    const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function EventService($window, $http, $q) {
        const service = {
            insert_event: insert_event,
            retrieve_event: retrieve_event,
            retrieve_current_events: retrieve_current_events,
            search_event: search_event,
            update_event: update_event,
            remove_event: remove_event,
            approve_event: approve_event,
            cancel_event: cancel_event,
            check_conflict: check_conflict
        }

        return service;

        function insert_event(newEvent) {
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

        function retrieve_event(event) {
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

        function retrieve_current_events(event) {
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

        function search_event(data) {
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

        function update_event(event) {
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

        function remove_event(eventToDelete) {
            let deferred = $q.defer();

            $http({
                method: 'DELETE',
                params: { "name": eventToDelete },
                url: '/deleteEvent',
                headers: headers
            })
            .then(function(res){ 
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            });

            return deferred.promise;
        }

        function approve_event(eventToApprove) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                params: { "name": eventToApprove, "cancel": 0 },
                url: '/approveEvent',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            });

            return deferred.promise;
        }

        function cancel_event(eventToCancel) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                params: { "name": eventToCancel, "cancel": 1 },
                url: '/approveEvent',
                headers: headers
            })
            .then(function(res){ //when success
                deferred.resolve(res.data);
            }, function(err) { //when error
                deferred.reject(err.data);
            });

            return deferred.promise;
        }

        function check_conflict(data) {
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
    }
})();
