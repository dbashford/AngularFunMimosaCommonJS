'use strict'
services = require 'services/services'

module.exports = services.factory 'message', ['$rootScope', ($rootScope) ->
	publish = (name, parameters) ->
		parameters.timeStamp = new Date()

		$rootScope.$broadcast(name, parameters)
	subscribe = (name, listener) ->
		$rootScope.$on name, listener

	publish: publish
	subscribe: subscribe
]