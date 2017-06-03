'use strict';

(() => {
	angular.module('app')
			.factory('AdminService', AdminService);
			
    AdminService.$inject = ['$window', '$http', '$q'];
			
    const headers = {
	    'content-type': 'application/x-www-form-urlencoded'
	};

	function AdminService($window, $http, $q) {
        const service = {
            insert_admin: insert_admin,
            retrieve_admin: retrieve_admin,
            update_admin: update_admin,
            remove_admin: remove_admin
        }

        return service;

        function insert_admin(newAdmin) {
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

        function retrieve_admin() {
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

        function update_admin(admin) {
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
		
        function remove_admin(adminToDelete) {
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
	}
})();
