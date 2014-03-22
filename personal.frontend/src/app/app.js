/*
 * Main angular app for Nii Mante's personal website
 */

angular.module('personalWebApp', [
	'personalWebApp.about',
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

  $scope.socials = [
    {
      "name" : "Github",
      "link" : "http://github.com/nmante",
      "icon" : "icon-github"
    },
    {
      "name" : "Twitter",
      "link" : "http://twitter.com/niimante",
      "icon" : "icon-twitter"
    },
    {
	"name" : "LinkedIn",
	"link" : "https://www.linkedin.com/pub/nii-mante/45/a27/6a4",
	"icon" : "icon-linkedin"
    }
  ];
})

;

