//importa o modulo mongoose, que é uma biblioteca do Node.js usada para interagir com o banco de dados MongoDB
const mongoose = require('mongoose');

//definindo Schema Categoria
const categoriaSchema = new mongoose.Schema({
    nome: String, 
    descricao: String,
});
const CategoriaModel = mongoose.model('Categoria', categoriaSchema);

module.exports = categoriaSchema;