// //UTILIZANDO CÓDIGO DO 
// //Define uma rota http para '/cadastro' -  AQUI NOS MANDAMOS OS DADOS PARA O MONGODB
// router.post('/cadastrousuarios', async (req, res) => {
//   try {
//     //Cria um novo usuário com base nos dados do corpo da requisição
//     let UserModel = mongoose.model('User', userSchema);

//     //Cria uma nova instância de usuário com base nos dados reebidos na requisição
//     let usuario = new UserModel({

//       nomecompleto: req.body.nomeCompleto,
//       cpf: req.body.cpf,
//       datanascimento: req.body.dataNascimento,
//       telefone: req.body.telefone,
//       email: req.body.email,
//       senha: req.body.senha,

//     });

//     //Capturar os dados
//     await usuario.save();


//     //Colocar uma funcao para disparar email
//     var options = req.body;
//     var nodemailer = require('nodemailer');

//     var remetente = nodemailer.createTransport({
//       host: 'email-ssl.com.br',
//       service: 'email-ssl.com.br',
//       port: 587,
//       secure: false,
//       auth: {
//         user: 'noreply@cfn.org.br',
//         pass: '$8KE87q9znD!'
//       }
//     });
//     const body = `
//       Olá prezado(a) ${options.nomeCompleto}.<br><br>
//       Segue as credenciais de acesso ao Sistema Biblioteca:<br>
//       URL: http://localhost:3000/Cadastrousuarios<br>
//       Login: ${options.email}<br>
//       Senha: ${options.senha_clear}<br><br>

//       Atenciosamente,<br>
//       Assessoria de TI do CFN<br> 
//       Conselho Federal de Nutricionistas<br>
//     `;

//     var emailASerEnviado = {
//       from: 'noreply@cfn.org.br',
//       to: options.email,
//       subject: 'Credenciais de Acesso - BIBLIOTECA ',
//       html: body,
//     };
//     remetente.sendMail(emailASerEnviado, function (error) {
//       if (error) {

//         console.log(error);
//         res.send(false);
//       } else {

//         console.log('Email enviado com sucesso.');
//         res.send(true);
//       }
//     });

//     console.log(usuario);

//     // Responde com o objeto de usuário salvo
//     res.json("Salvei");
//   } catch (error) {
//     // Se houver um erro, responde com um status de erro e mensagem
//     res.status(500).json({ erro: error.message });
//   }
// });


// const nodemailer = require("nodemailer");

// const transportador = nodemailer.createTransport({
//    host: "smtp.ethereal.email",
//    porta: 587,
//    secure: false, // Use `true` para a porta 465, `false` para todas as outras portas
//    autenticação: {
//      usuário: "maddison53@ethereal.email",
//      passar: "jn7jnAPss4f63QBp6D",
//    },
// });

// // async..await não é permitido no escopo global, deve usar um wrapper
// função assíncrona main() {
//    // envia e-mail com objeto de transporte definido
//    const info = aguardar transporter.sendMail({
//      de: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // endereço do remetente
//      para: "bar@example.com, baz@example.com", // lista de destinatários
//      subject: "Olá ✔", // Linha de assunto
//      text: "Olá, mundo?", // corpo do texto simples
//      html: "<b>Olá, mundo?</b>", // corpo html
//    });

//    console.log("Mensagem enviada: %s", info.messageId);
//    // Mensagem enviada: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);




// 1. Configurando as opções de email:

// var options = req.body;: Essa linha pressupõe que você esteja usando um framework Node.js como Express. Ela recupera dados do corpo da requisição (provavelmente de um envio de formulário) e os armazena na variável options. Esses dados provavelmente incluem o nome completo do usuário (nomeCompleto), endereço de email (email) e senha não criptografada (senha_clear).
// 2. Importando Nodemailer:

// const nodemailer = require("nodemailer");: Esta linha importa o módulo nodemailer, que permite enviar emails do seu aplicativo Node.js.
// 3. Criando o transportador de email:

// const transporter = nodemailer.createTransport({ ... });: Aqui, você está criando um objeto transportador que configura como o Nodemailer enviará emails. A configuração inclui:
// host: "email-ssl.com.br": O hostname ou endereço IP do servidor de email que você está usando.
// port: 587: O número da porta usada para comunicação com o servidor de email. Essa porta é comumente usada para conexões não criptografadas.
// secure: false: Especifica que você não está usando uma conexão segura (como SSL/TLS). É altamente recomendável usar uma conexão segura para comunicação de email.
// auth: { ... }: Este objeto armazena as credenciais de autenticação com o servidor de email:
// user: "noreply@cfn.org.br": O nome de usuário da sua conta de email.
// pass: "$8KE87q9znD!": A senha da sua conta de email. É altamente recomendável evitar armazenar senhas diretamente no código. Considere usar variáveis de ambiente ou um sistema de gerenciamento de configuração seguro.
// 4. Construindo o corpo do email:

