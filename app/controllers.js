angular.module("myApp.controllers", [])
	.controller("songCtrl", function($scope, songService) {
  		$scope.songs = songService.get();
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
  		
  		$scope.$watch('songs', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          songService.put($scope.songs);
        }
      });
  		
  		$scope.deleteSong = function(/** Integer */ idx) {
        $scope.songs.splice(idx, 1);
      };
	});