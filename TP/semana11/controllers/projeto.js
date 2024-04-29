const mongoose = require('mongoose');
const Projeto = require('../models/projeto')

module.exports.list = () => {
    return Projeto
        .find()
        .sort({ dataEntrega: -1 })
        .exec()
}

module.exports.findById = id => {
    return Projeto
        .findOne({ _id: id })
        .exec()
}

module.exports.insert = p => {
    if ((Projeto.find({ _id: p._id }).exec()).length != 1) {
        var novo = new Projeto(p)
        return novo.save()
    }
}

module.exports.update = (id, p) => {
    return Projeto
        .findOneAndUpdate(id, p, { new: true })
}

module.exports.remove = id => {
    return Projeto
        .deleteOne({ _id: id })
}