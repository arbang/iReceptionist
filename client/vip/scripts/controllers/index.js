/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
.controller('IndexCtrl', function($scope, $rootScope, $timeout, $cookies, $window) {

    $scope.doLogout = function() {
        $cookies.remove('user');
        $cookies.remove('token');
        $window.location.href = '/auth';
    };

    // If user has no token, they are not authorized.
    if (!$cookies.get('token')) {
        $scope.doLogout();
    } else {
        App.togglePageLoading(); // Stop Page Loading
    }

    /**
    * Set up for anim-in-out because it requires a position: absolute element.
    */
    $rootScope.pageContentWidth = function() {
        return $('#page-content').width();
    };
    $rootScope.pageContentHeight = function() {
        return $('#page-content-ui-view').innerHeight();
    };
    $('#page-content').resize(function() {
        $('#page-content-ui-view').width($rootScope.pageContentWidth());
        $('#page-content').height($rootScope.pageContentHeight());
    });

    /**
    * Clock Functionality
    */
    $scope.clock = '';
    $scope.tickInterval = 10000; //ms (1000ms = 1s)
    var tick = function() {
        $scope.clock = moment().format('LT');
        $timeout(tick, $scope.tickInterval); // Reset Timer
    };
    // Start the timer
    $timeout(tick, $scope.tickInterval);
});
