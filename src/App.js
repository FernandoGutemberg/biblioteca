import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import Home from "./Home";
import Tabelausuarios from "./Tabelausuarios";
import Cadastrousuarios from "./Cadastrousuarios";
import Cadastrolivro from "./Cadastrolivro";
import Cadastroautor from "./Cadastroautor";
import Cadastrocategoria from "./Cadastrocategoria";
import Tabelaautor from "./Tabelaautor";
import Tabelacategoria from "./Tabelacategoria";
import Tabelalivro from "./Tabelalivro";
import Login from "./Login";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Router>
      <Container fluid>
        <Row>
          {/* Conteúdo principal */}
          <Col md={10} className="content order-md-2">
            <Routes>
              {/* Rota de login */}
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Cadastrousuarios/:id?" element={<Cadastrousuarios />} />
              <Route path="/Tabelausuarios" element={<Tabelausuarios />} />
              <Route path="/Cadastrolivro/:id?" element={<Cadastrolivro />} />
              <Route path="/Tabelalivro" element={<Tabelalivro />} />
              <Route path="/Cadastroautor/:id?" element={<Cadastroautor />} />
              <Route path="/Tabelaautor" element={<Tabelaautor />} />
              <Route path="/Cadastrocategoria/:id?" element={<Cadastrocategoria />} />
              <Route path="/Tabelacategoria" element={<Tabelacategoria />} />
            </Routes>
          </Col>
          {/* Barra lateral */}
          <Col md={1} className="sidebar order-md-1">
            <Navbar bg="ligth" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto flex-column">
                  {/* Links da barra lateral */}
                  {sessionStorage.getItem("token") && (
                    <>
                      <Navbar.Brand href="/">Biblioteca</Navbar.Brand>
                      <Link to="/Home" className="nav-link">Home</Link>
                      <Link to="/Tabelausuarios" className="nav-link">Usuários</Link>
                      <Link to="/Tabelalivro" className="nav-link">Livros</Link>
                      <Link to="/Tabelaautor" className="nav-link">Autores</Link>
                      <Link to="/Tabelacategoria" className="nav-link">Categoria</Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
