// Importa as funções useState e useEffect do React
//useEffect e para fazer algo apenas após renderização
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const Tabelaautor = () => {
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

  const notifyDelete = () => toast("Autor deletado com sucesso!");
  const notifyCadastro = () => toast("Autor salvo com sucesso!");


  // Define um estado 'usuarios' usando o hook useState
  // O estado 'usuarios' é inicializado como um array vazio
  const [autor, setAutor] = useState([]);

  // Função assíncrona que busca os usuários do servidor
  const fetchAutor = async () => {
    try {
      const response = await fetch('http://localhost:9000/tabelaautor');
      // Faz uma requisição para 'http://localhost:9000/tabela' usando fetch API
      const data = await response.json();
      // Extrai os dados JSON da resposta
      setAutor(data);
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

    fetchAutor();
    // Chama a função fetchUsuarios quando o componente é montado
  }, []);

  // Estado para controlar o modal de confirmação de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Estado para armazenar o ID da categoria a ser excluída
  const [autorIdToDelete, setAutorIdToDelete] = useState('');

  // Função para lidar com a exclusão de uma categoria
  const handleDelete = async (autorId) => {
    // Exibe o modal de confirmação
    setShowDeleteModal(true);
    setAutorIdToDelete(autorId);
  };

  // Função para confirmar a exclusão da categoria
  const handleDeleteConfirmed = async () => {
    try {
      await fetch(`http://localhost:9000/tabelaautor/${autorIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(() => {
          fetchAutor();
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

  const redirecionarParaCadastroautor = () => {
    window.location.href = '/Cadastroautor';
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
    <div className="form-group">
      <h2>Tabela de Autores</h2>
      <Button onClick={redirecionarParaCadastroautor}>Cadastrar Autor</Button>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome Completo</th>
            <th>Nacionalidade</th>
            <th>Data de Nascimento</th>
            <th>Ação Deletar</th>
            <th>Ação Editar</th>

          </tr>
        </thead>
        <tbody>

          {autor.map((autor, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{autor.nome}</td>
              <td>{autor.nacionalidade}</td>
              <td>{autor.datanascimento}</td>

              {/* Botão para excluir um usuário */}
              <td>
                <Button
                  variant="danger"
                  className='delete'
                  type='button'
                  onClick={() => handleDelete(autor._id)}
                >DELETAR
                </Button>
              </td>

              {/* Botão para editar um usuário */}
              <td>
                <Button
                  className='update'
                  type='button'
                  onClick={() => window.location.href = '/Cadastroautor/' + autor._id}
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

export default Tabelaautor;