# vhoster

Developing multiple applications for different domains on one hosting using a single nodejs instance.

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

``` javascript
var connect = require('connect');
exports.app = connect().use(function(req, res) {
	res.end('hello world\n');
});
```
