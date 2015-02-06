// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'gearheads' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'gearheads.controllers' is found in controllers.js
angular.module('gearheads', ['ionic', 'gearheads.controllers'])

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
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
        // controller:
      }
    }
  })
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html"
        // controller:
      }
    }
  })
  .state('app.items', {
    url: "/items",
    views: {
      'menuContent': {
        templateUrl: "templates/items.html"
        // controller:
      }
    }
  })
  .state('app.friends', {
    url: "/friends",
    views: {
      'menuContent': {
        templateUrl: "templates/friends.html"
        // conroller:
      }
    }
  })
  .state('app.feed', {
    url: "/feed",
    views: {
      'menuContent': {
        templateUrl: "templates/feed.html"
        // controller:
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
