angular.module('personalWebApp.contact', [
	'ui.state',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch',
    'ngSanitize'
])

.config(function contactConfig ($templateCacheProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
	$stateProvider.state( 'contact', {
		url: '/contact',
		views: {
			"main": {
				controller: 'ContactCtrl',
				templateUrl: 'contact/contact.tpl.html'
			}
		},
		data: { pageTitle: 'contact'}
	});	
})

.controller('ContactCtrl', ['$scope', function($scope){
	$scope.sections = {
		"contact" : {

		},

		"code" : {
			"title" : "Code"
		}
	};

}]);