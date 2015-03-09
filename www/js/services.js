angular.module('gearheads.services', ['ngResource'])

/// EXAMPLE: ng-resource usage
/*
var User = $resource('/user/:userId', {userId:'@id'});
var user = User.get({userId:123}, function() {
  user.abc = true;
  user.$save();
});
*/

.factory('Search', function ($resource) {
  return $resource('/search/:category/:keywords');
})

.factory('Lookup', function($resource) {
  return $resource('/lookup/:ASIN');
})

.factory('Friends', function($resource) {
  return $resource('/friends/:id');
})

.factory('Comments', function($resource) {
  return $resource('/comments');
})

.factory('Categories', function($resource) {
  return $resource('/categories');
})

.factory('Items', function($resource) {
  return $resource('/items/:id');
})

.factory('Groups', function($resource) {
  return $resource('/groups');
})

.factory('User', function($http) {
  var user = {};

  var getUser = function() {
    openFB.api({
      path: '/me',
      success: function(userData) {
        user.data = userData;
        $http.post('/user', userData).
        success(function(data, status, headers, config) {
          console.log('checking for newuser');
        }).
        error(function(data, status, headers, config) {

        })
      },
      error: function(error) {
        alert('Facebook error: ' + error.error_description);
      }
    });
  };

  return {
    user: user,
    getUser: getUser
  };
})

.factory('Users', function($resource) {
  return $resource('/users');
})
