var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    var q = url.parse(req.url, true).query;
    var r = parseInt(q.a) + parseInt(q.b);
    res.write(q.a + ' + ' + q.b + ' = ' + r);
    console.log(q.a + ' + ' + q.b + ' = ' + r);
}).listen(7777);