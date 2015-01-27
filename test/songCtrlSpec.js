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
  
  it("retrieves songs on load", function() {
    expect(service.get).toHaveBeenCalled();
    expect(scope.songs.length).toEqual(1);
    expect(scope.songs[0].artist).toEqual("Artist");
    expect(scope.songs[0].title).toEqual("Title");
    expect(scope.songs[0].score).toEqual(0);
  });
  
  it('adds song to list', function() {
    scope.songs = [ ];
    scope.addSong('Artist 1', 'Title 1');
    expect(scope.songs.length).toEqual(1);
    expect(scope.songs[0].artist).toEqual("Artist 1");
    expect(scope.songs[0].title).toEqual("Title 1");
    expect(scope.songs[0].score).toEqual(0);
  });
  
  it('adds multiple songs to list', function() {
    scope.songs = [ ];
    scope.addSong('Artist 1', 'Title 1');
    scope.addSong('Artist 2', 'Title 2');
    expect(scope.songs.length).toEqual(2);
    expect(scope.songs[0].artist).toEqual("Artist 1");
    expect(scope.songs[0].title).toEqual("Title 1");
    expect(scope.songs[0].score).toEqual(0);
    expect(scope.songs[1].artist).toEqual("Artist 2");
    expect(scope.songs[1].title).toEqual("Title 2");
    expect(scope.songs[1].score).toEqual(0);
  });
  
  it('stores data while adding', function() {
    scope.songs = [ ];
    // Manually $apply to trigger $watch
    scope.$apply();
    scope.addSong('Artist 1', 'Title 1');

    // Manually $apply to trigger $watch (and get differences)
    scope.$apply();
    expect(service.put).toHaveBeenCalledWith(scope.songs);
  });
  
  it('clears form model when adding song to list', function() {
    scope.newSong.artist = "Artist 1";
    scope.newSong.title = "Title 1";
    
    scope.addSong('Artist 1', 'Title 1');
    expect(scope.newSong.artist).toEqual("");
    expect(scope.newSong.title).toEqual("");
  });
  
  it('deletes song', function() {
    scope.deleteSong(scope.songs[0]);
    expect(scope.songs.length).toEqual(0);
  });
  
  it('deletes song in the middle', function() {
    scope.addSong('Artist 1', 'Title 1');
    scope.addSong('Artist 2', 'Title 2');
    expect(scope.songs.length).toEqual(3);
    scope.deleteSong(scope.songs[1]);
    expect(scope.songs.length).toEqual(2);
    
    expect(scope.songs[0].artist).toEqual('Artist');
    expect(scope.songs[0].title).toEqual('Title');
    expect(scope.songs[1].artist).toEqual('Artist 2');
    expect(scope.songs[1].title).toEqual('Title 2');
  });
  
  it('cannot delete a non-existing song', function() {
    scope.deleteSong({
      title: "Title",
      artist: "Another artist",
      score: 0
    });
    expect(scope.songs.length).toEqual(1);
  });
  
  it('stores data while deleting a song', function() {
    // Manually $apply to trigger $watch (and get differences)
    scope.$apply();
    scope.deleteSong(scope.songs[0]);
    
    // Manually $apply to trigger $watch (and get differences)
    scope.$apply();
    expect(service.put).toHaveBeenCalledWith(scope.songs);
  });
  
  it('verifies if String is empty or blank', function() {
    expect(scope.isEmpty("test")).toEqual(false);
    expect(scope.isEmpty("  test  ")).toEqual(false);
    expect(scope.isEmpty("  ")).toEqual(true);
    expect(scope.isEmpty("")).toEqual(true);
    expect(scope.isEmpty(null)).toEqual(true);
    expect(scope.isEmpty(undefined)).toEqual(true);
  });
}