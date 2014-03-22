angular.module('personalWebApp.about', [
	'ui.state',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch',
    'ngSanitize'
])

.config(function aboutConfig ($templateCacheProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
	$stateProvider.state( 'about', {
		url: '/about',
		views: {
			"main": {
				controlller: 'AboutCtrl',
				templateUrl: 'about/about.tpl.html'
			}
		},
		data: { pageTitle: 'About'}
	});	
})

.controller('AboutCtrl', ['', function(){
	
}]);