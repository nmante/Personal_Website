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
				controller: 'AboutCtrl',
				templateUrl: 'about/about.tpl.html'
			}
		},
		data: { pageTitle: 'About'}
	});	
})

.controller('AboutCtrl', ['$scope', function($scope){
	$scope.bootstrapColumns = 12;
	// animated fadeInRight
	$scope.fadeInRight = function(scrollDirection) {
        // scrollDirection > 0 ? reduceAmount() : aumentAmount(); // We want to increase on scrollDown
        // setOffsetForImage();


    };
	$scope.aboutSection = {
		"title" : "Student",
		"rows" : [
			{
				"cols" : [
					{
						"header" : "<b><i>PhD Student</i></b>",
						"paragraphs" : [
							"I'm currently a <b>Biomedical Engineering</b> <strong>PhD</strong> student at the <a target=\"_blank\" href=\"http://www.usc.edu\">University of Southern California</a>. I'm also pursuing a <strong>Master's</strong> degree in <b>Computer Science</b>. I work in the same lab that's making <a target=\"_blank\" href=\"http://cbsn.ws/1hyv5zH\">Retinal Prosthesis</a> possible. I also work with other professors in different labs."
							
						]
					},
					{
						"header" : "My Research",
						"paragraphs" : [
							"My work is centered around making blind people's lives easier. The main goal of my project is to build a system that allows blind people to find things that are important to them. For the tech-savvy, this includes <strong>Computer Vision</strong> and <strong>Speech Synthesis</strong>. Check it out <a href=\"#/projects\">here</a>."
						]
					},
					{
						"header" : "The <b><i>Past</i></b>",
						"paragraphs" : [
							"I graduated from the <a href=\"http://www.umd.edu\" target=\"_blank\">University of Maryland</a> in 2010, with a <strong>Bachelor's</strong> degree in Bioengineering. During my time at Maryland, I "

						]
					}
				]
			}

		]
		
	};

	$scope.coderSection = {
		"title" : "Developer", 
		"rows" : [
			{
				"cols" : [
					{
						"header" : "Software Development",
						"paragraphs" : [
							"My journey as a developer started in 2010 with <b>C++</b>. After a year long hiatus from coding, I picked it up again in 2011 and haven't looked back. I've worked in a variety of languages ranging from frontend to backend technologies."
						]
					},
					{
						"header" : "Mobile - Web - Backend",
						"paragraphs" : [
							"I've done iOS" 
						]
					}
				]
			},
			{
				"cols" : [
					
				]
			}
		]
	};
	$scope.sections = [
		$scope.aboutSection,
		$scope.coderSection
	];

	$scope.bannerHeaders = [ "Engineer", "Developer", "Entrepreneur"];
	$scope.languages = [
		{
			"language" : "C++",
			"color" : "6c6" //light green
		},
		{
			"language" : "Obj-C",
			"color" : "c66" //light red/maroon
		},
		{
			"language" : "JavaScript",
			"color" : "66c" //darker blue
		},
		{
			"language" : "PHP",
			"color" : "6cc" //blueish green
		},
		{
			"language" : "Python",
			"color" : "cc6", //yellowish

		},
		{
			"language" : "Java",
			"color" : "6ac" //light blue
		},
		{
			"language" : "SQL",
			"color" : "ac6" //greenish yellow
		},
		{
			"language" : "HTML",
			"color" : "6ca" //teal
		},
		{
			"language" : "CSS",
			"color" : "a6c" //purple
		}

	];

	function drawEntireHexDiv(){
		var canvas=document.getElementById("canvas");

		var cxt = canvas.getContext('2d');
		var hexRadius = 40;
		var hexDiameter = 2*hexRadius;
		var gap = 3;
		var numberOfColumns = 5;

		canvas.width = numberOfColumns*(3/4*hexDiameter + gap) + hexRadius;
		canvas.height = (hexRadius)*(numberOfColumns + 1);
		// hexagon
		function drawHex(xCenter, yCenter, mSize, mColor){
			var numberOfSides = 6,
			size = mSize,
			Xcenter = xCenter,
			Ycenter = yCenter;

			cxt.beginPath();
			cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

			for (var i = 1; i <= numberOfSides;i += 1) {
			cxt.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}

			cxt.strokeStyle = "ccc";
			cxt.lineWidth = 1;
			cxt.fillStyle = mColor;
			cxt.fill();
			cxt.stroke();
		}

		var polNumber = 0;
		for (var row = 0; row < numberOfColumns; row++) {
			for (var col = 0; col < numberOfColumns; col++) {
				if ((row+col)%2 === 0 && (row+col) !== 0 && (row+col) !== 2*(numberOfColumns - 1)
					) {

					console.log("row: " + row + "col: " + col);

					if ((row === numberOfColumns-1 && col === 0) || (col === numberOfColumns - 1 && row === 0)) {
						break;
					}
					//We can draw now
					
					var xCenter = (hexRadius) + col*(3/4*(hexDiameter)+ gap);
					var yCenter = (hexRadius)*(row + 1);
					drawHex(xCenter, yCenter, hexRadius, $scope.languages[polNumber].color);
					polNumber++;
				}
			}
		}
		var lastXCenter = (hexRadius) + 1/2*(numberOfColumns-1)*(3/4*(hexDiameter)+ gap);
		var lastYCenter = (hexRadius)*(numberOfColumns);
		var len = $scope.languages.length;
		drawHex(lastXCenter, lastYCenter, hexRadius, $scope.languages[len - 1].color);
	}

}]);