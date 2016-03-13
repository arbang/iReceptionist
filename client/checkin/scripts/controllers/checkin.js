/**
 * Created by Amanda on 3/3/2016.
 */
angular.module('iReceptionistApp')
.controller('CheckinCtrl', function($scope, $rootScope, $cookies, VisitorService) {
        $scope.showFirst=true;
        $scope.showSecond=false;


    var working = false;
    $('.login').on('submit', function (e) {
        console.log('submitted checkin');
        e.preventDefault();
        if (working) return;
        working = true;
        $('.spinner').show();
        var $this = $(this),
            $state = $this.find('button > .check');
        $this.addClass('loading');
        $state.html('Checking You In...');
        setTimeout(function () {
            $this.addClass('ok');
            $state.html('Thank you! You will be called shortly.');
            setTimeout(function () {
                $state.html('Check In');
                $this.removeClass('ok loading');
                working = false;
                $('.spinner').hide();
            }, 4000);
        }, 3000);

    });

    $scope.doCheckIn = function(){
        console.log($scope.fstname + " " + $scope.lstname);
        console.log($cookies.get('token'));
        VisitorService.checkin(
            {
                'name' : $scope.fstname + " " + $scope.lstname,
                'phone': $scope.phonenum
            },
            $cookies.get('token'),
            function(){
                console.log("Success new visitor");
                $scope.fstname = null;
                $scope.lstname = null;
                $scope.phonenum = null;
            },
            function(err) {
                $scope.alert.danger = err.errorMsg;
            }
        );

        $scope.showFirst=false;
        $scope.showSecond=true;
    };
});

