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

# Part 4: Books controller

When the user clicks on a store we want to list the most popular books in that store.

First, we'll need a books controller.

```
yo boom:view books -css
```

Then, we'll need to set up a new route so that `/stores/1/books` displays the books for store with id 1.

```js
//app/js/app.js
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
```

Set up the proper `href` links in the stores view and add `ui-view` to tell ui.router where to render the books.html template.

```html
<!-- app/templates/stores.html -->
<section class="stores" ng-controller="StoresCtrl">
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <h3>{{stores.length}} Stores</h3>
        <ul class="nav nav-pills nav-stacked">
          <!-- add the store id in the route -->
          <li ng-repeat="store in stores"><a href="#/stores/{{store.id}}/books">{{store.name}}</a></li>
        </ul>
      </div>
      <div class="col-md-10">
        <!-- need to add this to tell angular where to render the child view books.html-->
        <div ui-view></div>
      </div>
    </div>
  </div>
  </div>
</section>
```

Add some dummy book data in the controller. This is not the best place to put it, but we'll leave it here for now.

```
// app/js/controllers/books.js
app.controller('BooksCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

  'use strict';

  console.log('Controller ===  BooksCtrl');

  // Using $stateParams we can access url params
  console.log('The store id is', $stateParams.store_id);

  // Hardcode $scope.books. This data could just as easily have come from an API though...
  $scope.stores = [
    // dummy data goes here.
  ]

  // use lodash to retrieve the books for the current store
  $scope.store = _($scope.stores).where({'id': parseInt($stateParams.store_id)}).first();
  $scope.books = $scope.store.books || [];
}]);
```

Need to add lodash to the bower requirements to be able to use the `_($scope.stores).where()` method to search through the javascript objects.

```
// bower.json
{
  "name": "bookstore",
  "version": "0.0.0",
  "dependencies": {
    "angular": "1.2.6",
    "angular-resource": "1.2.6",
    "angular-sanitize": "1.2.6",
    "angular-ui-router": "0.2.10",
    "bootstrap": "3.2.0",
    "jquery": "*",
    "lodash": "2.4.1"   // <--- added this
  },
  "devDependencies": {
    "angular-mocks": "1.2.6",
    "angular-scenario": "1.2.6"
  },
  "overrides": {

  }
}

```

Add the template html to display the books.


```html
<!-- app/templates/books.html -->
<section class="books" ng-controller="BooksCtrl">
  <h2>{{store.name}} Store</h2>
  <div class="panel panel-default" ng-repeat="book in books">
    <div class="panel-heading">
      <h3 class="panel-title">{{book.title}}</h3>
    </div>
    <div class="panel-body">
      {{book.description}}
    </div>
  </div>
</section>
```

# Step 5: Extract the dummy data into a service


# Fin.

This is just a simple demo that barely scratches the surface of what angular can do.

The main goal of this app is to show you some of the angular dev tools (yeoman, gulp, livereload) and show you how to get started with angular.

As a next step you can check out the videos at [http://egghead.io](http://egghead.io).

## Resources

http://yeoman.io/

https://github.com/aamirshah/generator-boom

https://github.com/angular-ui/ui-router

http://lodash.com/docs#where

