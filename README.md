# vhoster

Developing multiple applications for different domains on one hosting using a single node.js instance.

Universal server for sites node.js with virtual hosts.

The common libraries located at the top level and are available to all sites.

Connected sites must contain the root file **.index.js**.

Each site determines its own relative paths.

## Installation

``` bash
$ npm install vhoster
```

## Usage

``` bash
$ vhoster -n you-host-name.com -s /var/www/subdomains/ -d /var/www/domains/
```

### Example .index.js

With http module:

``` javascript
var http = require('http');
exports.app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});
```

Or you can use connect or express:

``` javascript
var connect = require('connect');
exports.app = connect().use(function(req, res) {
	res.end('hello world\n');
});
```
