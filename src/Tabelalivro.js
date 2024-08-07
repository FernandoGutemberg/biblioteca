// Importa as funções useState e useEffect do React
//useEffect e para fazer algo apenas após renderização
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

// Define o componente funcional Tabelausuarios
const Tabelalivro = () => {
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
                        alert('Token invákido. Redirecionando para a tela de login.');
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


    const notifyDelete = () => toast("Livro deletado com sucesso!");
    const notifyCadastro = () => toast("Livro salvo com sucesso!");


    // Define um estado 'usuarios' usando o hook useState
    // O estado 'usuarios' é inicializado como um array vazio

    const [livro, setLivro] = useState([]);

    // Função assíncrona que busca os usuários do servidor
    const fetchLivro = async () => {
        try {
            const response = await fetch('http://localhost:9000/tabelalivros');
            // Faz uma requisição para 'http://localhost:9000/tabela' usando fetch API
            const data = await response.json();
            // Extrai os dados JSON da resposta
            setLivro(data);
            // Atualiza o estado 'usuarios' com os dados obtidos do servidor
        } catch (error) {
            console.error(error);
            // Se ocorrer um erro, ele será registrado no console
        }
    };

    // Hook useEffect que executa a função fetchUsuarios quando o componente é montado
    useEffect(() => {
        // if existir o localStorage x emita o notify
        // depois de emitir, limpe Ele 
        if (localStorage.getItem("notificacao") === "true") {

            localStorage.setItem("notificacao", null);

            setTimeout(() => {

                notifyCadastro();
            }, 500);

        }

        fetchLivro();
        // Chama a função fetchUsuarios quando o componente é montado
    }, []);

    // Estado para controlar o modal de confirmação de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Estado para armazenar o ID da categoria a ser excluída
    const [livroIdToDelete, setLivroIdToDelete] = useState('');

    // Função para lidar com a exclusão de uma categoria
    const handleDelete = async (livroId) => {
        // Exibe o modal de confirmação
        setShowDeleteModal(true);
        setLivroIdToDelete(livroId);
    };

    // Função para confirmar a exclusão da categoria
    const handleDeleteConfirmed = async () => {
        try {
            await fetch(`http://localhost:9000/tabelalivro/${livroIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
                .then(() => {
                    fetchLivro();
                    setShowDeleteModal(false);
                    notifyDelete();

                })
                .catch(error => {
                    console.error('Erro durante a exclusão', error);
                });
        } catch (error) {
            console.error('Erro ao tentar deletar a categoria', error);
        }
    };

    const redirecionarParaCadastroLivro = () => {
        window.location.href = '/Cadastrolivro'; // Redireciona para a página de cadastro de usuários
    };

    // Modal de confirmação de exclusão
    const DeleteModal = ({ show, handleClose }) => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <p>Deseja realmente excluir a categoria?</p>
                        <Button variant="danger" onClick={handleDeleteConfirmed}>
                            Excluir
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    };

    //Retorna a estrutura JSX do componente Tabela
    return (
        <div>
            <h2>Tabela de Livros</h2>
            <Button onClick={redirecionarParaCadastroLivro}>Cadastrar Livro</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Ano de Publicação</th>
                        <th>Ação Deletar</th>
                        <th>Ação Editar</th>
                    </tr>
                </thead>
                <tbody>

                    {livro.map((livro, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{livro.nome}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.categoria}</td>
                            <td>{livro.anopublicacao}</td>

                            {/* Botão para excluir um usuário */}
                            <td>
                                <Button
                                    variant="danger"
                                    className='delete'
                                    type='button'
                                    onClick={() => handleDelete(livro._id)}
                                >DELETAR
                                </Button>
                            </td>

                            {/* Botão para editar um usuário */}
                            <td>
                                <Button
                                    className='update'
                                    type='button'
                                    onClick={() => window.location.href = '/Cadastrolivro/' + livro._id}
                                >EDITAR
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer />
            <DeleteModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />

        </div>
    );
};

export default Tabelalivro;
