 bookstore WebApp!
=====================
Example app for Angular.


## Installation Notes

This is an Angular.js App and was generated with Yeoman and the [Boom Angular Generator](https://npmjs.org/package/generator-boom)

```
    gulp
```

## Getting Started

Make sure you have the gulp cli installed.

```
npm install -g gulp
```
Start the server that hosts the angular app in development.

```
gulp
```
### Troubleshooting

If you see this error message when starting `gulp bs`:

```
$ gulp
[00:00:09] Using gulpfile /Users/monica/Code/lighthouse/week7/bookstore/gulpfile.js
[00:00:09] Starting 'bs'...
[00:00:09] Finished 'bs' after 2.46 ms
   info  - socket.io started
[BS] Proxy running. Use this URL: http://172.16.42.7:3002
[BS] Not watching any files...

Error: connect ECONNREFUSED
    at errnoException (net.js:904:11)
    at Object.afterConnect [as oncomplete] (net.js:895:19)
```

To fix this you need to upgrade the `browser-sync` package to at least 0.7.7  To do that open up `package.json` and set

```
    "browser-sync": "~0.7.7",
```

# Step 2: Add Bootstrap to the project

We could add a `<link>` tag in index.html to require bootstrap from the CDN, but instead it's better to manage browser library requirements through bower.

Add this line to bower.json

```
    "bootstrap": "3.2.0",
```

Then run

```
bower install
```

This downloads bootstrap into your app's `bower_components` folder. 

Now if you look at the app (localhost:9000) the font should look a lot better.

Automagically, the bootstrap CSS files are loaded into `<link rel="stylesheet" href="bower/_bower.css">`

## Install ui-router

This is an angular module that makes it easy to work with routes for client side web applications where application state is important.

Add this in `bower.json`

```
    "angular-ui-router": "0.2.10",
```

And run bower install to download and install the plugin.

```
bower install
```

Now, we need to require the angular ui router plugin in the angular app.

```js
// app/js/app.js
var app = angular.module('bookstore', ['ngResource', 'ngSanitize', 'ui.router']);
```

# Step 3: Generate a controller

We need to generate a stores controller that will list a bunch of bookstores.

We can use the yeoman generator to do this.

```
yo boom:view stores -css
   create app/templates/stores.html
   invoke   boom:style
   create     app/css/stores.css
   invoke   boom:controller
   create     app/js/controllers/stores.js
```

We also need to define a route for this new controller. When the user visits `http://localhost:9000/#/stores` we will display a list of stores.

```js
// app/js/app.js
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('stores', {
        url: '/stores',
        templateUrl: 'templates/stores.html',
        controller: 'StoresCtrl'
    });
}]);
```

In order to make this route kick in we also need to tell angular where the template should be rendered. This is similar to the `yield` keyword in Rails layouts.

```html
  <body ng-app="bookstore">
    <h1>Welcome to Boom Angular.js Generator!</h1>

    <div ui-view></div> <!-- This tells ui.router where to render the template for the current route -->

    <script type="text/javascript" src="bower/_bower.js"></script>
    <script type="text/javascript" src="js/all.js"></script>
    <!-- endbuild -->
  </body>
```

Now, if you visit `http://localhost:9000/#/stores` you should see the console.log message from the StoresController.

### Displaying some stores

Let's add some sample data for the controller.

```js
// app/js/controllers/stores.js
app.controller('StoresCtrl', ['$scope', function ($scope) {

	'use strict';

	console.log('Controller ===  StoresCtrl');

  $scope.stores = [{id: 1, name: "Burnaby"}, {id: 2, name: "Vancouver"}, {id: 3, name: "Nanaimo"}]
}]);
```

Whenever you attach an object or a function to `$scope` that data will be available in the view that belongs to the controller. This is similar to setting instance variables in actions in Rails.

Let's display the store count on the page.

```html
<!-- app/templates/stores.html -->
<section class="stores" ng-controller="StoresCtrl">
  <h3>{{stores.length}} Stores</h3>
</section>
```
And now we can use the `ng-repeat` keyword to iterate through every store and display its name on the page.

```html
<!-- app/templates/stores.html -->
<section class="stores" ng-controller="StoresCtrl">
  <h3>{{stores.length}} Stores</h3>
  <ul>
    <li ng-repeat="store in stores">{{store.name}}</li>
  </ul>
</section>
```
