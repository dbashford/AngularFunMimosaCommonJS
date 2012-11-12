angular = require "ang"
hello = require 'l18n!nls/hello'
$ = require 'jquery'

require "c/controllers"
require "d/directives"
require "filters/filters"
require "vendor/angularResource"
require "responseInterceptors/responseInterceptors"
require "services/services"
require 'c/gitHub'
require 'c/people'
require 'c/personDetails'
require 'c/searchHistory'
require 'c/twitter'
require 'd/ngController'
require 'd/tab'
require 'd/tabs'
require 'filters/twitterfy'
require 'responseInterceptors/dispatcher'

app = angular.module 'app', [
  'controllers'
  'directives'
  'filters'
  'ngResource'
  'responseInterceptors'
  'services'
]

$('body').append('Localized hello ==> ' + hello.hello)

app.config ['$routeProvider', ($routeProvider) ->
  $routeProvider
  .when '/github/:searchTerm'
    controller: 'gitHub'
    reloadOnSearch: true
    resolve:
      changeTab: ($rootScope) ->
        $rootScope.$broadcast 'changeTab#gitHub'
  .when '/people/details/:id'
    controller: 'personDetails'
    reloadOnSearch: true
    resolve:
      changeTab: ($rootScope) ->
        $rootScope.$broadcast 'changeTab#people'
  .when '/twitter/:searchTerm'
    controller: 'twitter'
    reloadOnSearch: true
    resolve:
      changeTab: ($rootScope) ->
        $rootScope.$broadcast 'changeTab#twitter'
  .otherwise
    redirectTo: '/github/dbashford'
]

app.run ['$rootScope', '$log', ($rootScope, $log) ->
  $rootScope.$on 'error:unauthorized', (event, response) ->
    #$log.error 'unauthorized'

  $rootScope.$on 'error:forbidden', (event, response) ->
    #$log.error 'forbidden'

  $rootScope.$on 'error:403', (event, response) ->
    #$log.error '403'

  $rootScope.$on 'success:ok', (event, response) ->
    #$log.info 'success'

  # fire an event related to the current route
  $rootScope.$on '$routeChangeSuccess', (event, currentRoute, priorRoute) ->
    $rootScope.$broadcast "#{currentRoute.controller}$routeChangeSuccess", currentRoute, priorRoute
]

angular.bootstrap document, ['app']

