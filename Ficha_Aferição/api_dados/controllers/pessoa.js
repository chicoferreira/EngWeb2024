const Pessoa = require('../models/pessoa');

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({'nome': 1})
        .exec();
}

module.exports.findById = id => {
    return Pessoa
        .findOne({_id: id})
        .exec();
}

module.exports.insert = pessoa => {
    return Pessoa.create(pessoa);
}

module.exports.removeById = id => {
    return Pessoa.deleteOne({_id: id});
}

module.exports.update = (id, pessoa) => {
    return Pessoa.findByIdAndUpdate(id, pessoa);
}

module.exports.getAllModalidades = () => {
    return Pessoa.distinct('desportos').exec();
}

module.exports.getAllAtletasInModalidade = (modalidade) => {
    // return the list of ids of people that have the sport
    return Pessoa.find({desportos: modalidade}).distinct('_id').exec();
}