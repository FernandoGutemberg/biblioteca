import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Form, Row, Button } from 'react-bootstrap';

const Cadastrocategoria = () => {
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
          window.location.replace("/"); 
        }
      }, []);

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const { id } = useParams();

    // useEffect utilizado para carregar os dados do usuário caso esteja em modo de edição (se houver um ID na URL)

    useEffect(() => {

        if (id) {
            // Se houver um ID na URL, significa que estamos editando um usuário existente
            // Neste caso, fazemos uma requisição POST para obter os dados do usuário com o ID fornecido
            //PATH para editar    e POST para salvar
            fetch(`http://localhost:9000/getCadastrocategoriaFromId/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    // Atualizamos o estado do componente com os dados do usuário
                    setNome(data.nome);
                    setDescricao(data.descricao);
                })
                .catch((error) => {
                    console.error("Erro ao carregar dados de categoria:", error);
                });
        } else {

        }
    }, [id]);

    // Funções para atualizar os estados dos campos do formulário
    const handleChangeNome = (event) => {
        setNome(event.target.value);
    };

    const handleChangeDescricao = (event) => {
        setDescricao(event.target.value);
    };


    const handleOnClickSalvar = () => {
        const dados = {
            nome: nome,
            descricao: descricao,
        };


        const configuracaoEnvio = {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        };


        if (!id) {

            configuracaoEnvio.method = "POST";


        } else {

            configuracaoEnvio.method = "PATCH";
        }

        fetch(`http://localhost:9000/cadastrocategoria${id ? `/${id}` : ''}`, configuracaoEnvio)
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados salvos:", data);

                localStorage.setItem("notificacao", "true");
                // criar um local storage
                navigate('/Tabelacategoria');
            })
            .catch((error) => {
                console.error("Erro ao salvar dados:", error);
            });

    };


    return (
        <div>
            <h1>Cadastro de Categoria</h1>

            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Nome do Autor:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nome do Autor" value={nome} onChange={handleChangeNome} />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Categoria:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nome da categoria" value={descricao} onChange={handleChangeDescricao} />
                    </Col>
                </Form.Group>

                <Button type="button" onClick={handleOnClickSalvar}>
                    Salvar
                </Button>

                &nbsp;

                <Button
                    variant="dark"

                    className='voltar'
                    type='button'
                    onClick={() => window.location.href = '/Tabelacategoria/'}
                >Voltar
                </Button>
                <ToastContainer />
            </Form>

        </div>
    );
};

export default Cadastrocategoria;