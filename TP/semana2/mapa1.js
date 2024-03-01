var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    res.write('True: <pre>' + JSON.stringify(q) + '</pre>');
    var qtext = url.parse(req.url, false).query;
    res.write('False: <pre>' + JSON.stringify(qtext) + '</pre>');
}).listen(7777);