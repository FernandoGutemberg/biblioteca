import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const navigate = useNavigate();

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
      navigate('/'); // Redireciona para a tela de login se o token não for encontrado
    }
  }, [navigate]);


  const handleLogout = () => {
    // Remove o token do armazenamento
    sessionStorage.removeItem('token');

    // Envia uma requisição para o servidor para invalidar o token (opcional)
    fetch('http://localhost:9000/logoutToken', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao realizar o logout');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });

    // Redireciona para a tela de login
    navigate('/');
  };



  return (
    <div className="container">
      <Button onClick={handleLogout}>Logout</Button>
      <h1>Home</h1>
      <section className="home">
        <p>
          Uma biblioteca, na definição tradicional do termo, é um local em que são guardados livros, documentos tridimensionais e demais
          publicações para o público estudar, ler e consultar tais obras. Desta forma, os três objetivos das bibliotecas são:
          Utilize nossa Biblioteca com objetivos educacionais e explore os métodos de edição inovadores, tecnológicos de sistemas
          avançados e aprendizagem global. Além do mais, no nosso sistema de biblioteca temos por finalidade a criação de usuários, livros, autores e categorias.
        </p>
        <img src="lib.jpg" className="imagem" alt="Biblioteca" />
      </section>
    </div>
  );
};

export default Home;
