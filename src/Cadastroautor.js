import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Form, Row, Button } from 'react-bootstrap';

const Cadastroautor = () => {
    const navigate = useNavigate();
    const [tokenValido, setTokenValido] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
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
                        navigate('/Login');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                });

        } else {
            alert('Token não encontrado. Redirecionando para a tela de login.');
            navigate('/Login');
        }
    }, [navigate]);

    //estados que armazenam os valores dos campos do formulário
    const [nome, setNome] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
    const [dataNascimento, setdataNascimento] = useState("");
    //id é um parametro da URL, usado para identificar se estamos editando um autor existente.
    const { id } = useParams();

    // useEffect utilizado para carregar os dados do usuário caso esteja em modo de edição (se houver um ID na URL)

    useEffect(() => {

        if (id) {
            // Se houver um ID na URL, significa que estamos editando um usuário existente
            // Neste caso, fazemos uma requisição POST para obter os dados do usuário com o ID fornecido
            //PATH para editar    e POST para salvar
            fetch(`http://localhost:9000/getCadastroautorFromId/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    // Atualizamos o estado do componente com os dados do usuário
                    setNome(data.nome);
                    setNacionalidade(data.nacionalidade);
                    setdataNascimento(data.datanascimento);
                })
                .catch((error) => {
                    console.error("Erro ao carregar dados do usuário:", error);
                });
        } else {

        }
    }, [id]);

    // Funções para atualizar os estados dos campos do formulário
    const handleChangeNome = (event) => {
        setNome(event.target.value);
    };

    const handleChangeNacionalidade = (event) => {
        setNacionalidade(event.target.value);
    };

    const handleChangedataNascimento = (event) => {
        setdataNascimento(event.target.value);
    };

    //funcao de salvar dados
    const handleOnClickSalvar = () => {
        const dados = {
            nome: nome,
            nacionalidade: nacionalidade,
            datanascimento: dataNascimento,
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


        fetch(`http://localhost:9000/cadastroautor${id ? `/${id}` : ''}`, configuracaoEnvio)
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados salvos:", data);

                localStorage.setItem("notificacao", "true");
                // criar um local storage
                navigate('/Tabelaautor');

            })
            .catch((error) => {
                console.error("Erro ao salvar dados:", error);
            });
    };

    return (
        <div>
            <h1 className="ali">Cadastro de Autor</h1>

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
                        Nacionalidade:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Nacionalidade" value={nacionalidade} onChange={handleChangeNacionalidade} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Data de Nascimento:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" placeholder="Data de nascimento" value={dataNascimento} onChange={handleChangedataNascimento} />
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
                    onClick={() => window.location.href = '/Tabelaautor/'}
                >Voltar
                </Button>
                <ToastContainer />

            </Form>

        </div>
    );
};

export default Cadastroautor;