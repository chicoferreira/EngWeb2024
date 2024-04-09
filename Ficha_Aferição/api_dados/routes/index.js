var express = require('express');
const pessoaController = require("../controllers/pessoa");
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    // send json
    pessoaController.list().then((pessoas) => {
        res.json(pessoas);
        res.end();
    });
});

router.get('/:id', (req, res) => {
    pessoaController.findById(req.params.id).then((pessoa) => {
        res.json(pessoa);
        res.end();
    });
});

router.post('/', (req, res) => {
    pessoaController.insert(req.body).then((pessoa) => {
        res.json(pessoa);
        res.end();
    });
});

router.put('/', (req, res) => {
    pessoaController.update(req.body._id, req.body).then((pessoa) => {
        res.json(pessoa);
        res.end();
    });
});

router.delete('/', (req, res) => {
    pessoaController.removeById(req.body._id).then((pessoa) => {
        res.json(pessoa);
        res.end();
    });
});

router.delete('/:id', (req, res) => {
    pessoaController.removeById(req.params.id).then((pessoa) => {
        res.json(pessoa);
        res.end();
    });
});


module.exports = router;
