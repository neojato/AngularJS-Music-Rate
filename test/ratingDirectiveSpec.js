describe("Rating directive", function() {
  var scope, element, template = "<div rating score='score' max='max'></div>";
  
  beforeEach(module("app/templates/rating.html"));
  
  beforeEach(function() {
    angular.mock.module('myApp');
    angular.mock.inject(function($rootScope, $compile) {
      scope = $rootScope;
      element = angular.element(template);
      $compile(element)(scope);
    });
  });
  
  it('renders full and empty stars', function() {
    scope.score = 2;
    scope.max = 5;
    scope.$digest();
    expect(element.find(".fa.fa-star-o").length).toEqual(3);
    expect(element.find(".fa.fa-star").length).toEqual(2);
    expect(element.find(".rating-highlight").length).toEqual(0);
    expect(element.find(".rating-normal").length).toEqual(5);
  });
  
  it('changes hovering index', function() {
    scope.score = 0;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    directive.hover(3);
    scope.$digest();
    expect(directive.hoverIdx).toEqual(3);
    expect(element.find(".fa.fa-star-o").length).toEqual(1);
    expect(element.find(".fa.fa-star").length).toEqual(4);
    expect(element.find(".fa.fa-star:eq(3)").parents("a").hasClass("rating-highlight")).toEqual(true);
  });
  
  it('changes hovering index by hovering star', function() {
    scope.score = 0;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    element.find(".fa:eq(3)").trigger("mouseover");
    scope.$digest();
    expect(directive.hoverIdx).toEqual(3);
    expect(element.find(".fa.fa-star-o").length).toEqual(1);
    expect(element.find(".fa.fa-star").length).toEqual(4);
    expect(element.find(".fa.fa-star:eq(3)").parents("a").hasClass("rating-highlight")).toEqual(true);
  });
  
  it('shows the amount of stars based on the score if hover < score',function() {
    scope.score = 4;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    directive.hover(1);
    directive.$digest();
    expect(element.find(".fa.fa-star").length).toEqual(4);
  });
  
  it('shows the amount of stars based on the hover if hover < score',function() {
    scope.score = 1;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    directive.hover(3);
    directive.$digest();
    expect(element.find(".fa.fa-star").length).toEqual(4);
  });
  
  it('stops hovering', function() {
    scope.score = 0;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    directive.hover(3);
    scope.$digest();
    expect(directive.hoverIdx).toEqual(3);
    directive.stopHover();
    scope.$digest();
    expect(directive.hoverIdx).toEqual(-1);
    expect(element.find(".rating-highlight").length).toEqual(0);
  });
  
  it('expects score to be updated', function() {
    scope.score = 0;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    directive.setRating(2);
    scope.$digest();
    expect(scope.score).toEqual(3);
  });
  
  it('stops hovering when score is updated', function() {
    scope.score = 0;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    directive.hover(3);
    scope.$digest();
    expect(element.find(".fa.fa-star:eq(3)").parents("a").hasClass("rating-highlight")).toEqual(true);
    
    directive.setRating(2);
    scope.$digest();
    expect(scope.score).toEqual(3);
    expect(element.find(".rating-highlight").length).toEqual(0);
  });
  
  it('expects score to be updated when clicked', function() {
    scope.score = 0;
    scope.max = 5;
    scope.$digest();
    var directive = element.isolateScope();
    directive.hover(3);
    scope.$digest();
    expect(element.find(".fa.fa-star:eq(3)").parents("a").hasClass("rating-highlight")).toEqual(true);
    
    element.find(".fa:eq(2)").parents("a").trigger("click");
    scope.$digest();
    expect(scope.score).toEqual(3);
    expect(element.find(".rating-highlight").length).toEqual(0);
  });
});