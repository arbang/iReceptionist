/**
 * @ngdoc function
 * @name iReceptionistApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller for the registration page
 */
angular.module('iReceptionistApp')
.controller('RegisterCtrl', function($rootScope, $scope, $http, $window, $cookies, AuthenticationService, DropZone) {

    var REGISTRATION_STEPS = 4;
    $scope.step = 1;
    $scope.register = {};
    $scope.disableNextButton = true;

    $('.select-select2').select2();

    $scope.backStep = function () {
        $scope.step--;
        registerWizard.formwizard('show', 'register-step' + $scope.step);
    };
    $scope.nextStep = function () {
        if ($scope.step === REGISTRATION_STEPS){
            submitRegistration();
            console.log('got in');
        }
        else {
            $scope.step++;
            registerWizard.formwizard('show', 'register-step' + $scope.step);
        }
    };


    $scope.alert = {
        success: 'Registration',
        warning: 'Warning',
        danger: 'Danger'
    };

    $scope.register = {};
    $scope.register.step1 = {};
    $scope.register.step2 = {};
    $scope.register.step1.fullName = '';
    $scope.register.step1.email = '';
    $scope.register.step1.password = '';
    $scope.register.step2.businessName = '';

    var submitRegistration = function() {
        AuthenticationService.register({
                'role': '2',
                'name': $scope.register.step1.fullName,
                'email': $scope.register.step1.email,
                'password': $scope.register.step1.password,
                'businessName': $scope.register.step2.businessName
            },

            // Success
            function (regObj) {
                console.log('register success');


                //
                // Force re-direct back to log-in screen
                //
                //var path = '/app'
                //$window.location.href = path; // Redirect


                //
                // Automatically log-in after registration
                //
                AuthenticationService.login(
                    {
                        'email': $scope.register.step1.email,
                        'password': $scope.register.step1.password
                    },

                    // Success
                    function(userObj) {
                        // Need to set path because we are going from '/auth' to '/app' or '/vip'
                        // TODO: On VIP side, need to use token to reverify the user has the correct role
                        // or else log them off because they don't belong there.
                        // TODO: For now, just do local role level check here and redirect.
                        var path = '/app';
                        if (userObj.user.role === -1) {
                            path = '/vip';
                        }
                        $cookies.put('user', userObj.user, {'path': '/auth'});
                        $cookies.put('token', userObj.token, {'path': '/auth'});
                        $cookies.put('user', userObj.user, {'path': path});
                        $cookies.put('token', userObj.token, {'path': path});
                        $window.location.href = path; // Redirect
                    },
                    // Failure
                    function(err) {
                        //$scope.alert.danger = err.errorMsg;
                        console.log('log in fail');

                    }
                );
            },

            // Error
            function (err) {
                console.log('register fail');
                //$scope.alert.danger = err.errorMsg;

                //
                // Force re-direct back to log-in screen
                //
                //var path = '/app'
                //$window.location.href = path; // Redirect
            }
        );

        //AuthenticationService.login(
        //    {
        //        'email': $scope.register.step1.email,
        //        'password': $scope.register.step1.password
        //    },
        //
        //    // Success
        //    function(userObj) {
        //        // Need to set path because we are going from '/auth' to '/app' or '/vip'
        //        // TODO: On VIP side, need to use token to reverify the user has the correct role
        //        // or else log them off because they don't belong there.
        //        // TODO: For now, just do local role level check here and redirect.
        //
        //        var path = '/app';
        //        if (userObj.user.role === -1) {
        //            path = '/vip';
        //        }
        //        $cookies.put('user', userObj.user, {'path': '/auth'});
        //        $cookies.put('token', userObj.token, {'path': '/auth'});
        //        $cookies.put('user', userObj.user, {'path': path});
        //        $cookies.put('token', userObj.token, {'path': path});
        //        $window.location.href = path; // Redirect
        //    },
        //    // Failure
        //    function(err) {
        //        //$scope.alert.danger = err.errorMsg;
        //        console.log('log in fail');
        //    }
        //);
    };

    $scope.logoUpload = DropZone.createNew('#logoUpload');
    $scope.bgUpload = DropZone.createNew('#bgUpload');

    /**
    *  Jquery Wizard
    */
    /* Set default wizard options */
    var wizardOptions = {
        focusFirstInput: true,
        disableUIStyles: true,
        inDuration: 0,
        outDuration: 0
    };

    /* Initialize Register Wizard */
    var registerWizard = $('#register-wizard');

    registerWizard.formwizard(wizardOptions);

    $('.clickable-steps a').on('click', function(){
        var gotostep = $(this).data('gotostep');

        registerWizard.formwizard('show', gotostep);
    });

    // Docs: http://jqueryvalidation.org/documentation/
    $('#register-wizard').formwizard({
        disableUIStyles: true,
        validationEnabled: true,
        validationOptions: {
            errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
            errorElement: 'span',
            errorPlacement: function(error, e) {
                e.parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                $(e).closest('.help-block').remove();
            },
            success: function(e) {
                // You can use the following if you would like to highlight with green color the input after successful validation!
                e.closest('.form-group').removeClass('has-success has-error'); // e.closest('.form-group').removeClass('has-success has-error').addClass('has-success');
                e.closest('.help-block').remove();
            },
            rules: {
                'register-step1-email': {
                    required: true,
                    email: true
                },
                'register-step1-fullname': {
                    required: true,
                    minlength: 3
                },
                'register-step1-terms': {
                    required: true
                },
                'register-step1-password': {
                    required: true,
                    minlength: 5
                },
                'register-step1-confirm-password': {
                    required: true,
                    equalTo: '#register-step1-password'
                },
                'register-step2-business-name': {
                    required: false,
                    minlength: 2
                },
                'register-step2-business-phone': {
                    required: false,
                    minlength: 7
                },
            },
            messages: {
                'register-step1-email': 'Please enter a valid email address',
                'register-step1-fullname': 'Please enter a valid name',
                'register-step1-terms': 'Please accept the terms to continue',
                'register-step2-business-phone': 'Please enter a valid phone number'
            }
        },
        inDuration: 0,
        outDuration: 0
    });



    $scope.termsHandler = function(isChecked) {
        if (isChecked) {
            $scope.disableNextButton = false;
        } else {
            $scope.disableNextButton = true;
        }
    };

});
