 bookstore WebApp!
=====================
Example app for Angular.


## Installation Notes

This is an Angular.js App and was generated with Yeoman and the [Boom Angular Generator](https://npmjs.org/package/generator-boom)

```
    gulp bs
```

### Troubleshooting

If you see this error message when starting `gulp bs`:

```
$ gulp bs
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

## Getting Started

Make sure you have the gulp cli installed.

```
npm install -g gulp
```
Start the server that hosts the angular app in development.

```
gulp bs
```
