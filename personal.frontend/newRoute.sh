routeName=$1
cd src/app
mkdir $routeName
cd $routeName
touch $routeName.js
touch $routeName.less
touch $routeName.spec.js
touch $routeName.tpl.html
touch README.md
cd ../..

