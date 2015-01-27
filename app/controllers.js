angular.module("myApp.controllers", [])
	.controller("songCtrl", function($scope) {
  		$scope.songs = [];
  		$scope.newSong = {};
  		
  		$scope.addSong = function(/** String */ artist, /** String */ title) {
        $scope.songs.push({
          artist: artist,
          title: title
        });
        $scope.newSong.title = "";
        $scope.newSong.artist = "";
      };
  		
  		$scope.isEmpty = function(/** String */ str) {
        return _.isBlank(str);
      };
	});