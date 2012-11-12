'use strict'

angular = require 'ang'
services = require 'services/services'
require 'services/message'
require 'vendor/angularResource'

module.exports = services.factory 'gitHub', ['$resource', 'message', ($resource, message) ->
	repos = result: {}

	activity = $resource 'https://api.github.com/users/:user/repos',
		callback: 'JSON_CALLBACK',
			get:
				method: 'JSONP'

	get = (criteria, success, failure) ->
		repos.result = activity.get user: criteria
		, (Resource, getResponseHeaders) ->
			message.publish 'search', source: 'GitHub', criteria: criteria

			success.apply(this, arguments) if angular.isFunction success
		, failure

	get: get
	repos: repos
]