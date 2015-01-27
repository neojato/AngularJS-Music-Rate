describe("Song rate controller", function() {
  var scope, service;
  
  beforeEach(function() {
    // Create mock service
    service = jasmine.createSpyObj('songService', [ 'get', 'put' ]);

    // Mock Angular module
    angular.mock.module('myApp.controllers');

    // Create Song controller and inject mocks
    angular.mock.inject(function($rootScope, $controller) {
      service.get.andReturn([{
        id: 1,
        artist: "Artist",
        title: "Title",
        score: 0
      }]);

      scope = $rootScope.$new();
      $controller('songCtrl', {
        $scope: scope,
        songService: service
      });
    });
  });
}