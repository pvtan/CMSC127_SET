'use strict';

(() => {
	angular.module('app')
			.factory('UserService', UserService);
			
    UserService.$inject = ['$window', '$http', '$q'];
			
    const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function UserService($window, $http, $q) {
        const service = {
            get_current_user : get_current_user,
            user_log_in : user_log_in,
            user_log_out : user_log_out
        }

        return service;

        function get_current_user() {
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
        	
		function user_log_in(loginData) {
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
        
        function user_log_out() {
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
	}
})();
