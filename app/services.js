angular.module("myApp.services", [])
	.factory("songService", function() {
  		var STORAGE_ID = 'myApp.songs', factory = { };

      factory.get = function() {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      };

      factory.put = function(songs) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(songs));
      };

      return factory;
	});