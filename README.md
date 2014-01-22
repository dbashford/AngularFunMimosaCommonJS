This is exactly the same as my [AngularFunMimosa](https://github.com/dbashford/AngularFunMimosa) project, but it leverages the `mimosa-require-commonjs` module, which allows for the codebase to be written in CommonJS format.

# Angular Fun - Mimosa
*[Original By Cary Landholt](https://github.com/CaryLandholt/AngularFun)*

*Translated from Grunt to [Mimosa](http://www.mimosa.io)*

## About
* This is an attempt to play with the features of [AngularJS](http://angularjs.org/) and leverage the goodness of [RequireJS](http://requirejs.org/)
* Uses controllers, services, directives, filters, and partials
* Takes advantage of Mimosa's minimal configuration ([grunt config](https://github.com/CaryLandholt/AngularFun/blob/master/grunt.js) vs [mimosa config](https://github.com/dbashford/AngularFunMimosa/blob/master/mimosa-config.js)) and built in RequireJS functionality.

## Prerequisites
* [node.js (at least v0.8.1)](http://nodejs.org/)
* Mimosa
  * `npm install -g mimosa`

## Install Angular Fun

    $ git clone https://github.com/dbashford/AngularFunMimosaCommonJS.git
    $ cd AngularFunMimosaCommonJS
    $ npm install

## Run It

Run Mimosa's watcher with the server turned on.

    $ mimosa watch --server

or

    $ mimosa watch -s


This will 1) watch your directory structure and compile things on the fly and 2) run a server at port 3000 so you can view your application 3) serve the assets gzipped and 4) reload the application whenever something successfully compiles (live reload).  This will do it without optimizations and this with optimizations:

    $ mimosa watch --server --optimize --minify

or

    $ mimosa watch -som

Use the `build` command and the optimize, minify, and package flags and Mimosa will build all of the assets, optimize them into a single file, and then package the application for use outside of Mimosa. Go inside the created `dist` directory and execute `node app.js` and the app works the same.

    $ mimosa build -omp