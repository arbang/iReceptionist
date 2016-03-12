/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('DashboardCtrl', function($rootScope, $scope, $cookies, VisitorService, UserService) {
        $rootScope.currentState = 'dashboard';
        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        $scope.user = $cookies.getObject('user');
		    $scope.showMine = false;
        $scope.showActive = null;
        $scope.visitors = [];

        var getActive = function(){
            VisitorService.getVisitorQueue(
                1,
                10,
                $cookies.get('token'),
                function (visObj) {
                    $scope.visitors = visObj;
                    console.log("Grabbing them visitors: ");
                    console.log(visObj);
                },
                function (err) {
                    $scope.alert.danger = err.errorMsg;
                }
            );
        };

        var getInactive = function(){
            //TODO: remove date for final - this is for testing - should get date from picker
            var today = new Date();
            console.log((today.getMonth() +1) + "-" + today.getDate() + "-" + today.getFullYear());
            VisitorService.getVisited(
                1,
                10,
                (today.getMonth()+1) + "-" + today.getDate() + "-" + today.getFullYear(),
                $cookies.get('token'),
                function (visObj) {
                    console.log("Grabbing them inactive visitors: ");
                    console.log(visObj);
                },
                function (err) {
                    console.log("inactive fail");
                }
            );
        };

        getActive();
        getInactive();
        var pusher = new Pusher('7c84af4dd6941414d752', {
            encrypted: true
        });

        var channel = pusher.subscribe($scope.user.business);
        channel.bind('newVisitor', function(data){
            getActive();
        });

        $scope.doCheckOff = function (data){
            console.log(data);
            VisitorService.checkOff(
                data._id,
                $cookies.get('token'),
                function (visObj){
                    console.log("Checked off: " + visObj);
                    getActive();
                },
                function (err) {
                    $scope.alert.danger = err.errorMsg;
                }
            );
        };


    });
