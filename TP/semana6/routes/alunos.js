var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno');

/* GET users listing. */
router.get('/alunos', function (req, res, next) {
  Aluno.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.get('/alunos/:id', function (req, res, next) {
  Aluno.findById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.post('/alunos', function (req, res, next) {
  Aluno.insert(req.body)
    .then(dados => res.status(201).jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.put('/alunos/:id', function (req, res, next) {
  Aluno.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;
