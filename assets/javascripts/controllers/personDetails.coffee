'use strict'

controllers = require 'c/controllers'
require 'services/people'

module.exports = controllers.controller 'personDetails', ['$scope', '$rootScope', 'people', ($scope, $rootScope, service) ->
	$scope.person = service.person

	$scope.onRouteChange = (routeParams) ->
		service.getPerson routeParams.id
]