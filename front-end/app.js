'use strict';

(function() {
	angular.module('app', ['ngRoute'])
			.config(router);

    router.$inject = ['$routeProvider', '$locationProvider'];
	function router($routeProvider, $locationProvider) {
		$routeProvider
			.when('/homeadmin', {
				templateUrl: 'views/adminhome.html'
			})
			.when('/get_venues', {
				templateUrl: 'views/get_venues.html'
			})
			.when('/insert_venue', {
				templateUrl: 'views/add_venue.html'
			})
			.when('/add_event', {
				templateUrl: 'views/add_event.html'
			})
			.when('/add_organizer', {
				templateUrl: 'views/add_organizer.html'
			})
			.when('/add_admin', {
				templateUrl: 'views/add_admin.html'
			})
			.when('/get_organizers', {
				templateUrl: 'views/get_organizers.html'
			})
			.when('/edit_user', {
				templateUrl: 'views/edit_profile.html'
			})
			.when('/view_events', {
				templateUrl: 'views/view_user_events.html'
			})
			.when('/edit_user_profile', {
				templateUrl: 'views/edit_user_profile.html'
			})
			.when('/edit_admin_profile', {
				templateUrl: 'views/edit_admin_profile.html'
			})
			.when('/home', {
				templateUrl: 'views/home.html'
			})
			.when('/', {
				templateUrl: 'views/login.html'
			})
			.otherwise({
				redirectTo: '/'
			})	
	}
})();