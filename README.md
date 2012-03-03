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
$ vhoster --help

  Usage: vhoster [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -n [host]      Name of host for subdomains [localhost]
    -s <path>      Path to subdomains
    -d <path>      Path to domains
    --port <port>  Server port [3000]
    --host <host>  Server hostname

  Examples:

    $ vhoster -n you-host-name.com -s /var/www/subdomains/ -d /var/www/domains/
    $ vhoster -s /var/www/subdomains/ -d /var/www/domains/
    $ vhoster -d /var/www/domains/ --port 8000 --host 0.0.0.0
    $ vhoster -s /var/www/subdomains/
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
