console.log('client.js loaded');

const app = angular.module('BookTrackerApp', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/book.html',
        controller: 'BookController as vm'
    })
    .when('/category', {
        templateUrl: 'views/category.html',
        controller: 'CategoryController as vm'
    })
    .otherwise({
        templateUrl: '<h1>404 - PAGE NOT FOUND</h1>'
    })
});

