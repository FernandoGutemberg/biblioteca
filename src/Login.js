import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:9000/login?email=${email}&senha=${senha}`)
      .then(response => response.json())
      .then(data => {
        if (data.sucesso) {
          navigate('/Home'); 
        } else {
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
