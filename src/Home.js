import React, { useState, useEffect } from 'react';
import './Cadastro.css';

const Home = () => {

  useEffect(() => {
      
    if(sessionStorage.getItem("session") != "true"){

      window.location.replace("/");
    }
      
  }, []);

  return (
    <div className="container">
      <h1>Home</h1> 
      <section className="home">
        <p>
        Uma biblioteca, na definição tradicional do termo, é um local em que são guardados livros, documentos tridimensionais e demais 
        publicações para o público estudar, 
        ler e consultar tais obras. Desta forma, os três objetivos das bibliotecas são:
        Utilize nossa Biblioteca com objetivos educacionais e explore os métodos de edição inovadores, tecnologicos de sistemas 
        avançados e aprendizagem global. 
        Alem do mais, no nosso sistema de biblioteca temos por finalidade a criação de usuários, livros, autores e categoria. 
        
        </p>
        <img src="lib.jpg" className="imagem"/>

      </section>
    </div>
  );
};

export default Home;