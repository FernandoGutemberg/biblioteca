import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redireciona para a página de login se o token não estiver presente
    }
  }, [navigate]);

  return (
    <div className="container">
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
