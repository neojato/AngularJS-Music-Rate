angular.module("myApp.directives", [])
  .directive("rating", function() {
    var directive = {};
    directive.restrict = 'AE';

    directive.scope = {
      score: '=score',
      max: '=max'
    };

    directive.templateUrl = "app/templates/rating.html";

    directive.link = function(scope, elements, attr) {
      scope.updateStars = function() {
        var idx = 0;
        scope.stars = [ ];
        for(idx = 0; idx < scope.max; idx += 1) {
          scope.stars.push({
            full: scope.score > idx
          });
        }
      };
      
      scope.starClass = function(star, idx) {
        var starClass = 'fa-star-o';
        if(star.full) {
          starClass = 'fa-star';
        }
        return starClass;
      };
      
      scope.setRating = function(idx) {
        scope.score = idx + 1;
      };
      
      scope.$watch('score', function(newValue, oldValue) {
        if(newValue !== null && newValue !== undefined) {
          scope.updateStars();
        }
      });
    };

    return directive;
  });