//importa o modulo mongoose, que é uma biblioteca do Node.js usada para interagir com o banco de dados MongoDB
const mongoose = require('mongoose');

//definindo Schema livro
const livroSchema = new mongoose.Schema({
    nome: String,
    autor: String,
    categoria: String,
    anopublicacao: Number,
});
const LivroModel = mongoose.model('Livro', livroSchema);

module.exports = livroSchema;
