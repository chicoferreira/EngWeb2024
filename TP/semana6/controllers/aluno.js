var Aluno = require('../models/aluno');

module.exports.list = () => {
    return Aluno
        .find()
        .sort({ nome: 1 })
        .exec();
}

module.exports.findById = id => {
    return Aluno
        .findOne({ _id: id })
        .exec();
}

module.exports.insert = p => {
    return Aluno.create(p);
}

module.exports.update = (id, p) => {
    return Aluno.updateOne({ _id: id }, p);
}