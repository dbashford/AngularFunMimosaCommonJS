define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  (function() {
  var $, angular, app, hello;

  angular = require("ang");

  hello = require('l18n!nls/hello');

  $ = require('jquery');

  require("c/controllers");

  require("d/directives");

  require("filters/filters");

  require("vendor/angularResource");

  require("responseInterceptors/responseInterceptors");

  require("services/services");

  require('c/gitHub');

  require('c/people');

  require('c/personDetails');

  require('c/searchHistory');

  require('c/twitter');

  require('d/ngController');

  require('d/tab');

  require('d/tabs');

  require('filters/twitterfy');

  require('responseInterceptors/dispatcher');

  app = angular.module('app', ['controllers', 'directives', 'filters', 'ngResource', 'responseInterceptors', 'services']);

  $('body').append('Localized hello ==> ' + hello.hello);

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/github/:searchTerm', {
        controller: 'gitHub',
        reloadOnSearch: true,
        resolve: {
          changeTab: function($rootScope) {
            return $rootScope.$broadcast('changeTab#gitHub');
          }
        }
      }).when('/people/details/:id', {
        controller: 'personDetails',
        reloadOnSearch: true,
        resolve: {
          changeTab: function($rootScope) {
            return $rootScope.$broadcast('changeTab#people');
          }
        }
      }).when('/twitter/:searchTerm', {
        controller: 'twitter',
        reloadOnSearch: true,
        resolve: {
          changeTab: function($rootScope) {
            return $rootScope.$broadcast('changeTab#twitter');
          }
        }
      }).otherwise({
        redirectTo: '/github/dbashford'
      });
    }
  ]);

  app.run([
    '$rootScope', '$log', function($rootScope, $log) {
      $rootScope.$on('error:unauthorized', function(event, response) {});
      $rootScope.$on('error:forbidden', function(event, response) {});
      $rootScope.$on('error:403', function(event, response) {});
      $rootScope.$on('success:ok', function(event, response) {});
      return $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, priorRoute) {
        return $rootScope.$broadcast("" + currentRoute.controller + "$routeChangeSuccess", currentRoute, priorRoute);
      });
    }
  ]);

  angular.bootstrap(document, ['app']);

}).call(this);

});