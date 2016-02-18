/**
 * Created by erikxu on 2/17/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name iReceptionistApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller for the registration page
 */
angular.module('iReceptionistApp')
    .controller('RegisterCtrl', function($rootScope, $scope, AppointmentService) {
        $rootScope.toolbarTitle = 'Start A New Account';
        $scope.helloworld = "hello world";

        console.log('RegisterCtrl loaded.');
    });
