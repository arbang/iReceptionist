'use strict';

/**
 * @ngdoc overview
 * @name iReceptionistApp
 * @description
 * # iReceptionistApp
 *
 * Main module of the application.
 */
angular
.module('iReceptionistApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAria',
    'ui.router',
    'ui.bootstrap',
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .state('employees', {
            url: '/employees',
            templateUrl: 'views/employees.html',
            controller: 'EmployeesCtrl'
        })
        .state('settings-account', {
            url: '/settings/account',
            templateUrl: 'views/settings/settings_account.html',
            controller: 'SettingsAccountCtrl'
        })
        .state('settings-forms-themes', {
            url: '/settings/forms-themes',
            templateUrl: 'views/settings/settings_forms_themes.html',
            controller: 'SettingsFormsThemesCtrl'
        })
        .state('settings-billing', {
            url: '/settings/billing',
            templateUrl: 'views/settings/settings_billing.html',
            controller: 'SettingsBillingCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/auth/register.html',
            controller: 'RegisterCtrl'
        });
})
.constant('config', {
    'apiUrl': 'http://localhost/api'
});
