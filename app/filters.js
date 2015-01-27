angular.module("myApp.filters", [])
	.filter("titleize", function() {
  		return function(input) {
        return _.titleize(input);
      };
	});