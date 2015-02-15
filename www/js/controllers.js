angular.module('gearheads.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

/// EXAMPLE: ng-resource usage
/*
var User = $resource('/user/:userId', {userId:'@id'});
var user = User.get({userId:123}, function() {
  user.abc = true;
  user.$save();
});
*/

.controller('SearchCtrl', function($scope, $location, Search) {
  console.log($location.absUrl());
  console.log(Search.get());
  $scope.items = Search.get();
})

.controller('ItemCtrl', function($scope, $stateParams, Lookup) {
  $scope.item = Lookup.get({ASIN: $stateParams.ASIN});
  console.log($scope.item);
})

.controller('CategoriesCtrl', function($scope, $stateParams, Categories) {
  $scope.categories = Categories.get();
  console.log($scope.categories);
})

.controller('FeedCtrl', function($scope) {

})

.controller('ItemsCtrl', function($scope) {

})

.controller('ProfileCtrl', function($scope) {

})

.controller('FriendsCtrl', function($scope) {

})

