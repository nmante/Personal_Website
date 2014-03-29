/*
 * Nii Mante
 * 
 * Nginx configuration file
 *
 * We'll use this file to dynamically configure the properties of our 
 * Nginx proxy server
 */

// Grab our locally installed nginx
var NginxConfFile = require('nginx-conf').NginxConfFile;
// Problem, on live site, the nginx dir may be different
// Need to configure code so that on deploy, it changes the code
var nginxDirectory = process.env.NGINX_DIR || "/usr/local/etc/nginx/";
NginxConfFile.create(nginxDirectory + "nginx.conf", function (err, conf) {
	if (err) {
		console.log(err);
		return;
	}

	console.log(conf.nginx.user._value);
	console.log(conf.nginx.http.server.listen._value);

	conf.on('flushed', function() {
		console.log('finished writing to disk');
	});

	//don't write to disk when something changes

	conf.nginx.events.connections._value = 1000;
	
	conf.die(nginxDirectory + "nginx.conf");
	conf.nginx.events.connections._value = 2000; //change remains local, not in /etc/nginx.conf

	//write to a different file
	conf.live(nginxDirectory + "nginx.conf.bak");

	//force the synchronization
	conf.flush();

	conf.nginx.http._add('add_header', 'Cache-Control max-age=315360000, public');
	console.log(conf.nginx.http.add_header._value);
	conf.nginx.http._add('add_header', 'X-Load-Balancer lb-01');
	conf.nginx.http._add('add_header', 'X-Secure true');
	for (var i = 0; i < 3; ++i){
		console.log(conf.nginx.http.add_header[i]._value);
	}

	conf.nginx.http._remove('add_header');
	conf.nginx.http._remove('add_header', 1);

	console.log(conf.nginx.http.add_header._value);
	console.log(conf.nginx.http.add_header[0]);

	conf.nginx.http._add('server');
	console.log(conf.nginx.http.server);
	conf.nginx.http.server[0]._add('listen', '80');

	conf.nginx.http._add('server');
	conf.nginx.http.server[1]._add('listen', '443');

});
