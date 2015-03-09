angular.module('gearheads.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, User) {
  // Form data for the login modal
  $scope.loginData = {};

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
      console.log('logged in: ', loginStatus.status === 'connected');
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

.controller('ItemCtrl', function($scope, $state, $stateParams, $http, Lookup, User) {
  $scope.item = Lookup.get({ASIN: $stateParams.ASIN});
  console.log('item: ', $scope.item);

  $scope.add = function() {
    console.log('User.user: ', User.user);
    $http.post("/item/" + User.user.data.id, $scope.item).
      success(function(data, status, headers, config) {
        console.log('added item');
        $state.go('#/app/items')
      }).
      error(function(data, status, headers, config) {
        console.log('error adding item');
      });
  };
})

.controller('ProfileCtrl', function($scope, User) {
  console.log('load ProfileCtrl');
  $scope.user = User.user.data;
  console.log('user: ', $scope.user);
})

.controller('CategoriesCtrl', function($scope, $stateParams, Categories) {
  $scope.categoryInput = '';
  $scope.categories = Categories.get();
  console.log('categories: ', $scope.categories);
})

.controller('FriendsCtrl', function($scope, User, Friends) {
  $scope.friends = Friends.get({ id: User.user.data.id });
  console.log('friends: ', $scope.friends);
})

.controller('GroupsCtrl', function($scope, User, Groups) {
  $scope.groups = Groups.get({ id: User.user.data.id });
  console.log('groups: ', $scope.groups);
})

.controller('FeedCtrl', function($scope) {
  // $scope.feed = Feed.get({});
  // console.log('feed: ', $scope.feed);
})

.controller('UsersCtrl', function($scope, Users) {
  $scope.users = Users.get();
  console.log('users: ', $scope.users);
})

.controller('ItemsCtrl', function($scope, User, Items) {
  $scope.items = Items.get({ id: User.user.data.id });
  console.log('items: ', $scope.items);
})
