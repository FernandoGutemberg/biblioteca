import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import { Col, Form, Row, Button } from 'react-bootstrap';
import InputMask from "react-input-mask";
import './Cadastro.css';

const Cadastrousuarios = () => {
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
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                });

        } else {
            alert('Token não encontrado. Redirecionando para a tela de login.');
            navigate('/');
        }
    }, [navigate]);



    const [nomeCompleto, setNomeCompleto] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setdataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { id } = useParams();

    // useEffect utilizado para carregar os dados do usuário caso esteja em modo de edição (se houver um ID na URL)
    useEffect(() => {

        if (id) {
            // Se houver um ID na URL, significa que estamos editando um usuário existente
            // Neste caso, fazemos uma requisição POST para obter os dados do usuário com o ID fornecido
            //PATH para editar    e POST para salvar
            fetch(`http://localhost:9000/getCadastrousuariosFromId/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    // Atualizamos o estado do componente com os dados do usuário
                    setNomeCompleto(data.nomecompleto);
                    setCpf(data.cpf);
                    setdataNascimento(data.datanascimento);
                    setTelefone(data.telefone);
                    setEmail(data.email);
                    setSenha(data.senha);

                })
                .catch((error) => {
                    console.error("Erro ao carregar dados do usuário:", error);
                });
        } else {

        }
    }, [id]);

    // Funções para atualizar os estados dos campos do formulário
    const handleChangeNomeCompleto = (event) => {
        setNomeCompleto(event.target.value);
    };

    const handleChangeCpf = (event) => {
        setCpf(event.target.value);
    };

    const handleChangedataNascimento = (event) => {
        setdataNascimento(event.target.value);
    };

    const handleChangeTelefone = (event) => {
        setTelefone(event.target.value);
    };
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangeSenha = (event) => {
        setSenha(event.target.value);
    };

    const handleOnClickSalvar = () => {
        const dados = {
            nomeCompleto: nomeCompleto,
            cpf: cpf,
            dataNascimento: dataNascimento,
            telefone: telefone,
            email: email,
            senha: senha,
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

        fetch(`http://localhost:9000/Cadastrousuarios${id ? `/${id}` : ""}`, configuracaoEnvio)
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados salvos:", data);

                localStorage.setItem("notificacao", "true");
                // criar um local storage
                navigate('/Tabelausuarios');
            })
            .catch((error) => {
                console.error("Erro ao salvar dados:", error);
            });

    };

    return (
        <div >
            <h1>Cadastro de Usuários</h1> {/*Titulo do pagina cadastro*/}

            {/*Form estrutura bootstrap para criar usuario com nome completo, cfp... etc. */}
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Nome Completo:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Seu nome completo" name="nome" value={nomeCompleto} onChange={handleChangeNomeCompleto} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        CPF:
                    </Form.Label>
                    <Col sm="10">
                        <InputMask className="estilizacaoInputText" placeholder="000.000.000-00" value={cpf}  mask="999.999.999-99" onChange={handleChangeCpf} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Data de Nascimento:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" value={dataNascimento} onChange={handleChangedataNascimento} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Telefone:
                    </Form.Label>
                    <Col sm="10">
                        <InputMask className="estilizacaoInputText" placeholder="" mask="99999-9999" value={telefone} onChange={handleChangeTelefone} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        E-mail:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" placeholder="email@example.com" name="email" value={email} onChange={handleChangeEmail} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="">
                        Senha:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="senha" value={senha} onChange={handleChangeSenha} />
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
                    onClick={() => window.location.href = '/Tabelausuarios/'}
                >Voltar
                </Button>
                <ToastContainer />

            </Form>
        </div>
    );
};

export default Cadastrousuarios;