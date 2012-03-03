var request = require('request');
var main = require('../index.js').main;
exports.server = function(test) {
	test.expect(1);
	var port = 8000;
	var subhost = 'localhost';
	var subdomains = false
	var domains = __dirname; // test dir;
	var server = main(subhost, subdomains, domains).listen(port);
	request({uri: 'http://localhost:'+port}, function (error, response, body) {
		test.equal(body, 'testing', 'wrong answer');
		server.close();
		test.done();
	});
}
