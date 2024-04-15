var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var fs = require('fs');

var multer = require('multer');

var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function (req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  jsonfile.readFile(__dirname + '/../data/dbFiles.json', function (err, obj) {
    if (err) {
      res.render('error', { message: 'Error reading file', error: err });
    } else {
      res.render('index', { title: 'Express', files: obj, d: date });
    }
  });
});

router.post('/files', upload.single('my_file'), function (req, res, next) {
  var file = req.file;
  var date = new Date().toISOString().substring(0, 16);
  var oldPath = __dirname + '/../' + file.path;
  var newPath = __dirname + '/../public/filestore/' + file.originalname;

  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      res.render('error', { message: 'Error moving file', error: err });
      return;
    }
  });

  var dbFile = __dirname + '/../data/dbFiles.json';

  jsonfile.readFile(dbFile, function (err, files) {
    if (err) {
      res.render('error', { message: 'Error reading file', error: err });
      return;
    }

    files.push({ name: file.originalname, size: file.size, date: date, type: file.mimetype });
    jsonfile.writeFile(dbFile, files, function (err) {
      if (err) {
        res.render('error', { message: 'Error writing file', error: err });
      } else {
        res.redirect('/');
      }
    });
  });
});

router.get('/download/:fname', function (req, res) {
  var file = __dirname + '/../public/fileStore/' + req.params.fname;
  res.download(file);
});

module.exports = router;
