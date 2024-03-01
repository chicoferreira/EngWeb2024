var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var endpoints = {
        '/1': 'samples/sample1.html',
        '/2': 'samples/sample2.html',
        '/3': 'samples/sample3.html',
    };

    var regex = /\/[1-3]/;

    var file = endpoints[q.pathname];

    if (file) {
        fs.readFile(file, function (_err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.write(data);
            res.end()
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        res.write('404 Not Found');
        res.end();
    }
}).listen(7777);