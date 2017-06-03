'use strict';

(() => {
	angular.module('app')
		.controller('UserCtrl', UserCtrl)
		
    UserCtrl.$inject = ['$scope', '$window', '$filter', 'UserService', 'EventService'];

    function UserCtrl($scope, $window, $filter, UserService, EventService) {
        // $scope.pendingEvents = [];
        // $scope.approvedEvents = [];
        // $scope.currentUser = {};
        
        $scope.getUser = function(statusFlag) {
            UserService
                .get_current_user()
                .then(function(res) {
                    console.log(res);
                    $scope.userLogged = res.name;
                    
                    if(statusFlag == 1) {
                        const data = {
                            name: $scope.userLogged,
                            status: "pending"
                        }
                        
                        EventService
                            .retrieve_current_events(data)
                            .then(function(res){
                                $scope.pendingEvents = res.data;
                                console.log($scope.pendingEvents);
                            }, function(err) {
                                Materialize.toast('Failed to retrieve events.', 3000);
                            })

                    } else {
                        const data = {
                            name: $scope.userLogged,
                            status: "approved"
                        }

                        EventService
                            .retrieve_current_events(data)
                            .then(function(res){
                                $scope.approvedEvents = res.data;
                                console.log($scope.approvedEvents);
                            }, function(err) {
                                Materialize.toast('Failed to retrieve events.', 3000);
                            })

                    }
                }, function(err) {
                    Materialize.toast('Failed to retrieve events.', 3000);
                })
        }
        
        $scope.login = function() {
            $scope.clicked = function() {
                $('#loginModal').closeModal();

                UserService
                    .user_log_in($scope.loginData)
                    .then(function(res) {
                        $scope.currentUser = res.name;
                        console.log($scope.currentUser);
                        Materialize.toast('Welcome ' + $scope.currentUser + '!', 5000);
                    }, function(err) {
						Materialize.toast('Failed to log in.', 3000);
                    })
            }        
        }

        $scope.logout = function() {
            $scope.clicked = function() {
                UserService
                    .user_log_out()
                    .then(function(res) {
                    }, function(err) {
                        console.log(err);
                    })
            
            }        
        }
    }
})();

