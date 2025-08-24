import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Cria um pool de conexões com o banco de dados
// As variáveis de ambiente ficam no arquivo .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Endereço do servidor MySQL
  user: process.env.DB_USER,       // Usuário do banco
  password: process.env.DB_PASSWORD, // Senha do banco
  database: process.env.DB_DATABASE  // Nome do banco de dados
});

export default pool;
