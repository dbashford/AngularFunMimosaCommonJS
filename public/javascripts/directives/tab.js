define(function(require,e,t){var n=t.uri||"",r=n.substring(0,n.lastIndexOf("/")+1);(function(){"use strict";var e,n;e=require("d/directives"),n=require("templates"),require("d/tabs"),t.exports=e.directive("tab",[function(){var e;return e=function(e,t,n,r){return r.addTab(e,n.tabId)},{link:e,replace:!0,require:"^tabs",restrict:"E",scope:{caption:"@"},template:n.tab,transclude:!0}}])}).call(this)})