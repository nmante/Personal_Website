/*
 * Main angular app for Nii Mante's personal website
 */

angular.module('personalWebApp', [
  'templates-app',
  'templates-common',
	'personalWebApp.about',
  'personalWebApp.contact',
	'ui.state',
  'ui.route',
  'ui.bootstrap'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/about' );
})

.run( function run () {
})

.controller( 'MainCtrl', function MainCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Nii Mante' ;
    }
    
  });
  $scope.info = {
    "author" : "Nii Mante"
  };

  $scope.socials = [
    {
      "name" : "Github",
      "link" : "http://github.com/nmante",
      "icon" : "fa fa-github"
    },
    {
      "name" : "Twitter",
      "link" : "http://twitter.com/niimante",
      "icon" : "fa fa-twitter"
    },
    {
      "name" : "LinkedIn",
      "link" : "https://www.linkedin.com/pub/nii-mante/45/a27/6a4",
      "icon" : "fa fa-linkedin"
    }
  ];
})

;

