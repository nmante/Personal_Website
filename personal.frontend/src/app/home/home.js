angular.module('personalWebApp.home', [
	'ui.state',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch',
    'ngSanitize'
])

.config(function homeConfig ($templateCacheProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
	$stateProvider.state( 'home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/home.tpl.html'
			}
		},
		data: { pageTitle: 'Home'}
	});	
})

.controller('HomeCtrl', ['$scope', '$window', function($scope, $window){
	
}]);