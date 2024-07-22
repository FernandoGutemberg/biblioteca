import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Tabelacategoria = () => {
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


    const notifyDelete = () => toast("Categoria deletada com sucesso!");
    const notifyCadastro = () => toast("Categoria salva com sucesso!");


    // Estado para armazenar as categorias
    const [categoria, setCategoria] = useState([]);

    // Função para buscar as categorias do servidor
    const fetchCategoria = async () => {
        try {
            const response = await fetch('http://localhost:9000/Tabelacategoria');
            const data = await response.json();
            setCategoria(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Executa a função fetchCategoria quando o componente é montado
    useEffect(() => {
        // if existir o localStorage x emita o notify
        // depois de emitir, limpe Ele 
        if (localStorage.getItem("notificacao") === "true") {

            localStorage.setItem("notificacao", null);

            setTimeout(() => {

                notifyCadastro();
            }, 500);

        }

        fetchCategoria();
    }, []);

    // Estado para controlar o modal de confirmação de exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Estado para armazenar o ID da categoria a ser excluída
    const [categoriaIdToDelete, setCategoriaIdToDelete] = useState('');

    // Função para lidar com a exclusão de uma categoria
    const handleDelete = async (categoriaId) => {
        // Exibe o modal de confirmação
        setShowDeleteModal(true);
        setCategoriaIdToDelete(categoriaId);
    };

    // Função para confirmar a exclusão da categoria
    const handleDeleteConfirmed = async () => {
        try {
            await fetch(`http://localhost:9000/tabelacategoria/${categoriaIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            })
                .then(() => {
                    fetchCategoria();
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

    // Função para redirecionar para a página de cadastro de categorias
    const redirecionarParaCadastrocategoria = () => {
        window.location.href = '/Cadastrocategoria';
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

    // Retorna a estrutura JSX da tabela de categorias
    return (
        <div>
            <h2>Tabela de Categorias</h2>
            <Button onClick={redirecionarParaCadastrocategoria}>Cadastrar Categoria</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ação Deletar</th>
                        <th>Ação Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {categoria.map((categoria, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{categoria.nome}</td>
                            <td>{categoria.descricao}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    className="delete"
                                    type="button"
                                    onClick={() => handleDelete(categoria._id)}
                                >
                                    DELETAR
                                </Button>
                            </td>
                            <td>
                                <Button
                                    className="update"
                                    type="button"
                                    onClick={() => (window.location.href = `/Cadastrocategoria/${categoria._id}`)}
                                >
                                    EDITAR
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

export default Tabelacategoria;
