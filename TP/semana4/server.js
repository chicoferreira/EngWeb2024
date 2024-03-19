// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const {parse} = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    } else {
        switch (req.method) {
            case "GET":
                // GET /alunos --------------------------------------------------------------------
                if (req.url == "/alunos") {
                    axios.get('http://localhost:3000/alunos').then(response => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.studentsListPage(response.data, d))
                    }).catch(function (error) {
                        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage(error, d))
                    });
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/[A-Z][0-9]{5,6}/)) {
                    var id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/alunos/' + id).then(response => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.studentPage(response.data, d))
                    }).catch(function (error) {
                        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage(error, d))
                    });
                } else if (req.url == "/alunos/registo") {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.studentFormPage(d))
                }
                    // GET /alunos/registo --------------------------------------------------------------------

                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/[A-Z][0-9]{5,6}/)) {
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/alunos/' + id).then(response => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.studentFormEditPage(response.data, d))
                    }).catch(function (error) {
                        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage(error, d))
                    });
                }
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/delete\/[A-Z][0-9]{5,6}/)) {
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/alunos/' + id).then(response => {
                        res.writeHead(302, {'Location': '/alunos'})
                        res.end()
                    }).catch(function (error) {
                        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage(error, d))
                    });
                }

                // GET ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.errorPage("Pedido não suportado: " + req.url, d))
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if (req.url == "/alunos/registo") {
                    collectRequestBodyData(req, function (result) {
                        if (!result) {
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage("Erro: POST sem dados", d))
                        } else {
                            axios.post('http://localhost:3000/alunos', result).then(response => {
                                res.writeHead(302, {'Location': '/alunos'})
                                res.end()
                            }).catch(function (error) {
                                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.errorPage(error, d))
                            });
                        }
                    })
                }
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if (req.url.match(/\/alunos\/edit\/[A-Z][0-9]{5,6}/)) {
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, function (result) {
                        if (!result) {
                            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage("Erro: POST sem dados", d))
                        } else {
                            axios.put('http://localhost:3000/alunos/' + id, result).then(response => {
                                res.writeHead(302, {'Location': '/alunos'})
                                res.end()
                            }).catch(function (error) {
                                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.errorPage(error, d))
                            });
                        }
                    })
                }

                // POST ? -> Lancar um erro
                else {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.errorPage("Pedido POST não suportado: " + req.url, d))
                }
            default:
            // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777...")
})


