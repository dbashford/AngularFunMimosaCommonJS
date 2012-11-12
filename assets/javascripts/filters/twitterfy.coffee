'use strict'

filters = require 'filters/filters'
module.exports = filters.filter 'twitterfy', [-> (username) ->
	"@#{username}"
]