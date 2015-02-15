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
  return $resource('/search');
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
