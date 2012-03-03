#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var program = require('commander');
var connect = require('connect');
var program = require('commander');


var main = function(subhost, subdomains, domains) {
	process.on('uncaughtException', function (err) {
		console.log('Caught exception: ' + err);
	});
	var server = connect();
	var vhost = function(host, index) {
		try {
			server.use(connect.vhost(host, require(index).app));
			console.log('vhost:', host);
		} catch(e) {
			console.log('error', host, e);
		}
	};
	var getIndex = function(www, s) {
		var readdir = fs.readdirSync(www);
		var i;
		for (i in readdir) {
			if ((i[0]!='.') && (fs.statSync(path.join(www, readdir[i])).isDirectory())) {
				var index = path.join(www, readdir[i], '/.index.js');
				if (path.existsSync(index)) {
					if (s) {
						vhost(readdir[i], index);
					} else {
						vhost(readdir[i] + '.' + subhost, index);
					}
				}
			}
		}
	};
	if (subdomains) {
		getIndex(subdomains);
	}
	if (domains) {
		getIndex(domains, true);
	}
	return server;
};

if (require.main === module) {
	var config;
	program
		.version('0.0.3')
		.option('-n [host]', 'Name of host for subdomains [localhost]', 'localhost')
		.option('-s <path>', 'Path to subdomains')
		.option('-d <path>', 'Path to domains')
		.option('--port <port>', 'Server port [3000]', 3000)
		.option('--host <host>', 'Server hostname')
		.on('--help', function() {
			console.log('  Examples:');
			console.log();
			console.log('    $ ' + program.name + ' -n you-host-name.com -s /var/www/subdomains/ -d /var/www/domains/');
			console.log('    $ ' + program.name + ' -s /var/www/subdomains/ -d /var/www/domains/');
			console.log('    $ ' + program.name + ' -d /var/www/domains/ --port 8000 --host 0.0.0.0');
			console.log('    $ ' + program.name + ' -s /var/www/subdomains/');
			console.log();
		})
		.parse(process.argv);
	if (program.S || program.D) {
		main(program.N, program.S, program.D).listen(program.P, program.I);
	}
} else { // for test
	exports.main = main;
}
