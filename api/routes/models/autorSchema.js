//importa o modulo mongoose, que é uma biblioteca do Node.js usada para interagir com o banco de dados MongoDB
const mongoose = require('mongoose');

//definindo Schema Autor
const autorSchema = new mongoose.Schema({
    nome: String, 
    nacionalidade: String,
    datanascimento: String,
});
const AutorModel = mongoose.model('Autor', autorSchema);

module.exports = autorSchema;