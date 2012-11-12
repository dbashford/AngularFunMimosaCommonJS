'use strict'

directives =  require 'd/directives'

module.exports = directives.directive 'ngController', ['$rootScope', ($rootScope) ->
	link = (scope, element, attrs, controller) ->
		$rootScope.$on "#{attrs.ngController}$routeChangeSuccess", (event, currentRoute, priorRoute) ->
			scope.onRouteChange(currentRoute.params) if scope.onRouteChange

	link: link
	restrict: 'A'
]