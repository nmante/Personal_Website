angular.module('personalWebApp.about', [
	'ui.state',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch',
    'ngSanitize'
])

.config(function aboutConfig ($templateCacheProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$stateProvider.state( 'about', {
		url: '/about',
		views: {
			"main": {
				controlller: 'AboutCtrl',
				templateUrl: 'about.tpl.html'
			}
		},
		data: { pageTitle: 'About'}
	});	
})

.controller('AboutCtrl', ['', function(){
	
}]);