/**
 * @ngdoc function
 * @name iReceptionistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iReceptionistApp
 */
angular.module('iReceptionistApp')
    .controller('DashboardCtrl', function($rootScope, $scope, AppointmentService) {
        $rootScope.currentState = 'dashboard';
        $('#page-content-ui-view').resize(function() {
            $('#page-content-ui-view').width($rootScope.pageContentWidth());
            $('#page-content').height($rootScope.pageContentHeight());
        });

        $scope.showVisitorsMore = false;
        $scope.visitors = [{
            phone: '(123) 456-7890',
            name: 'Giacomo Guilizzoni',
            employee: 'Amanda',
            notes: 'Just a check up'
        }, {
            phone: '(123) 456-7890',
            name: 'Marco Botton',
            employee: 'Peter',
            notes: 'Not a checkup'
        }, {
            phone: '(123) 456-7890',
            name: 'Mariah Maclachlan',
            employee: 'Venkman',
            notes: ''
        }, {
            phone: '(123) 456-7890',
            name: 'Valerie Liberty',
            employee: 'Powell',
            notes: ''
        }, ];
    });
