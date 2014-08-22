/**
* Adjust the size of an HTML element based on the window size
*
* Description
*/
angular.module('resizable', []).

directive('resizable', function($window){
	return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return { 'h': w.innerHeight(), 'w': w.innerWidth() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return { 
                    'height': (newValue.h) + 'px',
                    'width': (newValue.w) + 'px' 
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    };
});