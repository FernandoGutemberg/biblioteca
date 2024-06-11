<!-- <!-- import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({  }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      
    if(sessionStorage.getItem("session") == "true"){

      window.location.replace("/Home");
    }
      
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //aqui tem uma funcao tbm
    sessionStorage.setItem("session", "true");
    window.location.replace("/Home");
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
        </div>

        <form className="login-senha" onSubmit={handleSubmit}>
          <h1>Sistema Biblioteca</h1>
          <input
            type="email"
            name="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login; -->


//Pega os dados para atualizar
router.get('/login', async (req, res ) => {

  const { email, senha } = req.query; 

  console.log('Dados recebidos:', email, senha);
  try {


    const User = mongoose.model('User', userSchema);


    const usuario = await User.findOne({ email, senha }); //ERRO AQUI
    // console.log("######");
    // return false

    if (!usuario) {
      return res.status(404).json({ erro: 'Email ou senha incorretos' });
    }

    // Se o usuário for encontrado, retorna sucesso
    res.status(200).json({ sucesso: true, mensagem: 'Login bem-sucedido' });
  } catch (error) {
    // Se houver um erro, responde com um status de erro e mensagem
    res.status(500).json({ erro: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.' });
  }

});
 -->
