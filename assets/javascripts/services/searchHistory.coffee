'use strict'

services = require 'services/services'
module.exports = services.factory 'searchHistory', [->
	searchHistory: []
]