var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Gestão de alunos' });
});

router.get('/alunos', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/alunos')
    .then(function (response) {
      res.render('listaAlunos', { title: 'Lista de alunos', lista: response.data, data: d });
    })
    .catch(function (error) {
      res.render('error', { error: error, message: 'Erro ao encontrar alunos' });
    });
});

router.get('/alunos/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  res.render('registoAluno', { title: 'Registo de aluno', data: d });
});

router.get('/alunos/:id', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/alunos/' + req.params.id)
    .then(function (response) {
      res.render('aluno', { title: 'Consulta de aluno', aluno: response.data, data: d });
    })
    .catch(function (error) {
      res.render('error', { error: error, message: 'Erro ao encontrar aluno' });
    });
});

router.post('/alunos/registo', function (req, res) {
  var d = new Date().toISOString().substring(0, 16);
  console.log(JSON.stringify(req.body));
  axios.post('http://localhost:3000/alunos', req.body)
    .then(function (response) {
      res.redirect('/alunos');
    })
    .catch(function (error) {
      res.render('error', { error: error, message: 'Erro ao registar aluno' });
    });
  // res.render('confirmRegisto', { info: req.body, title: 'Registo de aluno', data: d });
});

module.exports = router;
