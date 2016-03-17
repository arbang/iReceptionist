/**
 * @ngdoc function
 * @name iReceptionistApp.controller:SettingsCtrl
 * @description
 * # SettingsFormsCtrl
 * Controller for the settings page
 */
angular.module('iReceptionistApp')
    .controller('SettingsFormsCtrl', function($scope, $builder, $validator, $rootScope, $cookies, FormService) {
        console.log('builder');
        console.log($builder);

        //$scope.saveNewForm = function() {
        //    App.alert('forms-themes');
        //    console.log($builder);
        //    console.log(JSON.stringify($builder));
        //    sessionStorage.builderJson = JSON.stringify($builder.forms);
        //};

        $rootScope.currentState = 'settings-forms';

        $scope.user = $cookies.getObject('user');

        FormService.createForm(
            $scope.user.business,
            {
                "some": "stuff"
            },
            $cookies.get('token'),
            function (formObj) {
                $scope.employees = formObj;
                $trace("Create form: " + formObj.form.form.some);
            },
            function (err) {
                $trace("Create form fail");
            }
        );

        /* Add default name field if it hasn't been added already */
        var name;
        var nameAdded = false;
        for (var i = 0; i < $builder.forms['default'].length; i++) {
            if ($builder.forms['default'][i]['id'] === 'name') {
                nameAdded = true;
            }
        }

        if (!nameAdded) {
            name = $builder.addFormObject('default', {
                id: 'name',
                component: 'textInput',
                label: 'Name',
                description: 'Your name',
                placeholder: 'Your name',
                required: true,
                editable: false
            });
        }

        $scope.form = $builder.forms['default'];
        $scope.input = [];
        return $scope.submit = function() {
            return $validator.validate($scope, 'default').success(function() {
                return $trace('success');
            }).error(function() {
                return $trace('error');
            });
        };

    });
