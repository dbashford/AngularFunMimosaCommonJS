'use strict'

angular = require 'ang'
services = require 'services/services'
require 'services/message'
require 'vendor/angularResource'

module.exports = services.factory 'twitter', ['$resource', 'message', ($resource, message) ->
	tweets = result: {}

	activity = $resource 'http://search.twitter.com/search.json',
		callback: 'JSON_CALLBACK',
			get:
				method: 'JSONP'

	get = (criteria, success, failure) ->
		tweets.result = activity.get q: criteria
		, (Resource, getResponseHeaders) ->
			message.publish 'search', source: 'Twitter', criteria: criteria

			success.apply(this, arguments) if angular.isFunction success
		, failure

	get: get
	tweets: tweets
]