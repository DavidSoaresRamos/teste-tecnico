import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import RegisterUser from '../components/RegisterUser.jsx';
import './LoginPage.css';

// Página de login do sistema.
// Permite autenticar um usuário e redireciona para a lista de usuários.
// Também abre o modal para cadastro de novos usuários.

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Faz login e salva o token no localStorage
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setMessage('Login bem-sucedido!');
      navigate('/users');
    } catch (error) {
      setMessage('Erro no login: Credenciais inválidas.');
      console.error(error);
    }
  };

  // Fecha o modal após cadastrar usuário
  const handleUserRegistered = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-container">
      {isModalOpen ? (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <RegisterUser onUserRegistered={handleUserRegistered} />
        </Modal>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submitButton">Entrar</button>
          </form>

          {message && <p>{message}</p>}

          <button
            className="registerButton"
            onClick={() => setIsModalOpen(true)}
          >
            Cadastrar Novo Usuário
          </button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
