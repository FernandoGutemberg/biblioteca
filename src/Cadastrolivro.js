import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cadastrolivro = () => {
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
          window.location.replace("/"); 
        }
      }, []);
    
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [autor, setAutor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [anopublicacao, setAnoPublicacao] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:9000/getCadastrolivroFromId/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setNome(data.nome);
                    setAutor(data.autor);
                    setCategoria(data.categoria);
                    setAnoPublicacao(data.anopublicacao);
                })
                .catch((error) => {
                    console.error("Erro ao carregar dados do livro:", error);
                });
        }
    }, [id]);

    const handleChangeNome = (event) => {
        setNome(event.target.value);
    };

    const handleChangeAutor = (event) => {
        setAutor(event.target.value);
    };

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const handleChangeAnoPublicacao = (event) => {
        setAnoPublicacao(event.target.value);
    };

    const handleOnClickSalvar = () => {
        const dados = {
            nome: nome,
            autor: autor,
            categoria: categoria,
            anopublicacao: anopublicacao,
        };

        const configuracaoEnvio = {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        };

        const url = id ? `http://localhost:9000/cadastrolivro/${id}` : "http://localhost:9000/cadastrolivro";

        fetch(url, { ...configuracaoEnvio, method: id ? "PATCH" : "POST" })
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados salvos:", data);


                localStorage.setItem("notificacao", "true");
                // criar um local storage

                navigate('/Tabelalivro'); // Redireciona para a tabela de categorias
            })
            .catch((error) => {
                console.error("Erro ao salvar dados:", error);
            });
    };

    return (
        <div>
            <h1>Cadastro de Livros</h1>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Nome do Livro:</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nome do livro" value={nome} onChange={handleChangeNome} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Autor:</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nome do Autor" value={autor} onChange={handleChangeAutor} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Categoria:</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Categoria" value={categoria} onChange={handleChangeCategoria} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Ano de Publicação:</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Ano de publicação" value={anopublicacao} onChange={handleChangeAnoPublicacao} />
                    </Col>
                </Form.Group>
                <Button type="button" onClick={handleOnClickSalvar}>Salvar</Button>
                &nbsp;

                <Button
                    variant="dark"
                    className='voltar'
                    type='button'
                    onClick={() => window.location.href = '/Tabelalivro/'}
                >Voltar
                </Button>
                <ToastContainer />
            </Form>
        </div>
    );
};

export default Cadastrolivro;
