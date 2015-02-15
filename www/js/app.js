// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'gearheads' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'gearheads.controllers' is found in controllers.js
angular.module('gearheads', ['ionic', 'gearheads.controllers', 'gearheads.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: "/search?category&keywords",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: "SearchCtrl"
      }
    }
  })
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: "ProfileCtrl"
      }
    }
  })
  .state('app.items', {
    url: "/items",
    views: {
      'menuContent': {
        templateUrl: "templates/items.html",
        controller: "ItemsCtrl"
      }
    }
  })
  .state('app.friends', {
    url: "/friends",
    views: {
      'menuContent': {
        templateUrl: "templates/friends.html",
        conroller: "FriendsCtrl"
      }
    }
  })
  .state('app.feed', {
    url: "/feed",
    views: {
      'menuContent': {
        templateUrl: "templates/feed.html",
        controller: "FeedCtrl"
      }
    }
  })
  .state('app.item', {
    url: "/item/:ASIN",
    views: {
      'menuContent': {
        templateUrl: "templates/item.html",
        controller: "ItemCtrl"
      }
    }
  })
  .state('app.categories', {
    url: "/categories",
    views: {
      'menuContent': {
        templateUrl: "templates/categories.html",
        controller: "CategoriesCtrl"
      }
    }
  })
  // .state('app.single', {
  //   url: "/playlists/:playlistId",
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/playlist.html",
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/feed');
});
