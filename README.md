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

