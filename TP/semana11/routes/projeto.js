/* Operações CRUD sobre UC 
   2024-04-21 @jcr
   ----------------------- */
var express = require('express');
var router = express.Router();
var Projeto = require('../controllers/projeto')
var multer = require('multer')
const upload = multer({ dest: 'uploads/' })
var fs = require('fs')

/* Listar as Equipa (R) */
router.get('/', function (req, res) {
    Projeto.list()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

/* Consultar uma UC (R) */
router.get('/:id', function (req, res) {
    Projeto.findById(req.params.id)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

/* Criar uma Equipa (C) */
router.post('/', upload.single('enunciado'), function (req, res) {
    var proj = req.body;
    proj.enunciado = req.file.originalname;
    Projeto.insert(proj)
        .then(data => {
            fs.mkdir(__dirname + "/../FileStore/projetos/" + proj._id, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                } else {
                    console.log('Folder created successfully: ' + proj._id);
                    let oldPath = __dirname + '/../' + req.file.path
                    let newPath = __dirname + '/../FileStore/projetos/' + proj._id + '/' + req.file.originalname

                    fs.rename(oldPath, newPath, function (error) {
                        if (error) throw error
                    })
                }
            });
            res.status(201).jsonp(data)
        })
        .catch(erro => res.jsonp(erro))
});

/* Alterar uma UC (U) */
router.put('/:id', upload.single('enunciado'), function (req, res) {
    var proj = req.body;
    if (req.body.enunciado) {
        fs.rmdirSync(__dirname + '/../FileStore/projetos/' + req.params.id, { recursive: true });
        proj.enunciado = req.file.originalname;
        fs.mkdir(__dirname + "/../FileStore/projetos/" + proj._id, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating folder:', err);
            } else {
                console.log('Folder created successfully: ' + proj._id);
                let oldPath = __dirname + '/../' + req.file.path
                let newPath = __dirname + '/../FileStore/projetos/' + proj._id + '/' + req.file.originalname

                fs.rename(oldPath, newPath, function (error) {
                    if (error) throw error
                })
            }
        });
    }
    Projeto.update(req.params.id, proj)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

/* Remover uma UC (D ) */
router.delete('/:id', function (req, res) {
    fs.rmdirSync(__dirname + '/../FileStore/projetos/' + req.params.id, { recursive: true });
    return Projeto.remove(req.params.id)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

module.exports = router;