// const body = ... ;: Esta seção constrói o conteúdo HTML do email que será enviado ao usuário. Ele inclui espaços reservados para o nome completo do usuário (options.nomeCompleto), endereço de email (options.email) e senha (options.senha_clear). Tenha cuidado ao enviar senhas não criptografadas em emails.
// 5. Enviando o email (Função assíncrona):

// async function main() { ... }: Esta é uma função assíncrona chamada main que lida com o processo de envio de email. Funções assíncronas permitem que você lide com operações que podem levar tempo (como enviar um email) sem bloquear o thread principal do seu aplicativo.
// transporter.sendMail({ ... });: Dentro da função main, você chama o método sendMail do objeto transportador. Este método recebe um objeto contendo os detalhes do email como argumento:
// from: '"Maddison Foo Koch " <noreply@cfn.org.br>': Nome e endereço de email do remetente.
// to: "fernandocfn2023@gmail.com": Endereço de email do destinatário.
// subject: options.email: A linha de assunto do email, que neste caso é definida como o endereço de email do usuário.
// text: "Hello world?": Isso é incluído para compatibilidade com clientes de email de texto simples, mas é substituído pela propriedade html.
// html: body: O conteúdo HTML do email que foi construído anteriormente.
// 6. Gerenciando a resposta e erros:

// console.log("Message sent: %s", "Mensagem Enviada", info.messageId);: Se o email for enviado com sucesso, esta linha registra uma mensagem no console indicando o sucesso junto com o ID da mensagem do servidor de email.
// main().catch(console.error);: Esta linha garante que quaisquer erros encontrados durante o processo de envio de email sejam capturados e registrados no console usando console.error.
// Considerações importantes de segurança:

// Evite armazenar senhas no código: É crucial nunca armazenar senhas diretamente no seu código. Considere usar variáveis de ambiente ou um sistema de gerenciamento de configuração seguro para armazenar informações confidenciais.
// Use conexões seguras (TLS/SSL): Sempre configure o Nodemailer para usar uma conexão segura (TLS/SSL) ao enviar emails. Isso criptografa a comunicação entre seu aplicativo e o servidor de email, protegendo dados confidenciais.
// Limpe a entrada do usuário: Antes de usar options.email e options.senha_clear no corpo do email, certifique-se de higienizá-

1- Na api, após gerar o token de login, o express deve guardar esse token em uma lista. 
Seja um object ou um array. ok
2 - antes de salvar o token nesse array, vc deve verificar se o token está duplicado 
3 - se o token for duplicado, gera outro e cai na ação 2
4 - se o token não for duplicado, insere o token na lista (ação 1)
5 - se tudo estiver ok devolve o token para o reac
6 na rota /verificarToken, envia o token para o express e checa 
se o token existe na lista de tokens
7 - se o token existir, retorna true, se não, false

// Importa as funções useState e useEffect do React
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'; // Assumindo que você está usando react-router-dom para navegação

// Define o componente funcional Tabelausuarios
const Tabelausuarios = () => {
  const navigate = useNavigate();
  const [tokenValido, setTokenValido] = useState(false);

  // Verifica a sessão ao carregar a página e valida o token
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      // Faz a requisição para verificar o token
      fetch('http://localhost:9000/verificarToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.validado) {
            setTokenValido(true);
          } else {
            setTokenValido(false);
            alert('Token inválido. Redirecionando para a tela de login.');
            navigate('/Login'); // Redireciona para a tela de login se o token for inválido
          }
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    } else {
      alert('Token não encontrado. Redirecionando para a tela de login.');
      navigate('/Login'); // Redireciona para a tela de login se o token não for encontrado
    }
  }, [navigate]);

23/07/2024

COrreto do verificarToken é um GET

  Fazer o logout, criar um botao para sair do sistema, ele mata o token, vai na lista do express e elimina o token. 
1 - Fazer o logout
2 - igual o verificarToken, só que ele elimina o token na lista. 
3 - Gravar video dele funcionando. 


Pensar em outro projeto; Que trabalhe com algo do tipo WAPP. 
Pensar outra ideia, mapa, upload, mensagens, notificações, geolocalização. 