/**
 * @ngdoc factory
 * @name iReceptionistApp.SearchService
 * @description
 * # FormService
 * Service in the iReceptionistApp.
 */
angular.module('iReceptionistApp')
.factory('SearchService', function($http) {
    var API_URL = 'http://52.86.89.63:3000';

    return {
        apiCall: function(req, success, error) {
            req.url = API_URL + req.url;
            $http(req)
            .success(function(data) {
                success(data);
            }).error(function(data, status) {
                error(data, status);
            });
        }
    };
});
