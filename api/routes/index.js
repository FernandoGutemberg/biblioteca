var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

//armazene o token em um objeto no express
// const tokens = {};


//Mensagem para eu verificar o Back-End
console.log("Rodando o Back-End!?");

//Importando o schema do usuário no arquivo userSchema.js
const userSchema = require('./models/userSchema');
//Importando o schema de livro no arquivo livroSchema.js
const livroSchema = require('./models/livroSchema');

const autorSchema = require('./models/autorSchema');

const categoriaSchema = require('./models/categoriaSchema');

const Schema = mongoose.Schema;

//Estabelece uma conexão com o banco de dados MongoDB utilizando a URL de conexão fornecida
mongoose.connect('mongodb+srv://fernando2024:N3YvVxd42wAILcFe@cluster0.inp16sv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Conectado no MongoDB!')); // Imprime uma mensagem no console quando a conexão é estabelecida com sucesso

// const nodemailer = require('nodemailer');

// application.get('/send', (req, res) => {
//   const transporter = nodemailer.createTransport({
//     const
//   })
// })

//--------------------------------------------------------------------------------------------------------------------------------//
//Define uma rota http para '/cadastro' -  AQUI NOS MANDAMOS OS DADOS PARA O MONGODB
router.post('/cadastrousuarios', async (req, res) => {
  try {
    //Cria um novo usuário com base nos dados do corpo da requisição
    let UserModel = mongoose.model('User', userSchema);

    //Cria uma nova instância de usuário com base nos dados reebidos na requisição
    let usuario = new UserModel({

      nomecompleto: req.body.nomeCompleto,
      cpf: req.body.cpf,
      datanascimento: req.body.dataNascimento,
      telefone: req.body.telefone,
      email: req.body.email,
      senha: req.body.senha,

    });

    //Capturar os dados
    await usuario.save();

    var options = req.body;

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "email-ssl.com.br",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "noreply@cfn.org.br",
        pass: "123",
      },
    });
    const body = `
    Olá prezado(a) ${options.nomeCompleto}.<br><br>
    Segue as credenciais de acesso ao Sistema Biblioteca:<br>
    URL: http://localhost:3000/Cadastrousuarios<br>
    Login: ${options.email}<br>
    Senha: ${options.senha}<br><br>

    Atenciosamente,<br>
    Assessoria de TI do CFN<br> 
    Conselho Federal de Nutricionistas<br>
  `;

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'noreply@cfn.org.br', // sender address
        to: options.email, // list of receivers
        subject: "Mensageiro do sistema de biblioteca", // Subject line
        html: body, // html body
      });

      console.log("Message sent: %s", "Mensagem Enviada", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
    console.log(usuario);

    // Responde com o objeto de usuário salvo
    res.json("Salvei");
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai pegar os dados do MongoDB com a rota Get
router.get('/Tabelausuarios', async (req, res) => {
  try {
    // Cria um modelo de usuário usando o mongoose
    let UserModel = mongoose.model('Users', userSchema);

    // Busca todos os usuários no banco de dados
    let usuarios = await UserModel.find();

    // Responde com os dados dos usuários
    res.json(usuarios);

  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
// Define uma rota DELETE para o caminho '/delete'
router.delete('/delete', function (req, res) {
  console.log("Delete request successful"); // Imprime uma mensagem no console quando 
  console.log(req.body); // Imprime os dados do corpo da requisição no console
  res.send('ok'); // Envio 'ok' como respota para a requisição
})

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai deletar o Id
router.delete('/tabelausuarios/:id', async (req, res) => {
  try {
    //Obtendo o modelo de usuário definido no mongodb utilizando o mongoose. 
    let UserModel = mongoose.model('Users', userSchema);
    //Executa uma operação de exclusao no Banco de Dados. 
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    //Atualiza o que foi exluido e retorna sem o registro. 
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Pega os dados para atualizar
router.get('/getCadastrousuariosFromId/:id', async (req, res) => {

  try {
    //Obtém o ID do usuário da URL
    const userId = req.params.id;

    //Cria um modelo de usuário usando o mongoose
    const UserModel = mongoose.model('Users', userSchema);

    //Busca o usuário pelo ID
    const usuario = await UserModel.findById(userId);

    //Se o usuário não for encontrado, retorna um erro 404
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    //Retorna os dados do usuário
    res.json(usuario);
  } catch (error) {
    //Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Para atualizar os usuarios
//Define uma rota PATCH para o caminho '/patch'
router.patch('/patch', function (req, res) {
  console.log("Patch request successful"); // Imprime uma mensagem no console quando a rota é acessada
  console.log(req.body); // Imprime os dados do corpo da requisição no console
  res.send('ok'); // Envio 'ok' como resposta para a requisição
})

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui é a rota para ATUALIZAR
router.patch('/cadastrousuarios/:id?', async (req, res) => {
  try {
    // Obtém o ID do usuário da URL, se fornecido
    const userId = req.params.id;

    // Cria um modelo de usuário usando o mongoose
    const UserModel = mongoose.model('Users', userSchema);

    let usuario;

    usuario = await UserModel.findById(userId);

    // Preenche os dados do usuário com os dados fornecidos no corpo da requisição
    usuario.nomecompleto = req.body.nomeCompleto;
    usuario.cpf = req.body.cpf;
    usuario.datanascimento = req.body.dataNascimento;
    usuario.telefone = req.body.telefone;
    usuario.email = req.body.email;
    usuario.senha = req.body.senha;

    // Salva o usuário no banco de dados
    await usuario.save();

    // Responde com os dados do usuário salvo
    res.json(usuario);
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//-------------------------------------------------------Definindo as rotas do CADASTROLIVROS-------------------------------------------------------------------------//
//Quero salvar os dados do cadastrolivros:

//--------------------------- PARTE DE MANDAR OS DADOS ----------------------//
//Define uma rota http para '/cadastrolivro' -  AQUI NOS MANDAMOS OS DADOS PARA O MONGODB
router.post('/cadastrolivro', async (req, res) => {
  try {

    let LivroModel = mongoose.model('Livro', livroSchema);

    // Cria uma nova instância de livro com base nos dados do corpo da requisição
    let livro = new LivroModel({
      nome: req.body.nome,
      autor: req.body.autor,
      categoria: req.body.categoria,
      anopublicacao: req.body.anopublicacao,
    });

    // Salva o novo livro no banco de dados
    await livro.save();

    // Responde com uma mensagem de sucesso
    res.json("Livro cadastrado com sucesso!");
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai pegar os dados do MongoDB com a rota Get - PARA TRAZER OS DADOS E MOSTRAR NA TABELA

router.get('/Tabelalivros', async (req, res) => {
  try {
    // Cria um modelo de usuário usando o mongoose
    let LivroModel = mongoose.model('Livro', livroSchema);

    // Busca todos os usuários no banco de dados
    let livro = await LivroModel.find();

    // Responde com os dados dos usuários
    res.json(livro);

  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });

  }
});

//-------------------------------------------------------------FUNCAO DE UPDATE DO LIVROS---------------------------------------------------------------//
//Pega os dados para atualizar
router.get('/getCadastrolivroFromId/:id', async (req, res) => {

  try {
    //Obtém o ID do usuário da URL
    const livroId = req.params.id;

    //Cria um modelo de usuário usando o mongoose
    const LivroModel = mongoose.model('Livro', livroSchema);

    //Busca o usuário pelo ID
    const livro = await LivroModel.findById(livroId);

    //Se o usuário não for encontrado, retorna um erro 404
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    //Retorna os dados do usuário
    res.json(livro);
  } catch (error) {
    //Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui é a rota para ATUALIZAR os dados dos LIVROSSSSSSSSSSSSSSSSSSSSSSS
router.patch('/cadastrolivro/:id?', async (req, res) => {
  try {
    // Obtém o ID do usuário da URL, se fornecido
    const livroId = req.params.id;

    // Cria um modelo de usuário usando o mongoose
    const LivroModel = mongoose.model('Livro', livroSchema);

    let livro;

    livro = await LivroModel.findById(livroId);

    // Preenche os dados do usuário com os dados fornecidos no corpo da requisição
    livro.nomecompleto = req.body.nome;
    livro.autor = req.body.autor;
    livro.categoria = req.body.categoria;
    livro.anopublicacao = req.body.anopublicacao;

    // Salva o usuário no banco de dados
    await livro.save();

    // Responde com os dados do usuário salvo
    res.json(livro);
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai deletar o Id
router.delete('/tabelalivro/:id', async (req, res) => {
  try {
    //Obtendo o modelo de usuário definido no mongodb utilizando o mongoose. 
    let LivroModel = mongoose.model('Livro', livroSchema);
    //Executa uma operação de exclusao no Banco de Dados. 
    const deletedLivro = await LivroModel.findByIdAndDelete(req.params.id);
    //Atualiza o que foi exluido e retorna sem o registro. 
    res.json(deletedLivro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//-------------------------------------------------------Definindo as rotas do CADASTRO AUTOR-------------------------------------------------------------------------//
//Quero salvar os dados do cadastrolivros:
router.post('/cadastroautor', async (req, res) => {
  try {

    let AutorModel = mongoose.model('Autor', autorSchema);

    // Cria uma nova instância de livro com base nos dados do corpo da requisição
    let autor = new AutorModel({
      nome: req.body.nome,
      nacionalidade: req.body.nacionalidade,
      datanascimento: req.body.datanascimento,
    });

    // Salva o novo livro no banco de dados
    await autor.save();

    // Responde com uma mensagem de sucesso
    res.json("Autor cadastrado com sucesso!");
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});


//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai pegar os dados do MongoDB com a rota Get - PARA TRAZER OS DADOS E MOSTRAR NA TABELA

router.get('/tabelaautor', async (req, res) => {
  try {
    // Cria um modelo de usuário usando o mongoose
    let AutorModel = mongoose.model('Autor', autorSchema);

    // Busca todos os usuários no banco de dados
    let autor = await AutorModel.find();

    // Responde com os dados dos usuários
    res.json(autor);

  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//-------------------------------------------------------------FUNCAO DE UPDATE DO AUTOR---------------------------------------------------------------//
//Pega os dados para atualizar
router.get('/getCadastroautorFromId/:id', async (req, res) => {

  try {
    //Obtém o ID do usuário da URL
    const autorId = req.params.id;

    //Cria um modelo de usuário usando o mongoose
    const AutorModel = mongoose.model('Autor', autorSchema);

    //Busca o usuário pelo ID
    const autor = await AutorModel.findById(autorId);

    //Se o usuário não for encontrado, retorna um erro 404
    if (!autor) {
      return res.status(404).json({ erro: 'autor não encontrado' });
    }

    //Retorna os dados do usuário
    res.json(autor);
  } catch (error) {
    //Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui é a rota para ATUALIZAR os dados dos LIVROSSSSSSSSSSSSSSSSSSSSSSS
router.patch('/cadastroautor/:id?', async (req, res) => {
  try {
    // Obtém o ID do usuário da URL, se fornecido
    const autorId = req.params.id;

    // Cria um modelo de usuário usando o mongoose
    const AutorModel = mongoose.model('Autor', autorSchema);

    let autor;

    autor = await AutorModel.findById(autorId);

    // Preenche os dados do usuário com os dados fornecidos no corpo da requisição
    autor.nomecompleto = req.body.nome;
    autor.autor = req.body.autor;
    autor.categoria = req.body.categoria;
    autor.anopublicacao = req.body.anopublicacao;


    // Salva o usuário no banco de dados
    await autor.save();

    // Responde com os dados do usuário salvo
    res.json(autor);
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai deletar o Id
router.delete('/tabelaautor/:id', async (req, res) => {
  try {
    //Obtendo o modelo de usuário definido no mongodb utilizando o mongoose. 
    let AutorModel = mongoose.model('Autor', autorSchema);
    //Executa uma operação de exclusao no Banco de Dados. 
    const deletedAutor = await AutorModel.findByIdAndDelete(req.params.id);
    //Atualiza o que foi exluido e retorna sem o registro. 
    res.json(deletedAutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//-------------------------------------------------------Definindo as rotas do CADASTRO CATEGORIA-------------------------------------------------------------------------//
//Quero salvar os dados do cadastrolivros:

router.post('/cadastrocategoria', async (req, res) => {
  try {

    let CategoriaModel = mongoose.model('Categoria', categoriaSchema);

    // Cria uma nova instância de livro com base nos dados do corpo da requisição
    let categoria = new CategoriaModel({
      nome: req.body.nome,
      descricao: req.body.descricao,
    });

    // Salva o novo livro no banco de dados
    await categoria.save();

    // Responde com uma mensagem de sucesso
    res.json("Categoria cadastrado com sucesso!");
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai pegar os dados do MongoDB com a rota Get - PARA TRAZER OS DADOS E MOSTRAR NA TABELA

router.get('/Tabelacategoria', async (req, res) => {
  try {
    // Cria um modelo de usuário usando o mongoose
    let CategoriaModel = mongoose.model('Categoria', categoriaSchema);

    // Busca todos os usuários no banco de dados
    let categoria = await CategoriaModel.find();

    // Responde com os dados dos usuários
    res.json(categoria);

  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//-------------------------------------------------------------FUNCAO DE UPDATE DO Categoriaaaaaaaaa---------------------------------------------------------------//
//Pega os dados para atualizar
router.get('/getCadastrocategoriaFromId/:id', async (req, res) => {

  try {
    //Obtém o ID do usuário da URL
    const categoriaId = req.params.id;

    //Cria um modelo de usuário usando o mongoose
    const CategoriaModel = mongoose.model('Categoria', categoriaSchema);

    //Busca o usuário pelo ID
    const categoria = await CategoriaModel.findById(categoriaId);

    //Se o usuário não for encontrado, retorna um erro 404
    if (!categoria) {
      return res.status(404).json({ erro: 'categoria não encontrado' });
    }

    //Retorna os dados do usuário
    res.json(categoria);
  } catch (error) {
    //Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui é a rota para ATUALIZAR os dados do Categoriaaaaaaaaa
router.patch('/cadastrocategoria/:id?', async (req, res) => {
  try {
    // Obtém o ID do usuário da URL, se fornecido
    const categoriaId = req.params.id;

    // Cria um modelo de usuário usando o mongoose
    const CategoriaModel = mongoose.model('Categoria', categoriaSchema);

    let categoria;

    categoria = await CategoriaModel.findById(categoriaId);

    // Preenche os dados do usuário com os dados fornecidos no corpo da requisição
    categoria.nome = req.body.nome;
    categoria.descricao = req.body.descricao;


    // Salva o usuário no banco de dados
    await categoria.save();

    // Responde com os dados do usuário salvo
    res.json(categoria);
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: error.message });
  }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//Aqui vai deletar o Id
router.delete('/tabelacategoria/:id', async (req, res) => {
  try {
    //Obtendo o modelo de usuário definido no mongodb utilizando o mongoose. 
    let CategoriaModel = mongoose.model('Categoria', categoriaSchema);
    //Executa uma operação de exclusao no Banco de Dados. 
    const deletedCategoria = await CategoriaModel.findByIdAndDelete(req.params.id);
    //Atualiza o que foi exluido e retorna sem o registro. 
    res.json(deletedCategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Array para armazenar tokens gerados
let tokens = [];


// Rota para login
router.get('/login', async (req, res) => {
  const { email, senha } = req.query;

  // Loga os dados recebidos para fins de depuração
  console.log('Dados recebidos:', email, senha);

  try {
    // Define o modelo de usuário do MongoDB
    const User = mongoose.model('User', userSchema);

    // Procura um usuário no banco de dados com o email e senha fornecidos
    const usuario = await User.findOne({ email, senha });

    // Se o usuário não for encontrado, retorna um erro 403 (Proibido)
    if (!usuario) {
      console.log('Usuário não encontrado ou senha incorreta.');
      return res.status(403).json({ erro: 'Email ou senha incorretos' });
    }

    // Função para gerar uma string aleatória de um tamanho especificado
    function gerarStringAleatoria(tamanho) {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Define os caracteres que podem ser usados no token
      let resultado = ''; // String resultante que será retornada
      const comprimentoCaracteres = caracteres.length; // Comprimento da string de caracteres

      // Loop para gerar a string aleatória
      for (let i = 0; i < tamanho; i++) {
        // Gera um índice aleatório e adiciona o caractere correspondente à string resultante
        const indiceAleatorio = Math.floor(Math.random() * comprimentoCaracteres);
        resultado += caracteres.charAt(indiceAleatorio);
      }

      return resultado; // Retorna a string aleatória gerada
    }

    // Função para gerar um token único
    function gerarTokenUnico() {
      // Gera uma string aleatória inicial
      //(Ação 1)
      let token = gerarStringAleatoria(6);
      // Verifica se o token já existe na lista de tokens
      // Ação 2: Verifica se o token já existe na lista de tokens
      while (tokens.includes(token)) {
        // Se o token já existir, gera um novo token (Ação 2)
        token = gerarStringAleatoria(6);
      }
      // Ação 1: Retorna o token único gerado (implicando que ele será inserido na lista depois)

      return token; // Retorna o token único gerado
    }

    // Se o usuário for encontrado, gera um token único
    const token = gerarTokenUnico();
    tokens.push(token); // Armazena o token gerado na lista

    // Mostrar lista de tokens
    console.log('Tokens gerados:', tokens);

    // Retorna um status de sucesso com o token gerado
    return res.status(200).json({ sucesso: true, mensagem: 'Login bem-sucedido', token });
  } catch (error) {
    // Loga o erro para fins de depuração
    console.error('Erro ao tentar fazer login:', error);
    // Em caso de erro, retorna um status 500 (Erro Interno do Servidor) com uma mensagem de erro
    res.status(500).json({ erro: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.' });
  }
});

// Rota para verificar se um token é válido
router.post('/verificarToken', (req, res) => {
  console.log('Rota /verificarToken foi acessada.');
  const { token } = req.body;

  // Verifica se o token está presente na lista de tokens
  if (tokens.includes(token)) {
    // Se o token estiver presente, retorna um JSON com validado: true
    res.json({ validado: true });
    console.log("Mensagem retornando", true);
  } else {
    // Se o token não estiver presente, retorna um JSON com validado: false
    res.json({ validado: false });
    console.log("Mensagem retornando", false);
  }
});


// Rota para logout e remoção do token
router.get('/logoutToken', (req, res) => {
  console.log('Rota /logoutToken foi acessada.');
  const token = req.query.token; // Obtém o token dos parâmetros da query string
  console.log('Token recebido:', token);

  // Verifica o estado da lista de tokens antes da verificação
  console.log('Lista de tokens antes da verificação:', tokens);

  // Verifica se o token está presente na lista de tokens
  if (tokens.includes(token)) {
    // Remove o token da lista de tokens
    tokens = tokens.filter(t => t !== token);
    res.json({ mensagem: 'Logout realizado com sucesso.' });
    console.log("Token removido:", token);
  } else {
    res.status(404).json({ mensagem: 'Token não encontrado.' });
    console.log("Token não encontrado:", token);
  }

  // Verifica o estado da lista de tokens após a remoção
  console.log('Lista de tokens após a remoção:', tokens);
});






module.exports = router;
