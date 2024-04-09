var express = require('express');
var router = express.Router();

const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000").then((response) => {
        res.render('index', {pessoas: response.data});
    }).catch((error) => {
        res.render('error', {error: error});
    });
});

router.get('/pessoa/:id', function (req, res, next) {
    axios.get(`http://localhost:3000/${req.params.id}`).then((response) => {

        res.render('pessoa', {pessoa: addDefaultPessoaParams(response.data)});
    }).catch((error) => {
        res.render('error', {error: error});
    });
});

router.get('/novo', function (req, res, next) {
    res.render('pessoa_form', {
        pessoa: addDefaultPessoaParams({}),
        create_new: true,
        post_url: '/novo'
    });
});

function addDefaultPessoaParams(pessoa) {
    if (!pessoa.morada)
        pessoa.morada = {}
    if (!pessoa.partido_politico)
        pessoa.partido_politico = {}
    if (!pessoa.animais)
        pessoa.animais = []
    if (!pessoa.desportos)
        pessoa.desportos = []
    if (!pessoa.figura_publica_pt)
        pessoa.figura_publica_pt = []
    if (!pessoa.destinos_favoritos)
        pessoa.destinos_favoritos = []
    if (!pessoa.atributos)
        pessoa.atributos = {}
    console.log(pessoa)
    return pessoa
}

router.post('/novo', function (req, res, next) {
    axios.post("http://localhost:3000/", addDefaultPessoaParams(req.body)).then((response) => {
        res.redirect("/");
    }).catch((error) => {
        res.render('error', {error: error});
    });
});

router.get('/pessoa/:id/apagar', function (req, res, next) {
    axios.delete(`http://localhost:3000/${req.params.id}`).then((response) => {
        res.redirect("/");
    }).catch((error) => {
        res.render('error', {error: error});
    });
});

router.get('/pessoa/:id/editar', function (req, res, next) {
    axios.get(`http://localhost:3000/${req.params.id}`).then((response) => {
        res.render('pessoa_form', {
            pessoa: addDefaultPessoaParams(response.data),
            create_new: false,
            post_url: "/update"
        });
    }).catch((error) => {
        res.render('error', {error: error});
    });
});

router.post('/update', function (req, res, next) {
    axios.put("http://localhost:3000", req.body).then((response) => {
        res.redirect("/");
    }).catch((error) => {
        res.render('error', {error: error});
    });
});

module.exports = router;
