angular.module("myApp.controllers", [])
	.controller("songCtrl", function($scope) {
  		$scope.songs = [{
        artist: "Nightwish",
        title: "Ghost Loves Score"
      }, {
        artist: "Evanescence",
        title: "Everybody's Fool"
      }, {
        artist: "Within Temptation",
        title: "Ice Queen"
      }];
	});