import "./RegisterUser.css";
import React, { useState } from 'react';
import axios from 'axios';

// Formulário usado para cadastrar novos usuários.
// Ao cadastrar, limpa os campos e chama a função de callback passada pelo componente pai.

const RegisterUser = ({ onClose, onUserRegistered }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', { name, email, password });
      setMessage('Usuário cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      if (onUserRegistered) {
        onUserRegistered();
      }
    } catch (error) {
      setMessage('Erro ao cadastrar usuário. O e-mail já pode estar em uso.');
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="registerButton">
          Cadastrar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterUser;
