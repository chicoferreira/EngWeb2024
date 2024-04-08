var express = require('express');
const pessoaController = require("../controllers/pessoa");
var router = express.Router();

router.get('/', (req, res) => {
    pessoaController.getAllModalidades().then((modalidades) => {
        res.json(modalidades);
        res.end();
    });
});

router.get('/:modalidade', (req, res) => {
    pessoaController.getAllAtletasInModalidade(req.params.modalidade).then((atletas) => {
        res.json(atletas);
        res.end();
    });
});

module.exports = router;
