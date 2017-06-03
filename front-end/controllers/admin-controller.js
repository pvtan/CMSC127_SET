'use strict';

(() => {
	angular.module('app')
		.controller('AdminCtrl', AdminCtrl)
		
    AdminCtrl.$inject = ['$scope', '$window', '$filter', 'AdminService'];

    function AdminCtrl($scope, $window, $filter, AdminService) {
        // $scope.newAdmin = {
        //     name: "",
        //     username: "",
        //     password: "",
        //     contact_number: ""
        // }
        // $scope.admins = [];
        
        $scope.addAdmin = function() {
            $scope.clicked = function() {
                AdminService
                    .insert_admin($scope.newAdmin)
                    .then(function(res) {
                        $scope.admins.push($scope.newAdmin);
                        Materialize.toast('Successfully added new admin!', 3000);
                    }, function(err) {
                        Materialize.toast('Failed to add new admin.', 3000);
                    })
            
            }        
        }

        $scope.getAdmins = function() {
            AdminService
                .retrieve_admin()
                .then(function (res){
                    $scope.admins = res.data;
                    console.log($scope.admins);
                }, function(err) {
                    Materialize.toast(err.message, 3000);
                })
        }
        
        $scope.updateAdmin = function(admin) {
            console.log(admin);
            AdminService
                .update_admin(admin)
                .then(function(res) {
                    Materialize.toast('Successfully updated admin!', 3000);
                }, function(err) {
                    Materialize.toast('Failed to update admin.', 3000);
                })
        }

        $scope.removeAdmin = function(name) {
            console.log(name);
            AdminService
                .remove_admin(name)
                .then(function(res) {
                    Materialize.toast("Successfully deleted admin!", 3000);
                }, function(err) {
                    Materialize.toast('Failed to delete admin.', 3000);
                })
        }
    }
})();

