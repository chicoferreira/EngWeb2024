var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ucs', function (req, res, next) {
  var token = ""
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }
  axios.get('http://localhost:2204/ucs?token=' + token)
    .then(dados => {
      res.render('uc', { dados: dados.data });
    })
    .catch(e => {
      res.render('error', { error: e })
    });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  axios.post('http://localhost:2204/users/login', req.body)
    .then(dados => {
      res.cookie('token', dados.data.token)
      res.redirect('/')
    })
    .catch(e => {
      res.render('error', { error: e, message: "Credenciais inválidos" })
    });
});

module.exports = router;
