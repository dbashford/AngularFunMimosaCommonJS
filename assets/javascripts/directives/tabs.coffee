'use strict'

angular = require 'ang'
directives = require 'd/directives'
templates = require 'templates'

module.exports = directives.directive 'tabs', [->
	controller = ['$scope', '$element', '$rootScope', ($scope, $element, $rootScope) ->
		$scope.tabs = []

		$scope.select = (tab) ->
			return if tab.selected is true

			angular.forEach $scope.tabs, (tab) ->
				tab.selected = false

			tab.selected = true

		@addTab = (tab, tabId) ->
			$scope.select tab if $scope.tabs.length is 0

			$scope.tabs.push tab

			if tabId
				$rootScope.$on "changeTab##{tabId}", ->
					$scope.select tab
	]

	controller: controller
	replace: true
	restrict: 'E'
	scope: {}
	template: templates.tabs
	transclude: true
]