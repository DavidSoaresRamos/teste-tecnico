import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css";

// Lista os usuários cadastrados no sistema.
// Permite buscar por nome e faz a paginação dos resultados.

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token não encontrado. Faça login.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar usuários. Tente novamente.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  // Filtra usuários pelo campo de busca
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Paginação
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="userlist-container">
      <h1>Teste Técnico Full Stack</h1>
      <h2>Lista de Usuários</h2>

      <input
        type="text"
        placeholder="Filtrar por nome..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); 
        }}
        className="search-input"
      />
      <table className="userlist-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default UserList;
