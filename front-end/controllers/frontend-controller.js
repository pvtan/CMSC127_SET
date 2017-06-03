'use strict';

(() => {
	angular.module('app')
		.controller('FrontendCtrl', FrontendCtrl)
		
    FrontendCtrl.$inject = ['$scope', '$window', '$filter'];

    function FrontendCtrl($scope, $window, $filter) {

        $scope.closeSearch = function() {
            $('#searchModal').closeModal();
        }

        $scope.closeEventSearch = function() {
            $('#searchEventModal').closeModal();
        }

        $scope.openLogin = function() {
            $('#loginModal').openModal();
        }

        $scope.openSignup = function() {
            $('#sign-upModal').openModal();
        }

        $scope.print = function() {
            var table = document.getElementById('printArea').innerHTML;
            var myWindow = $window.open('', '', 'width=800, height=600');
            myWindow.document.write(table);
            myWindow.print();
        }

        $scope.printOneEvent = function(data) {
            var table = document.getElementById('printedOne').innerHTML;
            var myWindow = $window.open('', '', 'width=800, height=600');
            myWindow.document.write("Name: ", data.name, "\n");
            myWindow.document.write("Time: ", data.time_start, " to ", data.time_end, "\n");
            myWindow.document.write("Theme: ", data.theme, "\n");
            myWindow.document.write("Dress Code: ", data.dress_code, "\n");
            myWindow.document.write("Details: ", data.details, "\n");
            myWindow.document.write("Venue: ", data.venue, "\n");
            myWindow.document.write("Organizer: ", data.organizer, "\n");
            myWindow.print();
        }
    }
})();

