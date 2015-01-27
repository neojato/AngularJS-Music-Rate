describe('Titleize filter', function() {
  var filter;
  
  beforeEach(function() {
    angular.mock.module('myApp.filters');
    angular.mock.inject(function($filter) {
      filter = $filter('titleize');
    });
  });
  
  it('converts string to titleized string', function() {
    expect(filter("MY UPPERCASE STRING")).toEqual("My Uppercase String");
    expect(filter("my lowercase string")).toEqual("My Lowercase String");
    expect(filter("My MiXeD cAsE sTrInG")).toEqual("My Mixed Case String");
  });
});