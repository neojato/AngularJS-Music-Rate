angular.module("myApp.directives", [])
  .directive("rating", function() {
    var directive = { };
    directive.restrict = 'AE';

    directive.scope = {
      score: '=score',
      max: '=max'
    };

    directive.templateUrl = "app/templates/rating.html";

    return directive;
  });