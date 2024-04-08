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

router.post('/', (req, res) => {
    pessoaController.insert(req.body).then((pessoa) => {
        res.json(pessoa);
        res.end();
    });
});

router.put('/', (req, res) => {
    pessoaController.update(req.body).then((pessoa) => {
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


module.exports = router;
