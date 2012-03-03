/* Проверка работы сервера */

var request = require('request');
var init = require('../server.js').init;

exports.server = function(test) {
	test.expect(2);
	var port = 3000;
	var ip = '0.0.0.0';
	var server = init(
		{
			"host": "testhost",
			"subdomains": "/media/data/www/svn/",
			"domains": "/media/data/www/svn/server/nodejs/server/domains/"
		}
	);
	server.listen(port, ip);
	request({uri: 'http://'+ip+':'+port+'/test'}, function (error, response, body) {
		test.equal(body, 'testing', 'wrong answer');
		request({uri: 'http://debian:3000/test-domain'}, function (error, response, body) {
			test.equal(body, 'debian', 'wrong answer 2');
			server.close();
			test.done();
		});
	});
}
