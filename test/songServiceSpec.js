describe('Song storage service', function() {
  var scope, store;
  
  beforeEach(function() {
    store = [ ];
    // Mock localStorage
    spyOn(localStorage, 'getItem').andCallFake(function(key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').andCallFake(function(key, value) {
      store[key] = value;
    });
    
    angular.mock.module('myApp.services');
    angular.mock.inject(function($injector) {
      scope = $injector.get('songService');
    });
  });
  
  it('stores data in LocalStorage', function() {
    scope.put([{
      artist: "Artist",
      title: "Title"
    }]);

    var json = "[{\"artist\":\"Artist\",\"title\":\"Title\"}]";
    expect(localStorage.setItem).toHaveBeenCalledWith('myApp.songs', json);
  });
  
  it('reads data in LocalStorage', function() {
    store['myApp.songs'] = "[{\"artist\":\"Artist\",\"title\":\"Title\"}]";
    var data = scope.get();
    expect(data.length).toEqual(1);
    expect(data[0].title).toEqual("Title");
    expect(data[0].artist).toEqual("Artist");
    expect(localStorage.getItem).toHaveBeenCalledWith('myApp.songs');
  });
  
  it('returns default empty array if no data is found in LocalStorage', function() {
    var data = scope.get();
    expect(data.length).toEqual(0);
  });
});