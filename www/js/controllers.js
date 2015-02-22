angular.module('gearheads.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, User) {
  // Form data for the login modal
  $scope.loginData = {};
  console.log('AppCtrl User.user: ', User.user);

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    loginStatus();
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    console.log($scope.modal);
    $scope.modal.show();
  };

  // Log out the user
  $scope.logout = function() {
    openFB.logout(function(response) {
      console.log('logout response: ', response);
    });
  };

  // Log in the user via Facebook
  $scope.fbLogin = function() {
    openFB.login(
      function(response) {
        if (response.status === 'connected') {
          console.log('FB Response', response);
          console.log('Facebook login succeeded');
          $scope.closeLogin();
        } else {
          alert('Facebook login failed');
        }
      },
      {scope: 'email,publish_actions'});
  }

  // Automatically checks the login status and opens the login modal if user not logged in
  var loginStatus = function() {
      openFB.getLoginStatus(function(loginStatus) {
      console.log('is logged out: ', loginStatus.status !== 'connected');
      // console.log('User.user: ', User.user);
      if (loginStatus.status === 'connected') {
        User.getUser();
      } else {
        $scope.modal.show();
      }
    });
  }

  // var getUser = function() {
  //   openFB.api({
  //     path: '/me',
  //     success: function(user) {
  //       $scope.$apply(function() {
  //         $scope.user = user;
  //         console.log('user info: ', $scope.user);
  //       });
  //     },
  //     error: function(error) {
  //       alert('Facebook error: ' + error.error_description);
  //     }
  //   });
  // };

})

/// EXAMPLE: ng-resource usage
/*
var User = $resource('/user/:userId', {userId:'@id'});
var user = User.get({userId:123}, function() {
  user.abc = true;
  user.$save();
});
*/

// TODO: persist search in querystring
.controller('SearchCtrl', function($scope, $state, $location, Search) {
  $scope.submitKeywords = function(keywords) {
    // console.log('keywords: ', keywords);
    $state.go('app.search', {category: $location.search().category, keywords: keywords});
  }

  if ($location.search().keywords) {
    $scope.items = Search.get({keywords: $location.search().keywords, category: $location.search().category})
    console.log($scope.items);
  }
})

.controller('ItemCtrl', function($scope, $stateParams, Lookup) {
  $scope.item = Lookup.get({ASIN: $stateParams.ASIN});
  console.log($scope.item);
})

.controller('ProfileCtrl', function($scope, User) {
  $scope.user = User.user.data;
})

.controller('CategoriesCtrl', function($scope, $stateParams, Categories) {
  $scope.categories = Categories.get();
})

.controller('FriendsCtrl', function($scope) {

})

.controller('FeedCtrl', function($scope) {

})

.controller('ItemsCtrl', function($scope) {

})
