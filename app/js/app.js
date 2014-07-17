
/*================================================================
=>                  App = bookstore
==================================================================*/
/*global angular*/

var app = angular.module('bookstore', ['ngResource', 'ngSanitize', 'ui.router']);


app.config(['$httpProvider', function ($httpProvider) {
	'use strict';

	// This is required for Browser Sync to work poperly
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('stores', {
        url: '/stores',
        templateUrl: 'templates/stores.html',
        controller: 'StoresCtrl'
    })
    .state('stores.books', {
        url: '/:store_id/books',
        templateUrl: 'templates/books.html',
        controller: 'BooksCtrl'
    });
}]);

/*================================================================
=>                  bookstore App Run()  
==================================================================*/

app.run(['$rootScope', function ($rootScope) {
	
	'use strict';

	console.log('Angular.js run() function...');
}]);




/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */
