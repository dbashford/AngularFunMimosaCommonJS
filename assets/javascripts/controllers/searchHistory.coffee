'use strict'

controllers = require 'c/controllers'
require 'services/message'

module.exports = controllers.controller 'searchHistory', ['$scope', 'message', ($scope, service) ->
	$scope.searchHistory = []

	service.subscribe 'search', (name, parameters) ->
		$scope.searchHistory.push parameters
]