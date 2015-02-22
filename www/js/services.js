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
  return $resource('/friends');
})

.factory('Comments', function($resource) {
  return $resource('/comments');
})

.factory('Categories', function($resource) {
  return $resource('/categories');
})

.factory('Items', function($resource) {
  return $resource('/items');
})

.factory('User', function() {
  var user = {};

  var getUser = function() {
    openFB.api({
      path: '/me',
      success: function(userData) {
        user.data = userData;
        console.log('user: ', user);
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
